-- CreateEnum
CREATE TYPE "Db_Role" AS ENUM ('ADMIN', 'MEMBER');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tb_Guild" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tb_Guild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tb_Member" (
    "id" TEXT NOT NULL,
    "nickname" TEXT,
    "role" "Db_Role" NOT NULL,
    "userId" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tb_Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tb_Channel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tb_Channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tb_Message" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tb_Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tb_Guild_id_key" ON "Tb_Guild"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tb_Member_id_key" ON "Tb_Member"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tb_Channel_id_key" ON "Tb_Channel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tb_Message_id_key" ON "Tb_Message"("id");

-- AddForeignKey
ALTER TABLE "Tb_Member" ADD CONSTRAINT "Tb_Member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tb_Member" ADD CONSTRAINT "Tb_Member_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Tb_Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tb_Channel" ADD CONSTRAINT "Tb_Channel_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Tb_Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tb_Message" ADD CONSTRAINT "Tb_Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tb_Message" ADD CONSTRAINT "Tb_Message_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Tb_Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
