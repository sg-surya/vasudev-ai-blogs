"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, BookOpen, Layers, Clock, Github } from "lucide-react";
import type { Post } from "@/data/posts";

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 18 } },
};

const STAGGER = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

function TypewriterText({ text }: { text: string }) {
  return (
    <span className="inline-block">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + i * 0.025, type: "spring", stiffness: 120 }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export function HeroSection({ featured }: { featured: Post }) {
  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={STAGGER}
      className="relative overflow-hidden rounded-[2.5rem] border border-border bg-gradient-to-br from-[#fcf9f2] via-[#f5f0e8] to-[#f0ece0] dark:from-card/40 dark:via-card/20 dark:to-background p-6 md:p-10 lg:p-12"
      aria-label="Featured article"
    >
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none" style={{
        backgroundImage: `
          radial-gradient(circle at 20% 50%, #4DB6AC 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, #CDBCF2 0%, transparent 50%),
          radial-gradient(circle at 50% 80%, #4DB6AC 0%, transparent 50%)
        `,
      }} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch relative z-10">
        {/* Left: Featured Post Card */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <motion.div variants={FADE_UP} className="flex items-center gap-3">
            <span className="px-3 py-1 text-[10px] font-bold tracking-[0.25em] uppercase bg-teal text-white rounded-full">
              Featured Story
            </span>
            <span className="text-[10px] font-mono text-muted-foreground tracking-tight">
              #{featured.id}
            </span>
          </motion.div>

          <motion.h1
            variants={FADE_UP}
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif font-black tracking-tight leading-[1.05] text-foreground"
          >
            <TypewriterText text="Where Code Meets" />
            <br />
            <span className="text-teal">
              <TypewriterText text="Consciousness" />
            </span>
          </motion.h1>

          <motion.p
            variants={FADE_UP}
            className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl"
          >
            Exploring Artificial Intelligence, Advanced Automation, and the bleeding edge of software engineering through the lens of ancient wisdom and modern innovation.
          </motion.p>

          <motion.div variants={FADE_UP} className="flex items-center gap-6 mt-2">
            <Link
              href={`/article/${featured.slug}`}
              className="group inline-flex items-center gap-3 bg-foreground text-background hover:bg-teal hover:text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-sm"
            >
              Read Featured Article
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/articles"
              className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Browse All
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>

          {/* Featured Post Preview Card */}
          <motion.div variants={FADE_UP}>
            <Link
              href={`/article/${featured.slug}`}
              className="group block mt-4 rounded-2xl border border-border/60 bg-background/60 backdrop-blur-sm overflow-hidden hover:border-teal/30 hover:shadow-md transition-all"
            >
              <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-0">
                <div className="aspect-[4/3] sm:aspect-auto overflow-hidden">
                  <img
                    src={featured.coverImage}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 flex flex-col justify-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-teal">
                    {featured.category}
                  </span>
                  <h2 className="text-lg font-bold text-foreground group-hover:text-teal transition-colors leading-snug line-clamp-2">
                    {featured.title}
                  </h2>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground mt-1">
                    <span>{featured.readingTime}</span>
                    <span>•</span>
                    <span>{featured.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Right: Stats + Quick Links */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Stats Grid */}
          <motion.div variants={FADE_UP} className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border/60 bg-background/50 backdrop-blur-sm p-5 flex flex-col gap-2">
              <BookOpen className="w-5 h-5 text-teal" />
              <span className="text-2xl font-bold font-serif text-foreground">41+</span>
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Articles Published</span>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/50 backdrop-blur-sm p-5 flex flex-col gap-2">
              <Layers className="w-5 h-5 text-lavender" />
              <span className="text-2xl font-bold font-serif text-foreground">8</span>
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Categories</span>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/50 backdrop-blur-sm p-5 flex flex-col gap-2">
              <Clock className="w-5 h-5 text-teal" />
              <span className="text-2xl font-bold font-serif text-foreground">350+</span>
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Minutes of Content</span>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/50 backdrop-blur-sm p-5 flex flex-col gap-2">
              <Github className="w-5 h-5 text-lavender" />
              <span className="text-2xl font-bold font-serif text-foreground">OSS</span>
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Open Source Ethos</span>
            </div>
          </motion.div>

          {/* Author Spotlight */}
          <motion.div variants={FADE_UP} className="rounded-2xl border border-border/60 bg-background/50 backdrop-blur-sm p-5 flex-1 flex flex-col justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={featured.author.avatar}
                alt={featured.author.name}
                className="w-12 h-12 rounded-full border-2 border-teal/30 object-cover"
                loading="lazy"
              />
              <div>
                <p className="font-semibold text-foreground text-sm">{featured.author.name}</p>
                <p className="text-xs text-muted-foreground">{featured.author.role}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Exploring AI, developer tools, and open-source. Building the future one article at a time.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-teal hover:text-teal/80 transition-colors"
            >
              About the Author <ArrowRight className="w-3 h-3" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
