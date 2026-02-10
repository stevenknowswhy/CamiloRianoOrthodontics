"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PillLabel } from "@/components/PillLabel";

export function Hero() {
  return (
    <section className="pt-24 pb-2 px-4 sm:px-6 lg:px-8 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="bg-offwhite rounded-3xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Column - Text */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
              {/* Subtle gradient glow */}
              <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-[#f8c8c0]/20 via-transparent to-transparent pointer-events-none" />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <PillLabel className="mb-6">CAMILO RIAÑO ORTHODONTICS</PillLabel>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Orthodontic Care
                <br />
                for <span className="italic">Every Age</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center gap-4 text-sm font-medium text-foreground mb-6 uppercase tracking-wider"
              >
                <span>KIDS</span>
                <span className="w-px h-4 bg-dark" />
                <span>TEENS</span>
                <span className="w-px h-4 bg-dark" />
                <span>ADULTS</span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-muted-foreground text-base md:text-lg max-w-md leading-relaxed"
              >
                We bring together expert-led orthodontic care and patient-centered
                attention for kids, teens, and adults. Our spaces are thoughtfully
                designed with sustainability in mind, built on LEED principles and
                renewable materials—because creating a healthier environment is
                part of creating a healthier you.
              </motion.p>
            </div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative h-[400px] lg:h-auto lg:min-h-[600px]"
            >
              <Image
                src="/images/hero-dental.png"
                alt="Mother and daughter with beautiful smiles at dental office"
                fill
                className="object-cover lg:rounded-l-3xl"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
