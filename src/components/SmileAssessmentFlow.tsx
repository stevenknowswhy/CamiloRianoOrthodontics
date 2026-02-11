"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft } from "lucide-react";
import { submitSmileAssessment } from "@/lib/api";

export function SmileAssessmentFlow() {
  // Steps:
  // 0: Welcome
  // 1: Patient Age
  // 2: Primary Concern Category
  // 3: Specific Concern
  // 4: Status
  // 5: Treatment Interest
  // 6: Location
  // 7: Timeline
  // 8: Insurance
  // 9: Contact Part 1 (Name, DOB)
  // 10: Contact Part 2 (Phone, Email)
  // 11: Consent
  // 12: Summary
  const [step, setStep] = useState(0);
  const totalSteps = 12;

  // Selection State
  const [patientAge, setPatientAge] = useState<string | null>(null);
  const [concernCategory, setConcernCategory] = useState<string | null>(null);
  const [concern, setConcern] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [treatment, setTreatment] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [insurance, setInsurance] = useState<string | null>(null);

  // Contact Form State
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    dateOfBirth: "",
  });
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Options
  const ageOptions = [
    { id: "A", label: "Adult" },
    { id: "B", label: "Teenager" },
    { id: "C", label: "Child" },
  ];

  const concernCategoryOptions = [
    { id: "A", label: "Cosmetic / Esthetic" },
    { id: "B", label: "Health / Function" },
    { id: "C", label: "Specific Event" },
  ];

  const specificConcerns: Record<string, { id: string; label: string }[]> = {
    A: [
      { id: "A1", label: "I want a straighter smile" },
      { id: "A2", label: "I want to close gaps" },
      { id: "A3", label: "I want whiter teeth" },
      { id: "A4", label: "I want to fix overlapping" },
    ],
    B: [
      { id: "B1", label: "I have jaw pain / clicking" },
      { id: "B2", label: "I have difficulty chewing" },
      { id: "B3", label: "My bite feels off" },
      { id: "B4", label: "I grind my teeth" },
    ],
    C: [
      { id: "C1", label: "Wedding coming up" },
      { id: "C2", label: "Graduation / New Job" },
      { id: "C3", label: "Public speaking" },
      { id: "C4", label: "Family portraits" },
    ],
  };

  const statusOptions = [
    { id: "A", label: "Ready to set up my complimentary consultation!" },
    { id: "B", label: "I have specific questions before scheduling" },
  ];

  const treatmentOptions = [
    { id: "A", label: "Invisalign Clear Aligners" },
    { id: "B", label: "Incognito Hidden Braces" },
    { id: "C", label: "Ceramic Braces" },
  ];

  const locationOptions = [
    { id: "A", label: "San Francisco" },
    { id: "B", label: "Sonoma" },
  ];

  const timelineOptions = [
    { id: "A", label: "Yesterday 🙂" },
    { id: "B", label: "This month" },
    { id: "C", label: "Would like to discuss options" },
  ];

  const insuranceOptions = [
    { id: "A", label: "Yes, I have dental insurance" },
    { id: "B", label: "No, I do not have insurance" },
    { id: "C", label: "I'm not sure" },
  ];

  const handleNext = async () => {
    if (step === 1 && patientAge) { setStep(2); return; }
    if (step === 2 && concernCategory) { setStep(3); return; }
    if (step === 3 && concern) { setStep(4); return; }
    if (step === 4 && status) { setStep(5); return; }
    if (step === 5 && treatment) { setStep(6); return; }
    if (step === 6 && location) { setStep(7); return; }
    if (step === 7 && timeline) { setStep(8); return; }
    if (step === 8 && insurance) { setStep(9); return; }

    // Contact Part 1: Name & DOB
    if (step === 9) {
      if (!contactInfo.firstName || !contactInfo.lastName || !contactInfo.dateOfBirth) {
        alert("Please fill in your name and date of birth.");
        return;
      }
      setStep(10);
      return;
    }

    // Contact Part 2: Phone & Email
    if (step === 10) {
      if (!contactInfo.phone || !contactInfo.email) {
        alert("Please provide your phone number and email.");
        return;
      }
      setStep(11);
      return;
    }

    // Consent
    if (step === 11) {
      if (!privacyConsent) {
        alert("Please agree to the privacy policy to continue.");
        return;
      }
      setStep(12);
      return;
    }

    // Submit
    if (step === 12) {
      setIsSubmitting(true);
      setSubmitError(null);
      
      const result = await submitSmileAssessment({
        patientAge: ageOptions.find(o => o.id === patientAge)?.label,
        concern: concernCategory ? specificConcerns[concernCategory]?.find(o => o.id === concern)?.label : undefined,
        treatment: treatmentOptions.find(o => o.id === treatment)?.label,
        location: locationOptions.find(o => o.id === location)?.label,
        timeline: timelineOptions.find(o => o.id === timeline)?.label,
        insurance: insuranceOptions.find(o => o.id === insurance)?.label,
        firstName: contactInfo.firstName,
        lastName: contactInfo.lastName,
        email: contactInfo.email,
        phone: contactInfo.phone,
        dateOfBirth: contactInfo.dateOfBirth,
        privacyConsent,
        marketingConsent,
      });
      
      setIsSubmitting(false);
      
      if (result.success) {
        setIsSuccess(true);
      } else {
        setSubmitError(result.error || 'Failed to submit. Please try again.');
      }
      return;
    }
  };

  const handleBack = () => {
    if (step === 0) return;
    if (step === 1) { setStep(0); return; }
    if (step === 3) { setConcern(null); setStep(2); return; } // Clear specific concern when going back to category
    setStep(step - 1);
  };

  // Format phone number
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length === 0) return "";
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  // Check if the current step's next button should be disabled
  const isNextDisabled = () => {
    if (step === 1 && !patientAge) return true;
    if (step === 2 && !concernCategory) return true;
    if (step === 3 && !concern) return true;
    if (step === 4 && !status) return true;
    if (step === 5 && !treatment) return true;
    if (step === 6 && !location) return true;
    if (step === 7 && !timeline) return true;
    if (step === 8 && !insurance) return true;
    if (step === 9 && (!contactInfo.firstName || !contactInfo.lastName || !contactInfo.dateOfBirth)) return true;
    if (step === 10 && (!contactInfo.phone || !contactInfo.email)) return true;
    if (step === 11 && !privacyConsent) return true;
    return false;
  };

  // Step headings
  const getStepHeading = () => {
    switch (step) {
      case 1: return "Patient Age";
      case 2: return "What is your primary goal?";
      case 3: return "Which specific concern applies to you?";
      case 4: return "Which option best describes your status?";
      case 5: return "Which treatment are you interested in?";
      case 6: return "Which location are you interested in visiting?";
      case 7: return "How soon would you like to get your dream smile?";
      case 8: return "Do you have dental insurance?";
      case 9: return "Let's get to know you";
      case 10: return "How can we reach you?";
      case 11: return "Privacy & Consent";
      case 12: return "Please confirm your details";
      default: return "";
    }
  };

  // Render Helper for Options
  const renderOptions = (
    options: { id: string; label: string }[],
    selectedValue: string | null,
    setValue: (id: string) => void
  ) => (
    <div className="space-y-3">
      {options.map((option) => {
        const isSelected = selectedValue === option.id;
        return (
          <button
            key={option.id}
            onClick={() => setValue(option.id)}
            className={`w-full text-left p-4 rounded-xl border flex items-center gap-4 transition-all duration-200 group relative overflow-hidden
              ${
                isSelected
                  ? "bg-[#4ecdc4]/20 border-[#4ecdc4]"
                  : "bg-card/80 border-border hover:bg-card"
              }`}
          >
            <span
              className={`flex items-center justify-center w-6 h-6 rounded border text-xs font-medium transition-colors
                ${
                  isSelected
                    ? "bg-[#4ecdc4] text-[#162a30] border-[#4ecdc4]"
                    : "bg-transparent text-foreground border-border group-hover:border-foreground"
                }`}
            >
              {option.id}
            </span>
            <span className="text-lg md:text-xl text-foreground font-light">
              {option.label}
            </span>
            {isSelected && <Check className="ml-auto w-5 h-5 text-[#4ecdc4]" />}
          </button>
        );
      })}
    </div>
  );

  // Progress bar
  const progressPercent = step === 0 ? 0 : (step / totalSteps) * 100;

  return (
    <section className="grow grid grid-cols-1 md:grid-cols-2 w-full h-full relative z-10">
      {/* Left Column Spacer (Image Position) */}
      <div className="hidden md:block" />
      
      <div className="flex flex-col px-6 md:px-12 lg:px-20 pt-32 pb-10 h-full overflow-y-auto no-scrollbar">
      {/* Progress Bar */}
      {step > 0 && step <= totalSteps && (
        <div className="w-full max-w-sm mb-6 shrink-0">
          <div className="w-full h-1 bg-border rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#4ecdc4] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-right">
            Step {step} of {totalSteps}
          </p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start gap-6 w-full max-w-sm my-auto"
          >
            {/* Mobile Header Image */}
            <div className="w-full relative h-[200px] rounded-2xl overflow-hidden mb-2 md:hidden shadow-lg border border-border">
               <Image
                src="/images/SmileAssessment.png"
                alt="Smile Assessment"
                fill
                className="object-cover object-center"
              />
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-wide drop-shadow-md text-foreground"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              <span className="block text-2xl md:text-3xl mb-4 font-sans font-normal">
                😁 Smile Assessment
              </span>
              Let&apos;s Get Started
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mt-4 font-light drop-shadow-sm">
              Take the first step toward a confident smile. Answer a few
              questions so we can personalize your orthodontic consultation.
            </p>

            <button
              onClick={() => setStep(1)}
              className="mt-8 bg-[#4ecdc4] hover:bg-[#45b7af] text-[#162a30] px-10 py-4 rounded-full text-lg font-medium transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              Begin Assessment
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={`step-${step}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-sm text-left my-auto"
          >
            <button
              onClick={handleBack}
              className="mb-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium uppercase tracking-wider">
                Back
              </span>
            </button>

            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-foreground mb-2 flex items-start gap-3">
                <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-sm bg-[#4ecdc4] text-[#162a30] text-sm font-bold mt-1">
                  {step}
                </span>
                {getStepHeading()}
                <span className="text-[#4ecdc4]">*</span>
              </h2>
            </div>

            {/* Step 1: Patient Age */}
            {step === 1 && renderOptions(ageOptions, patientAge, setPatientAge)}

            {/* Step 2: Primary Concern Category */}
            {step === 2 && renderOptions(concernCategoryOptions, concernCategory, setConcernCategory)}

            {/* Step 3: Specific Concern */}
            {step === 3 && concernCategory && specificConcerns[concernCategory] && renderOptions(specificConcerns[concernCategory], concern, setConcern)}

            {/* Step 4: Status */}
            {step === 4 && renderOptions(statusOptions, status, setStatus)}

            {/* Step 5: Treatment Interest */}
            {step === 5 && renderOptions(treatmentOptions, treatment, setTreatment)}

            {/* Step 6: Location */}
            {step === 6 && renderOptions(locationOptions, location, setLocation)}

            {/* Step 7: Timeline */}
            {step === 7 && renderOptions(timelineOptions, timeline, setTimeline)}

            {/* Step 8: Insurance */}
            {step === 8 && renderOptions(insuranceOptions, insurance, setInsurance)}

            {/* Step 9: Contact Part 1 (Name, DOB) */}
            {step === 9 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-[#4ecdc4] uppercase tracking-wide">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-card/80 border border-border rounded-lg p-3 text-foreground placeholder-muted-foreground focus:border-[#4ecdc4] focus:outline-none focus:ring-1 focus:ring-[#4ecdc4]"
                      placeholder="First Name"
                      value={contactInfo.firstName}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-[#4ecdc4] uppercase tracking-wide">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-card/80 border border-border rounded-lg p-3 text-foreground placeholder-muted-foreground focus:border-[#4ecdc4] focus:outline-none focus:ring-1 focus:ring-[#4ecdc4]"
                      placeholder="Last Name"
                      value={contactInfo.lastName}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-[#4ecdc4] uppercase tracking-wide">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="w-full bg-card/80 border border-border rounded-lg p-3 text-foreground placeholder-muted-foreground focus:border-[#4ecdc4] focus:outline-none focus:ring-1 focus:ring-[#4ecdc4]"
                    placeholder="MM/dd/yyyy"
                    value={contactInfo.dateOfBirth}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        dateOfBirth: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            )}

            {/* Step 10: Contact Part 2 (Phone, Email) */}
            {step === 10 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm text-[#4ecdc4] uppercase tracking-wide">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-card/80 border border-border rounded-lg p-3 text-foreground placeholder-muted-foreground focus:border-[#4ecdc4] focus:outline-none focus:ring-1 focus:ring-[#4ecdc4]"
                    placeholder="(___) ___-____"
                    value={contactInfo.phone}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        phone: formatPhone(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-[#4ecdc4] uppercase tracking-wide">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-card/80 border border-border rounded-lg p-3 text-foreground placeholder-muted-foreground focus:border-[#4ecdc4] focus:outline-none focus:ring-1 focus:ring-[#4ecdc4]"
                    placeholder="you@example.com"
                    value={contactInfo.email}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            )}

            {/* Step 11: Consent */}
            {step === 11 && (
              <div className="space-y-6">
                {/* Privacy Consent */}
                <div className="space-y-4 pt-4 border-t border-border">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={privacyConsent}
                      onChange={(e) => setPrivacyConsent(e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-border bg-card text-[#4ecdc4] focus:ring-[#4ecdc4] focus:ring-offset-0 accent-[#4ecdc4] shrink-0"
                    />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      I agree to the privacy policy below.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={marketingConsent}
                      onChange={(e) => setMarketingConsent(e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-border bg-card text-[#4ecdc4] focus:ring-[#4ecdc4] focus:ring-offset-0 accent-[#4ecdc4] shrink-0"
                    />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                      I agree to receive information about Invisalign treatment
                      and other orthodontic services from Camilo Riaño
                      Orthodontics by email, mobile phone, text, or other means
                      to which I consent. This may contain special offers,
                      information on orthodontic services, and requests for
                      feedback about your experience. Your personal data will be
                      processed in accordance with our Privacy Policy.
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 12: Summary */}
            {step === 12 && (
              <div className="bg-card/80 border border-border p-8 rounded-2xl space-y-5 text-foreground">
                <h3 className="text-xl font-serif mb-4">Summary</h3>
                <div className="grid md:grid-cols-2 gap-5">
                  {/* Contact Info First */}
                  <div>
                    <span className="text-[#4ecdc4] text-sm uppercase tracking-wider block mb-1">
                      Name
                    </span>
                    <p className="text-lg">
                      {contactInfo.firstName} {contactInfo.lastName}
                    </p>
                  </div>
                  <div>
                    <span className="text-[#4ecdc4] text-sm uppercase tracking-wider block mb-1">
                      Date of Birth
                    </span>
                    <p className="text-lg">
                      {contactInfo.dateOfBirth
                        ? new Date(contactInfo.dateOfBirth + 'T00:00:00').toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : "Not provided"}
                    </p>
                  </div>
                  <div>
                    <span className="text-[#4ecdc4] text-sm uppercase tracking-wider block mb-1">
                      Phone
                    </span>
                    <p className="text-lg">{contactInfo.phone}</p>
                  </div>
                  <div>
                    <span className="text-[#4ecdc4] text-sm uppercase tracking-wider block mb-1">
                      Email
                    </span>
                    <p className="text-lg">{contactInfo.email}</p>
                  </div>

                  {/* Assessment Details Below */}
                  <div className="pt-5 border-t border-border col-span-full md:col-span-2 grid md:grid-cols-2 gap-5">
                    <div>
                      <span className="text-[#4ecdc4] text-sm uppercase tracking-wider block mb-1">
                        Patient Age
                      </span>
                      <p className="text-lg">
                        {ageOptions.find((o) => o.id === patientAge)?.label}
                      </p>
                    </div>
                    <div>
                      <span className="text-[#4ecdc4] text-sm uppercase tracking-wider block mb-1">
                        Primary Concern
                      </span>
                      <p className="text-lg">
                        {concernCategory ? specificConcerns[concernCategory]?.find((o) => o.id === concern)?.label : concern}
                      </p>
                    </div>
                    <div>
                      <span className="text-[#4ecdc4] text-sm uppercase tracking-wider block mb-1">
                        Status
                      </span>
                      <p className="text-lg">
                        {statusOptions.find((o) => o.id === status)?.label}
                      </p>
                    </div>
                    <div>
                      <span className="text-[#4ecdc4] text-sm uppercase tracking-wider block mb-1">
                        Treatment
                      </span>
                      <p className="text-lg">
                        {treatmentOptions.find((o) => o.id === treatment)?.label}
                      </p>
                    </div>
                    <div>
                      <span className="text-[#4ecdc4] text-sm uppercase tracking-wider block mb-1">
                        Location
                      </span>
                      <p className="text-lg">
                        {locationOptions.find((o) => o.id === location)?.label}
                      </p>
                    </div>
                    <div>
                      <span className="text-[#4ecdc4] text-sm uppercase tracking-wider block mb-1">
                        Timeline
                      </span>
                      <p className="text-lg">
                        {timelineOptions.find((o) => o.id === timeline)?.label}
                      </p>
                    </div>
                    <div>
                      <span className="text-[#4ecdc4] text-sm uppercase tracking-wider block mb-1">
                        Insurance
                      </span>
                      <p className="text-lg">
                        {insuranceOptions.find((o) => o.id === insurance)?.label}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border flex flex-col gap-1">
                  <p className="text-muted-foreground text-xs">
                    Privacy Policy Accepted: {privacyConsent ? "True" : "False"}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Marketing Consent: {marketingConsent ? "True" : "False"}
                  </p>
                </div>
                <p className="text-muted-foreground text-sm mt-4 pt-4 border-t border-border">
                  We will review your assessment and get back to you shortly to
                  schedule your personalized consultation.
                </p>
              </div>
            )}

            {/* Error Message */}
            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-foreground"
              >
                {submitError}
              </motion.div>
            )}
            
            {/* Success Message */}
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-8 bg-[#4ecdc4]/20 border border-[#4ecdc4]/50 rounded-2xl text-center"
              >
                <div className="w-16 h-16 bg-[#4ecdc4] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-[#162a30]" />
                </div>
                <h3 className="text-2xl font-serif mb-2 text-foreground">Thank You!</h3>
                <p className="text-muted-foreground">Your smile assessment has been submitted. We&apos;ll be in touch shortly.</p>
              </motion.div>
            )}

            {/* Navigation Actions */}
            {!isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex justify-start pb-8"
            >
              <div className="flex items-center gap-4">
                <button
                  className="bg-[#4ecdc4] hover:bg-[#45b7af] text-[#162a30] px-8 py-3 rounded-md text-lg font-bold transition-all shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleNext}
                  disabled={isNextDisabled() || isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-[#162a30] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>{step === 12 ? "Submit" : "Next"} <Check className="w-4 h-4 ml-1" /></>
                  )}
                </button>
                <p className="hidden md:flex items-center text-xs text-muted-foreground">
                  press <strong className="mx-1">Enter ↵</strong>
                </p>
              </div>
            </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </section>
  );
}
