import * as crypto from "crypto";

export type KeyPair = {
  privateKey: {
    pem: string;
  };
  publicKey: {
    pem: string;
    der: Buffer;
    jwk: crypto.JsonWebKey;
  };
};

export const generateKeyPair = (): Promise<KeyPair> => {
  return new Promise<KeyPair>((resolve, reject) => {
    crypto.generateKeyPair("ed25519", {}, (error, publicKey, privateKey) => {
      if (error) return reject(error);

      const privateKeyPem = privateKey
        .export({ format: "pem", type: "pkcs8" })
        .toString();
      const publicKeyPem = publicKey
        .export({ format: "pem", type: "spki" })
        .toString();
      const publicKeyDer = publicKey.export({ format: "der", type: "spki" });
      const publicKeyJwk = publicKey.export({ format: "jwk" });

      resolve({
        privateKey: {
          pem: privateKeyPem,
        },
        publicKey: {
          pem: publicKeyPem,
          der: publicKeyDer,
          jwk: publicKeyJwk,
        },
      });
    });
  });
};
