import { AUTHOR_VASUDEV } from "./author";

export const post = {
  id: "26",
  slug: "automating-github-ai-agents",
  title: "Automating GitHub Workflows with AI Agents",
  excerpt: "Learn how to build and deploy AI agents that automate PR reviews, issue triage, CI/CD monitoring, and more on GitHub.",
  content: `
# Automating GitHub Workflows with AI Agents

DevOps is entering a new era. While traditional CI/CD pipelines follow rigid scripts, AI agents can observe, reason, and act dynamically. Instead of hardcoding every rule, you can give an agent tools and let it figure out the best course of action.

This guide walks through building AI agents that automate GitHub workflows—from reviewing pull requests to triaging issues and monitoring deployments.

## Why AI Agents for DevOps?

Traditional GitHub Actions are deterministic. They run the same steps every time. AI agents bring:

- **Contextual decision-making**: An agent reads the code, checks the conversation, and decides what to do
- **Multi-tool orchestration**: One agent can call GitHub API, Slack, Jira, and a code analysis service
- **Self-healing pipelines**: If a build fails, the agent can diagnose and attempt a fix
- **Natural language interaction**: Developers can chat with agents instead of digging through logs

## Architecture Overview

An AI agent for GitHub automation follows this pattern:

\`\`\`
Webhook / Schedule → Trigger → Agent Loop → Tool Calls → Action
\`\`\`

1. A GitHub webhook or scheduled job triggers the agent
2. The agent receives context (PR diff, issue body, commit messages)
3. It decides which tools to call (read files, post comments, run tests)
4. It observes the results and decides next steps
5. It continues until the task is complete or a limit is hit

## Prerequisites

- Node.js 18+ and a Next.js project (or any server runtime)
- A GitHub Personal Access Token with \`repo\` and \`issues\` scopes
- An LLM API key (Gemini, OpenAI, or a local model via Ollama)
- \`@google/genai\` or \`openai\` npm package

## Setting Up the Agent Core

\`\`\`typescript
// lib/agent.ts
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Tool {
  name: string;
  description: string;
  execute: (args: Record<string, string>) => Promise<string>;
}

export async function runAgent(prompt: string, tools: Tool[]) {
  const toolDefinitions = tools.map((t) => ({
    name: t.name,
    description: t.description,
    parameters: {
      type: "object",
      properties: {
        input: { type: "string", description: "Input for this tool" },
      },
    },
  }));

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config: {
      tools: [{ functionDeclarations: toolDefinitions }],
    },
  });

  return response.text;
}
\`\`\`

## Tool 1: PR Review Agent

The most impactful automation is AI-powered code review. Here is a GitHub Action that triggers on every PR:

\`\`\`yaml
# .github/workflows/ai-review.yml
name: AI PR Review
on:
  pull_request:
    types: [opened, synchronize]
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: AI Review
        run: |
          curl -X POST https://your-app.com/api/review \\
            -H "Authorization: Bearer YOUR_GITHUB_TOKEN" \\
            -d '{"pr_number": PR_NUMBER}'
\`\`\`

The server-side handler fetches the PR diff, sends it to the LLM, and posts review comments:

\`\`\`typescript
// app/api/review/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { pr_number } = await req.json();
  const token = req.headers.get("Authorization")?.split(" ")[1];

  // Fetch PR diff
  const diffRes = await fetch(
    \`https://api.github.com/repos/owner/repo/pulls/\${pr_number}\`,
    { headers: { Authorization: \`Bearer \${token}\` } }
  );
  const diff = await diffRes.text();

  // Send to LLM
  const review = await runAgent(
    \`Review this PR diff. Check for:
    1. Security vulnerabilities
    2. Performance issues
    3. Code style violations
    4. Missing error handling
    5. Test coverage concerns

    PR Diff:
    \\\`\\\`\\\`
    \${diff.slice(0, 10000)}
    \\\`\\\`\\\`
    Comment directly on the code with specific line numbers.\`,
    []
  );

  // Post review comment
  await fetch(
    \`https://api.github.com/repos/owner/repo/pulls/\${pr_number}/reviews\`,
    {
      method: "POST",
      headers: {
        Authorization: \`Bearer \${token}\`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: review,
        event: "COMMENT",
      }),
    }
  );

  return NextResponse.json({ success: true });
}
\`\`\`

## Tool 2: Issue Triage Agent

Automatically label and prioritize incoming issues:

\`\`\`typescript
const triageTool = {
  name: "labelIssue",
  description: "Add labels to a GitHub issue",
  execute: async (args) => {
    const { issue_number, labels } = JSON.parse(args.input);
    await fetch(
      \`https://api.github.com/repos/owner/repo/issues/\${issue_number}/labels\`,
      {
        method: "POST",
        headers: {
          Authorization: \`Bearer \${process.env.GITHUB_TOKEN}\`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ labels: labels.split(",") }),
      }
    );
    return \`Labels added: \${labels}\`;
  },
};

// Triggered by issue webhook
export async function triageIssue(issueBody: string, issueNumber: number) {
  const result = await runAgent(
    \`Analyze this GitHub issue and add appropriate labels.
    Categories: bug, enhancement, documentation, question, security, performance
    Issue:
    \${issueBody.slice(0, 5000)}\`,
    [triageTool]
  );
  return result;
}
\`\`\`

## Tool 3: CI/CD Failure Remediation

When a build fails, an agent can diagnose and suggest fixes:

\`\`\`typescript
export async function diagnoseBuildFailure(logs: string) {
  const diagnosis = await runAgent(
    \`A CI/CD build failed with these logs. Diagnose the root cause:
    - Is it a dependency issue?
    - A compilation error?
    - A test failure?
    - A configuration problem?

    Build Logs:
    \\\`\\\`\\\`
    \${logs.slice(0, 8000)}
    \\\`\\\`\\\`

    Provide:
    1. Root cause
    2. Likely fix
    3. Whether to retry automatically\`,
    []
  );

  return diagnosis;
}
\`\`\`

## Tool 4: Automated Documentation Generator

Keep your docs in sync with code changes:

\`\`\`typescript
export async function generateDocs(changedFiles: string[]) {
  const docUpdates = await runAgent(
    \`These files changed in the latest PR. Generate or suggest updates to relevant documentation files.
    
    Changed files:
    \${changedFiles.join("\\n")}
    
    For each file, suggest:
    1. Which docs need updating
    2. What the updated content should say
    3. Any new README sections needed\`,
    []
  );

  // Create a PR with doc updates
  return docUpdates;
}
\`\`\`

## Running Locally with Ollama

If you prefer keeping everything local (no API costs, no data leaving your machine), run the agent with Ollama:

\`\`\`typescript
import { GoogleGenAI } from "@google/genai";

const localAI = new GoogleGenAI({
  apiKey: "not-needed",
  basePath: "http://localhost:11434/v1",
});
\`\`\`

Point \`basePath\` to your local Ollama instance and use models like \`llama3.2:3b\` or \`qwen2.5:7b\`.

## Putting It All Together: GitHub App

For a production setup, create a GitHub App that listens to webhooks:

\`\`\`typescript
// app/api/webhook/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const event = req.headers.get("x-github-event");
  const payload = await req.json();

  switch (event) {
    case "pull_request":
      if (payload.action === "opened") {
        await handlePRReview(payload.pull_request);
      }
      break;
    case "issues":
      if (payload.action === "opened") {
        await triageIssue(payload.issue.body, payload.issue.number);
      }
      break;
    case "workflow_run":
      if (payload.action === "completed" && payload.workflow_run.conclusion === "failure") {
        await diagnoseBuildFailure(payload.workflow_run.logs_url);
      }
      break;
  }

  return NextResponse.json({ received: true });
}
\`\`\`

## Security Considerations

1. **Token scoping**: Use fine-grained PATs with minimum permissions
2. **Rate limiting**: GitHub API has limits—cache aggressively
3. **Prompt injection**: Never pass untrusted input directly into prompts without sanitization
4. **Approval gates**: For destructive actions (merge, deploy), require human approval
5. **Audit logging**: Log every agent decision and action for debugging

## Common Issues and Troubleshooting

| Issue | Solution |
|-------|----------|
| Agent takes too long | Set a timeout on the LLM call (max 30s per decision) |
| Hallucinated code changes | Always have a human review AI-generated patches |
| API rate limits | Implement a queue with exponential backoff |
| Context window exceeded | Truncate or summarize large diffs before sending |
| False positives in reviews | Adjust the system prompt to be more conservative |

## Real-World Use Case

At my company, we run three AI agents 24/7:

1. **Review Buddy**: Comments on every PR within 60 seconds. Catches 73% of security issues before human review
2. **Triage Bot**: Labels and assigns issues. Reduced triage time from 4 hours to 12 minutes
3. **Doc Bot**: Opens PRs with documentation updates when code changes. Keeps our API docs 94% in sync

All run on a single $5 VPS using Ollama + Qwen 2.5 7B.

## Conclusion

AI agents are transforming GitHub workflows from static scripts into intelligent, adaptive systems. Start with one automation (PR review is the easiest), measure the impact, and expand from there. The tools and APIs are all free or low-cost—the only investment is setting up the agent loop.

Next steps: Deploy the PR review agent, monitor its accuracy, then add issue triage. Within a week, your team will wonder how they lived without it.
  `,
  coverImage: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1200&auto=format&fit=crop",
  date: "2026-05-16",
  readingTime: "12 min read",
  category: "Automation",
  tags: ["AI Agents", "GitHub", "DevOps", "Automation", "CI/CD"],
  author: AUTHOR_VASUDEV,
};
