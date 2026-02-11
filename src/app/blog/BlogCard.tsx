"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlogPost } from "./blogData";

interface BlogCardProps {
  post: BlogPost;
  index: number;
  isWide?: boolean;
}

export function BlogCard({ post, index, isWide = false }: BlogCardProps) {
  const renderTitle = () => {
    if (!post.titleAccent) return post.title;
    const parts = post.title.split(post.titleAccent);
    return (
      <>
        {parts[0]}
        <span className="text-accent group-hover:text-accent transition-colors">
          {post.titleAccent}
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={isWide ? "col-span-1 md:col-span-2" : "col-span-1"}
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="blog-card rounded-2xl overflow-hidden bg-card transition-shadow duration-500">
          {/* Image Container */}
          <div
            className={`relative overflow-hidden ${
              isWide ? "aspect-[21/9]" : "aspect-[4/5]"
            }`}
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

            {/* Category pill - top left */}
            <div className="absolute top-4 left-4">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider border border-white/50 text-white bg-black/20 backdrop-blur-sm">
                {post.category}
              </span>
            </div>

            {/* Arrow CTA - bottom right */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/90 text-foreground backdrop-blur-sm">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6">
            {/* Title */}
            <h3
              className={`font-sans font-semibold text-foreground leading-tight mb-2 transition-colors duration-300 ${
                isWide
                  ? "text-xl sm:text-2xl md:text-3xl"
                  : "text-lg sm:text-xl"
              }`}
            >
              {renderTitle()}
            </h3>

            {/* Excerpt */}
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
              {post.excerpt}
            </p>

            {/* Meta */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
                <span>{post.date}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                <span>{post.readTime}</span>
              </div>

              {/* Inline arrow - always visible on mobile */}
              <div className="flex sm:hidden items-center justify-center w-8 h-8 rounded-full border border-border text-muted-foreground">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
