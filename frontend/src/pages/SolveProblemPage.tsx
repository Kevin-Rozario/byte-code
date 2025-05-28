import { useEffect, useState } from "react";
import {
  Clock,
  Code,
  Play,
  BookOpen,
  Trophy,
  TestTube,
  // CheckCircle2,
  // XCircle,
  Send,
  Lightbulb,
  Target,
  Info,
  History,
  // Award,
  Zap,
  TrendingUp,
  Files,
  ArrowLeftCircle,
  Users,
  CheckCircle,
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
import {
  useProblemStore,
  type IProblem,
  type ITestCase,
} from "@/stores/problemStore";
import { useAuthStore } from "@/stores/authStore";
import { useExecuteStore } from "@/stores/executeStore";
import { Route } from "@/routes/problems/problem.$id.lazy";
import { getLanguageId } from "@/lib/utils/language";
import TestCaseResults, {
  type ISubmissionResultProps,
} from "@/components/TestCaseResults/TestCaseResults";
import { Link } from "@tanstack/react-router";
import { useSubmissionStore } from "@/stores/submissionStore";
import Submissions from "@/components/Submissions/Submissions";
import toast from "react-hot-toast";

const SolveProblemPage = () => {
  const authUser = useAuthStore((state) => state.user);
  const { id } = Route.useParams();
  const problem = useProblemStore<IProblem | null>((state) => state.problem);
  // const isProblemLoading = useProblemStore<boolean>(
  //   (state) => state.isProblemLoading,
  // );
  const getProblemById = useProblemStore((state) => state.getProblemById);
  const isExecuting = useExecuteStore((state) => state.isExecuting);
  const executeProblem = useExecuteStore((state) => state.executeCode);
  const isSubmissonsLoading = useSubmissionStore((state) => state.isLoading);
  const submissionsByUser = useSubmissionStore(
    (state) => state.submissionsByUser,
  );
  const submissionsForProblemByUser = useSubmissionStore(
    (state) => state.submissionsForProblemByUser,
  );
  const submissionsCountForProblem = useSubmissionStore(
    (state) => state.submissionsCountForProblem,
  );
  const getSubmissionsByUser = useSubmissionStore(
    (state) => state.getSubmissionsByUser,
  );
  const getSubmissionsForProblemByUser = useSubmissionStore(
    (state) => state.getSubmissionsForProblemByUser,
  );
  const getSubmissionsCountForProblem = useSubmissionStore(
    (state) => state.getSubmissionsCountForProblem,
  );
  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] =
    useState<string>("javascript");
  const [testCases, setTestCases] = useState<ITestCase[]>([]);
  const [selectedTestCase, setSelectedTestCase] = useState<number>(0);
  const submission = useExecuteStore((state) => state.submission);

  useEffect(() => {
    getProblemById(id);
    getSubmissionsCountForProblem(id);
  }, [getProblemById, getSubmissionsCountForProblem, id]);

  useEffect(() => {
    if (problem) {
      setCode(problem?.codeSnippets?.[selectedLanguage] || "");
      setTestCases(
        problem?.testCases.map((testCase) => ({
          input: testCase.input,
          output: testCase.output,
        })) || [],
      );
    }
  }, [problem, selectedLanguage]);

  useEffect(() => {
    if (submission) {
      console.log("Submission data received:", submission);
    } else {
      console.log("No submission data received.");
    }
  }, [submission]);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setCode(problem?.codeSnippets?.[language] || "");
  };

  const handleRunCode = (e) => {
    e.preventDefault();

    if (!authUser) {
      toast.error("Please sign in to submit your code.");
      return;
    }

    try {
      const languageId = getLanguageId(selectedLanguage);
      const stdin = problem?.testCases.map((testCase) => testCase.input) || [];
      const expectedOutputs =
        problem?.testCases.map((testCase) => testCase.output) || [];
      const problemId = problem?.id ?? "";
      const sourceCode = code;

      executeProblem({
        sourceCode,
        languageId,
        stdin,
        expectedOutputs,
        problemId,
      });
    } catch (err) {
      console.error("Error setting up code execution:", err);
    }
  };

  const handleGetSubmission = (id: string) => {
    getSubmissionsForProblemByUser(id);
  };

  const prepareSubmissionForResult = () => {
    if (!submission?.testCases) return null;
    const finalTestCases: ISubmissionResultProps[] = submission.testCases.map(
      (testCase) => ({
        ...testCase,
        stdin:
          testCases.find((tc) => tc.output === testCase.expected)?.input ?? "",
      }),
    );

    return finalTestCases;
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-700 bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-slate-900/80 h-18 flex items-center">
        <div className="container flex items-center justify-between mx-auto">
          <div className="flex items-center gap-4">
            <Link to="/problems">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-slate-200 hover:text-white hover:bg-slate-800"
              >
                <ArrowLeftCircle className="w-6 h-6" />
                Back to Problems
              </Button>
            </Link>
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
                    <Clock className="w-3 h-3 mr-1" />
                    Updated{" "}
                    {problem?.updatedAt
                      ? new Date(problem.updatedAt).toDateString()
                      : ""}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 mr-1" />
                    {submissionsCountForProblem} submissions
                  </span>
                  {getDifficultyBadge(problem?.difficulty || "")}
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
                    className="text-slate-200 focus:bg-purple-700/40 focus:text-white"
                  >
                    {language.charAt(0).toUpperCase() + language.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={handleRunCode}
              disabled={isExecuting}
              variant="outline"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white border-0"
            >
              <Play className="w-4 h-4 mr-1" />
              {isExecuting ? "Executing..." : "Execute"}
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
                <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-slate-700">
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
                    value="submissions"
                    onClick={() => handleGetSubmission(problem?.id || "")}
                    className="gap-2 text-slate-400 data-[state=active]:text-white data-[state=active]:bg-purple-600"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Submissions
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

              {/* Problem Description */}
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

              {/* Editorials */}
              <TabsContent value="editorial" className="flex-1 mt-0">
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <Files className="w-12 h-12 mb-4 opacity-50" />
                  <p className="font-medium">Editorial Coming Soon</p>
                  <p className="text-sm">
                    Detailed explanation and approach will be available here.
                  </p>
                </div>
              </TabsContent>

              {/* Submissions */}
              <TabsContent value="submissions" className="flex-1 mt-0">
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <Submissions
                    submissions={submissionsForProblemByUser}
                    isLoading={isSubmissonsLoading}
                  />
                </div>
              </TabsContent>

              {/* Solutions */}
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
                  <TabsList className="grid w-full grid-cols-2 bg-slate-800 border-slate-700">
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
                  </TabsList>
                </CardHeader>

                <TabsContent value="testcase" className="flex-1 mt-0">
                  {/* This div controls the scrollable area for test cases */}
                  <div className="h-[calc(50vh-280px)] px-6 pb-6 overflow-y-auto no-scrollbar">
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-2">
                        {problem?.testCases.map((_, index) => (
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
                            Input
                          </label>
                          <Card className="p-3 bg-slate-800 border-slate-700">
                            <code className="text-sm whitespace-pre-wrap font-mono text-purple-400">
                              {
                                problem?.testCases[
                                  selectedTestCase
                                ]?.input.split("\n")[0]
                              }
                            </code>
                          </Card>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block text-slate-400">
                            Expected Output
                          </label>
                          <Card className="p-3 bg-slate-800 border-slate-700">
                            <code className="text-sm whitespace-pre-wrap font-mono text-cyan-400">
                              {problem?.testCases[selectedTestCase]?.output}
                            </code>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="result" className="flex-1 mt-0">
                  {/* This div controls the scrollable area for results */}
                  <TestCaseResults testResults={prepareSubmissionForResult()} />
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
