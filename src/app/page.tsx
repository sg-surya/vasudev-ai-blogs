"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
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
  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const recentPosts = posts.filter((p) => p.id !== featuredPost.id).slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col gap-24">
      {/* Premium Hero Section */}
      <motion.section
        className="flex flex-col gap-16"
        initial="hidden"
        animate="show"
        variants={STAGGER_CHILDREN_ANIMATION}
      >
        <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="max-w-3xl flex flex-col gap-6">
          <h1 className="text-5xl md:text-[5rem] font-serif font-bold leading-[1.05] tracking-tight text-foreground">
            Clarity in Code. <br className="hidden md:block" />
            <span className="text-teal">Stories in Tech.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl font-light">
            A minimalist dispatch on Artificial Intelligence, Advanced Automation, and the bleeding edge of software engineering by Surya.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <Link href="/about" className="inline-flex items-center justify-center bg-foreground text-background px-6 py-3 rounded-full font-medium transition-transform hover:scale-105 active:scale-95 text-sm">
              About the Author
            </Link>
            <Link href="/articles" className="inline-flex items-center justify-center border border-border bg-transparent text-foreground px-6 py-3 rounded-full font-medium transition-colors hover:bg-muted text-sm">
              View Archive
            </Link>
          </div>
        </motion.div>

        {/* Cinematic Featured Article */}
        <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
          <Link href={`/article/${featuredPost.slug}`} className="group relative block overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm hover:border-teal/30 transition-colors">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-square md:aspect-auto overflow-hidden relative border-b md:border-b-0 md:border-r border-border bg-muted/30">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-14 lg:p-16 relative bg-background">
                <div className="absolute top-0 right-0 p-8 hidden md:block">
                  <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:bg-foreground group-hover:text-background transition-all rotate-[-45deg] group-hover:rotate-0">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 text-xs font-bold tracking-widest uppercase bg-teal/10 text-teal rounded-full">
                    Featured Event
                  </span>
                </div>
                <h2 className="text-3xl md:text-[2.75rem] font-serif font-bold text-foreground mb-6 leading-[1.1] group-hover:text-teal transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground text-lg mb-10 leading-relaxed font-light line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm font-medium text-foreground/80 mt-auto">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-8 h-8 rounded-full border border-border object-cover"
                    />
                    <span>{featuredPost.author.name}</span>
                  </div>
                  <span className="text-border">•</span>
                  <span className="text-muted-foreground">{format(new Date(featuredPost.date), "MMM d, yyyy")}</span>
                  <span className="text-border hidden sm:inline">•</span>
                  <span className="text-muted-foreground hidden sm:inline">{featuredPost.readingTime}</span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </motion.section>

      {/* Structured Content Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 lg:gap-24">
        {/* Editorial Feed */}
        <div className="flex flex-col gap-12">
          <div className="flex items-center justify-between border-b border-border pb-6">
            <h2 className="text-3xl font-serif font-bold text-foreground">Editorial Feed</h2>
            <Link href="/articles" className="text-sm font-medium text-muted-foreground hover:text-teal flex items-center gap-1 transition-colors">
              Browse all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-16">
            {recentPosts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group flex flex-col gap-5"
              >
                <Link href={`/article/${post.slug}`} className="block aspect-[4/3] w-full rounded-[1.5rem] overflow-hidden border border-border relative bg-card shadow-sm">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 text-xs font-bold tracking-widest uppercase bg-background/90 backdrop-blur-md text-foreground rounded-full border border-border/50 shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </Link>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-3">
                    <time>{format(new Date(post.date), "MMM d, yyyy")}</time>
                    <span className="text-border">—</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <Link href={`/article/${post.slug}`} className="group-hover:text-teal transition-colors">
                    <h3 className="text-2xl font-serif font-bold mb-3 leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-12 lg:sticky lg:top-24 h-fit">
          {/* Subscribe Widget */}
          <div className="rounded-[1.5rem] border border-border bg-card p-8 flex flex-col gap-6 shadow-sm overflow-hidden relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-teal/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            <div className="w-12 h-12 rounded-2xl bg-teal/10 flex items-center justify-center text-teal shadow-sm border border-teal/20">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-2">Join the inner circle</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Receive high-signal insights on AI engineering and system architecture directly to your inbox. No spam.
              </p>
            </div>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-teal transition-all shadow-sm" />
              <button className="w-full bg-foreground text-background font-medium py-3 rounded-xl transition-all hover:bg-foreground/90 text-sm shadow-sm">
                Subscribe
              </button>
            </form>
          </div>

          {/* Topics Taxonomy */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold tracking-widest uppercase text-muted-foreground border-b border-border pb-3">
              Taxonomy
            </h3>
            <div className="flex flex-col gap-1">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/categories?q=${encodeURIComponent(cat)}`}
                  className="group flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-muted transition-colors text-foreground"
                >
                  <span>{cat}</span>
                  <span className="text-xs font-semibold text-muted-foreground bg-background border border-border rounded-md px-2 py-0.5 group-hover:text-teal group-hover:border-teal/30 transition-colors">
                    {posts.filter((p) => p.category === cat).length}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Author mini profile */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xs font-bold tracking-widest uppercase text-muted-foreground border-b border-border pb-3">
              Architect
            </h3>
            <div className="flex items-center gap-4 group cursor-pointer">
              <img src={featuredPost.author.avatar} alt="Surya" className="w-12 h-12 rounded-full border border-border shadow-sm group-hover:border-teal/50 transition-colors object-cover" />
              <div>
                <Link href="/about" className="font-bold text-foreground group-hover:text-teal transition-colors block">
                  Surya Pratap Singh
                </Link>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-0.5">AI Engineer & Hacker</p>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
