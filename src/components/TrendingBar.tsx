"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { TrendingUp, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import type { Post } from "@/data/posts";

export function TrendingBar({ posts }: { posts: Post[] }) {
  const trending = posts.slice(0, 5);
  if (trending.length === 0) return null;

  return (
    <section aria-label="Trending articles" className="relative">
      <div className="flex items-center gap-2 mb-5">
        <TrendingUp className="w-4 h-4 text-teal" />
        <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground font-sans">
          Trending Now
        </h2>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        {trending.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="shrink-0 w-[260px] sm:w-[280px]"
          >
            <Link
              href={`/article/${post.slug}`}
              className="group block rounded-2xl border border-border bg-background/50 hover:border-teal/30 hover:shadow-sm transition-all overflow-hidden"
            >
              <div className="aspect-[16/9] overflow-hidden relative">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 text-[8px] font-bold tracking-[0.15em] uppercase bg-foreground/80 backdrop-blur-sm text-background rounded-full">
                    #{i + 1}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <span className="text-[9px] font-semibold uppercase tracking-wider text-teal">
                  {post.category}
                </span>
                <h3 className="text-sm font-bold text-foreground group-hover:text-teal transition-colors line-clamp-2 mt-1 leading-snug">
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 text-[9px] font-mono text-muted-foreground mt-2">
                  <span>{format(new Date(post.date), "MMM d")}</span>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}

        <Link
          href="/articles"
          className="shrink-0 w-[100px] flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border hover:border-teal/50 hover:bg-muted/30 transition-all text-muted-foreground hover:text-teal group"
        >
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          <span className="text-[10px] font-medium">View All</span>
        </Link>
      </div>
    </section>
  );
}
