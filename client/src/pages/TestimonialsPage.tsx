import React from "react";
import { ArrowRight, ExternalLink, Quote, Star } from "lucide-react";
import MarketingLayout from "@/components/MarketingLayout";

const featuredReview = {
  quote:
    "My 89-year-old sister needed physical therapy to gain strength and to improve her balance to prevent falls. She recently had her second hip replaced and her recovery was slow at the rehab center. The therapy team at Savoy Therapy was wonderful. My sister moved from independent to assisted living during rehab and the Savoy team was able to support her in both facilities. The continuity of care was great and she just graduated from physical therapy due to her improved strength and balance. Her family is thankful for the Savoy Therapy team.",
  name: "Jerry",
  tag: "Family Member",
  source: "Google",
};

const reviews = [
  {
    name: "Carla Wheeler",
    tag: "Executive Director, Autumn Fields",
    source: "Email",
    quote:
      "I wanted to share some positive feedback regarding your therapy team. One of our residents’ daughters mentioned how wonderful her mother is doing and noted a significant improvement in her care compared to our previous provider. She also expressed great appreciation for your team’s professionalism and the results she is seeing. I wanted to echo her sentiments; your team has delivered exactly what we were looking for. Thank you for your hard work and for providing such an amazing team and care.",
  },
  {
    name: "Susan Bryant",
    tag: "Family Member",
    source: "Google",
    quote:
      "We were so thankful for the services we received from Savoy Therapy. My mother’s strength seems to be back to her previous levels. Suggestions made when you first evaluated my mother — such as a shower chair — became unneeded as she became stronger over the last two months. OT was so helpful in giving suggestions for setting up my mother’s space so she could continue to do some things independently. Stephanie was so professional and ‘can do.’ She was also amazing at communicating with the family to understand how to help my mother. I wish I had understood what OT offers so we could have gotten services for my mother earlier. Thanks so much!",
  },
  {
    name: "Kristyn Durre",
    tag: "Senior Living Community Staff",
    source: "Facebook",
    quote:
      "Savoy Therapy does a fantastic job with therapy. They take care of our residents at Amber Glen Alzheimer’s Special Care Center. Thanks for always doing the very best with our seniors!",
  },
  {
    name: "Julie Johnston",
    tag: "Family Member",
    source: "Google",
    quote:
      "The Savoy therapists who helped my mom after several falls — Mary, Marybeth, Audrey — are so professional and caring. They treat my mom as they would their own, which I so appreciate. I would strongly recommend them to anyone in need.",
  },
  {
    name: "Emily Eisenman",
    tag: "Family Member",
    source: "Google",
    quote:
      "I cannot say enough good things about Savoy Therapy. My mother needed in-home therapy after a hip fracture. Savoy was able to get her on their schedule in just a few days. Kris came out and gave some very helpful suggestions for making the home more friendly for her. My mother raved about how kind and caring all the staff who treated her were. Great people — highly recommended!",
  },
  {
    name: "Bradley Kelm",
    tag: "Patient",
    source: "Google",
    quote:
      "I am 45 and had a full hip replacement. Kris did my in-home therapy for 3 weeks. He was awesome. You can tell they genuinely care about the patient and it’s more than just a job. Can’t say enough about the personal care I received and how much it helped me get back to full strength.",
  },
  {
    name: "Beth Funk",
    tag: "Family Member",
    source: "Google",
    quote:
      "Thank you for all the work you have done with my mom. It was great to work with you. You were able to accommodate my schedule and were always thinking of her protection during this COVID-19 season.",
  },
] as const;

const reviewLink = "https://g.page/r/Cf-bch66uiyKEBM/review";

