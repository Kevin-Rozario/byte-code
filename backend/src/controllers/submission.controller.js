import { asyncHandler } from "../utils/asyncHandler.util.js";
import db from "../config/db.config.js";
import ApiError from "../utils/apiError.util.js";
import ApiResponse from "../utils/apiResponse.util.js";

export const getAllSubmissions = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const submissions = await db.submission.findMany({
    where: {
      userId: userId,
    },
  });
  if (!submissions) {
    throw new ApiError(404, "No submissions found", null);
  }
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { message: "Submissions fetched successfully" },
        submissions,
      ),
    );
});

export const getSubmissionByProblemId = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { problemId } = req.params;

  const submission = await db.submission.findMany({
    where: {
      userId: userId,
      problemId: parseInt(problemId),
    },
  });
  if (!submission) {
    throw new ApiError(404, "No submission found", null);
  }
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { message: "Submission fetched successfully" },
        submission,
      ),
    );
});

export const getSubmissionCountByProblemId = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { problemId } = req.params;

  const submissionCount = await db.submission.count({
    where: {
      userId: userId,
      problemId: parseInt(problemId),
    },
  });
  if (!submissionCount) {
    throw new ApiError(404, "No submission found", null);
  }
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { message: "Submission count fetched successfully" },
        submissionCount,
      ),
    );
});
