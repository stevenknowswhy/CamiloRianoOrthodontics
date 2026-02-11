"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { submitVirtualCare } from "@/lib/api";

export function VirtualCareFlow() {
  // Steps:
  // 0: Intro (Hero text)
  // 1: How it Works ("Get Expert Feedback")
  // 2: Patient Type Selection ("Existing" vs "New")
  // 3: Form (Content depends on patientType)
  const [step, setStep] = useState(0);
  const [patientType, setPatientType] = useState<'existing' | 'new' | null>(null);
  
  // Form State
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phone: "",
    email: "",
    concerns: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    // New fields
    message: "", // For existing patients
    insurance: "", // "yes" | "no"
    privacyConsent: false,
    marketingConsent: false,
  });

  // Format phone number
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length === 0) return "";
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      setSubmitError('Please fill in all required fields.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    const result = await submitVirtualCare({
      patientType: patientType || 'new',
      firstName: contactInfo.firstName,
      lastName: contactInfo.lastName,
      email: contactInfo.email,
      phone: contactInfo.phone,
      age: contactInfo.age,
      address: contactInfo.address,
      address2: contactInfo.address2,
      city: contactInfo.city,
      state: contactInfo.state,
      zip: contactInfo.zip,
      insurance: contactInfo.insurance,
      concerns: contactInfo.concerns,
      message: contactInfo.message,
      privacyConsent: contactInfo.privacyConsent,
      marketingConsent: contactInfo.marketingConsent,
    });
    
    setIsSubmitting(false);
    
    if (result.success) {
      setIsSuccess(true);
    } else {
      setSubmitError(result.error || 'Failed to submit. Please try again.');
    }
  };

  const isFormValid = () => {
    if (patientType === 'existing') {
       return (
        contactInfo.firstName &&
        contactInfo.lastName &&
        contactInfo.phone &&
        contactInfo.message
      );
    }
    // New patient validation (to be expanded)
    return (
      contactInfo.firstName &&
      contactInfo.lastName &&
      contactInfo.age &&
      contactInfo.phone &&
      contactInfo.email &&
      contactInfo.concerns &&
      contactInfo.address &&
      contactInfo.city &&
      contactInfo.state &&
      contactInfo.zip
    );
  };

  const handleBack = () => {
    if (step === 0) return;
    setStep(step - 1);
  };

  const handlePatientTypeSelect = (type: 'existing' | 'new') => {
    setPatientType(type);
    setStep(3); // Logically step 3, but content differs
  };

  // Reusable styles
  const inputClass = "w-full bg-background/50 dark:bg-black/20 border border-border/50 dark:border-white/20 rounded-lg p-3 text-foreground dark:text-white placeholder:text-muted-foreground/70 focus:border-[#4ecdc4] focus:outline-none focus:ring-1 focus:ring-[#4ecdc4] backdrop-blur-sm transition-all";
  const btnClass = "w-full mt-6 bg-[#4ecdc4] hover:bg-[#45b7af] text-[#162a30] px-8 py-3 rounded-full text-lg font-bold transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <section className="grow flex flex-col items-end justify-center pt-32 pb-20 px-4 md:px-12 lg:px-20 text-left text-foreground relative z-10 w-full h-full overflow-y-auto no-scrollbar">
      <AnimatePresence mode="wait">
          
          {/* Step 0: Intro */}
          {step === 0 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-start gap-8 w-full max-w-2xl my-auto"
            >
              {/* Mobile Header Image */}
              <div className="w-full relative h-[250px] rounded-2xl overflow-hidden mb-4 md:hidden shadow-lg">
                 <Image
                  src="/brendan-beale-5OadHMlhtD0-unsplash.jpg"
                  alt="Virtual Care"
                  fill
                  className="object-cover object-center dark:hidden"
                />
                <Image
                  src="/VirualSmileDrk.png"
                  alt="Virtual Care"
                  fill
                  className="object-cover object-top hidden dark:block"
                />
              </div>

              <div>
                <h2 className="text-[#4ecdc4] font-medium tracking-wider uppercase text-sm mb-4">
                  Virtual Care
                </h2>
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-wide drop-shadow-md text-foreground dark:text-white mb-6"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Expert Orthodontics, From Anywhere
                </h1>
                <p className="text-lg text-muted-foreground dark:text-white/90 leading-relaxed max-w-xl font-light">
                  Busy schedule? Traveling often? Or just want fewer trips to the orthodontist? 
                  Stay on track with your Invisalign or braces treatment through our Virtual Care program, 
                  without the need for frequent visits. Using a simple mobile app, Dr. Riano can monitor 
                  your smile remotely through scans and photos you send from home.
                </p>
                <p className="text-lg text-muted-foreground dark:text-white/90 leading-relaxed mt-4 font-light">
                  It’s the modern, flexible way to get the care you need, wherever you are.
                </p>
              </div>

              <button
                onClick={() => setStep(1)}
                className="bg-[#4ecdc4] hover:bg-[#45b7af] text-[#162a30] px-10 py-4 rounded-full text-lg font-medium transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                Start Form
              </button>
            </motion.div>
          )}

          {/* Wrappers for Steps 1+ */}
          {step > 0 && (
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-xl mt-6 md:mt-12 text-left"
            >
               <button
                onClick={handleBack}
                className="mb-8 flex items-center gap-2 text-muted-foreground/80 dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium uppercase tracking-wider">
                  Back
                </span>
              </button>

              {/* Step 1: How it Works */}
              {step === 1 && (
                <div className="w-full">
                  <h3 className="text-3xl font-light text-foreground dark:text-white mb-8">Get Expert Feedback</h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                       <h4 className="text-sm font-bold text-[#4ecdc4] uppercase tracking-wider mb-2">How does it work?</h4>
                       <p className="text-sm text-muted-foreground dark:text-white/80 mb-6">
                        Our simple four-step process lets you begin orthodontic care remotely while staying connected to your orthodontist.
                      </p>
                    </div>
                    
                    <div className="space-y-8">
                      {[
                        "Our care team will review your application to ensure a remote consultation & treatment with the orthodontist is the best option for you.",
                        "You'll be invited to download the Grin App to set up your account. Send us a selfie to get started before your Grin Scope arrives.",
                        "We'll ship* you a Grin Scope, a phone attachment that we use to get an in-depth look at your teeth throughout treatment. *5–7 business days.",
                        "We'll review your scan and provide a treatment plan specific for you. Once you're ready, we'll get you smiling confidently!"
                      ].map((text, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="shrink-0 w-10 h-10 rounded-full bg-[#4ecdc4]/10 dark:bg-[#4ecdc4]/20 flex items-center justify-center text-[#4ecdc4] font-bold border border-[#4ecdc4]/30">
                            0{i + 1}
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground dark:text-white/90 leading-relaxed font-light">
                              {text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      className="mt-8 bg-[#4ecdc4] hover:bg-[#45b7af] text-[#162a30] px-8 py-3 rounded-full text-lg font-bold transition-all shadow-lg flex items-center justify-center gap-2 mx-auto md:mx-0 w-full md:w-auto"
                    >
                      Next Step
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Patient Type Selection */}
              {step === 2 && (
                 <>
                  <div className="mb-10 block">
                    <h2 className="text-3xl md:text-4xl font-light text-foreground dark:text-white mb-4">
                      Let&apos;s Get Started
                    </h2>
                    <p className="text-muted-foreground dark:text-white/70">
                      Are you a new or existing patient?
                    </p>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={() => handlePatientTypeSelect('new')}
                      className="w-full text-left p-6 rounded-xl border flex items-center gap-4 transition-all duration-200 group bg-card/60 dark:bg-white/10 border-border/50 dark:border-white/20 hover:bg-card hover:dark:bg-white/20 hover:shadow-lg backdrop-blur-sm"
                    >
                      <div className="shrink-0 w-12 h-12 rounded-full bg-[#4ecdc4]/20 flex items-center justify-center text-[#4ecdc4] border border-[#4ecdc4]/30">
                        <ArrowRight className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-foreground dark:text-white">I&apos;d like to start my journey</h3>
                      </div>
                    </button>

                    <button
                      onClick={() => handlePatientTypeSelect('existing')}
                       className="w-full text-left p-6 rounded-xl border flex items-center gap-4 transition-all duration-200 group bg-card/60 dark:bg-white/10 border-border/50 dark:border-white/20 hover:bg-card hover:dark:bg-white/20 hover:shadow-lg backdrop-blur-sm"
                    >
                       <div className="shrink-0 w-12 h-12 rounded-full bg-[#4ecdc4]/20 flex items-center justify-center text-[#4ecdc4] border border-[#4ecdc4]/30">
                        <Check className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-foreground dark:text-white">I am an Existing Patient</h3>
                        <p className="text-sm text-muted-foreground dark:text-white/60">I&apos;m already in treatment</p>
                      </div>
                    </button>
                  </div>
                </>
              )}

              {/* Step 3+: Forms */}
              {step >= 3 && (
                <>
                   {step === 3 && patientType === 'existing' && (
                     <>
                      <div className="mb-8">
                        <h2 className="text-3xl md:text-4xl font-light text-foreground dark:text-white mb-4">
                          Welcome Back
                        </h2>
                        <p className="text-muted-foreground dark:text-white/70">
                          Please enter your contact details.
                        </p>
                      </div>
                      <form onSubmit={(e) => { e.preventDefault(); setStep(10); }} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                             <label className="text-xs text-[#4ecdc4] uppercase tracking-wide">First Name</label>
                             <input
                              required
                              className={inputClass}
                              value={contactInfo.firstName}
                              onChange={(e) => setContactInfo({...contactInfo, firstName: e.target.value})}
                            />
                          </div>
                           <div className="space-y-2">
                             <label className="text-xs text-[#4ecdc4] uppercase tracking-wide">Last Name</label>
                             <input
                              required
                              className={inputClass}
                              value={contactInfo.lastName}
                              onChange={(e) => setContactInfo({...contactInfo, lastName: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs text-[#4ecdc4] uppercase tracking-wide">Phone Number</label>
                           <input
                            required
                            type="tel"
                            className={inputClass}
                            value={contactInfo.phone}
                            onChange={(e) => setContactInfo({...contactInfo, phone: formatPhone(e.target.value)})}
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={!contactInfo.firstName || !contactInfo.lastName || !contactInfo.phone}
                          className={btnClass}
                        >
                          Next <ArrowRight className="w-4 h-4" />
                        </button>
                      </form>
                     </>
                   )}

                   {step === 10 && patientType === 'existing' && (
                     <>
                      <div className="mb-8">
                        <h2 className="text-3xl md:text-4xl font-light text-foreground dark:text-white mb-4">
                          How can we help?
                        </h2>
                        <p className="text-muted-foreground dark:text-white/70">
                          Leave your message and we will get back to you shortly.
                        </p>
                      </div>
                      <form onSubmit={handleSubmit} className="space-y-4">
                         <div className="space-y-2">
                           <label className="text-xs text-[#4ecdc4] uppercase tracking-wide">Message</label>
                           <textarea
                            required
                            rows={5}
                            className={inputClass}
                            value={contactInfo.message}
                            onChange={(e) => setContactInfo({...contactInfo, message: e.target.value})}
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={!isFormValid()}
                          className={btnClass}
                        >
                          Submit
                          <Check className="w-4 h-4" />
                        </button>
                      </form>
                     </>
                   )}

                   {/* New Patient Steps */}
                   {patientType === 'new' && (
                     <>
                        {step === 3 && (
                          <div className="space-y-6">
                            <div className="mb-4">
                               <h2 className="text-3xl md:text-4xl font-light text-foreground dark:text-white mb-2">Let&apos;s Get Started</h2>
                               <p className="text-muted-foreground dark:text-white/70">Tell us a bit about yourself.</p>
                            </div>
                            <form onSubmit={(e) => { e.preventDefault(); setStep(4); }} className="space-y-4">
                               <div className="grid grid-cols-2 gap-4">
                                 <div className="space-y-2">
                                    <label className="text-xs text-[#4ecdc4] uppercase tracking-wide">First Name</label>
                                    <input required className={inputClass} value={contactInfo.firstName} onChange={e => setContactInfo({...contactInfo, firstName: e.target.value})} />
                                 </div>
                                  <div className="space-y-2">
                                    <label className="text-xs text-[#4ecdc4] uppercase tracking-wide">Last Name</label>
                                    <input required className={inputClass} value={contactInfo.lastName} onChange={e => setContactInfo({...contactInfo, lastName: e.target.value})} />
                                 </div>
                               </div>
                               <button type="submit" disabled={!contactInfo.firstName || !contactInfo.lastName} className={btnClass}>Next <ArrowRight className="w-4 h-4" /></button>
                            </form>
                          </div>
                        )}

                        {step === 4 && (
                           <div className="space-y-6">
                             <div className="mb-4">
                               <h2 className="text-3xl md:text-4xl font-light text-foreground dark:text-white mb-2">How young are you?</h2>
                            </div>
                            <form onSubmit={(e) => { e.preventDefault(); setStep(5); }} className="space-y-4">
                               <div className="space-y-2">
                                  <label className="text-xs text-[#4ecdc4] uppercase tracking-wide">Age</label>
                                  <input required type="number" className={inputClass} value={contactInfo.age} onChange={e => setContactInfo({...contactInfo, age: e.target.value})} />
                               </div>
                               <button type="submit" disabled={!contactInfo.age} className={btnClass}>Next <ArrowRight className="w-4 h-4" /></button>
                            </form>
                           </div>
                        )}

                        {step === 5 && (
                           <div className="space-y-6">
                            <div className="mb-4">
                               <h2 className="text-3xl md:text-4xl font-light text-foreground dark:text-white mb-2">How can we reach you?</h2>
                            </div>
                            <form onSubmit={(e) => { e.preventDefault(); setStep(6); }} className="space-y-4">
                               <div className="space-y-2">
                                  <label className="text-xs text-[#4ecdc4] uppercase tracking-wide">Phone</label>
                                  <input required type="tel" className={inputClass} value={contactInfo.phone} onChange={e => setContactInfo({...contactInfo, phone: formatPhone(e.target.value)})} />
                               </div>
                                <div className="space-y-2">
                                  <label className="text-xs text-[#4ecdc4] uppercase tracking-wide">Email</label>
                                  <input required type="email" className={inputClass} value={contactInfo.email} onChange={e => setContactInfo({...contactInfo, email: e.target.value})} />
                               </div>
                               <button type="submit" disabled={!contactInfo.phone || !contactInfo.email} className={btnClass}>Next <ArrowRight className="w-4 h-4" /></button>
                            </form>
                           </div>
                        )}

                        {step === 6 && (
                          <div className="space-y-6">
                             <div className="mb-4">
                               <h2 className="text-3xl md:text-4xl font-light text-foreground dark:text-white mb-2">Where are you located?</h2>
                            </div>
                            <form onSubmit={(e) => { e.preventDefault(); setStep(7); }} className="space-y-4">
                               <div className="space-y-2">
                                  <label className="text-xs text-[#4ecdc4] uppercase tracking-wide">Address</label>
                                  <input required className={inputClass} value={contactInfo.address} onChange={e => setContactInfo({...contactInfo, address: e.target.value})} />
                               </div>
                               <div className="space-y-2">
                                  <label className="text-xs text-[#4ecdc4] uppercase tracking-wide">Address 2</label>
                                  <input className={inputClass} value={contactInfo.address2} onChange={e => setContactInfo({...contactInfo, address2: e.target.value})} />
                               </div>
                               <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label className="text-xs text-[#4ecdc4] uppercase tracking-wide">City</label>
                                    <input required className={inputClass} value={contactInfo.city} onChange={e => setContactInfo({...contactInfo, city: e.target.value})} />
                                 </div>
                                  <div className="space-y-2">
                                    <label className="text-xs text-[#4ecdc4] uppercase tracking-wide">State</label>
                                    <select required className={`${inputClass} appearance-none`} value={contactInfo.state} onChange={e => setContactInfo({...contactInfo, state: e.target.value})}>
                                      <option value="" className="text-foreground dark:text-black">Select</option>
                                      <option value="CA" className="text-foreground dark:text-black">CA</option>
                                    </select>
                                 </div>
                               </div>
                                <div className="space-y-2">
                                  <label className="text-xs text-[#4ecdc4] uppercase tracking-wide">Zip</label>
                                  <input required className={inputClass} value={contactInfo.zip} onChange={e => setContactInfo({...contactInfo, zip: e.target.value})} />
                                </div>
                               <button type="submit" disabled={!contactInfo.address || !contactInfo.city || !contactInfo.zip} className={btnClass}>Next <ArrowRight className="w-4 h-4" /></button>
                            </form>
                          </div>
                        )}

                        {step === 7 && (
                          <div className="space-y-6">
                             <div className="mb-4">
                               <h2 className="text-3xl md:text-4xl font-light text-foreground dark:text-white mb-2">Do you have dental insurance?</h2>
                            </div>
                            <div className="space-y-4">
                              {['yes', 'no'].map(opt => (
                                <button key={opt} onClick={() => { setContactInfo({...contactInfo, insurance: opt}); setStep(8); }}
                                className={`w-full text-left p-6 rounded-xl border flex items-center gap-4 transition-all duration-200 group backdrop-blur-sm ${contactInfo.insurance === opt? 'bg-[#4ecdc4]/20 border-[#4ecdc4]' : 'bg-card/60 dark:bg-white/10 border-border/50 dark:border-white/20 hover:bg-card hover:dark:bg-white/20'}`}>
                                  <div className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center ${contactInfo.insurance === opt ? 'border-[#4ecdc4] bg-[#4ecdc4] text-[#162a30]' : 'border-border dark:border-white/40'}`}>
                                    {contactInfo.insurance === opt && <Check className="w-4 h-4" />}
                                  </div>
                                  <span className="text-lg text-foreground dark:text-white capitalize">{opt}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {step === 8 && (
                           <div className="space-y-6">
                             <div className="mb-4">
                               <h2 className="text-3xl md:text-4xl font-light text-foreground dark:text-white mb-2">Almost there!</h2>
                               <p className="text-muted-foreground dark:text-white/70">Main concerns and consent.</p>
                            </div>
                             <form onSubmit={(e) => { e.preventDefault(); setStep(9); }} className="space-y-6">
                                <div className="space-y-2">
                                  <label className="text-xs text-[#4ecdc4] uppercase tracking-wide">Concerns</label>
                                  <textarea required rows={3} className={`${inputClass} resize-none`} value={contactInfo.concerns} onChange={e => setContactInfo({...contactInfo, concerns: e.target.value})} />
                               </div>
                               <div className="space-y-4">
                                 <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors ${contactInfo.privacyConsent ? 'bg-[#4ecdc4] border-[#4ecdc4]' : 'border-border dark:border-white/40 group-hover:border-foreground dark:group-hover:border-white'}`}>
                                      <input type="checkbox" className="hidden" checked={contactInfo.privacyConsent} onChange={e => setContactInfo({...contactInfo, privacyConsent: e.target.checked})} />
                                      {contactInfo.privacyConsent && <Check className="w-3 h-3 text-[#162a30]" />}
                                    </div>
                                    <span className="text-sm text-muted-foreground dark:text-white/80">I have read and approve the <a href="#" className="underline hover:text-[#4ecdc4]">Privacy Policy</a> (Required)</span>
                                 </label>
                                  <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors ${contactInfo.marketingConsent ? 'bg-[#4ecdc4] border-[#4ecdc4]' : 'border-border dark:border-white/40 group-hover:border-foreground dark:group-hover:border-white'}`}>
                                      <input type="checkbox" className="hidden" checked={contactInfo.marketingConsent} onChange={e => setContactInfo({...contactInfo, marketingConsent: e.target.checked})} />
                                      {contactInfo.marketingConsent && <Check className="w-3 h-3 text-[#162a30]" />}
                                    </div>
                                    <span className="text-sm text-muted-foreground dark:text-white/80">I agree to receive information by email or SMS.</span>
                                 </label>
                               </div>
                               <button type="submit" disabled={!contactInfo.concerns || !contactInfo.privacyConsent} className={btnClass}>Review Summary <ArrowRight className="w-4 h-4" /></button>
                             </form>
                           </div>
                        )}

                        {step === 9 && (
                           <div className="space-y-6">
                             <div className="mb-4">
                               <h2 className="text-3xl md:text-4xl font-light text-foreground dark:text-white mb-2">Summary</h2>
                               <p className="text-muted-foreground dark:text-white/70">Please review your information.</p>
                            </div>
                            <div className="bg-card/50 dark:bg-white/10 rounded-xl p-6 border border-border/50 dark:border-white/20 space-y-4 text-sm text-foreground dark:text-white backdrop-blur-sm">
                               <div className="grid grid-cols-2 gap-4">
                                  <div><span className="text-muted-foreground dark:text-white/50 block text-xs uppercase">Name</span><span className="font-medium">{contactInfo.firstName} {contactInfo.lastName}</span></div>
                                  <div><span className="text-muted-foreground dark:text-white/50 block text-xs uppercase">Age</span><span className="font-medium">{contactInfo.age}</span></div>
                               </div>
                               <div className="grid grid-cols-2 gap-4">
                                  <div><span className="text-muted-foreground dark:text-white/50 block text-xs uppercase">Phone</span><span className="font-medium">{contactInfo.phone}</span></div>
                                  <div><span className="text-muted-foreground dark:text-white/50 block text-xs uppercase">Email</span><span className="font-medium">{contactInfo.email}</span></div>
                               </div>
                               <div><span className="text-muted-foreground dark:text-white/50 block text-xs uppercase">Address</span><span className="font-medium">{contactInfo.address} {contactInfo.address2}, {contactInfo.city} {contactInfo.state} {contactInfo.zip}</span></div>
                               <div><span className="text-muted-foreground dark:text-white/50 block text-xs uppercase">Insurance</span><span className="font-medium capitalize">{contactInfo.insurance}</span></div>
                               <div><span className="text-muted-foreground dark:text-white/50 block text-xs uppercase">Concerns</span><span className="font-medium">{contactInfo.concerns}</span></div>
                            </div>
                            {/* Error Message */}
                            {submitError && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-foreground dark:text-white"
                              >
                                {submitError}
                              </motion.div>
                            )}
                            
                            {/* Success Message */}
                            {isSuccess && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-8 bg-[#4ecdc4]/20 border border-[#4ecdc4]/50 rounded-2xl text-center"
                              >
                                <div className="w-16 h-16 bg-[#4ecdc4] rounded-full flex items-center justify-center mx-auto mb-4">
                                  <Check className="w-8 h-8 text-[#162a30]" />
                                </div>
                                <h3 className="text-2xl font-serif mb-2 text-foreground dark:text-white">Thank You!</h3>
                                <p className="text-muted-foreground dark:text-white/80">Your virtual care request has been submitted. We&apos;ll be in touch shortly.</p>
                              </motion.div>
                            )}
                            
                            {!isSuccess && (
                              <button onClick={handleSubmit} disabled={isSubmitting} className={`${btnClass} disabled:opacity-50 disabled:cursor-not-allowed`}>
                                {isSubmitting ? (
                                  <span className="w-5 h-5 border-2 border-[#162a30] border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <>Submit <Check className="w-4 h-4" /></>
                                )}
                              </button>
                            )}
                           </div>
                        )}
                     </>
                   )}
                </>
              )}
            </motion.div>
          )}
      </AnimatePresence>
    </section>
  );
}
