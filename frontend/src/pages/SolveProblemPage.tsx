import { useEffect, useState } from "react";
import {
  Clock,
  Code,
  User2,
  Play,
  BookOpen,
  Trophy,
  TestTube,
  CheckCircle2,
  XCircle,
  Send,
  Lightbulb,
  Target,
  Info,
  History,
  Award,
  Zap,
  TrendingUp,
  Files,
  ArrowLeft,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Card, CardHeader } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CodeEditor from "@/components/CodeEditor/CodeEditor";

interface IProblem {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  constraints: string;
  hints?: string;
  testCases: { input: string; output: string }[];
  codeSnippets: { [key: string]: string };
  examples: {
    [key: string]: {
      input: string;
      output: string;
      explanation?: string;
    };
  };
}

// Keeping mock data for authenticated user as it's relevant for UI display
const authUser = {
  id: "user1",
  role: "ADMIN",
  userName: "JohnDoe",
};

// Mock data - extended test cases for demonstration
const mockProblem: IProblem = {
  id: "1",
  title: "Two Sum",
  description:
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would be exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
  difficulty: "Easy",
  constraints:
    "• 2 <= nums.length <= 10^4\n• -10^9 <= nums[i] <= 10^9\n• -10^9 <= target <= 10^9\n• Only one valid answer exists.",
  hints:
    "A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, the best way to approach this problem is to think about the complement of each number.",
  testCases: [
    { input: "[2,7,11,15]\n9", output: "[0,1]" },
    { input: "[3,2,4]\n6", output: "[1,2]" },
    { input: "[3,3]\n6", output: "[0,1]" },
    { input: "[1,8,7,6,5]\n13", output: "[1,3]" },
    { input: "[10,20,30,40]\n50", output: "[0,3]" },
    { input: "[-1,-2,-3,-4,-5]\n-8", output: "[2,4]" },
    { input: "[1,2,3,4,5,6,7,8,9,10]\n15", output: "[4,9]" },
    {
      input: "[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]\n35",
      output: "[14,19]",
    },
  ],
  codeSnippets: {
    javascript:
      "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    // Your code here\n};",
    python:
      "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        # Your code here\n        pass",
    cpp: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Your code here\n    }\n};",
  },
  examples: {
    "1": {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    "2": {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
      explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
    },
  },
};

