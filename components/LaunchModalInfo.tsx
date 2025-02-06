import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";

const LaunchModalInfo = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const [hasAgreed, setHasAgreed] = useState(false);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Enhanced backdrop with darker theme */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-radial from-primary-blue/15 via-primary-purple/15 to-transparent animate-gradient-y opacity-30" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-black/50 backdrop-blur-xl border border-primary-blue/10 shadow-lg shadow-primary-purple/20"
      >
        {/* Darker glowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-blue/10 via-primary-purple/10 to-primary-blue/10 animate-gradient-x opacity-30" />

        <div className="relative p-8">
          <Button
            variant="ghost"
            className="absolute right-4 top-4 text-gray-400 hover:text-white hover:bg-primary-purple/10 rounded-full h-8 w-8 p-0 transition-colors"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-2 mb-8"
          >
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#639BF2] via-[#982dca] to-[#639BF2] animate-gradient-x">
              LAUNCHPAD
            </h2>
            <p className="text-lg text-gray-400 tracking-wider">
              WHERE INNOVATIONS MEETS OPPORTUNITY
            </p>
          </motion.div>

          <ScrollArea className="h-[60vh] px-4 [&>div>div]:!bg-primary-purple/10">
            <div className="space-y-6 text-gray-300 pr-4">
              {/* Static section styling without hover effects */}
              <section className="rounded-lg bg-black/40 p-6 backdrop-blur-sm border border-primary-blue/5">
                <h3 className="text-xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-primary-purple">
                  LAUNCHPAD OVERVIEW
                </h3>
                <p>
                  Launchpad is the ultimate pitchathon and innovation platform
                  under SHRESHTA 2025...
                </p>
              </section>

              <section className="rounded-lg bg-black/40 p-6 backdrop-blur-sm border border-primary-blue/5">
                <h3 className="text-xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-primary-purple">
                  PHASES
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-primary-blue">
                      PHASE 1: ABSTRACT SUBMISSION (ONLINE)
                    </h4>
                    <p>
                      All participating teams are to register and submit their
                      ideas...
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-blue">
                      PHASE 2: PRESENTATION AND FINAL ROUND
                    </h4>
                    <p>
                      Participants must report and register at the venue by 8:00
                      am, 14 February 2025...
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-lg bg-black/40 p-6 backdrop-blur-sm border border-primary-blue/5">
                <h3 className="text-xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-primary-purple">
                  PROBLEM STATEMENTS
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Advanced battery management for Long-Range Autonomous
                    Drones...
                  </li>
                  <li>Secure Authentication for Digital Transactions...</li>
                  <li>Automotive industry...</li>
                  <li>Real-time patient monitoring...</li>
                  <li>The efficient process of separating resin...</li>
                  <li>Dental clinics struggle...</li>
                </ul>
              </section>

              <section className="rounded-lg bg-black/40 p-6 backdrop-blur-sm border border-primary-blue/5">
                <h3 className="text-xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-primary-purple">
                  GUIDELINES & REQUIREMENTS
                </h3>
                <div className="space-y-4">
                  <p>
                    <span className="text-primary-blue">Team Formation:</span>{" "}
                    Teams can have a maximum of 4 members...
                  </p>
                  <p>
                    <span className="text-primary-blue">
                      Registration Amount:
                    </span>{" "}
                    Rs 0/-
                  </p>
                  <p>
                    <span className="text-primary-blue">Prize Pool:</span>{" "}
                    Prizes including pre-placement interviews...
                  </p>
                  <p>
                    <span className="text-primary-blue">Eligibility:</span> Open
                    to all engineering students...
                  </p>
                </div>
              </section>

              <section className="rounded-lg bg-black/40 p-6 backdrop-blur-sm border border-primary-blue/5">
                <h3 className="text-xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-primary-purple">
                  CONTACT INFORMATION
                </h3>
                <p>Varun Haridas: +91 94959 17116</p>
                <p>Anagha Ravikumar: +91 98954 31875</p>
              </section>
            </div>
          </ScrollArea>

          <div className="mt-8 space-y-6 border-t border-primary-blue/20 pt-6">
            <div className="flex items-center space-x-3 bg-black/40 p-4 rounded-lg border border-primary-blue/5">
              <Checkbox
                id="terms"
                checked={hasAgreed}
                onCheckedChange={(checked) => setHasAgreed(checked as boolean)}
                className="border-primary-purple data-[state=checked]:bg-primary-purple transition-colors"
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                I have read and understood all the information provided above
              </label>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                onClick={onClose}
                className="bg-black/50 hover:bg-primary-blue/20 text-gray-300 hover:text-white transition-all border border-primary-blue/10"
              >
                Cancel
              </Button>
              <Button
                onClick={onConfirm}
                disabled={!hasAgreed}
                className="bg-gradient-to-r from-primary-blue/60 via-primary-purple to-primary-blue/60 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed animate-gradient-x"
              >
                Proceed with Registration
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LaunchModalInfo;
