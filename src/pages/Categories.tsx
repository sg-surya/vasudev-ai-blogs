import { categories, posts } from "@/data/posts";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { motion } from "motion/react";

export function Categories() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("q") || "All";

  const filteredPosts = activeCategory === "All" 
    ? posts 
    : posts.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-6">
          Topics & Modules
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore specific domains of systems engineering, AI research, and architecture.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-16">
        <button
          onClick={() => setSearchParams({})}
          className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm border ${
            activeCategory === "All" 
              ? "bg-foreground text-background border-foreground" 
              : "bg-card text-foreground border-border hover:border-teal/50 hover:text-teal"
          }`}
        >
          All Signals
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSearchParams({ q: cat })}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm border ${
              activeCategory === cat 
                ? "bg-foreground text-background border-foreground" 
                : "bg-card text-foreground border-border hover:border-teal/50 hover:text-teal"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, i) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:border-teal/30 relative"
          >
            <Link to={`/article/${post.slug}`} className="absolute inset-0 z-10" />
            <div className="flex flex-col flex-grow p-6">
              <span className="text-xs font-semibold tracking-wider uppercase text-teal mb-4 block">
                {post.category}
              </span>
              <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-teal transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow">
                {post.excerpt}
              </p>
              <div className="pt-4 border-t border-border mt-auto flex items-center justify-between text-xs font-medium text-muted-foreground">
                <span>{format(new Date(post.date), 'MMM d, yyyy')}</span>
                <span className="font-mono">{post.readingTime}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
         <div className="py-24 text-center">
             <p className="text-xl font-serif text-muted-foreground">No records found in this sector.</p>
         </div>
      )}
    </div>
  );
}
