import { Rocket, Mail, Github, Twitter, MapPin } from "lucide-react";

export function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-6">
          Initialize Connection.
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Open to collaborations, engineering discussions, and security disclosures.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2 space-y-8">
          <div className="p-6 rounded-2xl bg-card border border-border">
            <h3 className="font-serif font-bold text-lg mb-4">Direct Comm Link</h3>
            <div className="space-y-4">
              <a href="mailto:hello@vasudevai.in" className="flex items-center gap-3 text-muted-foreground hover:text-teal transition-colors group">
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>hello@vasudevai.in</span>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span>Global Distributed Node</span>
              </div>
            </div>
            
            <div className="h-px bg-border my-6" />
            
            <h3 className="font-serif font-bold text-lg mb-4">Networks</h3>
            <div className="space-y-4">
              <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-teal transition-colors group">
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>@vasudev_ai</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-teal transition-colors group">
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>github.com/vasudev</span>
              </a>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Designation / Name</label>
                <input 
                  type="text" 
                  className="w-full bg-card border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-all shadow-sm"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Return Node (Email)</label>
                <input 
                  type="email" 
                  className="w-full bg-card border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-all shadow-sm"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Payload (Message)</label>
              <textarea 
                rows={6}
                className="w-full bg-card border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-all shadow-sm resize-none"
                placeholder="Let's build something..."
              />
            </div>
            <button className="w-full bg-foreground text-background hover:bg-teal hover:text-white px-6 py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors shadow-sm">
              <Rocket className="w-5 h-5" />
              Transmit Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
