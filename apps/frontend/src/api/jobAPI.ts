import type { jobRecruitmentInput } from "../features/jobs/JobSchemas";

export const generateJobDescription = async (formData: jobRecruitmentInput) => {
  const response = await fetch("http://localhost:5000/api/jobs/generate", {
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
