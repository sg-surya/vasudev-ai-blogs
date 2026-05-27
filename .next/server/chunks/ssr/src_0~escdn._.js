module.exports=[28861,a=>{"use strict";let b={name:"Surya Pratap Singh",avatar:"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",role:"AI Engineer & Founder"},c=[{id:"1",slug:"build-offline-ai-assistant-lm-studio",title:"How to Build an Offline AI Assistant Using LM Studio",excerpt:"Learn how to set up, configure, and use LM Studio to run powerful open-source LLMs entirely offline on your local machine.",content:`
# How to Build an Offline AI Assistant Using LM Studio

In an era where data privacy is paramount, relying entirely on cloud-based AI models isn't always the best solution. Running Large Language Models (LLMs) locally ensures that your data never leaves your machine, while also providing zero-latency responses once the model is loaded. 

Today, we're building a fully functional offline AI assistant using **LM Studio**.

## The Architecture of Local AI

Before we dive into the setup, it's important to understand how local AI works. Unlike API-based solutions (like OpenAI's GPT-4 or Google's Gemini), local models require computational power directly from your CPU and GPU. The more VRAM your GPU has, the faster the model will generate tokens.

### What is LM Studio?
LM Studio is an incredibly user-friendly desktop application that allows you to discover, download, and run local LLMs. It handles the complexities of hardware acceleration (like using Apple Metal, NVIDIA CUDA, or AMD ROCm) seamlessly in the background.

## Step-by-Step Setup

### Step 1: Download and Installation
Head over to the [LM Studio website](https://lmstudio.ai/) and download the client for your respective OS (Windows, macOS, or Linux).

### Step 2: Selecting the Right Model
Once installed, use the search bar to find a model. For general assistance, I highly recommend:
- **Llama-3-8B-Instruct**
- **Phi-3-Mini-4K-Instruct**

*Tip: Look for the \`Q4_K_M\` or \`Q5_K_M\` quantization tags. These represent quantized (compressed) models that balance speed and accuracy, allowing them to run on standard consumer hardware.*

### Step 3: Configuring the Local Server
LM Studio isn't just a chat interface; it can act as a local API server replacing cloud calls.
1. Navigate to the **Local Server** tab on the left sidebar.
2. Click **Start Server**.
3. Note the port (usually \`1234\`).

## Integrating the Local API in Next.js

Now that our local AI is running, let's create a simple Next.js client to communicate with it.

\`\`\`typescript
// app/api/chat/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await fetch('http://localhost:1234/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: messages,
      temperature: 0.7,
      max_tokens: -1, // -1 means infinite until stop token
      stream: false
    })
  });

  const data = await response.json();
  return NextResponse.json({ reply: data.choices[0].message.content });
}
\`\`\`

## Conclusion
Running AI locally is no longer a luxury for supercomputers. With tools like LM Studio and heavily optimized models, any developer can build private, offline-first AI applications today.
    `,coverImage:"https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",date:"2026-05-24",readingTime:"8 min read",category:"Artificial Intelligence",tags:["Local AI","LM Studio","LLM","Development"],author:b,featured:!0},{id:"2",slug:"running-ai-completely-offline",title:"Running AI Completely Offline in 2026",excerpt:"From Edge TPUs to unified memory architectures, here is how offline AI evolved and how you can leverage it today.",content:`
# Running AI Completely Offline in 2026

The dream of the early 2020s was cloud computing for everything. The reality of 2026 is edge computing—running powerful, reasoning-capable AI completely offline.

## The Hardware Revolution
The biggest bottleneck for local AI used to be VRAM. However, with the standardization of Unified Memory Architectures (UMA) in modern developer laptops, developers can now utilize 32GB, 64GB, or even 128GB of RAM directly for model inference.

## Best Practices for Offline Inference
1. **Model Quantization**: GGUF replaced older formats, providing exceptional flexibility.
2. **Context Window Management**: Local models now support up to 128K context, but caching computation is crucial.
3. **Task-Specific Micro-Models**: Instead of running a massive 70B parameter model, developers are now using orchestrated workflows of specialized 3B and 8B models.

As local hardware continues to improve, the reliance on cloud providers for pure inference will continue to decrease for security-conscious developers.
    `,coverImage:"https://images.unsplash.com/photo-1698064560799-a8647acfc37e?q=80&w=1200&auto=format&fit=crop",date:"2026-05-22",readingTime:"5 min read",category:"Artificial Intelligence",tags:["Future","Edge AI","Hardware"],author:b},{id:"3",slug:"phi-3-vs-llama-3-local-ai",title:"Phi-3 vs Llama 3 for Local AI",excerpt:"A comprehensive developer benchmark comparing the two reigning champions of small-scale local models.",content:`
# Phi-3 vs Llama 3 for Local AI

When selecting a model for local deployments, parameter count dictates your hardware requirements. Currently, two models dominate the sub-10B space: Meta's **Llama 3 (8B)** and Microsoft's **Phi-3 (Mini 3.8B)**.

## Architectural Differences

### Llama 3 (8B)
- **Strengths**: Incredible nuance, vast generalized knowledge, highly capable of complex logical reasoning.
- **Hardware needed**: Minimum 8GB VRAM (with Q4 quantization) for comfortable speeds.

### Phi-3 Mini (3.8B)
- **Strengths**: Trained heavily on "textbook" data. Unbelievably smart for its size, handles coding tasks exceptionally well.
- **Hardware needed**: Runs flawlessly on almost any modern laptop, even without a dedicated GPU.

## The Benchmark: Code Generation
We tested both models on a 0-shot prompt to generate a React \`useIntersectionObserver\` hook.

**Llama 3** provided a complete, robust solution with comments explaining the teardown phase.
**Phi-3** provided a highly optimized, concise solution but missed a specific edgecase regarding React's \`deps\` array.

## Conclusion
If you have the RAM, Llama 3 provides a more robust conversational experience. If you are building background agents or running hardware-constrained devices, Phi-3 is unmatched.
    `,coverImage:"https://images.unsplash.com/photo-1681412328122-8bf8828b8123?q=80&w=1200&auto=format&fit=crop",date:"2026-05-18",readingTime:"6 min read",category:"Artificial Intelligence",tags:["Benchmarks","LLM","Llama 3","Phi-3"],author:b},{id:"4",slug:"android-performance-optimization-guide",title:"Android Performance Optimization Guide",excerpt:"Stop your device from stuttering. A deep dive into kernel governors, background limits, and rendering paths.",content:`
# Android Performance Optimization Guide

Android provides developers and power users incredible freedom, but with that freedom comes the risk of poor optimization. Here is how I set up Android for maximum responsiveness.

## 1. Disabling Unnecessary Background Limits
Modern Android is aggressive with battery management. But if you have a device with 12GB+ of RAM, suspending apps is actively harming your performance as the CPU has to constantly fetch them from storage instead of keeping them in memory.

Go to **Developer Options** -> **Suspend execution for cached apps** -> Select \`Disabled\`.

## 2. Animation Scaling
The oldest trick in the book, yet the most effective.
1. Window animation scale: \`0.5x\`
2. Transition animation scale: \`0.5x\`
3. Animator duration scale: \`0.5x\`

## 3. Force MSAA
In developer options, forcing \`4x MSAA\` forces the GPU to render OpenGL ES 2.0 apps with higher precision. It consumes slightly more battery but resolves micro-stutters in older legacy applications.
    `,coverImage:"https://images.unsplash.com/photo-1607252656733-fd7428c57385?q=80&w=1200&auto=format&fit=crop",date:"2026-05-15",readingTime:"7 min read",category:"Android Customization",tags:["Android","Performance","Smartphones"],author:b},{id:"5",slug:"best-android-roms-for-performance",title:"Best Android ROMs for Performance",excerpt:"Custom ROMs aren't dead. Here are the top custom firmware projects focusing purely on compute and battery efficiency.",content:`
# Best Android ROMs for Performance

With manufacturers locking down bootloaders, the custom ROM scene has consolidated. However, the projects that remain are architectural masterpieces of efficiency.

## 1. LineageOS 
The king of stability. It lacks extreme customization features, which is exactly why it performs so well. The kernel is strictly tuned to AOSP baselines without OEM bloatware.

## 2. Paranoid Android (AOSPA)
Utilizing the Qualcomm CAF (Code Aurora Forum) baselines, PA often performs better than stock firmware on Snapdragon devices because it utilizes device-specific drivers optimized directly by Qualcomm.

## 3. Crdroid
If you need features but despise the heavy framework modifications of OEM skins like OneUI, Crdroid offers a perfect middle-ground.
    `,coverImage:"https://images.unsplash.com/photo-1629196914210-91c6bf9e984f?q=80&w=1200&auto=format&fit=crop",date:"2026-05-10",readingTime:"5 min read",category:"Android Customization",tags:["ROMs","Root","AOSP"],author:b},{id:"6",slug:"how-to-debloat-windows-for-developers",title:"How to Debloat Windows for Developers",excerpt:"A clean developer environment is a fast environment. How to strip Windows 11 down to its bare essentials.",content:`
# How to Debloat Windows for Developers

Windows is a fantastic development environment thanks to WSL2, but out-of-the-box, it is filled with telemetry, pre-installed bloat, and background services you don't need.

## The Automated Approach
Instead of manually disabling services, I highly recommend using the open-source **Chris Titus Tech (CTT) Windows Utility**. 

### How to run:
1. Open PowerShell as Administrator.
2. Run \`iwr -useb https://christitus.com/win | iex\`
3. Navigate to the "Tweaks" tab.
4. Select "Desktop" for standard setups, or "Laptop" to preserve sleep/battery services.

## Manual Telemetry Disabling
If you prefer doing it manually, disable these services via \`services.msc\`:
- \`Connected User Experiences and Telemetry\`
- \`SysMain\` (Only if on a fast NVMe SSD, disable this)

A clean system utilizes fewer resources, giving Docker and WSL2 the memory they desperately need.
    `,coverImage:"https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",date:"2026-05-08",readingTime:"6 min read",category:"Performance Optimization",tags:["Windows","Debloat","Dev Setup"],author:b},{id:"7",slug:"best-tools-for-power-users",title:"Best Tools for Power Users in 2026",excerpt:"Software utilities that completely transform how you interact with your operating system.",content:`
# Best Tools for Power Users in 2026

Relying on default operating system tools limits your workflow speed. Here are the tools I install immediately on a fresh machine.

1. **PowerToys (Windows)**: Specifically for *FancyZones* (superior window management) and *PowerToys Run* (Spotlight for Windows).
2. **Raycast (macOS)**: Simply the best launcher to ever exist. Deeply integrated with extensions for GitHub, Jira, and local scripts.
3. **Obsidian**: Local-first, markdown-based knowledge management. Your brain, mapped as a graph.
4. **Espanso**: Open-source, cross-platform text expander. Stop typing your email signature or common git commands.
    `,coverImage:"https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",date:"2026-05-05",readingTime:"4 min read",category:"Developer Tools",tags:["Productivity","Setup","Workflow"],author:b},{id:"8",slug:"best-ai-coding-tools-2026",title:"Best AI Coding Tools in 2026",excerpt:"An overview of the AI assistants that are actually worth your time regarding software architecture and code generation.",content:`
# Best AI Coding Tools in 2026

We've moved past simple autocomplete. AI coding tools are now context-aware architectural assistants. 

## 1. Cursor
Built on VS Code, Cursor remains the king of developer-first AI editors. It understands your entire codebase out-of-the-box and integrates seamlessly with various LLMs (Claude 3.5 Sonnet being the current preference for code).

## 2. GitHub Copilot
The standard. While it lacks the deep workspace awareness of Cursor in some default contexts, its enterprise integration and reliable autocomplete make it a staple.

## 3. Supermaven
Incredible speed. Supermaven focuses on low-latency, 1-million-token context windows, predicting huge chunks of boilerplates nearly instantly without the thinking-lag of other providers.
    `,coverImage:"https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",date:"2026-05-02",readingTime:"5 min read",category:"Developer Tools",tags:["AI Tools","Programming","IDE"],author:b},{id:"9",slug:"cursor-vs-windsurf-vs-replit",title:"Cursor vs Windsurf vs Replit",excerpt:"Comparing the heavyweights of the AI-native development environments. Which IDE deserves your workflow?",content:`
# Cursor vs Windsurf vs Replit

Choosing an AI-native IDE dictates how efficiently you can build applications.

### Cursor
- **Vibe:** Highly technical, VS Code fork.
- **Best For:** Professional developers who want total control, local extensions, and multi-model support.
- **Verdict:** The reigning champion for local heavy lifting.

### Windsurf by Codeium
- **Vibe:** The intelligent agent approach.
- **Best For:** Developers who want autonomous agents to build features contextually without navigating file trees manually.
- **Verdict:** The best 'Copilot on steroids' experience.

### Replit
- **Vibe:** Cloud-first, instantaneous setup.
- **Best For:** Rapid prototyping, hackathons, and deploying full-stack apps from a browser without local environment configuration.
- **Verdict:** Unmatched for zero-to-deployment velocity.
    `,coverImage:"https://images.unsplash.com/photo-1618401471353-b98a520d9c1a?q=80&w=1200&auto=format&fit=crop",date:"2026-04-28",readingTime:"5 min read",category:"Developer Tools",tags:["IDE","Cursor","Codeium","Replit"],author:b},{id:"10",slug:"building-ai-agents-with-nextjs",title:"Building AI Agents with Next.js",excerpt:"A practical developer guide to executing recursive AI agent loops inside a Next.js server environment.",content:`
# Building AI Agents with Next.js

Next.js, with its App Router and Server Actions, provides a fantastic backend for building AI agents. 

## The Concept
An AI agent requires:
1. **Memory** (Contextual state)
2. **Tools** (Functions it can execute)
3. **Execution Loop** (The ability to observe, think, and act)

## Using the Google Gen AI SDK
You can orchestrate an agent by defining functions on your server and passing them to the model as tools.

\`\`\`typescript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// The tool definition
const fetchWeatherTool = {
  name: "getWeather",
  description: "Fetches current weather for a specific city.",
  parameters: {
    type: "object",
    properties: { city: { type: "string" } }
  }
};
\`\`\`

By utilizing Next.js React Server Components, you can stream the agent's thought processes directly to the client interface cleanly, resulting in highly dynamic AI-driven web apps.
    `,coverImage:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",date:"2026-04-25",readingTime:"8 min read",category:"Automation",tags:["Next.js","AI Agents","TypeScript"],author:b},{id:"11",slug:"how-to-make-local-chatgpt-clone",title:"How to Make a Local ChatGPT Clone",excerpt:"Ditch subscription fees. Build your own conversational interface using Next.js, Tailwind, and local models.",content:`
# How to Make a Local ChatGPT Clone

In this tutorial, we will utilize Next.js and LM Studio to create a beautiful local conversational UI.

## The Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Backend:** Local LM Studio server (Hosting Llama 3)
- **State Management:** React hooks / Vercel AI SDK

By binding the \`useChat\` hook from the Vercel AI SDK pointing to the \`http://localhost:1234/v1\` endpoint, your frontend won't know the difference between a cloud provider and a local graphical unit.

*Detailed code layout for this build will be expanded in a secondary deep-dive.*
    `,coverImage:"https://images.unsplash.com/photo-1531297180773-4b07fb1b6370?q=80&w=1200&auto=format&fit=crop",date:"2026-04-20",readingTime:"6 min read",category:"Artificial Intelligence",tags:["Project","Next.js","Local AI"],author:b},{id:"12",slug:"best-open-source-ai-models-low-end",title:"Best Open Source AI Models for Low-End PCs",excerpt:"You don't need an RTX 4090 to run AI. Exploring the best highly compressed computational models for budget laptops.",content:`
# Best Open Source AI Models for Low-End PCs

Not everyone has 24GB of VRAM. If you're on a student laptop or a budget rig, these are the models you should be running via Ollama or LM Studio.

1. **Qwen 1.5 (0.5B / 1.8B parameter versions)**: Astounding multi-lingual capabilities running on literal potatoes.
2. **Gemma 2 (2B)**: Google's lightweight open model. Very smart for its size class.
3. **TinyLlama (1.1B)**: The classic 1B model, great for simple categorization or sentiment analysis scripts.

Always look for the \`Q4_K_M\` GGUF files to maximize the VRAM / RAM efficiency without degrading the smarts too heavily.
    `,coverImage:"https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop",date:"2026-04-18",readingTime:"4 min read",category:"Artificial Intelligence",tags:["Open Source","Models","Budget"],author:b},{id:"13",slug:"how-i-built-vasudev-ai",title:"How I Built Vasudev AI",excerpt:"The architecture behind this platform. Examining Next.js App Router, Framer Motion, and Tailwind CSS.",content:`
# How I Built Vasudev AI

A developer's blog is their ultimate playground. Here is the technical breakdown of how Vasudev AI was structured to be lightning-fast, visually calm, and highly scalable.

## Framework: Next.js (App router)
I migrated away from traditional single-page applications (Vite/React) to Next.js to gain absolute control over SEO metadata, server-side rendering, and dynamic sitemaps.

## Styling: Tailwind CSS
Utility classes provide a zero-context-switching experience. Paired with a custom color palette consisting of deep slate gradients, teal accents, and pure minimal borders, it achieves the 'futuristic editorial' look.

## Animations: Framer Motion
Every micro-interaction (the navbar indicator, page reveals, card hovers) utilizes mathematical spring physics rather than rigid CSS cubic-beziers. 
    `,coverImage:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",date:"2026-04-15",readingTime:"5 min read",category:"Developer Tools",tags:["System Design","Next.js","Web Dev"],author:b},{id:"14",slug:"how-to-speed-up-old-laptops",title:"How to Speed Up Old Laptops",excerpt:"Reviving sluggish hardware using software optimization, thermal repasting, and lightweight OS selections.",content:`
# How to Speed Up Old Laptops

Before throwing your 5-year-old laptop out, try these specific optimization techniques.

## 1. The Hardware Necessity (SSD & RAM)
If your laptop has a mechanical Hard Drive (HDD), upgrading to a cheap SATA SSD will improve speeds by roughly 800%. Double the RAM if there is an empty sodimm slot.

## 2. Linux Mint / ChromeOS Flex
Windows demands resources. Installing Linux Mint (XFCE edition) or Google's ChromeOS Flex turns older sluggish hardware into a rapid, secure browsing and coding machine instantly.

## 3. Thermal Maintenance
Processors heavily thermal-throttle when dust builds up. Open the back cover, use compressed air on the fans, and repaste the CPU die with high-quality thermal paste like Arctic MX-4. 
    `,coverImage:"https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=1200&auto=format&fit=crop",date:"2026-04-10",readingTime:"5 min read",category:"Performance Optimization",tags:["Hardware","Laptops","Maintenance"],author:b},{id:"15",slug:"best-free-ai-tools-for-students",title:"Best Free AI Tools for Students",excerpt:"Maximizing academic productivity without paying expensive SaaS subscription fees.",content:`
# Best Free AI Tools for Students

Students are often gated by expensive AI subscriptions. Here is a curated list of completely free (or generous free-tier) tools to enhance learning.

1. **Perplexity AI**: The ultimate research engine. It provides web-cited responses, making finding academic papers significantly faster.
2. **Google AI Studio**: Free API access to the incredibly powerful Gemini models for developer students building applications.
3. **Claude (Free Tier)**: The best free-tier model for writing, essay structuring, and deep contextual reading of PDFs. 
4. **NotebookLM**: Google's free AI notebook that excels at ingesting massive class syllabus PDFs and generating audio podcasts or study guides from them.
    `,coverImage:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",date:"2026-04-05",readingTime:"4 min read",category:"Artificial Intelligence",tags:["Students","Productivity","Free Tools"],author:b}],d=Array.from(new Set(c.map(a=>a.category)));a.s(["categories",0,d,"posts",0,c])},40777,a=>{"use strict";var b=a.i(87924),c=a.i(46271),d=a.i(38246);let e=(0,a.i(70106).default)("arrow-up-right",[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]]);var f=a.i(32860),g=a.i(28861),h=a.i(56711);let i={hidden:{opacity:0},show:{opacity:1,transition:{staggerChildren:.1}}};a.s(["default",0,function(){let a=g.posts.find(a=>"1"===a.id)||g.posts[0],j=g.posts.find(a=>"2"===a.id)||g.posts[1],k=g.posts.find(a=>"3"===a.id)||g.posts[2],l=g.posts.find(a=>"4"===a.id)||g.posts[3],m=[g.posts.find(a=>"5"===a.id)||g.posts[4],g.posts.find(a=>"6"===a.id)||g.posts[5],g.posts.find(a=>"7"===a.id)||g.posts[6],g.posts.find(a=>"8"===a.id)||g.posts[7],g.posts.find(a=>"9"===a.id)||g.posts[8]],n=g.posts.find(a=>"10"===a.id)||g.posts[9],o=g.posts.find(a=>"11"===a.id)||g.posts[10],p=g.posts.find(a=>"13"===a.id)||g.posts[12];return(0,b.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 flex flex-col gap-12 font-sans selection:bg-teal selection:text-white",children:[(0,b.jsx)(c.motion.section,{className:"w-full bg-[#fcf9f2] dark:bg-card/40 border border-border rounded-[2.5rem] p-6 md:p-10 lg:p-12 shadow-sm relative overflow-hidden",initial:"hidden",animate:"show",variants:i,children:(0,b.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch",children:[(0,b.jsxs)("div",{className:"lg:col-span-4 flex flex-col justify-between gap-10",children:[(0,b.jsxs)("div",{className:"flex flex-col gap-6",children:[(0,b.jsx)("span",{className:"text-[10px] font-bold tracking-[0.3em] text-teal uppercase",children:"FEATURED ANNOUNCEMENT"}),(0,b.jsx)("h1",{className:"text-4xl md:text-[2.75rem] font-serif font-black tracking-tight leading-[1.05] text-foreground",children:"Offline AI engines that will save code privacy."}),(0,b.jsx)("p",{className:"text-sm md:text-base text-muted-foreground leading-relaxed font-light",children:"Of course, local hardware acceleration, quantized models, and private context storage are no longer concepts of tomorrow, but without strategic local optimization we now definitely cannot do."})]}),(0,b.jsxs)("div",{className:"flex flex-col gap-6",children:[(0,b.jsxs)(d.default,{href:`/article/${a.slug}`,className:"group inline-flex items-center gap-3",children:[(0,b.jsx)("span",{className:"text-sm font-bold tracking-tight text-foreground underline underline-offset-4 group-hover:text-teal transition-colors",children:"Explore article"}),(0,b.jsx)("div",{className:"w-10 h-10 rounded-full border border-foreground/30 flex items-center justify-center text-foreground group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-all",children:(0,b.jsx)(e,{className:"w-4 h-4 transition-transform group-hover:rotate-45"})})]}),(0,b.jsxs)("div",{className:"flex items-center gap-3 border-t border-border pt-6 mt-4",children:[(0,b.jsx)("img",{src:a.author.avatar,alt:a.author.name,className:"w-8 h-8 rounded-full border border-border object-cover"}),(0,b.jsxs)("div",{className:"text-xs",children:[(0,b.jsxs)("p",{className:"font-bold text-foreground",children:["by ",a.author.name]}),(0,b.jsx)("p",{className:"text-muted-foreground",children:a.author.role})]})]})]})]}),(0,b.jsxs)("div",{className:"lg:col-span-5 relative min-h-[350px] lg:min-h-none rounded-3xl overflow-hidden bg-[#e9e3d7] dark:bg-muted/10 flex items-center justify-center",children:[(0,b.jsx)("img",{src:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",alt:"AI Concept",className:"absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-1000 hover:scale-105"}),(0,b.jsx)("div",{className:"absolute bottom-6 left-6 z-10",children:(0,b.jsx)("span",{className:"px-3 py-1.5 text-[9px] font-bold tracking-[0.2em] uppercase bg-black text-white hover:bg-teal rounded-full shadow-lg transition-colors",children:"SYSTEM AGENT"})})]}),(0,b.jsxs)("div",{className:"lg:col-span-3 flex flex-col justify-between gap-6 border-t lg:border-t-0 lg:border-l border-border pt-8 lg:pt-0 lg:pl-8",children:[(0,b.jsx)("h3",{className:"text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase mb-2",children:"LATEST HIGHLIGHTS"}),(0,b.jsxs)("div",{className:"flex flex-col gap-6 flex-1 justify-between",children:[(0,b.jsxs)(d.default,{href:`/article/${j.slug}`,className:"group grid grid-cols-[80px_1fr] gap-4 items-center",children:[(0,b.jsx)("div",{className:"aspect-square rounded-xl overflow-hidden border border-border bg-muted",children:(0,b.jsx)("img",{src:j.coverImage,alt:j.title,className:"w-full h-full object-cover transition-transform group-hover:scale-105"})}),(0,b.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,b.jsx)("h4",{className:"text-sm font-bold leading-snug text-foreground group-hover:text-teal transition-colors line-clamp-2",children:j.title}),(0,b.jsx)("time",{className:"text-[10px] text-muted-foreground tracking-tight font-mono",children:(0,h.format)(new Date(j.date),"dd.MM.yyyy")})]})]}),(0,b.jsxs)(d.default,{href:`/article/${k.slug}`,className:"group grid grid-cols-[80px_1fr] gap-4 items-center border-t border-border/80 pt-6",children:[(0,b.jsx)("div",{className:"aspect-square rounded-xl overflow-hidden border border-border bg-muted",children:(0,b.jsx)("img",{src:k.coverImage,alt:k.title,className:"w-full h-full object-cover transition-transform group-hover:scale-105"})}),(0,b.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,b.jsx)("h4",{className:"text-sm font-bold leading-snug text-foreground group-hover:text-teal transition-colors line-clamp-2",children:k.title}),(0,b.jsx)("time",{className:"text-[10px] text-muted-foreground tracking-tight font-mono",children:(0,h.format)(new Date(k.date),"dd.MM.yyyy")})]})]}),(0,b.jsxs)(d.default,{href:`/article/${l.slug}`,className:"group grid grid-cols-[80px_1fr] gap-4 items-center border-t border-border/80 pt-6",children:[(0,b.jsx)("div",{className:"aspect-square rounded-xl overflow-hidden border border-border bg-muted",children:(0,b.jsx)("img",{src:l.coverImage,alt:l.title,className:"w-full h-full object-cover transition-transform group-hover:scale-105"})}),(0,b.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,b.jsx)("h4",{className:"text-sm font-bold leading-snug text-foreground group-hover:text-teal transition-colors line-clamp-2",children:l.title}),(0,b.jsx)("time",{className:"text-[10px] text-muted-foreground tracking-tight font-mono",children:(0,h.format)(new Date(l.date),"dd.MM.yyyy")})]})]})]})]})]})}),(0,b.jsxs)("section",{className:"grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch",children:[(0,b.jsxs)("div",{className:"lg:col-span-3 bg-[#fcf9f2] dark:bg-card/40 border border-border p-6 md:p-8 rounded-[2rem] flex flex-col justify-between gap-6 shadow-sm",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("h2",{className:"text-2xl font-serif font-black text-foreground tracking-tight mb-6 pb-2 border-b border-border",children:"Most popular"}),(0,b.jsx)("div",{className:"flex flex-col",children:m.map((a,c)=>(0,b.jsxs)(d.default,{href:`/article/${a.slug}`,className:"group flex flex-col gap-1 py-4 border-b border-border last:border-0 hover:bg-muted/10 transition-colors",children:[(0,b.jsxs)("div",{className:"flex items-start justify-between gap-3",children:[(0,b.jsx)("h3",{className:"text-sm font-bold leading-snug text-foreground group-hover:text-teal transition-colors",children:a.title}),(0,b.jsx)(e,{className:"w-3.5 h-3.5 text-muted-foreground shrink-0 group-hover:text-teal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"})]}),(0,b.jsx)("time",{className:"text-[10px] text-muted-foreground tracking-tight font-mono mt-1",children:(0,h.format)(new Date(a.date),"dd.MM.yyyy")})]},a.id))})]}),(0,b.jsxs)(d.default,{href:"/about",className:"inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-teal transition-colors mt-4",children:["Meet Surya Pratap Singh",(0,b.jsx)(f.ArrowRight,{className:"w-3.5 h-3.5"})]})]}),(0,b.jsxs)("div",{className:"lg:col-span-6 bg-card border border-border rounded-[2rem] p-6 lg:p-10 flex flex-col justify-between gap-8 shadow-sm relative overflow-hidden group min-h-[450px]",children:[(0,b.jsx)("div",{className:"absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 z-10 pointer-events-none"}),(0,b.jsx)("img",{src:n.coverImage,alt:n.title,className:"absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"}),(0,b.jsx)("div",{className:"absolute top-6 left-6 z-20",children:(0,b.jsx)("span",{className:"px-3 py-1.5 text-[9px] font-bold tracking-[0.2em] uppercase bg-white/90 backdrop-blur-md text-foreground rounded-md shadow-sm",children:n.category})}),(0,b.jsxs)("div",{className:"mt-auto relative z-20 flex flex-col gap-4",children:[(0,b.jsx)(d.default,{href:`/article/${n.slug}`,className:"block",children:(0,b.jsx)("h2",{className:"text-2xl md:text-3xl lg:text-[2.25rem] font-serif font-bold text-white tracking-tight leading-tight hover:text-teal transition-colors",children:n.title})}),(0,b.jsx)("p",{className:"text-white/80 text-sm max-w-xl font-light line-clamp-2",children:n.excerpt}),(0,b.jsxs)("div",{className:"flex items-center gap-3 text-xs text-white/60 font-mono mt-2",children:[(0,b.jsx)("time",{children:(0,h.format)(new Date(n.date),"dd.MM.yyyy")}),(0,b.jsx)("span",{children:"•"}),(0,b.jsx)("span",{children:n.readingTime})]})]})]}),(0,b.jsxs)("div",{className:"lg:col-span-3 flex flex-col gap-6",children:[(0,b.jsxs)("div",{className:"flex-1 bg-card border border-border rounded-[2rem] p-6 flex flex-col justify-between relative overflow-hidden group min-h-[210px]",children:[(0,b.jsx)("div",{className:"absolute inset-0 bg-gradient-to-t from-black/80 via-black/2s to-black/10 z-10 pointer-events-none"}),(0,b.jsx)("img",{src:o.coverImage,alt:o.title,className:"absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"}),(0,b.jsx)("div",{className:"absolute top-4 left-4 z-20",children:(0,b.jsx)("span",{className:"px-2.5 py-1 text-[8px] font-bold tracking-[0.15em] uppercase bg-black text-white rounded-md",children:o.category})}),(0,b.jsxs)("div",{className:"mt-auto relative z-20 flex flex-col gap-2",children:[(0,b.jsx)(d.default,{href:`/article/${o.slug}`,className:"block",children:(0,b.jsx)("h3",{className:"text-base font-bold text-white leading-snug tracking-tight hover:text-teal transition-colors line-clamp-2",children:o.title})}),(0,b.jsx)("time",{className:"text-[9px] text-white/60 tracking-tight font-mono",children:(0,h.format)(new Date(o.date),"dd.MM.yyyy")})]})]}),(0,b.jsxs)("div",{className:"flex-1 bg-card border border-border rounded-[2rem] p-6 flex flex-col justify-between relative overflow-hidden group min-h-[210px]",children:[(0,b.jsx)("div",{className:"absolute inset-0 bg-gradient-to-t from-black/80 via-black/2s to-black/10 z-10 pointer-events-none"}),(0,b.jsx)("img",{src:p.coverImage,alt:p.title,className:"absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"}),(0,b.jsx)("div",{className:"absolute top-4 left-4 z-20",children:(0,b.jsx)("span",{className:"px-2.5 py-1 text-[8px] font-bold tracking-[0.15em] uppercase bg-black text-white rounded-md",children:p.category})}),(0,b.jsxs)("div",{className:"mt-auto relative z-20 flex flex-col gap-2",children:[(0,b.jsx)(d.default,{href:`/article/${p.slug}`,className:"block",children:(0,b.jsx)("h3",{className:"text-base font-bold text-white leading-snug tracking-tight hover:text-teal transition-colors line-clamp-2",children:p.title})}),(0,b.jsx)("time",{className:"text-[9px] text-white/60 tracking-tight font-mono",children:(0,h.format)(new Date(p.date),"dd.MM.yyyy")})]})]})]})]}),(0,b.jsxs)("footer",{className:"w-full bg-[#fcf9f2] dark:bg-card/40 border border-border rounded-[2.5rem] p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center justify-between shadow-sm mt-8",children:[(0,b.jsxs)("div",{className:"flex flex-col gap-2 max-w-xl text-center md:text-left",children:[(0,b.jsx)("h3",{className:"font-serif text-2xl font-black text-foreground",children:"Subscribe to Surya's Dispatch"}),(0,b.jsx)("p",{className:"text-sm text-muted-foreground leading-relaxed",children:"Receive high-signal insights on agentic system architectures and zero-trust security directly to your inbox. No tracking or algorithmic spam."})]}),(0,b.jsxs)("form",{className:"flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0",onSubmit:a=>a.preventDefault(),children:[(0,b.jsx)("input",{type:"email",placeholder:"Enter private email",className:"bg-background border border-border rounded-full px-5 py-3 text-xs w-full sm:w-[280px] focus:outline-none focus:border-teal transition-colors shadow-sm"}),(0,b.jsx)("button",{className:"bg-foreground text-background text-xs font-bold px-6 py-3 rounded-full hover:bg-foreground/90 active:scale-95 transition-all shadow-sm shrink-0",children:"Join the protocol"})]})]})]})}],40777)}];

//# sourceMappingURL=src_0~escdn._.js.map