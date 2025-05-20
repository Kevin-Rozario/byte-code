import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, BookOpen, CheckCircle, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  return (
    <section
      className={cn(
        "bg-slate-950",
        "py-16 md:py-24 lg:py-32",
        "px-4 sm:px-6 lg:px-8",
        "text-center",
        "relative overflow-hidden",
      )}
    >
      <div className="relative z-10">
        {/* Coding Platform Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 text-purple-400 text-sm font-semibold flex items-center justify-center gap-2"
        >
          <Code2 className="h-4 w-4" />
          Coding Platform
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={cn(
            "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
            "font-bold",
            "bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400",
            "bg-clip-text text-transparent",
            "mb-4 md:mb-6",
          )}
        >
          Master Coding Challenges
          <br />
          Ace Technical Interviews
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={cn(
            "text-slate-400",
            "text-lg sm:text-xl",
            "max-w-3xl mx-auto",
            "mb-8 md:mb-12",
          )}
        >
          Practice with hundreds of coding problems, track your progress, and
          improve your skills to land your dream job.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button
            variant="default"
            size="lg"
            className={cn(
              "bg-gradient-to-r from-purple-600 to-blue-600",
              "hover:from-purple-500 hover:to-blue-500",
              "text-white font-semibold rounded-full px-8 py-3",
              "transition-all duration-300 shadow-lg hover:shadow-purple-500/50",
              "flex items-center gap-2",
            )}
            onClick={() => {
              window.location.href = "/start-coding";
            }}
          >
            Start Coding <ArrowRight className="h-5 w-5" />
          </Button>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-300"
        >
          <div className="flex flex-col items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <h3 className="text-lg font-semibold text-slate-200">
              300+ Problems
            </h3>
            <p className="text-sm">
              From easy to hard, covering all common algorithms and data
              structures.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Zap className="h-6 w-6 text-yellow-500" />
            <h3 className="text-lg font-semibold text-slate-200">
              Multiple Languages
            </h3>
            <p className="text-sm">
              Code in JavaScript, Python, Java, C++, and more.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-500" />
            <h3 className="text-lg font-semibold text-slate-200">
              Progress Tracking
            </h3>
            <p className="text-sm">
              Track your progress and see your improvement over time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
