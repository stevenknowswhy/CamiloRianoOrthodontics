"use client";

import { Navigation } from "@/components/Navigation";
import Image from "next/image";
import { ContactFlow } from "@/components/ContactFlow";

export default function ContactPage() {
  return (
    <main className="h-screen w-full relative flex flex-col overflow-hidden">
      <Navigation />
      
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
    </main>
  );
}
