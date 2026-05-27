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

export function FeaturedGrid({ posts }: { posts: Post[] }) {
  const featured = posts.slice(0, 4);
  if (featured.length === 0) return null;

  const [big, ...small] = featured;

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      aria-label="Editor's pick articles"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-foreground">
          Editor&apos;s Pick
        </h2>
        <Link
          href="/articles"
          className="text-sm font-medium text-teal hover:text-teal/80 transition-colors hidden sm:inline-flex items-center gap-1"
        >
          View All <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Big feature card */}
        <motion.div variants={FADE_UP} className="lg:col-span-2 lg:row-span-2">
          <Link
            href={`/article/${big.slug}`}
            className="group block relative rounded-2xl overflow-hidden border border-border h-full min-h-[320px] md:min-h-[400px]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10" />
            <img
              src={big.coverImage}
              alt={big.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
              loading="lazy"
            />
            <div className="relative z-20 p-6 md:p-8 flex flex-col justify-end h-full">
              <span className="self-start px-3 py-1 text-[9px] font-bold tracking-[0.2em] uppercase bg-teal text-white rounded-full mb-3">
                {big.category}
              </span>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-white leading-tight group-hover:text-teal transition-colors">
                {big.title}
              </h3>
              <p className="text-sm text-white/70 mt-2 line-clamp-2 max-w-xl">
                {big.excerpt}
              </p>
              <div className="flex items-center gap-3 text-[10px] font-mono text-white/50 mt-3">
                <span>{format(new Date(big.date), "MMM d, yyyy")}</span>
                <span>•</span>
                <span>{big.readingTime}</span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Small cards */}
        {small.map((post) => (
          <motion.div key={post.id} variants={FADE_UP}>
            <Link
              href={`/article/${post.slug}`}
              className="group block relative rounded-2xl overflow-hidden border border-border h-full min-h-[200px] md:min-h-[190px]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <img
                src={post.coverImage}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
              />
              <div className="relative z-20 p-5 flex flex-col justify-end h-full">
                <span className="self-start px-2 py-0.5 text-[8px] font-bold tracking-[0.15em] uppercase bg-teal text-white rounded-full mb-2">
                  {post.category}
                </span>
                <h3 className="text-sm md:text-base font-bold text-white leading-snug group-hover:text-teal transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <span className="text-[9px] font-mono text-white/50 mt-2">
                  {post.readingTime}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
