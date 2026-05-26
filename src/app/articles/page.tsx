"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Search } from "lucide-react";
import { posts } from "@/data/posts";
import { format } from "date-fns";
import { useState } from "react";

export default function Articles() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground tracking-tight mb-6">
          The Archive
        </h1>
        <p className="text-lg text-muted-foreground">
          Thoughts on AI, machine learning engineering, Android modding, and everything in between.
        </p>
      </div>

      <div className="relative max-w-xl mb-16">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search entries..."
          className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, i) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:border-teal/30 relative"
          >
            <Link href={`/article/${post.slug}`} className="absolute inset-0 z-10" aria-label={post.title} />
            <div className="aspect-[16/10] overflow-hidden">
              <img 
                src={post.coverImage} 
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col flex-grow p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold tracking-wider uppercase text-teal">
                  {post.category}
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  {post.readingTime}
                </span>
              </div>
              <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-teal transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow">
                {post.excerpt}
              </p>
              <div className="pt-4 border-t border-border mt-auto flex items-center justify-between text-xs font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <img src={post.author.avatar} alt={post.author.name} className="w-5 h-5 rounded-full" />
                  <span>{post.author.name}</span>
                </div>
                <span>{format(new Date(post.date), 'MMM d, yyyy')}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-xl font-serif text-muted-foreground mb-4">No signal detected.</p>
          <p className="text-sm text-muted-foreground">Try altering your search parameters.</p>
        </div>
      )}
    </div>
  );
}
