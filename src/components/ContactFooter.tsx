"use client";

import { MapPin, Phone, MessageCircle } from "lucide-react";

interface ContactFooterProps {
  onOpenMessage: () => void;
  location?: "sf" | "sonoma";
}

export function ContactFooter({ onOpenMessage, location = "sf" }: ContactFooterProps) {
  // Location URLs for Google Maps
  const locationUrls = {
    sf: {
      address: "77 Van Ness Ave #303, San Francisco, CA 94102",
      mapsUrl: "https://maps.google.com/?q=77+Van+Ness+Ave+%23303,+San+Francisco,+CA+94102",
      phone: "(415) 874-1677",
      phoneLink: "tel:+14158741677"
    },
    sonoma: {
      address: "699 5th St W, Sonoma, CA 95476",
      mapsUrl: "https://maps.google.com/?q=699+5th+St+W,+Sonoma,+CA+95476",
      phone: "(707) 935-6878",
      phoneLink: "tel:+17079356878"
    }
  };

  const loc = locationUrls[location];

  return (
    <footer className="absolute bottom-0 left-0 right-0 z-40">
      <div className="max-w-4xl mx-auto px-6 pb-8">
        <div className="flex items-center justify-center gap-8 md:gap-16">
          {/* Location Link */}
          <a
            href={loc.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2 text-white/80 hover:text-[#4ecdc4] transition-colors"
          >
            <div className="w-10 h-10 rounded-full border border-white/20 group-hover:border-[#4ecdc4] flex items-center justify-center transition-colors">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="text-xs tracking-wide uppercase">Location</span>
          </a>

          {/* Phone Link */}
          <a
            href={loc.phoneLink}
            className="group flex flex-col items-center gap-2 text-white/80 hover:text-[#4ecdc4] transition-colors"
          >
            <div className="w-10 h-10 rounded-full border border-white/20 group-hover:border-[#4ecdc4] flex items-center justify-center transition-colors">
              <Phone className="w-4 h-4" />
            </div>
            <span className="text-xs tracking-wide uppercase">Phone</span>
          </a>

          {/* Direct Message Link */}
          <button
            onClick={onOpenMessage}
            className="group flex flex-col items-center gap-2 text-white/80 hover:text-[#4ecdc4] transition-colors"
          >
            <div className="w-10 h-10 rounded-full border border-white/20 group-hover:border-[#4ecdc4] flex items-center justify-center transition-colors">
              <MessageCircle className="w-4 h-4" />
            </div>
            <span className="text-xs tracking-wide uppercase">Direct Message</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
