-- CreateEnum
CREATE TYPE "ItSolutionInquiryType" AS ENUM ('WEB_DEVELOPMENT', 'DESIGN_AND_BRANDING', 'DIGITAL_MARKETING_SEO', 'IT_SUPPORT_CONSULTING', 'DESIGN_PRINT', 'OTHERS');

-- AlterEnum
ALTER TYPE "ContactType" ADD VALUE 'ITSOLUTION';

-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "postalCode" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "phoneNumber" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ItSolutionContact" (
    "id" SERIAL NOT NULL,
    "contactId" INTEGER NOT NULL,
    "companyName" TEXT NOT NULL,
    "inquiryType" "ItSolutionInquiryType" NOT NULL,

    CONSTRAINT "ItSolutionContact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ItSolutionContact_contactId_key" ON "ItSolutionContact"("contactId");

-- AddForeignKey
ALTER TABLE "ItSolutionContact" ADD CONSTRAINT "ItSolutionContact_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;
