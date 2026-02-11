"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ArrowRight } from "lucide-react";
import { submitDoctorReferral } from "@/lib/api";

export function ReferralFlow() {
  // Steps:
  // 0: Welcome
  // 1: Why Refer
  // 2: Patient Info
  // 3: Doctor Info
  // 4: Clinical Details
  // 5: Success
  const [step, setStep] = useState(0);
  const totalSteps = 5; // Total logic steps including success is 6 (0-5), but progress bar reflects form steps

  // Form State
  const [formData, setFormData] = useState({
    patientFirstName: "",
    patientLastName: "",
    patientEmail: "",
    patientPhone: "",
    preferredLocation: "", // "San Francisco" or "Sonoma"
    doctorFirstName: "",
    doctorLastName: "",
    referralReason: "", // "Complete Orthodontic Evaluation", "Early Interceptive Treatment", "Limited Treatment", "TMJ", "Other"
    comments: "",
    xRays: "", // "Unavailable", "Accompanying", "Mailed", "Emailed", "Other"
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const locationOptions = ["San Francisco", "Sonoma"];
  const reasonOptions = [
    "Complete Orthodontic Evaluation",
    "Early Interceptive Treatment",
    "Limited Treatment of a Specific Area",
    "TMJ",
    "Other",
  ];
  const xRayOptions = [
    "Unavailable, please take new x-rays",
    "Accompanying patient",
    "Mailed to your office",
    "Emailed",
    "Other",
  ];

  const handleNext = async () => {
    if (step === 0) {
      setStep(1);
      return;
    }
    if (step === 1) {
      setStep(2);
      return;
    }
    // Validate Patient Info (Step 2)
    if (step === 2) {
      if (
        !formData.patientFirstName ||
        !formData.patientLastName ||
        !formData.patientEmail ||
        !formData.patientPhone ||
        !formData.preferredLocation
      ) {
        alert("Please fill in all required patient fields.");
        return;
      }
      setStep(3);
      return;
    }
    // Validate Doctor Info (Step 3)
    if (step === 3) {
      if (!formData.doctorFirstName || !formData.doctorLastName) {
        alert("Please provide the referring doctor's name.");
        return;
      }
      setStep(4);
      return;
    }
    // Validate Clinical Details & Submit (Step 4)
    if (step === 4) {
      if (!formData.referralReason) {
        setSubmitError("Please select a reason for the referral.");
        return;
      }
      
      setIsSubmitting(true);
      setSubmitError(null);
      
      const result = await submitDoctorReferral({
        patientFirstName: formData.patientFirstName,
        patientLastName: formData.patientLastName,
        patientEmail: formData.patientEmail,
        patientPhone: formData.patientPhone,
        preferredLocation: formData.preferredLocation,
        doctorFirstName: formData.doctorFirstName,
        doctorLastName: formData.doctorLastName,
        referralReason: formData.referralReason,
        xRays: formData.xRays,
        comments: formData.comments,
      });
      
      setIsSubmitting(false);
      
      if (result.success) {
        setStep(5);
      } else {
        setSubmitError(result.error || 'Failed to submit referral. Please try again.');
      }
      return;
    }
  };

  const handleBack = () => {
    if (step === 0) return;
    setStep(step - 1);
  };

  const updateForm = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

   // Format phone number
   const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length === 0) return "";
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const renderValueProps = () => (
    <div className="space-y-6">
      <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-8">
        Why Colleagues Choose <br /> to Refer Here
      </h2>
      <div className="grid gap-6">
        <div className="p-6 bg-card/80 border border-border rounded-xl">
            <h3 className="text-xl font-medium text-[#4ecdc4] mb-2">Thoughtful treatment planning</h3>
            <p className="text-muted-foreground font-light">Every patient’s journey is shaped by their needs, lifestyle, and comfort, never by trends or one-size-fits-all solutions.</p>
        </div>
        <div className="p-6 bg-card/80 border border-border rounded-xl">
            <h3 className="text-xl font-medium text-[#4ecdc4] mb-2">Open, respectful communication</h3>
            <p className="text-muted-foreground font-light">We make sure patients understand their treatment and feel involved in every decision. You’ll receive updates and input opportunities throughout the process.</p>
        </div>
        <div className="p-6 bg-card/80 border border-border rounded-xl">
            <h3 className="text-xl font-medium text-[#4ecdc4] mb-2">Advanced yet approachable care</h3>
            <p className="text-muted-foreground font-light">From Invisalign® to Incognito™ lingual braces, Dr. Riaño’s expertise combines modern techniques with a quiet precision that values both form and function.</p>
        </div>
        <div className="p-6 bg-card/80 border border-border rounded-xl">
            <h3 className="text-xl font-medium text-[#4ecdc4] mb-2">Ease for patients and offices alike</h3>
            <p className="text-muted-foreground font-light">We simplify scheduling, offer insurance support, and create clear pathways for transitions back to general care once treatment concludes.</p>
        </div>
      </div>
    </div>
  );

  // Helper to calculate progress for just the form steps (2, 3, 4)
  // Step 2 -> 33%, Step 3 -> 66%, Step 4 -> 100%
  const formStep = step - 1;
  const totalFormSteps = 3;
  const progressPercent = Math.min((formStep / totalFormSteps) * 100, 100);

  return (
    <section className="grow grid grid-cols-1 md:grid-cols-2 w-full h-full relative z-10">
      {/* Left Column Spacer (Image Position) */}
      <div className="hidden md:block" />

      <div className="flex flex-col px-6 md:px-12 lg:px-20 pt-32 pb-20 h-full overflow-y-auto no-scrollbar scroll-smooth">
        
        {/* Progress Bar (Only for Form Steps 2, 3, 4) */}
        {step >= 2 && step <= 4 && (
            <div className="w-full max-w-lg mb-6 shrink-0">
                 <button
                onClick={handleBack}
                className="mb-4 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium uppercase tracking-wider">
                  Back
                </span>
              </button>
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                    <span>Step {step - 1} of 3</span>
                </div>
                <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                    <motion.div
                    className="h-full bg-[#4ecdc4] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                </div>
            </div>
        )}

        <AnimatePresence mode="wait">
          {/* STEP 0: WELCOME */}
          {step === 0 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-start gap-6 w-full max-w-lg my-auto"
            >
               {/* Mobile Header Image */}
               <div className="w-full relative h-[250px] rounded-2xl overflow-hidden mb-4 md:hidden shadow-lg border border-border">
                <Image
                    src="/Referral.png"
                    alt="Doctor Referral"
                    fill
                    className="object-cover object-center"
                />
               </div>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-wide drop-shadow-md text-foreground"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                <span className="block text-2xl md:text-3xl mb-4 font-sans font-normal text-[#4ecdc4]">
                  Doctor Referrals
                </span>
                Extending the same care your patients already trust
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mt-4 font-light drop-shadow-sm leading-relaxed">
                At Camilo Riaño Orthodontics, we value the relationships that
                make great patient care possible. Every referral is more than a
                name on a form, it’s a gesture of trust. We honor that trust by
                ensuring your patients receive thoughtful, individualized care
                from the moment they walk through our doors.
              </p>

              <button
                onClick={handleNext}
                className="mt-8 bg-[#4ecdc4] hover:bg-[#45b7af] text-[#162a30] px-10 py-4 rounded-full text-lg font-medium transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                Send a Referral <ArrowRight className="w-5 h-5"/>
              </button>
            </motion.div>
          )}

          {/* STEP 1: VALUE PROPS */}
          {step === 1 && (
            <motion.div
              key="value-props"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-lg my-auto pb-10"
            >
              {renderValueProps()}
              
              <div className="mt-8 flex justify-end">
                <button
                    onClick={handleNext}
                    className="bg-[#4ecdc4] hover:bg-[#45b7af] text-[#162a30] px-8 py-3 rounded-full text-lg font-bold transition-all shadow-lg flex items-center gap-2"
                >
                    Proceed to Referral Form <Check className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: PATIENT INFO */}
          {step === 2 && (
            <motion.div
              key="patient-info"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-lg my-auto pb-20"
            >
              <h2 className="text-3xl font-serif text-foreground mb-2">Patient Information</h2>
              <p className="text-muted-foreground mb-8 text-sm">Please tell us about the patient you are referring.</p>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs text-muted-foreground">First Name *</label>
                            <input
                                type="text"
                                className="w-full bg-card/80 border border-border rounded-lg p-3 text-foreground focus:border-[#4ecdc4] focus:outline-none focus:ring-1 focus:ring-[#4ecdc4]"
                                value={formData.patientFirstName}
                                onChange={(e) => updateForm("patientFirstName", e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-muted-foreground">Last Name *</label>
                            <input
                                type="text"
                                className="w-full bg-card/80 border border-border rounded-lg p-3 text-foreground focus:border-[#4ecdc4] focus:outline-none focus:ring-1 focus:ring-[#4ecdc4]"
                                value={formData.patientLastName}
                                onChange={(e) => updateForm("patientLastName", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Email *</label>
                        <input
                            type="email"
                            className="w-full bg-card/80 border border-border rounded-lg p-3 text-foreground focus:border-[#4ecdc4] focus:outline-none focus:ring-1 focus:ring-[#4ecdc4]"
                            value={formData.patientEmail}
                            onChange={(e) => updateForm("patientEmail", e.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Phone Number *</label>
                        <input
                            type="tel"
                            className="w-full bg-card/80 border border-border rounded-lg p-3 text-foreground focus:border-[#4ecdc4] focus:outline-none focus:ring-1 focus:ring-[#4ecdc4]"
                             value={formData.patientPhone}
                             onChange={(e) => updateForm("patientPhone", formatPhone(e.target.value))}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Preferred Location *</label>
                         <div className="flex gap-4 pt-1">
                            {locationOptions.map((loc) => (
                                <label key={loc} className="flex items-center gap-2 cursor-pointer bg-card/50 px-4 py-2 rounded-lg border border-border hover:border-[#4ecdc4] transition-colors">
                                    <input
                                        type="radio"
                                        name="location"
                                        value={loc}
                                        checked={formData.preferredLocation === loc}
                                        onChange={(e) => updateForm("preferredLocation", e.target.value)}
                                        className="text-[#4ecdc4] focus:ring-[#4ecdc4] accent-[#4ecdc4]"
                                    />
                                    <span className="text-sm text-foreground">{loc}</span>
                                </label>
                            ))}
                         </div>
                    </div>
                </div>

               <div className="mt-8 flex justify-end">
                <button
                    onClick={handleNext}
                    className="bg-[#4ecdc4] hover:bg-[#45b7af] text-[#162a30] px-10 py-4 rounded-full text-lg font-medium transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 w-full justify-center md:w-auto"
                >
                    Next Step <ChevronLeft className="w-5 h-5 rotate-180" />
                </button>
              </div>

            </motion.div>
          )}

          {/* STEP 3: DOCTOR INFO */}
          {step === 3 && (
            <motion.div
              key="doctor-info"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-lg my-auto pb-20"
            >
              <h2 className="text-3xl font-serif text-foreground mb-2">My Information</h2>
              <p className="text-muted-foreground mb-8 text-sm">Please provide your details as the referring doctor.</p>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs text-muted-foreground">First Name *</label>
                            <input
                                type="text"
                                className="w-full bg-card/80 border border-border rounded-lg p-3 text-foreground focus:border-[#4ecdc4] focus:outline-none focus:ring-1 focus:ring-[#4ecdc4]"
                                value={formData.doctorFirstName}
                                onChange={(e) => updateForm("doctorFirstName", e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-muted-foreground">Last Name *</label>
                            <input
                                type="text"
                                className="w-full bg-card/80 border border-border rounded-lg p-3 text-foreground focus:border-[#4ecdc4] focus:outline-none focus:ring-1 focus:ring-[#4ecdc4]"
                                value={formData.doctorLastName}
                                onChange={(e) => updateForm("doctorLastName", e.target.value)}
                            />
                        </div>
                    </div>
                </div>

               <div className="mt-8 flex justify-end">
                <button
                    onClick={handleNext}
                    className="bg-[#4ecdc4] hover:bg-[#45b7af] text-[#162a30] px-10 py-4 rounded-full text-lg font-medium transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 w-full justify-center md:w-auto"
                >
                    Next Step <ChevronLeft className="w-5 h-5 rotate-180" />
                </button>
              </div>

            </motion.div>
          )}


          {/* STEP 4: CLINICAL INFO */}
          {step === 4 && (
            <motion.div
              key="clinical-info"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-lg my-auto pb-20"
            >
              <h2 className="text-3xl font-serif text-foreground mb-2">Clinical Details</h2>
              <p className="text-muted-foreground mb-8 text-sm">Additional information to help us prepare.</p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs text-muted-foreground">Reason for Referral *</label>
                        <select
                            className="w-full bg-card/80 border border-border rounded-lg p-3 text-foreground focus:border-[#4ecdc4] focus:outline-none focus:ring-1 focus:ring-[#4ecdc4]"
                            value={formData.referralReason}
                            onChange={(e) => updateForm("referralReason", e.target.value)}
                        >
                            <option value="">Select a reason</option>
                            {reasonOptions.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                     <div className="space-y-2">
                        <label className="text-xs text-muted-foreground">Referral Comments</label>
                        <textarea
                            className="w-full bg-card/80 border border-border rounded-lg p-3 text-foreground focus:border-[#4ecdc4] focus:outline-none focus:ring-1 focus:ring-[#4ecdc4] min-h-[100px]"
                            value={formData.comments}
                            onChange={(e) => updateForm("comments", e.target.value)}
                        />
                    </div>
                     <div className="space-y-2">
                         <label className="text-xs text-muted-foreground">Recent X-Rays</label>
                         <div className="grid gap-2 pt-1">
                            {xRayOptions.map((opt) => (
                                <label key={opt} className="flex items-center gap-2 cursor-pointer bg-card/50 px-4 py-2 rounded-lg border border-border hover:border-[#4ecdc4] transition-colors">
                                    <input
                                        type="radio"
                                        name="xrays"
                                        value={opt}
                                        checked={formData.xRays === opt}
                                        onChange={(e) => updateForm("xRays", e.target.value)}
                                        className="text-[#4ecdc4] focus:ring-[#4ecdc4] accent-[#4ecdc4]"
                                    />
                                    <span className="text-sm text-foreground">{opt}</span>
                                </label>
                            ))}
                         </div>
                    </div>
                 </div>

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

               <div className="mt-8 flex justify-end">
                <button
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="bg-[#4ecdc4] hover:bg-[#45b7af] text-[#162a30] px-10 py-4 rounded-full text-lg font-medium transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 w-full justify-center md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-[#162a30] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>Submit Referral <Check className="w-5 h-5"/></>
                    )}
                </button>
              </div>

            </motion.div>
          )}

           {/* STEP 5: SUCCESS */}
           {step === 5 && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center text-center gap-6 w-full max-w-lg my-auto"
            >
                <div className="w-20 h-20 rounded-full bg-[#4ecdc4]/20 flex items-center justify-center mb-4">
                    <Check className="w-10 h-10 text-[#4ecdc4]" />
                </div>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground">
                Thank You!
              </h2>
              <p className="text-lg text-muted-foreground">
                We have received your referral. Our team will contact the patient promptly to schedule their consultation.
              </p>
                <button
                onClick={() => window.location.href = "/"}
                className="mt-8 text-[#4ecdc4] hover:text-[#45b7af] font-medium underline underline-offset-4"
              >
                Return to Home
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}
