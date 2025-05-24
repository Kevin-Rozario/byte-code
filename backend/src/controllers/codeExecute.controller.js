import {
  getSupportedLanguagesName,
  pollSubmissionResult,
  submitCodeInBatch,
} from "../config/judge0.config.js";
import ApiError from "../utils/apiError.util.js";
import ApiResponse from "../utils/apiResponse.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import db from "../config/db.config.js";

export const executeCode = asyncHandler(async (req, res) => {
  const { sourceCode, languageId, stdin, expectedOutputs, problemId } =
    req.body;
  const userId = req.user?.id;

  if (
    !Array.isArray(stdin) ||
    !Array.isArray(expectedOutputs) ||
    stdin.length == 0 ||
    expectedOutputs.length !== stdin.length
  ) {
    throw new ApiError(400, "Invalid or missing test cases");
  }

  const submission = stdin.map((input) => ({
    source_code: sourceCode,
    stdin: input,
    language_id: languageId,
  }));

  const tokens = await submitCodeInBatch(submission);
  const submissionsResults = await pollSubmissionResult(tokens);

  // analyse the output
  let allPassed = true;
  const detailedResults = submissionsResults.map((result, index) => {
    const stdout = result.stdout?.trim();
    const expected = expectedOutputs[index].trim();
    const passed = stdout === expected;

    if (!passed) allPassed = false;

    return {
      testCase: index + 1,
      passed,
      stdout,
      expected,
      stderr: result.stderr?.trim(),
      compile_output: result.compile_output?.trim(),
      status: result.status.description,
      memory: result.memory ? `${result.memory} KB` : undefined,
      time: result.time ? `${result.time} s` : undefined,
    };
  });

  const Status = {
    ACCEPTED: "ACCEPTED",
    WRONG_ANSWER: "WRONG_ANSWER",
  };

  // save the result to the database
  const savedSubmission = await db.submission.create({
    data: {
      userId,
      problemId,
      sourceCode,
      language: getSupportedLanguagesName(languageId),
      stdin: stdin.join("\n"),
      stdout: JSON.stringify(detailedResults.map((result) => result.stdout)),
      stderr: detailedResults.some((result) => result.stderr)
        ? JSON.stringify(detailedResults.map((result) => result.stderr))
        : null,
      compileOutput: detailedResults.some((result) => result.compile_output)
        ? JSON.stringify(detailedResults.map((result) => result.compile_output))
        : null,
      status: allPassed ? Status.ACCEPTED : Status.WRONG_ANSWER,
      memory: detailedResults.some((result) => result.memory)
        ? JSON.stringify(detailedResults.map((result) => result.memory))
        : null,
      time: detailedResults.some((result) => result.time)
        ? JSON.stringify(detailedResults.map((result) => result.time))
        : null,
    },
  });

  if (allPassed) {
    await db.problemSolved.upsert({
      where: {
        userId_problemId: {
          userId,
          problemId,
        },
      },
      update: {},
      create: {
        userId,
        problemId,
      },
    });
  }

  const testCaseResults = detailedResults.map((result) => ({
    submissionId: savedSubmission.id,
    testCase: result.testCase,
    passed: result.passed,
    stdout: result.stdout,
    expected: result.expected,
    stderr: result.stderr,
    compileOutput: result.compile_output,
    status: result.status,
    memory: result.memory,
    time: result.time,
  }));

  await db.testCaseResult.createMany({
    data: testCaseResults,
  });

  const submissionWithTestCases = await db.submission.findUnique({
    where: {
      id: savedSubmission.id,
    },
    include: {
      testCases: true,
    },
  });

  res.status(200).json(
    new ApiResponse(200, "Code executed successfully", {
      submission: submissionWithTestCases,
    }),
  );
});
