"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { posts, categories } from "@/data/posts";
import { format } from "date-fns";

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
};

const STAGGER_CHILDREN_ANIMATION = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  // Extract and map specific articles to perfect-fit structural slots of the magazine layout
  const heroPost = posts.find((p) => p.id === "1") || posts[0]; // "How to Build an Offline AI Assistant Using LM Studio"
  
  // Right-hand 3 side-stories
  const sideStory1 = posts.find((p) => p.id === "2") || posts[1]; // "Running AI Completely Offline"
  const sideStory2 = posts.find((p) => p.id === "3") || posts[2]; // "Phi-3 vs Llama 3"
  const sideStory3 = posts.find((p) => p.id === "4") || posts[3]; // "Android Performance Optimization Guide"

  // Most popular list (Left column of the lower section)
  const popularPosts = [
    posts.find((p) => p.id === "5") || posts[4], // "Best Android ROMs"
    posts.find((p) => p.id === "6") || posts[5], // "Debloat Windows"
    posts.find((p) => p.id === "7") || posts[6], // "Best Tools for Power Users"
    posts.find((p) => p.id === "8") || posts[7], // "Best AI Coding Tools"
    posts.find((p) => p.id === "9") || posts[8], // "Cursor vs Windsurf vs Replit"
  ];

  // Lower Center Feature Banner
  const centerBottomPost = posts.find((p) => p.id === "10") || posts[9]; // "Building AI Agents with Next.js"

  // Lower Right stacked cards
  const rightBottomCard1 = posts.find((p) => p.id === "11") || posts[10]; // "Local ChatGPT Clone"
  const rightBottomCard2 = posts.find((p) => p.id === "13") || posts[12]; // "How I Built Vasudev AI"

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 flex flex-col gap-12 font-sans selection:bg-teal selection:text-white">
      
      {/* 1. UPPER MAGAZINE CONTAINER (Hero Block) */}
      <motion.section
        className="w-full bg-[#fcf9f2] dark:bg-card/40 border border-border rounded-[2.5rem] p-6 md:p-10 lg:p-12 shadow-sm relative overflow-hidden"
        initial="hidden"
        animate="show"
        variants={STAGGER_CHILDREN_ANIMATION}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          {/* HERO LEFT COLUMN: Broad Title & Excerpt */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-10">
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-bold tracking-[0.3em] text-teal uppercase">
                FEATURED ANNOUNCEMENT
              </span>
              <h1 className="text-4xl md:text-[2.75rem] font-serif font-black tracking-tight leading-[1.05] text-foreground">
                Offline AI engines that will save code privacy.
              </h1>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-light">
                Of course, local hardware acceleration, quantized models, and private context storage are no longer concepts of tomorrow, but without strategic local optimization we now definitely cannot do.
              </p>
            </div>
            
            <div className="flex flex-col gap-6">
              <Link href={`/article/${heroPost.slug}`} className="group inline-flex items-center gap-3">
                <span className="text-sm font-bold tracking-tight text-foreground underline underline-offset-4 group-hover:text-teal transition-colors">
                  Explore article
                </span>
                <div className="w-10 h-10 rounded-full border border-foreground/30 flex items-center justify-center text-foreground group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-all">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                </div>
              </Link>

              {/* Author Badge matching the image */}
              <div className="flex items-center gap-3 border-t border-border pt-6 mt-4">
                <img 
                  src={heroPost.author.avatar} 
                  alt={heroPost.author.name} 
                  className="w-8 h-8 rounded-full border border-border object-cover"
                />
                <div className="text-xs">
                  <p className="font-bold text-foreground">by {heroPost.author.name}</p>
                  <p className="text-muted-foreground">{heroPost.author.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* HERO CENTER COLUMN: Editorial Portrait Image */}
          <div className="lg:col-span-5 relative min-h-[350px] lg:min-h-none rounded-3xl overflow-hidden bg-[#e9e3d7] dark:bg-muted/10 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop" 
              alt="AI Concept" 
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-1000 hover:scale-105"
            />
            {/* Elegant overlay badge */}
            <div className="absolute bottom-6 left-6 z-10">
              <span className="px-3 py-1.5 text-[9px] font-bold tracking-[0.2em] uppercase bg-black text-white hover:bg-teal rounded-full shadow-lg transition-colors">
                SYSTEM AGENT
              </span>
            </div>
          </div>

          {/* HERO RIGHT COLUMN: Stacked 3 side-stories (Mimicking reference image) */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-6 border-t lg:border-t-0 lg:border-l border-border pt-8 lg:pt-0 lg:pl-8">
            <h3 className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase mb-2">
              LATEST HIGHLIGHTS
            </h3>
            
            <div className="flex flex-col gap-6 flex-1 justify-between">
              {/* Story 1 */}
              <Link href={`/article/${sideStory1.slug}`} className="group grid grid-cols-[80px_1fr] gap-4 items-center">
                <div className="aspect-square rounded-xl overflow-hidden border border-border bg-muted">
                  <img src={sideStory1.coverImage} alt={sideStory1.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-bold leading-snug text-foreground group-hover:text-teal transition-colors line-clamp-2">
                    {sideStory1.title}
                  </h4>
                  <time className="text-[10px] text-muted-foreground tracking-tight font-mono">
                    {format(new Date(sideStory1.date), "dd.MM.yyyy")}
                  </time>
                </div>
              </Link>

              {/* Story 2 */}
              <Link href={`/article/${sideStory2.slug}`} className="group grid grid-cols-[80px_1fr] gap-4 items-center border-t border-border/80 pt-6">
                <div className="aspect-square rounded-xl overflow-hidden border border-border bg-muted">
                  <img src={sideStory2.coverImage} alt={sideStory2.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-bold leading-snug text-foreground group-hover:text-teal transition-colors line-clamp-2">
                    {sideStory2.title}
                  </h4>
                  <time className="text-[10px] text-muted-foreground tracking-tight font-mono">
                    {format(new Date(sideStory2.date), "dd.MM.yyyy")}
                  </time>
                </div>
              </Link>

              {/* Story 3 */}
              <Link href={`/article/${sideStory3.slug}`} className="group grid grid-cols-[80px_1fr] gap-4 items-center border-t border-border/80 pt-6">
                <div className="aspect-square rounded-xl overflow-hidden border border-border bg-muted">
                  <img src={sideStory3.coverImage} alt={sideStory3.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-bold leading-snug text-foreground group-hover:text-teal transition-colors line-clamp-2">
                    {sideStory3.title}
                  </h4>
                  <time className="text-[10px] text-muted-foreground tracking-tight font-mono">
                    {format(new Date(sideStory3.date), "dd.MM.yyyy")}
                  </time>
                </div>
              </Link>
            </div>
          </div>

        </div>
      </motion.section>

      {/* 2. LOWER EDITORIAL MAGAZINE GRID (Most Popular + Big Feature Photo + Stacked Column) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LOWER LEFT COLUMN: Most Popular Links */}
        <div className="lg:col-span-3 bg-[#fcf9f2] dark:bg-card/40 border border-border p-6 md:p-8 rounded-[2rem] flex flex-col justify-between gap-6 shadow-sm">
          <div>
            <h2 className="text-2xl font-serif font-black text-foreground tracking-tight mb-6 pb-2 border-b border-border">
              Most popular
            </h2>
            <div className="flex flex-col">
              {popularPosts.map((post, index) => (
                <Link 
                  key={post.id} 
                  href={`/article/${post.slug}`} 
                  className="group flex flex-col gap-1 py-4 border-b border-border last:border-0 hover:bg-muted/10 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-bold leading-snug text-foreground group-hover:text-teal transition-colors">
                      {post.title}
                    </h3>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground shrink-0 group-hover:text-teal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <time className="text-[10px] text-muted-foreground tracking-tight font-mono mt-1">
                    {format(new Date(post.date), "dd.MM.yyyy")}
                  </time>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Quick link to register / login / contact */}
          <Link href="/about" className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-teal transition-colors mt-4">
            Meet Surya Pratap Singh
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* LOWER CENTER COLUMN: High-Contrast Dynamic Graphic Card */}
        <div className="lg:col-span-6 bg-card border border-border rounded-[2rem] p-6 lg:p-10 flex flex-col justify-between gap-8 shadow-sm relative overflow-hidden group min-h-[450px]">
          {/* Dark Overlay for title contrasts */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 z-10 pointer-events-none" />
          <img 
            src={centerBottomPost.coverImage} 
            alt={centerBottomPost.title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" 
          />

          {/* Top Label */}
          <div className="absolute top-6 left-6 z-20">
            <span className="px-3 py-1.5 text-[9px] font-bold tracking-[0.2em] uppercase bg-white/90 backdrop-blur-md text-foreground rounded-md shadow-sm">
              {centerBottomPost.category}
            </span>
          </div>

          {/* Text and Actions */}
          <div className="mt-auto relative z-20 flex flex-col gap-4">
            <Link href={`/article/${centerBottomPost.slug}`} className="block">
              <h2 className="text-2xl md:text-3xl lg:text-[2.25rem] font-serif font-bold text-white tracking-tight leading-tight hover:text-teal transition-colors">
                {centerBottomPost.title}
              </h2>
            </Link>
            <p className="text-white/80 text-sm max-w-xl font-light line-clamp-2">
              {centerBottomPost.excerpt}
            </p>
            <div className="flex items-center gap-3 text-xs text-white/60 font-mono mt-2">
              <time>{format(new Date(centerBottomPost.date), "dd.MM.yyyy")}</time>
              <span>•</span>
              <span>{centerBottomPost.readingTime}</span>
            </div>
          </div>
        </div>

        {/* LOWER RIGHT COLUMN: Two Stacked Vertical Image Cards */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Stacked Card 1 */}
          <div className="flex-1 bg-card border border-border rounded-[2rem] p-6 flex flex-col justify-between relative overflow-hidden group min-h-[210px]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/2s to-black/10 z-10 pointer-events-none" />
            <img 
              src={rightBottomCard1.coverImage} 
              alt={rightBottomCard1.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
            />
            
            {/* Category badge */}
            <div className="absolute top-4 left-4 z-20">
              <span className="px-2.5 py-1 text-[8px] font-bold tracking-[0.15em] uppercase bg-black text-white rounded-md">
                {rightBottomCard1.category}
              </span>
            </div>

            {/* Title & meta */}
            <div className="mt-auto relative z-20 flex flex-col gap-2">
              <Link href={`/article/${rightBottomCard1.slug}`} className="block">
                <h3 className="text-base font-bold text-white leading-snug tracking-tight hover:text-teal transition-colors line-clamp-2">
                  {rightBottomCard1.title}
                </h3>
              </Link>
              <time className="text-[9px] text-white/60 tracking-tight font-mono">
                {format(new Date(rightBottomCard1.date), "dd.MM.yyyy")}
              </time>
            </div>
          </div>

          {/* Stacked Card 2 */}
          <div className="flex-1 bg-card border border-border rounded-[2rem] p-6 flex flex-col justify-between relative overflow-hidden group min-h-[210px]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/2s to-black/10 z-10 pointer-events-none" />
            <img 
              src={rightBottomCard2.coverImage} 
              alt={rightBottomCard2.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
            />
            
            {/* Category badge */}
            <div className="absolute top-4 left-4 z-20">
              <span className="px-2.5 py-1 text-[8px] font-bold tracking-[0.15em] uppercase bg-black text-white rounded-md">
                {rightBottomCard2.category}
              </span>
            </div>

            {/* Title & meta */}
            <div className="mt-auto relative z-20 flex flex-col gap-2">
              <Link href={`/article/${rightBottomCard2.slug}`} className="block">
                <h3 className="text-base font-bold text-white leading-snug tracking-tight hover:text-teal transition-colors line-clamp-2">
                  {rightBottomCard2.title}
                </h3>
              </Link>
              <time className="text-[9px] text-white/60 tracking-tight font-mono">
                {format(new Date(rightBottomCard2.date), "dd.MM.yyyy")}
              </time>
            </div>
          </div>

        </div>

      </section>

    </div>
  );
}

