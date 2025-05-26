import { useFieldArray, useForm } from "react-hook-form";
import { Plus, X, Code, CheckCircle } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// --- Shadcn UI Components ---
// Ensure these are installed and imported correctly based on your project structure
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
// --- End Shadcn UI Components ---

import CodeEditor from "../CodeEditor/CodeEditor"; // Assuming this component is external
import { problemSchema } from "@/lib/validations/addProblemSchema"; // Your Zod schema

// Define the type for form fields based on your Zod schema
type FormFields = z.infer<typeof problemSchema>;

// Interface for language configuration
interface Language {
  key: "javascript" | "python" | "java";
  name: string;
  color: string;
}

const ProblemForm = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      title: "",
      description: "",
      difficulty: "EASY",
      testCases: [{ input: "", output: "" }],
      tags: [{ name: "" }],
      codeSnippets: {
        javascript: "function solution() {\n  // Write your code here\n}",
        python: "def solution():\n    # Write your code here\n    pass",
        java: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
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

  // Function to handle form submission
  const onSubmit = (data: FormFields): void => {
    console.log("Form submitted:", data);
    // Here you would typically send the data to your API
    // Example: await yourApiCall(data);
    // You might want to add a toast/notification here for success/failure
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-600/20 rounded-lg">
              <Code className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Create Problem
              </h1>
              <p className="text-slate-400 text-sm">
                Design a new coding challenge
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-6">
              <h2 className="text-lg font-semibold text-slate-200 mb-6">
                Basic Information
              </h2>

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
                      <FormLabel className="text-slate-300">
                        Difficulty
                      </FormLabel>
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
                          <SelectItem value="EASY">Easy</SelectItem>
                          <SelectItem value="MEDIUM">Medium</SelectItem>
                          <SelectItem value="HARD">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Tags */}
            <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-6">
              <h2 className="text-lg font-semibold text-slate-200 mb-6">
                Tags
              </h2>

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

                {/* Display general array error for test cases, if any */}
                {form.formState.errors.testCases &&
                  typeof form.formState.errors.testCases.message ===
                    "string" && (
                    <p className="text-red-400 text-sm">
                      {form.formState.errors.testCases.message}
                    </p>
                  )}
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

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
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
    </div>
  );
};

export default ProblemForm;
