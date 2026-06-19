import { useMutation } from "@tanstack/react-query";
import { Sparkles } from "lucide-react";
import { generateJobDescription } from "./api/jobAPI";
import { JobFormInput } from "./features/jobs/JobFormInput";
import { JobFormOutput } from "./features/jobs/JobFormOutput";

export default function App() {
  const jobMutation = useMutation({
    mutationFn: generateJobDescription,
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
          data={jobMutation.data ?? null}
          isLoading={jobMutation.isPending}
          error={jobMutation.error?.message ?? null}
        />
      </main>
    </div>
  );
}
