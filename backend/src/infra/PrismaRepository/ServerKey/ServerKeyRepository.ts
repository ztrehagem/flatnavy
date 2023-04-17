import type * as prisma from "@prisma/client";
import type { IServerKeyRepository } from "../../../app/repository/ServerKey/IServerKeyRepository.js";
import type { PrismaRepositoryContext } from "../PrismaRepositoryContext.js";
import { ServerKey } from "../../../app/model/ServerKey/ServerKey.js";
import type { JsonWebKey } from "crypto";

export class ServerKeyRepository implements IServerKeyRepository {
  readonly #prisma: prisma.PrismaClient;

  constructor({ prisma }: PrismaRepositoryContext) {
    this.#prisma = prisma;
  }

  async get(): Promise<ServerKey> {
    const record = await this.#prisma.serverKey.findFirst({
      orderBy: { createdAt: "desc" },
      select: {
        privateKeyPem: true,
        publicKeyPem: true,
        publicKeyDer: true,
        publicKeyJWK: true,
      },
    });

    if (!record) {
      return this.#prepare();
    } else {
      return ServerKey({
        privateKeyPem: record.privateKeyPem,
        publicKeyPem: record.publicKeyPem,
        publicKeyDer: record.publicKeyDer,
        publicKeyJwk: record.publicKeyJWK as JsonWebKey,
      })
    }
  }

  async #prepare(): Promise<ServerKey> {
    const params = await ServerKey.generateParams();

    await this.#prisma.serverKey.create({
      data: {
        privateKeyPem: params.privateKeyPem,
        publicKeyPem: params.publicKeyPem,
        publicKeyDer: params.publicKeyDer,
        publicKeyJWK: params.publicKeyJwk as prisma.Prisma.JsonObject,
      },
    });

    return ServerKey(params);
  }
}
