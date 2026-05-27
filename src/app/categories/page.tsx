import { posts } from "@/data/posts";
import { CategoriesContent } from "@/components/CategoriesContent";
import { Suspense } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Explore articles by topic: Artificial Intelligence, Android Customization, Developer Tools, and more.",
};

export default function Categories() {
  return (
    <Suspense
      fallback={
        <div className="p-24 text-center text-muted-foreground">
          Loading specific sector...
        </div>
      }
    >
      <CategoriesContent posts={posts} />
    </Suspense>
  );
}
