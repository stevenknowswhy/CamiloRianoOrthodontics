"use client";

import Image from "next/image";
import { ContactFlow } from "@/components/ContactFlow";
import { ContactModule } from "@/components/ContactModule";

export default function SonomaContactPage() {
  return (
    <main className="h-screen w-full relative flex flex-col overflow-hidden">
      
      {/* Background Image Container */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/SonomaCheeseFactory.png"
          alt="Sonoma Cheese Factory Background"
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
      <ContactModule />
    </main>
  );
}
