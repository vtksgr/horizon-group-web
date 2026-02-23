/*
  Warnings:

  - The values [GENERAL] on the enum `ContactType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `companyName` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `inquiryType` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the `News` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `phoneNumber` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Made the column `postalCode` on table `Contact` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Contact` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `employmentType` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `holidays` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interviewDetails` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skillsRequired` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workHours` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Made the column `salary` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "CompanyPosition" AS ENUM ('MANAGER', 'SECTION_CHIEF_MANAGER', 'CHIEF_SECTION_CHIEF', 'GENERAL_EMPLOYEE');

-- CreateEnum
CREATE TYPE "CompanyInquiryType" AS ENUM ('RECRUITMENT', 'INTERNATIONAL_STUDENT_SUPPORT', 'INTERPRETATION_TRANSLATION', 'SPECIFIED_SKILLED_WORKER', 'REGISTRATION_SUPPORT', 'EDUCATION_CONSULTING', 'OTHER');

-- CreateEnum
CREATE TYPE "CandidateInquiryType" AS ENUM ('INTERVIEWS_CONSULTATIONS', 'RECRUITMENT', 'ONLINE_CLASSES', 'SEMINAR_PARTICIPATION', 'JOB_HUNTING_SUPPORT', 'CAREER_CHANGE_SUPPORT', 'OTHER_SUPPORT');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'TEMPORARY', 'INTERN', 'OTHER');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'CLOSED');

-- AlterEnum
BEGIN;
CREATE TYPE "ContactType_new" AS ENUM ('COMPANY', 'CANDIDATE');
ALTER TABLE "Contact" ALTER COLUMN "type" TYPE "ContactType_new" USING ("type"::text::"ContactType_new");
ALTER TYPE "ContactType" RENAME TO "ContactType_old";
ALTER TYPE "ContactType_new" RENAME TO "ContactType";
DROP TYPE "public"."ContactType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "companyName",
DROP COLUMN "inquiryType",
DROP COLUMN "phone",
DROP COLUMN "position",
DROP COLUMN "status",
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "postalCode" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL;

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "isActive",
ADD COLUMN     "employmentType" "EmploymentType" NOT NULL,
ADD COLUMN     "holidays" TEXT NOT NULL,
ADD COLUMN     "interviewDetails" TEXT NOT NULL,
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isUrgent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "skillsRequired" TEXT NOT NULL,
ADD COLUMN     "status" "JobStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "workHours" TEXT NOT NULL,
ALTER COLUMN "salary" SET NOT NULL;

-- DropTable
DROP TABLE "News";

-- CreateTable
CREATE TABLE "CompanyContact" (
    "id" SERIAL NOT NULL,
    "contactId" INTEGER NOT NULL,
    "companyName" TEXT NOT NULL,
    "position" "CompanyPosition" NOT NULL,
    "inquiryType" "CompanyInquiryType" NOT NULL,

    CONSTRAINT "CompanyContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateContact" (
    "id" SERIAL NOT NULL,
    "contactId" INTEGER NOT NULL,
    "inquiryType" "CandidateInquiryType" NOT NULL,
    "resumeUrl" TEXT,

    CONSTRAINT "CandidateContact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyContact_contactId_key" ON "CompanyContact"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "CandidateContact_contactId_key" ON "CandidateContact"("contactId");

-- CreateIndex
CREATE INDEX "Job_status_idx" ON "Job"("status");

-- CreateIndex
CREATE INDEX "Job_employmentType_idx" ON "Job"("employmentType");

-- CreateIndex
CREATE INDEX "Job_createdAt_idx" ON "Job"("createdAt");

-- AddForeignKey
ALTER TABLE "CompanyContact" ADD CONSTRAINT "CompanyContact_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateContact" ADD CONSTRAINT "CandidateContact_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;
