/*
  Warnings:

  - The values [QualityAssurance] on the enum `DepartmentEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DepartmentEnum_new" AS ENUM ('Engineering', 'Product', 'Design', 'Data', 'QA', 'DevOps', 'Security');
ALTER TABLE "job_descriptions" ALTER COLUMN "department" TYPE "DepartmentEnum_new" USING ("department"::text::"DepartmentEnum_new");
ALTER TYPE "DepartmentEnum" RENAME TO "DepartmentEnum_old";
ALTER TYPE "DepartmentEnum_new" RENAME TO "DepartmentEnum";
DROP TYPE "public"."DepartmentEnum_old";
COMMIT;
