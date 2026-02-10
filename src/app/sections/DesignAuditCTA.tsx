"use client";

import { motion } from "framer-motion";

import Link from "next/link";

export function DesignAuditCTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="bg-offwhite rounded-3xl p-8 md:p-12 lg:p-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-muted-foreground text-sm md:text-base mb-3">
              Not sure where to start?
            </p>

            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-normal mb-8 text-foreground headline-serif"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Start with a{" "}
              <span className="italic relative">
                Virtual Smile Assessment
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-coral rounded-full" />
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-foreground font-medium mb-10">
              It’s free. It’s easy. And it’s designed around you.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-card border border-border rounded-2xl p-6 text-center"
              >
                <span
                  className="block text-2xl md:text-3xl font-normal text-foreground mb-4"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  01
                </span>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Want to improve your smile but not sure where to begin? Our
                  virtual smile assessment makes it easy to get expert feedback
                  without stepping into the office.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 text-center"
              >
                <span
                  className="block text-2xl md:text-3xl font-normal text-foreground mb-4"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  02
                </span>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Interested in Invisalign or other orthodontic care? Dr. Riaño
                  personally reviews your case and sends a customized
                  consultation, so you can get started from the comfort of your
                  home.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Link
                href="#contact"
                className="inline-block bg-dark text-white px-8 py-4 rounded-full text-base font-medium hover:bg-border-dark transition-colors"
              >
                Get Started
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
