// judge0 utility functions
import axios from "axios";
import ApiError from "../utils/apiError.util.js";

export const getSupportedLanguagesId = (languageName) => {
  const languages = {
    python3: 71,
    java: 62,
    javascript: 63,
    cpp: 54,
    c: 50,
  };

  return languages[languageName] || "unkwnown";
};

export const getSupportedLanguagesName = (languageId) => {
  const languages = {
    71: "python3",
    62: "java",
    63: "javascript",
    54: "cpp",
    50: "c",
  };

  return languages[languageId] || "unkwnown";
};

export const submitCodeInBatch = async (submissions) => {
  const judge0Url = process.env.JUDGE0_URL || "";

  if (!judge0Url) {
    throw new Error("Judge0 URL is not defined");
  }

  try {
    const response = await axios.post(`${judge0Url}/submissions/batch?`, {
      submissions,
    });
    console.log("Submissions sent successfully");
    return response.data.map((submission) => submission.token);
  } catch (error) {
    console.error("Error sending submissions:", error);
    throw new ApiError(
      500,
      "Error sending submissions to Judge0",
      error.response?.data || error.message,
    );
  }
};
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const pollSubmissionResult = async (tokens) => {
  const judge0Url = process.env.JUDGE0_URL || "";

  if (!judge0Url) {
    throw new Error("Judge0 URL is not defined");
  }

  while (true) {
    const response = await axios.get(`${judge0Url}/submissions/batch`, {
      params: {
        tokens: tokens.join(","),
        base64_encoded: false,
      },
    });

    const submissions = response.data.submissions;

    const allDone = submissions.every(
      (sub) => sub.status && sub.status.id >= 3,
    );

    if (allDone) {
      return submissions;
    }
    await sleep(1000);
  }
};
