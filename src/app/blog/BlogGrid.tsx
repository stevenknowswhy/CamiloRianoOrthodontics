"use client";

import { BlogPost } from "./blogData";
import { BlogCard } from "./BlogCard";

interface BlogGridProps {
  posts: BlogPost[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  return (
    <section className="px-4 sm:px-6 lg:px-8 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {posts.map((post, index) => {
            // Every 5th card (index 4, 9, ...) spans full width for rhythm variation
            const isWide = (index + 1) % 5 === 0;
            return (
              <BlogCard
                key={post.slug}
                post={post}
                index={index}
                isWide={isWide}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
