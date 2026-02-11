"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, MapPin, ChevronDown } from "lucide-react";
import { FullScreenMenu } from "./FullScreenMenu";
import { ThemeToggle } from "./ThemeToggle";
import { siteConfig } from "@/data/site-data";

/**
 * Navigation Component
 *
 * Now powered by centralized site-data:
 * - Location info (hours, addresses, phones) from siteConfig.locations
 * - CTA button from siteConfig.navigation.cta
 * - Language options from siteConfig.navigation.languages
 * - Logo from siteConfig.metadata
 *
 * Component behavior (scroll state, variant detection) remains here.
 */

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get data from siteConfig
  const { locations, navigation, metadata } = siteConfig;
  const { main: navLinks, cta, languages } = navigation;

  // Determine variant based on pathname
  // Contact and Smile Assessment pages use overlay variant
  const isOverlayPage = pathname === "/contact" || pathname === "/contact/sonoma" || pathname === "/smile-assessment" || pathname === "/virtual-care";
  const variant = isOverlayPage ? "overlay" : "default";

  // Determine text color based on variant and scroll state
  const isOverlayAndNotScrolled = variant === "overlay" && !scrolled;
  const textColorClass = isOverlayAndNotScrolled ? "text-white" : "text-foreground";
  const hoverTextColorClass = isOverlayAndNotScrolled ? "hover:text-white/80" : "hover:opacity-70";
  const mutedTextColorClass = isOverlayAndNotScrolled ? "text-white/70" : "text-muted-foreground";

  // Check if we are on a contact or smile assessment page for CTA logic
  const isContactOrAssessment = pathname?.includes("/contact") || pathname?.includes("/smile-assessment");

  // Get active location data
  const activeLocationData = activeLocation
    ? locations.offices.find((loc) => loc.id === activeLocation)
    : null;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-background/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className={cn(
                "text-lg font-medium tracking-wide transition-colors",
                textColorClass
              )}
            >
              {metadata.logo.text}
            </Link>

            {/* Right Side Group */}
            <div className="flex items-center gap-3 pl-4">
              {/* CTA Button, Language Toggle & Theme Toggle */}
              <div className="hidden md:flex items-center gap-6">
              {!isContactOrAssessment && cta && (
                <Link
                  href={cta.href}
                  className={cn(
                    "px-6 py-3 rounded-full text-sm font-medium transition-colors",
                    cta.variant === "primary"
                      ? "bg-[#16a34a] text-white hover:bg-[#15803d]"
                      : "border border-foreground text-foreground hover:bg-foreground hover:text-background"
                  )}
                >
                  {cta.label}
                </Link>
              )}

              {/* Language Toggle */}
              <div className={cn("flex items-center gap-2 text-sm transition-colors", textColorClass)}>
                {languages.available.map((lang, index) => (
                  <React.Fragment key={lang.code}>
                    <span
                      className={cn(
                        lang.code === languages.default
                          ? "font-medium underline underline-offset-4"
                          : "cursor-pointer transition-colors",
                        isOverlayAndNotScrolled && lang.code !== languages.default
                          ? "text-white/70 hover:text-white"
                          : lang.code !== languages.default
                          ? "text-muted-foreground hover:text-foreground"
                          : ""
                      )}
                    >
                      {lang.label}
                    </span>
                    {index < languages.available.length - 1 && (
                      <span className={mutedTextColorClass}>|</span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Location Dropdown */}
              <div
                className="relative group"
                onMouseLeave={() => setActiveLocation(null)}
              >
                <Link
                  href="/contact"
                  className={cn(
                    "relative p-2 rounded-full transition-all duration-300 block",
                    isOverlayAndNotScrolled ? "hover:bg-white/10" : "hover:bg-foreground/10",
                    textColorClass
                  )}
                  aria-label="Find us"
                >
                  <MapPin className="w-5 h-5" />
                </Link>

                {/* Dropdown */}
                <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 w-80 z-50">
                  <div className="bg-background/95 backdrop-blur-md rounded-xl shadow-lg border border-border overflow-hidden p-4">
                    {/* Locations Row */}
                    <div className="flex items-center gap-4 border-b border-border pb-3 mb-3">
                      {locations.offices.map((office) => (
                        <React.Fragment key={office.id}>
                          {office.id !== locations.offices[0].id && (
                            <div className="w-px h-4 bg-border"></div>
                          )}
                          <Link
                            href={office.slug === 'sf' ? '/contact' : `/contact/${office.slug}`}
                            className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-coral transition-colors"
                            onMouseEnter={() => setActiveLocation(office.id)}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] shadow-[0_0_6px_rgba(22,163,74,0.5)]"></span>
                            {office.shortName}
                          </Link>
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Dynamic Details Area */}
                    <div className="min-h-[60px] flex flex-col justify-center">
                      {!activeLocation || !activeLocationData ? (
                        <p className="text-xs text-muted-foreground text-center italic">
                          Hover over a location to see details
                        </p>
                      ) : (
                        <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                          <div className="group/phone cursor-default">
                             <a
                               href={`tel:${activeLocationData.contact.phone.replace(/\D/g,'')}`}
                               className="flex items-center justify-center gap-2 text-sm font-medium text-foreground hover:text-coral transition-colors"
                             >
                               {activeLocationData.contact.phoneDisplay}
                               <ChevronDown className="w-4 h-4 text-muted-foreground group-hover/phone:text-coral group-hover/phone:rotate-180 transition-all duration-300" />
                             </a>

                             {/* Address Reveal */}
                             <div className="grid grid-rows-[0fr] group-hover/phone:grid-rows-[1fr] transition-all duration-300 ease-in-out">
                               <div className="overflow-hidden">
                                 <div className="pt-2 text-center">
                                   <p className="text-xs text-muted-foreground leading-relaxed px-4">
                                     {activeLocationData.address.full}
                                   </p>
                                 </div>
                               </div>
                             </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <ThemeToggle className={cn(textColorClass, isOverlayAndNotScrolled ? "hover:bg-white/10" : "hover:bg-foreground/10")} />
            </div>

            {/* Mobile Menu Button - Now visible on all screens as Hamburger */}
            <button
              className={cn(
                "p-2 -mr-2 transition-opacity",
                 textColorClass,
                 hoverTextColorClass
              )}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            </div>
          </div>
        </nav>
      </header>

      <FullScreenMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}

