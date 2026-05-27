import { AUTHOR_VASUDEV } from "./author";

export const post = {
  id: "16",
  slug: "how-to-install-ollama",
  title: "How to Install Ollama on Windows, Linux, and Mac (Step-by-Step 2026)",
  excerpt: "A complete guide to installing Ollama on every major platform, pulling your first model, and using its REST API for local AI development.",
  content: `
# How to Install Ollama on Windows, Linux, and Mac (Step-by-Step 2026)

Ollama has become the standard tool for running local LLMs. It wraps llama.cpp, handles model downloads, quantization, GPU acceleration, and exposes a clean REST API—all in a single binary. Whether you're a beginner who wants to chat with Llama 3 or a developer building AI-powered apps, Ollama is the fastest way to get started.

In this guide, I'll walk through installing Ollama on **Windows**, **macOS**, and **Linux**, then show you how to pull models, use the API, create custom Modelfiles, and troubleshoot common issues.

## What is Ollama?

Ollama is a lightweight, open-source tool that lets you run large language models locally. It handles:

- **Model management**: Download, list, and remove models with simple commands
- **GPU acceleration**: Automatically detects NVIDIA CUDA, AMD ROCm, and Apple Metal
- **REST API**: Provides an OpenAI-compatible API at \`localhost:11434\`
- **Modelfiles**: Customize model parameters, system prompts, and templates
- **Multi-model serving**: Run multiple models simultaneously

Under the hood, Ollama uses \`llama.cpp\` for inference, which means it supports GGUF-quantized models and runs efficiently on CPU as well as GPU.

## Prerequisites

Before installing, check that your system meets these requirements:

- **Minimum RAM**: 8GB (16GB recommended for 7B models)
- **Storage**: 5-50GB free (models range from 800MB to 40GB)
- **OS**: Windows 10+, macOS 12+, or a modern Linux distribution
- **Internet**: Required for downloading models

GPU is optional but recommended. Ollama works on CPU-only machines, just slower.

## Installing on Windows

### Method 1: Direct Installer (Simplest)

1. Go to [ollama.com](https://ollama.com)
2. Click **Download for Windows**
3. Run the installer (\`OllamaSetup.exe\`)
4. Ollama runs as a background service—you'll see the llama icon in your system tray

To verify installation:

\`\`\`powershell
ollama --version
# Should output something like: ollama version 0.5.7
\`\`\`

### Method 2: Using WSL2 (For Development)

If you're a developer who wants Linux-native performance and better file system integration, install via WSL2:

\`\`\`powershell
# Step 1: Install WSL2
wsl --install -d Ubuntu

# Step 2: Restart your PC, then open Ubuntu from Start Menu

# Step 3: Inside WSL, install Ollama
curl -fsSL https://ollama.com/install.sh | sh
\`\`\`

Running Ollama in WSL2 gives you native Linux performance and the ability to use GPU passthrough if you have an NVIDIA card.

## Installing on macOS

Ollama supports both Intel and Apple Silicon (M1/M2/M3/M4) Macs.

### Method 1: Homebrew (Recommended)

\`\`\`bash
brew install ollama
\`\`\`

Then start the service:

\`\`\`bash
brew services start ollama
\`\`\`

### Method 2: Direct Download

Download the macOS app from [ollama.com](https://ollama.com) and drag it to your Applications folder.

### Apple Silicon Optimization

Ollama automatically uses Apple's Metal framework on M-series chips. This means 7B models run at 30-50 tokens per second on an M1 Pro—faster than many NVIDIA GPUs. You don't need to configure anything.

## Installing on Linux

### Ubuntu / Debian

\`\`\`bash
curl -fsSL https://ollama.com/install.sh | sh
\`\`\`

This script detects your OS, adds the Ollama apt repository, and installs the package.

### Fedora / RHEL

\`\`\`bash
sudo dnf install https://ollama.com/rpm/ollama.repo
sudo dnf install ollama
\`\`\`

### Arch Linux

\`\`\`bash
yay -S ollama
# or
paru -S ollama
\`\`\`

### Start the Service

\`\`\`bash
sudo systemctl start ollama
sudo systemctl enable ollama  # Start on boot
\`\`\`

## First Steps: Pull and Run a Model

Once Ollama is installed, let's pull and run your first model:

\`\`\`bash
# Pull Llama 3.2 3B (runs on 8GB RAM)
ollama pull llama3.2:3b

# Run it interactively
ollama run llama3.2:3b
\`\`\`

You'll see a prompt where you can start chatting:

\`\`\`
>>> What is the capital of France?
The capital of France is Paris.

>>> Send a message (/? for help)
\`\`\`

To exit, type \`/bye\` or press Ctrl+D.

### Popular Models to Try

\`\`\`bash
# Small & fast (1-3GB RAM)
ollama pull tinyllama
ollama pull phi3:3.8b
ollama pull qwen2.5:1.5b

# Medium (6-8GB RAM)
ollama pull llama3.2:3b
ollama pull gemma2:9b
ollama pull qwen2.5:7b

# Large (16GB+ RAM)
ollama pull llama3.1:8b
ollama pull mistral:7b
ollama pull mixtral:8x7b
\`\`\`

## Using the REST API

Ollama exposes an HTTP API at \`http://localhost:11434\`. This is how you integrate local AI into your applications.

### Generate a Completion

\`\`\`bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2:3b",
  "prompt": "Why is the sky blue?",
  "stream": false
}'
\`\`\`

### Chat Completion (OpenAI-compatible)

\`\`\`bash
curl http://localhost:11434/v1/chat/completions -d '{
  "model": "llama3.2:3b",
  "messages": [
    {"role": "user", "content": "Hello, who are you?"}
  ],
  "stream": false
}'
\`\`\`

This means you can use the OpenAI JavaScript/Python SDK with Ollama by simply changing the base URL:

\`\`\`typescript
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'http://localhost:11434/v1',
  apiKey: 'ollama',  // Can be any string
});

const response = await client.chat.completions.create({
  model: 'llama3.2:3b',
  messages: [{ role: 'user', content: 'Hello!' }],
});

console.log(response.choices[0].message.content);
\`\`\`

### List Models

\`\`\`bash
curl http://localhost:11434/api/tags
\`\`\`

## Creating Custom Modelfiles

Modelfiles let you customize a model's behavior, system prompt, and parameters.

\`\`\`dockerfile
# Modelfile
FROM llama3.2:3b

# Set the system prompt
SYSTEM """You are an expert Python developer. You write clean, well-documented code. You explain your reasoning briefly before providing code."""

# Adjust parameters
PARAMETER temperature 0.3
PARAMETER top_p 0.9
PARAMETER stop "</s>"
\`\`\`

Build and run it:

\`\`\`bash
ollama create python-assistant -f ./Modelfile
ollama run python-assistant
\`\`\`

## Troubleshooting Common Issues

### Out of Memory (OOM)

If Ollama crashes or you get an error about memory:

\`\`\`bash
# Check how much RAM is available
free -h  # Linux
wmic OS get TotalVisibleMemorySize  # Windows

# Try a smaller model
ollama pull tinyllama  # 1.1B, ~800MB RAM

# Or restrict context length
ollama run llama3.2:3b --num-ctx 1024
\`\`\`

### Slow Inference

Slow generation is usually due to CPU-only inference:

\`\`\`bash
# Check if GPU is being used
ollama ps

# On Linux, check GPU memory
nvidia-smi  # NVIDIA
rocm-smi    # AMD

# Force CPU-only if GPU is causing issues
OLLAMA_INTEL_GPU=0 ollama run llama3.2:3b
\`\`\`

### Port Already in Use

If port 11434 is occupied:

\`\`\`bash
# Change the port
OLLAMA_HOST=0.0.0.0:11435 ollama serve
\`\`\`

### Windows-Specific Issues

- **Antivirus blocking**: Add Ollama to your antivirus exclusions
- **WSL2 not detected**: Run \`wsl --set-default-version 2\` before installing
- **GPU not detected**: Install NVIDIA CUDA Toolkit or rely on CPU mode

## Ollama vs LM Studio vs GPT4All

You might wonder which local AI tool to use. Here's a quick comparison:

| Feature | Ollama | LM Studio | GPT4All |
|---------|--------|-----------|---------|
| Setup | CLI | GUI | GUI |
| REST API | Built-in | Built-in | Limited |
| GPU support | CUDA, Metal, ROCm | CUDA, Metal, ROCm | CPU only (mostly) |
| Modelfiles | Yes | No | No |
| Model library | 100+ | 100+ | 50+ |
| Best for | Developers | General users | Privacy enthusiasts |

**Choose Ollama if**: You're a developer who needs a CLI-friendly tool with a powerful API and custom model configurations.

**Choose LM Studio if**: You prefer a graphical interface and want to download/configure models with point-and-click simplicity.

**Choose GPT4All if**: You want the simplest possible local chat experience and don't need an API.

## Conclusion

Ollama transforms local AI from a complicated setup process into a single command. Whether you're on Windows, macOS, or Linux, you can be running a state-of-the-art language model within minutes.

The ecosystem keeps expanding—new models are published as GGUF files daily, and Ollama's Modelfile system means you can customize any model without recompiling. Install it today, pull a model, and start building the next generation of privacy-first, offline AI applications.
  `,
  coverImage: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1200&auto=format&fit=crop",
  date: "2026-05-26",
  readingTime: "11 min read",
  category: "Artificial Intelligence",
  tags: ["Ollama", "Local AI", "LLM", "Setup"],
  author: AUTHOR_VASUDEV
};
