import {
  getSupportedLanguagesId,
  pollSubmissionResult,
  submitCodeInBatch,
} from "../config/judge0.config.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import ApiResponse from "../utils/apiResponse.util.js";
import db from "../config/db.config.js";

export const createProblem = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testCases,
    codeSnippets,
    referenceSolutions,
  } = req.body;

  for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
    const languageId = getSupportedLanguagesId(language.toLowerCase());
    if (!languageId) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Invalid language", null));
    }

    const submissions = testCases.map(({ input, output }) => ({
      stdin: input,
      expected_output: output,
      language_id: languageId,
      source_code: solutionCode,
    }));

    const tokens = await submitCodeInBatch(submissions);
    const submissionsResults = await pollSubmissionResult(tokens);
    submissionsResults.forEach((result) => {
      console.log(result);
      if (result.status.id !== 3) {
        return res
          .status(400)
          .json(new ApiResponse(400, { message: "Test case failed" }, null));
      }
    });
  }
  // Save the problem to the database
  const savedProblem = await db.problem.create({
    data: {
      title,
      description,
      difficulty,
      tags,
      examples,
      constraints,
      testCases,
      codeSnippets,
      referenceSolutions,
      userId: req.user.id,
    },
  });

  if (!savedProblem) {
    throw new ApiError(500, "Problem creation failed", null);
  }

  return res
    .status(201)
    .json(new ApiResponse(201, { message: "Problem created" }, savedProblem));
});

export const getAllProblems = asyncHandler(async (req, res) => {
  const problems = await db.problem.findMany({
    include: {
      solvedBy: {
        where: {
          userId: req.user.id,
        },
      },
    },
  });
  if (!problems) {
    throw new ApiError(404, "No problems found", null);
  }
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { message: "Problems fetched successfully" },
        problems,
      ),
    );
});

export const getProblemById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const problem = await db.problem.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!problem) {
    throw new ApiError(404, "Problem not found", null);
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, { message: "Problem fetced successfully" }, problem),
    );
});

export const updateProblemById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const problem = await db.problem.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!problem) {
    throw new ApiError(404, "Problem not found", null);
  }

  // to be implemented
});

export const deleteProblemById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const problem = await db.problem.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!problem) {
    throw new ApiError(404, "Problem not found", null);
  }

  await db.problem.delete({
    where: {
      id: parseInt(id),
    },
  });

  res
    .status(200)
    .json(
      new ApiResponse(200, { message: "Problem deleted successfully!" }, {}),
    );
});

export const getSolvedProblems = asyncHandler(async (req, res) => {
  const problems = await db.problem.findMany({
    where: {
      solvedBy: {
        some: {
          userId: req.user.id,
        },
      },
    },
    include: {
      solvedBy: {
        where: {
          userId: req.user.id,
        },
      },
    },
  });

  if (!problems) {
    return res
      .status(404)
      .json(new ApiResponse(404, { message: "No problems solved" }, {}));
  }
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { message: "Problems fetched successfully" },
        problems,
      ),
    );
});
