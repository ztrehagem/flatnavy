import type * as prisma from "@prisma/client";
import type { IServerKeyRepository } from "../../../app/repository/Server/IServerKeyRepository.js";
import type { PrismaRepositoryContext } from "../PrismaRepositoryContext.js";
import { ServerKey } from "../../../app/model/Server/ServerKey.js";
import type { JsonWebKey } from "crypto";

export class ServerKeyRepository implements IServerKeyRepository {
  readonly #prisma: prisma.PrismaClient;

  constructor({ prisma }: PrismaRepositoryContext) {
    this.#prisma = prisma;
  }

  async get(): Promise<ServerKey> {
    const record = await this.#prepare();

    return ServerKey({
      privateKeyPem: record.privateKeyPem,
      publicKeyPem: record.publicKeyPem,
      publicKeyDer: record.publicKeyDer,
      publicKeyJwk: record.publicKeyJWK as JsonWebKey,
    });
  }

  async #prepare(): Promise<
    Pick<
      prisma.ServerKey,
      "privateKeyPem" | "publicKeyPem" | "publicKeyDer" | "publicKeyJWK"
    >
  > {
    return await this.#prisma.$transaction(async (tx) => {
      const record = await tx.serverKey.findFirst({
        orderBy: { createdAt: "desc" },
        select: {
          privateKeyPem: true,
          publicKeyPem: true,
          publicKeyDer: true,
          publicKeyJWK: true,
        },
      });

      if (record) return record;

      const params = await ServerKey.generateParams();

      return await tx.serverKey.create({
        data: {
          privateKeyPem: params.privateKeyPem,
          publicKeyPem: params.publicKeyPem,
          publicKeyDer: params.publicKeyDer,
          publicKeyJWK: params.publicKeyJwk as prisma.Prisma.JsonObject,
        },
        select: {
          privateKeyPem: true,
          publicKeyPem: true,
          publicKeyDer: true,
          publicKeyJWK: true,
        },
      });
    });
  }
}
