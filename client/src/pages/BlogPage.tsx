import React from "react";
import BlogPostCard from "@/components/BlogPostCard";
import MarketingLayout from "@/components/MarketingLayout";
import { blogCategories, blogPosts, featuredBlogPost } from "@/lib/siteContent";

export default function BlogPage() {
  const gridPosts = blogPosts.filter((post) => post.slug !== featuredBlogPost.slug);

  return (
    <MarketingLayout currentPath="/blog">
      <section className="relative overflow-hidden pb-14 pt-12 sm:pb-18 sm:pt-16">
        <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.94),transparent_42%),radial-gradient(circle_at_82%_16%,rgba(209,236,232,0.34),transparent_24%)]" />
        <div className="container relative">
          <div className="max-w-5xl">
            <div className="section-label">Insights &amp; Resources</div>
            <h1 className="mt-6 max-w-[12ch] font-[DM_Sans] text-[3.6rem] leading-[0.92] tracking-[-0.06em] text-slate-950 sm:text-[4.8rem]">
              Real answers for families navigating aging.
            </h1>
            <p className="section-copy mt-8 max-w-3xl">
              Weekly articles from Savoy Therapy’s clinical team — honest, practical, and written for the people who care most.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className="container">
          <div className="flex flex-wrap gap-3">
            {blogCategories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-slate-600 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-10 pt-6 sm:pb-12">
        <div className="container">
          <BlogPostCard post={featuredBlogPost} featured />
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-3">
            {gridPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
