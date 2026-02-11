import { ReferralFlow } from "@/components/ReferralFlow";
import Image from "next/image";

export default function ReferralsPage() {

  return (
    <main className="h-screen w-full relative flex flex-col overflow-hidden bg-gradient-to-br from-[#4ecdc4] to-[#f0fff4] dark:from-[#0d1619] dark:to-[#162a30] md:bg-none">
      
      {/* Full Screen Background Image - Hidden on Mobile */}
      <div className="absolute inset-0 -z-20 hidden md:block">
        <Image
          src="/Referral.png"
          alt="Referral Background"
          fill
          className="object-cover object-left"
          priority
          quality={100}
        />
        {/* Optional: Dark mode overlay if needed, similar to virtual-care */}
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
      </div>

       {/* Mobile Gradient Overlay (Visible only on mobile) */}
       <div className="absolute inset-0 z-[-15] md:hidden bg-gradient-to-b from-background/50 via-background/90 to-background" />

      <ReferralFlow />
    </main>
  );
}
