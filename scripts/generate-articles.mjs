import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SITE_CONTEXT = `You are writing for Vasudev AI Chronicles, a premium developer blog about AI, local LLMs, Android customization, developer tools, and performance optimization. The author is Surya Pratap Singh, an AI Engineer & Founder.`;

function articlePrompt(title, keyword, audience, outline) {
  return `${SITE_CONTEXT}

Write a comprehensive, in-depth technical article with the following specifications:

TITLE: ${title}
PRIMARY SEO KEYWORD: ${keyword}
TARGET AUDIENCE: ${audience}
WORD COUNT: 1800-2500 words

REQUIREMENTS:
- Start with a strong hook explaining why this matters
- Use markdown formatting with proper heading hierarchy (## and ###)
- Include 3-5 code examples or terminal commands where relevant
- Add a "Common Issues / Troubleshooting" section
- Add a "Why This Matters" or "Real-World Use Case" section
- End with a conclusion and call to action
- Write in first-person as a developer sharing experience
- Use technical but accessible language
- Include specific version numbers, benchmarks, or configuration details

OUTLINE TO FOLLOW:
${outline}

OUTPUT ONLY the article markdown content. No preamble or explanation.`;
}

const articles = [
  // --- EXPANSIONS (existing articles 2,3,4,5,6,7,11,12) ---
  {
    file: "running-ai-completely-offline",
    type: "expand",
    title: "Running AI Completely Offline in 2026",
    keyword: "offline AI 2026 edge computing",
    audience: "Developers considering local LLM deployment",
    outline: `## The Hardware Revolution (UMA, Apple Silicon, dedicated NPUs)
## Software Stack for Offline AI (Ollama, LM Studio, llama.cpp)
## Model Selection for Offline Use (7B vs 13B vs 70B tradeoffs)
## Quantization Explained (GGUF, Q4_K_M, IQ4_XS)
## Performance Benchmarks (tokens/sec on various hardware)
## Security & Privacy Advantages
## Common Issues (VRAM limits, thermal throttling, hotplugging models)
## Real-World Use Case: Air-gapped coding assistant`,
  },
  {
    file: "phi-3-vs-llama-3-local-ai",
    type: "expand",
    title: "Phi-3 vs Llama 3 for Local AI: Developer Benchmark 2026",
    keyword: "phi-3 vs llama 3 benchmark local AI",
    audience: "Developers choosing between small language models",
    outline: `## Architectural Comparison (attention mechanisms, context windows)
## Hardware Requirements (VRAM, RAM, CPU vs GPU inference)
## Benchmark: Code Generation (React, Python, Rust)
## Benchmark: Logical Reasoning (GSM8K, ARC)
## Benchmark: Instruction Following
## Benchmark: Speed (tokens/sec on consumer hardware)
## When to Choose Phi-3 (edge devices, background agents)
## When to Choose Llama 3 (general chat, complex reasoning)
## Quantization Impact on Both Models
## Verdict: Decision Matrix`,
  },
  {
    file: "android-performance-optimization-guide",
    type: "expand",
    title: "Android Performance Optimization Guide: From Lag to Silk",
    keyword: "android performance optimization developer options",
    audience: "Android power users and developers",
    outline: `## Understanding Android's Memory Management
## Developer Options Deep Dive (background limits, cached apps)
## Animation Scaling (0.5x trick explained with benchmarks)
## GPU Rendering (Force MSAA, HW overlays, profile GPU rendering)
## Kernel Governors and I/O Schedulers
## Bloatware Removal (ADB uninstall commands)
## Thermal Throttling Mitigation
## Storage Performance (UFS vs eMMC, fstrim)
## Battery Optimization vs Performance Tradeoffs
## Custom Kernel Recommendations`,
  },
  {
    file: "best-android-roms-for-performance",
    type: "expand",
    title: "Best Android ROMs for Performance in 2026",
    keyword: "best android custom roms performance 2026",
    audience: "Android enthusiasts looking to flash custom ROMs",
    outline: `## The State of Custom ROMs in 2026
## LineageOS (stability, AOSP purity, supported devices)
## Paranoid Android / AOSPA (CAF optimization for Snapdragon)
## CrDroid (feature-rich, performance tuned)
## PixelOS (Pixel experience optimized)
## Project Elixir (minimal, performance-first)
## How to Choose Based on Your Device
## Installation Guide (bootloader unlock, recovery, flashing)
## Performance Benchmarks (stock vs custom ROM)
## Battery Life Comparison
## Risks and Warranty Considerations`,
  },
  {
    file: "how-to-debloat-windows-for-developers",
    type: "expand",
    title: "How to Debloat Windows 11 for Developers in 2026",
    keyword: "debloat windows 11 developer performance",
    audience: "Software developers on Windows",
    outline: `## Why Windows Bloat Hurts Development
## Chris Titus Windows Utility (Step-by-step with screenshots)
## Manual Debloating via PowerShell (Remove-AppxPackage commands)
## Services to Disable (SysMain, Xbox services, telemetry)
## Group Policy Tweaks for Privacy
## Registry Optimizations for NVMe and RAM
## WSL2 Performance After Debloating
## Gaming vs Development Presets
## Maintenance (what to re-run monthly)
## Benchmark Before/After (boot time, memory usage, Docker performance)`,
  },
  {
    file: "best-tools-for-power-users",
    type: "expand",
    title: "Best Tools for Power Users in 2026",
    keyword: "best power user tools productivity 2026",
    audience: "Developers and tech enthusiasts",
    outline: `## PowerToys (FancyZones, PowerRename, Keyboard Manager)
## Raycast (extensions, script commands, clipboard history)
## Obsidian (plugins, graph view, local-first knowledge management)
## Espanso (cross-platform text expansion, custom triggers)
## Warp / WezTerm (modern terminal emulators)
## 1Password / Bitwarden (password management workflow)
## DevToys (all-in-one developer utilities)
## AutoHotkey v2 (Windows automation scripts)
## Setting Up a Coherent Power User Workflow
## Automation Examples (daily routines, git workflows)`,
  },
  {
    file: "how-to-make-local-chatgpt-clone",
    type: "expand",
    title: "How to Build a Local ChatGPT Clone with Next.js and LM Studio",
    keyword: "build local chatgpt clone nextjs",
    audience: "Developers wanting private AI chat interfaces",
    outline: `## Architecture Overview (Next.js Frontend + Local LLM Backend)
## Setting Up LM Studio as an OpenAI-Compatible API Server
## Next.js App Router Setup
## Building the Chat UI with Tailwind CSS
## Implementing Streaming Responses (Server-Sent Events)
## Adding Conversation History
## Model Switching (dropdown to change local models)
## System Prompt Configuration
## Performance Optimization (caching, context window management)
## Deployment Options (local-only vs LAN access)
## Comparison with Vercel AI SDK approach`,
  },
  {
    file: "best-open-source-ai-models-low-end",
    type: "expand",
    title: "Best Open Source AI Models for Low-End PCs and Laptops",
    keyword: "open source ai models low end pc budget",
    audience: "Students and developers with budget hardware",
    outline: `## Understanding Model Sizes (parameters, quantization, RAM needs)
## Qwen 2.5 (0.5B and 1.5B) - Multilingual Power on a Potato
## Gemma 2 2B - Google's Lightweight Champion
## TinyLlama 1.1B - The Classic Budget Model
## Phi-3 Mini 3.8B - Best Quality-to-Size Ratio
## Llama 3.2 3B - Meta's Latest Small Model
## Running via Ollama (one-command setup)
## Running via LM Studio (GUI-based, beginner friendly)
## Running via llama.cpp (maximum control, minimal overhead)
## Real Performance Data (tokens/sec on 4GB, 8GB, 16GB RAM)
## Choosing the Right Model for Your Task`,
  },

  // --- NEW ARTICLES (13-23) ---
  {
    file: "how-to-install-ollama",
    type: "new",
    title: "How to Install Ollama on Windows, Linux, and Mac (Step-by-Step 2026)",
    keyword: "install ollama windows linux mac",
    audience: "Beginners setting up local LLMs for the first time",
    outline: `## What is Ollama and Why Use It?
## Prerequisites (hardware requirements, OS versions)
## Installation on Windows (WSL2 setup, Docker vs direct)
## Installation on macOS (Homebrew vs direct download)
## Installation on Linux (package managers, manual install)
## First Steps: Pulling Your First Model
## Running Models via CLI
## Ollama REST API (using with curl, Python, Node.js)
## Managing Models (list, remove, update)
## Custom Modelfiles (GGUF imports, parameter tuning)
## Troubleshooting (OOM errors, slow inference, connection refused)
## Ollama vs LM Studio vs GPT4All: Quick Comparison`,
  },
  {
    file: "lm-studio-vs-ollama-vs-gpt4all",
    type: "new",
    title: "LM Studio vs Ollama vs GPT4All: Complete Comparison 2026",
    keyword: "lm studio vs ollama vs gpt4all comparison",
    audience: "Developers choosing a local LLM platform",
    outline: `## Quick Overview of Each Platform
## Installation Experience
## Model Discovery and Download
## API Compatibility (OpenAI API standard)
## Performance Benchmarks
## GPU Acceleration Support (CUDA, Metal, ROCm, Vulkan)
## User Interface Quality
## Command-Line vs GUI Preference
## Use Case Matching (chat, development, background agents)
## Community and Ecosystem
## Pricing (all are free but with different constraints)
## Decision Matrix and Recommendation`,
  },
  {
    file: "fine-tuning-llama-3",
    type: "new",
    title: "Fine-Tuning Llama 3 on Custom Data: A Beginner's Guide",
    keyword: "fine tune llama 3 custom data guide",
    audience: "Intermediate developers wanting to customize LLMs",
    outline: `## Understanding Fine-Tuning vs RAG vs Prompt Engineering
## Prerequisites (hardware, Python environment, dataset format)
## Dataset Preparation (JSONL format, conversation templates)
## Using Unsloth for Efficient Fine-Tuning
## LoRA vs QLoRA vs Full Fine-Tuning
## Training Configuration (learning rate, epochs, batch size)
## Running the Training Script
## Evaluating Your Fine-Tuned Model
## Converting and Quantizing (GGUF export)
## Running Your Fine-Tuned Model (Ollama, LM Studio, llama.cpp)
## Common Issues (overfitting, catastrophic forgetting, OOM)
## Examples: Fine-Tuning for Code, Customer Support, Creative Writing`,
  },
  {
    file: "best-free-ai-tools-devs-2026",
    type: "new",
    title: "10 Best Free AI Tools for Developers in 2026",
    keyword: "best free ai tools developers 2026",
    audience: "Developers looking to enhance productivity with AI",
    outline: `## GitHub Copilot Free Tier
## Google Gemini API Free Tier
## Claude Free Tier (Haiku model)
## Perplexity Pro (research assistant)
## Cursor Free Tier
## Ollama (completely free, local)
## Continue.dev (open-source AI code assistant)
## TabNine Free
## Phind (developer search engine)
## OpenRouter (multi-model API with free credits)
## How to Combine These Tools for Maximum Productivity`,
  },
  {
    file: "wsl2-ai-development",
    type: "new",
    title: "How to Set Up WSL2 for AI Development on Windows",
    keyword: "wsl2 ai development setup windows",
    audience: "Windows developers moving into AI/ML",
    outline: `## Why WSL2 is Essential for Windows AI Development
## Installing WSL2 (requirements, commands, configuration)
## Setting Up CUDA in WSL2 (NVIDIA driver, CUDA toolkit)
## Installing Python ML Stack (PyTorch, TensorFlow, Jupyter)
## Setting Up Ollama in WSL2
## Docker Integration (NVIDIA Container Toolkit)
## VS Code Remote Development (WSL extension)
## File System Performance (/mnt vs \\\\wsl$)
## GPU Passthrough and Performance Benchmarks
## Common Issues (memory limits, network, display)
## Production-Ready WSL2 Configuration`,
  },
  {
    file: "vs-code-extensions-ai-devs",
    type: "new",
    title: "10 Must-Have VS Code Extensions for AI Developers in 2026",
    keyword: "vs code extensions ai developers",
    audience: "VS Code users building AI applications",
    outline: `## Continue.dev (open-source AI assistant with local models)
## GitHub Copilot Chat
## Cline (autonomous AI agent in VS Code)
## Jupyter (notebooks inside VS Code)
## Python + Pylance (best Python support)
## GitLens (git superpowers for AI projects)
## Error Lens (inline error highlighting)
## Prettier + ESLint (code quality automation)
## Thunder Client (API testing for LLM endpoints)
## Docker (container management for AI deployments)
## How to Configure Them Together for an AI-First Workflow`,
  },
  {
    file: "rag-system-langchain",
    type: "new",
    title: "Building a RAG System with LangChain and ChromaDB",
    keyword: "rag system langchain chromadb tutorial",
    audience: "Advanced developers building context-aware AI apps",
    outline: `## What is RAG and Why Use It?
## Architecture Overview (ingestion, retrieval, generation)
## Setting Up LangChain + ChromaDB
## Document Loading (PDFs, websites, code repos, markdown)
## Text Splitting Strategies (recursive, semantic, token-based)
## Embedding Models (local vs API-based)
## Vector Store Configuration (ChromaDB, FAISS, Pinecone)
## Retrieval Strategies (similarity search, MMR, hybrid)
## Prompt Templates for RAG
## Building a Chat Interface with RAG
## Evaluation (faithfulness, relevance, recall)
## Production Considerations (caching, monitoring, cost)`,
  },
  {
    file: "stable-diffusion-low-end-gpu",
    type: "new",
    title: "Stable Diffusion on a Low-End GPU: Complete Optimization Guide",
    keyword: "stable diffusion low end gpu optimization",
    audience: "Digital artists and developers with budget GPUs",
    outline: `## Minimum Requirements (VRAM, RAM, OS)
## Installation Options (Automatic1111, ComfyUI, Forge)
## Memory Optimization (--medvram, --lowvram, --xformers)
## Model Quantization (fp16 vs fp32, safetensors)
## Using SDXL on 4GB VRAM (tricks and tradeoffs)
## Tiny AutoEncoder for Speed
## LCM and Turbo Models (4-step generation)
## Batch Processing Strategies
## Hardware Upgrades That Actually Help (RAM > VRAM)
## Cloud Fallback (runpod, replicate for complex jobs)
## Benchmark Results (various GPUs compared)`,
  },
  {
    file: "linux-vs-windows-ai-development",
    type: "new",
    title: "Linux vs Windows for AI Development in 2026: Honest Comparison",
    keyword: "linux vs windows ai development comparison",
    audience: "Developers choosing their AI development OS",
    outline: `## GPU Support (NVIDIA CUDA, AMD ROCm)
## Package Management (apt vs winget vs conda)
## Docker and Containerization
## WSL2 as a Bridge (how well does it work?)
## Performance Benchmarks (training, inference, I/O)
## Development Tools and IDE Support
## Model Serving and Deployment
## Enterprise and Team Considerations
## Learning Curve
## Dual Boot vs VM vs WSL2 vs Native
## Verdict: Decision Guide Based on Your Hardware and Goals`,
  },
  {
    file: "gemini-api-free-guide",
    type: "new",
    title: "How to Use Google's Gemini API for Free in 2026",
    keyword: "google gemini api free tutorial",
    audience: "Developers wanting free AI API access",
    outline: `## Gemini API Free Tier Limits (rate limits, features, models)
## Getting Your API Key (Google AI Studio setup)
## Installation (npm install @google/genai)
## Text Generation (basic chat, streaming)
## Vision (image understanding, OCR, visual Q&A)
## Function Calling / Tool Use
## Embeddings
## Context Caching for Cost Optimization
## Building a Simple RAG with Gemini Embeddings
## Comparing with OpenAI, Claude, and Local Models
## Production Considerations (rate limiting, fallbacks)`,
  },
  {
    file: "automating-github-ai-agents",
    type: "new",
    title: "Automating GitHub Workflows with AI Agents",
    keyword: "ai agents github actions automation",
    audience: "DevOps engineers and developers automating workflows",
    outline: `## What are AI Agents for DevOps?
## Architecture (agent loop, tools, memory)
## Setting Up an AI Agent with GitHub Actions
## PR Review Automation (code review, tests, suggestions)
## Issue Triage and Labeling
## Automated Documentation Generation
## CI/CD Pipeline Monitoring and Remediation
## Using Local Models for Sensitive Codebases
## Tool Integration (Slack, Jira, Linear)
## Security Considerations (token permissions, sandboxing)
## Real-World Examples and Templates`,
  },
];

async function main() {
  console.log(`Starting generation of ${articles.length} articles...\n`);

  for (let i = 0; i < articles.length; i++) {
    const a = articles[i];
    console.log(`[${i+1}/${articles.length}] ${a.type === 'expand' ? 'EXPAND' : 'NEW'}   ${a.title}`);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: articlePrompt(a.title, a.keyword, a.audience, a.outline),
        config: {
          maxOutputTokens: 8192,
          temperature: 0.7,
        },
      });

      const content = response.text;
      if (!content) {
        console.log(`  ⚠️  Empty response, skipping`);
        continue;
      }

      // Write to a .md file for review, then we'll convert to .ts
      const filename = `scripts/output/${a.file}.md`;
      fs.mkdirSync("scripts/output", { recursive: true });
      fs.writeFileSync(filename, content);
      console.log(`  ✅ Wrote ${filename} (${content.length} chars)`);
    } catch (err) {
      console.log(`  ❌ Error: ${err.message}`);
    }
  }

  console.log("\nDone! All articles generated.");
}

main().catch(console.error);
