import { AUTHOR_VASUDEV } from "./author";

export const post = {
  id: "25",
  slug: "gemini-api-free-guide",
  title: "How to Use Google's Gemini API for Free in 2026",
  excerpt: "Google's Gemini API offers generous free tier access. Here is how to use it for text, vision, embeddings, and more.",
  content: `
# How to Use Google's Gemini API for Free in 2026

Google's Gemini API is one of the most developer-friendly AI APIs available today, especially because it offers a genuinely useful free tier. Unlike some competitors that throttle free users to near-uselessness, Gemini's free tier is powerful enough to build real applications.

This guide covers everything: getting started, text and streaming generation, vision, function calling, embeddings, context caching, building RAG, and production tips.

## Free Tier Limits

As of May 2026, here is what the Gemini API free tier offers:

### Rate Limits
| Model | Requests per minute | Requests per day | Tokens per request |
|-------|-------------------|------------------|-------------------|
| Gemini 1.5 Flash | 30 RPM | 1,500 RPD | 1M context, 8K output |
| Gemini 1.5 Pro | 10 RPM | 400 RPD | 1M context, 8K output |
| Gemini 1.5 Flash-8B | 60 RPM | 3,000 RPD | 1M context, 8K output |
| Text Embedding | 30 RPM | 1,500 RPD | 2K input tokens |

### Models Available for Free
- **Gemini 1.5 Flash** — Best all-rounder. Fast, cheap, supports multimodal.
- **Gemini 1.5 Flash-8B** — An 8B parameter distilled model, great for simple tasks.
- **Gemini 1.5 Pro** — Slower but smarter, good for complex reasoning.
- **Text Embedding 004** — 768-dimensional embeddings for semantic search.
- **Gemini 2.0 Flash** (limited free quota) — Newer model with native tool use and code execution.

### What is NOT free
- Batch API (50% discount but requires billing)
- Fine-tuning
- Model tuning via Distillation
- Online caching (free tier has lower cache limits)

## Getting Your API Key

The easiest way to get started:

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key — it starts with \`AIza...\`

You can also create keys restricted to specific APIs in the Google Cloud Console if you want tighter security.

## Installation

The official Google AI SDK for TypeScript/JavaScript is \`@google/genai\`:

npm install @google/genai

## Text Generation: The Basics

Here is the simplest possible usage:

import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });

async function main() {
  const response = await genAI.models.generateContent({
    model: "gemini-1.5-flash",
    contents: "Explain the transformer architecture in one paragraph.",
  });
  console.log(response.text);
}

main();

### Streaming for Real-Time Output

For chat applications or long documents, streaming is essential:

import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });

async function streamTest() {
  const stream = await genAI.models.generateContentStream({
    model: "gemini-1.5-flash",
    contents: "Write a short story about a robot learning to paint.",
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.text ?? "");
  }
}

streamTest();

The streaming API returns an async iterable. Each chunk contains a \`text\` field when content is available. Note that chunks may be empty (the model needs to think between tokens).

## System Instructions

You can guide the model's behavior with system instructions:

const response = await genAI.models.generateContent({
  model: "gemini-1.5-flash",
  contents: "What is the capital of France?",
  config: {
    systemInstruction: "You are a geography teacher. Answer concisely and include a fun fact.",
  },
});

## Vision: Understanding Images

Gemini is multimodal. You can pass images as base64 strings or inline data:

import fs from "node:fs";
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });

async function visionTest() {
  const imagePath = "receipt.jpg";
  const imageData = fs.readFileSync(imagePath);
  const base64Image = imageData.toString("base64");

  const response = await genAI.models.generateContent({
    model: "gemini-1.5-flash",
    contents: [
      { text: "Extract all line items, prices, and the total from this receipt." },
      { inlineData: { mimeType: "image/jpeg", data: base64Image } },
    ],
  });

  console.log(response.text);
}

visionTest();

The \`inlineData\` field accepts:
- \`mimeType\`: image/jpeg, image/png, image/webp, image/gif (animated too)
- \`data\`: Base64-encoded binary

You can also pass multiple images in a single request, and the model can reason across them (e.g., "Find the differences between these two images").

## Function Calling / Tool Use

Gemini supports function calling (what the industry now calls "tool use"). This lets the model request specific function invocations, and you execute them:

const genAI = new GoogleGenAI({ apiKey });

const getWeather = {
  name: "get_weather",
  description: "Get the current weather for a location",
  parameters: {
    type: "OBJECT",
    properties: {
      location: { type: "STRING", description: "City and state/country" },
      unit: { type: "STRING", enum: ["celsius", "fahrenheit"] },
    },
    required: ["location"],
  },
};

async function functionCallTest() {
  const response = await genAI.models.generateContent({
    model: "gemini-1.5-flash",
    contents: "What is the weather in Mumbai?",
    config: {
      tools: [{ functionDeclarations: [getWeather] }],
    },
  });

  // Check if model wants to call a function
  const toolCall = response.candidates?.[0]?.content?.parts?.[0]?.functionCall;
  if (toolCall) {
    console.log("Function to call:", toolCall.name);
    console.log("Arguments:", JSON.stringify(toolCall.args));
    // Execute the function and return results in a follow-up call
  }
}

functionCallTest();

After receiving a function call request, you execute the function and send the result back in a follow-up turn. This is how you build agents that can query databases, send emails, or control APIs.

## Embeddings

Text embeddings convert text into vector representations for semantic search and clustering:

const genAI = new GoogleGenAI({ apiKey });

async function embeddingTest() {
  const result = await genAI.models.embedContent({
    model: "text-embedding-004",
    contents: "What is the meaning of life?",
  });

  console.log("Embedding dimensions:", result.embedding.values.length);
  console.log("First 5 values:", result.embedding.values.slice(0, 5));
}

embeddingTest();

Embeddings are 768-dimensional vectors. You can use them to:
- Build a semantic search engine (compare cosine similarity)
- Cluster documents
- Classify text
- Power retrieval-augmented generation (RAG) pipelines

## Context Caching

If you have a large document or system prompt that rarely changes, context caching reduces costs and latency:

// Currently available on paid tier only, but worth knowing for when you scale
const cache = await genAI.caches.create({
  model: "models/gemini-1.5-flash-001",
  contents: [
    { role: "user", parts: [{ text: veryLongDocument ] } },
  ],
  ttl: "3600s", // cache lives for 1 hour
});

const response = await genAI.models.generateContent({
  model: "gemini-1.5-flash",
  contents: "Summarize the document.",
  cachedContent: cache.name,
});

Context caching is essential for production use cases where you have shared knowledge bases, codebases, or documentation.

## Building a Simple RAG System with Gemini

Here is a complete minimal RAG implementation using Gemini embeddings and generation:

import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });

const documents = [
  "Gemini 1.5 Flash supports up to 1M tokens of context.",
  "The free tier allows 30 requests per minute for Flash models.",
  "Function calling lets Gemini invoke external APIs.",
  "Embeddings convert text into 768-dimensional vectors.",
];

async function search(query: string): Promise<string> {
  const queryEmbedding = await genAI.models.embedContent({
    model: "text-embedding-004",
    contents: query,
  });

  const docEmbeddings = await Promise.all(
    documents.map((doc) =>
      genAI.models.embedContent({
        model: "text-embedding-004",
        contents: doc,
      })
    )
  );

  // Simple cosine similarity
  const qVec = queryEmbedding.embedding.values;
  const similarities = docEmbeddings.map((emb, i) => ({
    index: i,
    score: cosineSimilarity(qVec, emb.embedding.values),
  }));

  similarities.sort((a, b) => b.score - a.score);
  return documents[similarities[0].index];
}

function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
}

async function ragQuery(question: string) {
  const context = await search(question);
  const response = await genAI.models.generateContent({
    model: "gemini-1.5-flash",
    contents: \`Answer the question based on this context:\n\nContext: \${context}\n\nQuestion: \${question}\`,
  });
  console.log(response.text);
}

ragQuery("What are the rate limits for Flash?");

## Comparing Gemini with Alternatives

| Feature | Gemini 1.5 Flash | GPT-4o mini | Claude 3 Haiku | Local (Llama 3) |
|---------|-----------------|-------------|----------------|-----------------|
| Free tier | Yes (30 RPM) | Yes (3 RPM) | No | Yes (free hardware) |
| Cost (paid) | $0.075/1M in | $0.15/1M in | $0.25/1M in | Free |
| Context window | 1M tokens | 128K tokens | 200K tokens | Depends on hardware |
| Multimodal | Yes | Yes | Yes | Limited |
| Speed | Very fast | Fast | Fastest | GPU-dependent |
| Rate limit (free) | 30 RPM | 3 RPM | N/A | No limit |

Gemini's free tier is the most generous among major cloud AI providers. The 1M context window is unmatched by any competitor at any price point.

## Production Tips

When moving from prototype to production:

### Fallback Logic
Always implement a fallback chain:

async function generateWithFallback(prompt: string) {
  try {
    return await callGemini(prompt);
  } catch (err) {
    if (err.status === 429) {
      await sleep(2000);
      return await callGemini(prompt); // retry
    }
    return await callOpenAI(prompt); // fallback to another provider
  }
}

### Rate Limiting
The free tier's 30 RPM sounds generous but you will hit it. Implement a token bucket limiter:

class RateLimiter {
  private tokens: number;
  private lastRefill: number;

  constructor(private maxTokens: number, private refillMs: number) {
    this.tokens = maxTokens;
    this.lastRefill = Date.now();
  }

  async acquire(): Promise<void> {
    this.refill();
    if (this.tokens <= 0) {
      await sleep(this.refillMs);
      this.refill();
    }
    this.tokens--;
  }

  private refill() {
    const now = Date.now();
    const elapsed = now - this.lastRefill;
    this.tokens = Math.min(this.maxTokens, this.tokens + elapsed / this.refillMs);
    this.lastRefill = now;
  }
}

### Error Handling
Common Gemini API errors:
- **429**: Rate limit exceeded — back off and retry
- **400**: Invalid request — check your prompt format
- **403**: API key restricted or quota exhausted
- **500**: Google-side issue — retry with exponential backoff
- **503**: Model overloaded — switch to a different model

### Billing
Even though the free tier is generous, set a budget alert ($0) on the Google Cloud Console so you are never surprised by a bill. The API is pay-as-you-go and things like pro model calls and high-volume usage add up fast.

## Conclusion

The Gemini API free tier is genuinely useful for building real applications. With 30 RPM on Flash, support for images, function calling, and a 1M token context window, you can build sophisticated AI features without spending a dime.

Start with Flash for most tasks, upgrade to Pro when you need deeper reasoning, and use embeddings for your RAG pipelines. The \`@google/genai\` SDK makes all of this straightforward from TypeScript.

The best part? If you outgrow the free tier, the paid pricing is still cheaper than OpenAI for most workloads. Google is playing the long game with Gemini, and developers are the winners.
  `,
  coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
  date: "2026-05-27",
  readingTime: "14 min read",
  category: "Artificial Intelligence",
  tags: ["Gemini", "Google AI", "API", "Free Tier", "Tutorial"],
  author: AUTHOR_VASUDEV
};
