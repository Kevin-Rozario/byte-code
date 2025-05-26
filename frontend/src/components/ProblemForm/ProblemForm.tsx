import { useFieldArray, useForm } from "react-hook-form";
import { Plus, X, Code, CheckCircle } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import CodeEditor from "../CodeEditor/CodeEditor";
import { problemSchema } from "@/lib/validations/addProblemSchema";

type FormFields = z.infer<typeof problemSchema>;

interface Language {
  key: "javascript" | "python" | "java";
  name: string;
  color: string;
}

// --- Sample Problem Data ---
const sampleProblem1: FormFields = {
  title: "Sum of Two Integers",
  description:
    "Given two integers, `a` and `b`, return their sum.\n\nExamples:\n* Example 1:\n    * Input: `a = 1, b = 2`\n    * Output: `3`\n    * Explanation: `1 + 2 = 3`.\n\n* Example 2:\n    * Input: `a = -10, b = 4`\n    * Output: `-6`\n    * Explanation: `-10 + 4 = -6`.",
  difficulty: "EASY",
  constraints: "-1000 <= a <= 1000\n-1000 <= b <= 1000",
  hints: "Consider using standard addition operator.",
  editorial:
    "This problem is a basic test of integer addition. No complex algorithms or data structures are required. Simply return the sum of 'a' and 'b'.",
  tags: [{ name: "math" }, { name: "arithmetic" }, { name: "integers" }],
  testCases: [
    { input: "1\n2", output: "3" },
    { input: "-10\n4", output: "-6" },
    { input: "0\n0", output: "0" },
    { input: "500\n-300", output: "200" },
    { input: "1000\n1000", output: "2000" },
  ],
  examples: {
    javascript: {
      input: "1\n2",
      output: "3",
      explanation: "1 + 2 equals 3.",
    },
    python: {
      input: "-10\n4",
      output: "-6",
      explanation: "-10 + 4 equals -6.",
    },
    java: { input: "0\n0", output: "0", explanation: "0 + 0 equals 0." },
  },
  codeSnippets: {
    javascript:
      "/**\n * @param {number} a\n * @param {number} b\n * @return {number}\n */\nfunction sum(a, b) {\n  // Write your code here\n  return a + b;\n}",
    python:
      'def sum(a: int, b: int) -> int:\n    """\n    :param a: int\n    :param b: int\n    :return: int\n    """\n    # Write your code here\n    return a + b',
    java: "class Solution {\n    /**\n     * Given two integers a and b, return their sum.\n     * @param a The first integer.\n     * @param b The second integer.\n     * @return The sum of a and b.\n     */\n    public int sum(int a, int b) {\n        // Write your code here\n        return a + b;\n    }\n}",
  },
  referenceSolutions: {
    javascript: "function sum(a, b) {\n  return a + b;\n}",
    python: "def sum(a, b):\n    return a + b",
    java: "class Solution {\n    public int sum(int a, int b) {\n        return a + b;\n    }\n}",
  },
};

const sampleProblem2: FormFields = {
  title: "Reverse a String",
  description:
    "Write a function that reverses a string. The input string is given as an array of characters `char[]`.\n\nExamples:\n* Input: `['h','e','l','l','o']`\n* Output: `['o','l','l','e','h']`",
  difficulty: "MEDIUM",
  constraints: "1 <= s.length <= 10^5\ns[i] is a printable ascii character.",
  hints:
    "You might consider using a two-pointer approach for in-place reversal.",
  editorial:
    "This problem can be solved efficiently using a two-pointer technique. Initialize one pointer at the beginning of the array and another at the end. Swap the characters at these pointers, then move the start pointer forward and the end pointer backward until they meet or cross. This performs an in-place reversal.",
  tags: [{ name: "string" }, { name: "two-pointers" }, { name: "array" }],
  testCases: [
    { input: "hello", output: "olleh" },
    { input: "madam", output: "madam" },
    { input: "a", output: "a" },
    { input: "", output: "" }, // Edge case for empty string
  ],
  examples: {
    javascript: {
      input: "['h','e','l','l','o']",
      output: "['o','l','l','e','h']",
      explanation: "The string 'hello' is reversed to 'olleh'.",
    },
    python: {
      input: "['a','p','p','l','e']",
      output: "['e','l','p','p','a']",
      explanation: "The string 'apple' is reversed to 'elppa'.",
    },
    java: {
      input: "['J','a','v','a']",
      output: "['a','v','a','J']",
      explanation: "The string 'Java' is reversed to 'avaJ'.",
    },
  },
  codeSnippets: {
    javascript:
      "/**\n * @param {character[]} s\n * @return {void} Do not return anything, modify s in-place instead.\n */\nfunction reverseString(s) {\n  // Write your code here\n}",
    python:
      'def reverseString(s: list[str]) -> None:\n    """\n    Do not return anything, modify s in-place instead.\n    """\n    # Write your code here\n    pass',
    java: "class Solution {\n    public void reverseString(char[] s) {\n        // Write your code here\n    }\n}",
  },
  referenceSolutions: {
    javascript:
      "function reverseString(s) {\n  let left = 0;\n  let right = s.length - 1;\n  while (left < right) {\n    [s[left], s[right]] = [s[right], s[left]];\n    left++;\n    right--;\n  }\n}",
    python:
      "def reverseString(s: list[str]) -> None:\n    left, right = 0, len(s) - 1\n    while left < right:\n        s[left], s[right] = s[right], s[left]\n        left += 1\n        right -= 1",
    java: "class Solution {\n    public void reverseString(char[] s) {\n        int left = 0, right = s.length - 1;\n        while (left < right) {\n            char temp = s[left];\n            s[left] = s[right];\n            s[right] = temp;\n            left++;\n            right--;\n        }\n    }\n}",
  },
};

