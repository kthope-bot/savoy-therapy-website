import React from "react";
import MarketingLayout from "@/components/MarketingLayout";
import { ArrowRight } from "lucide-react";

type Founder = {
  name: string;
  designation: string;
  role: string;
};

type TeamMember = {
  name: string;
  designation: string;
  discipline: string;
};

type RegionGroup = {
  region: string;
  countLabel: string;
  members: TeamMember[];
};

const stats = [
  { value: "30+", label: "Licensed clinicians" },
  { value: "3", label: "Therapy disciplines" },
  { value: "4", label: "Regions served" },
];

const founders: Founder[] = [
  {
    name: 'Kishor “Kris” Thope',
    designation: 'Physical Therapist, Certified in Mechanical Diagnosis & Therapy',
    role: 'Founder & Physical Therapist',
  },
  {
    name: 'Lalaine Thope',
    designation: 'Physical Therapist',
    role: 'Founder & Physical Therapist',
  },
];

const regionalTeams: RegionGroup[] = [
  {
    region: 'Champaign-Urbana',
    countLabel: '11 team members',
    members: [
      { name: 'Michael Shane Gosnell', designation: 'Doctor of Physical Therapy', discipline: 'Physical Therapy' },
      { name: 'Audrey Dizon', designation: 'Doctor of Physical Therapy', discipline: 'Physical Therapy' },
      { name: 'Josh Brandenburg', designation: 'Physical Therapist Assistant', discipline: 'Physical Therapy' },
      { name: 'Charles Walworth', designation: 'Physical Therapist Assistant, Master of Public Health', discipline: 'Physical Therapy' },
      { name: 'Marybeth Ambrose', designation: 'Physical Therapist Assistant', discipline: 'Physical Therapy' },
      { name: 'Jennifer Rhee', designation: 'Physical Therapist Assistant', discipline: 'Physical Therapy' },
      { name: 'Nicole Dickerson', designation: 'Physical Therapist Assistant', discipline: 'Physical Therapy' },
      { name: 'Stephanie Stortzum', designation: 'Registered Occupational Therapist', discipline: 'Occupational Therapy' },
      { name: 'Brittany Leman', designation: 'Certified Occupational Therapy Assistant', discipline: 'Occupational Therapy' },
      { name: 'Rachel Calvin', designation: 'Certified Occupational Therapy Assistant', discipline: 'Occupational Therapy' },
      { name: 'Teresa Beard', designation: 'Certified Occupational Therapy Assistant', discipline: 'Occupational Therapy' },
    ],
  },
  {
    region: 'Bloomington-Normal',
    countLabel: '12 team members',
    members: [
      { name: 'Zeus Villanueva', designation: 'Physical Therapist', discipline: 'Physical Therapy' },
      { name: 'Ralph Junquera', designation: 'Physical Therapist', discipline: 'Physical Therapy' },
      { name: 'Avril Prabakaran', designation: 'Physical Therapist', discipline: 'Physical Therapy' },
      { name: 'Josh Gerdes', designation: 'Physical Therapist Assistant', discipline: 'Physical Therapy' },
      { name: 'Heidi Thorndyke', designation: 'Physical Therapist Assistant', discipline: 'Physical Therapy' },
      { name: 'Taylor Trimmer', designation: 'Physical Therapist Assistant', discipline: 'Physical Therapy' },
      { name: 'Haley Rice', designation: 'Registered Occupational Therapist', discipline: 'Occupational Therapy' },
      { name: 'Andrea Palmer', designation: 'Registered Occupational Therapist', discipline: 'Occupational Therapy' },
      { name: 'Tayler Kuhlmann', designation: 'Certified Occupational Therapy Assistant', discipline: 'Occupational Therapy' },
      { name: 'Kristi Hakes', designation: 'Certified Occupational Therapy Assistant', discipline: 'Occupational Therapy' },
      { name: 'Beth McBurney', designation: 'Speech-Language Pathologist', discipline: 'Speech Therapy' },
      { name: 'Lesley Milam', designation: 'Speech-Language Pathologist', discipline: 'Speech Therapy' },
    ],
  },
  {
    region: 'Decatur',
    countLabel: '4 team members',
    members: [
      { name: 'Lyle Walker', designation: 'Physical Therapist Assistant', discipline: 'Physical Therapy' },
      { name: 'Doug Blakey', designation: 'Physical Therapist Assistant', discipline: 'Physical Therapy' },
      { name: 'Jaime Wenberg', designation: 'Registered Occupational Therapist', discipline: 'Occupational Therapy' },
      { name: 'Brenna Woolery', designation: 'Certified Occupational Therapy Assistant', discipline: 'Occupational Therapy' },
    ],
  },
  {
    region: 'Peoria & Chillicothe',
    countLabel: '3 team members',
    members: [
      { name: 'Yul Talili', designation: 'Physical Therapist', discipline: 'Physical Therapy' },
      { name: 'Brien Brock', designation: 'Physical Therapist Assistant', discipline: 'Physical Therapy' },
      { name: 'Fern Reardon', designation: 'Certified Occupational Therapy Assistant', discipline: 'Occupational Therapy' },
    ],
  },
];

