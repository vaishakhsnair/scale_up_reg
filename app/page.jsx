"use client";

import { useEffect, useState } from "react";
import Timeline from "@/components/Timeline";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/server";
import Header from "@/components/Header";

import {
  ArrowRight,
  Rocket,
  Target,
  Goal,
  ShieldCheck,
  FlaskConical,
  X,
  Hospital,
  CalendarDays,
  FileText,
  Presentation,
  Instagram,
  File,
  Phone,
  User,
  InstagramIcon,
} from "lucide-react";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

// Modal Component
const Modal = ({ isOpen, onClose, problem }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-black/80 backdrop-blur-xl border border-primary-blue/20 rounded-xl p-6 max-w-2xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-all"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="text-primary-purple mb-4 flex justify-center">
          {problem.icon}
        </div>
        <h2 className="text-white text-2xl font-bold text-center mb-4">
          {problem.title}
        </h2>
        <p className="text-gray-400/70 text-lg leading-relaxed">
          {problem.details}
        </p>
      </div>
    </div>
  );
};

export default function Home() {
  const router = useRouter();
  const [selectedProblem, setSelectedProblem] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loggedin, setLoggedin] = useState(false);

  //check if the user is logged in

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
      }
      setLoggedin(true);
    };
    checkSession();
  }, []);

  const problems = [
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Advanced Battery Management for Drones",
      text: "Advanced battery management for long-range autonomous drones using AI/ML algorithms.",
      details:
        "Maximizes energy efficiency and extends battery life. Utilizes AI/ML algorithms to predict battery degradation and optimize usage. Implements dynamic power distribution strategies to balance load across motors. Supports real-time monitoring and predictive maintenance.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Secure Authentication for Digital Transactions",
      text: "Secure authentication mechanism for AI-integrated digital transactions.",
      details:
        "Proposes a robust and user-friendly authentication mechanism to enhance cybersecurity in AI-integrated applications.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Innovative Automotive Solutions",
      text: "Innovative automotive solutions using cameras, sensors, and advanced UX for IVI systems.",
      details:
        "Uses inputs from cameras inside and outside the vehicle, vehicle audio input, and mobile input from OBD dongles. Focuses on advanced user experience (UX) for In-Vehicle Infotainment (IVI) systems.",
    },
    {
      icon: <Goal className="w-8 h-8" />,
      title: "IoT-Based Real-Time Patient Monitoring",
      text: "IoT-based real-time patient monitoring integrated with hospital EMR systems.",
      details:
        "Addresses the manual recording of critical patient vitals, which can lead to delays in responses. Implements an IoT-based solution to capture and integrate real-time patient vitals into the hospital’s Electronic Medical Record (EMR) system for improved monitoring.",
    },
    {
      icon: <FlaskConical className="w-8 h-8" />,
      title: "Efficient Separation of Resin",
      text: "Efficient separation of resin from oleoresin and solvent mixture using crystallizers.",
      details:
        "Focuses on improving the process of separating resin from oleoresin and solvent mixtures.",
    },
    {
      icon: <Hospital className="w-8 h-8" />,
      title: "Streamlining Dental Clinic Operations",
      text: "Streamlining dental clinic operations for better appointment management and patient engagement.",
      details:
        "Addresses inefficient appointment management, low patient engagement, inconsistent follow-ups, and complex payment processes in dental clinics. Aims to streamline operations and enhance overall efficiency.",
    },
  ];

  const handleCardClick = (problem) => {
    setSelectedProblem(problem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProblem("");
  };

  return (
    <div className="min-h-screen bg-black overflow-x-hidden w-full ">
      <AnimatedGridPattern
        numSquares={50}
        maxOpacity={0.5}
        duration={3}
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[10%] h-[100%] skew-y-12 absolute",
        )}
      />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-20 text-center relative"
      >
        <motion.h1 className="text-5xl md:text-7xl font-extrabold my-8 text-transparent bg-clip-text bg-gradient-to-r from-[#639BF2] via-[#982dca] to-[#639BF2] animate-gradient-x leading-tight">
          Launchpad ◦ Where Innovation Meets Opportunity
        </motion.h1>
        <motion.p className="text-xl md:text-2xl text-gray-400/50 mb-12 max-w-3xl mx-auto leading-relaxed">
          Join us at Launchpad 2025, the ultimate pitchathon under SHRESHTA
          2025. Innovate, create, and connect as you pitch groundbreaking ideas
          to a panel of experts.
        </motion.p>
        <motion.div className="relative group flex flex-col items-center gap-4">
          <Button
            onClick={() => router.push(loggedin ? "/register" : "/login")}
            className="relative flex items-center justify-center px-8 py-6 text-lg rounded-full bg-black hover:bg-black/80 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-blue/60 to-primary-purple/80 opacity-100 group-hover:opacity-80 transition-all duration-300" />
            <motion.span className="relative z-10 flex items-center font-bold text-white">
              Register Now
              <motion.span className="ml-2 inline-block">
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </motion.span>
          </Button>
          <motion.p className="text-gray-400/70 text-sm">
            Submit your abstract by February 5, 2025.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Problem Statements Section */}
      <motion.div className="container mx-auto py-20 p-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[#639BF2] via-[#982dca] to-[#639BF2]">
          Problem Statements
        </h2>
        <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(problem)}
              className="bg-black/30 backdrop-blur-xl border border-primary-blue/20 p-6 rounded-xl shadow-lg shadow-primary-purple/10 hover:border-primary-purple/40 transition-all cursor-pointer"
            >
              <div className="text-primary-purple mb-4 flex justify-center">
                {problem.icon}
              </div>
              <h3 className="text-white font-semibold text-center mb-2">
                {problem.text}
              </h3>
              <p className="text-primary-purple text-sm text-center">
                More Info
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Timeline Section */}
      <motion.div className="container mx-auto pb-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[#639BF2] via-[#982dca] to-[#639BF2]">
          Event Timeline
        </h2>
        <Timeline />
      </motion.div>

      {/* Event Phases Section */}
      <motion.div className="container mx-auto py-20 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[#639BF2] via-[#982dca] to-[#639BF2]">
          Event Phases
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Phase 1: Abstract Submission */}
          <div className="bg-black/30 backdrop-blur-xl border border-primary-blue/20 p-6 rounded-xl shadow-lg shadow-primary-purple/10 hover:border-primary-purple/40 transition-all">
            <div className="text-primary-purple mb-4 flex justify-center">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-white text-2xl font-bold text-center mb-4">
              Phase 1: Abstract Submission
            </h3>
            <ul className="text-gray-400/70 text-lg list-disc list-inside">
              <li>Submit your ideas as a PowerPoint presentation.</li>
              <li>Deadline: February 5, 2025, at 11:59 PM.</li>
              <li>Top 20 teams will be shortlisted for the final round.</li>
            </ul>
          </div>

          {/* Phase 2: Presentation & Final Round */}
          <div className="bg-black/30 backdrop-blur-xl border border-primary-blue/20 p-6 rounded-xl shadow-lg shadow-primary-purple/10 hover:border-primary-purple/40 transition-all">
            <div className="text-primary-purple mb-4 flex justify-center">
              <Presentation className="w-8 h-8" />
            </div>
            <h3 className="text-white text-2xl font-bold text-center mb-4">
              Phase 2: Presentation & Final Round
            </h3>
            <ul className="text-gray-400/70 text-lg list-disc list-inside">
              <li>Offline event on February 14, 2025.</li>
              <li>Participants must report by 8:00 AM.</li>
              <li>Event runs from 9:00 AM to 4:00 PM.</li>
              <li>Results announced on the same day.</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Follow Us for Updates Section */}
      <motion.div className="container mx-auto py-20 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[#639BF2] via-[#982dca] to-[#639BF2]">
          Follow Us for Updates
        </h2>
        <div className="flex justify-center items-center gap-4">
          <InstagramIcon className="w-8 h-8 text-primary-purple" />
          <a
            href="https://www.instagram.com/launchpad_25?igsh=dTJhdDI0dTVsYWR4"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-xl hover:text-primary-purple transition-all"
          >
            @launchpad_25
          </a>
        </div>
      </motion.div>

      {/* Document Link Section */}
      <motion.div className="container mx-auto py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[#639BF2] via-[#982dca] to-[#639BF2]">
          Event Document
        </h2>
        <div className="flex justify-center items-center gap-4">
          <File className="w-8 h-8 text-primary-purple" />
          <a
            href="https://docs.google.com/document/d/11-TCuLqXaoKeitF75XccJWaGJHNWdqpnxGXx_umtNzg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-xl hover:text-primary-purple transition-all"
          >
            Download Event Document
          </a>
        </div>
      </motion.div>

      {/* Contact Us Section */}
      <motion.div className="container mx-auto py-20 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[#639BF2] via-[#982dca] to-[#639BF2]">
          Contact Us
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Coordinator 1 */}
          <div className="bg-black/30 backdrop-blur-xl border border-primary-blue/20 p-6 rounded-xl shadow-lg shadow-primary-purple/10 hover:border-primary-purple/40 transition-all">
            <div className="text-primary-purple mb-4 flex justify-center">
              <User className="w-8 h-8" />
            </div>
            <h3 className="text-white text-2xl font-bold text-center mb-4">
              Varun Haridas
            </h3>
            <div className="flex justify-center items-center gap-2">
              <Phone className="w-6 h-6 text-primary-purple" />
              <a
                href="tel:+919495917116"
                className="text-white text-xl hover:text-primary-purple transition-all"
              >
                +91 94959 17116
              </a>
            </div>
          </div>

          {/* Coordinator 2 */}
          <div className="bg-black/30 backdrop-blur-xl border border-primary-blue/20 p-6 rounded-xl shadow-lg shadow-primary-purple/10 hover:border-primary-purple/40 transition-all">
            <div className="text-primary-purple mb-4 flex justify-center">
              <User className="w-8 h-8" />
            </div>
            <h3 className="text-white text-2xl font-bold text-center mb-4">
              Anagha Ravikumar
            </h3>
            <div className="flex justify-center items-center gap-2">
              <Phone className="w-6 h-6 text-primary-purple" />
              <a
                href="tel:+919895431875"
                className="text-white text-xl hover:text-primary-purple transition-all"
              >
                +91 98954 31875
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        problem={selectedProblem}
      />

      {/* Participation Guidelines Section */}
      <motion.div className="container mx-auto pb-20 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[#639BF2] via-[#982dca] to-[#639BF2]">
          Participation Guidelines
        </h2>
        <ul className="text-gray-400/70 text-lg list-disc list-inside mx-auto max-w-4xl leading-relaxed">
          <li>Teams must consist of 3 to 4 members.</li>
          <li>
            Abstract submissions are due by February 5, 2025, at 11:59 PM.
          </li>
          <li>
            The final round will be held offline on February 14, 2025, at
            Muthoot Institute of Technology and Science.
          </li>
          <li>
            Judging will be based on innovation, feasibility, impact, and
            presentation.
          </li>
          <li>
            Prizes include pre-placement interviews, internships, and cash
            rewards.
          </li>
        </ul>
      </motion.div>
      {/* Footer Section */}
      <footer className="bg-black/50 backdrop-blur-xl border-t border-primary-blue/20 py-6 mt-20">
        <div className="container mx-auto text-center">
          <p className="text-gray-400/70 text-sm">
            Made with ❤️ by{" "}
            <a
              href="https://github.com/Xanthium7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-purple hover:underline"
            >
              Xanthium7
            </a>{" "}
            and{" "}
            <a
              href="https://github.com/vaishakhsnair"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-purple hover:underline"
            >
              vaishakhsnair
            </a>
          </p>
          <p className="text-gray-400/70 text-sm mt-2">Launchpad by ScaleUp</p>
        </div>
      </footer>
    </div>
  );
}
