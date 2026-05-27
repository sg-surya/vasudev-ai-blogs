import { AUTHOR_VASUDEV } from "./author";

export const post = {
  id: "10",
  slug: "building-ai-agents-with-nextjs",
  title: "Building AI Agents with Next.js",
  excerpt: "A practical developer guide to executing recursive AI agent loops inside a Next.js server environment.",
  content: `
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
  `,
  coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
  date: "2026-04-25",
  readingTime: "8 min read",
  category: "Automation",
  tags: ["Next.js", "AI Agents", "TypeScript"],
  author: AUTHOR_VASUDEV
};
