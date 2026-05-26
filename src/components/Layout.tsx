import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-background selection:bg-teal selection:text-white transition-colors duration-300">
      <Navbar />
      <main className="flex-grow pt-24 md:pt-28">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
