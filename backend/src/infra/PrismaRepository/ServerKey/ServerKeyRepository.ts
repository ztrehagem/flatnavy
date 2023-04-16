import type * as prisma from "@prisma/client";
import type {
  IServerKeyRepository,
  SignParams,
  VerifyParams,
} from "../../../app/repository/ServerKey/IServerKeyRepository.js";
import type { PrismaRepositoryContext } from "../PrismaRepositoryContext.js";
import { generateKeyPair } from "../../../utils/generateKeyPair.js";
import { SignJWT, importPKCS8, importSPKI, jwtVerify } from "jose";
import type { Result } from "../../../utils/Result.js";
import { InvalidAuthenticationError } from "../../../app/error/InvalidAuthenticationError.js";

// TODO: サーバーのドメインを指定できるようにする
const ISSUER = "flatnavy.local";
const ALG = "EdDSA";

export class ServerKeyRepository implements IServerKeyRepository {
  readonly #prisma: prisma.PrismaClient;

  private constructor({ prisma }: PrismaRepositoryContext) {
    this.#prisma = prisma;
  }

  static async create({
    prisma,
  }: PrismaRepositoryContext): Promise<ServerKeyRepository> {
    const record = await prisma.serverKey.findFirst({
      orderBy: { createdAt: "desc" },
      select: { id: true },
    });

    if (!record) {
      const keyPair = await generateKeyPair();

      await prisma.serverKey.create({
        data: {
          privateKeyPem: keyPair.privateKey.pem,
          publicKeyPem: keyPair.publicKey.pem,
          publicKeyDer: keyPair.publicKey.der,
          publicKeyJWK: keyPair.publicKey.jwk as prisma.Prisma.JsonObject,
        },
      });
    }

    return new ServerKeyRepository({ prisma });
  }

  async sign({ subject }: SignParams): Promise<string> {
    const record = await this.#prisma.serverKey.findFirst({
      orderBy: { createdAt: "desc" },
      select: { privateKeyPem: true },
    });

    if (!record) {
      throw new Error("No ServerKey");
    }

    const privateKey = await importPKCS8(record.privateKeyPem, ALG);

    const now = Date.now();

    const jwt = await new SignJWT({
      iss: ISSUER,
      sub: subject,
      iat: now,
      exp: now + 60_000,
    })
      .setProtectedHeader({ alg: ALG })
      .sign(privateKey);

    return jwt;
  }

  async verify({
    jwt,
  }: VerifyParams): Promise<Result<string, InvalidAuthenticationError>> {
    const record = await this.#prisma.serverKey.findFirst({
      orderBy: { createdAt: "desc" },
      select: { publicKeyPem: true },
    });

    if (!record) {
      throw new Error("No ServerKey");
    }

    const publicKey = await importSPKI(record.publicKeyPem, ALG);
    const { payload } = await jwtVerify(jwt, publicKey);
    const now = Date.now();

    if (payload.iss != ISSUER) {
      return [new InvalidAuthenticationError("KeyRepository", "wrong issuer")];
    }

    if (payload.exp != null && payload.exp <= now) {
      return [new InvalidAuthenticationError("KeyRepository", "expired")];
    }

    if (payload.nbf != null && now < payload.nbf) {
      return [new InvalidAuthenticationError("KeyRepository", "before active")];
    }

    if (payload.sub == null) {
      return [new InvalidAuthenticationError("KeyRepository", "empty subject")];
    }

    return [null, payload.sub];
  }
}
