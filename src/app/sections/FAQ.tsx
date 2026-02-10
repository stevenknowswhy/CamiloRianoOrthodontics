"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    category: "About Our Practice",
    items: [
      {
        question: "Where are your offices located?",
        answer: "We have locations in San Francisco and Sonoma, California.",
      },
      {
        question: "What are your office hours?",
        answer: "Our offices are generally open Monday through Friday, with Saturday appointments available. Specific hours for our Sonoma location are Tuesday, Thursday, and Friday from 9:00 AM – 6:00 PM, and Saturday from 8:00 AM – 5:00 PM.",
      },
      {
        question: "Are you accepting new patients?",
        answer: "Yes, we are currently accepting new patients at our practice.",
      },
      {
        question: "Who is Dr. Camilo Riaño?",
        answer: "Dr. Riaño is a recognized expert in orthodontics and a Top 1% Invisalign® Diamond Provider. Before establishing his practice in the Bay Area, he studied facial and dental anatomy in the Colombian Amazon. He is also an expert in hidden lingual braces.",
      },
      {
        question: "Why is your practice unique?",
        answer: "We combine expert-led care with sustainability. Our spaces are designed on LEED principles using renewable materials because we believe creating a healthier environment is part of creating a healthier you.",
      },
    ],
  },
  {
    category: "Treatments & Services",
    items: [
      {
        question: "What orthodontic services do you offer?",
        answer: "We offer comprehensive services including Invisalign® and OrthoFX clear aligners, clear braces, ceramic braces, traditional braces, lingual braces (including Brius), and retainers.",
      },
      {
        question: "Do you treat patients of all ages?",
        answer: "Yes, we provide orthodontic care for children, teens, and adults.",
      },
      {
        question: "What are clear aligners and which brands do you use?",
        answer: "Clear aligners are transparent trays that gradually guide teeth into alignment. We offer Invisalign® and OrthoFX clear aligners, which allow you to eat, brush, and floss normally.",
      },
      {
        question: "Do you offer lingual braces?",
        answer: "Yes, Dr. Riaño is an expert in hidden lingual braces and we offer options like Brius Lingual Braces.",
      },
      {
        question: "Do you offer treatments specifically for adults?",
        answer: "Absolutely. We offer subtle and effective treatments designed to fit into an adult's lifestyle, such as clear aligners and ceramic braces, which help enhance confidence and boost long-term oral health.",
      },
    ],
  },
  {
    category: "Treatment Process & Care",
    items: [
      {
        question: "How long does orthodontic treatment typically take?",
        answer: "Treatment typically lasts between 12 and 24 months, though this depends on the specific procedures a patient needs.",
      },
      {
        question: "What happens during the initial consultation?",
        answer: "We evaluate your teeth and bite using digital scans or X-rays to build a personalized treatment plan specifically for you.",
      },
      {
        question: "Why is early orthodontic assessment important for children?",
        answer: "Early assessment allows us to guide healthy growth and development. It provides a chance to guide permanent teeth into healthier positions and can simplify or even eliminate the need for future treatment.",
      },
      {
        question: "Do I need to wear a retainer after my braces or aligners are removed?",
        answer: "Yes. Retainers are critical for maintaining your results because teeth naturally want to shift back after treatment. We typically recommend full-time wear initially, transitioning to nighttime use.",
      },
      {
        question: "What should I do in an orthodontic emergency?",
        answer: "You should call our office right away. We specialize in managing orthodontic emergencies and can schedule prompt care for you.",
      },
      {
        question: "Do you offer virtual consultations?",
        answer: "Yes, we offer a free virtual smile assessment. You can answer a few questions and submit photos online to get a personalized consultation without visiting the office.",
      },
      {
        question: "What is the Virtual Care program?",
        answer: "Our Virtual Care program allows Dr. Riaño to monitor your Invisalign or braces treatment remotely using the Grin App and a Grin Scope phone attachment, reducing the need for frequent office visits.",
      },
    ],
  },
  {
    category: "Financial & Insurance",
    items: [
      {
        question: "Do you accept dental insurance?",
        answer: "Yes, we help patients find the best dental insurance for braces or aligners and will review your benefits to see what is covered.",
      },
      {
        question: "Do you offer payment plans?",
        answer: "Yes, we offer various financing solutions, including interest-free in-house payment plans, to make your orthodontic journey affordable.",
      },
    ],
  },
];

export function FAQ() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="bg-offwhite rounded-3xl p-8 md:p-12 lg:p-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-8 md:mb-12 text-foreground headline-serif text-center">
              FAQs
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              {faqCategories.map((category, catIndex) => (
                <motion.div
                  key={catIndex}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: catIndex * 0.1 }}
                >
                  <AccordionItem
                    value={`category-${catIndex}`}
                    className="border border-border-primary rounded-xl px-4 md:px-6 bg-card shadow-sm"
                  >
                    <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-foreground hover:no-underline py-6">
                      {category.category}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 pt-2">
                       <Accordion type="single" collapsible className="space-y-0">
                        {category.items.map((faq, faqIndex) => (
                          <AccordionItem
                            key={faqIndex}
                            value={`faq-${catIndex}-${faqIndex}`}
                            className="border-b border-border-primary last:border-0 py-2"
                          >
                            <AccordionTrigger className="text-left text-base font-medium text-text-primary hover:no-underline py-4 [&[data-state=open]>svg]:text-accent [&>svg]:text-accent [&>svg]:transition-transform">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-sm md:text-base pb-4 leading-relaxed">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
