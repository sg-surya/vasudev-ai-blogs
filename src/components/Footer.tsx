"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, ArrowRight, Sun, Moon, Laptop } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

export function Footer() {
  const { theme, setTheme } = useTheme();

  return (
    <footer className="bg-background border-t border-border pt-16 pb-8 mt-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="md:col-span-1 lg:col-span-1">
            <Link href="/" className="text-xl font-serif font-semibold tracking-tight flex items-center gap-2 mb-4 group">
              <span className="w-8 h-8 rounded-lg bg-teal flex items-center justify-center text-white font-sans font-bold shadow-sm group-hover:bg-lavender transition-colors">
                V
              </span>
              Vasudev AI
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Clarity in Code. Stories in Tech. A premium futuristic developer journal built for the next generation of AI creators.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-teal transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-teal transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-teal transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 font-serif text-lg">Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="text-muted-foreground hover:text-teal transition-colors">Home</Link></li>
              <li><Link href="/articles" className="text-muted-foreground hover:text-teal transition-colors">Articles</Link></li>
              <li><Link href="/categories" className="text-muted-foreground hover:text-teal transition-colors">Categories</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-teal transition-colors">About</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 font-serif text-lg">Legal & Sitemap</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/privacy" className="text-muted-foreground hover:text-teal transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-teal transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/disclaimer" className="text-muted-foreground hover:text-teal transition-colors">Disclaimer</Link></li>
              <li><Link href="/cookie" className="text-muted-foreground hover:text-teal transition-colors">Cookie Policy</Link></li>
              <li><Link href="/sitemap" className="text-muted-foreground hover:text-teal transition-colors">HTML Sitemap</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-teal transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-1 border border-border p-6 rounded-2xl bg-card">
            <h3 className="font-semibold mb-2 font-serif text-lg">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest tech experiments and AI insights in your inbox.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="developer@example.com"
                className="bg-background border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-all"
                required
              />
              <button 
                type="submit"
                className="bg-foreground text-background hover:bg-teal hover:text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Floating Theme Toggle */}
        <div className="flex justify-center mb-12 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center p-1.5 bg-background/80 backdrop-blur-xl border border-border rounded-full shadow-lg transition-transform hover:scale-[1.02]">
            <button 
              onClick={() => setTheme("light")} 
              className={cn("px-4 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2", theme === "light" ? "bg-foreground text-background shadow-md" : "text-muted-foreground hover:text-foreground")}
              aria-label="Light mode"
            >
              <Sun className="w-4 h-4" /> <span className="hidden sm:inline">Light</span>
            </button>
            <button 
              onClick={() => setTheme("system")} 
              className={cn("px-4 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2", theme === "system" ? "bg-foreground text-background shadow-md" : "text-muted-foreground hover:text-foreground")}
              aria-label="System mode"
            >
              <Laptop className="w-4 h-4" /> <span className="hidden sm:inline">System</span>
            </button>
            <button 
              onClick={() => setTheme("dark")} 
              className={cn("px-4 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2", theme === "dark" ? "bg-foreground text-background shadow-md" : "text-muted-foreground hover:text-foreground")}
              aria-label="Dark mode"
            >
              <Moon className="w-4 h-4" /> <span className="hidden sm:inline">Dark</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Vasudev AI Chronicles. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>Built with Next.js</span>
            <span>·</span>
            <span>Crafted for Builders</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
