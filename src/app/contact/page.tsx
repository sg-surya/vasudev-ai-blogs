"use client";

import { Mail } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20 prose prose-headings:font-serif prose-headings:text-foreground prose-a:text-teal inline-block w-full">
      <h1>Contact Us</h1>
      <p>We appreciate your feedback, questions, and contributions! Here's how you can get in touch with the Vasudev AI Chronicles team:</p>

      <ul>
        <li><strong>Email:</strong> Send us an email at <strong>hello@vasudevai.in</strong>. Whether it's a question about an article, suggestions for topics, or just to say hello, we'll do our best to respond promptly.</li>
        <li><strong>Contact Form:</strong> Use the form on this page to send us a message directly. We typically respond within 2–3 business days.</li>
        <li><strong>Social Media:</strong> Connect with us on <a href="https://github.com/Vasudev-ai" target="_blank" rel="noopener noreferrer">GitHub</a>, <a href="https://www.linkedin.com/company/vasudev-ai/" target="_blank" rel="noopener noreferrer">LinkedIn</a>, or <a href="https://discord.gg/e5uPQDXSSk" target="_blank" rel="noopener noreferrer">Discord</a>.</li>
        <li><strong>Business Inquiries:</strong> For partnership, advertising, or guest-post proposals, please email <strong>business@vasudevai.in</strong>.</li>
      </ul>

      <p>We value open communication and are happy to engage with our readers. If you encounter any technical issues on the site (broken links, errors), or have concerns about content, please let us know. Your input helps improve Vasudev AI Chronicles for everyone.</p>
      
      <div className="not-prose mt-12 bg-card border border-border p-8 rounded-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
            <Mail className="w-5 h-5 text-teal" />
          </div>
          <h3 className="font-serif text-2xl font-bold tracking-tight">Send a Message</h3>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
