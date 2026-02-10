"use client";

import { motion } from "framer-motion";
import { PillLabel } from "@/components/PillLabel";

export function MeetFounder() {
  return (
    <section className="w-full bg-cream">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-offwhite overflow-hidden relative"
        style={{ backgroundColor: "#0f2228" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Column - Text */}
            <div className="flex flex-col justify-center">
              <PillLabel variant="dark" className="mb-6 self-start">
                MEET DR. CAMILO RIAÑO
              </PillLabel>

              <h2
                className="text-2xl md:text-3xl lg:text-4xl font-normal text-offwhite mb-6 leading-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Founder &amp; Lead Orthodontist
              </h2>

              <p className="text-gray-400 text-base leading-relaxed mb-4">
                Born and raised in Bogotá, Colombia, Dr. Riaño&apos;s path to
                orthodontics began with curious observation, from early
                anthropological studies in the Amazon to understanding how small
                shifts can change lives. He holds a dual degree from the Military
                University in Colombia and the University of the Pacific in San
                Francisco, and has been helping families smile since 1997.
              </p>

              <p className="text-gray-400 text-base leading-relaxed">
                Whether it&apos;s children, teens, or adults, Dr. Riaño
                approaches each case with the same belief: thoughtful treatment,
                matched to your lifestyle and values. He is a leading provider of
                Incognito (hidden lingual braces) and one of San Francisco&apos;s
                few Top 1% Diamond Invisalign® providers. Outside the office, he
                recharges by rock climbing, hiking, and exploring the outdoors
                with his wife and three children.
              </p>
            </div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[400px] lg:h-auto lg:min-h-[500px]"
            >
              <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-bl from-white/5 to-transparent pointer-events-none" />
                {/* Placeholder for founder image */}
                <div className="absolute inset-0 flex items-center justify-center text-white/50">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-4xl">👨‍⚕️</span>
                    </div>
                    <p className="text-sm">Dr. Riaño Portrait</p>
                  </div>
                </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
