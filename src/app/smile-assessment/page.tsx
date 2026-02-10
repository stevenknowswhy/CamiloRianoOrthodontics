"use client";

import Image from "next/image";
import { SmileAssessmentFlow } from "@/components/SmileAssessmentFlow";

export default function SmileAssessmentPage() {
  // Theme handling removed - image handles appearance for both modes via gradient
  
  return (
    <main className="h-screen w-full relative flex flex-col overflow-hidden bg-gradient-to-br from-[#4ecdc4]/20 to-background md:bg-none">
      
      {/* Full Screen Background Image - Hidden on Mobile */}
      <div className="absolute inset-0 -z-20 hidden md:block">
        <Image
          src="/images/SmileAssessment.png"
          alt="Smile Assessment Background"
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
      </div>

      {/* Mobile Gradient Overlay (Visible only on mobile) */}
      <div className="absolute inset-0 z-[-15] md:hidden bg-gradient-to-b from-background/50 via-background/90 to-background" />

      {/* Dark Gradient for Navigation Visibility */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent -z-10 pointer-events-none" />

      {/* Smile Assessment Flow */}
      <SmileAssessmentFlow />
    </main>
  );
}
