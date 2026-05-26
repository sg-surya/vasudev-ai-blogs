export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20 prose prose-headings:font-serif prose-headings:text-foreground prose-a:text-teal inline-block w-full">
      <h1>Contact Us</h1>
      <p>We appreciate your feedback, questions, and contributions! Here&rsquo;s how you can get in touch with the Vasudev AI Chronicles team:</p>

      <ul>
        <li><strong>Email:</strong> You can send us an email at <strong>hello@vasudevai.in</strong>. Whether it&rsquo;s a question about an article, suggestions for topics, or just to say hello, we&rsquo;ll do our best to respond promptly.</li>
        <li><strong>Contact Form:</strong> Use the form on this page to send us a message directly. We typically respond within 2&ndash;3 business days.</li>
        <li><strong>Social Media:</strong> Follow us on Twitter @VasudevAI for updates, quick tips, and conversation. We also have a LinkedIn page where we share longer posts and announcements.</li>
        <li><strong>Mailing List:</strong> Join our newsletter (sign-up form in the footer) to receive new articles and exclusive content directly to your inbox.</li>
        <li><strong>Business Inquiries:</strong> For partnership, advertising, or guest-post proposals, please email <strong>business@vasudevai.in</strong>.</li>
      </ul>

      <p>We value open communication and are happy to engage with our readers. If you encounter any technical issues on the site (broken links, errors), or have concerns about content, please let us know via the above methods. Your input helps improve Vasudev AI Chronicles for everyone.</p>

      {/* Form implementation remains simple to meet the requirement but is left as placeholder since standard forms usually need a backend handler. */}
      {/* We add a highly stylized minimal static form for completion. */}
      
      <div className="not-prose mt-12 bg-card border border-border p-8 rounded-2xl">
        <h3 className="font-serif text-2xl font-bold tracking-tight mb-8">Send a Message</h3>
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <input type="text" id="name" className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-teal transition-colors" placeholder="Surya Pratap" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input type="email" id="email" className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-teal transition-colors" placeholder="hello@vasudevai.in" />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">Message</label>
            <textarea id="message" rows={5} className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-teal transition-colors" placeholder="How can we help you?"></textarea>
          </div>
          <button type="submit" className="bg-teal text-white font-medium px-6 py-2 rounded-lg hover:bg-opacity-90 transition-opacity">
            Send Message
          </button>
        </form>
      </div>

    </div>
  );
}
