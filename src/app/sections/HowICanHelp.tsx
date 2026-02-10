"use client";

import { motion } from "framer-motion";
import { AnimatedDiv } from "@/components/AnimatedSection";

const services = [
  {
    title: "Website Design, Development, & Maintenance",
    description: "E-commerce sites, marketing sites, and so much more",
  },
  {
    title: "Elevating your Digital Presence",
    description: "Web + Socials to keep your brand consistent and polished",
  },
  {
    title: "Branding Packages",
    description:
      "Clean, modern, consistent branding to enhance your organization's visuals",
  },
];

export function HowICanHelp() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col justify-center h-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <div>
              <AnimatedDiv>
                <h2
                  className="text-4xl md:text-5xl lg:text-6xl font-normal mb-8 text-foreground headline-serif"
                >
                  How I <span className="italic">can help you</span>...
                </h2>
              </AnimatedDiv>

              <div className="space-y-0">
                {services.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="py-6 border-b border-border-light last:border-b-0"
                  >
                    <h3 className="text-xl md:text-2xl font-normal mb-6 text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed">
                      {service.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[400px] lg:h-[500px]"
            >
              <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-dark-brown to-light-brown">
                {/* Placeholder for laptop image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="inline-flex items-center gap-2 bg-dark text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all self-start">
                    <div className="w-56 h-36 bg-card rounded flex items-center justify-center">
                      <span className="text-coral mt-1.5">• Brand Style Guide</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
