import { AUTHOR_VASUDEV } from "./author";

export const post = {
  id: "13",
  slug: "how-i-built-vasudev-ai",
  title: "How I Built Vasudev AI",
  excerpt: "The architecture behind this platform. Examining Next.js App Router, Framer Motion, and Tailwind CSS.",
  content: `
# How I Built Vasudev AI

A developer's blog is their ultimate playground. Here is the technical breakdown of how Vasudev AI was structured to be lightning-fast, visually calm, and highly scalable.

## Framework: Next.js (App router)
I migrated away from traditional single-page applications (Vite/React) to Next.js to gain absolute control over SEO metadata, server-side rendering, and dynamic sitemaps.

## Styling: Tailwind CSS
Utility classes provide a zero-context-switching experience. Paired with a custom color palette consisting of deep slate gradients, teal accents, and pure minimal borders, it achieves the 'futuristic editorial' look.

## Animations: Framer Motion
Every micro-interaction (the navbar indicator, page reveals, card hovers) utilizes mathematical spring physics rather than rigid CSS cubic-beziers. 
  `,
  coverImage: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1200&auto=format&fit=crop",
  date: "2026-04-15",
  readingTime: "5 min read",
  category: "Developer Tools",
  tags: ["System Design", "Next.js", "Web Dev"],
  author: AUTHOR_VASUDEV
};
