import { generateKeyPair } from "node:crypto";
import type { KeyObject, JsonWebKey } from "node:crypto";
import { importPKCS8, importSPKI, jwtVerify, SignJWT } from "jose";
import { Temporal } from "@js-temporal/polyfill";
import type { Result } from "../../../utils/Result.js";
import { InvalidParameterError } from "../../error/InvalidParameterError.js";
import { UserHandle } from "../User/UserHandle.js";
import { SessionId } from "../Session/SessionId.js";
import { AuthenticationToken } from "../Session/AuthenticationToken.js";

type JWT = string;

export type Params = {
  readonly privateKeyPem: string;
  readonly publicKeyPem: string;
  readonly publicKeyDer: Buffer;
  readonly publicKeyJwk: JsonWebKey;
};

const ALG = "EdDSA";

export class ServerKey {
  #_brand!: never;

  readonly #privateKeyPem: string;
  readonly #publicKeyPem: string;
  readonly #publicKeyDer: Buffer;
  readonly #publicKeyJwk: JsonWebKey;

  static async generateParams(): Promise<Params> {
    const { privateKey, publicKey } = await new Promise<{
      privateKey: KeyObject;
      publicKey: KeyObject;
    }>((resolve, reject) => {
      generateKeyPair("ed25519", {}, (error, publicKey, privateKey) =>
        error ? reject(error) : resolve({ publicKey, privateKey })
      );
    });

    const privateKeyPem = privateKey
      .export({ format: "pem", type: "pkcs8" })
      .toString();
    const publicKeyPem = publicKey
      .export({ format: "pem", type: "spki" })
      .toString();
    const publicKeyDer = publicKey.export({ format: "der", type: "spki" });
    const publicKeyJwk = publicKey.export({ format: "jwk" });

    return {
      privateKeyPem,
      publicKeyPem,
      publicKeyDer,
      publicKeyJwk,
    };
  }

  static create(params: Params): ServerKey {
    return new ServerKey(params);
  }

  private constructor(params: Params) {
    this.#privateKeyPem = params.privateKeyPem;
    this.#publicKeyPem = params.publicKeyPem;
    this.#publicKeyDer = params.publicKeyDer;
    this.#publicKeyJwk = params.publicKeyJwk;
  }

  async signToken(token: AuthenticationToken): Promise<JWT> {
    const privateKey = await importPKCS8(this.#privateKeyPem, ALG);

    return await new SignJWT({
      iss: token.issuer,
      aud: [...token.audience],
      sub: token.userHandle.value,
      sid: token.sessionId.value,
      scope: token.scopes.join(" "),
      iat: token.issuedAt.epochMilliseconds,
      exp: token.expiredAt.epochMilliseconds,
    })
      .setProtectedHeader({ alg: ALG })
      .sign(privateKey);
  }

  async verifyToken(
    jwt: JWT
  ): Promise<Result<AuthenticationToken, InvalidParameterError>> {
    const publicKey = await importSPKI(this.#publicKeyPem, ALG);
    const { payload } = await jwtVerify(jwt, publicKey);

    if (payload.iss == null) {
      return [new InvalidParameterError(ServerKey, "no iss claim is given")];
    }

    if (payload.sub == null) {
      return [new InvalidParameterError(ServerKey, "no sub claim is given")];
    }

    const [eUserHandle, userHandle] = UserHandle.create(payload.sub);

    if (eUserHandle) {
      return [eUserHandle];
    }

    if (typeof payload.sid != "string") {
      return [new InvalidParameterError(ServerKey, "no sid claim is given")];
    }

    if (typeof payload.scope != "string") {
      return [new InvalidParameterError(ServerKey, "no scope claim is given")];
    }

    if (payload.iat == null) {
      return [new InvalidParameterError(ServerKey, "no iat claim is given")];
    }

    if (payload.exp == null) {
      return [new InvalidParameterError(ServerKey, "no exp claim is given")];
    }

    const token = AuthenticationToken.create({
      issuer: payload.iss,
      audience: [payload.aud ?? []].flat(),
      userHandle,
      sessionId: SessionId.create(payload.sid),
      scopes: payload.scope.split(" "),
      issuedAt: Temporal.Instant.fromEpochMilliseconds(payload.iat),
      expiredAt: Temporal.Instant.fromEpochMilliseconds(payload.exp),
    });

    return [null, token];
  }
}
