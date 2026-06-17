/*
  Warnings:

  - You are about to drop the column `company_id` on the `job_descriptions` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `job_descriptions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `job_descriptions` table. All the data in the column will be lost.
  - You are about to drop the `companies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `interview_questions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `company_description` to the `job_descriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_name` to the `job_descriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interview_questions` to the `job_descriptions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "interview_questions" DROP CONSTRAINT "interview_questions_job_description_id_fkey";

-- DropForeignKey
ALTER TABLE "job_descriptions" DROP CONSTRAINT "job_descriptions_company_id_fkey";

-- AlterTable
ALTER TABLE "job_descriptions" DROP COLUMN "company_id",
DROP COLUMN "deleted_at",
DROP COLUMN "updated_at",
ADD COLUMN     "company_description" TEXT NOT NULL,
ADD COLUMN     "company_name" VARCHAR(255) NOT NULL,
ADD COLUMN     "interview_questions" JSONB NOT NULL;

-- DropTable
DROP TABLE "companies";

-- DropTable
DROP TABLE "interview_questions";

-- CreateIndex
CREATE INDEX "job_descriptions_company_name_idx" ON "job_descriptions"("company_name");
