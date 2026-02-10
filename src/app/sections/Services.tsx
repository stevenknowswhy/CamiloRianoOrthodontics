"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { PillLabel } from "@/components/PillLabel";
import { AnimatedDiv } from "@/components/AnimatedSection";

const services = [
  {
    title: "Clear Braces",
    image: "/images/services/clear-braces.png",
    href: "/services/clear-braces",
    description: "Discreet and effective orthodontic treatment.",
  },
  {
    title: "Ceramic Braces",
    image: "/images/services/ceramic-braces.png",
    href: "/services/ceramic-braces",
    description: "Blend seamlessly with your natural smile.",
  },
  {
    title: "Traditional Braces",
    image: "/images/services/traditional-braces.png",
    href: "/services/traditional-braces",
    description: "Proven results for patients of all ages.",
  },
  {
    title: "Lingual Braces",
    image: "/images/services/lingual-braces.png",
    href: "/services/lingual-braces",
    description: "Completely hidden behind your teeth.",
  },
  {
    title: "Brius Lingual Braces",
    image: "/images/services/brius-lingual-braces.png",
    href: "/services/brius-lingual-braces",
    description: "Independent tooth movement for faster results.",
  },
  {
    title: "Dental Retainers",
    image: "/images/services/retainers.png",
    href: "/services/retainers",
    description: "Maintain your perfect smile for life.",
  },
];

export function Services() {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card rounded-3xl p-8 md:p-12 lg:p-16">
          <AnimatedDiv className="text-center mb-16">
            <PillLabel className="mb-6">OUR SERVICES</PillLabel>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-normal text-foreground headline-serif"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Comprehensive <span className="italic">Care</span>
            </h2>
          </AnimatedDiv>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={service.href} className="group block h-full">
                  <div className="relative h-[400px] rounded-2xl overflow-hidden bg-card shadow-sm transition-all duration-500 group-hover:shadow-2xl">
                    {/* Image Container with Zoom Effect */}
                    <div className="absolute inset-0 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                      <h3
                        className="text-white text-2xl md:text-3xl font-normal mb-3 tracking-wide"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {service.title}
                      </h3>
                      <p className="text-white/90 text-sm md:text-base opacity-0 transform translate-y-4 transition-all duration-500 delay-100 group-hover:opacity-100 group-hover:translate-y-0">
                        {service.description}
                      </p>
                      
                      {/* Interactive indicator */}
                      <div className="mt-6 flex items-center gap-2 text-white/80 text-sm font-medium tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                        <span>LEARN MORE</span>
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
