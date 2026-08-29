import React from "react";
import BlogPostCard from "@/components/BlogPostCard";
import MarketingLayout from "@/components/MarketingLayout";
import { blogPosts, getBlogPostBySlug } from "@/lib/siteContent";
import NotFound from "@/pages/NotFound";
import { useRoute } from "wouter";

export default function BlogPostPage() {
  const [matches, params] = useRoute<{ slug: string }>("/blog/:slug");
  const post = matches ? getBlogPostBySlug(params.slug) : undefined;

  if (!post || post.status === "upcoming") {
    return <NotFound />;
  }

  const relatedPosts = post.relatedSlugs
    .map((slug) => getBlogPostBySlug(slug))
    .filter((value): value is NonNullable<typeof value> => Boolean(value));

  return (
    <MarketingLayout currentPath="/blog">
      <article className="relative overflow-hidden pb-18 pt-12 sm:pb-24 sm:pt-16">
        <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.94),transparent_42%),radial-gradient(circle_at_82%_16%,rgba(215,238,223,0.28),transparent_24%)]" />
        <div className="container relative">
          <div className="mx-auto max-w-4xl">
            <div className="section-label">{post.category}</div>
            <h1 className="mt-6 max-w-[14ch] font-[DM_Sans] text-[3.3rem] leading-[0.94] tracking-[-0.06em] text-[#0A1628] sm:text-[4.4rem]">
              {post.heroTitle ?? post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-[0.84rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
              <span>{post.category}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </article>

      <section className="pb-18 sm:pb-24">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-[2.2rem] bg-white px-6 py-8 shadow-[0_28px_80px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 sm:px-10 sm:py-12">
            <div className="space-y-6 text-[1.08rem] leading-8 text-slate-700">
              {post.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 space-y-10">
              {post.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="font-[DM_Sans] text-[2rem] leading-[1.02] tracking-[-0.04em] text-[#0A1628]">
                    {section.title}
                  </h2>
                  <div className="mt-5 space-y-5 text-[1.06rem] leading-8 text-slate-700">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.familyTip ? (
                    <div className="mt-5 rounded-[1.4rem] bg-[#f8fafc] px-5 py-4 text-[1rem] leading-7 text-slate-700 ring-1 ring-slate-200/70">
                      {section.familyTip}
                    </div>
                  ) : null}
                </section>
              ))}
            </div>

            <div className="mt-12 space-y-5 border-t border-slate-200 pt-8 text-[1.06rem] leading-8 text-slate-700">
              <h2 className="font-[DM_Sans] text-[2rem] leading-[1.02] tracking-[-0.04em] text-[#0A1628]">
                {post.conclusion[0]}
              </h2>
              {post.conclusion.slice(1).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10">
              <a
                href="#contact"
                className="inline-flex rounded-full bg-[#C0302D] px-7 py-3.5 text-[1rem] font-semibold text-white shadow-[0_14px_36px_rgba(192,48,45,0.2)] transition hover:bg-[#a52927]"
              >
                {post.ctaLabel}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="container">
          <div className="rounded-[2.2rem] bg-[#f8fafc] px-6 py-8 sm:px-8 sm:py-10">
            <div className="section-label text-slate-600">You might also like</div>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <BlogPostCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
