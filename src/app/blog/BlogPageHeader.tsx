"use client";

import { motion } from "framer-motion";

export function BlogPageHeader() {
  return (
    <section className="pt-40 pb-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground mb-3"
            >
              Insights & Stories
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-foreground leading-[0.95]"
            >
              Blog
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden md:block text-muted-foreground text-sm max-w-xs leading-relaxed pb-2"
          >
            Expert insights on orthodontics, patient stories, and the latest in
            dental innovation.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
