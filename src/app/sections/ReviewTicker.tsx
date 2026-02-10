"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const reviews = [
  { name: "Ale A.", rating: 5, review: "Felt welcomed and cared for from the first visit. Dr. Riaño explained everything clearly." },
  { name: "Mark U.", rating: 5, review: "Dr. Riano is very thorough, answering ALL questions completely. Highly recommends him." },
  { name: "L J K.", rating: 5, review: "The best orthodontist in the city. Hands down. Dr Riano is very expert with kind demeanor." },
  { name: "Inhye K.", rating: 5, review: "Amazing experience since fall 2017. Staff always welcoming. Never charged for lost brackets." },
  { name: "Castellanos C.", rating: 5, review: "Team makes braces as pleasant as possible. Lingual braces - amazing and quick results!" },
  { name: "Nina G.", rating: 5, review: "Night & day difference from previous orthodontist. Office large, beautiful, bright." },
  { name: "Moe W.", rating: 5, review: "Entire team welcoming and friendly. Dr. Riano transparent and honest." },
  { name: "Zack G.", rating: 5, review: "Phenomenal team. Lingual braces - significant results within months. Six out of five stars!" },
  { name: "Miss H.", rating: 5, review: "Amazing staff and positive vibes. X-rays, exam, treatment plan all done in one visit." },
  { name: "Alexander D.", rating: 5, review: "Dr. Riaño able to straighten teeth without wisdom teeth removal. Delighted at results!" },
  { name: "Laura W.", rating: 5, review: "Dr Riano and staff super nice, easy to work with. Super efficient!" },
  { name: "Taylor R.", rating: 5, review: "Give 10 stars! Dr Riano best, easiest, most feel good and cheapest. Treatment only 12 weeks." },
  { name: "Mary M.", rating: 5, review: "Dr. Riano not satisfied with first treatment, gave second set at no additional fee." },
  { name: "Johny P.", rating: 5, review: "Staff support crazy schedules - Teresa and Angie always find time." },
  { name: "Jakub S.", rating: 5, review: "Dr Riano is a rockstar. Every visit a pleasure in modern, slick clinic." },
  { name: "Joseph B.", rating: 5, review: "Half the cost of other providers, twice the quality." },
  { name: "Monica L.", rating: 5, review: "Dr. Riaño goes above and beyond. 10/10 WOULD RECOMMEND!" },
  { name: "Hayate T.", rating: 5, review: "People who work there so kind. Beautiful building and can relax!" },
  { name: "Debora T.", rating: 5, review: "Whole crew awesome, always accommodating. Couldn't be happier with results." },
  { name: "Kaitlin B.", rating: 5, review: "Doctor actually listens! Patiently answers many questions." },
  { name: "Tricia H.", rating: 5, review: "Dr. Riano and team fantastic to work with. Office warm and welcoming, impeccably clean." },
  { name: "Travis L.", rating: 5, review: "Dr Riano fixed with no surgery in 18 months with incognito. Other orthodontist said needed jaw surgery." },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ name, rating, review }: { name: string; rating: number; review: string }) {
  return (
    <div className="shrink-0 bg-card rounded-xl px-5 py-3 shadow-sm border border-border flex items-center gap-4 min-w-[320px] max-w-[400px] hover:shadow-md transition-shadow">
      <div className="shrink-0">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-coral to-[#e8786a] flex items-center justify-center text-white font-medium text-sm">
          {name.charAt(0)}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-sm text-foreground">{name}</span>
          <StarRating rating={rating} />
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{review}</p>
      </div>
    </div>
  );
}

export function ReviewTicker() {
  const yelpUrl = "https://www.yelp.com/biz/camilo-ria%C3%B1o-orthodontics-san-francisco-9";
  
  // Double the reviews for seamless loop
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="pt-2 pb-4 bg-cream overflow-hidden">
      <Link 
        href={yelpUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-pointer"
      >
        <div className="relative">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-cream to-transparent z-10 pointer-events-none" />
          
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-cream to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling container */}
          <motion.div
            className="flex gap-4"
            animate={{
              x: [0, -50 * reviews.length * 8],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: reviews.length * 8,
                ease: "linear",
              },
            }}
          >
            {duplicatedReviews.map((review, index) => (
              <ReviewCard
                key={`${review.name}-${index}`}
                name={review.name}
                rating={review.rating}
                review={review.review}
              />
            ))}
          </motion.div>
        </div>
        
        {/* View all reviews CTA */}
        <div className="text-center mt-3">
          <span className="text-xs text-muted-foreground hover:text-coral transition-colors inline-flex items-center gap-1">
            View all reviews on Yelp
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </span>
        </div>
      </Link>
    </section>
  );
}
