"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

type TimelineEvent = {
  date: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
};

const timelineEvents: TimelineEvent[] = [
  {
    date: "15 March 2024",
    title: "Registration Opens",
    description: "Team registration begins for ScaleUp LaunchPad 2024",
    icon: <Calendar className="w-6 h-6" />,
  },
  {
    date: "30 March 2024",
    title: "Abstract Submission",
    description: "Last date to submit your project abstracts",
  },
  {
    date: "5 April 2024",
    title: "Shortlisting",
    description: "Selected teams will be notified for the next round",
  },
  {
    date: "5 April 2024",
    title: "Shortlisting",
    description: "Selected teams will be notified for the next round",
  },
  {
    date: "5 April 2024",
    title: "Shortlisting",
    description: "Selected teams will be notified for the next round",
  },
  {
    date: "15 April 2024",
    title: "Final Presentation",
    description: "Present your project to our panel of experts",
  },
];

export default function Timeline() {
  return (
    <div className="relative w-full px-4 py-16 overflow-x-hidden">
      {/* Center line */}
      <div className="absolute left-1/2 transform -translate-x-[1px] hidden md:block">
        <div className="w-[2px] h-full bg-gradient-to-b from-primary-blue via-primary-purple to-primary-blue" />
      </div>

      <div className="flex flex-col space-y-16">
        {timelineEvents.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            } items-center gap-8 relative`}
          >
            {/* Content card */}
            <div
              className={`w-full md:w-[calc(50%-2rem)] ${
                index % 2 === 0 ? "md:text-left" : "md:text-right"
              }`}
            >
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-black/30 backdrop-blur-xl border border-primary-blue/20 p-6 rounded-xl shadow-lg shadow-primary-purple/10"
              >
                <p className="text-primary-purple font-medium mb-2">
                  {event.date}
                </p>
                <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#639BF2] via-[#982dca] to-[#639BF2]">
                  {event.title}
                </h3>
                <p className="text-gray-400">{event.description}</p>
              </motion.div>
            </div>

            {/* Timeline Point with Icon */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-12 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-blue via-primary-purple to-primary-blue p-[2px]"
              >
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  {event.icon || (
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary-blue via-primary-purple to-primary-blue" />
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
