-- CreateTable
CREATE TABLE "ServerKey" (
    "id" SERIAL NOT NULL,
    "privateKeyPem" TEXT NOT NULL,
    "publicKeyPem" TEXT NOT NULL,
    "publicKeyDer" BYTEA NOT NULL,
    "publicKeyJWK" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServerKey_pkey" PRIMARY KEY ("id")
);
