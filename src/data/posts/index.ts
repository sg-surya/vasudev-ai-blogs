import { post as post01 } from "./build-offline-ai-assistant-lm-studio";
import { post as post02 } from "./running-ai-completely-offline";
import { post as post03 } from "./phi-3-vs-llama-3-local-ai";
import { post as post04 } from "./android-performance-optimization-guide";
import { post as post05 } from "./best-android-roms-for-performance";
import { post as post06 } from "./how-to-debloat-windows-for-developers";
import { post as post07 } from "./best-tools-for-power-users";
import { post as post08 } from "./best-ai-coding-tools-2026";
import { post as post09 } from "./cursor-vs-windsurf-vs-replit";
import { post as post10 } from "./building-ai-agents-with-nextjs";
import { post as post11 } from "./how-to-make-local-chatgpt-clone";
import { post as post12 } from "./best-open-source-ai-models-low-end";
import { post as post13 } from "./how-i-built-vasudev-ai";
import { post as post14 } from "./how-to-speed-up-old-laptops";
import { post as post15 } from "./best-free-ai-tools-for-students";
import { post as post16 } from "./how-to-install-ollama";
import { post as post17 } from "./lm-studio-vs-ollama-vs-gpt4all";
import { post as post18 } from "./fine-tuning-llama-3";
import { post as post19 } from "./best-free-ai-tools-devs-2026";
import { post as post20 } from "./wsl2-ai-development";
import { post as post21 } from "./vs-code-extensions-ai-devs";
import { post as post22 } from "./rag-system-langchain";
import { post as post23 } from "./stable-diffusion-low-end-gpu";
import { post as post24 } from "./linux-vs-windows-ai-development";
import { post as post25 } from "./gemini-api-free-guide";
import { post as post26 } from "./automating-github-ai-agents";
import { post as post27 } from "./claude-4-opus-2026";
import { post as post28 } from "./openai-gpt5-o3-o4-2026";
import { post as post29 } from "./open-source-ai-agents-2026";
import { post as post30 } from "./google-io-2026-ai-recap";
import { post as post31 } from "./ai-coding-assistants-2026-comparison";
import { post as post32 } from "./local-llms-2026-llama4-mistral";
import { post as post33 } from "./multi-agent-systems-langgraph-claude";
import { post as post34 } from "./rag-production-2026-best-practices";
import { post as post35 } from "./open-source-vs-closed-source-llms-2026";
import { post as post36 } from "./fine-tuning-llama4-mistral-2026";
import { post as post37 } from "./ai-hardware-2026-rtx5090-m4-ultra";
import { post as post38 } from "./model-context-protocol-mcp-2026";
import { post as post39 } from "./ai-in-vs-code-2026";
import { post as post40 } from "./multimodal-ai-2026-sora-veo";
import { post as post41 } from "./open-source-ai-news-2026";

export type { Post, Author } from "./author";

export const posts = [
  post01, post02, post03, post04, post05,
  post06, post07, post08, post09, post10,
  post11, post12, post13, post14, post15,
  post16, post17, post18, post19,
  post20, post21, post22, post23, post24, post25, post26,
  post27, post28, post29, post30, post31, post32, post33, post34, post35,
  post36, post37, post38, post39, post40, post41,
];

export const categories = Array.from(new Set(posts.map((p) => p.category)));
