import React from "react";
import { motion } from "framer-motion";
import { Star, User, Code, Laptop, Brain } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: React.ReactNode;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Software Engineer",
    company: "Google",
    content:
      "ByteCode has transformed my coding interview preparation. The problems are well-structured and the explanations are crystal clear.",
    rating: 5,
    avatar: <User className="text-purple-400" size={20} />,
  },
  {
    id: 2,
    name: "Alex Rodriguez",
    role: "Full Stack Developer",
    company: "Meta",
    content:
      "I love the interactive coding environment. It's helped me improve my problem-solving skills tremendously.",
    rating: 5,
    avatar: <Code className="text-blue-400" size={20} />,
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Backend Engineer",
    company: "Microsoft",
    content:
      "The variety of problems and difficulty levels makes ByteCode perfect for continuous learning and growth.",
    rating: 5,
    avatar: <Laptop className="text-cyan-400" size={20} />,
  },
  {
    id: 4,
    name: "Michael Kim",
    role: "Senior Developer",
    company: "Amazon",
    content:
      "ByteCode's platform is intuitive and the coding challenges are exactly what you need for technical interviews.",
    rating: 5,
    avatar: <Brain className="text-purple-400" size={20} />,
  },
  {
    id: 5,
    name: "Jessica Liu",
    role: "Frontend Developer",
    company: "Apple",
    content:
      "The real-time feedback and detailed solutions have accelerated my learning process significantly.",
    rating: 5,
    avatar: <User className="text-blue-400" size={20} />,
  },
  {
    id: 6,
    name: "David Thompson",
    role: "DevOps Engineer",
    company: "Netflix",
    content:
      "Outstanding platform with challenging problems that mirror real-world scenarios perfectly.",
    rating: 5,
    avatar: <Code className="text-cyan-400" size={20} />,
  },
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => {
  return (
    <div className="flex-shrink-0 w-80 mx-4">
      <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-xl p-6 h-full">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            {testimonial.avatar}
          </div>
          <div>
            <h4 className="text-slate-200 font-semibold">{testimonial.name}</h4>
            <p className="text-slate-400 text-sm">
              {testimonial.role} at {testimonial.company}
            </p>
          </div>
        </div>

        {/* Rating Stars */}
        <div className="flex gap-1 mt-5">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star
              key={i}
              className="text-yellow-400 fill-yellow-400"
              size={16}
            />
          ))}
        </div>

        {/* Content */}
        <p className="text-slate-200 mt-5 leading-relaxed">
          "{testimonial.content}"
        </p>
      </div>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            What Developers Say
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Join thousands of developers who have transformed their coding
            skills with ByteCode
          </p>
        </div>

        {/* Scrolling Testimonials */}
        <div className="relative">
          <motion.div
            className="flex"
            animate={{
              x: [0, -1920], // Move by the width of 6 cards (320px each)
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.id}-${index}`}
                testimonial={testimonial}
              />
            ))}
          </motion.div>
        </div>

        <div className="text-center mt-16">
          <motion.button
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Coding Journey
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
