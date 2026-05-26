import Link from "next/link";
import { posts, categories } from "@/data/posts";

export default function HTMLSitemap() {
  const pages = [
    { title: "Home", path: "/" },
    { title: "Articles Archive", path: "/articles" },
    { title: "Categories", path: "/categories" },
    { title: "About Surya", path: "/about" },
    { title: "Contact", path: "/contact" },
  ];

  const legalPages = [
    { title: "Privacy Policy", path: "/privacy" },
    { title: "Terms & Conditions", path: "/terms" },
    { title: "Disclaimer", path: "/disclaimer" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20 font-sans">
      <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-8">
        HTML Sitemap
      </h1>
      <p className="text-muted-foreground mb-12 text-lg">
        An overview of the complete architecture and available nodes on Surya AI Chronicles.
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-serif font-bold mb-6 border-b border-border pb-2">Core Pages</h2>
          <ul className="space-y-3 mb-10">
            {pages.map((p) => (
              <li key={p.path}>
                <Link href={p.path} className="text-muted-foreground hover:text-teal transition-colors">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-serif font-bold mb-6 border-b border-border pb-2">Legal & Compliance</h2>
          <ul className="space-y-3">
            {legalPages.map((p) => (
              <li key={p.path}>
                <Link href={p.path} className="text-muted-foreground hover:text-teal transition-colors">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold mb-6 border-b border-border pb-2">Topic Modules</h2>
          <ul className="space-y-3 mb-10">
            {categories.map((cat) => (
              <li key={cat}>
                <Link href={`/categories?q=${encodeURIComponent(cat)}`} className="text-muted-foreground hover:text-teal transition-colors">
                  {cat}
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-serif font-bold mb-6 border-b border-border pb-2">Article Database</h2>
          <ul className="space-y-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/article/${post.slug}`} className="text-muted-foreground hover:text-teal transition-colors line-clamp-1">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
