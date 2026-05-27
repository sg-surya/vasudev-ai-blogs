# Changelog

All notable changes to Vasudev AI Chronicles will be documented here.

## 2026-05-27 — Phase 2: 15 New In-Depth AI Articles

### Added
- **15 new articles** covering the latest AI developments in 2026:
  - `claude-4-opus-2026` — Claude 4 Opus features, coding benchmarks vs GPT-5
  - `openai-gpt5-o3-o4-2026` — GPT-5, o3/o4 reasoning models, OpenAI Dev Day 2026
  - `open-source-ai-agents-2026` — AutoGPT, CrewAI, LangGraph, Swarm comparison
  - `google-io-2026-ai-recap` — Gemini 2.0 Pro, Project Mariner, Gemma 3, Veo 3
  - `ai-coding-assistants-2026-comparison` — Cursor vs Copilot vs Windsurf vs Codeium
  - `local-llms-2026-llama4-mistral` — Llama 4, Mistral Large 2, Phi-4 on consumer hardware
  - `multi-agent-systems-langgraph-claude` — Building multi-agent systems with LangGraph + Claude
  - `rag-production-2026-best-practices` — ColBERT v2, hybrid search, reranking, RAGAS
  - `open-source-vs-closed-source-llms-2026` — Cost, performance, and use case analysis
  - `fine-tuning-llama4-mistral-2026` — LoRA, QLoRA, DoRA fine-tuning guide
  - `ai-hardware-2026-rtx5090-m4-ultra` — RTX 5090, M4 Ultra, NPUs for AI workloads
  - `model-context-protocol-mcp-2026` — MCP protocol, building MCP servers, ecosystem
  - `ai-in-vs-code-2026` — Copilot Agent Mode, Cursor rules, AI extensions
  - `multimodal-ai-2026-sora-veo` — Sora, Veo 3, DALL-E 4, Stable Diffusion 4
  - `open-source-ai-news-2026` — New models, leaderboards, MoE architectures

### Changed
- Updated `src/data/posts/index.ts` to register all 15 new articles

---

## 2026-05-27 — Phase 0: SEO Blocker Fix

### Changed
- **Converted article page to server component** (`src/app/article/[slug]/page.tsx`)
  - Removed `"use client"` directive
  - Added `generateMetadata()` — each article now gets unique `<title>`, `<meta name="description">`, and OpenGraph tags
  - Added `generateStaticParams()` — all 15 articles pre-rendered as static HTML at build time

- **Converted articles archive page to server component** (`src/app/articles/page.tsx`)
  - Removed `"use client"` directive
  - Added static `metadata` export with title and description

- **Converted categories page to server component** (`src/app/categories/page.tsx`)
  - Removed `"use client"` directive
  - Added static `metadata` export with title and description

### Added
- `src/components/ArticleProgressBar.tsx` — client island for scroll progress indicator
- `src/components/ArticleShareButton.tsx` — client island for share/copy link (desktop + mobile variants)
- `src/components/ArticleBookmarkButton.tsx` — client island for bookmark button
- `src/components/ArticlePageInit.tsx` — client island for scroll-to-top on mount
- `src/components/ArticlesArchive.tsx` — client island with search + animated grid
- `src/components/CategoriesContent.tsx` — client island with category filter + animated grid

### Infrastructure
- Updated `.gitignore` with Next.js-specific entries (`.next/`, `out/`, `*.tsbuildinfo`, `.turbo`, `.vercel`)

---

## 2026-05-27 — Phase 1: Fix Broken Features

### Added
- **Contact form API route** (`src/app/api/contact/route.ts`) — POST handler using Resend to forward form submissions to email
- **ContactForm client component** (`src/components/ContactForm.tsx`) — wired to API route with loading/success/error states
- **Cookie consent banner** (`src/components/CookieConsent.tsx`) — GDPR-compliant banner with Accept/Decline; Google Analytics only loads after user consent
- `.env.local` with placeholder for `RESEND_API_KEY` and `GEMINI_API_KEY`

### Changed
- **Contact page** (`src/app/contact/page.tsx`)
  - Now uses live ContactForm component instead of static placeholder
  - Updated social links and removed newsletter references
  - Added Mail icon for visual polish

- **Footer** (`src/components/Footer.tsx`)
  - **Removed newsletter signup card** — replaced with "Get in Touch" card linking to Contact page
  - **Replaced social links** — Twitter → Discord, updated GitHub, LinkedIn to real URLs
  - Changed Twitter icon to MessageCircle (Discord)
  - All social links now open in new tab with `rel="noopener noreferrer"`

- **Homepage** (`src/app/page.tsx`)
  - **Removed newsletter section** entirely ("Subscribe to Surya's Dispatch" + form)
  - Cleaned up unused icon imports

- **Navbar** (`src/app/components/Navbar.tsx`)
  - **Fixed mobile search** — search input now navigates to `/articles?q=<query>` on Enter
  - Desktop search icon now links to `/articles` page
  - Added `useRouter` and form handler for search submission

- **Root layout** (`src/app/layout.tsx`)
  - **Removed hardcoded Google Analytics scripts** — moved to CookieConsent component (loads only after consent)
  - GA scripts now load dynamically only when user accepts cookies
  - Added CookieConsent component before closing `</body>`

### Verified
- **Alt text audit** — all cover images across the site use `alt={post.title}` or descriptive text. No changes needed.
