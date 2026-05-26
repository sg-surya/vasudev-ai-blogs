"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Code, Cpu, Shield, Smartphone } from "lucide-react";
import { posts, categories } from "@/data/posts";
import { format } from "date-fns";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function Home() {
  const featuredPost = posts.find(p => p.featured) || posts[0];
  const recentPosts = posts.filter(p => p.id !== featuredPost.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      {/* Hero Section */}
      <motion.section 
        className="mb-24"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="max-w-3xl mb-12">
          <h1 className="text-4xl md:text-6xl font-bold font-serif leading-tight mb-6 tracking-tight">
            Clarity in Code.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-lavender">
              Stories in Tech.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            A premium futuristic developer journal exploring Artificial Intelligence, 
            Advanced Automation, and the bleeding edge of software engineering 
            by Surya.
          </p>
        </motion.div>

        {/* Featured Post Card */}
        <motion.div variants={itemVariants}>
          <Link href={`/article/${featuredPost.slug}`} className="group block">
            <div className="relative rounded-3xl overflow-hidden border border-border bg-card shadow-sm transition-all hover:shadow-xl hover:border-teal/30">
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10" />
              <div className="aspect-[21/9] md:aspect-[24/9] overflow-hidden">
                <img 
                  src={featuredPost.coverImage} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20">
                <div className="flex gap-3 mb-4">
                  <span className="px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-teal text-white rounded-full">
                    Featured
                  </span>
                  <span className="px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-background/50 backdrop-blur-md border border-border rounded-full text-foreground">
                    {featuredPost.category}
                  </span>
                </div>
                <h2 className="text-2xl md:text-4xl font-serif font-bold text-foreground mb-4 group-hover:text-teal transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-foreground/80 md:text-lg max-w-3xl mb-6 line-clamp-2 md:line-clamp-none">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm font-medium text-foreground/70">
                  <div className="flex items-center gap-2">
                    <img 
                      src={featuredPost.author.avatar} 
                      alt={featuredPost.author.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{featuredPost.author.name}</span>
                  </div>
                  <span>·</span>
                  <span>{format(new Date(featuredPost.date), 'MMM d, yyyy')}</span>
                  <span>·</span>
                  <span>{featuredPost.readingTime}</span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </motion.section>

      {/* Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Main Content: Recent Articles */}
        <section className="lg:col-span-8">
          <div className="flex items-center border-b border-border pb-4 mb-8">
            <h2 className="text-2xl font-serif font-bold tracking-tight">Latest Notes</h2>
            <Link href="/articles" className="ml-auto text-sm text-teal hover:text-lavender font-medium flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="space-y-8">
            {recentPosts.map((post) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group relative flex flex-col md:flex-row gap-6 p-4 -mx-4 rounded-2xl hover:bg-muted/50 transition-colors"
              >
                <div className="w-full md:w-1/3 shrink-0 rounded-xl overflow-hidden aspect-[4/3] md:aspect-auto border border-border">
                  <img 
                    src={post.coverImage} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-xs font-semibold tracking-wider uppercase text-teal mb-2">
                    {post.category}
                  </span>
                  <Link href={`/article/${post.slug}`} className="absolute inset-0 z-10" aria-label={post.title} />
                  <h3 className="text-xl md:text-2xl font-serif font-bold mb-3 group-hover:text-teal transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base line-clamp-2 md:line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mt-auto">
                    <span>{format(new Date(post.date), 'MMM d, yyyy')}</span>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-12">
          
          {/* About Widget */}
          <div className="p-6 rounded-2xl border border-border bg-card">
            <h3 className="text-lg font-serif font-bold mb-4">About the Author</h3>
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={featuredPost.author.avatar} 
                alt="Surya" 
                className="w-16 h-16 rounded-full border-2 border-background shadow-sm"
              />
              <div>
                <p className="font-semibold">{featuredPost.author.name}</p>
                <p className="text-sm text-teal">AI Engineer & Hacker</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Building intelligent systems, tearing down Android kernels, and documenting the journey of creating Surya AI.
            </p>
            <Link href="/about" className="text-sm font-medium hover:text-teal underline underline-offset-4 transition-colors">
              Read exact specs →
            </Link>
          </div>

          {/* Topics */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-4 border-b border-border pb-2">Topics</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, i) => (
                <Link 
                  key={cat} 
                  href={`/categories?q=${encodeURIComponent(cat)}`}
                  className="px-3 py-1.5 text-sm font-medium bg-muted hover:bg-teal hover:text-white rounded-lg transition-colors border border-border/50"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

        </aside>
      </div>

    </div>
  );
}
