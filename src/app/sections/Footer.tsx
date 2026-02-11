"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Smile Assessment", href: "/smile-assessment" },
  { name: "Virtual Care Bay Area", href: "/virtual-care" },
  { name: "Doctor Referrals", href: "/referrals" },
  { name: "Blogs", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const ageGroups = [
  { name: "Children Orthodontist", href: "/orthodontics/children" },
  { name: "Teens Orthodontic", href: "/orthodontics/teens" },
  { name: "Adult Orthodontics", href: "/orthodontics/adults" },
];

const serviceCategories = [
  {
    title: "Braces",
    links: [
      { name: "Traditional Braces", href: "/services/traditional-braces" },
      { name: "Clear Braces", href: "/services/clear-braces" },
      { name: "Ceramic Braces", href: "/services/ceramic-braces" },
      { name: "Lingual Braces", href: "/services/lingual-braces" },
      { name: "Brius Lingual Braces", href: "/services/brius-lingual-braces" },
    ],
  },
  {
    title: "Clear Aligners",
    links: [
      { name: "Clear Aligners", href: "/services/clear-aligners" },
      { name: "Invisalign® Clear Aligners", href: "/services/invisalign" },
      { name: "OrthoFX Clear Aligners", href: "/services/orthofx" },
    ],
  },
  {
    title: "Retainers",
    links: [
      { name: "Dental Retainers", href: "/services/retainers" },
      { name: "Vivera Retainers", href: "/services/vivera-retainers" },
    ],
  },
  {
    title: "Advanced Treatments",
    links: [
      { name: "Orthognathic Surgery", href: "/services/orthognathic-surgery" },
      { name: "Temporary Anchorage Device", href: "/services/tad" },
      { name: "Acceledent", href: "/services/acceledent" },
    ],
  },
];

const connectLinks = [
  { name: "Email", href: "mailto:hello@julesstudio.co" },
  { name: "Linkedin", href: "https://www.linkedin.com/in/juliagmadsen/" },
  { name: "Instagram", href: "https://www.instagram.com/julesstudio.co/" },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="py-12 px-4 sm:px-6 lg:px-8 bg-cream"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-linear-to-b from-[#0f2228] to-[#1f3a3f] rounded-3xl p-8 md:p-12 lg:p-16"
        >
          <div className="flex flex-col gap-16 mb-16">
            {/* Top Section - CTA */}
            <div>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-normal text-offwhite mb-8 leading-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Ready to see your
                <br />
                <span className="italic">happy smile</span>?
              </h2>
              <Link
                href="mailto:hello@julesstudio.co"
                className="inline-block bg-cream text-dark px-8 py-4 rounded-full text-base font-medium hover:bg-offwhite transition-colors"
              >
                Book a Free Call
              </Link>
            </div>

            {/* Middle Section - General Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
              {/* Quick Links */}
              <div>
                <h3 className="text-muted-foreground text-sm font-medium mb-4 uppercase tracking-wider">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-offwhite transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

               {/* Orthodontics */}
              <div>
                <h3 className="text-muted-foreground text-sm font-medium mb-4 uppercase tracking-wider">
                  Orthodontics
                </h3>
                <ul className="space-y-3">
                  {ageGroups.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-offwhite transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connect */}
              <div>
                <h3 className="text-muted-foreground text-sm font-medium mb-4 uppercase tracking-wider">
                  Connect
                </h3>
                 <ul className="space-y-3">
                  {connectLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-gray-400 hover:text-offwhite transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Section - Services */}
            <div>
              <h3 className="text-muted-foreground text-sm font-medium mb-8 uppercase tracking-wider border-b border-white/10 pb-4">
                Services
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {serviceCategories.map((category) => (
                  <div key={category.title}>
                    <span className="text-offwhite font-medium text-sm block mb-4">
                      {category.title}
                    </span>
                    <ul className="space-y-2">
                        {category.links.map((link) => (
                          <li key={link.name}>
                              <Link
                                  href={link.href}
                                  className="text-gray-400 hover:text-offwhite transition-colors text-sm block"
                              >
                                  {link.name}
                              </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border-dark">
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span>
                site design and development by{" "}
                <Link
                  href="/"
                  className="underline hover:text-gray-400 transition-colors"
                >
                  Camilo Riaño Orthodontics
                </Link>
                .
              </span>
              <span>
                Headshots by{" "}
                <Link
                  href="https://vicphotoss.myportfolio.com/work"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-400 transition-colors"
                >
                  Victor maldonado
                </Link>
              </span>
              <span>
                Illustrations by{" "}
                <Link
                  href="https://www.claudiafuentes.art/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-400 transition-colors"
                >
                  claudia fuentes
                </Link>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
