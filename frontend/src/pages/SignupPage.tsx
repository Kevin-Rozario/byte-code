import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Code2,
  Eye,
  EyeOff,
  Github,
  Sparkles,
  Star,
  User,
  UserCheck,
  Mail,
  Lock,
  Loader2,
} from "lucide-react";
import { signupSchema } from "@/lib/validations/signupSchema";
import {
  Form,
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

type FormFields = z.infer<typeof signupSchema>;

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<FormFields>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      userName: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(data);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 text-purple-400/10 transform rotate-12">
            <Code2 className="h-24 w-24" />
          </div>
          <div className="absolute top-32 right-20 text-blue-400/10 transform -rotate-45">
            <Star className="h-16 w-16" />
          </div>
          <div className="absolute bottom-32 left-20 text-indigo-400/10 transform rotate-45">
            <Sparkles className="h-20 w-20" />
          </div>
          <div className="absolute bottom-20 right-32 text-purple-400/10 transform -rotate-12">
            <Github className="h-18 w-18" />
          </div>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b5cf620_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf620_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

        <div className="w-full max-w-lg relative z-10">
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-500/30 rounded-3xl blur-xl animate-pulse"></div>

          <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-3xl p-10 shadow-2xl">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-75"></div>
                  <div className="relative bg-gradient-to-br from-purple-500 to-blue-600 p-4 rounded-2xl">
                    <Code2 className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                Join ByteCode
              </h1>
              <p className="text-slate-400 text-lg">
                Start your coding journey today
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="userName"
                    render={({ field, fieldState }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                          <User className="h-4 w-4 text-purple-400" />
                          Username
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Input
                              placeholder="johndoe"
                              {...field}
                              className={`w-full px-4 py-3 bg-slate-800/70 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 ${
                                fieldState.error
                                  ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
                                  : "border-slate-600/50 focus:ring-purple-500/50 focus:border-purple-500 group-hover:border-slate-500"
                              }`}
                            />
                            <div
                              className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${fieldState.error ? "opacity-0" : "opacity-0 group-focus-within:opacity-100"} bg-gradient-to-r from-purple-500/10 to-blue-500/10 pointer-events-none`}
                            ></div>
                          </div>
                        </FormControl>
                        {fieldState.error && (
                          <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                            <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                            {fieldState.error.message}
                          </p>
                        )}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-purple-400" />
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Input
                              placeholder="John Doe"
                              {...field}
                              className={`w-full px-4 py-3 bg-slate-800/70 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 ${
                                fieldState.error
                                  ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
                                  : "border-slate-600/50 focus:ring-purple-500/50 focus:border-purple-500 group-hover:border-slate-500"
                              }`}
                            />
                            <div
                              className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${fieldState.error ? "opacity-0" : "opacity-0 group-focus-within:opacity-100"} bg-gradient-to-r from-purple-500/10 to-blue-500/10 pointer-events-none`}
                            ></div>
                          </div>
                        </FormControl>
                        {fieldState.error && (
                          <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                            <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                            {fieldState.error.message}
                          </p>
                        )}
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                        <Mail className="h-4 w-4 text-purple-400" />
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Input
                            type="email"
                            placeholder="johndoe@example.com"
                            {...field}
                            className={`w-full px-5 py-4 bg-slate-800/70 border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 ${
                              fieldState.error
                                ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
                                : "border-slate-600/50 focus:ring-purple-500/50 focus:border-purple-500 group-hover:border-slate-500"
                            }`}
                          />
                          <div
                            className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${fieldState.error ? "opacity-0" : "opacity-0 group-focus-within:opacity-100"} bg-gradient-to-r from-purple-500/10 to-blue-500/10 pointer-events-none`}
                          ></div>
                        </div>
                      </FormControl>
                      {fieldState.error && (
                        <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                          <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                          {fieldState.error.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                        <Lock className="h-4 w-4 text-purple-400" />
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...field}
                            className={`w-full px-5 py-4 pr-14 bg-slate-800/70 border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 ${
                              fieldState.error
                                ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
                                : "border-slate-600/50 focus:ring-purple-500/50 focus:border-purple-500 group-hover:border-slate-500"
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-all duration-200 p-1 rounded-lg hover:bg-slate-700/50"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                          <div
                            className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${fieldState.error ? "opacity-0" : "opacity-0 group-focus-within:opacity-100"} bg-gradient-to-r from-purple-500/10 to-blue-500/10 pointer-events-none`}
                          ></div>
                        </div>
                      </FormControl>
                      <FormDescription className="text-slate-400 text-xs mt-1">
                        Password must be at least 8 characters long
                      </FormDescription>
                      {fieldState.error && (
                        <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                          <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                          {fieldState.error.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field, fieldState }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                        <Lock className="h-4 w-4 text-purple-400" />
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            {...field}
                            className={`w-full px-5 py-4 pr-14 bg-slate-800/70 border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 ${
                              fieldState.error
                                ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
                                : "border-slate-600/50 focus:ring-purple-500/50 focus:border-purple-500 group-hover:border-slate-500"
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-all duration-200 p-1 rounded-lg hover:bg-slate-700/50"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                          <div
                            className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${fieldState.error ? "opacity-0" : "opacity-0 group-focus-within:opacity-100"} bg-gradient-to-r from-purple-500/10 to-blue-500/10 pointer-events-none`}
                          ></div>
                        </div>
                      </FormControl>
                      {fieldState.error && (
                        <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                          <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                          {fieldState.error.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full relative py-4 px-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group overflow-hidden mt-8"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center gap-2">
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <span>Create Account</span>
                    )}
                  </div>
                </Button>
              </form>
            </Form>

            <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-slate-700"></div>
              <div className="px-4 text-slate-400 text-sm">or</div>
              <div className="flex-1 border-t border-slate-700"></div>
            </div>

            <button className="w-full py-3 px-6 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 hover:border-slate-500 text-slate-200 font-medium rounded-2xl transition-all duration-300 transform hover:scale-[1.01] flex items-center justify-center gap-3">
              <Github className="h-5 w-5" />
              Continue with GitHub
            </button>

            <div className="text-center mt-8 pt-6 border-t border-slate-700/50">
              <p className="text-slate-400">
                Already have an account?{" "}
                <Link
                  to="/auth/sign-in"
                  className="text-purple-400 hover:text-purple-300 transition-colors duration-200 font-semibold hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
