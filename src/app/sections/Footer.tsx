"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const workLinks = [
  { name: "Adriano", href: "/work/adriano" },
  { name: "Horizon Interiors", href: "/work/horizon-interiors" },
  { name: "Urban Wheels", href: "/work/urban-wheels" },
  { name: "Conservation Montgomery", href: "/work/conservation-montgomery" },
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
          className="bg-dark rounded-3xl p-8 md:p-12 lg:p-16"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
            {/* Left Column - CTA */}
            <div>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-normal text-offwhite mb-8 leading-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Ready to bring your
                <br />
                <span className="italic">ideas to life</span>?
              </h2>
              <Link
                href="mailto:hello@julesstudio.co"
                className="inline-block bg-white text-[#1a1a1a] px-8 py-4 rounded-full text-base font-medium hover:bg-offwhite transition-colors"
              >
                Book a Free Call
              </Link>
            </div>

            {/* Right Column - Links */}
            <div className="grid sm:grid-cols-2 gap-8 lg:gap-12">
              <div>
                <h3 className="text-muted-foreground text-sm font-medium mb-4 uppercase tracking-wider">
                  Work
                </h3>
                <ul className="space-y-3">
                  {workLinks.map((link) => (
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
