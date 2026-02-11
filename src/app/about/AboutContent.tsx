"use client";

import { useEffect, useRef, useCallback } from "react";

import "./about.css";
import Image from "next/image";

/* ------------------------------------------------
   Intersection Observer hook for scroll reveals
   ------------------------------------------------ */
function useScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  const init = useCallback(() => {
    if (!containerRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      // Immediately show everything
      containerRef.current
        .querySelectorAll(".about-reveal")
        .forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    containerRef.current
      .querySelectorAll(".about-reveal")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cleanup = init();
    return cleanup;
  }, [init]);

  return containerRef;
}

/* ------------------------------------------------
   Insurance providers
   ------------------------------------------------ */
const insuranceProviders = [
  "Aetna",
  "BlueCross BlueShield",
  "Cigna",
  "Delta Dental",
  "United Healthcare",
  "Dentegra",
  "United Concordia",
  "Guardian",
];

/* ------------------------------------------------
   Trust images (Team)
   ------------------------------------------------ */
const trustImages = [
  {
    src: "/images/why-choose/Employee1.png",
    name: "Treatment Coordinator",
    role: "Treatment Coordinator",
  },
  {
    src: "/images/why-choose/Employee6.png",
    name: "Treatment Coordinator",
    role: "Treatment Coordinator",
  },
  {
    src: "/images/why-choose/Employee8_2.png",
    name: "Financial Coordinator",
    role: "Financial Coordinator",
  },
  // Placeholders for remaining slots
  {
    src: "/images/why-choose/Employee3.png",
    name: "Treatment Coordinator",
    role: "Treatment Coordinator",
  },
  {
    src: "/images/why-choose/Employee5.png",
    name: "Dental Assistant",
    role: "Dental Assistant",
  },
  {
    src: "/images/why-choose/Employee10.png",
    name: "Dental Assistant",
    role: "Dental Assistant",
  },
  {
    src: "/images/why-choose/Employee9_2.png",
    name: "Office Manager",
    role: "Office Manager",
  },
  {
    src: "/images/why-choose/Employee7_2.png",
    name: "Treatment Coordinator",
    role: "Treatment Coordinator",
  },
];

/* ------------------------------------------------
   Testimonial data
   ------------------------------------------------ */
