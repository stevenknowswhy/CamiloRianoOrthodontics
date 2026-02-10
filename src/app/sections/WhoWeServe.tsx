"use client";

import { motion } from "framer-motion";
import { PillLabel } from "@/components/PillLabel";

const journeySteps = [
  ["Complimentary Consultation", "Custom Treatment Plan", "Appliance Placement"],
  ["Regular Adjustments", "Beautiful Results", "Retention & Care"],
];

export function WhoWeServe() {
  return (
    <section className="w-full bg-cream">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-offwhite overflow-hidden relative"
        style={{ backgroundColor: "#142d33" }}
      >
        <div className="max-w-7xl mx-auto">
          <PillLabel variant="dark" className="mb-8">
            PROCEDURE JOURNEY
          </PillLabel>

          <div className="space-y-4">
            {journeySteps.map((row, rowIndex) => (
              <motion.div
                key={rowIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: rowIndex * 0.1 }}
                className="flex flex-wrap justify-center items-center gap-2 md:gap-4"
              >
                {row.map((type, index) => (
                  <span key={type} className="flex items-center">
                    {index > 0 && (
                      <span className="text-coral mx-2 md:mx-4 text-xl">
                        •
                      </span>
                    )}
                    <span
                      className="text-offwhite text-base md:text-lg lg:text-xl font-normal"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {type}
                    </span>
                  </span>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
