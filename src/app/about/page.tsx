import { Navigation } from "@/components/Navigation";
import { Footer } from "../sections/Footer";
import { AboutContent } from "./AboutContent";

export const metadata = {
  title: "About Us | Camilo Riaño Orthodontics",
  description:
    "Learn about Dr. Riaño and the team at Camilo Riaño Orthodontics. Calm, personal orthodontic care in San Francisco and Sonoma.",
};

export default function AboutPage() {
  return (
    <main className="bg-background min-h-screen transition-colors duration-300">
      <Navigation />
      <AboutContent />
      <Footer />
    </main>
  );
}
