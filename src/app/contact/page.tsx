"use client";

import { useState } from "react";
import Image from "next/image";
import { ContactFlow } from "@/components/ContactFlow";
import { ContactModule } from "@/components/ContactModule";
import { ContactFooter } from "@/components/ContactFooter";

export default function ContactPage() {
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  return (
    <main className="h-screen w-full relative flex flex-col overflow-hidden">
      
      {/* Background Image Container */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/FamilyPark.png"
          alt="Family Park Background"
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Reusable Contact Flow */}
      <ContactFlow />

      {/* Contact Footer with Location, Phone, Direct Message */}
      <ContactFooter 
        onOpenMessage={() => setIsMessageOpen(true)} 
        location="sf"
      />

      {/* Contact Module (no floating button, controlled by footer) */}
      <ContactModule 
        isOpen={isMessageOpen}
        onOpenChange={setIsMessageOpen}
        showFloatingButton={false}
        defaultLocation="sf"
      />
    </main>
  );
}
