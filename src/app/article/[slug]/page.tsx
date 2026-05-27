import { posts } from "@/data/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { format } from "date-fns";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { ArticleProgressBar } from "@/components/ArticleProgressBar";
import { ArticleShareButton } from "@/components/ArticleShareButton";
import { ArticleBookmarkButton } from "@/components/ArticleBookmarkButton";
import { ArticlePageInit } from "@/components/ArticlePageInit";

import type { Metadata } from "next";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
    },
  };
}

export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <ArticleProgressBar />
      <ArticlePageInit />

      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-teal mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Archive
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-4 border-y border-foreground/10 mb-10">
          <div className="flex items-center gap-4">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full border border-border"
            />
            <div>
              <p className="font-semibold text-foreground">{post.author.name}</p>
              <p className="text-sm text-teal">{post.author.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              {format(new Date(post.date), "MMM d, yyyy")}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readingTime}
            </div>
          </div>
        </div>

        <div className="aspect-[21/9] md:aspect-[24/9] w-full rounded-2xl md:rounded-3xl overflow-hidden mb-16 border border-foreground/10 shadow-sm relative">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_250px] gap-x-12 xl:gap-x-16">
          <div className="hidden lg:block w-16">
            <div className="sticky top-32 flex flex-col items-center gap-4">
              <ArticleShareButton />
              <ArticleBookmarkButton />
            </div>
          </div>

          <div className="w-full min-w-0">
            <div className="mb-10">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-teal text-white rounded-full shadow-sm">
                  {post.category}
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-mono tracking-tight bg-muted text-muted-foreground rounded border border-border hidden sm:inline-flex"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-[3.5rem] font-serif font-bold tracking-tight leading-[1.1] text-foreground">
                {post.title}
              </h1>
            </div>

            <div className="prose prose-lg prose-headings:font-serif prose-headings:text-foreground prose-headings:tracking-tight prose-a:text-teal prose-a:decoration-teal/30 hover:prose-a:decoration-teal prose-img:rounded-2xl max-w-none">
              <ReactMarkdown
                components={{
                  code({
                    node,
                    inline,
                    className,
                    children,
                    ...props
                  }: any) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        {...props}
                        children={String(children).replace(/\n$/, "")}
                        style={vscDarkPlus as any}
                        language={match[1]}
                        PreTag="div"
                        className="rounded-xl border border-border !bg-[#12161E] my-8 !p-6 !text-sm"
                      />
                    ) : (
                      <code
                        {...props}
                        className="bg-muted px-1.5 py-0.5 rounded-md font-mono text-sm text-teal before:content-none after:content-none"
                      >
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </div>

          <div className="hidden lg:block w-[250px]">
            <div className="sticky top-32">
              <h4 className="font-serif font-bold tracking-wider uppercase text-foreground mb-6">
                ON THIS PAGE
              </h4>
              <div className="text-sm space-y-4 text-foreground/80">
                <p className="hover:text-teal cursor-pointer transition-colors leading-tight">
                  The Cognitive Engine
                </p>
                <p className="hover:text-teal cursor-pointer transition-colors pl-4 leading-tight">
                  1. Memory and State
                </p>
                <p className="hover:text-teal cursor-pointer transition-colors pl-4 leading-tight">
                  2. Tool Usage
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-12 pt-8 border-t border-border lg:hidden">
          <ArticleShareButton variant="mobile" />
          <ArticleBookmarkButton variant="mobile" />
        </div>
      </article>
    </>
  );
}