const SolveProblemPage = () => {
  const [problem] = useState<IProblem>(mockProblem);
  const [code, setCode] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] =
    useState<string>("javascript");
  const [testResults, setTestResults] = useState<
    Array<{
      status: "passed" | "failed" | "pending";
      input: string;
      output: string;
      expected: string;
    }>
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTestCase, setSelectedTestCase] = useState(0);

  // Added state for mock submissions to demonstrate overflow handling
  const [submissions, setSubmissions] = useState<
    Array<{
      id: string;
      status: "Accepted" | "Wrong Answer";
      language: string;
      runtime: string;
      memory: string;
      timestamp: Date;
    }>
  >([]);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setCode(problem?.codeSnippets[language] || "");
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    // Simulate API call or code execution
    setTimeout(() => {
      // Simulate results for the currently selected test case
      const currentTestCase = problem.testCases[selectedTestCase];
      const simulatedResults = [
        {
          status: Math.random() > 0.3 ? "passed" : "failed", // Random pass/fail
          input: currentTestCase.input,
          output:
            Math.random() > 0.5 ? currentTestCase.output : "[Incorrect Output]", // Simulate incorrect output sometimes
          expected: currentTestCase.output,
        },
      ];
      setTestResults(simulatedResults);
      setIsRunning(false);
    }, 1500); // Shorter timeout for faster feedback
  };

  const handleSubmitCode = async () => {
    setIsSubmitting(true);
    // Simulate API call or code execution for all test cases
    setTimeout(() => {
      // Simulate results for all test cases on submission
      const allTestResults = problem.testCases.map((tc, index) => {
        const passed = Math.random() > 0.2; // 80% chance to pass on submit
        return {
          status: passed ? "passed" : "failed",
          input: tc.input,
          output: passed ? tc.output : "[Wrong Output]",
          expected: tc.output,
        };
      });

      const overallStatus: "Accepted" | "Wrong Answer" = allTestResults.every(
        (r) => r.status === "passed",
      )
        ? "Accepted"
        : "Wrong Answer";

      const newSubmission = {
        id: `sub_${Date.now()}`,
        status: overallStatus,
        language: selectedLanguage,
        runtime: `${Math.floor(Math.random() * (150 - 50 + 1)) + 50} ms`,
        memory: `${(Math.random() * (50 - 20) + 20).toFixed(1)} MB`,
        timestamp: new Date(),
      };

      setSubmissions((prev) => [newSubmission, ...prev]); // Add new submission to the top
      setTestResults(allTestResults); // Display full results after submission
      setIsSubmitting(false);

      if (overallStatus === "Accepted") {
        alert("Code submitted successfully and Accepted!");
      } else {
        alert("Code submitted. Some test cases failed!");
      }
    }, 2500);
  };

  useEffect(() => {
    if (problem) {
      setCode(problem.codeSnippets[selectedLanguage] || "");
      setTestResults([]);
    }
  }, [problem, selectedLanguage]);

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return (
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30 px-2 py-1 text-xs font-semibold rounded-lg border transition-all duration-200 hover:scale-105 cursor-pointer">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3 h-3" />
              EASY
            </div>
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/40 hover:bg-amber-500/30 px-2 py-1 text-xs font-semibold rounded-lg border transition-all duration-200 hover:scale-105 cursor-pointer">
            <div className="flex items-center gap-1.5">
              <Target className="w-3 h-3" />
              MEDIUM
            </div>
          </Badge>
        );
      case "hard":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/40 hover:bg-red-500/30 px-2 py-1 text-xs font-semibold rounded-lg border transition-all duration-200 hover:scale-105 cursor-pointer">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3" />; HARD
            </div>
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return `${seconds} secs ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-700 bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-slate-900/80 h-18 flex items-center">
        <div className="container flex items-center justify-between mx-auto">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-slate-200 hover:text-white hover:bg-slate-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Problems
            </Button>
            <div className="w-px h-6 bg-slate-600"></div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-lg border border-purple-400/20">
                <Code className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h1 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {problem?.title}
                </h1>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Updated 2h ago
                  </span>
                  <span className="flex items-center gap-1">
                    <User2 className="w-3 h-3" />
                    {authUser.userName}
                  </span>
                  {getDifficultyBadge(problem.difficulty)}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Select
              onValueChange={handleLanguageChange}
              defaultValue={selectedLanguage}
            >
              <SelectTrigger className="w-40 bg-slate-800 border-slate-700 text-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {Object.keys(problem?.codeSnippets || {}).map((language) => (
                  <SelectItem
                    key={language}
                    value={language}
                    className="text-slate-200 focus:bg-slate-700"
                  >
                    {language.charAt(0).toUpperCase() + language.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={handleRunCode}
              disabled={isRunning}
              variant="outline"
              className="border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white"
            >
              <Play className="w-4 h-4 mr-2" />
              {isRunning ? "Running..." : "Run"}
            </Button>

            <Button
              onClick={handleSubmitCode}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white border-0"
            >
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content - Takes remaining height */}
      <div className="container mx-auto py-6 flex-1 flex">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          {/* Left Panel: Problem Description */}
          <Card className="flex-1 bg-slate-900/80 border-slate-700 flex flex-col">
            <Tabs defaultValue="description" className="flex-1 flex flex-col">
              <CardHeader className="pb-3">
                <TabsList className="grid w-full grid-cols-3 bg-slate-800 border-slate-700">
                  <TabsTrigger
                    value="description"
                    className="gap-2 text-slate-400 data-[state=active]:text-white data-[state=active]:bg-purple-600"
                  >
                    <Info className="w-4 h-4" />
                    Description
                  </TabsTrigger>
                  <TabsTrigger
                    value="editorial"
                    className="gap-2 text-slate-400 data-[state=active]:text-white data-[state=active]:bg-purple-600"
                  >
                    <BookOpen className="w-4 h-4" />
                    Editorial
                  </TabsTrigger>
                  <TabsTrigger
                    value="solutions"
                    className="gap-2 text-slate-400 data-[state=active]:text-white data-[state=active]:bg-purple-600"
                  >
                    <Trophy className="w-4 h-4" />
                    Solutions
                  </TabsTrigger>
                </TabsList>
              </CardHeader>

              <TabsContent value="description" className="flex-1 mt-0">
                {/* This div controls the scrollable area for description */}
                <div className="h-[calc(100vh-220px)] px-6 pb-6 overflow-y-auto no-scrollbar">
                  <div className="space-y-6">
                    {/* Problem Description */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-slate-200">
                        <Info className="w-5 h-5 text-blue-400" />
                        Problem Description
                      </h3>
                      <p className="text-slate-400 leading-relaxed">
                        {problem?.description}
                      </p>
                    </div>

                    {/* Examples */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-slate-200">
                        <BookOpen className="w-5 h-5 text-cyan-400" />
                        Examples
                      </h3>
                      <div className="space-y-4">
                        {Object.entries(problem?.examples || {}).map(
                          ([key, example]) => (
                            <Card
                              key={key}
                              className="p-4 bg-slate-800 border-slate-700"
                            >
                              <h4 className="font-medium mb-3 text-slate-200">
                                Example {key}
                              </h4>
                              <div className="space-y-3">
                                <div>
                                  <label className="text-sm font-medium text-slate-400">
                                    Input:
                                  </label>
                                  <div className="mt-1 p-3 bg-slate-900 border border-slate-600 rounded-md">
                                    <code className="text-sm font-mono text-purple-400">
                                      {example.input}
                                    </code>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-slate-400">
                                    Output:
                                  </label>
                                  <div className="mt-1 p-3 bg-slate-900 border border-slate-600 rounded-md">
                                    <code className="text-sm font-mono text-cyan-400">
                                      {example.output}
                                    </code>
                                  </div>
                                </div>
                                {example.explanation && (
                                  <div>
                                    <label className="text-sm font-medium text-slate-400">
                                      Explanation:
                                    </label>
                                    <p className="text-sm mt-1 text-slate-300">
                                      {example.explanation}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </Card>
                          ),
                        )}
                      </div>
                    </div>

                    {/* Constraints */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-slate-200">
                        <Target className="w-5 h-5 text-purple-400" />
                        Constraints
                      </h3>
                      <Card className="p-4 bg-slate-800 border-slate-700">
                        <pre className="text-sm whitespace-pre-wrap font-mono text-slate-300">
                          {problem?.constraints}
                        </pre>
                      </Card>
                    </div>

                    {/* Hints */}
                    {problem?.hints && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-slate-200">
                          <Lightbulb className="w-5 h-5 text-cyan-400" />
                          Hints
                        </h3>
                        <Card className="p-4 border-blue-500/30 bg-gradient-to-r from-blue-950/50 to-purple-950/50">
                          <p className="text-sm leading-relaxed text-blue-300">
                            {problem.hints}
                          </p>
                        </Card>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="editorial" className="flex-1 mt-0">
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <Files className="w-12 h-12 mb-4 opacity-50" />
                  <p className="font-medium">Editorial Coming Soon</p>
                  <p className="text-sm">
                    Detailed explanation and approach will be available here.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="solutions" className="flex-1 mt-0">
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <Trophy className="w-12 h-12 mb-4 opacity-50" />
                  <p className="font-medium">Community Solutions</p>
                  <p className="text-sm">
                    Share your accepted solution with the community!
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Right Panel: Code Editor & Test Cases */}
          <div className="flex flex-col gap-6">
            {/* Code Editor */}
            <div className="h-full">
              <CodeEditor
                value={code}
                onChange={setCode}
                language={selectedLanguage}
              />
            </div>

            {/* Test Cases & Results */}
            <Card className="flex-1 bg-slate-900/80 border-slate-700 flex flex-col">
              <Tabs defaultValue="testcase" className="flex-1 flex flex-col">
                <CardHeader className="pb-3">
                  <TabsList className="grid w-full grid-cols-3 bg-slate-800 border-slate-700">
                    <TabsTrigger
                      value="testcase"
                      className="gap-2 text-slate-400 data-[state=active]:text-white data-[state=active]:bg-purple-600"
                    >
                      <TestTube className="w-4 h-4" />
                      Test Case
                    </TabsTrigger>
                    <TabsTrigger
                      value="result"
                      className="gap-2 text-slate-400 data-[state=active]:text-white data-[state=active]:bg-purple-600"
                    >
                      <Trophy className="w-4 h-4" />
                      Result
                    </TabsTrigger>
                    <TabsTrigger
                      value="submissions"
                      className="gap-2 text-slate-400 data-[state=active]:text-white data-[state=active]:bg-purple-600"
                    >
                      <History className="w-4 h-4" />
                      Submissions
                    </TabsTrigger>
                  </TabsList>
                </CardHeader>

                <TabsContent value="testcase" className="flex-1 mt-0">
                  {/* This div controls the scrollable area for test cases */}
                  <div className="h-[calc(50vh-280px)] px-6 pb-6 overflow-y-auto no-scrollbar">
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-2">
                        {problem.testCases.map((_, index) => (
                          <Button
                            key={index}
                            variant={
                              selectedTestCase === index ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => setSelectedTestCase(index)}
                            className={
                              selectedTestCase === index
                                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0"
                                : "border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700"
                            }
                          >
                            Case {index + 1}
                          </Button>
                        ))}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block text-slate-400">
                            Input:
                          </label>
                          <Card className="p-3 bg-slate-800 border-slate-700">
                            <code className="text-sm whitespace-pre-wrap font-mono text-purple-400">
                              {
                                problem.testCases[
                                  selectedTestCase
                                ]?.input.split("\n")[0]
                              }
                            </code>
                          </Card>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block text-slate-400">
                            target =
                          </label>
                          <Card className="p-3 bg-slate-800 border-slate-700">
                            <code className="text-sm whitespace-pre-wrap font-mono text-cyan-400">
                              {
                                problem.testCases[
                                  selectedTestCase
                                ]?.input.split("\n")[1]
                              }
                            </code>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="result" className="flex-1 mt-0">
                  {/* This div controls the scrollable area for results */}
                  <div className="h-[calc(50vh-280px)] px-6 pb-6 overflow-y-auto no-scrollbar">
                    <div className="space-y-4">
                      {testResults.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-32 text-slate-400">
                          <TestTube className="w-8 h-8 mb-2 opacity-50" />
                          <p className="text-sm">
                            Run your code to see results
                          </p>
                        </div>
                      ) : (
                        testResults.map((result, index) => (
                          <Card
                            key={index}
                            className="p-4 bg-slate-800 border-slate-700"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium text-slate-200">
                                Test Case {index + 1}
                              </h4>
                              <div className="flex items-center gap-2">
                                {result.status === "passed" && (
                                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                                )}
                                {result.status === "failed" && (
                                  <XCircle className="w-4 h-4 text-red-400" />
                                )}
                                <Badge
                                  className={
                                    result.status === "passed"
                                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0"
                                      : "bg-gradient-to-r from-red-500 to-purple-500 text-white border-0"
                                  }
                                >
                                  {result.status}
                                </Badge>
                              </div>
                            </div>
                            <div className="space-y-3 text-sm">
                              <div>
                                <span className="font-medium text-slate-400">
                                  Input:
                                </span>
                                <div className="mt-1 p-2 bg-slate-900 border border-slate-600 rounded text-xs font-mono text-slate-300">
                                  {result.input}
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <span className="font-medium text-slate-400">
                                    Your Output:
                                  </span>
                                  <div className="mt-1 p-2 bg-slate-900 border border-slate-600 rounded text-xs font-mono text-purple-400">
                                    {result.output}
                                  </div>
                                </div>
                                <div>
                                  <span className="font-medium text-slate-400">
                                    Expected:
                                  </span>
                                  <div className="mt-1 p-2 bg-slate-900 border border-slate-600 rounded text-xs font-mono text-cyan-400">
                                    {result.expected}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="submissions" className="flex-1 mt-0">
                  {/* This div controls the scrollable area for submissions */}
                  <div className="h-[calc(50vh-280px)] px-6 pb-6 overflow-y-auto no-scrollbar">
                    <div className="space-y-4">
                      {submissions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-32 text-slate-400">
                          <Award className="w-8 h-8 mb-2 opacity-50" />
                          <p className="text-sm">No submissions yet.</p>
                        </div>
                      ) : (
                        submissions.map((submission) => (
                          <Card
                            key={submission.id}
                            className="p-4 bg-slate-800 border-slate-700"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                {submission.status === "Accepted" ? (
                                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-red-400" />
                                )}
                                <span className="font-medium text-slate-200">
                                  {submission.status}
                                </span>
                              </div>
                              <span className="text-sm text-slate-400">
                                {formatTimeAgo(submission.timestamp)}
                              </span>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-slate-400">
                                  Language:
                                </span>
                                <p className="font-medium text-slate-200">
                                  {submission.language.charAt(0).toUpperCase() +
                                    submission.language.slice(1)}
                                </p>
                              </div>
                              <div>
                                <span className="text-slate-400">Runtime:</span>
                                <p className="font-medium text-purple-400">
                                  {submission.runtime}
                                </p>
                              </div>
                              <div>
                                <span className="text-slate-400">Memory:</span>
                                <p className="font-medium text-cyan-400">
                                  {submission.memory}
                                </p>
                              </div>
                            </div>
                          </Card>
                        ))
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolveProblemPage;
