import type { jobRecruitmentInput } from "../features/jobs/JobSchemas";

export const generateJobDescription = async (formData: jobRecruitmentInput) => {
  const response = await fetch(import.meta.env.VITE_API_GENERATE_JOB_DESCRIPTION, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Connection error or API response failed.");
  }

  const json = await response.json();
  return json.data;
};
