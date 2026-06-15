import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type KeyboardEvent } from "react";
import { useForm, useWatch } from "react-hook-form";
import { jobRecruitmentSchema, type JobRecruitmentInput } from "./JobSchemas";

interface JobFormInputProps {
  onSubmitAction: (data: JobRecruitmentInput) => void;
  isSubmitting: boolean;
}

export function JobFormInput({
  onSubmitAction,
  isSubmitting,
}: JobFormInputProps) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<JobRecruitmentInput>({
    resolver: zodResolver(jobRecruitmentSchema),
    defaultValues: {
      jobTitle: "",
      department: "Engineering",
      experienceLevel: "Intern",
      employmentType: "FullTime",
      location: "HaNoi",
      companyName: "",
      companyDescription: "",
      requiredSkills: [],
      benefits: [],
    },
  });

  const requiredSkills = useWatch({ control, name: "requiredSkills" }) ?? [];
  const benefits = useWatch({ control, name: "benefits" }) ?? [];

  const [skillInput, setSkillInput] = useState("");
  const [benefitInput, setBenefitInput] = useState("");

  // add skills
  const handleSkillKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const trimmed = skillInput.trim();

      if (trimmed && !requiredSkills.includes(trimmed)) {
        setValue("requiredSkills", [...requiredSkills, trimmed], {
          shouldValidate: true, // zod validate lại khi thêm skills mới
        });

        setSkillInput("");
      }
    }
  };

  // add benifits
  const handleBenefitKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const trimmed = benefitInput.trim();

      if (trimmed && !benefits.includes(trimmed)) {
        setValue("benefits", [...benefits, trimmed], {
          shouldValidate: true, // zod validate lại khi thêm benifits mới
        });

        setBenefitInput("");
      }
    }
  };

  // remove skills
  const removeSkill = (indexToRemove: number) => {
    setValue(
      "requiredSkills",
      requiredSkills.filter((_, idx) => idx !== indexToRemove),
      { shouldValidate: true },
    );
  };

  // remove benifits
  const removeBenefit = (indexToRemove: number) => {
    setValue(
      "benefits",
      benefits.filter((_, idx) => idx !== indexToRemove),
      { shouldValidate: true },
    );
  };

  // trả kết quả của input form lên ui
  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 lg:p-6 shadow-xs flex flex-col gap-5 sticky xl:top-22 max-h-[calc(100vh-120px)] overflow-y-auto w-full">
      <div className="border-b border-slate-100 pb-3">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
          Recruitment Information
        </h2>
      </div>

      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmitAction)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Job Title */}
          <div className="flex flex-col md:col-span-2">
            <label className="form-label">Job Title</label>
            <input
              type="text"
              placeholder="e.g., Backend Developer"
              className="form-control"
              {...register("jobTitle")}
            />
            {errors.jobTitle && (
              <p className="text-red-500 text-xs mt-1">
                {errors.jobTitle.message}
              </p>
            )}
          </div>

          {/* Department */}
          <div className="flex flex-col">
            <label className="form-label">Department</label>
            <select className="form-control" {...register("department")}>
              {jobRecruitmentSchema.shape.department.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="text-red-500 text-xs mt-1">
                {errors.department.message}
              </p>
            )}
          </div>

          {/* Employment Type */}
          <div className="flex flex-col">
            <label className="form-label">Employment Type</label>
            <select className="form-control" {...register("employmentType")}>
              {jobRecruitmentSchema.shape.employmentType.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.employmentType && (
              <p className="text-red-500 text-xs mt-1">
                {errors.employmentType.message}
              </p>
            )}
          </div>

          {/* Experience Level */}
          <div className="flex flex-col">
            <label className="form-label">Experience Level</label>
            <select className="form-control" {...register("experienceLevel")}>
              {jobRecruitmentSchema.shape.experienceLevel.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.experienceLevel && (
              <p className="text-red-500 text-xs mt-1">
                {errors.experienceLevel.message}
              </p>
            )}
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <label className="form-label">Location</label>
            <select className="form-control" {...register("location")}>
              {jobRecruitmentSchema.shape.location.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.location && (
              <p className="text-red-500 text-xs mt-1">
                {errors.location.message}
              </p>
            )}
          </div>
        </div>

        {/* Company Name */}
        <div className="flex flex-col">
          <label className="form-label">Company Name</label>
          <input
            type="text"
            placeholder="e.g., ABC Software"
            className="form-control"
            {...register("companyName")}
          />
          {errors.companyName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.companyName.message}
            </p>
          )}
        </div>

        {/* Company Description */}
        <div className="flex flex-col">
          <label className="form-label">Company Description</label>
          <textarea
            rows={3}
            placeholder="ABC Software develops SaaS products for enterprise customers."
            className="form-control resize-none"
            {...register("companyDescription")}
          />
          {errors.companyDescription && (
            <p className="text-red-500 text-xs mt-1">
              {errors.companyDescription.message}
            </p>
          )}
        </div>

        {/* Required Skills */}
        <div className="flex flex-col">
          <label className="form-label">Required Skills</label>
          <div className="stacked-tag-box">
            <div className="flex flex-wrap gap-2 min-h-7">
              {requiredSkills.map((skill, index) => (
                <span key={skill + index} className="tag-badge-indigo">
                  {skill}
                  <button
                    type="button"
                    className="tag-close-btn"
                    onClick={() => removeSkill(index)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              placeholder="Type a skill and press Enter..."
              className="tag-input-field"
            />
          </div>
          {errors.requiredSkills && (
            <p className="text-red-500 text-xs mt-1">
              {errors.requiredSkills.message}
            </p>
          )}
        </div>

        {/* Benefits */}
        <div className="flex flex-col">
          <label className="form-label">Benefits</label>
          <div className="stacked-tag-box">
            <div className="flex flex-wrap gap-2 min-h-7">
              {benefits.map((benefit, index) => (
                <span key={benefit + index} className="tag-badge-emerald">
                  {benefit}
                  <button
                    type="button"
                    className="tag-close-btn"
                    onClick={() => removeBenefit(index)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={benefitInput}
              onChange={(e) => setBenefitInput(e.target.value)}
              onKeyDown={handleBenefitKeyDown}
              placeholder="Type a benefit and press Enter..."
              className="tag-input-field"
            />
          </div>
          {errors.benefits && (
            <p className="text-red-500 text-xs mt-1">
              {errors.benefits.message}
            </p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary disabled:bg-slate-300"
        >
          {isSubmitting
            ? "Generating Job Description..."
            : "Generate Job Description"}
        </button>
      </form>
    </section>
  );
}
