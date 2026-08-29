import { Building2, HeartHandshake, ShieldCheck } from "lucide-react";

export type QuizOption = {
  label: string;
  value: string;
  description?: string;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  helper: string;
  options: QuizOption[];
};

export const serviceMarkets = ["Champaign-Urbana", "Bloomington-Normal", "Decatur", "Peoria", "Chillicothe"];

export const services: Array<{
  title: string;
  description: string;
  detail?: string;
  accent: string;
  ctaLabel?: string;
  ctaHref?: string;
}> = [
  {
    title: "Physical Therapy",
    description:
      "We help residents move better, hurt less, and recover with confidence. From post-surgical rehab to chronic pain management, our physical therapists build individualized plans focused on real functional goals — getting back to a walk, a routine, a life.",
    accent: "bg-white/76",
  },
  {
    title: "Occupational Therapy",
    description:
      "Independence looks different for everyone. Our occupational therapists work with residents on the daily activities that matter most to them — dressing, cooking, managing medications, and navigating their environment safely — so they can stay engaged in their own lives.",
    accent: "bg-[#f8f2df]",
  },
  {
    title: "Speech Therapy",
    description:
      "Communication and swallowing are fundamental to quality of life. Our speech-language pathologists address cognitive-communication challenges, language changes after stroke or illness, and swallowing disorders — helping residents stay connected to the people and experiences they love.",
    accent: "bg-[#edf6ef]",
  },
  {
    title: "Fall Prevention",
    description:
      "Falls are the leading cause of injury in older adults — and most are preventable. Our fall prevention program combines balance training, strength work, and environmental awareness to reduce risk and build the confidence to keep moving.",
    accent: "bg-[#eef2fb]",
  },
  {
    title: "Stimpod tPRF Therapy",
    description:
      "For residents living with chronic pain or nerve-related conditions, Savoy Therapy now offers Stimpod — a clinically proven, non-invasive treatment that targets the root cause of pain at the nervous system level. Using transcutaneous Pulsed Radio Frequency (tPRF) technology, Stimpod delivers fast-acting, lasting relief — with no medication, no needles, and no side effects. Most patients report meaningful improvement after just a few sessions.",
    detail:
      "Conditions treated include peripheral neuropathy, diabetic neuropathy, incontinence, chronic pain, and nerve pathologies. Please note: Stimpod tPRF Therapy is not covered by Medicare or private insurance. It is available as a private pay service. Our team is happy to answer any questions about pricing and what to expect.",
    accent: "bg-slate-950 text-white",
    ctaLabel: "Learn more about Stimpod",
    ctaHref: "/stimpod",
  },
];

export const staffingHighlights = [
  {
    title: "Licensed PT, OT, and SLP coverage",
    description:
      "Savoy Therapy can present a staffing model centered on licensed rehabilitation professionals who understand how to deliver consistent therapy services within senior living communities.",
  },
  {
    title: "Relationship-based clinical presence",
    description:
      "The staffing story emphasizes clinicians who build trust with residents, communicate clearly with families, and collaborate well with community leadership and caregiving teams.",
  },
  {
    title: "Operationally supportive partnership",
    description:
      "Rather than rotating in as outsiders, Savoy Therapy staff can be positioned as dependable partners who help communities maintain continuity, responsiveness, and a calm care experience.",
  },
];

export const differentiators = [
  {
    icon: Building2,
    title: "Built for senior living communities",
    description:
      "Savoy Therapy is designed for the pace, relationships, and communication needs of senior living environments rather than a one-size-fits-all rehab model.",
  },
  {
    icon: HeartHandshake,
    title: "Stronger resident and family trust",
    description:
      "Clear education and compassionate bedside manner help residents and families understand goals, progress, and next steps with confidence.",
  },
  {
    icon: ShieldCheck,
    title: "A practical focus on safer independence",
    description:
      "The clinical emphasis is not just treatment in isolation, but helping people move well, reduce risk, and keep doing what they love.",
  },
];

