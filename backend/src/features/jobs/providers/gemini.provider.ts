import { GoogleGenAI, Type } from "@google/genai";
import {
  AIGenerationOutput,
  aiGenerationSchema,
} from "../../ai/ai.validator.js";
import { JobRecruitmentInput } from "../job.validator.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateJobOutput(
  input: JobRecruitmentInput,
): Promise<AIGenerationOutput> {
  const prompt = buildGenerationPrompt(input);

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: prompt,
    config: {
      systemInstruction:
        "You are an elite Technical Recruiter. Your absolute directive is to generate a comprehensive Job Description and exactly 10 Interview Questions based on the provided parameters. You MUST strictly follow the 5-3-2 distribution matrix for interview questions (5 Technical, 3 Behavioral, 2 Scenario). Your response must be a single, raw JSON object matching the requested schema perfectly, with no markdown code blocks or wrapper tags.",
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
                questionText: { type: Type.STRING },
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

  return parseAndValidateAIResponse(response.text);
}

// Helper functions: create prompt for instructing AI
function buildGenerationPrompt(input: JobRecruitmentInput): string {
  return `
    Act as a professional recruiter. Generate a structured JSON object based on the following exact rules for each field:

    - Raw Inputs:
      * aboutCompany: ${input.companyName} + ${input.companyDescription}
      * jobSummary: ${input.jobTitle} + ${input.department} + ${input.experienceLevel} + ${input.employmentType} + ${input.location}
      * responsibilities:
      * requirements: [${input.requiredSkills.join(", ")}]
      * niceToHave:
      * benefits: [${input.benefits.join(", ")}]
      * interviewQuestions:

    - Mandatory Field Mapping Rules for Output JSON:
      1. 'aboutCompany': Formulate this text by combining 'companyName' + 'companyDescription' and apply professional recruitment refinements or stylistic polish.
      2. 'jobSummary': Formulate this text by combining 'jobTitle' + 'department' + 'experienceLevel' + 'employmentType' + 'location' into a cohesive executive position overview sentence or paragraph.
      3. 'responsibilities': AI must generate this section completely from scratch based on the job title. It must contain at least 5.
      4. 'requirements': Take the provided 'requiredSkills' array as the base, include them, and AI must generate additional professional requirements, ensuring the final array length is at least 5.
      5. 'niceToHave': AI must generate this section completely from scratch. It must contain at least 3 advanced, highly relevant bonus skills or experiences.
      6. 'benefits': Copy the provided 'benefits' input array exactly as sent from the frontend. AI MUST NOT generate, add, modify, or extend any content within this array.
      7. 'interviewQuestions': Generate an array of objects containing exactly 10 items. The distribution must be strictly: exactly 5 questions with type "Technical", exactly 3 questions with type "Behavioral", and exactly 2 questions with type "Scenario". Each questionText must be contextualized to the job title.
  `;
}

// Helper functions: validate the json structure of AI
function parseAndValidateAIResponse(
  rawText: string | undefined,
): AIGenerationOutput {
  if (!rawText) {
    throw new Error("[AI] AI response empty content");
  }

  let parsedData: unknown;

  try {
    parsedData = JSON.parse(rawText);
  } catch {
    throw new Error("[AI] AI generated incorrect json format");
  }

  try {
    return aiGenerationSchema.parse(parsedData);
  } catch {
    throw new Error("[AI] AI generated incorrect config output");
  }
}
