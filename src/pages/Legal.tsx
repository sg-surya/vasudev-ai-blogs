export function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20 prose dark:prose-invert prose-headings:font-serif prose-a:text-teal inline-block w-full">
      <h1>Privacy Protocol</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      
      <h2>1. Data Collection</h2>
      <p>At Vasudev AI Chronicles, we prioritize your privacy. As a technically-focused entity, we rely heavily on zero-trust architectures and minimal data footprints.</p>
      <p>We do not collect any personal data unless explicitly provided by you (e.g., through our newsletter or contact forms).</p>
      
      <h2>2. Telemetry and Analytics</h2>
      <p>We use minimal, privacy-respecting analytics to gauge signal patterns (traffic) on our nodes. This data is fully anonymized and cannot be traced back to individual IP addresses or browser fingerprints.</p>

      <h2>3. Communication Links</h2>
      <p>When you transmit a message via our contact form, the payload is used solely for the purpose of establishing a communication link and is never sold, traded, or utilized for external marketing.</p>
      
      <h2>4. Protocol Modifications</h2>
      <p>We reserve the right to update this privacy policy globally. All significant changes will be broadcasted to active newsletter subscribers.</p>
    </div>
  );
}

export function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20 prose dark:prose-invert prose-headings:font-serif prose-a:text-teal inline-block w-full">
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
