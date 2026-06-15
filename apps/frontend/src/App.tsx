import { Sparkles } from "lucide-react";
import { useState } from "react";
import { JobFormInput } from "./features/jobs/JobFormInput";
import { JobFormOutput } from "./features/jobs/JobFormOutput";

export default function App() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateJobDescription = async () => {
    try {
      setIsGenerating(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error("Production API Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

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
          onSubmitAction={handleGenerateJobDescription}
          isSubmitting={isGenerating}
        />
        {/* RIGHT PANEL: Display Generated Result */}
        <JobFormOutput />
      </main>
    </div>
  );
}
