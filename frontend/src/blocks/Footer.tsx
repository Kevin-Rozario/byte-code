import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div
        className={cn(
          "bg-slate-950 flex flex-col items-center gap-10",
          "py-16 md:py-20 lg:py-30",
          "px-4 sm:px-6 lg:px-8",
          "text-center",
          "relative overflow-hidden w-full",
        )}
      >
        <h1 className="text-5xl font-bold text-white">
          Ready to level up your coding skills?
        </h1>
        <p className="text-[#D1C4E9] text-xl text-center">
          Join thousands of developers who are improving their coding skills and
          landing their dream jobs.
        </p>
        <motion.button
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
          type="button"
          onClick={() => {
            navigate({ to: "/auth/sign-up" });
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign Up Now
        </motion.button>
      </div>
      <div className="w-full bg-slate-950 text-center">
        <p className="text-slate-400 text-sm">
          &copy; 2025 ByteCode. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
