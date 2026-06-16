import { Check, Copy, FileText, Sparkles } from "lucide-react";
import { useState } from "react";

export interface JobDescriptionResponse {
  id: string;

  aboutCompany: string;
  jobSummary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];

  interviewQuestions: Array<{
    id: string;
    type: "Technical" | "Behavioral" | "Scenario";
    questionText: string;
  }>;
}

interface JobFormOutputProps {
  data: JobDescriptionResponse | null;
  isLoading: boolean;
  error: string | null;
}

export function JobFormOutput({ data, isLoading, error }: JobFormOutputProps) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const interviewQuestions = data?.interviewQuestions;

  const groupedQuestions = {
    technical: interviewQuestions
      ? interviewQuestions.filter((q) => q.type === "Technical")
      : [],
    behavioral: interviewQuestions
      ? interviewQuestions.filter((q) => q.type === "Behavioral")
      : [],
    scenario: interviewQuestions
      ? interviewQuestions.filter((q) => q.type === "Scenario")
      : [],
  };

  // Feature 4 - Copy results
  const handleCopyClipboard = async () => {
    if (!data) return;

    const techCopyText = groupedQuestions.technical
      .map((q, i) => `  ${i + 1}. ${q.questionText}`)
      .join("\n");
    const behCopyText = groupedQuestions.behavioral
      .map((q, i) => `  ${i + 1}. ${q.questionText}`)
      .join("\n");
    const sceCopyText = groupedQuestions.scenario
      .map((q, i) => `  ${i + 1}. ${q.questionText}`)
      .join("\n");

    const formattedText = `
      ABOUT COMPANY:
      ${data.aboutCompany}

      JOB SUMMARY:
      ${data.jobSummary}

      RESPONSIBILITIES:
      ${data.responsibilities.map((r, i) => `${i + 1}. ${r}`).join("\n")}

      REQUIREMENTS:
      ${data.requirements.map((r, i) => `${i + 1}. ${r}`).join("\n")}

      NICE TO HAVE:
      ${data.niceToHave.map((n, i) => `${i + 1}. ${n}`).join("\n")}

      BENEFITS:
      ${data.benefits.map((b, i) => `${i + 1}. ${b}`).join("\n")}

      INTERVIEW QUESTIONS:
      * TECHNICAL:
      ${techCopyText}
      * BEHAVIORAL:
      ${behCopyText}
      * SCENARIO:
      ${sceCopyText}
    `.trim();

    try {
      await navigator.clipboard.writeText(formattedText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text safely to hardware layer:", err);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  if (!data) {
    return (
      <section className="bg-white border border-slate-200 border-dashed rounded-2xl p-6 shadow-xs flex flex-col items-center justify-center gap-3 min-h-125 text-center text-slate-400">
        <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400">
          <FileText size={28} />
        </div>
        <h3 className="font-semibold text-slate-700 text-sm mt-1">
          Problem happend.
        </h3>
      </section>
    );
  }

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 lg:p-6 shadow-xs flex flex-col gap-5 min-h-125">
      {/* KHU VỰC ĐIỀU HƯỚNG TÁC VỤ HEADER */}
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <Sparkles size={16} className="text-indigo-600" /> Kết quả khởi tạo
          bài đăng
        </h2>
        <button
          onClick={handleCopyClipboard}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer border ${
            isCopied
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
          }`}
        >
          {isCopied ? (
            <>
              <Check size={14} /> Copied!
            </>
          ) : (
            <>
              <Copy size={14} /> Copy Job Description
            </>
          )}
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-5 text-sm text-slate-700 leading-relaxed overflow-y-auto max-h-[calc(100vh-180px)] pr-1">
        {/* KHỐI GIỚI THIỆU CÔNG TY */}
        <div className="flex flex-col gap-1.5">
          <h4 className="font-bold text-slate-900 border-l-4 border-indigo-600 pl-2">
            About Company
          </h4>
          <p className="text-slate-600 bg-slate-50/50 p-3 rounded-xl border border-slate-100 whitespace-pre-line">
            {data.aboutCompany}
          </p>
        </div>

        {/* KHỐI TÓM TẮT CÔNG VIỆC */}
        <div className="flex flex-col gap-1.5">
          <h4 className="font-bold text-slate-900 border-l-4 border-indigo-600 pl-2">
            Job Summary
          </h4>
          <p className="text-slate-600 whitespace-pre-line">
            {data.jobSummary}
          </p>
        </div>

        {/* KHỐI TRÁCH NHIỆM CHÍNH */}
        <div className="flex flex-col gap-1.5">
          <h4 className="font-bold text-slate-900 border-l-4 border-indigo-600 pl-2">
            Key Responsibilities
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            {data.responsibilities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* KHỐI YÊU CẦU CÔNG VIỆC */}
        <div className="flex flex-col gap-1.5">
          <h4 className="font-bold text-slate-900 border-l-4 border-indigo-600 pl-2">
            Job Requirements
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            {data.requirements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* KHỐI ĐIỂM CỘNG ƯU TIÊN (NICE TO HAVE) */}
        {data.niceToHave && data.niceToHave.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <h4 className="font-bold text-slate-900 border-l-4 border-indigo-600 pl-2">
              Nice to Have
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              {data.niceToHave.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* KHỐI PHÚC LỢI (BENEFITS) */}
        {data.benefits && data.benefits.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <h4 className="font-bold text-slate-900 border-l-4 border-indigo-600 pl-2">
              Benefits & Perks
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              {data.benefits.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* BỘ CÂU HỎI PHỎNG VẤN ĐỐI XỨNG CÂN BẰNG 5-5-5 */}
        <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-4 flex flex-col gap-4 mt-2">
          <h4 className="font-extrabold text-emerald-800 uppercase tracking-wider flex items-center gap-2 text-xs">
            🎯 Gợi ý bộ câu hỏi phỏng vấn tối ưu (Ma trận 5-5-5)
          </h4>

          <div className="space-y-3.5 text-xs">
            {/* NHÓM CÂU HỎI SỐ 1: TECHNICAL */}
            {groupedQuestions.technical.length > 0 && (
              <div>
                <h5 className="font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                  <span>💻</span> Technical Evaluation (5 câu)
                </h5>
                <div className="space-y-1.5 text-slate-600 pl-4">
                  {groupedQuestions.technical.map((q, idx) => (
                    <p key={q.id || idx} className="leading-relaxed">
                      {idx + 1}. {q.questionText}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* NHÓM CÂU HỎI SỐ 2: BEHAVIORAL */}
            {groupedQuestions.behavioral.length > 0 && (
              <div>
                <h5 className="font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                  <span>🧠</span> Behavioral Matrix (5 câu)
                </h5>
                <div className="space-y-1.5 text-slate-600 pl-4">
                  {groupedQuestions.behavioral.map((q, idx) => (
                    <p key={q.id || idx} className="leading-relaxed">
                      {idx + 1}. {q.questionText}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* NHÓM CÂU HỎI SỐ 3: SCENARIO */}
            {groupedQuestions.scenario.length > 0 && (
              <div>
                <h5 className="font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                  <span>🛠️</span> Scenario-Based Strategy (5 câu)
                </h5>
                <div className="space-y-1.5 text-slate-600 pl-4">
                  {groupedQuestions.scenario.map((q, idx) => (
                    <p key={q.id || idx} className="leading-relaxed">
                      {idx + 1}. {q.questionText}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
