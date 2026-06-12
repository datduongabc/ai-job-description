-- CreateEnum
CREATE TYPE "DepartmentEnum" AS ENUM ('Engineering', 'Product', 'Design', 'Data', 'QualityAssurance', 'DevOps', 'Security');

-- CreateEnum
CREATE TYPE "EmpTypeEnum" AS ENUM ('FullTime', 'PartTime', 'Contract', 'Freelance', 'Internship');

-- CreateEnum
CREATE TYPE "ExpLevelEnum" AS ENUM ('Intern', 'Fresher', 'Junior', 'MidLevel', 'Senior', 'Leader', 'Manager');

-- CreateEnum
CREATE TYPE "LocationEnum" AS ENUM ('HaNoi', 'HoChiMinh', 'HaiPhong', 'DaNang', 'Hue', 'CanTho', 'ThaiNguyen', 'PhuTho', 'LaoCai', 'TuyenQuang', 'LaiChau', 'DienBien', 'SonLa', 'QuangNinh', 'HungYen', 'NinhBinh', 'ThanhHoa', 'NgheAn', 'HaTinh', 'QuangBinh', 'QuangTri', 'QuangNam', 'QuangNgai', 'KhanhHoa', 'GiaLai', 'DakLak', 'LamDong', 'DongNai', 'BaRiaVungTau', 'TayNinh', 'LongAn', 'DongThap', 'AnGiang', 'KienGiang', 'CaMau');

-- CreateEnum
CREATE TYPE "QuestionTypeEnum" AS ENUM ('Technical', 'Behavioral', 'Scenario');

-- CreateTable
CREATE TABLE "companies" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_descriptions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "job_title" VARCHAR(255) NOT NULL,
    "department" "DepartmentEnum" NOT NULL,
    "experience_level" "ExpLevelEnum" NOT NULL,
    "employment_type" "EmpTypeEnum" NOT NULL,
    "location" "LocationEnum" NOT NULL,
    "company_id" UUID NOT NULL,
    "required_skills" TEXT[],
    "benefits" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "about_company_generated" TEXT NOT NULL,
    "job_summary_generated" TEXT NOT NULL,
    "responsibilities" TEXT[],
    "requirements_generated" TEXT[],
    "nice_to_have_generated" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "job_descriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interview_questions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "job_description_id" UUID NOT NULL,
    "type" "QuestionTypeEnum" NOT NULL,
    "question_text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "interview_questions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "job_descriptions" ADD CONSTRAINT "job_descriptions_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interview_questions" ADD CONSTRAINT "interview_questions_job_description_id_fkey" FOREIGN KEY ("job_description_id") REFERENCES "job_descriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
