import "@/index.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Script from "next/script";

export const metadata = {
  title: "Vasudev AI Chronicles",
  description: "A premium futuristic developer journal built for the next generation of AI creators.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-GYSXREVNXX" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-GYSXREVNXX');
          `}
        </Script>
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
