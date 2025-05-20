import { motion } from "framer-motion";
// import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Code2,
  BookOpen,
  Zap,
  TrendingUp,
  Users,
  ListChecks,
} from "lucide-react";

// Feature Data with Icons
const features = [
  {
    title: "Interactive Coding Environment",
    description:
      "Write, run, and test your code directly in the browser with our powerful code editor.",
    icon: Code2,
  },
  {
    title: "Comprehensive Problem Library",
    description:
      "Access hundreds of coding problems across various difficulty levels and topics.",
    icon: BookOpen,
  },
  {
    title: "Real-time Feedback",
    description:
      "Get instant feedback on your code with detailed test cases and performance metrics.",
    icon: Zap,
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your progress with detailed statistics and visualizations of your performance.",
    icon: TrendingUp,
  },
  {
    title: "Community Solutions",
    description:
      "Learn from others by exploring community solutions and discussions after solving problems.",
    icon: Users,
  },
  {
    title: "Custom Playlists",
    description:
      "Create and share custom problem playlists to focus on specific topics or interview preparation.",
    icon: ListChecks,
  },
];

// Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeInOut",
    },
  }),
};

const FeatureSection = () => {
  return (
    <section className="py-12 bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
            Platform Features
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Everything you need to practice coding, prepare for interviews, and
            improve your skills.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                <Card className="bg-slate-900/80 border border-slate-800 shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02] flex flex-col h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-slate-200">
                      <Icon className="h-6 w-6 text-purple-400" />
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-slate-400 text-base">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