export const recommendationQuestions: QuizQuestion[] = [
  {
    id: "concern",
    prompt: "What’s your main concern for your loved one right now?",
    helper: "Pick the one that feels most urgent.",
    options: [
      {
        label: "Mobility or getting around safely",
        value: "mobility",
        description: "Walking, balance, strength, getting up from chairs",
      },
      {
        label: "Recovery after a fall or injury",
        value: "recovery",
        description: "Getting back to where they were before",
      },
      {
        label: "Managing daily tasks independently",
        value: "daily_tasks",
        description: "Dressing, cooking, medications, daily routines",
      },
      {
        label: "Communication or memory changes",
        value: "communication",
        description: "Speaking, swallowing, memory after stroke or illness",
      },
      {
        label: "Chronic pain or nerve-related discomfort",
        value: "pain",
        description: "Neuropathy, diabetic nerve pain, or persistent pain",
      },
    ],
  },
  {
    id: "location",
    prompt: "Where does your loved one currently live?",
    helper: "This helps us point you toward the best starting place.",
    options: [
      {
        label: "A senior living or assisted living community",
        value: "community",
        description: "We partner with 16 communities in Central Illinois",
      },
      {
        label: "At home or independently",
        value: "home",
        description: "They live on their own or with family",
      },
      {
        label: "We’re exploring options",
        value: "exploring",
        description: "Still figuring out the right living situation",
      },
    ],
  },
  {
    id: "experience",
    prompt: "Has your loved one seen a therapist before?",
    helper: "We’ll tailor the next step to what feels familiar or new.",
    options: [
      {
        label: "Yes, they have",
        value: "yes",
        description: "They’ve had PT, OT, or speech therapy before",
      },
      {
        label: "No, this would be new for them",
        value: "new",
        description: "They haven’t tried therapy or it’s been many years",
      },
      {
        label: "Not sure",
        value: "unsure",
      },
    ],
  },
  {
    id: "priority",
    prompt: "What matters most to you right now?",
    helper: "Choose the kind of support you want first.",
    options: [
      {
        label: "Understanding what therapy can actually do",
        value: "understanding",
        description: "I want realistic answers, not sales talk",
      },
      {
        label: "Getting started as soon as possible",
        value: "start_now",
        description: "I want to know next steps now",
      },
      {
        label: "Finding someone I can trust with my loved one",
        value: "trust",
        description: "I need to feel good about who’s caring for them",
      },
    ],
  },
];

const quizResultsByConcern = {
  mobility: {
    headline: "Your loved one may benefit from Physical Therapy and Fall Prevention.",
    services: ["Physical Therapy", "Fall Prevention", "Balance Training"],
  },
  recovery: {
    headline: "Your loved one may benefit from Physical Therapy and Fall Prevention.",
    services: ["Physical Therapy", "Fall Prevention", "Balance Training"],
  },
  daily_tasks: {
    headline: "Occupational Therapy could make a real difference here.",
    services: ["Occupational Therapy", "Physical Therapy"],
  },
  communication: {
    headline: "Speech Therapy and Occupational Therapy are likely the right fit.",
    services: ["Speech Therapy", "Occupational Therapy"],
  },
  pain: {
    headline: "Stimpod tPRF Therapy may offer meaningful relief.",
    services: ["Stimpod tPRF Therapy", "Physical Therapy"],
  },
} as const;

export const testimonialCards = [
  {
    quote:
      "We were so thankful for the services we received from Savoy Therapy. My mother's strength seems to be back or close to her previous levels. OT was so helpful in giving suggestions for setting up my mother's space so she could continue to do some things independently.",
    source: "Susan Bryant",
    platform: "Google review",
    date: "January 2021",
  },
  {
    quote:
      "My 89 year old sister needed physical therapy to gain strength and to improve her balance to prevent falls. The continuity of care was great and she just graduated from physical therapy due to her improved strength and balance.",
    source: "Jerry",
    platform: "Google review",
    date: "August 2022",
  },
];

