export interface Author {
  name: string;
  avatar: string;
  role: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  readingTime: string;
  category: string;
  tags: string[];
  author: Author;
  featured?: boolean;
}

const AUTHOR_VASUDEV: Author = {
  name: "Vasudev",
  avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
  role: "AI Engineer & Founder"
};

export const posts: Post[] = [
  {
    id: "1",
    slug: "future-of-ai-agents",
    title: "The Architecture of Autonomous AI Agents in 2026",
    excerpt: "Exploring the fundamental shifts in how we build and deploy self-improving AI models capable of autonomous multi-step reasoning.",
    content: `
# The Architecture of Autonomous AI Agents in 2026

Artificial Intelligence has shifted from conversational chatbots to autonomous agents. Today, we aren't just prompting; we are orchestrating intelligence.

## The Cognitive Engine

At the core of a modern agent lies the Cognitive Engine. Unlike static LLMs of the past, these engines constantly fine-tune themselves against a stream of multi-modal sensory inputs.

\`\`\`typescript
interface CognitiveEngine {
  model: "gemini-3.1-pro";
  memory: VectorStore;
  tools: ToolRegistry;
  
  async reasoningLoop(goal: Goal): Promise<Action> {
    const context = await this.memory.retrieve(goal.context);
    const plan = await this.synthesize(goal, context);
    return this.execute(plan, this.tools);
  }
}
\`\`\`

### 1. Memory and State
Agents no longer start from scratch. They maintain complex, graph-based memory structures, allowing deep continuity across weeks of task execution.

### 2. Tool Usage
True autonomy requires limbs. Modern agents seamlessly write code, access private networks via proxies, and manage their own compute resources dynamically.

> "The true measure of an AI is not its conversational fluidity, but its structural autonomy." — Vasudev

In upcoming posts, I'll dive into building an actual graph-based memory module using TypeScript and standard vector stores.

Stay tuned.
`,
    coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
    date: "2026-05-24",
    readingTime: "5 min read",
    category: "Artificial Intelligence",
    tags: ["AI", "Agents", "Architecture", "TypeScript"],
    author: AUTHOR_VASUDEV,
    featured: true
  },
  {
    id: "2",
    slug: "android-kernel-tuning",
    title: "Extreme Android Kernel Tuning for Performance",
    excerpt: "A deep dive into optimizing CPU governors, memory management, and I/O schedulers for the absolute best Android experience.",
    content: "Content goes here...",
    coverImage: "https://images.unsplash.com/photo-1607252656733-fd7428c57385?q=80&w=1200&auto=format&fit=crop",
    date: "2026-05-20",
    readingTime: "8 min read",
    category: "Android Customization",
    tags: ["Android", "Kernel", "Performance", "Linux"],
    author: AUTHOR_VASUDEV
  },
  {
    id: "3",
    slug: "building-secure-react-apps",
    title: "Building Secure React Apps: Beyond the Basics",
    excerpt: "Why XSS and CSRF are still prevalent, and how modern React patterns can inadvertently expose your users.",
    content: "Content goes here...",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    date: "2026-05-15",
    readingTime: "6 min read",
    category: "Cybersecurity",
    tags: ["React", "Security", "Web Dev"],
    author: AUTHOR_VASUDEV
  },
  {
    id: "4",
    slug: "automation-with-python",
    title: "Zero-Touch Infrastructure: Automating Server Deployments",
    excerpt: "How I use Python, Ansible, and Terraform to deploy completely self-managing server clusters.",
    content: "Content goes here...",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    date: "2026-05-10",
    readingTime: "10 min read",
    category: "Automation",
    tags: ["Python", "DevOps", "Infrastructure"],
    author: AUTHOR_VASUDEV
  },
  {
    id: "5",
    slug: "ethical-hacking-101",
    title: "The Anatomy of a Modern Web Vulnerability",
    excerpt: "Breaking down a recent major CVE. How it happened, why it wasn't caught, and how to protect against it.",
    content: "Content goes here...",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    date: "2026-05-02",
    readingTime: "7 min read",
    category: "Ethical Hacking",
    tags: ["Security", "CVE", "Pentesting"],
    author: AUTHOR_VASUDEV
  }
];

export const categories = Array.from(new Set(posts.map(p => p.category)));
