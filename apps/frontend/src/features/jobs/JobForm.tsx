import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { jobRecruitmentSchema, type JobRecruitmentInput } from "./JobSchemas";

export function JobDescriptionForm() {
  // React Hook Form kết hợp zod validation đẻ xử lí dữ liệu nhập vào
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<JobRecruitmentInput>({
    resolver: zodResolver(jobRecruitmentSchema),
    defaultValues: {
      jobTitle: "",
      department: undefined,
      experienceLevel: undefined,
      employmentType: undefined,
      location: undefined,
      companyName: "",
      companyDescription: "",
      requiredSkills: [],
      benefits: [],
    },
  });

  // Post dữ liệu từ RHF trên qua backend qua AI để nhận response data
  const mutation = useMutation({
    mutationFn: async (data: JobRecruitmentInput) => {
      const response = await fetch("http://localhost:5000/api/jobs/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Internet error happended");

      return await response.json();
    },
    onSuccess: (data) => {
      console.log("Successfully received data from AI", data);
    },
  });

  // const onSubmit = (formData: JobRecruitmentInput) => {
  //   mutation.mutate(formData);
  // };

  // return (
  //   <form
  //     onSubmit={handleSubmit(onSubmit)}
  //     className="space-y-4 p-6 bg-gray-50 rounded-lg max-w-xl"
  //   >
  //     {/* 1. Job Title */}
  //     <div>
  //       <label className="block text-sm font-medium">Job Title *</label>
  //       <input
  //         {...register("jobTitle")}
  //         className="w-full border p-2 rounded"
  //       />
  //       {errors.jobTitle && (
  //         <p className="text-red-500 text-xs mt-1">{errors.jobTitle.message}</p>
  //       )}
  //     </div>

  //     {/* 2. Required Skills (Bọc bằng Controller vì là Custom State Component) */}
  //     <div>
  //       <label className="block text-sm font-medium">
  //         Required Skills * (Press Enter to add)
  //       </label>
  //       <Controller
  //         name="requiredSkills"
  //         control={control}
  //         render={({ field }) => (
  //           <TagInput
  //             value={field.value}
  //             onChange={field.onChange}
  //             placeholder="e.g., NodeJS, PostgreSQL"
  //           />
  //         )}
  //       />
  //       {errors.requiredSkills && (
  //         <p className="text-red-500 text-xs mt-1">
  //           {errors.requiredSkills.message}
  //         </p>
  //       )}
  //     </div>

  //     {/* 3. Benefits */}
  //     <div>
  //       <label className="block text-sm font-medium">
  //         Benefits (Press Enter to add)
  //       </label>
  //       <Controller
  //         name="benefits"
  //         control={control}
  //         render={({ field }) => (
  //           <TagInput
  //             value={field.value}
  //             onChange={field.onChange}
  //             placeholder="e.g., Remote Working, Health Insurance"
  //           />
  //         )}
  //       />
  //     </div>

  //     {/* Nút bấm điều phối trạng thái */}
  //     <button
  //       type="submit"
  //       disabled={mutation.isPending}
  //       className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700 disabled:bg-gray-400"
  //     >
  //       {mutation.isPending
  //         ? "AI is Generating..."
  //         : "Generate Job Description"}
  //     </button>
  //   </form>
  // );
}