const testimonials = [
  { name: "Ale A.", rating: 5, text: "Felt welcomed and cared for from the first visit. Dr. Riaño explained everything clearly. Staff worked to create an affordable treatment plan." },
  { name: "Mark U.", rating: 5, text: "Current adult patient, 8 months into braces. Dr. Riano is very thorough, answering ALL questions completely. Highly recommends him." },
  { name: "L J K.", rating: 5, text: "The best orthodontist in the city. Hands down. Dr Riano is very expert with kind, compassionate demeanor." },
  { name: "Inhye K.", rating: 5, text: "Amazing experience since fall 2017. Did half incognito and regular braces. Staff always welcoming. Never charged for lost brackets." },
  { name: "Shannon D.", rating: 3, text: "Felt overpromised and underdelivered with lingual braces. Got about 50% of results looking for. Nice clean office but parking sucks." },
  { name: "Castellanos C.", rating: 5, text: "Team makes braces as pleasant as possible. Lingual braces — amazing and quick results in just 3 months." },
  { name: "Nina G.", rating: 5, text: "Night & day difference from previous orthodontist. Making appointments is a breeze. Office large, beautiful, bright. Serve tea." },
  { name: "Moe W.", rating: 5, text: "Entire team welcoming and friendly. Dr. Riano transparent and honest. Gabriela pleasant, helpful, non-pushy." },
  { name: "Zack G.", rating: 5, text: "Phenomenal team. Lingual braces — significant results within months. Six out of five stars!" },
  { name: "Miss H.", rating: 5, text: "Amazing staff and positive vibes. In one efficient visit: x-rays, exam, treatment plan, financial plan all done." },
  { name: "Alexander D.", rating: 5, text: "Dr. Riaño able to straighten teeth without wisdom teeth removal. After 22 months, delighted at results — teeth straight, bite improved." },
  { name: "Laura W.", rating: 5, text: "Dr Riano and staff super nice, easy to work with. Super efficient! Doctor always asks for opinion and adjusts plan until fully satisfied." },
  { name: "Taylor R.", rating: 5, text: "Give 10 stars! Got estimates from four orthodontists — Dr Riano best, easiest, most feel good and cheapest. Treatment only 12 weeks." },
  { name: "Mary M.", rating: 5, text: "Started Invisalign late 2015. After first treatment, Dr. Riano not satisfied, wanted to push for more results — second set at no additional fee." },
  { name: "Johny P.", rating: 5, text: "Dr. RIANO and staff took care of wife and patient for Invisalign past year. Staff support crazy schedules — Teresa and Angie always find time." },
  { name: "Jakub S.", rating: 5, text: "Dr Riano is a rockstar. Every visit a pleasure in modern, slick clinic. Kudos to Sabrina from front desk — a real angel!" },
  { name: "Joseph B.", rating: 5, text: "Gave up having Invisalign paid for by dental plan to choose Dr. Riano. Half the cost of other providers, twice the quality." },
  { name: "Monica L.", rating: 5, text: "Extremely happy with ortho treatment results. Dr. Riaño goes above and beyond. 10/10 WOULD RECOMMEND!" },
  { name: "Hayate T.", rating: 5, text: "People who work there so kind. Beautiful building and can relax!" },
  { name: "Debora T.", rating: 5, text: "Whole crew awesome, always accommodating. Dr. Riano patient, explains treatment all along the way. Couldn't be happier with results." },
  { name: "Kaitlin B.", rating: 5, text: "Now at 33 (on 3rd round of ortho) Dr Riaño is the best. Doctor actually listens! Patiently answers many questions." },
  { name: "Tricia H.", rating: 5, text: "Dr. Riano and team fantastic to work with. Office warm and welcoming, impeccably clean." },
  { name: "Travis L.", rating: 5, text: "Other orthodontist said needed 3 years of braces AND jaw surgery. Dr Riano fixed with no surgery in 18 months with incognito." },
];

// Split into two rows
const topRow = testimonials.slice(0, 12);
const bottomRow = testimonials.slice(12);

/* ================================================
   Component
   ================================================ */
