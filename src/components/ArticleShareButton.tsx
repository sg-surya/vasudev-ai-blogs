"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";

export function ArticleShareButton({
  variant = "desktop",
}: {
  variant?: "desktop" | "mobile";
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (variant === "mobile") {
    return (
      <button
        onClick={handleCopyLink}
        className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors text-sm font-medium flex-1 justify-center"
      >
        <Share2 className="w-4 h-4" />
        {copied ? "Copied!" : "Share"}
      </button>
    );
  }

  return (
    <button
      onClick={handleCopyLink}
      className="p-3 bg-transparent border border-foreground/20 rounded-full hover:bg-muted hover:text-teal hover:border-teal/50 transition-all text-foreground group relative"
      aria-label="Share article"
    >
      <Share2 className="w-5 h-5" />
      {copied && (
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded shadow-sm whitespace-nowrap">
          Link Copied!
        </span>
      )}
    </button>
  );
}
