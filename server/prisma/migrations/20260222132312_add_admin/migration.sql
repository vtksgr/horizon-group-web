/*
  Warnings:

  - You are about to drop the column `isUrgent` on the `Job` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('URGENT_HIRE', 'VACANCY_AVAILABLE');

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "isUrgent",
ADD COLUMN     "status" "JobStatus" NOT NULL DEFAULT 'VACANCY_AVAILABLE';

-- CreateIndex
CREATE INDEX "Contact_type_idx" ON "Contact"("type");
