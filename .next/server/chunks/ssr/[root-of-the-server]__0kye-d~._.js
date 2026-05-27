module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},71306,(a,b,c)=>{b.exports=a.r(18622)},79847,a=>{a.n(a.i(3343))},9185,a=>{a.n(a.i(29432))},72842,a=>{a.n(a.i(75164))},54897,a=>{a.n(a.i(30106))},56157,a=>{a.n(a.i(18970))},94331,a=>{a.n(a.i(60644))},15988,a=>{a.n(a.i(56952))},25766,a=>{a.n(a.i(77341))},29725,a=>{a.n(a.i(94290))},90833,a=>{a.n(a.i(46994))},5785,a=>{a.n(a.i(90588))},74793,a=>{a.n(a.i(33169))},85826,a=>{a.n(a.i(37111))},21565,a=>{a.n(a.i(41763))},65911,a=>{a.n(a.i(8950))},25128,a=>{a.n(a.i(91562))},40781,a=>{a.n(a.i(49670))},69411,a=>{a.n(a.i(75700))},63081,a=>{a.n(a.i(276))},62837,a=>{a.n(a.i(40795))},34607,a=>{a.n(a.i(11614))},96338,a=>{a.n(a.i(21751))},50642,a=>{a.n(a.i(12213))},32242,a=>{a.n(a.i(22693))},88530,a=>{a.n(a.i(10531))},8583,a=>{a.n(a.i(1082))},38534,a=>{a.n(a.i(98175))},70408,a=>{a.n(a.i(9095))},22922,a=>{a.n(a.i(96772))},78294,a=>{a.n(a.i(71717))},16625,a=>{a.n(a.i(85034))},88648,a=>{a.n(a.i(63444))},51914,a=>{a.n(a.i(66482))},25466,a=>{a.n(a.i(91505))},28276,a=>{"use strict";let b={name:"Surya Pratap Singh",avatar:"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",role:"AI Engineer & Founder"},c=[{id:"1",slug:"build-offline-ai-assistant-lm-studio",title:"How to Build an Offline AI Assistant Using LM Studio",excerpt:"Learn how to set up, configure, and use LM Studio to run powerful open-source LLMs entirely offline on your local machine.",content:`
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
    `,coverImage:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",date:"2026-04-05",readingTime:"4 min read",category:"Artificial Intelligence",tags:["Students","Productivity","Free Tools"],author:b}],d=Array.from(new Set(c.map(a=>a.category)));a.s(["categories",0,d,"posts",0,c])},95927,a=>{"use strict";a.s(["CategoriesContent",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call CategoriesContent() from the server but CategoriesContent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/CategoriesContent.tsx <module evaluation>","CategoriesContent")},6234,a=>{"use strict";a.s(["CategoriesContent",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call CategoriesContent() from the server but CategoriesContent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/CategoriesContent.tsx","CategoriesContent")},35583,a=>{"use strict";a.i(95927);var b=a.i(6234);a.n(b)},39710,a=>{"use strict";var b=a.i(7997),c=a.i(28276),d=a.i(35583),e=a.i(717);a.s(["default",0,function(){return(0,b.jsx)(e.Suspense,{fallback:(0,b.jsx)("div",{className:"p-24 text-center text-muted-foreground",children:"Loading specific sector..."}),children:(0,b.jsx)(d.CategoriesContent,{posts:c.posts})})},"metadata",0,{title:"Categories",description:"Explore articles by topic: Artificial Intelligence, Android Customization, Developer Tools, and more."}])},58937,a=>{a.n(a.i(39710))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0kye-d~._.js.map