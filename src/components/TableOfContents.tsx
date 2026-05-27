"use client";

import { useState, useEffect, useMemo } from "react";
import { extractHeadings } from "@/lib/extract-headings";

export function TableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState<string>("");
  const headings = useMemo(() => extractHeadings(content), [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="text-sm space-y-1 text-muted-foreground">
      {headings.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById(h.id);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
              setActiveId(h.id);
            }
          }}
          className={`block py-1.5 leading-tight transition-colors rounded hover:text-teal ${
            h.level === 3 ? "pl-5 text-xs" : "pl-2 text-sm font-medium"
          } ${
            activeId === h.id
              ? "text-teal border-l-2 border-teal -ml-px"
              : "hover:border-l-2 hover:border-teal/30 hover:-ml-px"
          }`}
        >
          {h.text}
        </a>
      ))}
    </nav>
  );
}
