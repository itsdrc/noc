-- CreateEnum
CREATE TYPE "SeverityLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "prismaLogModel" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "level" "SeverityLevel" NOT NULL,
    "origin" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prismaLogModel_pkey" PRIMARY KEY ("id")
);
