"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const projects = [
  {
    title: "HORIZON",
    subtitle: "Horizon Interiors",
    tags: ["WEB", "BRANDING"],
    image: "/images/projects/horizon.jpg",
    href: "/work/horizon-interiors",
    size: "large",
  },
  {
    title: "Adriano",
    subtitle: "Quality Crafted, Comfort Defined",
    tags: ["BRANDING", "SOCIALS"],
    image: "/images/projects/adriano.jpg",
    href: "/work/adriano",
    size: "medium",
  },
  {
    title: "Conservation Montgomery",
    subtitle: "Events",
    tags: ["WEB DESIGN"],
    image: "/images/projects/conservation.jpg",
    href: "/work/conservation-montgomery",
    size: "medium",
  },
  {
    title: "URBAN WHEELS",
    subtitle: "",
    tags: ["BRANDING"],
    image: "/images/projects/urban-wheels.jpg",
    href: "/work/urban-wheels",
    size: "medium",
  },
];

export function SelectedWork() {
  return (
    <section id="work" className="py-24 px-4 sm:px-6 lg:px-8 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card rounded-3xl p-8 md:p-12 lg:p-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6 text-foreground headline-serif text-center"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Selected work...
          </motion.h2>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Row 1: Large + Medium */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-1"
            >
              <Link href={projects[0].href} className="group block">
                <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden bg-[#3a5a4a]">
                  {/* Placeholder bg */}
                  <div className="bg-linear-to-br from-[#ffe5e0] to-[#f5f5f0] p-8 md:p-12 flex flex-col justify-between h-full group-hover:scale-[1.02] transition-transform duration-500 ease-out" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3
                      className="text-white text-3xl md:text-4xl font-normal tracking-wider"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {projects[0].title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-1"
            >
              <Link href={projects[1].href} className="group block">
                <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden bg-[#c19a6b]">
                  {/* Placeholder bg */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#a17c5c] to-[#d4aa7d] group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-56 bg-[#1A1A1A] rounded-3xl shadow-2xl flex items-center justify-center">
                      <span className="text-sm font-medium tracking-wider text-muted-foreground uppercase">Phone Mockup</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Row 2: Two Medium */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href={projects[2].href} className="group block">
                <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden bg-[#4a8a4a]">
                  {/* Placeholder bg */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3a7a3a] to-[#5a9a5a] group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-32 bg-white/90 rounded-lg shadow-xl flex items-center justify-center">
                      <span className="text-[#1A1A1A]/50 text-xs">Laptop Mockup</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href={projects[3].href} className="group block">
                <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden bg-[#5a7a6a]">
                  {/* Placeholder bg */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4a6a5a] to-[#6a8a7a] group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                    <h3
                      className="text-white text-2xl md:text-3xl font-normal tracking-widest text-center"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {projects[3].title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
