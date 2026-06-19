import { Check, Copy, FileText, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

export interface InterviewQuestion {
  type: "Technical" | "Behavioral" | "Scenario";
  questionText: string;
}

export interface JobDescriptionResponse {
  aboutCompanyGenerated: string;
  jobSummaryGenerated: string;
  responsibilities: string[];
  requirementsGenerated: string[];
  niceToHaveGenerated: string[];
  benefits: string[];

  interviewQuestions: InterviewQuestion[];
}

interface JobFormOutputProps {
  data: JobDescriptionResponse | null;
  isLoading: boolean;
  error: string | null;
}

// Helper functions
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <h4 className="font-bold text-slate-900 border-l-4 border-indigo-600 pl-2">
      {title}
    </h4>
    {children}
  </div>
);

const ListSection = ({ title, items }: { title: string; items?: string[] }) => {
  if (!items || items.length === 0) return null;
  return (
    <Section title={title}>
      <ul className="list-disc pl-5 space-y-1 text-slate-600">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </Section>
  );
};

const QuestionGroup = ({
  title,
  questions,
}: {
  title: string;
  questions?: { questionText: string }[];
}) => {
  if (!questions || questions.length === 0) return null;
  return (
    <div>
      <h5 className="font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
        {title}
      </h5>
      <div className="space-y-1.5 text-slate-600 pl-4">
        {questions.map((q, index) => (
          <p key={index} className="leading-relaxed">
            {index + 1}. {q.questionText}
          </p>
        ))}
      </div>
    </div>
  );
};

const formatTextForClipboard = (
  data: JobDescriptionResponse,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  groupedQuestions: any,
) => {
  const formatList = (list: string[]) =>
    list.map((item, i) => `${i + 1}. ${item}`).join("\n");
  const formatQuestions = (questions: { questionText: string }[]) =>
    questions.map((q, i) => `  ${i + 1}. ${q.questionText}`).join("\n");

  return `
    ABOUT COMPANY:
    ${data.aboutCompanyGenerated}

    JOB SUMMARY:
    ${data.jobSummaryGenerated}

    RESPONSIBILITIES:
    ${formatList(data.responsibilities)}

    REQUIREMENTS:
    ${formatList(data.requirementsGenerated)}

    NICE TO HAVE:
    ${formatList(data.niceToHaveGenerated)}

    BENEFITS:
    ${formatList(data.benefits)}

    INTERVIEW QUESTIONS:
    * TECHNICAL:
    ${formatQuestions(groupedQuestions.technical)}
    * BEHAVIORAL:
    ${formatQuestions(groupedQuestions.behavioral)}
    * SCENARIO:
    ${formatQuestions(groupedQuestions.scenario)}
  `.trim();
};

export function JobFormOutput({ data, isLoading, error }: JobFormOutputProps) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Dùng useMemo để không phải tính toán lại filter mỗi khi state (isCopied) thay đổi
  const groupedQuestions = useMemo(() => {
    const questions = data?.interviewQuestions || [];
    return {
      technical: questions.filter((q) => q.type === "Technical"),
      behavioral: questions.filter((q) => q.type === "Behavioral"),
      scenario: questions.filter((q) => q.type === "Scenario"),
    };
  }, [data?.interviewQuestions]);

  const handleCopyClipboard = async () => {
    if (!data) return;

    try {
      const formattedText = formatTextForClipboard(data, groupedQuestions);
      await navigator.clipboard.writeText(formattedText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text safely to hardware layer:", err);
    }
  };

  if (isLoading) return <div>Loading...</div>; // Bạn có thể thay bằng component Skeleton/Spinner
  if (error)
    return <div className="text-red-500 p-4 bg-red-50 rounded-xl">{error}</div>;

  if (!data) {
    return (
      <section className="bg-white border border-slate-200 border-dashed rounded-2xl p-6 shadow-xs flex flex-col items-center justify-center gap-3 min-h-125 text-center text-slate-400">
        <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400">
          <FileText size={28} />
        </div>
        <h3 className="font-semibold text-slate-700 text-sm mt-1">
          No content
        </h3>
      </section>
    );
  }

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 lg:p-6 shadow-xs flex flex-col gap-5 min-h-125">
      {/* HEADER */}
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <Sparkles size={16} className="text-indigo-600" />
          Result
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
              <Check size={14} /> Copied
            </>
          ) : (
            <>
              <Copy size={14} /> Copy Job Description
            </>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-5 text-sm text-slate-700 leading-relaxed overflow-y-auto max-h-[calc(100vh-180px)] pr-1">
        <Section title="About Company">
          <p className="text-slate-600 bg-slate-50/50 p-3 rounded-xl border border-slate-100 whitespace-pre-line">
            {data.aboutCompanyGenerated}
          </p>
        </Section>

        <Section title="Job Summary">
          <p className="text-slate-600 whitespace-pre-line">
            {data.jobSummaryGenerated}
          </p>
        </Section>

        <ListSection title="Responsibilities" items={data.responsibilities} />
        <ListSection title="Requirements" items={data.requirementsGenerated} />
        <ListSection title="Nice to Have" items={data.niceToHaveGenerated} />
        <ListSection title="Benefits" items={data.benefits} />

        {/* Interview Questions */}
        {data.interviewQuestions && data.interviewQuestions.length > 0 && (
          <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-4 flex flex-col gap-4 mt-2">
            <h4 className="font-extrabold text-emerald-800 uppercase tracking-wider flex items-center gap-2 text-xs">
              Interview questions
            </h4>

            <div className="space-y-3.5 text-xs">
              <QuestionGroup
                title="Technical Questions"
                questions={groupedQuestions.technical}
              />
              <QuestionGroup
                title="Behavioral Questions"
                questions={groupedQuestions.behavioral}
              />
              <QuestionGroup
                title="Scenario Questions"
                questions={groupedQuestions.scenario}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