export const communityGroups = [
  {
    market: "Champaign-Urbana",
    communities: [
      "Amber Glen",
      "Autumn Fields",
      "Brookdale",
      "Carriage Crossing of Champaign",
      "Bickford Senior Living Champaign",
      "Evergreen Place Champaign",
      "Savoy Place",
      "The Windsor of Savoy",
    ],
  },
  {
    market: "Bloomington-Normal",
    communities: ["Bickford Senior Living", "Evergreen Village", "Evergreen Place", "Blair House"],
  },
  {
    market: "Decatur",
    communities: ["Evergreen Place", "The Carriages of Decatur"],
  },
  {
    market: "Peoria",
    communities: ["Bickford Senior Living"],
  },
  {
    market: "Chillicothe",
    communities: ["Evergreen Place"],
  },
];

export const totalCommunityCount = communityGroups.reduce((sum, group) => sum + group.communities.length, 0);

export const communityRegionsDetailed = [
  {
    region: "Champaign-Urbana",
    communities: [
      { name: "Amber Glen", careTypes: ["Memory Care"] },
      { name: "Autumn Fields", careTypes: ["Assisted Living"] },
      { name: "Brookdale", careTypes: ["Assisted Living", "Memory Care"] },
      { name: "Carriage Crossing of Champaign", careTypes: ["Assisted Living"] },
      { name: "Bickford Senior Living Champaign", careTypes: ["Assisted Living", "Memory Care"] },
      { name: "Evergreen Place Champaign", careTypes: ["Assisted Living"] },
      { name: "Savoy Place", careTypes: ["Assisted Living"] },
      { name: "The Windsor of Savoy", careTypes: ["Assisted Living", "Independent Living"] },
    ],
  },
  {
    region: "Bloomington-Normal",
    communities: [
      {
        name: "Bickford Senior Living Bloomington",
        careTypes: ["Assisted Living", "Memory Care", "Independent Living"],
      },
      { name: "Evergreen Village", careTypes: ["Assisted Living", "Independent Living"] },
      { name: "Evergreen Place Normal", careTypes: ["Assisted Living"] },
      { name: "Blair House", careTypes: ["Independent Living"] },
    ],
  },
  {
    region: "Decatur",
    communities: [
      { name: "Evergreen Place Decatur", careTypes: ["Assisted Living"] },
      { name: "The Carriages of Decatur", careTypes: ["Assisted Living"] },
    ],
  },
  {
    region: "Peoria",
    communities: [
      {
        name: "Bickford Senior Living Peoria",
        careTypes: ["Assisted Living", "Memory Care", "Independent Living"],
      },
    ],
  },
  {
    region: "Chillicothe",
    communities: [{ name: "Evergreen Place Chillicothe", careTypes: ["Assisted Living", "Memory Care"] }],
  },
] as const;

export const communityPageLinks = [
  { label: "Champaign", href: "/communities/champaign" },
  { label: "Urbana", href: "/communities/urbana" },
  { label: "Savoy", href: "/communities/savoy" },
  { label: "Bloomington", href: "/communities/bloomington" },
  { label: "Normal", href: "/communities/normal" },
  { label: "Decatur", href: "/communities/decatur" },
  { label: "Peoria", href: "/communities/peoria" },
  { label: "Chillicothe", href: "/communities/chillicothe" },
];

