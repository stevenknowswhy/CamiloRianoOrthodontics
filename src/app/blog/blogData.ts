export interface BlogPost {
  slug: string;
  title: string;
  titleAccent?: string; // Word(s) to highlight in coral
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "your-smile-transformation-starts-here",
    title: "Your Smile Transformation Starts Here",
    titleAccent: "Transformation",
    excerpt:
      "Discover how modern orthodontics combines art and science to create confident, beautiful smiles — and why it's never too late to begin your journey.",
    category: "Patient Stories",
    image: "/images/blog/hero-smile.png",
    date: "February 8, 2026",
    readTime: "6 min read",
    featured: true,
  },
  {
    slug: "clear-braces-vs-traditional-which-is-right",
    title: "Clear Braces vs Traditional: Which Is Right for You?",
    titleAccent: "Clear Braces",
    excerpt:
      "A comprehensive comparison of ceramic clear braces and traditional metal braces — from aesthetics to treatment time and cost.",
    category: "Orthodontics",
    image: "/images/blog/clear-braces.png",
    date: "February 5, 2026",
    readTime: "5 min read",
  },
  {
    slug: "building-a-sustainable-orthodontic-practice",
    title: "Building a Sustainable Orthodontic Practice in San Francisco",
    titleAccent: "Sustainable",
    excerpt:
      "How our LEED-certified offices are reducing our environmental footprint while delivering world-class orthodontic care.",
    category: "Innovation",
    image: "/images/blog/eco-office.png",
    date: "January 30, 2026",
    readTime: "4 min read",
  },
  {
    slug: "teens-guide-to-braces",
    title: "A Teen's Guide to Getting Braces — What to Really Expect",
    titleAccent: "Teen's Guide",
    excerpt:
      "From your first consultation to getting them off — everything teens (and their parents) need to know about the braces journey.",
    category: "Patient Stories",
    image: "/images/blog/teen-braces.png",
    date: "January 25, 2026",
    readTime: "7 min read",
  },
  {
    slug: "invisible-aligners-revolution",
    title: "The Invisible Aligner Revolution: How Clear Aligners Are Changing Orthodontics",
    titleAccent: "Revolution",
    excerpt:
      "Clear aligners have transformed orthodontic treatment. Learn how this technology works and whether it's the right choice for your smile goals.",
    category: "Innovation",
    image: "/images/blog/aligners.png",
    date: "January 18, 2026",
    readTime: "5 min read",
  },
  {
    slug: "when-should-your-child-see-an-orthodontist",
    title: "When Should Your Child First See an Orthodontist?",
    titleAccent: "Child",
    excerpt:
      "The American Association of Orthodontists recommends an evaluation by age 7. Here's why early screening matters and what we look for.",
    category: "Oral Health",
    image: "/images/blog/family-ortho.png",
    date: "January 12, 2026",
    readTime: "4 min read",
  },
  {
    slug: "digital-orthodontics-3d-scanning",
    title: "Digital Orthodontics: How 3D Scanning Is Replacing Impressions",
    titleAccent: "3D Scanning",
    excerpt:
      "No more gooey molds. See how advanced intraoral scanners create precise digital models in minutes for more accurate, comfortable treatment planning.",
    category: "Innovation",
    image: "/images/blog/digital-scan.png",
    date: "January 5, 2026",
    readTime: "3 min read",
  },
  {
    slug: "smile-transformations-real-results",
    title: "Smile Transformations: Real Results from Real Patients",
    titleAccent: "Real Results",
    excerpt:
      "See the incredible before-and-after journeys of our patients and learn how orthodontic treatment can change more than just your teeth.",
    category: "Patient Stories",
    image: "/images/blog/transformation.png",
    date: "December 28, 2025",
    readTime: "6 min read",
  },
];

export const featuredPost = blogPosts.find((post) => post.featured)!;
export const gridPosts = blogPosts.filter((post) => !post.featured);
