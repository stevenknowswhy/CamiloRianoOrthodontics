import type { Metadata } from "next";
import { BlogHero } from "./BlogHero";
import { BlogGrid } from "./BlogGrid";
import { BlogPageHeader } from "./BlogPageHeader";
import { Footer } from "../sections/Footer";
import { featuredPost, gridPosts } from "./blogData";

export const metadata: Metadata = {
  title: "Blog | Camilo Riaño Orthodontics",
  description:
    "Insights, patient stories, and expert advice on orthodontic care from Dr. Camilo Riaño in San Francisco & Sonoma.",
};

export default function BlogPage() {
  return (
    <main className="bg-background min-h-screen transition-colors duration-300">
      {/* Page Header */}
      <BlogPageHeader />

      {/* Featured Post */}
      <BlogHero post={featuredPost} />

      {/* Blog Grid */}
      <BlogGrid posts={gridPosts} />

      {/* Footer */}
      <Footer />
    </main>
  );
}
