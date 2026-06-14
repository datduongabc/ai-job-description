import { GoogleGenAI, Type } from "@google/genai";

export interface AIGenerationInput {
  jobTitle: string;
  department: string;
  experienceLevel: string;
  employmentType: string;
  location: string;
  companyName: string;
  companyDescription: string;
  requiredSkills: string[];
  benefits: string[];
}

export interface AIGenerationOutput {
  aboutCompany: string;
  jobSummary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];
  interviewQuestions: {
    type: "Technical" | "Behavioral" | "Scenario";
    question: string;
  }[];
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateJobMetadata(
  input: AIGenerationInput,
): Promise<AIGenerationOutput> {
  const prompt = buildGenerationPrompt(input);

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: prompt,
    config: {
      systemInstruction:
        "You are an expert Technical Recruiter. Your task is to generate a comprehensive Job Description and Interview Questions based on provided parameters. SYou MUST respond with a raw JSON object matching the exact structure requested, with no markdown formatting tags.",
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
                  enum: ["Technical", "Behavioral", "CultureFit"],
                },
                question: { type: Type.STRING },
              },
              required: ["type", "question"],
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

function buildGenerationPrompt(input: AIGenerationInput): string {
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
    throw new Error("AI_RESPONSE_EMPTY");
  }

  try {
    return JSON.parse(rawText);
  } catch (error) {
    throw new Error("AI_RETURN_INVALID_JSON_STRUCTURE");
  }
}
