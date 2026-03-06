-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
