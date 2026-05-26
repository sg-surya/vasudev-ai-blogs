import "@/index.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Script from "next/script";

import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://blog.vasudevai.in'),
  title: {
    default: "Vasudev AI Chronicles",
    template: "%s | Vasudev AI Chronicles"
  },
  description: "A premium futuristic developer journal built for the next generation of AI creators. Exploring Artificial Intelligence, Advanced Automation, and the bleeding edge of software engineering.",
  keywords: ["AI Tutorials", "Android Customization", "Automation", "Developer Insights", "Cybersecurity", "Performance Optimization"],
  authors: [{ name: "Surya Pratap Singh" }],
  openGraph: {
    title: "Vasudev AI Chronicles",
    description: "Clarity in Code. Stories in Tech.",
    url: "https://blog.vasudevai.in",
    siteName: "Vasudev AI Chronicles",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-GYSXREVNXX"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-GYSXREVNXX');
          `
        }} />
      </head>
      <body>
        <ThemeProvider defaultTheme="system" storageKey="vasudev-ui-theme">
          <div className="min-h-screen flex flex-col font-sans text-foreground bg-background selection:bg-teal selection:text-white transition-colors duration-300">
            <Navbar />
            <main className="flex-grow pt-24 md:pt-28">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
