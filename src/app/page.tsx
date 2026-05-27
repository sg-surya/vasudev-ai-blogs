import { posts } from "@/data/posts";
import { HeroSection } from "@/components/HeroSection";
import { CategoryPills } from "@/components/CategoryPills";
import { FeaturedGrid } from "@/components/FeaturedGrid";
import { LatestGrid } from "@/components/LatestGrid";
import { TrendingBar } from "@/components/TrendingBar";
import { CTAFooter } from "@/components/CTAFooter";

export default function Home() {
  const featured = posts[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Vasudev AI Chronicles",
        url: "https://blog.vasudevai.in",
        description:
          "A premium futuristic developer journal exploring Artificial Intelligence, Advanced Automation, and the bleeding edge of software engineering.",
        publisher: {
          "@type": "Organization",
          name: "Vasudev AI",
          logo: {
            "@type": "ImageObject",
            url: "https://blog.vasudevai.in/logo.png",
          },
        },
      },
      {
        "@type": "Blog",
        name: "Vasudev AI Chronicles",
        url: "https://blog.vasudevai.in",
        description:
          "Clarity in Code. Stories in Tech. Exploring AI, developer tools, and open-source innovation.",
        blogPost: posts.slice(0, 10).map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          description: p.excerpt,
          image: p.coverImage,
          datePublished: p.date,
          author: {
            "@type": "Person",
            name: p.author.name,
          },
        })),
      },
      {
        "@type": "Person",
        name: "Surya Pratap Singh",
        jobTitle: "AI Engineer & Founder",
        url: "https://blog.vasudevai.in/about",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 flex flex-col gap-10 md:gap-14 font-sans selection:bg-teal selection:text-white">
        <HeroSection featured={featured} />

        <CategoryPills posts={posts} />

        <FeaturedGrid posts={posts} />

        <LatestGrid posts={posts} />

        <TrendingBar posts={posts} />

        <CTAFooter />
      </main>
    </>
  );
}
