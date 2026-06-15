import { GoogleGenAI, Type } from "@google/genai";
import { AIGenerationOutput } from "../ai.validator.js";
import { JobRecruitmentInput } from "../jobs.validator.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateJobMetadata(
  input: JobRecruitmentInput,
): Promise<AIGenerationOutput> {
  const prompt = buildGenerationPrompt(input);

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: prompt,
    config: {
      systemInstruction:
        "You are an elite Technical Recruiter. Your absolute directive is to generate a comprehensive Job Description and exactly 15 Interview Questions based on the provided parameters. You MUST strictly follow the 5-5-5 distribution matrix for interview questions. Your response must be a single, raw JSON object matching the requested schema perfectly, with no markdown code blocks or wrapper tags.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          aboutCompany: { type: Type.STRING },
          jobSummary: { type: Type.STRING },
          responsibilities: { type: Type.ARRAY, items: { type: Type.STRING } },
          requirements: { type: Type.ARRAY, items: { type: Type.STRING } },
          niceToHave: { type: Type.ARRAY, items: { type: Type.STRING } },
          benefits: { type: Type.ARRAY, items: { type: Type.STRING } },
          interviewQuestions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: {
                  type: Type.STRING,
                  enum: ["Technical", "Behavioral", "Scenario"],
                },
                question: { type: Type.STRING },
              },
              required: ["type", "questionText"],
            },
          },
        },
        required: [
          "aboutCompany",
          "jobSummary",
          "responsibilities",
          "requirements",
          "niceToHave",
          "benefits",
          "interviewQuestions",
        ],
      },
    },
  });

  return parseAIResponse(response.text);
}

// Helper functions
function buildGenerationPrompt(input: JobRecruitmentInput): string {
  return `
    Act as a professional recruiter. Generate a structured job description data based on the following details:
    - Company Name: ${input.companyName}
    - Company Context: ${input.companyDescription}
    - Target Role: ${input.jobTitle} (Department: ${input.department})
    - Metadata: ${input.employmentType}, ${input.experienceLevel}, Location: ${input.location}
    - Mandatory Skills provided: ${input.requiredSkills.join(", ")}
    - Core Benefits offered: ${input.benefits.join(", ")}

    Strict Constraints for the JSON fields:
    1. 'responsibilities': Must contain at least 5 highly actionable.
    2. 'requirements': Must expand the provided Mandatory Skills into at least 5 professional requirements.
    3. 'niceToHave': Must infer and generate at least 3 advanced, highly relevant bonus skills or experiences.
    4. 'interviewQuestions': Generate exactly 5 relevant questions about Technical types, 3 relevant questions about Behavioral types, and 2 relevant questions about Scenario types.
  `;
}

function parseAIResponse(rawText: string | undefined): AIGenerationOutput {
  if (!rawText) {
    throw new Error("AI response empty");
  }

  try {
    return JSON.parse(rawText);
  } catch (error) {
    throw new Error("AI return invalid json structure");
  }
}
