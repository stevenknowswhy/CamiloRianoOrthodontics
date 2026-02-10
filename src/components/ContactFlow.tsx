"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft } from "lucide-react";

export function ContactFlow() {
  // steps: 
  // 0: Welcome
  // 1: Location
  // 2: Topic
  // 3: Date (Appt)
  // 4: Time (Appt)
  // 5: Confirmation (Appt)
  // 6: Contact Form (Billing/Other)
  // 7: Confirmation (Billing/Other)
  const [step, setStep] = useState(0);
  
  // Selection State
  const [location, setLocation] = useState<string | null>(null);
  const [topic, setTopic] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  
  // Contact Form State
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: ""
  });

  const locationOptions = [
    { id: "A", label: "San Francisco" },
    { id: "B", label: "Sonoma" },
    { id: "C", label: "Doesn't matter" },
  ];

  const topicOptions = [
    { id: "A", label: "Appointments" },
    { id: "B", label: "Billing" },
    { id: "C", label: "Other" },
  ];

  const dateOptions = [
    { id: "A", label: "Earliest Available" },
    { id: "B", label: "Monday" },
    { id: "C", label: "Tuesday" },
    { id: "D", label: "Wednesday" },
    { id: "E", label: "Thursday" },
    { id: "F", label: "Friday" },
  ];

  const timeOptions = [
    { id: "A", label: "10:00 AM" },
    { id: "B", label: "11:00 AM" },
    { id: "C", label: "12:00 PM" },
    { id: "D", label: "1:00 PM" },
    { id: "E", label: "2:00 PM" },
    { id: "F", label: "3:00 PM" },
    { id: "G", label: "4:00 PM" },
    { id: "H", label: "5:00 PM" },
  ];

  const handleNext = () => {
    // Location Selection
    if (step === 1 && location) {
      setStep(2);
      return;
    }

    // Topic Selection & Branching
    if (step === 2 && topic) {
      if (topic === "A") { // Appointments
        setStep(3);
      } else { // Billing or Other
        setStep(6);
      }
      return;
    }

    // Appointment Flow: Date -> Time -> Confirm
    if (step === 3 && date) {
      setStep(4);
      return;
    }
    if (step === 4 && time) {
      setStep(5);
      return;
    }
    if (step === 5) {
      // Final Submit Appointment
      console.log("Appointment Submitted:", { location, topic, date, time });
      alert("Appointment Request Received! We'll be in touch.");
      // potential reset or success screen
      return;
    }

    // Billing/Other Flow: Form -> Confirm -> Submit
    if (step === 6) {
       // Validate core fields if needed
       if (!contactInfo.email || !contactInfo.message) {
         alert("Please fill in at least your email and message.");
         return;
       }
       setStep(7);
       return;
    }

    if (step === 7) {
       console.log("Inquiry Submitted:", { location, topic, contactInfo });
       alert("Inquiry Sent! We'll be in touch.");
       return;
    }
  };

  const handleBack = () => {
    // Welcome -> Exit (Do nothing or reset?)
    if (step === 0) return;

    // Location -> Welcome
    if (step === 1) {
      setStep(0);
      return;
    }

    // Topic -> Location
    if (step === 2) {
      setStep(1);
      return;
    }

    // Appt Date -> Topic
    if (step === 3) {
      setStep(2);
      return;
    }

    // Appt Time -> Date
    if (step === 4) {
      setStep(3);
      return;
    }

    // Appt Confirm -> Time
    if (step === 5) {
      setStep(4);
      return;
    }

    // Contact Form -> Topic
    if (step === 6) {
      setStep(2);
      return;
    }

    // Contact Confirm -> Form
    if (step === 7) {
      setStep(6);
      return;
    }
  };

  // Render Helper for Options
  const renderOptions = (options: {id: string, label: string}[], selectedValue: string | null, setValue: (id: string) => void) => (
    <div className="space-y-3">
      {options.map((option) => {
        const isSelected = selectedValue === option.id;
        return (
          <button
            key={option.id}
            onClick={() => setValue(option.id)}
            className={`w-full text-left p-4 rounded-xl border flex items-center gap-4 transition-all duration-200 group relative overflow-hidden
              ${isSelected
                ? "bg-[#4ecdc4]/20 border-[#4ecdc4]" 
                : "bg-white/10 border-white/20 hover:bg-white/20"
              }`}
          >
            <span 
              className={`flex items-center justify-center w-6 h-6 rounded border text-xs font-medium transition-colors
                ${isSelected
                  ? "bg-[#4ecdc4] text-[#162a30] border-[#4ecdc4]"
                  : "bg-transparent text-white border-white/40 group-hover:border-white"
                }`}
            >
              {option.id}
            </span>
            <span className="text-lg md:text-xl text-white font-light">{option.label}</span>
            {isSelected && (
              <Check className="ml-auto w-5 h-5 text-[#4ecdc4]" />
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <section className="grow flex flex-col items-center justify-start pt-32 pb-20 px-4 text-center text-white relative z-10 w-full max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.div 
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-6 mt-10 md:mt-20 w-full"
            >
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-wide drop-shadow-md"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                <span className="block text-2xl md:text-3xl mb-4 font-sans font-normal">👋🏽 Welcome</span>
                Let&apos;s get you to the right place the first time.
              </h1>

              <p className="text-lg md:text-xl text-white/90 max-w-2xl mt-4 font-light drop-shadow-sm">
                In order for our team to give you the best service please fill this short form.
              </p>

              <button 
                onClick={() => setStep(1)}
                className="mt-8 bg-[#4ecdc4] hover:bg-[#45b7af] text-[#162a30] px-10 py-4 rounded-full text-lg font-medium transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                Lets Start
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-2xl mt-6 md:mt-12 text-left h-full overflow-y-auto pb-20 scrollbar-hide"
            >
              <button 
                onClick={handleBack}
                className="mb-8 flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium uppercase tracking-wider">Back</span>
              </button>

              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-2 flex items-start gap-3">
                  <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-sm bg-[#4ecdc4] text-[#162a30] text-sm font-bold mt-1">
                    {step <= 2 ? step : step - 1}
                  </span>
                  
                  {step === 1 && "Where would you like to be seen?"}
                  {step === 2 && "What can we help you with?"}
                  {step === 3 && "Preferred day?"}
                  {step === 4 && "Preferred time?"}
                  {step === 5 && "Please confirm your request"}
                  {step === 6 && (topic === "B" ? "Billing Inquiry" : "Other Inquiry")}
                  {step === 7 && "Please confirm your details"}
                  
                  <span className="text-[#4ecdc4]">*</span>
                </h2>
              </div>

              {/* Step 1: Location */}
              {step === 1 && renderOptions(locationOptions, location, setLocation)}

              {/* Step 2: Topic */}
              {step === 2 && renderOptions(topicOptions, topic, setTopic)}

              {/* Step 3: Date (Appointments) */}
              {step === 3 && renderOptions(dateOptions, date, setDate)}

              {/* Step 4: Time (Appointments) */}
              {step === 4 && renderOptions(timeOptions, time, setTime)}

              {/* Step 5: Confirmation (Appointments) */}
              {step === 5 && (
                 <div className="bg-white/10 border border-white/20 p-8 rounded-2xl space-y-4 text-white">
                   <h3 className="text-xl font-serif mb-4">Summary</h3>
                   <div>
                     <span className="text-[#4ecdc4] text-sm uppercase tracking-wider block mb-1">Location</span>
                     <p className="text-xl">{locationOptions.find(o => o.id === location)?.label}</p>
                   </div>
                   <div>
                     <span className="text-[#4ecdc4] text-sm uppercase tracking-wider block mb-1">Topic</span>
                     <p className="text-xl">Appointments</p>
                   </div>
                   <div>
                     <span className="text-[#4ecdc4] text-sm uppercase tracking-wider block mb-1">Preferred Time</span>
                     <p className="text-xl">
                       {dateOptions.find(o => o.id === date)?.label} at {timeOptions.find(o => o.id === time)?.label}
                     </p>
                   </div>
                   <p className="text-white/60 text-sm mt-4 pt-4 border-t border-white/10">
                     We will review your request and get back to you shortly to confirm.
                   </p>
                 </div>
              )}

              {/* Step 6: Contact Form (Billing/Other) */}
              {step === 6 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm text-[#4ecdc4] uppercase tracking-wide">First Name</label>
                        <input 
                            type="text" 
                            className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/30 focus:border-[#4ecdc4] focus:outline-none focus:ring-1 focus:ring-[#4ecdc4]" 
                            placeholder="Jane"
                            value={contactInfo.firstName}
                            onChange={(e) => setContactInfo({...contactInfo, firstName: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-[#4ecdc4] uppercase tracking-wide">Last Name</label>
                        <input 
                            type="text" 
                            className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/30 focus:border-[#4ecdc4] focus:outline-none focus:ring-1 focus:ring-[#4ecdc4]" 
                            placeholder="Doe"
                            value={contactInfo.lastName}
                            onChange={(e) => setContactInfo({...contactInfo, lastName: e.target.value})}
                        />
                    </div>
                  </div>
                  <div className="space-y-2">
                      <label className="text-sm text-[#4ecdc4] uppercase tracking-wide">Email</label>
                      <input 
                          type="email" 
                          className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/30 focus:border-[#4ecdc4] focus:outline-none focus:ring-1 focus:ring-[#4ecdc4]" 
                          placeholder="jane@example.com"
                          value={contactInfo.email}
                          onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                      />
                  </div>
                  <div className="space-y-2">
                      <label className="text-sm text-[#4ecdc4] uppercase tracking-wide">Phone</label>
                      <input 
                          type="tel" 
                          className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/30 focus:border-[#4ecdc4] focus:outline-none focus:ring-1 focus:ring-[#4ecdc4]" 
                          placeholder="(555) 123-4567"
                          value={contactInfo.phone}
                          onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                      />
                  </div>
                  <div className="space-y-2">
                      <label className="text-sm text-[#4ecdc4] uppercase tracking-wide">
                        {topic === "B" ? "Billing Message" : "Message"}
                      </label>
                      <textarea 
                          rows={4} 
                          className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/30 focus:border-[#4ecdc4] focus:outline-none focus:ring-1 focus:ring-[#4ecdc4] resize-none" 
                          placeholder="How can we help you?"
                          value={contactInfo.message}
                          onChange={(e) => setContactInfo({...contactInfo, message: e.target.value})}
                      />
                  </div>
                </div>
              )}

              {/* Step 7: Confirmation (Billing/Other) */}
              {step === 7 && (
                 <div className="bg-white/10 border border-white/20 p-8 rounded-2xl space-y-4 text-white">
                   <h3 className="text-xl font-serif mb-4">Summary</h3>
                   <div>
                     <span className="text-[#4ecdc4] text-sm uppercase tracking-wider block mb-1">Location</span>
                     <p className="text-xl">{locationOptions.find(o => o.id === location)?.label}</p>
                   </div>
                   <div>
                     <span className="text-[#4ecdc4] text-sm uppercase tracking-wider block mb-1">Topic</span>
                     <p className="text-xl">{topicOptions.find(o => o.id === topic)?.label}</p>
                   </div>
                   <div className="grid md:grid-cols-2 gap-4">
                     <div>
                       <span className="text-[#4ecdc4] text-sm uppercase tracking-wider block mb-1">Name</span>
                       <p className="text-lg">{contactInfo.firstName} {contactInfo.lastName}</p>
                     </div>
                     <div>
                       <span className="text-[#4ecdc4] text-sm uppercase tracking-wider block mb-1">Phone</span>
                       <p className="text-lg">{contactInfo.phone || "N/A"}</p>
                     </div>
                   </div>
                   <div>
                     <span className="text-[#4ecdc4] text-sm uppercase tracking-wider block mb-1">Email</span>
                     <p className="text-lg">{contactInfo.email}</p>
                   </div>
                   <div>
                     <span className="text-[#4ecdc4] text-sm uppercase tracking-wider block mb-1">Message</span>
                     <p className="bg-white/5 p-3 rounded-md text-sm">{contactInfo.message}</p>
                   </div>
                 </div>
              )}

              {/* Navigation Actions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 flex justify-start pb-8"
              >
                <div className="flex items-center gap-4">
                    <button 
                        className="bg-[#4ecdc4] hover:bg-[#45b7af] text-[#162a30] px-8 py-3 rounded-md text-lg font-bold transition-all shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleNext}
                        disabled={
                            (step === 1 && !location) ||
                            (step === 2 && !topic) ||
                            (step === 3 && !date) ||
                            (step === 4 && !time)
                        }
                    >
                        {step === 5 || step === 7 ? "Submit" : "Next"} <Check className="w-4 h-4 ml-1" />
                    </button>
                    <p className="hidden md:flex items-center text-xs text-white/50">
                        press <strong className="mx-1">Enter ↵</strong>
                    </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    </section>
  );
}
