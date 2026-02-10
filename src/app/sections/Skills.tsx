"use client";

import { motion } from "framer-motion";
import { AnimatedDiv } from "@/components/AnimatedSection";

const skillCategories = [
  {
    title: "Web Design",
    skills: [
      "Design Systems",
      "Website Design",
      "Landing Pages",
      "User Experience Design",
    ],
  },
  {
    title: "Brand Design",
    skills: [
      "Visual Design",
      "Logos & Visual Identity",
      "Social Media Graphics",
      "Presentation Decks",
      "Colors & Typography",
    ],
  },
];

export function Skills() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card rounded-3xl p-8 md:p-12 lg:p-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[350px] lg:h-[450px] order-2 lg:order-1"
            >
              <div className="relative">
                <div className="aspect-4/5 rounded-2xl overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
                  {/* Photo removed/placeholder */}
                  <div className="w-full h-full bg-border-light/30 flex items-center justify-center">
                    <span className="text-muted-foreground">Image Placeholder</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Skills */}
            <div className="order-1 lg:order-2">
              <AnimatedDiv>
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl font-normal mb-10 text-foreground"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  What we bring to the table...
                </h2>
              </AnimatedDiv>

              <div className="space-y-8">
                {skillCategories.map((category, categoryIndex) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: categoryIndex * 0.15 }}
                  >
                    <h3
                      className="text-xl font-normal italic text-foreground mb-4"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {category.title}
                    </h3>
                    <ul className="space-y-2">
                      {category.skills.map((skill, index) => (
                        <motion.li
                          key={skill}
                          initial={{ opacity: 0, x: 10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.3,
                            delay: categoryIndex * 0.15 + index * 0.05,
                          }}
                          className="flex items-center gap-3 text-muted-foreground"
                        >
                          <span className="text-coral text-sm">•</span>
                          {skill}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
