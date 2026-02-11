"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, MessageCircle, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { submitContactForm } from "@/lib/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Location = "sf" | "sonoma";

interface ContactModuleProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  showFloatingButton?: boolean;
  defaultLocation?: Location;
}

export function ContactModule({ 
  isOpen: controlledIsOpen, 
  onOpenChange, 
  showFloatingButton = true,
  defaultLocation = "sf"
}: ContactModuleProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen ?? internalIsOpen;
  const setIsOpen = (open: boolean) => {
    setInternalIsOpen(open);
    onOpenChange?.(open);
  };
  const [activeTab, setActiveTab] = useState<Location>(defaultLocation);
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Address & Map Details
  const locations = {
    sf: {
      name: "San Francisco",
      address: "77 Van Ness Ave #303, San Francisco, CA 94102",
      phone: "(415) 874-1677",
      email: "info@docrianos.com",
      mapUrl: "https://maps.google.com/maps?q=77%20Van%20Ness%20Ave%20%23303%2C%20San%20Francisco%2C%20CA%2094102&t=&z=15&ie=UTF8&iwloc=&output=embed",
      hours: [
        { day: "Monday", time: "8:00 AM - 5:00 PM" },
        { day: "Tuesday", time: "8:00 AM - 5:00 PM" },
        { day: "Wednesday", time: "9:00 AM - 6:00 PM" },
        { day: "Thursday", time: "8:00 AM - 5:00 PM" },
        { day: "Friday", time: "7:15 AM - 3:30 PM" },
        { day: "Saturday", time: "Closed" },
        { day: "Sunday", time: "Closed" },
      ]
    },
    sonoma: {
      name: "Sonoma",
      address: "699 5th St W, Sonoma, CA 95476",
      phone: "(707) 935-6878",
      email: "infosonoma@docrianos.com",
      mapUrl: "https://maps.google.com/maps?q=699%205th%20St%20W%2C%20Sonoma%2C%20CA%2095476&t=&z=15&ie=UTF8&iwloc=&output=embed",
      hours: [
        { day: "Monday", time: "Closed" },
        { day: "Tuesday", time: "9:00 AM - 6:00 PM" },
        { day: "Wednesday", time: "Closed" },
        { day: "Thursday", time: "9:00 AM - 6:00 PM" },
        { day: "Friday", time: "9:00 AM - 6:00 PM" },
        { day: "Saturday", time: "8:00 AM - 5:00 PM" },
        { day: "Sunday", time: "Closed" },
      ]
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    const result = await submitContactForm({
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      message: formState.message,
      location: activeTab === 'sf' ? 'san-francisco' : 'sonoma',
    });
    
    setIsSubmitting(false);
    
    if (result.success) {
      setIsSuccess(true);
      // Reset after showing success
      setTimeout(() => {
        setIsOpen(false);
        setIsSuccess(false);
        setFormState({ name: "", phone: "", email: "", message: "" });
      }, 2000);
    } else {
      setSubmitError(result.error || 'Failed to send message. Please try again.');
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {showFloatingButton && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-[#4ecdc4] text-[#162a30] p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#45b7af] transition-colors"
        >
          <MessageCircle className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" />
        </motion.button>
      )}

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-hidden"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="fixed left-0 right-0 bottom-0 md:left-auto md:right-8 md:bottom-8 md:w-[450px] md:rounded-3xl rounded-t-3xl bg-card border border-border shadow-2xl z-50 overflow-hidden flex flex-col max-h-[85vh] md:max-h-[800px]"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border bg-card sticky top-0 z-10">
                <h3 className="text-xl font-medium text-foreground font-serif">Contact Us</h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Accordion Content */}
              <div className="overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent bg-card">
                <Accordion type="single" collapsible className="w-full space-y-2" defaultValue="location">
                  
                  {/* Section 1: Location */}
                  <AccordionItem value="location" className="border-border">
                    <AccordionTrigger className="text-foreground hover:text-[#4ecdc4] hover:no-underline">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-muted rounded-lg text-[#4ecdc4]">
                           <MapPin className="w-4 h-4" />
                         </div>
                         <span>Location</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        {/* Tabs */}
                        <div className="flex p-1 bg-muted rounded-lg">
                          {(["sf", "sonoma"] as const).map((loc) => (
                            <button
                              key={loc}
                              onClick={() => setActiveTab(loc)}
                              className={cn(
                                "flex-1 py-2 text-xs font-medium rounded-md transition-all duration-300",
                                activeTab === loc 
                                  ? "bg-[#4ecdc4] text-[#162a30] shadow-md" 
                                  : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                              )}
                            >
                              {locations[loc].name}
                            </button>
                          ))}
                        </div>

                        {/* Address Display */}
                        <div className="p-4 bg-muted/50 rounded-xl border border-border">
                           <p className="text-foreground/90 text-sm leading-relaxed text-center">
                             {locations[activeTab].address}
                           </p>
                        </div>

                        {/* Map Embed */}
                        <div className="w-full h-48 rounded-xl overflow-hidden border border-border shadow-inner bg-muted">
                          <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight={0}
                            marginWidth={0}
                            src={locations[activeTab].mapUrl}
                            className="filter grayscale-20 contrast-[1.1] opacity-90 hover:opacity-100 transition-opacity"
                          ></iframe>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Section 2: Send Message */}
                  <AccordionItem value="message" className="border-border">
                    <AccordionTrigger className="text-foreground hover:text-[#4ecdc4] hover:no-underline">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-muted rounded-lg text-[#4ecdc4]">
                           <MessageCircle className="w-4 h-4" />
                         </div>
                         <span>Send Message</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-2">
                        {isSuccess ? (
                           <motion.div 
                             initial={{ opacity: 0, scale: 0.9 }}
                             animate={{ opacity: 1, scale: 1 }}
                             className="bg-[#4ecdc4]/10 border border-[#4ecdc4]/30 rounded-xl p-6 text-center"
                           >
                             <div className="w-12 h-12 bg-[#4ecdc4] rounded-full flex items-center justify-center mx-auto mb-3">
                               <Check className="w-6 h-6 text-[#162a30]" />
                             </div>
                             <p className="text-foreground font-medium">Message Sent!</p>
                             <p className="text-muted-foreground text-sm mt-1">We&apos;ll get back to you shortly.</p>
                           </motion.div>
                         ) : (
                           <form onSubmit={handleSubmit} className="space-y-3">
                             <div className="grid grid-cols-2 gap-3">
                               <input
                                 type="text"
                                 placeholder="Name"
                                 required
                                 value={formState.name}
                                 onChange={e => setFormState({...formState, name: e.target.value})}
                                 className="bg-muted border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder-muted-foreground/70 focus:outline-none focus:border-[#4ecdc4] focus:ring-1 focus:ring-[#4ecdc4] transition-all w-full"
                               />
                               <input
                                 type="tel"
                                 placeholder="Phone"
                                 required
                                 value={formState.phone}
                                 onChange={e => setFormState({...formState, phone: e.target.value})}
                                 className="bg-muted border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder-muted-foreground/70 focus:outline-none focus:border-[#4ecdc4] focus:ring-1 focus:ring-[#4ecdc4] transition-all w-full"
                               />
                             </div>
                             <input
                               type="email"
                               placeholder="Email"
                               required
                               value={formState.email}
                               onChange={e => setFormState({...formState, email: e.target.value})}
                               className="bg-muted border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder-muted-foreground/70 focus:outline-none focus:border-[#4ecdc4] focus:ring-1 focus:ring-[#4ecdc4] transition-all w-full"
                             />
                             <textarea
                               placeholder="How can we help?"
                               required
                               rows={3}
                               value={formState.message}
                               onChange={e => setFormState({...formState, message: e.target.value})}
                               className="bg-muted border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder-muted-foreground/70 focus:outline-none focus:border-[#4ecdc4] focus:ring-1 focus:ring-[#4ecdc4] transition-all w-full resize-none"
                             />
                             
                             {submitError && (
                               <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                                 {submitError}
                               </div>
                             )}
                             
                             <button
                               type="submit"
                               disabled={isSubmitting}
                               className="w-full bg-[#4ecdc4] hover:bg-[#45b7af] text-[#162a30] font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                             >
                               {isSubmitting ? (
                                 <span className="w-5 h-5 border-2 border-[#162a30] border-t-transparent rounded-full animate-spin" />
                               ) : (
                                 "Send Message"
                               )}
                             </button>
                           </form>
                         )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Section 3: Call */}
                  <AccordionItem value="call" className="border-border">
                    <AccordionTrigger className="text-foreground hover:text-[#4ecdc4] hover:no-underline">
                       <div className="flex items-center gap-3">
                         <div className="p-2 bg-muted rounded-lg text-[#4ecdc4]">
                           <Phone className="w-4 h-4" />
                         </div>
                         <span>Call</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-2">
                        {(["sf", "sonoma"] as const).map((loc) => (
                           <a 
                             key={loc}
                             href={`tel:${locations[loc].phone.replace(/\D/g,'')}`}
                             className="flex items-center justify-between p-4 bg-muted/50 border border-border rounded-xl hover:bg-muted hover:border-[#4ecdc4]/50 transition-all group"
                           >
                             <div className="flex flex-col">
                               <span className="text-xs text-[#4ecdc4] uppercase font-bold tracking-wider mb-1">
                                 {locations[loc].name}
                               </span>
                               <span className="text-foreground text-lg font-light">
                                 {locations[loc].phone}
                               </span>
                             </div>
                             <div className="w-8 h-8 rounded-full bg-[#4ecdc4]/10 flex items-center justify-center group-hover:bg-[#4ecdc4] transition-colors">
                                <Phone className="w-4 h-4 text-[#4ecdc4] group-hover:text-[#162a30]" />
                             </div>
                           </a>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                </Accordion>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
