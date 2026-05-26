export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20 prose prose-headings:font-serif prose-headings:text-foreground prose-a:text-teal inline-block w-full">
      <h1>Terms of Engagement</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <h2>1. Intellectual Property</h2>
      <p>All original content, including source code snippets, diagrams, and written essays, are property of Vasudev AI unless otherwise specified. You may fork, share, and utilize concepts under fair use conventions, providing explicit attribution to the origin node (blog.vasudevai.in).</p>

      <h2>2. External Modding and Liability</h2>
      <p>Articles detailing Android kernel modifications, low-level system tuning, or offensive security techniques are provided for educational and research purposes only. Vasudev AI assumes zero liability for bricked devices, kernel panics, or misapplied security exploits.</p>

      <h2>3. Autonomous Interactions</h2>
      <p>Any interactions with AI agents hosted on this domain are experimental. We do not guarantee uptime or contextual perfection of machine-generated responses.</p>
    </div>
  );
}
