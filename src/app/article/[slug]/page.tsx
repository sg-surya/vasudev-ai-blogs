import { posts } from "@/data/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { format } from "date-fns";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { ArticleProgressBar } from "@/components/ArticleProgressBar";
import { ArticleShareButton } from "@/components/ArticleShareButton";
import { ArticleBookmarkButton } from "@/components/ArticleBookmarkButton";
import { ArticlePageInit } from "@/components/ArticlePageInit";
import { TableOfContents } from "@/components/TableOfContents";
import { extractHeadings } from "@/lib/extract-headings";

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

  const headings = extractHeadings(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "Vasudev AI Chronicles",
      logo: {
        "@type": "ImageObject",
        url: "https://blog.vasudevai.in/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://blog.vasudevai.in/article/${post.slug}`,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleProgressBar />
      <ArticlePageInit />

      <article className="w-full px-4 sm:px-6 lg:px-8 py-8 md:py-16 relative">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-teal transition-colors">Home</Link>
            <span>/</span>
            <Link href="/articles" className="hover:text-teal transition-colors">Articles</Link>
            <span>/</span>
            <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
          </nav>

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

          <div className="aspect-[21/9] md:aspect-[24/9] w-full rounded-2xl md:rounded-3xl overflow-hidden mb-16 border border-foreground/10 shadow-lg relative">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_280px] gap-x-12 xl:gap-x-16">
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

            <div className="prose prose-lg prose-headings:font-serif prose-headings:text-foreground prose-headings:tracking-tight prose-a:text-teal prose-a:decoration-teal/30 hover:prose-a:decoration-teal prose-img:rounded-2xl max-w-none prose-table:border-collapse prose-table:w-full prose-th:bg-muted prose-th:font-semibold prose-th:text-left prose-th:px-4 prose-th:py-3 prose-th:text-sm prose-th:uppercase prose-th:tracking-wider prose-td:px-4 prose-td:py-3 prose-td:text-sm prose-td:border-b prose-td:border-border prose-tr:even:bg-muted/30 prose-code:before:content-none prose-code:after:content-none prose-hr:border-border/50 prose-blockquote:border-l-teal prose-blockquote:text-muted-foreground">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  table({ ...props }: any) {
                    return (
                      <div className="overflow-x-auto my-8 rounded-xl border border-border shadow-sm">
                        <table className="min-w-full" {...props} />
                      </div>
                    );
                  },
                  thead({ ...props }: any) {
                    return <thead className="border-b-2 border-border" {...props} />;
                  },
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
                        className="rounded-xl border border-border !bg-[#12161E] my-8 !p-6 !text-sm overflow-x-auto"
                      />
                    ) : (
                      <code
                        {...props}
                        className="bg-muted px-1.5 py-0.5 rounded-md font-mono text-sm text-teal"
                      >
                        {children}
                      </code>
                    );
                  },
                  h2({ children, ...props }: any) {
                    const text = String(children);
                    const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").trim();
                    return (
                      <h2 id={id} className="scroll-mt-24 text-2xl md:text-3xl font-serif font-bold tracking-tight mt-12 mb-6 text-foreground border-b border-border/30 pb-3" {...props}>
                        {children}
                      </h2>
                    );
                  },
                  h3({ children, ...props }: any) {
                    const text = String(children);
                    const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").trim();
                    return (
                      <h3 id={id} className="scroll-mt-24 text-xl md:text-2xl font-serif font-semibold tracking-tight mt-10 mb-4 text-foreground" {...props}>
                        {children}
                      </h3>
                    );
                  },
                  hr() {
                    return <hr className="my-12 border-border/30" />;
                  },
                  ul({ children, ...props }: any) {
                    return <ul className="space-y-2 my-6" {...props}>{children}</ul>;
                  },
                  ol({ children, ...props }: any) {
                    return <ol className="space-y-2 my-6" {...props}>{children}</ol>;
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </div>

          <div className="hidden lg:block w-[280px] shrink-0">
            <div className="sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto">
              {headings.length > 0 && (
                <>
                  <h4 className="font-serif font-bold tracking-wider uppercase text-foreground mb-4 text-xs">
                    ON THIS PAGE
                  </h4>
                  <TableOfContents content={post.content} />
                </>
              )}
              <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-teal/[0.04] to-purple-500/[0.04] border border-border/50">
                <p className="text-xs font-semibold uppercase tracking-wider text-teal mb-1">Enjoying this?</p>
                <p className="text-xs text-muted-foreground mb-3">Share it with your dev friends!</p>
                <ArticleShareButton />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-12 pt-8 border-t border-border lg:hidden">
          <ArticleShareButton variant="mobile" />
          <ArticleBookmarkButton variant="mobile" />
        </div>

        <div className="mt-20 pt-12 border-t border-border">
          <h3 className="text-2xl font-serif font-bold tracking-tight text-foreground mb-8">
            Continue Reading
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts
              .filter((p) => p.slug !== slug && p.category === post.category)
              .slice(0, 3)
              .map((related) => (
                <Link
                  key={related.slug}
                  href={`/article/${related.slug}`}
                  className="group block rounded-xl border border-border/50 bg-card hover:border-teal/30 hover:shadow-md transition-all overflow-hidden"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={related.coverImage}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-teal">
                      {related.category}
                    </span>
                    <h4 className="font-semibold text-foreground mt-1 group-hover:text-teal transition-colors line-clamp-2">
                      {related.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-2">
                      {related.readingTime}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        </div>
      </article>
    </>
  );
}