export function getRecommendationResult(responses: Record<string, QuizOption>) {
  const concern = responses.concern?.value as keyof typeof quizResultsByConcern | undefined;

  if (!concern) {
    return null;
  }

  const baseResult = quizResultsByConcern[concern];
  const location = responses.location?.value;
  const experience = responses.experience?.value;
  const priority = responses.priority?.value;

  const experienceNote =
    experience === "yes"
      ? "Because they’ve had therapy before, we can build on what has already helped and focus on what still feels hard."
      : experience === "new"
        ? "If therapy feels new, that’s okay — we’ll keep the first conversation simple, clear, and easy to follow."
        : "If you’re not sure what therapy history they’ve had, we can help you sort through that together.";

  const priorityNote =
    priority === "understanding"
      ? "We’ll walk you through what therapy can realistically help with, in plain language and without pressure."
      : priority === "start_now"
        ? "If timing feels important, we can talk through the fastest next step and what getting started could look like."
        : "If trust is the biggest question, we’ll make space for the kind of conversation that helps families feel comfortable and informed.";

  const locationNote =
    location === "home"
      ? "And don’t worry — you don’t need to be in one of our partner communities to reach out. We’re happy to talk through options with any family."
      : location === "exploring"
        ? "If you’re still exploring living options, we can still help you think through what kind of therapy support may make the most sense."
        : "Because your loved one is already in a senior living or assisted living community, we can help you understand how therapy can fit naturally into daily life there.";

  return {
    ...baseResult,
    experienceNote,
    priorityNote,
    locationNote,
  };
}

