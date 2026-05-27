"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, MessageCircle } from "lucide-react";

export function CTAFooter() {
  return (
    <section aria-label="Call to action" className="relative">
      <div className="rounded-[2.5rem] bg-gradient-to-br from-teal/10 via-lavender/5 to-teal/5 dark:from-teal/[0.07] dark:via-lavender/[0.03] dark:to-teal/[0.04] border border-border/60 p-8 md:p-12 lg:p-16 overflow-hidden relative">
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 40%, #4DB6AC 0%, transparent 50%),
              radial-gradient(circle at 70% 60%, #CDBCF2 0%, transparent 50%)
            `,
          }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal" />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-muted-foreground">
                Stay Connected
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-foreground leading-[1.1]">
              Ready to dive deeper
              <br />
              <span className="text-teal">into the future of AI?</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-lg leading-relaxed">
              Whether you are a developer building the next big thing, a researcher exploring AI&apos;s potential, or simply curious about where technology is heading — there is something here for you.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 bg-foreground text-background hover:bg-teal hover:text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-sm"
              >
                Explore All Articles
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-xl font-medium text-sm text-foreground hover:border-teal/50 hover:text-teal transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Get in Touch
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border/50 bg-background/40 backdrop-blur-sm p-5">
                <span className="text-3xl font-serif font-bold text-teal">41+</span>
                <p className="text-xs text-muted-foreground mt-1">In-depth articles on AI, dev tools, and open source</p>
              </div>
              <div className="rounded-2xl border border-border/50 bg-background/40 backdrop-blur-sm p-5">
                <span className="text-3xl font-serif font-bold text-lavender">8</span>
                <p className="text-xs text-muted-foreground mt-1">Categories spanning the tech landscape</p>
              </div>
              <div className="rounded-2xl border border-border/50 bg-background/40 backdrop-blur-sm p-5 col-span-2">
                <p className="text-sm font-medium text-foreground">
                  &ldquo;Clarity in Code. Stories in Tech.&rdquo;
                </p>
                <p className="text-xs text-muted-foreground mt-1">— Vasudev AI Chronicles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
