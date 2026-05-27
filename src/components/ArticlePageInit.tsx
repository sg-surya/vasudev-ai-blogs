"use client";

import { useEffect } from "react";

export function ArticlePageInit() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}
