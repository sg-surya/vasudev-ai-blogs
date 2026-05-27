import { AUTHOR_VASUDEV } from "./author";

export const post = {
  id: "33",
  slug: "multi-agent-systems-langgraph-claude",
  title: "Building Multi-Agent Systems with LangGraph and Claude in 2026",
  excerpt: "Step-by-step guide to building production-grade multi-agent AI systems using LangGraph and Claude 4. Includes code examples, architecture patterns, and best practices.",
  content: `
# Building Multi-Agent Systems with LangGraph and Claude in 2026

Multi-agent systems are the most powerful pattern in AI development today. By combining LangGraph's state machine architecture with Claude 4 Opus's reasoning capabilities, you can build autonomous systems that plan, execute, and verify complex tasks.

---

## Why Multi-Agent?

A single LLM call is good. A chain of LLM calls is better. A graph of specialized agents collaborating — each with its own tools, memory, and decision logic — is transformative.

### When to Use Multi-Agent

| Pattern | Single Agent | Multi-Agent |
|---|---|---|
| **Code generation** | Good for simple functions | Excellent for entire features |
| **Research** | Summarizes one source | Synthesizes across sources |
| **Data pipeline** | Single transformation | Orchestrated ETL pipeline |
| **Customer support** | Basic FAQ | Ticket routing + resolution |
| **Code review** | Lint-level checks | Architecture + security + style |

---

## Architecture Overview

A typical multi-agent system has:

1. **Orchestrator Agent** — decides what to do and delegates
2. **Specialist Agents** — each handles one domain (code, research, review)
3. **Shared Memory** — state that persists across agents
4. **Tool Registry** — all available tools across agents

---

## Building with LangGraph + Claude 4

### Step 1: Define the State

\`\`\`typescript
import { StateGraph, Annotation } from "@langchain/langgraph";

const AgentState = Annotation.Root({
  input: Annotation<string>,
  plan: Annotation<string[]>,
  research: Annotation<string>,
  code: Annotation<string>,
  review: Annotation<string>,
  isComplete: Annotation<boolean>
});
\`\`\`

### Step 2: Create Specialist Agents

\`\`\`typescript
import { ChatAnthropic } from "@langchain/anthropic";

const claude = new ChatAnthropic({
  model: "claude-4-opus-2026-04-15",
  temperature: 0,
});

// Research Agent
async function researchAgent(state: typeof AgentState.State) {
  const response = await claude.invoke([
    ["system", "You are a senior research analyst. Find relevant information."],
    ["human", \`Research topic: \${state.input}\nPlan: \${state.plan.join(", ")}\`]
  ]);
  return { research: response.content };
}

// Code Agent
async function codeAgent(state: typeof AgentState.State) {
  const response = await claude.invoke([
    ["system", "You are a senior software engineer. Write production-quality code."],
    ["human", \`Implement based on:\nResearch: \${state.research}\nPlan: \${state.plan.join(", ")}\`]
  ]);
  return { code: response.content };
}

// Review Agent
async function reviewAgent(state: typeof AgentState.State) {
  const response = await claude.invoke([
    ["system", "You are a senior code reviewer. Check for bugs, security issues, and best practices."],
    ["human", \`Review this code:\n\${state.code}\`]
  ]);
  return { review: response.content, isComplete: true };
}
\`\`\`

### Step 3: Build the Graph

\`\`\`typescript
const workflow = new StateGraph(AgentState)
  .addNode("planner", planningAgent)
  .addNode("researcher", researchAgent)
  .addNode("coder", codeAgent)
  .addNode("reviewer", reviewAgent)
  .addEdge("__start__", "planner")
  .addEdge("planner", "researcher")
  .addEdge("researcher", "coder")
  .addEdge("coder", "reviewer")
  .addConditionalEdges("reviewer", (state) => {
    return state.isComplete ? "__end__" : "coder"; // Loop back if review fails
  });

const app = workflow.compile();
\`\`\`

---

## Advanced Patterns

### Pattern 1: Supervisor Pattern

A supervisor agent coordinates specialists:

\`\`\`typescript
async function supervisorAgent(state: typeof AgentState.State) {
  const response = await claude.withStructuredOutput({
    type: "object",
    properties: {
      next: { type: "string", enum: ["researcher", "coder", "reviewer", "finish"] },
      instructions: { type: "string" }
    }
  }).invoke([
    ["system", "You are a supervisor. Decide which agent to call next based on progress."],
    ["human", \`Current state: \${JSON.stringify(state)}\`]
  ]);

  return { nextAgent: response.next, instructions: response.instructions };
}
\`\`\`

### Pattern 2: Human-in-the-Loop

LangGraph supports pausing for human approval:

\`\`\`typescript
const app = workflow.compile({
  interruptBefore: ["reviewer"], // Pause before review
  interruptAfter: ["coder"] // Pause after code generation
});

// When resuming, pass human feedback
await app.invoke(null, {
  configurable: { thread_id: "thread-1" }
}, {
  feedback: "The code looks good but add error handling for edge cases"
});
\`\`\`

### Pattern 3: Parallel Execution

Run multiple agents simultaneously:

\`\`\`typescript
const parallelWorkflow = new StateGraph(AgentState)
  .addNode("research_web", webResearchAgent)
  .addNode("research_docs", docsResearchAgent)
  .addNode("research_codebase", codebaseResearchAgent)
  .addNode("synthesizer", synthesisAgent)
  // Fan out: start -> all three researchers
  .addEdge("__start__", "research_web")
  .addEdge("__start__", "research_docs")
  .addEdge("__start__", "research_codebase")
  // Fan in: all researchers -> synthesizer
  .addEdge("research_web", "synthesizer")
  .addEdge("research_docs", "synthesizer")
  .addEdge("research_codebase", "synthesizer");
\`\`\`

---

## Tools Integration

Give each agent access to specific tools:

\`\`\`typescript
const codeAgentWithTools = claude.bindTools([
  {
    name: "read_file",
    description: "Read a file from the codebase",
    parameters: { path: { type: "string" } }
  },
  {
    name: "write_file",
    description: "Write code to a file",
    parameters: { path: { type: "string" }, content: { type: "string" } }
  },
  {
    name: "run_tests",
    description: "Run tests for the project",
    parameters: { command: { type: "string" } }
  }
]);
\`\`\`

---

## Real-World Example: Automated PR Review System

Here is a complete multi-agent system that reviews pull requests:

1. **Analyzer Agent** — understands the PR diff and identifies changed components
2. **Security Agent** — checks for OWASP Top 10 vulnerabilities
3. **Performance Agent** — evaluates algorithmic complexity
4. **Style Agent** — enforces code style guidelines
5. **Summarizer Agent** — produces the final review

\`\`\`typescript
const reviewGraph = new StateGraph({
  channels: {
    diff: "the PR diff",
    securityIssues: [],
    performanceIssues: [],
    styleIssues: [],
    finalReview: ""
  }
})
.addNode("analyzer", analyzerAgent)
.addNode("security_reviewer", securityAgent)
.addNode("performance_reviewer", performanceAgent)
.addNode("style_reviewer", styleAgent)
.addNode("summarizer", summarizerAgent)
.addEdge("analyzer", "security_reviewer")
.addEdge("analyzer", "performance_reviewer")
.addEdge("analyzer", "style_reviewer")
.addEdge("security_reviewer", "summarizer")
.addEdge("performance_reviewer", "summarizer")
.addEdge("style_reviewer", "summarizer");
\`\`\`

---

## Best Practices for 2026

### 1. Keep Agents Focused
Each agent should have one responsibility. A "code generation" agent should not also do research.

### 2. Use Structured Outputs
Always use typed outputs (JSON Schema, Zod, Pydantic) between agents. Avoid free-form text passing.

### 3. Implement Circuit Breakers
Add timeouts and max-retry limits. An agent stuck in a loop should terminate gracefully.

### 4. Log Everything
Every agent decision, tool call, and state transition should be logged for debugging.

### 5. Test Agent Isolation
Each agent should be testable independently before integrating into the graph.

---

## Performance Considerations

| Factor | Impact | Mitigation |
|---|---|---|
| **Context window** | Large state = high cost | Keep state lean |
| **Parallel agents** | More tokens/second | Use sparingly |
| **Tool calls** | Adds latency | Cache results |
| **Human-in-loop** | Slows pipeline | Use only for critical decisions |
| **Retry logic** | Exponential cost | Max 2 retries |

---

## The Bottom Line

Multi-agent systems with LangGraph and Claude 4 represent the most powerful pattern in AI development today. LangGraph provides the infrastructure (state management, control flow, persistence), while Claude 4 provides the intelligence (reasoning, tool use, code generation). Combined, they let you build autonomous systems that can plan, execute, review, and iterate — just like a team of human engineers.
  `,
  coverImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop",
  date: "2026-05-27",
  readingTime: "15 min read",
  category: "Artificial Intelligence",
  tags: ["LangGraph", "Claude", "AI Agents", "Multi-Agent", "TypeScript"],
  author: AUTHOR_VASUDEV
};
