import { Link } from "react-router-dom";
import { Terminal } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-teal/10 flex items-center justify-center text-teal mb-6 border border-teal/20">
        <Terminal className="w-8 h-8" />
      </div>
      <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-4 text-foreground">
        404
      </h1>
      <h2 className="text-xl md:text-2xl font-serif mb-6 text-foreground/80">
        Signal Not Found
      </h2>
      <p className="max-w-md text-muted-foreground mb-8">
        The node you are trying to reach has either been disconnected from the cluster or never existed.
      </p>
      <Link 
        to="/"
        className="px-6 py-3 bg-foreground text-background rounded-full font-medium hover:bg-teal hover:text-white transition-colors"
      >
        Return to Core
      </Link>
    </div>
  );
}
