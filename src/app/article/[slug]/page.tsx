"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { posts } from "@/data/posts";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { format } from "date-fns";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowLeft, Clock, CalendarDays, Share2, BookmarkPlus } from "lucide-react";
import { useState, useEffect } from "react";

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find(p => p.slug === slug);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return notFound();
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-teal origin-left z-50 pointer-events-none" 
        style={{ scaleX }} 
      />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <Link href="/articles" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-teal mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Archive
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-teal text-white rounded-full shadow-sm">
              {post.category}
            </span>
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 text-xs font-mono tracking-tight bg-muted text-muted-foreground rounded border border-border">
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 border-y border-border">
            <div className="flex items-center gap-4">
              <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full border border-border" />
              <div>
                <p className="font-semibold text-foreground">{post.author.name}</p>
                <p className="text-sm text-teal">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                {format(new Date(post.date), 'MMM d, yyyy')}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readingTime}
              </div>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <div className="aspect-[21/9] md:aspect-[24/9] w-full rounded-2xl md:rounded-3xl overflow-hidden mb-16 border border-border shadow-sm">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Content & Actions Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_800px_1fr] gap-x-8">
          
          {/* Left Sidebar (Sticky social) - Hidden on small screens */}
          <div className="hidden lg:block">
            <div className="sticky top-32 flex flex-col items-end gap-4 px-4">
              <button 
                onClick={handleCopyLink}
                className="p-3 bg-card border border-border rounded-full hover:bg-muted hover:text-teal hover:border-teal/50 transition-all text-muted-foreground group relative"
                aria-label="Share article"
              >
                <Share2 className="w-5 h-5" />
                {copied && <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded shadow-sm whitespace-nowrap">Link Copied!</span>}
              </button>
              <button 
                className="p-3 bg-card border border-border rounded-full hover:bg-muted hover:text-teal hover:border-teal/50 transition-all text-muted-foreground"
                aria-label="Bookmark article"
              >
                <BookmarkPlus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Markdown Content */}
          <div className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:tracking-tight prose-a:text-teal prose-a:decoration-teal/30 hover:prose-a:decoration-teal prose-img:rounded-2xl max-w-none">
            <ReactMarkdown
              components={{
                code({node, inline, className, children, ...props}: any) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      {...props}
                      children={String(children).replace(/\n$/, '')}
                      style={vscDarkPlus as any}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-xl border border-border !bg-[#12161E] my-8 !p-6 !text-sm"
                    />
                  ) : (
                    <code {...props} className="bg-muted px-1.5 py-0.5 rounded-md font-mono text-sm text-teal before:content-none after:content-none">
                      {children}
                    </code>
                  )
                }
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Right Sidebar (Empty for balance, or could be TOC) */}
          <div className="hidden lg:block">
             <div className="sticky top-32">
                <h4 className="font-serif font-bold text-sm tracking-wider uppercase text-muted-foreground mb-4">On this page</h4>
                <div className="text-sm space-y-3 text-muted-foreground">
                  <p className="hover:text-teal cursor-pointer transition-colors">The Cognitive Engine</p>
                  <p className="hover:text-teal cursor-pointer transition-colors pl-4">1. Memory and State</p>
                  <p className="hover:text-teal cursor-pointer transition-colors pl-4">2. Tool Usage</p>
                </div>
             </div>
          </div>
        </div>
        
        {/* Mobile Actions */}
        <div className="flex gap-4 mt-12 pt-8 border-t border-border lg:hidden">
            <button 
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors text-sm font-medium flex-1 justify-center"
              >
                <Share2 className="w-4 h-4" />
                {copied ? "Copied!" : "Share"}
            </button>
            <button 
                className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors text-sm font-medium flex-1 justify-center"
              >
                <BookmarkPlus className="w-4 h-4" />
                Bookmark
            </button>
        </div>

      </article>
    </>
  );
}
