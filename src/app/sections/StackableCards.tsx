"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const approachCards = [
  {
    number: "1",
    title: "PRECISION\nDIAGNOSTICS",
    description:
      "State-of-the-art imaging. Comprehensive oral analysis.\nUncompromising accuracy. Tailor-made for your smile.",
    image: "/images/approach/approach-1.png",
    href: "/services/diagnostics",
    panelColor: "#0f2228",
  },
  {
    number: "2",
    title: "CUSTOM TREATMENT\nPLANNING",
    description:
      "Every smile is unique. Our personalized approach\nensures the best path to your perfect alignment —\nfrom digital mapping to final results.",
    image: "/images/approach/approach-2.png",
    href: "/services/treatment-planning",
    panelColor: "#142d33",
  },
  {
    number: "3",
    title: "EXPERT CARE,\nEVERY VISIT",
    description:
      "A world-class team. Decades of experience.\nUniting knowledge and skill to deliver flawless\nresults, every time.",
    image: "/images/approach/approach-3.png",
    href: "/services/expert-care",
    panelColor: "#1a3439",
  },
  {
    number: "4",
    title: "LASTING\nRESULTS",
    description:
      "Sustainable outcomes. Gentle techniques.\nUncompromising attention to detail.\nProtecting the smile you've always wanted.",
    image: "/images/approach/approach-4.png",
    href: "/services/results",
    panelColor: "#1f3a3f",
  },
];

export function StackableCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

      cards.forEach((card, i) => {
        // Pin each card except the last one
        if (i < cards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            pin: true,
            pinSpacing: false,
            end: "+=100%",
            id: `approach-pin-${i}`,
          });

          // Subtle scale-down only — no opacity or brightness changes
          gsap.to(card, {
            scale: 0.97,
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: 0.5,
              id: `approach-shrink-${i}`,
            },
          });
        }

        // Animate the text content in from the left
        const textContent = card.querySelector(".approach-text-content");
        if (textContent) {
          gsap.fromTo(
            textContent,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 50%",
                scrub: 0.5,
                id: `approach-text-${i}`,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="approach-section">
      {approachCards.map((card, index) => (
        <div
          key={card.number}
          ref={(el) => {
            cardsRef.current[index] = el;
          }}
          className="approach-card"
          style={{ zIndex: index + 1 }}
        >
          {/* Left Panel */}
          <div className="approach-left" style={{ backgroundColor: card.panelColor }}>
            {/* Dotted top border accent */}
            <div className="approach-dotted-line" />

            {/* Large background number */}
            <span className="approach-bg-number">{card.number}</span>

            {/* Text content */}
            <div className="approach-text-content">
              <h2 className="approach-title">{card.title}</h2>
              <p className="approach-description">{card.description}</p>

              {/* CTA Button */}
              <div className="approach-cta-wrapper">
                <a href={card.href} className="approach-cta-button">
                  <span className="approach-cta-text">
                    Find out
                    <br />
                    more
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Panel - Image */}
          <div className="approach-right">
            <Image
              src={card.image}
              alt={card.title.replace("\n", " ")}
              fill
              className="approach-image"
              sizes="(max-width: 768px) 100vw, 55vw"
              priority={index === 0}
            />
          </div>
        </div>
      ))}
    </section>
  );
}