export function AboutContent() {
  const wrapRef = useScrollReveal();

  /* Render star row */
  const renderStars = (rating: number) => (
    <div className="testimonial-card-stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          className={s <= rating ? "testimonial-star" : "testimonial-star testimonial-star--empty"}
        >
          ★
        </span>
      ))}
    </div>
  );

  return (
    <div id="about-content" className="about-page" ref={wrapRef}>
      {/* ================================
          Section 1 — Hero Intro
          ================================ */}
      <section id="about-intro">
        <div className="about-hero-inner">
          {/* Left column — Text */}
          <div className="about-hero-left">
            <p className="about-eyebrow about-reveal">Camilo Riaño Orthodontics</p>

            <h1 className="about-headline about-reveal">
              Great Care Begins with Understanding
            </h1>

            <div className="about-body about-reveal">
              <p>
                At Camilo Riaño Orthodontics, we believe great care begins with
                understanding your goals, your comfort, and the everyday rhythm of
                your life. Our approach is calm and personal, built around
                listening closely and creating care that feels as natural as it is
                effective.
              </p>
              <p style={{ marginTop: 16 }}>
                With years of experience and a genuine commitment to precision, Dr.
                Riaño and his team combine advanced orthodontic techniques with a
                sense of warmth and trust.
              </p>
            </div>

            <a href="/contact" className="about-hero-cta about-reveal">
              Schedule Your Appointment
            </a>
          </div>

          {/* Right column — Decorative image composition */}
          <div className="about-hero-right about-reveal" style={{ transitionDelay: "0.2s" }}>
            <div className="about-hero-image">Image</div>
            <div className="about-hero-circle" />
            <div className="about-hero-accent" />
          </div>
        </div>
      </section>

      {/* ================================
          Section 2 — Trust Indicators
          ================================ */}
      <section id="trust">
        <div className="about-container">
          <h2 className="trust-heading about-reveal">
            Our Team
          </h2>
          <h3 className="trust-eyebrow about-reveal">
            Trusted. Experienced. Recognized.
          </h3>

          <div className="trust-grid">
            {trustImages.map((item, i) => (
              <div
                key={i}
                className="trust-image about-reveal"
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                {item.src ? (
                  <>
                    <Image
                      src={item.src}
                      alt={item.role || "Team Member"}
                      fill
                      className="trust-image-img"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="trust-overlay">
                      <p className="trust-role">{item.role}</p>
                    </div>
                  </>
                ) : (
                  "Image"
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================
          Section 2.5 — Testimonial Gallery
          ================================ */}
      <section id="testimonial-gallery">
        <h2 className="testimonial-gallery-heading about-reveal">
          What Our Patients Say
        </h2>

        {/* Row 1 — scrolls left */}
        <div className="testimonial-row testimonial-row--left">
          {[...topRow, ...topRow].map((t, i) => (
            <div key={`top-${i}`} className="testimonial-card">
              <p className="testimonial-card-text">{t.text}</p>
              {renderStars(t.rating)}
              <p className="testimonial-card-name">{t.name}</p>
            </div>
          ))}
        </div>

        {/* Row 2 — scrolls right */}
        <div className="testimonial-row testimonial-row--right">
          {[...bottomRow, ...bottomRow].map((t, i) => (
            <div key={`bot-${i}`} className="testimonial-card">
              <p className="testimonial-card-text">{t.text}</p>
              {renderStars(t.rating)}
              <p className="testimonial-card-name">{t.name}</p>
            </div>
          ))}
        </div>

        {/* Social proof bar */}
        <div className="testimonial-social-proof about-reveal">
          <p className="testimonial-social-proof-text">
            More than 2,200+ Happy Patients Served
          </p>
          <div className="testimonial-rating-row">
            <span className="testimonial-rating-number">4.8</span>
            <div className="testimonial-rating-stars">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            {/* Google "G" logo */}
            <svg className="testimonial-google-logo" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.04 24.04 0 0 0 0 21.56l7.98-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
          </div>
          <div className="testimonial-links">
            <a
              href="https://www.yelp.com/biz/camilo-ria%C3%B1o-orthodontics-san-francisco-9"
              target="_blank"
              rel="noopener noreferrer"
              className="testimonial-link"
            >
              View on Yelp
            </a>
            <div className="testimonial-link-divider" />
            <a
              href="https://www.google.com/maps/place/Camilo+Ria%C3%B1o+Orthodontics/@37.776128,-122.4223999,17z/data=!3m2!4b1!5s0x872f3a9579b4aac9:0xdde9576731e12782!4m6!3m5!1s0x8085809eb941f215:0xf36096c79c83ccb2!8m2!3d37.776128!4d-122.419825!16s%2Fg%2F1wyc4kkb?entry=ttu&g_ep=EgoyMDI2MDIwNC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="testimonial-link"
            >
              View on Google
            </a>
          </div>
        </div>
      </section>



      {/* ================================
          Section 4 — CTA Block
          ================================ */}
      <section id="consultation-cta">
        <div className="about-container about-reveal">
          <h2 className="cta-heading">
            Book Your Complimentary Consultation
          </h2>
          <a href="/contact" className="cta-button">
            Schedule Now
          </a>
        </div>
      </section>

      {/* ================================
          Section 5 — Insurance & Billing
          ================================ */}
      <section id="insurance">
        <div className="about-container">
          <div className="insurance-grid">
            {/* Left */}
            <div className="about-reveal">
              <h2 className="insurance-heading">Insurance &amp; Billing</h2>
              <p className="insurance-text">
                Each insurance carrier offers a variety of benefit plans with
                different features. As a courtesy to you, we will directly bill
                your insurance company. Call us today to learn more.
              </p>
            </div>

            {/* Right */}
            <div className="about-reveal" style={{ transitionDelay: "0.15s" }}>
              <div className="insurance-pills">
                {insuranceProviders.map((name) => (
                  <div key={name} className="insurance-pill">
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