export default function TherapyRockstarsPage() {
  return (
    <MarketingLayout currentPath="/therapy-rockstars">
      <section className="relative overflow-hidden pb-14 pt-12 sm:pb-18 sm:pt-16">
        <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.94),transparent_42%),radial-gradient(circle_at_82%_16%,rgba(215,238,223,0.28),transparent_24%)]" />
        <div className="container relative">
          <div className="max-w-5xl">
            <div className="section-label">Therapy Rockstars</div>
            <h1 className="mt-6 max-w-[10ch] font-[DM_Sans] text-[3.6rem] leading-[0.92] tracking-[-0.06em] text-slate-950 sm:text-[4.8rem]">
              The people behind the care.
            </h1>
            <p className="section-copy mt-8 max-w-3xl">
              Savoy Therapy’s strength is its people. Our clinicians are licensed, experienced, and genuinely committed to the residents they serve. They show up every week, they know residents by name, and they treat every person’s goals as their own.
            </p>
            <p className="section-copy mt-6 max-w-3xl">
              Across four regions in Central Illinois, our team of physical therapists, occupational therapists, and speech-language pathologists brings the same standard of care to every community we serve.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container">
          <div className="grid gap-5 md:grid-cols-3">
            {stats.map((stat) => (
              <article
                key={stat.label}
                className="rounded-[1.8rem] border border-slate-900/8 bg-white/80 p-6 shadow-[0_20px_60px_rgba(61,80,113,0.10)]"
              >
                <div className="font-[DM_Sans] text-[2.6rem] leading-none tracking-[-0.05em] text-slate-950">{stat.value}</div>
                <p className="mt-3 text-[1rem] font-semibold text-slate-700">{stat.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-18 sm:pb-24">
        <div className="container">
          <div className="rounded-[2.2rem] border border-slate-900/8 bg-white/76 px-6 py-8 shadow-[0_24px_70px_rgba(61,80,113,0.10)] sm:px-8 sm:py-10 lg:px-10">
            <div className="max-w-3xl">
              <div className="section-label">Our founders</div>
              <h2 className="mt-5 max-w-[12ch] font-[DM_Sans] text-[2.8rem] leading-[0.98] tracking-[-0.05em] text-slate-950 sm:text-[3.5rem]">
                Built from the ground up by practicing physical therapists.
              </h2>
              <p className="mt-6 max-w-2xl text-[1.05rem] leading-8 text-slate-700">
                Savoy Therapy was built from the ground up by two practicing physical therapists who still show up in communities every week.
              </p>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {founders.map((founder) => (
                <article
                  key={founder.name}
                  className="rounded-[1.8rem] bg-[#eef5fb] p-6 ring-1 ring-slate-200/70 shadow-[0_18px_50px_rgba(61,80,113,0.08)]"
                >
                  <div className="inline-flex rounded-full bg-slate-900 px-4 py-2 text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-white">
                    Founder
                  </div>
                  <h3 className="mt-5 font-[DM_Sans] text-[1.8rem] leading-[1.02] tracking-[-0.04em] text-slate-950">
                    {founder.name}
                  </h3>
                  <p className="mt-3 text-[1rem] leading-7 text-slate-700">{founder.designation}</p>
                  <p className="mt-4 text-[0.9rem] font-semibold uppercase tracking-[0.16em] text-slate-500">{founder.role}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-18 sm:pb-24">
        <div className="container">
          <div className="max-w-4xl">
            <div className="section-label">Our team across Central Illinois</div>
            <h2 className="mt-5 max-w-[12ch] font-[DM_Sans] text-[2.8rem] leading-[0.98] tracking-[-0.05em] text-slate-950 sm:text-[3.5rem]">
              The clinicians communities and families count on every week.
            </h2>
          </div>

          <div className="mt-10 space-y-10">
            {regionalTeams.map((group) => (
              <section key={group.region} className="rounded-[2.2rem] border border-slate-900/8 bg-white/72 px-6 py-8 shadow-[0_22px_65px_rgba(61,80,113,0.08)] sm:px-8 sm:py-10">
                <div className="flex flex-col gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
                  <h3 className="font-[DM_Sans] text-[2rem] leading-[1.02] tracking-[-0.04em] text-slate-950">{group.region}</h3>
                  <p className="text-[0.92rem] font-semibold uppercase tracking-[0.16em] text-slate-500">{group.countLabel}</p>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {group.members.map((member) => (
                    <article
                      key={`${group.region}-${member.name}`}
                      className="rounded-[1.5rem] border border-slate-200/80 bg-[#fcfdff] p-5 shadow-[0_16px_44px_rgba(61,80,113,0.06)]"
                    >
                      <h4 className="font-[DM_Sans] text-[1.25rem] leading-tight tracking-[-0.03em] text-slate-950">
                        {member.name}
                      </h4>
                      <p className="mt-3 text-[0.98rem] leading-7 text-slate-700">{member.designation}</p>
                      <div className="mt-4 inline-flex rounded-full bg-[#d8f0ec] px-3 py-1.5 text-[0.76rem] font-semibold uppercase tracking-[0.15em] text-[#0f766e]">
                        {member.discipline}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="container">
          <div className="max-w-4xl">
            <div className="section-label">Want to be part of this team?</div>
            <p className="mt-5 max-w-3xl text-[1.08rem] leading-8 text-slate-700">
              We’re always looking for licensed physical therapists, occupational therapists, physical therapist assistants, certified occupational therapy assistants, and speech-language pathologists who believe in what we do.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <article className="rounded-[2rem] border border-slate-900/8 bg-[#f8f2df] p-7 shadow-[0_22px_65px_rgba(94,84,43,0.12)] sm:p-8">
              <div className="section-label text-slate-600">For clinicians</div>
              <h3 className="mt-5 max-w-[11ch] font-[DM_Sans] text-[2.2rem] leading-[1] tracking-[-0.05em] text-slate-950 sm:text-[2.7rem]">
                Join the Savoy Therapy team.
              </h3>
              <p className="mt-5 max-w-xl text-[1.02rem] leading-8 text-slate-700">
                We’re hiring licensed therapists who want to do their best work in senior living communities that actually care.
              </p>
              <a
                href="mailto:info@savoytherapy.com?subject=Savoy%20Therapy%20Resume"
                className="mt-8 inline-flex items-center gap-2 text-[1rem] font-semibold text-slate-900 transition hover:text-slate-700"
              >
                Send us your resume
                <ArrowRight className="h-4 w-4" />
              </a>
            </article>

            <article className="rounded-[2rem] bg-slate-950 p-7 text-white shadow-[0_26px_80px_rgba(15,23,42,0.22)] sm:p-8">
              <div className="section-label border-white/14 bg-white/8 text-blue-50/88">For communities</div>
              <h3 className="mt-5 max-w-[12ch] font-[DM_Sans] text-[2.2rem] leading-[1] tracking-[-0.05em] sm:text-[2.7rem]">
                Want a team like this in your community?
              </h3>
              <p className="mt-5 max-w-xl text-[1.02rem] leading-8 text-slate-200">
                Our clinicians are available, dependable, and genuinely invested in your residents’ progress. Let’s talk about what a Savoy Therapy partnership looks like.
              </p>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 text-[1rem] font-semibold text-white transition hover:text-slate-200"
              >
                Partner with Savoy Therapy
                <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
