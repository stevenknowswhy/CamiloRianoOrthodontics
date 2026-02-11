"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlogPost } from "./blogData";

interface BlogHeroProps {
  post: BlogPost;
}

export function BlogHero({ post }: BlogHeroProps) {
  // Split title to highlight accent word
  const renderTitle = () => {
    if (!post.titleAccent) return post.title;
    const parts = post.title.split(post.titleAccent);
    return (
      <>
        {parts[0]}
        <span className="text-accent">{post.titleAccent}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="px-4 sm:px-6 lg:px-8 pt-32 pb-8"
    >
      <Link href={`/blog/${post.slug}`} className="block group">
        <div className="relative max-w-7xl mx-auto rounded-2xl overflow-hidden bg-card blog-hero-card">
          {/* Image */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </div>

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12 lg:p-16">
            {/* Category pill */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-block px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider border border-white/40 text-white/90 mb-4"
            >
              {post.category}
            </motion.span>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-[1.05] mb-4 max-w-4xl"
            >
              {renderTitle()}
            </motion.h1>

            {/* Meta + Arrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-end justify-between"
            >
              <div>
                <p className="text-white/70 text-sm md:text-base mb-2 max-w-2xl leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 text-xs text-white/50 uppercase tracking-wider">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Arrow CTA */}
              <div className="hidden sm:flex items-center justify-center w-14 h-14 rounded-full border border-white/30 text-white group-hover:bg-white group-hover:text-foreground transition-all duration-300 shrink-0 ml-8">
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.section>
  );
}
