import { VirtualCareFlow } from "@/components/VirtualCareFlow";
import Image from "next/image";

export default function VirtualCarePage() {

  return (
    <main className="h-screen w-full relative flex flex-col overflow-hidden bg-gradient-to-br from-[#4ecdc4] to-[#f0fff4] dark:from-[#0d1619] dark:to-[#162a30] md:bg-none">
      
      {/* Full Screen Background Image - Hidden on Mobile */}
      <div className="absolute inset-0 -z-20 hidden md:block">
        <Image
          src="/brendan-beale-5OadHMlhtD0-unsplash.jpg"
          alt="Virtual Care Background Light"
          fill
          className="object-cover object-left dark:hidden"
          priority
          quality={100}
        />
        <Image
          src="/VirualSmileDrk.png"
          alt="Virtual Care Background Dark"
          fill
          className="object-cover object-left hidden dark:block"
          priority
          quality={100}
        />
      </div>


      <VirtualCareFlow />
    </main>
  );
}
