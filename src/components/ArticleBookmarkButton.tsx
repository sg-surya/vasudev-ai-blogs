"use client";

import { BookmarkPlus } from "lucide-react";

export function ArticleBookmarkButton({
  variant = "desktop",
}: {
  variant?: "desktop" | "mobile";
}) {
  if (variant === "mobile") {
    return (
      <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors text-sm font-medium flex-1 justify-center">
        <BookmarkPlus className="w-4 h-4" />
        Bookmark
      </button>
    );
  }

  return (
    <button
      className="p-3 bg-transparent border border-foreground/20 rounded-full hover:bg-muted hover:text-teal hover:border-teal/50 transition-all text-foreground"
      aria-label="Bookmark article"
    >
      <BookmarkPlus className="w-5 h-5" />
    </button>
  );
}
