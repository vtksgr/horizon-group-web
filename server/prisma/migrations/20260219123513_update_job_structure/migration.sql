/*
  Warnings:

  - You are about to drop the column `isPublished` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Job` table. All the data in the column will be lost.
  - The `employmentType` column on the `Job` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "Job_employmentType_idx";

-- DropIndex
DROP INDEX "Job_status_idx";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "isPublished",
DROP COLUMN "status",
ADD COLUMN     "companyName" TEXT,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "salary" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
DROP COLUMN "employmentType",
ADD COLUMN     "employmentType" TEXT,
ALTER COLUMN "holidays" DROP NOT NULL,
ALTER COLUMN "interviewDetails" DROP NOT NULL,
ALTER COLUMN "skillsRequired" DROP NOT NULL,
ALTER COLUMN "workHours" DROP NOT NULL;

-- DropEnum
DROP TYPE "EmploymentType";

-- DropEnum
DROP TYPE "JobStatus";
