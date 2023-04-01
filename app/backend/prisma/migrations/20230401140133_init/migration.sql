-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "displayName" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");
