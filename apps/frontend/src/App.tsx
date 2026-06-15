import { useMutation } from "@tanstack/react-query";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { JobFormInput } from "./features/jobs/JobFormInput";
import { JobFormOutput } from "./features/jobs/JobFormOutput";
import type { JobRecruitmentInput } from "./features/jobs/JobSchemas";

export interface JobDescriptionResponse {
  id: string;

  jobTitle: string;
  department: string;
  experienceLevel: string;
  employmentType: string;
  location: string;

  companyId: string;
  requiredSkills: string[];
  benefits: string[];

  aboutCompanyGenerated: string;
  jobSummaryGenerated: string;
  responsibilities: string[];
  requirementsGenerated: string[];
  niceToHaveGenerated: string[];

  interviewQuestions: Array<{
    id: string;
    type: "Technical" | "Behavioral" | "CultureFit";
    questionText: string;
  }>;
}

export default function App() {
  const [generatedJob, setGeneratedJob] =
    useState<JobDescriptionResponse | null>(null);

  const jobMutation = useMutation({
    mutationFn: async (formData: JobRecruitmentInput) => {
      const response = await fetch("http://localhost:5000/api/jobs/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Internet error happened.");
      }

      const json = await response.json();
      return json.data;
    },
    onSuccess: (data) => {
      setGeneratedJob(data);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-xl text-white">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="text-md font-bold tracking-tight">
              AI Job Description Generator
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 xl:grid-cols-2 max-w-400 w-full mx-auto p-4 lg:p-6 gap-6 items-start">
        {/* LEFT PANEL: Recruitment Information Form */}
        <JobFormInput
          onSubmitAction={jobMutation.mutate}
          isSubmitting={jobMutation.isPending}
        />
        {/* RIGHT PANEL: Display Generated Result */}
        <JobFormOutput
        // data={generatedJob}
        // isLoading={jobMutation.isPending}
        // error={jobMutation.error?.message || null}
        />
      </main>
    </div>
  );
}
