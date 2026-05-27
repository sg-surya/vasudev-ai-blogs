import { posts } from "@/data/posts";
import { ArticlesArchive } from "@/components/ArticlesArchive";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles Archive",
  description:
    "Browse all articles on AI, machine learning, Android customization, and developer tools.",
};

export default function Articles() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground tracking-tight mb-6">
          The Archive
        </h1>
        <p className="text-lg text-muted-foreground">
          Thoughts on AI, machine learning engineering, Android modding, and
          everything in between.
        </p>
      </div>
      <ArticlesArchive posts={posts} />
    </div>
  );
}
