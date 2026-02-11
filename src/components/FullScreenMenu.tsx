"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ArrowRight, ChevronDown } from "lucide-react";
import { siteConfig } from "@/data/site-data";

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * FullScreenMenu Component
 *
 * Now powered by centralized site-data:
 * - Quick links from siteConfig.navigation.mobile
 * - Orthodontics links from siteConfig.navigation.main[1].children
 * - Service categories derived from siteConfig.navigation.main[2].children
 * - Logo from siteConfig.metadata
 * - CTA from siteConfig.navigation.cta
 * - Locations from siteConfig.locations
 */

// Extract data from siteConfig
const { navigation, metadata, locations } = siteConfig;
const { main: navLinks, mobile: quickLinks, cta } = navigation;

// Find Orthodontics section (index 1 in main nav)
const orthodonticsNav = navLinks.find((item) => item.label === "Orthodontics");
const ageGroups = orthodonticsNav?.children?.map((child) => ({
  name: child.label,
  href: child.href,
})) || [];

// Find Services section (index 2 in main nav) and group by categories
const servicesNav = navLinks.find((item) => item.label === "Services");
const serviceLinks = servicesNav?.children || [];

// Group services into categories
const serviceCategories = [
  {
    title: "Braces",
    links: serviceLinks
      .filter((s) => s.href?.includes("braces"))
      .map((s) => ({ name: s.label, href: s.href })),
  },
  {
    title: "Clear Aligners",
    links: serviceLinks
      .filter((s) => s.href?.includes("aligners") || s.href?.includes("invisalign") || s.href?.includes("orthofx"))
      .map((s) => ({ name: s.label, href: s.href })),
  },
  {
    title: "Retainers",
    links: serviceLinks
      .filter((s) => s.href?.includes("retainer"))
      .map((s) => ({ name: s.label, href: s.href })),
  },
  {
    title: "Advanced Treatments",
    links: serviceLinks
      .filter((s) => s.href?.includes("orthognathic") || s.href?.includes("tad") || s.href?.includes("acceledent"))
      .map((s) => ({ name: s.label, href: s.href })),
  },
];

function MenuLink({
  name,
  href,
  onClose,
}: {
  name: string;
  href: string;
  onClose: () => void;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClose}
        className="group flex items-center gap-2 text-lg md:text-xl text-foreground hover:text-coral transition-colors font-medium"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        <span className="relative">
          {name}
          <span className="absolute -bottom-1 left-0 w-0 h-px bg-coral transition-all duration-300 group-hover:w-full" />
        </span>
        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-coral" />
      </Link>
    </li>
  );
}

function ServiceSubcategory({
  title,
  links,
  onClose,
}: {
  title: string;
  links: { name: string; href: string }[];
  onClose: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border-light/50 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 text-left group"
      >
        <span
          className="text-lg md:text-xl font-medium text-foreground group-hover:text-coral transition-colors"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-coral transition-colors" />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden pl-4 space-y-3 pb-3"
          >
            {links.map((link) => (
              <MenuLink
                key={link.name}
                name={link.name}
                href={link.href}
                onClose={onClose}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FullScreenMenu({ isOpen, onClose }: FullScreenMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] bg-cream overflow-y-auto"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-12 md:mb-16">
              <Link href="/" onClick={onClose} className="text-xl md:text-2xl font-medium tracking-wide text-foreground">
                {metadata.logo.text}
              </Link>
              <button
                onClick={onClose}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-border-dark flex items-center justify-center hover:bg-dark hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            {/* Menu Content */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 pb-12">
              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6 md:mb-8 border-b border-border-light pb-4">
                  QUICK LINKS
                </h3>
                <ul className="space-y-4">
                  {quickLinks.map((link) => (
                    <MenuLink key={link.name} name={link.name} href={link.href} onClose={onClose} />
                  ))}
                </ul>
              </motion.div>

              {/* Orthodontics for All Ages */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6 md:mb-8 border-b border-border-light pb-4">
                  ORTHODONTICS FOR ALL AGES
                </h3>
                <ul className="space-y-4">
                  {ageGroups.map((link) => (
                    <MenuLink key={link.name} name={link.name} href={link.href} onClose={onClose} />
                  ))}
                </ul>
              </motion.div>

              {/* Services with Subcategories */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6 md:mb-8 border-b border-border-light pb-4">
                  SERVICES
                </h3>
                <div>
                  {serviceCategories.map((cat) => (
                    <ServiceSubcategory
                      key={cat.title}
                      title={cat.title}
                      links={cat.links}
                      onClose={onClose}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
            
            {/* Footer / CTA */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="border-t border-border-dark pt-8 flex flex-col md:flex-row justify-between items-center gap-6"
            >
                <div>
                     <div className="text-muted-foreground text-sm flex items-center gap-2">
                        {locations.offices.map((office, index) => (
                          <React.Fragment key={office.id}>
                            {index > 0 && <span className="text-coral">•</span>}
                            <Link
                              href={office.slug === 'sf' ? '/contact' : `/contact/${office.slug}`}
                              onClick={onClose}
                              className="hover:text-coral transition-colors py-1"
                            >
                              {office.shortName}
                            </Link>
                          </React.Fragment>
                        ))}
                     </div>
                </div>
                {cta && (
                  <Link
                    href={cta.href}
                    onClick={onClose}
                    className={cn(
                      "px-8 py-3 rounded-full text-sm font-medium transition-colors",
                      cta.variant === "primary"
                        ? "bg-success text-white hover:bg-success/90"
                        : "border border-foreground text-foreground hover:bg-foreground hover:text-background"
                    )}
                  >
                    {cta.label}
                  </Link>
                )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