const ProblemForm = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      title: "",
      description: "",
      difficulty: "EASY",
      constraints: "",
      hints: "",
      editorial: "",
      testCases: [{ input: "", output: "" }],
      tags: [{ name: "" }],
      examples: {
        javascript: { input: "", output: "", explanation: "" },
        python: { input: "", output: "", explanation: "" },
        java: { input: "", output: "", explanation: "" },
      },
      codeSnippets: {
        javascript: "function solution() {\n  // Write your code here\n}",
        python: "def solution():\n    # Write your code here\n    pass",
        java: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
      },
      referenceSolutions: {
        javascript: "",
        python: "",
        java: "",
      },
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const {
    fields: testCasesFields,
    append: appendTestCase,
    remove: removeTestCase,
  } = useFieldArray({
    control,
    name: "testCases",
  });

  const {
    fields: tagsFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const languages: Language[] = [
    { key: "javascript", name: "JavaScript", color: "text-yellow-400" },
    { key: "python", name: "Python", color: "text-blue-400" },
    { key: "java", name: "Java", color: "text-red-400" },
  ];

  const onSubmit = (data: FormFields): void => {
    console.log("Form submitted:", data);
    // Handle form submission, e.g., send data to an API
  };

  /**
   * Loads a sample problem into the form.
   * @param problem The sample problem object to load.
   */
  const loadSampleProblem = (problem: FormFields) => {
    form.reset(problem); // Resets the form with the new data
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-slate-200">
                Basic Information
              </h2>
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={() => loadSampleProblem(sampleProblem1)}
                  className="bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 border-0 text-xs py-1 px-3 h-auto"
                >
                  Load Sample 1
                </Button>
                <Button
                  type="button"
                  onClick={() => loadSampleProblem(sampleProblem2)}
                  className="bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 border-0 text-xs py-1 px-3 h-auto"
                >
                  Load Sample 2
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">
                      Problem Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter problem title..."
                        className="bg-slate-800 border-slate-600 text-slate-200 placeholder-slate-400 focus-visible:ring-purple-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the problem in detail..."
                        rows={6}
                        className="bg-slate-800 border-slate-600 text-slate-200 placeholder-slate-400 focus-visible:ring-purple-500 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Difficulty</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full bg-slate-800 border-slate-600 text-slate-200 focus:ring-purple-500 focus:ring-offset-slate-950">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-slate-800 border-slate-600 text-slate-200">
                        <SelectItem value="EASY">🟢 Easy</SelectItem>
                        <SelectItem value="MEDIUM">🟡 Medium</SelectItem>
                        <SelectItem value="HARD">🔴 Hard</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Constraints */}
          <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-slate-200 mb-6">
              Constraints
            </h2>
            <FormField
              control={control}
              name="constraints"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">
                    Problem Constraints
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Define constraints for the problem (e.g., input ranges, time/space complexity)..."
                      rows={4}
                      className="bg-slate-800 border-slate-600 text-slate-200 placeholder-slate-400 focus-visible:ring-purple-500 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>

          {/* Hints */}
          <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-slate-200 mb-6">
              Hints (Optional)
            </h2>
            <FormField
              control={control}
              name="hints"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">
                    Problem Hints
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide optional hints for the problem..."
                      rows={4}
                      className="bg-slate-800 border-slate-600 text-slate-200 placeholder-slate-400 focus-visible:ring-purple-500 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>

          {/* Editorial */}
          <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-slate-200 mb-6">
              Editorial (Optional)
            </h2>
            <FormField
              control={control}
              name="editorial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">
                    Problem Editorial
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a detailed editorial/solution explanation..."
                      rows={6}
                      className="bg-slate-800 border-slate-600 text-slate-200 placeholder-slate-400 focus-visible:ring-purple-500 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>

          {/* Tags */}
          <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-slate-200 mb-6">Tags</h2>

            <div className="space-y-4">
              {tagsFields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={control}
                  name={`tags.${index}.name`}
                  render={({ field: tagField }) => (
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <Input
                          placeholder="Enter tag (e.g., array, dynamic-programming)..."
                          className="flex-1 bg-slate-800 border-slate-600 text-slate-200 placeholder-slate-400 focus-visible:ring-blue-500"
                          {...tagField}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        onClick={() => removeTag(index)}
                        disabled={tagsFields.length <= 1}
                        variant="ghost"
                        className="bg-red-600/20 text-red-400 hover:bg-red-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
                        size="icon"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              ))}

              <Button
                type="button"
                onClick={() => appendTag({ name: "" })}
                className="flex items-center gap-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border-0"
              >
                <Plus className="w-4 h-4" />
                Add Tag
              </Button>

              {form.formState.errors.tags &&
                typeof form.formState.errors.tags.message === "string" && (
                  <p className="text-red-400 text-sm">
                    {form.formState.errors.tags.message}
                  </p>
                )}
            </div>
          </div>

          {/* Test Cases */}
          <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-slate-200 mb-6">
              Test Cases
            </h2>

            <div className="space-y-4">
              {testCasesFields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 bg-slate-800/50 rounded-lg border border-slate-600"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-slate-300">
                      Test Case {index + 1}
                    </span>
                    <Button
                      type="button"
                      onClick={() => removeTestCase(index)}
                      disabled={testCasesFields.length <= 1}
                      variant="ghost"
                      className="p-1 text-red-400 hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      size="icon"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={control}
                      name={`testCases.${index}.input`}
                      render={({ field: inputField }) => (
                        <FormItem>
                          <FormLabel className="text-slate-400 text-xs">
                            Input
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Test input..."
                              rows={3}
                              className="bg-slate-800 border-slate-600 text-slate-200 placeholder-slate-400 focus-visible:ring-green-500 resize-none font-mono text-sm"
                              {...inputField}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`testCases.${index}.output`}
                      render={({ field: outputField }) => (
                        <FormItem>
                          <FormLabel className="text-slate-400 text-xs">
                            Expected Output
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Expected output..."
                              rows={3}
                              className="bg-slate-800 border-slate-600 text-slate-200 placeholder-slate-400 focus-visible:ring-green-500 resize-none font-mono text-sm"
                              {...outputField}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}

              <Button
                type="button"
                onClick={() => appendTestCase({ input: "", output: "" })}
                className="flex items-center gap-2 bg-green-600/20 text-green-400 hover:bg-green-600/30 border-0"
              >
                <Plus className="w-4 h-4" />
                Add Test Case
              </Button>

              {form.formState.errors.testCases &&
                typeof form.formState.errors.testCases.message === "string" && (
                  <p className="text-red-400 text-sm">
                    {form.formState.errors.testCases.message}
                  </p>
                )}
            </div>
          </div>

          {/* Examples */}
          <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-slate-200 mb-6">
              Examples
            </h2>
            <div className="space-y-8">
              {languages.map((lang) => (
                <div
                  key={lang.key}
                  className="p-4 bg-slate-800/50 rounded-lg border border-slate-600"
                >
                  <h3 className={`text-base font-semibold mb-4 ${lang.color}`}>
                    {lang.name} Example
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={control}
                      name={`examples.${lang.key}.input`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-400 text-xs">
                            Input
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={`Example input for ${lang.name}...`}
                              rows={3}
                              className="bg-slate-800 border-slate-600 text-slate-200 placeholder-slate-400 focus-visible:ring-blue-500 resize-none font-mono text-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`examples.${lang.key}.output`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-400 text-xs">
                            Expected Output
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={`Expected output for ${lang.name}...`}
                              rows={3}
                              className="bg-slate-800 border-slate-600 text-slate-200 placeholder-slate-400 focus-visible:ring-blue-500 resize-none font-mono text-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={control}
                    name={`examples.${lang.key}.explanation`}
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel className="text-slate-400 text-xs">
                          Explanation (Optional)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={`Explanation for ${lang.name} example...`}
                            rows={3}
                            className="bg-slate-800 border-slate-600 text-slate-200 placeholder-slate-400 focus-visible:ring-blue-500 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Code Templates */}
          <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-slate-200 mb-6">
              Code Templates
            </h2>

            <div className="space-y-6">
              {languages.map((lang) => (
                <FormField
                  key={lang.key}
                  control={control}
                  name={`codeSnippets.${lang.key}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={`block text-sm font-medium mb-3 ${lang.color}`}
                      >
                        {lang.name} Template
                      </FormLabel>
                      <FormControl>
                        <CodeEditor
                          value={field.value}
                          onChange={field.onChange}
                          language={lang.key}
                          height="150px"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>

          {/* Reference Solutions */}
          <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-slate-200 mb-6">
              Reference Solutions
            </h2>

            <div className="space-y-6">
              {languages.map((lang) => (
                <FormField
                  key={lang.key}
                  control={control}
                  name={`referenceSolutions.${lang.key}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={`block text-sm font-medium mb-3 ${lang.color}`}
                      >
                        {lang.name} Reference Solution
                      </FormLabel>
                      <FormControl>
                        <CodeEditor
                          value={field.value}
                          onChange={field.onChange}
                          language={lang.key}
                          height="200px"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              onClick={() => console.log("Draft saved")}
              className="bg-slate-700 text-slate-300 hover:bg-slate-600 border-0"
            >
              Save Draft
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <CheckCircle className="w-4 h-4" />
              {isSubmitting ? "Creating..." : "Create Problem"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProblemForm;
