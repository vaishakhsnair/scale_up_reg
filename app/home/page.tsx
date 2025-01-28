"use client";

import Timeline from "@/components/Timeline";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight, Rocket, Target, Goal } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-20 text-center relative"
      >
        <div className="absolute inset-0 bg-gradient-radial from-primary-blue/5 via-primary-purple/5 to-transparent animate-pulse" />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#639BF2] via-[#982dca] to-[#639BF2] animate-gradient-x leading-tight"
        >
          Innovate. Create.
          <br />
          Connect.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Join us on this exciting journey of innovation and entrepreneurship.
          Shape the future with your groundbreaking ideas.
        </motion.p>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto"
        >
          {[
            { icon: <Rocket className="w-8 h-8" />, text: "Launch Your Ideas" },
            { icon: <Target className="w-8 h-8" />, text: "Connect" },
            { icon: <Goal className="w-8 h-8" />, text: "Get Noticed" },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-black/30 backdrop-blur-xl border border-primary-blue/20 p-6 rounded-xl shadow-lg shadow-primary-purple/10 hover:border-primary-purple/40 transition-all"
            >
              <div className="text-primary-purple mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-white font-semibold">{feature.text}</h3>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="relative group flex justify-center"
        >
          <Button
            onClick={() => router.push("/")}
            className="relative flex items-center justify-center px-8 py-6 text-lg rounded-full bg-black hover:bg-black/80 transition-all duration-200"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-blue/60 to-primary-purple/80 opacity-100 group-hover:opacity-80 transition-all duration-200" />
            <span className="relative z-10 flex items-center font-bold text-white">
              Register Now
              <motion.span
                className="ml-2 inline-block"
                initial={false}
                animate={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </span>
          </Button>
        </motion.div>
      </motion.div>

      {/* Timeline Section with enhanced styling */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="container mx-auto pb-20"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[#639BF2] via-[#982dca] to-[#639BF2]">
          Event Timeline
        </h2>
        <Timeline />
      </motion.div>
    </div>
  );
}
