"use client";

import { useState } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}
import { X, Cookie } from "lucide-react";

export function CookieConsent() {
  const [visible, setVisible] = useState(
    typeof window !== "undefined" && !localStorage.getItem("cookie-consent")
  );

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
    loadAnalytics();
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="bg-card border border-border rounded-2xl p-5 shadow-xl flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center shrink-0">
          <Cookie className="w-5 h-5 text-teal" />
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed flex-1">
          This site uses cookies to analyze traffic and improve your experience.
          By continuing, you agree to our{" "}
          <a href="/cookie" className="text-teal underline underline-offset-2 hover:no-underline">
            Cookie Policy
          </a>.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground bg-muted rounded-full transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-xs font-bold text-white bg-teal rounded-full hover:bg-teal/90 transition-colors"
          >
            Accept
          </button>
        </div>
        <button onClick={decline} className="text-muted-foreground hover:text-foreground" aria-label="Close">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function loadAnalytics() {
  if (typeof window === "undefined" || window.gtag) return;

  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = "https://www.googletagmanager.com/gtag/js?id=G-GYSXREVNXX";
  document.head.appendChild(script1);

  const script2 = document.createElement("script");
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-GYSXREVNXX');
  `;
  document.head.appendChild(script2);
}
