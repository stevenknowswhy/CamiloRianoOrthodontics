"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { FullScreenMenu } from "./FullScreenMenu";
import { ThemeToggle } from "./ThemeToggle";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
              className="text-lg font-medium text-foreground tracking-wide"
            >
              Camilo Riaño <span className="mx-1">•</span> Orthodontics
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/contact"
                className="flex items-center gap-1 text-sm font-medium text-foreground hover:opacity-70 transition-opacity"
              >
                <span className="text-coral">•</span>
                San Francisco
              </Link>
              <Link
                href="/contact/sonoma"
                className="text-sm font-medium text-foreground hover:opacity-70 transition-opacity"
              >
                Sonoma
              </Link>
            </div>

            {/* CTA Button, Language Toggle & Theme Toggle */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="#contact"
                className="bg-[#16a34a] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#15803d] transition-colors"
              >
                Book Your Complimentary Consultation
              </Link>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <span className="font-medium underline underline-offset-4">
                  EN
                </span>
                <span className="text-muted-foreground">|</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                  ES
                </span>
              </div>
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button - Now visible on all screens as Hamburger */}
            <button
              className="p-2 -mr-2 text-foreground hover:opacity-70 transition-opacity"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
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

