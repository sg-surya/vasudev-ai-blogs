import { Code, Terminal, BrainCircuit, Rocket } from "lucide-react";

export function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-6">
          Architecting Intelligence.
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          I am Vasudev, an AI Engineer and security researcher exploring the boundaries of autonomous agents and zero-trust infrastructure.
        </p>
      </div>

      <div className="aspect-[21/9] rounded-3xl overflow-hidden mb-20 border border-border bg-card shadow-sm">
        <img 
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop" 
          alt="Workspace"
          className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-16 mb-20">
        <div>
          <h2 className="text-3xl font-serif font-bold mb-6">The Mission</h2>
          <div className="prose dark:prose-invert text-muted-foreground prose-p:leading-relaxed">
            <p>
              Vasudev AI Chronicles is a documentation protocol. It serves as a public ledger of my experiments, failures, and breakthroughs in building the next generation of artificial intelligence.
            </p>
            <p>
              My work spans across customizing Android kernels for absolute security, deploying autonomous multi-agent systems using modern LLMs, and breaking legacy web applications to understand their flaws.
            </p>
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center shrink-0 border border-teal/20 text-teal">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif mb-2">Cognitive Systems</h3>
              <p className="text-sm text-muted-foreground">Building graph-based memory pipelines and orchestration layers for autonomous reasoning.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-lavender/10 flex items-center justify-center shrink-0 border border-lavender/20 text-lavender">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif mb-2">Systems Engineering</h3>
              <p className="text-sm text-muted-foreground">Low-level Linux kernel tuning and custom Android ROM compilations for maximum performance.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-stone/10 flex items-center justify-center shrink-0 border border-stone/20 text-foreground">
              <Code className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif mb-2">Frontend Architecture</h3>
              <p className="text-sm text-muted-foreground">Crafting performant, highly-responsive client applications using React, Next.js, and raw WebGL.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