function FiveStars() {
  return (
    <div className="flex items-center gap-1 text-[#d0a84d]" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className="h-4 w-4 fill-current" />
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <MarketingLayout currentPath="/testimonials">
      <section className="relative overflow-hidden pb-14 pt-12 sm:pb-18 sm:pt-16">
        <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.94),transparent_42%),radial-gradient(circle_at_82%_16%,rgba(215,238,223,0.28),transparent_24%)]" />
        <div className="container relative">
          <div className="max-w-5xl">
            <div className="section-label">Testimonials</div>
            <h1 className="mt-6 max-w-[12ch] font-[DM_Sans] text-[3.6rem] leading-[0.92] tracking-[-0.06em] text-[#0A1628] sm:text-[4.8rem]">
              What families and communities say about us.
            </h1>
            <p className="section-copy mt-8 max-w-3xl">
              The most important thing we can tell you about Savoy Therapy is what the people we’ve served say about us. These are their words.
            </p>
            <div className="mt-8 inline-flex flex-wrap items-center gap-3 rounded-full border border-slate-900/10 bg-white/74 px-5 py-3 text-[0.92rem] font-semibold text-slate-800 shadow-[0_14px_40px_rgba(15,23,42,0.08)]">
              <span className="text-[#d0a84d]">★★★★★</span>
              <span>5.0 on Google</span>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-10 sm:pb-12">
        <div className="container">
          <article className="rounded-[2.1rem] bg-[#dff1ed] px-7 py-8 shadow-[0_30px_90px_rgba(36,107,105,0.14)] ring-1 ring-black/5 sm:px-10 sm:py-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-4xl">
                <Quote className="h-10 w-10 text-[#4157A2]/55" />
                <p className="mt-5 font-[DM_Serif_Display] text-[1.65rem] italic leading-[1.55] tracking-[-0.02em] text-slate-900 sm:text-[2.15rem]">
                  “{featuredReview.quote}”
                </p>
              </div>
              <div className="min-w-[14rem] rounded-[1.5rem] bg-white/72 p-5 shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
                <div className="font-[DM_Sans] text-[1.15rem] tracking-[-0.03em] text-[#0A1628]">{featuredReview.name}</div>
                <div className="mt-2 inline-flex rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-slate-600">
                  {featuredReview.tag}
                </div>
                <div className="mt-4">
                  <FiveStars />
                </div>
                <div className="mt-3 text-[0.84rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {featuredReview.source}
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="pb-18 sm:pb-24">
        <div className="container">
          <div className="grid gap-5 xl:grid-cols-3 md:grid-cols-2">
            {reviews.map((item) => (
              <article
                key={item.name}
                className="flex h-full flex-col rounded-[1.8rem] border border-slate-900/8 bg-white/78 p-6 shadow-[0_20px_60px_rgba(61,80,113,0.10)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex rounded-full border border-slate-900/10 bg-[#f7f3e7] px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-600">
                    {item.tag}
                  </div>
                  <div className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-slate-500">{item.source}</div>
                </div>
                <div className="mt-5">
                  <FiveStars />
                </div>
                <p className="mt-5 flex-1 text-[1rem] leading-7 text-slate-700">“{item.quote}”</p>
                <div className="mt-6 border-t border-slate-900/10 pt-4 font-[DM_Sans] text-[1.05rem] tracking-[-0.02em] text-[#0A1628]">
                  {item.name}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-10 sm:pb-14">
        <div className="container">
          <div className="rounded-[2rem] bg-[#f7edd1] px-7 py-8 text-center shadow-[0_24px_70px_rgba(94,84,43,0.11)] sm:px-10 sm:py-10">
            <div className="section-label mx-auto w-fit text-slate-600">Leave a review</div>
            <h2 className="mt-5 font-[DM_Sans] text-[2.3rem] leading-[1.02] tracking-[-0.05em] text-[#0A1628] sm:text-[3rem]">
              Had a great experience with Savoy Therapy?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[1.02rem] leading-8 text-slate-700">
              Your review helps other families find the right support at the right time. It takes less than two minutes and makes a real difference.
            </p>
            <a
              href={reviewLink}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-[0.98rem] font-semibold text-slate-900 shadow-[0_14px_36px_rgba(15,23,42,0.10)] transition hover:bg-slate-50"
            >
              Leave us a Google review
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="pb-20 pt-2 sm:pb-24">
        <div className="container">
          <div className="grid gap-8 rounded-[2.2rem] bg-[#0A1628] px-7 py-8 text-white shadow-[0_30px_90px_rgba(15,31,56,0.24)] sm:px-10 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <div className="section-label border-white/18 bg-white/10 text-slate-100">Ready to talk?</div>
              <h2 className="mt-5 max-w-[12ch] font-[DM_Sans] text-[2.7rem] leading-[0.97] tracking-[-0.05em] text-white sm:text-[3.4rem]">
                Ready to experience this for your loved one?
              </h2>
            </div>
            <div>
              <p className="max-w-xl text-[1.02rem] leading-8 text-slate-200">
                No commitment. Just a real conversation with a team that genuinely cares.
              </p>
              <a
                href="#contact"
                className="mt-7 inline-flex items-center gap-2 text-[0.98rem] font-semibold text-white transition hover:text-slate-200"
              >
                Start a conversation
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
