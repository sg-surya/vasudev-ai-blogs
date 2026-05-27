import { posts, categories } from "@/data/posts";

const baseUrl = "https://blog.vasudevai.in";

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function GET() {
  const staticPages: Array<{ loc: string; priority: string; changefreq: string; lastmod?: string }> = [
    { loc: "", priority: "1.0", changefreq: "daily" },
    { loc: "/articles", priority: "0.8", changefreq: "daily" },
    { loc: "/categories", priority: "0.8", changefreq: "daily" },
    { loc: "/about", priority: "0.8", changefreq: "daily" },
    { loc: "/contact", priority: "0.8", changefreq: "daily" },
    { loc: "/privacy", priority: "0.6", changefreq: "monthly" },
    { loc: "/terms", priority: "0.6", changefreq: "monthly" },
    { loc: "/disclaimer", priority: "0.6", changefreq: "monthly" },
    { loc: "/cookie", priority: "0.6", changefreq: "monthly" },
  ];

  const urls: Array<{ loc: string; priority: string; changefreq: string; lastmod?: string }> = [...staticPages, ...posts.map((p) => ({
    loc: `/article/${p.slug}`,
    priority: "0.8",
    changefreq: "weekly",
    lastmod: p.date,
  })), ...categories.map((c) => ({
    loc: `/categories?q=${encodeURIComponent(c)}`,
    priority: "0.7",
    changefreq: "weekly",
  }))];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${escapeXml(`${baseUrl}${u.loc}`)}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=UTF-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
