"use client";

import { useState, FormEvent } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">Name</label>
          <input type="text" id="name" name="name" required
            className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-teal transition-colors"
            placeholder="Surya Pratap" />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input type="email" id="email" name="email" required
            className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-teal transition-colors"
            placeholder="hello@vasudevai.in" />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">Message</label>
        <textarea id="message" name="message" rows={5} required
          className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-teal transition-colors"
          placeholder="How can we help you?"></textarea>
      </div>
      <button type="submit" disabled={status === "loading"}
        className="bg-teal text-white font-medium px-6 py-2 rounded-lg hover:bg-opacity-90 disabled:opacity-50 transition-opacity">
        {status === "loading" ? "Sending..." : status === "success" ? "Sent!" : status === "error" ? "Try Again" : "Send Message"}
      </button>
      {status === "success" && (
        <p className="text-sm text-green-600 font-medium">Message sent successfully. We'll get back to you soon.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-500 font-medium">Something went wrong. Please try again or email us directly.</p>
      )}
    </form>
  );
}
