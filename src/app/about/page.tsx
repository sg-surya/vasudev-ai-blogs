import Link from 'next/link';

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20 prose prose-headings:font-serif prose-headings:text-foreground prose-a:text-teal inline-block w-full">
      <h1>About Us</h1>
      <p><strong>Vasudev AI Chronicles</strong> is a technology blog founded by Surya Vasudev, dedicated to exploring the cutting edge of artificial intelligence, offline development, and open-source innovation. Our mission is to empower developers, enthusiasts, and students by providing in-depth tutorials, reviews, and insights into topics like offline AI, open-source LLMs, Android customization, automation, and performance optimization.</p>

      <p>Surya, an AI researcher and full-stack developer, started this blog to share real-world solutions and hands-on knowledge. Whether experimenting with local LLMs, building custom Android ROMs, or optimizing development workflows, we believe in practical guidance backed by experience. Our content is technical, authoritative, and aimed at the developer community.</p>

      <p>At Vasudev AI Chronicles, you can expect:</p>
      <ul>
        <li><strong>Detailed Tutorials:</strong> Step-by-step guides on setting up offline AI tools (like GPT4All), using agents (AutoGPT, LangChain), and more.</li>
        <li><strong>Tech Explainers:</strong> Easy-to-understand explanations of complex concepts (Llama models, Claude AI, etc.).</li>
        <li><strong>Productivity Tips:</strong> Articles on automating tasks, debloating systems, and boosting development performance.</li>
        <li><strong>Reviews &amp; Comparisons:</strong> Expert reviews of open-source tools and hardware for developers (CPUs, GPUs, software stacks).</li>
      </ul>

      <p>We believe in open knowledge. All our code snippets and instructions use open-source software wherever possible, and we credit original sources (e.g., official GitHub projects, research papers). We do not promote proprietary solutions unless necessary. Our aim is to keep everything accessible.</p>

      <h2>Who&rsquo;s Behind the Blog</h2>
      <ul>
        <li><em>Founder &amp; Author:</em> Surya Vasudev (a.k.a. Vasudev), a technology enthusiast with a passion for AI, privacy, and productivity. You can find his professional profile on LinkedIn or follow him on GitHub.</li>
        <li><em>Contributors:</em> We occasionally publish guest posts from industry experts and community members. If you&rsquo;d like to contribute or collaborate, please get in touch!</li>
      </ul>

      <p>Thank you for visiting Vasudev AI Chronicles. We hope our content inspires and assists you in your tech journey. For any feedback or questions, feel free to reach out via the <Link href="/contact"><strong>Contact Us</strong></Link> page or email.</p>
    </div>
  );
}
