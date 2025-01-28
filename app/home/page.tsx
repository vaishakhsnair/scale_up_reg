"use client";

import Timeline from "@/components/Timeline";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16 text-center"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#639BF2] via-[#982dca] to-[#639BF2] animate-gradient-x">
          Welcome to ScaleUp LaunchPad
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Join us on this exciting journey of innovation and entrepreneurship.
          Register your team today and be part of something extraordinary.
        </p>
        <Button
          onClick={() => router.push("/register")}
          className="bg-gradient-to-r from-primary-blue/60 via-primary-purple to-primary-blue/60 hover:opacity-90 px-8 py-3 text-lg"
        >
          Register Now
        </Button>
      </motion.div>

      {/* Timeline Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="container mx-auto"
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#639BF2] via-[#982dca] to-[#639BF2]">
          Event Timeline
        </h2>
        <Timeline />
      </motion.div>
    </div>
  );
}
