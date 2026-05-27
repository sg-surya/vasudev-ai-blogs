"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/data/posts";

const categoryIcons: Record<string, string> = {
  "Artificial Intelligence": "🤖",
  "Developer Tools": "🛠️",
  "Open Source": "🌐",
  Tutorial: "📘",
  Automation: "⚡",
  Hardware: "💻",
  News: "📰",
};

export function CategoryPills({ posts }: { posts: Post[] }) {
  const categories = Array.from(new Set(posts.map((p) => p.category)));
  const counts: Record<string, number> = {};
  for (const p of posts) {
    counts[p.category] = (counts[p.category] || 0) + 1;
  }

  return (
    <section aria-label="Article Categories">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground font-sans">
          Browse by Topic
        </h2>
        <Link
          href="/categories"
          className="text-xs font-medium text-teal hover:text-teal/80 transition-colors inline-flex items-center gap-1"
        >
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map((cat, i) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + i * 0.05 }}
          >
            <Link
              href={`/categories?q=${encodeURIComponent(cat)}`}
              className="group flex items-center gap-2 px-4 py-2.5 rounded-full border border-border bg-background/50 hover:bg-teal hover:text-white hover:border-teal transition-all whitespace-nowrap text-sm font-medium"
            >
              <span className="text-base">{categoryIcons[cat] || "📄"}</span>
              <span>{cat}</span>
              <span className="text-[10px] font-mono opacity-60 group-hover:opacity-100">
                ({counts[cat]})
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
