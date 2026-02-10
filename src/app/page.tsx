import { Navigation } from "@/components/Navigation";
import { ParallaxSection } from "@/components/ParallaxSection";
import { Hero } from "./sections/Hero";
import { ReviewTicker } from "./sections/ReviewTicker";
import { WhyChoose } from "./sections/WhyChoose";
import { Services } from "./sections/Services";
import { Testimonials } from "./sections/Testimonials";
import { WhoWeServe } from "./sections/WhoWeServe";
import { Skills } from "./sections/Skills";
import { MeetFounder } from "./sections/MeetFounder";
import { FAQ } from "./sections/FAQ";
import { DesignAuditCTA } from "./sections/DesignAuditCTA";
import { StackableCards } from "./sections/StackableCards";
import { Footer } from "./sections/Footer";

export default function Home() {
  return (
    <main className="bg-background min-h-screen transition-colors duration-300">
      <Navigation />
      <Hero />
      <ReviewTicker />
      <StackableCards />
      <ParallaxSection>
        <WhyChoose />
      </ParallaxSection>
      <ParallaxSection>
        <Testimonials />
      </ParallaxSection>
      <ParallaxSection>
        <Services />
      </ParallaxSection>
      <ParallaxSection>
        <WhoWeServe />
      </ParallaxSection>
      <ParallaxSection>
        <Skills />
      </ParallaxSection>
      <ParallaxSection>
        <MeetFounder />
      </ParallaxSection>
      <ParallaxSection>
        <FAQ />
      </ParallaxSection>
      <ParallaxSection>
        <DesignAuditCTA />
      </ParallaxSection>
      <Footer />
    </main>
  );
}
