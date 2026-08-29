import React from "react";
import type { BlogPost } from "@/lib/siteContent";
import { ArrowRight } from "lucide-react";

type BlogPostCardProps = {
  post: BlogPost;
  featured?: boolean;
};

export default function BlogPostCard({ post, featured = false }: BlogPostCardProps) {
  const isUpcoming = post.status === "upcoming";
  const href = `/blog/${post.slug}`;

  return (
    <article
      className={[
        "rounded-[1.9rem] border border-slate-200/80 bg-white shadow-[0_22px_65px_rgba(15,23,42,0.06)]",
        featured ? "p-7 sm:p-9" : "p-6",
      ].join(" ")}
    >
      <div className="flex flex-wrap items-center gap-3 text-[0.82rem] font-semibold uppercase tracking-[0.16em]">
        <span className="rounded-full bg-[#d8f0ec] px-3 py-1.5 text-[#0f766e]">{post.category}</span>
        <span className="text-slate-400">{post.date}</span>
        <span className="text-slate-400">{post.readTime}</span>
      </div>

      <h2
        className={[
          "mt-5 font-[DM_Sans] tracking-[-0.04em] text-slate-950",
          featured ? "max-w-3xl text-[2.35rem] leading-[1] sm:text-[3rem]" : "text-[1.6rem] leading-[1.08]",
        ].join(" ")}
      >
        {post.title}
      </h2>

      <p className={["mt-4 text-slate-600", featured ? "max-w-2xl text-[1.06rem] leading-8" : "text-[1rem] leading-7"].join(" ")}>
        {post.teaser}
      </p>

      <div className="mt-6">
        {isUpcoming ? (
          <span className="inline-flex items-center gap-2 text-[0.95rem] font-semibold text-slate-500">
            Coming soon
            <ArrowRight className="h-4 w-4" />
          </span>
        ) : (
          <a href={href} className="inline-flex items-center gap-2 text-[0.95rem] font-semibold text-slate-900 transition hover:text-slate-700">
            Read more
            <ArrowRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </article>
  );
}