export const blogCategories = [
  "Fall Prevention",
  "Memory & Aging",
  "Caregiver Support",
  "Therapy Explained",
  "Home Safety",
  "Community Life",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export type BlogPost = {
  slug: string;
  title: string;
  category: BlogCategory;
  date: string;
  readTime: string;
  teaser: string;
  heroTitle?: string;
  intro: string[];
  sections: Array<{
    title: string;
    body: string[];
    familyTip?: string;
  }>;
  conclusion: string[];
  ctaLabel: string;
  relatedSlugs: string[];
  status: "featured" | "published" | "upcoming";
};

export const blogPosts: BlogPost[] = [
  {
    slug: "five-things-i-notice-in-the-first-five-minutes",
    title: "5 things I notice in the first 5 minutes with a new patient",
    category: "Therapy Explained",
    date: "April 2026",
    readTime: "4 min read",
    teaser:
      "After 30+ years as a physical therapist, I've learned that the first five minutes tell me almost everything I need to know.",
    heroTitle: "5 things I notice in the first 5 minutes with a new patient",
    intro: [
      "After more than 30 years as a physical therapist, I’ve learned that the first five minutes with a new patient tell me almost everything I need to know.",
      "Not because I’m making snap judgments — but because the way someone moves, holds themselves, and responds when I walk into the room carries information that no intake form ever captures. Families sometimes ask me, ‘How do you know where to start?’ This is how.",
    ],
    sections: [
      {
        title: "1. How they get out of the chair",
        body: [
          "Before I’ve said more than hello, I’m watching how a patient rises from their seat. Do they push off the armrests? Do they rock forward first? Do they hesitate? A smooth, controlled sit-to-stand tells me one story. A labored, compensated movement tells me another. Chair transfers are one of the most functional things an older adult does dozens of times a day — and one of the most revealing windows into their strength, balance, and confidence.",
        ],
        familyTip:
          "What families can do: Pay attention to how your loved one gets up from chairs at home. If they’re using their hands more than usual, or if they avoid low chairs entirely, that’s worth mentioning to a therapist.",
      },
      {
        title: "2. Where they look when they walk",
        body: [
          "Most people don’t realize they do this, but many older adults with balance concerns look down at their feet when they walk. It’s a compensatory strategy — the brain is trying to gather more visual information to feel steady. The problem is that looking down shifts your center of gravity forward and actually increases fall risk. When I see it, I know we need to work on vestibular confidence, not just leg strength.",
        ],
        familyTip:
          "What families can do: Watch where your loved one focuses when walking, especially on unfamiliar surfaces. Looking down constantly is a red flag worth noting.",
      },
      {
        title: "3. How they answer ‘What brings you in today?’",
        body: [
          "This question matters less for the words and more for what’s underneath them. Some patients tell me exactly what’s wrong with clinical precision. Some deflect with humor. Some look at their family member to answer for them. Some say ‘I feel fine, my daughter made me come.’ Each of these tells me something important about motivation, self-awareness, and who the real stakeholder in this person’s recovery is going to be. Motivation is everything in therapy. I’d rather spend the first session finding out what someone genuinely wants to be able to do again than starting with exercises they don’t care about.",
        ],
        familyTip:
          "What families can do: Before the first appointment, have a conversation with your loved one about what they’d most like to be able to do — not what they can’t do anymore. Come in with a goal, not just a diagnosis.",
      },
      {
        title: "4. How they breathe",
        body: [
          "Shallow, effortful breathing during what should be easy movement is something I notice immediately. It can indicate pain being masked, anxiety, deconditioning, or a cardiac or pulmonary issue that hasn’t been flagged yet. I’m not a physician — but I am often the person who sees a patient move through functional activities in a way that a clinic appointment never captures. More than once, noticing a breathing pattern during a therapy evaluation has led to an important referral.",
        ],
        familyTip:
          "What families can do: If your loved one seems to get winded doing things that shouldn’t require much effort — standing, walking short distances, getting dressed — mention it both to their physician and to their therapist.",
      },
      {
        title: "5. Whether they ask me a question",
        body: [
          "This might be the most telling of all. A patient who asks ‘What are we going to work on?’ or ‘How long do you think this will take?’ is already engaged. A patient who sits quietly and waits to be told what to do needs a different approach — not a lesser one, just a different one. Therapy is not something that happens to a person. It’s something they do, with our support. The patients who make the most progress are almost always the ones who are curious, even when they’re scared.",
        ],
        familyTip:
          "What families can do: Encourage your loved one to come in with at least one question. It changes the dynamic from the very first session.",
      },
    ],
    conclusion: [
      "The bottom line",
      "Every patient I’ve ever worked with is more than their diagnosis, their age, or what the referral says about them. The first five minutes are my chance to start seeing the actual person — how they move, what they’re protecting, what they’re hoping for. That’s where good therapy begins.",
      "If you have questions about starting therapy for a loved one, or if something in this article sounds familiar, we’re always happy to talk. No referral needed to reach out.",
      "— Kishor ‘Kris’ Thope, PT, Cert. MDT | Founder, Savoy Therapy",
    ],
    ctaLabel: "Start a conversation →",
    relatedSlugs: [
      "why-your-loved-one-is-falling",
      "what-does-normal-aging-actually-look-like",
    ],
    status: "featured",
  },
  {
    slug: "why-your-loved-one-is-falling",
    title: "Why your loved one is falling — and it’s probably not what you think",
    category: "Fall Prevention",
    date: "Coming soon",
    readTime: "Upcoming",
    teaser:
      "Falls are rarely caused by one simple issue. We’ll break down the hidden factors families often miss and what to watch first.",
    intro: [],
    sections: [],
    conclusion: [],
    ctaLabel: "Read more →",
    relatedSlugs: ["five-things-i-notice-in-the-first-five-minutes"],
    status: "upcoming",
  },
  {
    slug: "the-hardest-conversation-families-have",
    title: "The hardest conversation families have with aging parents (and how to make it easier)",
    category: "Caregiver Support",
    date: "Coming soon",
    readTime: "Upcoming",
    teaser:
      "When safety, pride, and family dynamics collide, the right words matter. This post will offer a calmer way to start the conversation.",
    intro: [],
    sections: [],
    conclusion: [],
    ctaLabel: "Read more →",
    relatedSlugs: ["five-things-i-notice-in-the-first-five-minutes"],
    status: "upcoming",
  },
  {
    slug: "what-does-normal-aging-actually-look-like",
    title: "What does ‘normal aging’ actually look like? A therapist answers",
    category: "Memory & Aging",
    date: "Coming soon",
    readTime: "Upcoming",
    teaser:
      "Families hear ‘that’s just aging’ all the time. We’ll sort out what is expected, what is not, and when to ask better questions.",
    intro: [],
    sections: [],
    conclusion: [],
    ctaLabel: "Read more →",
    relatedSlugs: ["five-things-i-notice-in-the-first-five-minutes"],
    status: "upcoming",
  },
];

export const featuredBlogPost = blogPosts.find((post) => post.status === "featured")!;

export const publishedBlogPosts = blogPosts.filter((post) => post.status !== "upcoming");

export const latestBlogPosts = blogPosts.slice(0, 3);

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export type DownloadableResource = {
  slug: string;
  title: string;
  category: string;
  description: string;
  audience: string;
  format: string;
  href: string;
  accent: string;
  bullets: string[];
};

export const downloadableResources: DownloadableResource[] = [
  {
    slug: "fall-prevention-tips",
    title: "10 Fall Prevention Tips Every Family Should Know",
    category: "Fall Prevention",
    description:
      "This guide gives you 10 practical, clinically proven strategies to reduce fall risk starting today.",
    audience: "Families and older adults",
    format: "Printable PDF",
    href: "/manus-storage/guide1_fall_prevention_6bc71b09.pdf",
    accent: "bg-[#f7edd1]",
    bullets: [
      "10 practical fall-prevention strategies families can use right away",
      "Clinical guidance from the Savoy Therapy team",
      "Simple actions that support steadier movement at home",
    ],
  },
  {
    slug: "warning-signs-of-fall-risk",
    title: "Warning Signs of Fall Risk in Older Adults",
    category: "Fall Prevention",
    description:
      "This guide helps you recognize the early warning signs — physical, functional, and behavioral — so you can act before it is too late.",
    audience: "Families and older adults",
    format: "Printable PDF",
    href: "/manus-storage/guide2_warning_signs_c926c9ed.pdf",
    accent: "bg-[#eef2fb]",
    bullets: [
      "Physical warning signs you can observe at home",
      "Functional changes that often show up before a fall",
      "Behavioral clues families may miss until risk increases",
    ],
  },
  {
    slug: "home-safety-checklist-for-older-adults",
    title: "Home Safety Checklist for Older Adults",
    category: "Home Safety",
    description:
      "A room-by-room guide to preventing falls at home.",
    audience: "Families and older adults",
    format: "Printable PDF",
    href: "/manus-storage/guide3_home_safety_checklist_a8fad037.pdf",
    accent: "bg-[#edf6ef]",
    bullets: [
      "Room-by-room checklist for common fall hazards",
      "Simple walk-through format families can complete together",
      "Clear action list for anything that still needs attention",
    ],
  },
  {
    slug: "choose-the-right-walker-or-cane",
    title: "How to Choose the Right Walker or Cane",
    category: "Mobility & Equipment",
    description:
      "This guide explains the different types of canes and walkers, who each is designed for, and what to look for when making a decision.",
    audience: "Families and caregivers",
    format: "Printable PDF",
    href: "/manus-storage/guide4_walker_cane_guide_8bba8350.pdf",
    accent: "bg-white",
    bullets: [
      "Compares common cane and walker options",
      "Explains who each mobility aid is designed for",
      "Highlights what to look for before choosing equipment",
    ],
  },
  {
    slug: "indoor-vs-outdoor-walkers",
    title: "Indoor vs Outdoor Walkers: What's the Difference?",
    category: "Mobility & Equipment",
    description:
      "This guide explains what makes walkers different and how to choose the right one — or whether you need two.",
    audience: "Families and caregivers",
    format: "Printable PDF",
    href: "/manus-storage/guide5_indoor_outdoor_walkers_44e8d9f9.pdf",
    accent: "bg-[#eef6f5]",
    bullets: [
      "Explains why indoor and outdoor surfaces change walker needs",
      "Covers which walker types work best in each environment",
      "Helps families decide whether one walker or two makes more sense",
    ],
  },
];
