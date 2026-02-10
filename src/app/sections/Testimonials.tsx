"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PillLabel } from "@/components/PillLabel";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Ale A.",
    location: "Alum Rock, San Jose, CA",
    date: "Oct 17, 2025",
    content:
      "Felt welcomed and cared for from the first visit. Dr. Riaño explained everything clearly. Staff worked to create an affordable treatment plan.",
  },
  {
    name: "Mark U.",
    location: "San Francisco, CA",
    date: "Oct 25, 2024",
    content:
      "Current adult patient, 8 months into braces. Dr. Riano is very thorough, answering ALL questions completely. Highly recommends him.",
  },
  {
    name: "L J K.",
    location: "San Francisco, CA",
    date: "May 16, 2024",
    content:
      "The best orthodontist in the city. Hands down. Dr Riano is very expert with kind, compassionate demeanor.",
  },
  {
    name: "Inhye K.",
    location: "San Francisco, CA",
    date: "Sep 24, 2019",
    content:
      "Amazing experience since fall 2017. Did half incognito and regular braces. Staff always welcoming. Never charged for lost brackets.",
  },
  {
    name: "Castellanos C.",
    location: "Sea Cliff, San Francisco, CA",
    date: "May 29, 2021",
    content:
      "Team makes braces as pleasant as possible. Lingual braces - amazing and quick results (3 months).",
  },
  {
    name: "Nina G.",
    location: "San Francisco, CA",
    date: "Aug 5, 2024",
    content:
      "Night & day difference from previous orthodontist. Making appointments is a breeze. Office large, beautiful, bright. Serve tea.",
  },
  {
    name: "Moe W.",
    location: "San Francisco, CA",
    date: "Nov 7, 2022",
    content:
      "Entire team welcoming and friendly. Dr. Riano transparent and honest. Gabriela pleasant, helpful, non-pushy.",
  },
  {
    name: "Zack G.",
    location: "San Francisco, CA",
    date: "Aug 18, 2020",
    content:
      "Phenomenal team. Lingual braces - significant results within months. Six out of five stars!",
  },
  {
    name: "Miss H.",
    location: "San Francisco, CA",
    date: "Mar 22, 2019",
    content:
      "Amazing staff and positive vibes. In one efficient visit: x-rays, exam, treatment plan, financial plan all done. Looking forward to lingual braces.",
  },
  {
    name: "Alexander D.",
    location: "San Francisco, CA",
    date: "Jul 19, 2019",
    content:
      "Dr. Riaño able to straighten teeth without wisdom teeth removal. After 22 months, delighted at results - teeth straight, bite improved.",
  },
  {
    name: "Laura W.",
    location: "San Francisco, CA",
    date: "Feb 8, 2019",
    content:
      "Dr Riano and staff super nice, easy to work with. Super efficient! Doctor always asks for opinion and adjusts plan until fully satisfied.",
  },
  {
    name: "Taylor R.",
    location: "SoMa, San Francisco, CA",
    date: "Feb 28, 2023",
    content:
      "Give 10 stars! Got estimates from four orthodontists - Dr Riano best/easiest/most feel good and cheapest. Treatment only 12 weeks.",
  },
  {
    name: "Mary M.",
    location: "San Francisco, CA",
    date: "Mar 28, 2019",
    content:
      "Started Invisalign late 2015. After first treatment, Dr. Riano not satisfied, wanted to push for more results - second set at no additional fee.",
  },
  {
    name: "Johny P.",
    location: "San Francisco, CA",
    date: "Feb 4, 2021",
    content:
      "Dr. RIANO and staff took care of wife and patient for Invisalign past year. Staff support crazy schedules - Teresa and Angie always find time.",
  },
  {
    name: "Jakub S.",
    location: "Kraków, Poland",
    date: "Apr 20, 2018",
    content:
      "Dr Riano is a rockstar. Every visit a pleasure in modern, slick clinic. Kudos to Sabrina from front desk - a real angel!",
  },
  {
    name: "Joseph B.",
    location: "San Francisco, CA",
    date: "Nov 30, 2018",
    content:
      "Gave up having Invisalign paid for by dental plan to choose Dr. Riano. Half the cost of other providers, twice the quality.",
  },
  {
    name: "Monica L.",
    location: "San Leandro, CA",
    date: "Jun 21, 2021",
    content:
      "Extremely happy with ortho treatment results. Dr. Riaño goes above and beyond. 10/10 WOULD RECOMMEND!",
  },
  {
    name: "Hayate T.",
    location: "Pasadena, CA",
    date: "May 2, 2018",
    content: "People who work there so kind. Beautiful building and can relax!",
  },
  {
    name: "Debora T.",
    location: "SoMa, San Francisco, CA",
    date: "Jun 2, 2021",
    content:
      "Whole crew awesome, always accommodating. Dr. Riano patient, explains treatment all along the way. Couldn't be happier with results.",
  },
  {
    name: "Kaitlin B.",
    location: "San Francisco, CA",
    date: "Dec 11, 2019",
    content:
      "Now at 33 (on 3rd round of ortho) Dr Raiño is the best. Doctor actually listens! Patiently answers many questions. ",
  },
  {
    name: "Tricia H.",
    location: "San Ramon, CA",
    date: "Oct 26, 2020",
    content:
      "Dr. Riano and team fantastic to work with. Office warm and welcoming, impeccably clean.",
  },
  {
    name: "Travis L.",
    location: "San Francisco, CA",
    date: "Feb 19, 2019",
    content:
      "Other orthodontist said needed 3 years of braces AND jaw surgery. Dr Riano fixed with no surgery in 18 months with incognito.",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  // Auto-advance every 3 seconds
  useEffect(() => {
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [next, currentIndex]);

  return (
    <section className="w-full bg-cream overflow-hidden">
      <div className="w-full">
        <div className="bg-card py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <PillLabel className="mb-8">TESTIMONIALS</PillLabel>

            <div className="relative min-h-[300px] flex items-center">
              {/* Previous Button */}
              <button
                onClick={prev}
                className="absolute left-0 z-10 w-12 h-12 rounded-full border border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors group"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="w-5 h-5 text-foreground group-hover:text-background" />
              </button>

              {/* Testimonial Content */}
              <div className="px-8 md:px-20 w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center"
                  >
                    {/* Stars */}
                    <div className="flex gap-1 mb-6 text-coral">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-current" />
                      ))}
                    </div>

                    <blockquote
                      className="text-lg md:text-xl lg:text-2xl text-foreground mb-8 leading-relaxed font-medium"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      &ldquo;{testimonials[currentIndex].content}&rdquo;
                    </blockquote>

                    <div className="flex flex-col items-center gap-1">
                      <cite className="not-italic text-lg font-semibold text-foreground">
                        {testimonials[currentIndex].name}
                      </cite>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <span>{testimonials[currentIndex].location}</span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                        <span>{testimonials[currentIndex].date}</span>
                      </div>
                      <a 
                        href="https://www.yelp.com/biz/camilo-ria%C3%B1o-orthodontics-san-francisco-9" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-coral hover:text-foreground transition-colors border-b border-coral hover:border-foreground"
                      >
                        View on Yelp
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next Button */}
              <button
                onClick={next}
                className="absolute right-0 z-10 w-12 h-12 rounded-full border border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors group"
                aria-label="Next testimonial"
              >
                <ArrowRight className="w-5 h-5 text-foreground group-hover:text-background" />
              </button>
            </div>

            {/* Slide Indicator */}
            <p className="text-sm text-muted-foreground mt-8">
              {currentIndex + 1}/{testimonials.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
