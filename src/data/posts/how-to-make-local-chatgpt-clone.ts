import { AUTHOR_VASUDEV } from "./author";

export const post = {
  id: "11",
  slug: "how-to-make-local-chatgpt-clone",
  title: "How to Build a Local ChatGPT Clone with Next.js and LM Studio",
  excerpt: "Ditch subscription fees. Build your own conversational interface using Next.js, Tailwind, and local models with full streaming support.",
  content: `
# How to Build a Local ChatGPT Clone with Next.js and LM Studio

Every month, you pay for ChatGPT Plus, Claude Pro, or some other subscription. What if you could build the same chat experience—streaming tokens, conversation history, markdown rendering—entirely on your own machine, running local models for free?

In this guide, we'll build a fully functional ChatGPT clone using **Next.js 14** (App Router), **Tailwind CSS**, and **LM Studio** as the local inference engine. By the end, you will have a production-grade chat UI connected to any local LLM, complete with streaming, conversation history, model switching, and system prompt configuration.

## Architecture Overview

Before writing any code, let's understand the architecture:

\`\`\`
┌─────────────────────┐       HTTP/SSE          ┌──────────────────────┐
│  Next.js Frontend   │ ◄──────────────────────► │  LM Studio Server    │
│  (Tailwind UI)      │    POST /v1/chat/        │  (Localhost:1234)    │
│  useChat hook       │    completions           │  Llama 3 / Phi-3     │
│  React state        │                          │  Qwen / Gemma        │
└─────────────────────┘                          └──────────────────────┘
\`\`\`

The magic is that LM Studio exposes an **OpenAI-compatible REST API**. This means your frontend talks to \`http://localhost:1234/v1\` exactly the same way it would talk to \`https://api.openai.com/v1\`. The only difference is the URL.

## Setting Up the Next.js Project

Start by scaffolding a new Next.js 14 project with the App Router:

\`\`\`bash
npx create-next-app@latest local-chatgpt --typescript --tailwind --app
cd local-chatgpt
npm install ai @ai-sdk/openai
\`\`\`

The \`ai\` package from Vercel provides the \`useChat\` hook, which handles streaming, message history, and reconnection logic out of the box. The \`@ai-sdk/openai\` package gives us the OpenAI-compatible client.

## Configuring the Local Provider

Create a custom provider that points to your LM Studio instance:

\`\`\`typescript
// lib/local-provider.ts
import OpenAI from 'ai/openai';

export const localAI = new OpenAI({
  baseURL: 'http://localhost:1234/v1',
  apiKey: 'not-needed', // LM Studio doesn't require an API key
});
\`\`\`

Next, set up the API route that the frontend will call:

\`\`\`typescript
// app/api/chat/route.ts
import { localAI } from '@/lib/local-provider';
import { StreamingTextResponse } from 'ai';

export async function POST(req: Request) {
  const { messages, model = 'llama-3-8b-instruct' } = await req.json();

  const response = await localAI.chat.completions.create({
    model,
    messages,
    stream: true,
    temperature: 0.7,
    max_tokens: 2048,
  });

  return new StreamingTextResponse(response.toReadableStream());
}
\`\`\`

This is the core of the clone. The \`stream: true\` flag tells LM Studio to send tokens one by one via Server-Sent Events (SSE), and \`StreamingTextResponse\` converts them into a format the \`useChat\` hook understands.

## Building the Chat UI with Tailwind

Now let's build the actual chat interface. The \`useChat\` hook handles all the state management for us:

\`\`\`typescript
// app/page.tsx
'use client';

import { useChat } from 'ai/react';
import { useState } from 'react';

export default function ChatPage() {
  const [selectedModel, setSelectedModel] = useState('llama-3-8b-instruct');
  const [systemPrompt, setSystemPrompt] = useState(
    'You are a helpful AI assistant.'
  );

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: '/api/chat',
      body: { model: selectedModel, systemPrompt },
    });

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Local ChatGPT</h1>
        <div className="flex gap-4">
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="border rounded px-3 py-1 text-sm"
          >
            <option value="llama-3-8b-instruct">Llama 3 8B</option>
            <option value="phi-3-mini-4k-instruct">Phi-3 Mini</option>
            <option value="qwen2.5-7b-instruct">Qwen 2.5 7B</option>
          </select>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={\`flex \${
              m.role === 'user' ? 'justify-end' : 'justify-start'
            }\`}
          >
            <div
              className={\`max-w-[80%] rounded-2xl px-4 py-2 \${
                m.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800'
              }\`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2">
              <span className="animate-pulse">▊</span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
\`\`\`

This gives you a ChatGPT-like interface in about 60 lines of code. The messages array auto-updates as tokens stream in, and the input clears automatically after submit.

## Streaming with SSE — How It Works

When LM Studio streams, it sends each token as a data event:

\`\`\`
data: {"choices":[{"delta":{"content":"Hello"}}]}

data: {"choices":[{"delta":{"content":"! "}}]}

data: {"choices":[{"delta":{"content":"How"}}]}

data: [DONE]
\`\`\`

The \`ai\` SDK parses these events and updates the UI incrementally. You don't need to write any SSE parsing code yourself—it's handled by the \`useChat\` hook.

## Conversation History

The \`useChat\` hook maintains an internal \`messages\` array that persists for the session. To save conversations across page reloads, you can store them in \`localStorage\`:

\`\`\`typescript
useEffect(() => {
  localStorage.setItem('chat-history', JSON.stringify(messages));
}, [messages]);

// On mount
useEffect(() => {
  const saved = localStorage.getItem('chat-history');
  if (saved) {
    setMessages(JSON.parse(saved));
  }
}, []);
\`\`\`

For server-side persistence, extend the API route to save to SQLite or PostgreSQL.

## Model Switching

LM Studio can load multiple models simultaneously if you have enough RAM. To switch models on the fly:

1. Load multiple models in LM Studio's **Model** tab
2. Pass the model name in your API request body
3. The \`useChat\` hook re-sends the request with the new model

The dropdown in our UI sends \`model: selectedModel\` in the request body, and the API route forwards it to LM Studio.

## Configuring the System Prompt

A system prompt sets the assistant's behavior. Add a collapsible panel at the top of your chat UI:

\`\`\`typescript
<details className="mb-4">
  <summary className="cursor-pointer text-sm text-gray-500">
    System Prompt
  </summary>
  <textarea
    value={systemPrompt}
    onChange={(e) => setSystemPrompt(e.target.value)}
    className="w-full mt-2 border rounded-lg p-3 text-sm"
    rows={3}
  />
</details>
\`\`\`

The system prompt is prepended to the messages array server-side before being sent to LM Studio.

## Performance Tips for Local Inference

Running models locally requires careful resource management:

1. **Use quantized models**: Always prefer \`Q4_K_M\` or \`Q5_K_M\` GGUF quantizations. They reduce memory usage by 60-75% with minimal quality loss.

2. **Match model to hardware**:
   - 8GB RAM: Phi-3 Mini (3.8B), TinyLlama (1.1B)
   - 16GB RAM: Llama 3 8B, Qwen 2.5 7B, Gemma 2 9B
   - 32GB+ RAM: Llama 3 70B (Q3 quant), Mixtral 8x7B

3. **Enable GPU offloading**: In LM Studio, go to Settings > Hardware and enable GPU acceleration. On macOS, this uses Metal. On Windows, it uses CUDA or DirectML.

4. **Limit context length**: Set \`max_tokens: 1024\` for faster responses. Longer contexts consume exponentially more memory.

5. **Use streaming**: Always use \`stream: true\`. It provides the best UX because the user sees tokens as they're generated rather than waiting for the full response.

## Vercel AI SDK vs Manual Implementation

You might wonder whether to use the Vercel AI SDK or build SSE handling manually.

| Feature | Vercel AI SDK | Manual SSE |
|---------|--------------|------------|
| Streaming parsing | Built-in | Must implement |
| Message history | Auto-managed | Manual state |
| Abort/cancel | \`stop()\` method | Manual AbortController |
| Reconnection | Automatic | Manual retry logic |
| Bundle size | ~15KB gzip | ~5KB gzip |

For most projects, the AI SDK is the right choice. Use manual SSE only if you need zero dependencies and full control over the wire protocol.

## Putting It All Together

Here's the complete file structure:

\`\`\`
local-chatgpt/
├── app/
│   ├── api/chat/route.ts    ← LM Studio proxy
│   ├── page.tsx             ← Chat UI
│   └── layout.tsx           ← Root layout (Tailwind)
├── lib/
│   └── local-provider.ts    ← OpenAI-compatible client
├── package.json
└── tailwind.config.ts
\`\`\`

To run it:

\`\`\`bash
# Terminal 1: Start LM Studio server (ensure a model is loaded)
# Click "Start Server" in LM Studio

# Terminal 2: Start the Next.js dev server
npm run dev
\`\`\`

Open \`http://localhost:3000\` and start chatting. Your messages are processed entirely on your machine—no data ever reaches the cloud.

## Conclusion

Building a local ChatGPT clone with Next.js and LM Studio is surprisingly simple. The OpenAI-compatible API that LM Studio exposes means you can drop in any existing AI SDK or library without modification. You get full control over your data, zero recurring costs, and the satisfaction of running cutting-edge AI on your own hardware.

The best part? As models improve, you just download a new GGUF file—no code changes needed. Your ChatGPT clone evolves with the open-source ecosystem.
  `,
  coverImage: "https://images.unsplash.com/photo-1531297180773-4b07fb1b6370?q=80&w=1200&auto=format&fit=crop",
  date: "2026-04-20",
  readingTime: "12 min read",
  category: "Artificial Intelligence",
  tags: ["Project", "Next.js", "Local AI"],
  author: AUTHOR_VASUDEV
};
