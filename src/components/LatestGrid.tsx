"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { format } from "date-fns";
import type { Post } from "@/data/posts";

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 18 } },
};

export function LatestGrid({ posts }: { posts: Post[] }) {
  const latest = posts.slice(0, 6);
  if (latest.length === 0) return null;

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      aria-label="Latest articles"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-foreground">
          Latest Articles
        </h2>
        <Link
          href="/articles"
          className="text-sm font-medium text-teal hover:text-teal/80 transition-colors hidden sm:inline-flex items-center gap-1"
        >
          Full Archive <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {latest.map((post) => (
          <motion.div key={post.id} variants={FADE_UP}>
            <Link
              href={`/article/${post.slug}`}
              className="group block rounded-2xl border border-border bg-background/50 hover:border-teal/30 hover:shadow-md transition-all overflow-hidden h-full"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5 flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-teal">
                    {post.category}
                  </span>
                  <span className="text-[9px] font-mono text-muted-foreground">
                    {post.readingTime}
                  </span>
                </div>
                <h3 className="text-base font-bold text-foreground group-hover:text-teal transition-colors leading-snug line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 mt-auto pt-3 text-[10px] font-mono text-muted-foreground border-t border-border/50">
                  <span>{format(new Date(post.date), "MMM d, yyyy")}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <img
                      src={post.author.avatar}
                      alt=""
                      className="w-4 h-4 rounded-full object-cover"
                    />
                    {post.author.name.split(" ")[0]}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
