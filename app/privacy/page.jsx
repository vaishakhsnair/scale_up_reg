"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-20 text-center relative"
      >
        <motion.h1 className="text-5xl md:text-7xl font-extrabold my-8 text-transparent bg-clip-text bg-gradient-to-r from-[#639BF2] via-[#982dca] to-[#639BF2] animate-gradient-x leading-tight">
          Privacy Policy
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-left text-gray-400/70 text-lg max-w-4xl mx-auto leading-relaxed"
        >
          <p className="mb-6">
            At Launchpad 2025, we are committed to protecting your privacy and
            ensuring that your personal information is handled in a safe and
            responsible manner. This Privacy Policy outlines how we collect,
            use, and protect your information when you use our platform.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">
            1. Information We Collect
          </h2>
          <p className="mb-6">
            We may collect the following types of information:
          </p>
          <ul className="list-disc list-inside mb-6">
            <li>
              <strong>Personal Information:</strong> Name, email address, phone
              number, and other contact details provided during registration.
            </li>
            <li>
              <strong>Team Information:</strong> Team name, team members, and
              project details submitted during the event.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-white mb-4">
            2. How We Use Your Information
          </h2>
          <p className="mb-6">
            We use the information we collect for the following purposes:
          </p>
          <ul className="list-disc list-inside mb-6">
            <li>To facilitate your participation in Launchpad 2025.</li>
            <li>
              To communicate with you about the event and related updates.
            </li>
            <li>To improve our platform and user experience.</li>
            <li>To comply with legal and regulatory requirements.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mb-4">
            3. Data Sharing and Disclosure
          </h2>
          <p className="mb-6">
            We do not sell or share your personal information with third parties
            except in the following circumstances:
          </p>
          <ul className="list-disc list-inside mb-6">
            <li>
              With your consent, for example, when you submit a project for
              evaluation.
            </li>
            <li>
              With service providers who assist us in operating the platform,
              such as hosting and analytics providers.
            </li>
            <li>When required by law or to protect our rights and property.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mb-4">
            4. Data Security
          </h2>
          <p className="mb-6">
            We implement industry-standard security measures to protect your
            information from unauthorized access, alteration, or destruction.
            However, no method of transmission over the internet or electronic
            storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">5. Your Rights</h2>
          <p className="mb-6">You have the right to:</p>
          <ul className="list-disc list-inside mb-6">
            <li>Access and update your personal information.</li>
            <li>
              Request deletion of your data, subject to legal obligations.
            </li>
            <li>Opt-out of receiving communications from us.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mb-4">
            6. Changes to This Policy
          </h2>
          <p className="mb-6">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page, and we will notify you of significant
            changes via email or through our platform.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">7. Contact Us</h2>
          <p className="mb-6">
            If you have any questions or concerns about this Privacy Policy,
            please contact us at:
          </p>
          <p className="mb-6">
            <strong>Email:</strong> support@scaleupindia.org
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
