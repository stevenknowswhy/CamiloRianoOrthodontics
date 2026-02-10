"use client";

import { motion } from "framer-motion";
import { PillLabel } from "@/components/PillLabel";
import { AnimatedDiv } from "@/components/AnimatedSection";
import Image from "next/image";

const features = [
  {
    image: "/images/why-choose/expertise.png",
    title: "Trusted Expertise",
    description:
      "With years of experience transforming smiles, Dr. Camilo Riaño and his team bring precision and care to every treatment.",
  },
  {
    image: "/images/why-choose/innovation.png",
    title: "Advanced Innovation",
    description:
      "We use the latest orthodontic techniques and technology to deliver faster, more effective results with your comfort in mind.",
  },
  {
    image: "/images/why-choose/care.png",
    title: "Personalized Care",
    description:
      "Every smile is unique. That’s why we craft treatment plans tailored to your goals, lifestyle, and needs.",
  },
  {
    image: "/images/why-choose/welcome-v3.png",
    title: "A Welcoming Experience",
    description:
      "From our modern San Francisco office to our friendly team, we make sure every visit feels comfortable and stress-free.",
  },
];

export function WhyChoose() {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="bg-offwhite rounded-3xl p-8 md:p-12 lg:p-16">
          <AnimatedDiv className="text-center mb-12">
            <PillLabel className="mb-6">WHY CHOOSE DR. RIAÑO</PillLabel>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-normal"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Why Choose Camilo Riaño Orthodontics <br className="hidden md:block" />
              in San Francisco?
            </h2>
          </AnimatedDiv>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-card border border-border rounded-2xl p-6 text-center transition-shadow hover:shadow-lg flex flex-col items-center h-full overflow-hidden"
              >
                <div className="w-full aspect-square relative mb-6 rounded-xl overflow-hidden bg-cream">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <h3
                  className="text-xl font-normal mb-3 text-foreground"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
