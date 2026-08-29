export type CommunityPageData = {
  slug: string;
  city: string;
  marketLabel: string;
  headline: string;
  intro: string;
  populationFit: string;
  mapLabel: string;
  mapCenter: { lat: number; lng: number };
  serviceHighlights: string[];
  localCommunities: string[];
  familyFocus: string[];
  partnerValue: string[];
};

export const communityPages: CommunityPageData[] = [
  {
    slug: "champaign",
    city: "Champaign",
    marketLabel: "Champaign, Illinois",
    headline: "Therapy support for older adults and senior living partners in Champaign.",
    intro:
      "Savoy Therapy serves Champaign with a community-based model built around dignity, practical mobility support, and close collaboration with families and senior living teams. The emphasis stays on helping older adults keep doing the things that make life feel full, whether that means walking with more confidence, participating in community life, or simply moving through the day with less hesitation.",
    populationFit:
      "This page is designed for families, referral partners, and senior living operators looking for a thoughtful therapy partner in Champaign with experience supporting active aging, fall prevention, balance training, and day-to-day functional independence.",
    mapLabel: "Service area map centered on Champaign, Illinois",
    mapCenter: { lat: 40.1164, lng: -88.2434 },
    serviceHighlights: [
      "Physical, occupational, and speech therapy aligned to senior living routines",
      "Balance and gait support focused on safer independence and steadier daily mobility",
      "Education for families who want clear next steps rather than hospital-style jargon",
      "Premium specialty pathways such as StimPod consultations for appropriate households",
    ],
    localCommunities: [
      "Autumn Fields",
      "Brookdale",
      "Carriage Crossing of Champaign",
      "Bickford Senior Living Champaign",
      "Evergreen Place Champaign",
    ],
    familyFocus: [
      "Support walking, transfers, and confidence for older adults who want to stay engaged in everyday life",
      "Reduce fear-driven decision making by translating concerns into practical next steps",
      "Protect quality of life so favorite routines, outings, and family time remain more accessible",
    ],
    partnerValue: [
      "A therapy model designed for the pace and communication needs of senior living communities",
      "Consistent collaboration with leadership, caregiving teams, and referral relationships",
      "Brand-building education around active aging, fall prevention, and functional mobility",
    ],
  },
  {
    slug: "urbana",
    city: "Urbana",
    marketLabel: "Urbana, Illinois",
    headline: "Personal, mobility-focused therapy support for older adults in Urbana.",
    intro:
      "In Urbana, Savoy Therapy positions care as personal, calm, and highly usable in daily life. Rather than reducing therapy to isolated exercises, the focus is on strength, balance, coordination, and the confidence that helps older adults keep participating in home life, community life, and family life.",
    populationFit:
      "This local page speaks to households in Urbana who want thoughtful therapy guidance that protects independence and keeps the conversation centered on real routines such as errands, social events, church, travel, and time with grandchildren.",
    mapLabel: "Service area map centered on Urbana, Illinois",
    mapCenter: { lat: 40.1106, lng: -88.2073 },
    serviceHighlights: [
      "Mobility and balance support tailored to the goals that matter most at home and in the community",
      "Fall-prevention education that respects dignity while addressing real day-to-day risk",
      "Home Safety Assessment conversations for families who want clarity before a crisis",
      "A premium, supportive experience for adults searching for muscle recovery for seniors in Urbana IL",
    ],
    localCommunities: [
      "Local service support for older adults and families across the Urbana area",
      "Coordination with nearby senior living, family, and referral relationships in the Champaign-Urbana market",
    ],
    familyFocus: [
      "Explain what is changing in plain language when walking, standing, or transfers begin to feel harder",
      "Help families act earlier when fear of falling or reduced activity starts shrinking daily life",
      "Keep the tone reassuring, premium, and centered on independence rather than alarm",
    ],
    partnerValue: [
      "A responsive therapy partner with close ties to the broader Champaign-Urbana footprint",
      "Education-led positioning that helps differentiate Savoy Therapy from generic rehab vendors",
      "Community-based care that fits the rhythms of older adults’ real environments",
    ],
  },
  {
    slug: "savoy",
    city: "Savoy",
    marketLabel: "Savoy, Illinois",
    headline: "High-touch therapy services for older adults and families in Savoy.",
    intro:
      "Savoy Therapy’s local story in Savoy is about premium support that feels warm, approachable, and rooted in quality of life. Families are often looking for more than treatment alone. They want a partner who understands why confidence, comfort, and independence matter when someone wants to keep golfing, gardening, traveling, or staying active with the people they love.",
    populationFit:
      "This page is written for Savoy households and senior living partners who want therapy, fall-prevention guidance, and specialty mobility services delivered with an elevated, relationship-based feel.",
    mapLabel: "Service area map centered on Savoy, Illinois",
    mapCenter: { lat: 40.0548, lng: -88.2517 },
    serviceHighlights: [
      "Therapy support designed to help older adults move with greater ease and confidence",
      "Family guidance that keeps goals centered on independence and meaningful routines",
      "StimPod consultation access for appropriate premium private-pay conversations",
      "Home-safety and mobility planning for households preparing before a fall or setback changes daily life",
    ],
    localCommunities: [
      "Amber Glen",
      "Savoy Place",
      "The Windsor of Savoy",
    ],
    familyFocus: [
      "Preserve the routines that make life feel enjoyable, not just manageable",
      "Support safer movement at home and in the community without relying on intimidating medical language",
      "Give adult children a clearer understanding of what help may be appropriate now versus later",
    ],
    partnerValue: [
      "A premium local partner that complements senior living relationships in Savoy",
      "Clear, collaborative communication with families and operators",
      "Service messaging that blends wellness, function, and safer independence",
    ],
  },
  {
    slug: "bloomington",
    city: "Bloomington",
    marketLabel: "Bloomington, Illinois",
    headline: "Senior living therapy partnership support across Bloomington.",
    intro:
      "Savoy Therapy’s Bloomington presence supports older adults and senior living relationships with practical therapy services that help residents stay engaged in everyday routines. The care model centers on function, confidence, and collaboration, which helps communities and families feel more supported throughout the therapy experience.",
    populationFit:
      "This page is intended for Bloomington-area community leaders, referral partners, and families who want a dependable therapy presence focused on active aging, communication, and resident-centered care.",
    mapLabel: "Service area map centered on Bloomington, Illinois",
    mapCenter: { lat: 40.4842, lng: -88.9937 },
    serviceHighlights: [
      "Therapy services that fit naturally within senior living workflows",
      "Clear family education around mobility, fall risk, and function",
      "Resident-centered care that prioritizes daily routines and quality of life",
      "Operational support for communities that want a collaborative clinical partner",
    ],
    localCommunities: [
      "Evergreen Village",
      "Evergreen Place",
      "Blair House",
    ],
    familyFocus: [
      "Help residents stay active and involved rather than gradually withdrawing from daily life",
      "Support steadier transfers, safer walking, and stronger confidence in familiar environments",
      "Create a simpler path for families who want practical guidance rather than fragmented communication",
    ],
    partnerValue: [
      "Predictable coordination for community teams and referral sources",
      "A therapy story that strengthens resident trust and family confidence",
      "A balance of clinical structure and warm communication",
    ],
  },
  {
    slug: "normal",
    city: "Normal",
    marketLabel: "Normal, Illinois",
    headline: "Thoughtful therapy coverage for older adults and partners in Normal.",
    intro:
      "In Normal, Savoy Therapy extends its Bloomington-Normal footprint with a model that values consistency, clear education, and functional outcomes residents can feel in daily life. The approach is especially relevant for communities that want therapy to feel coordinated, familiar, and rooted in the routines residents already know.",
    populationFit:
      "This page supports conversations with Normal-area families and senior living operators who want a collaborative therapy partner with a strong emphasis on balance, mobility, and safer independence.",
    mapLabel: "Service area map centered on Normal, Illinois",
    mapCenter: { lat: 40.5142, lng: -88.9906 },
    serviceHighlights: [
      "Community-based physical, occupational, and speech therapy support",
      "Fall-prevention and mobility education that is easy for families to understand",
      "Therapy planning that respects both resident goals and operational realities",
      "Coverage connected to the wider Bloomington-Normal senior living footprint",
    ],
    localCommunities: [
      "Bickford Senior Living",
      "Regional support across the Bloomington-Normal market",
    ],
    familyFocus: [
      "Keep everyday routines feeling possible for longer",
      "Address mobility changes before they lead to deeper isolation or dependence",
      "Give families a calmer, more structured way to understand next steps",
    ],
    partnerValue: [
      "A therapy partner that supports consistency across the Bloomington-Normal area",
      "Communication that helps families feel informed instead of left guessing",
      "A resident-centered model that complements community culture",
    ],
  },
  {
    slug: "decatur",
    city: "Decatur",
    marketLabel: "Decatur, Illinois",
    headline: "Community-based therapy support for older adults in Decatur.",
    intro:
      "Savoy Therapy’s Decatur footprint is built around the same core promise found across its service area: help older adults move more confidently, protect their independence, and receive therapy support that feels personal rather than transactional. The model is especially valuable in settings where families want steadier communication and communities want dependable collaboration.",
    populationFit:
      "This Decatur page serves families, operators, and referral partners looking for a therapy team that understands both resident goals and the realities of senior living care delivery.",
    mapLabel: "Service area map centered on Decatur, Illinois",
    mapCenter: { lat: 39.8403, lng: -88.9548 },
    serviceHighlights: [
      "Therapy services aligned to safer daily mobility and functional independence",
      "Fall-prevention support rooted in practical routines and environmental awareness",
      "Family communication that makes progress and concerns easier to understand",
      "A collaborative style that supports both residents and community operations",
    ],
    localCommunities: [
      "Evergreen Place",
      "The Carriages of Decatur",
    ],
    familyFocus: [
      "Help older adults keep more of the life they enjoy as mobility changes emerge",
      "Reduce uncertainty when strength, balance, or walking confidence begin to decline",
      "Encourage earlier action before a fall or hospitalization narrows independence further",
    ],
    partnerValue: [
      "A reliable therapy presence for established Decatur senior living relationships",
      "Clear coordination with caregivers, leadership, and families",
      "A service story that balances dignity, function, and trust",
    ],
  },
  {
    slug: "peoria",
    city: "Peoria",
    marketLabel: "Peoria, Illinois",
    headline: "Resident-centered therapy partnership support in Peoria.",
    intro:
      "Peoria families and senior living teams can look to Savoy Therapy for a care model that blends clinical support with warmth, consistency, and practical day-to-day value. The focus remains on helping older adults move safely, stay involved in community life, and receive therapy that feels connected to real goals rather than generic treatment plans.",
    populationFit:
      "This page is intended for Peoria-area operators, families, and referral partners who want therapy services that reinforce trust, communication, and resident quality of life.",
    mapLabel: "Service area map centered on Peoria, Illinois",
    mapCenter: { lat: 40.6936, lng: -89.5890 },
    serviceHighlights: [
      "Therapy support oriented around daily mobility, independence, and resident participation",
      "Education for families navigating fall risk, mobility decline, or reduced activity",
      "A partnership model designed to fit smoothly within senior living settings",
      "Communication that helps communities and families stay aligned on goals",
    ],
    localCommunities: [
      "Bickford Senior Living",
    ],
    familyFocus: [
      "Protect confidence in walking, transfers, and daily routines",
      "Encourage earlier support when balance concerns begin affecting activity",
      "Keep the therapy conversation clear, calm, and centered on quality of life",
    ],
    partnerValue: [
      "A collaborative therapy presence for Peoria-area senior living partners",
      "A resident-first care experience that supports community reputation",
      "Education and communication that help differentiate Savoy Therapy locally",
    ],
  },
  {
    slug: "chillicothe",
    city: "Chillicothe",
    marketLabel: "Chillicothe, Illinois",
    headline: "Therapy services that support safer independence in Chillicothe.",
    intro:
      "Savoy Therapy’s Chillicothe presence reflects a simple idea: older adults deserve therapy support that helps them stay active, safe, and connected to the lives they enjoy. By keeping the focus on function, dignity, and communication, the experience becomes easier for both families and community teams to trust.",
    populationFit:
      "This page supports local conversations with Chillicothe families and senior living partners who want practical therapy guidance, dependable collaboration, and a more human approach to mobility support.",
    mapLabel: "Service area map centered on Chillicothe, Illinois",
    mapCenter: { lat: 40.9223, lng: -89.4862 },
    serviceHighlights: [
      "Therapy services that support balance, mobility, and everyday safety",
      "A family-friendly communication style focused on realistic next steps",
      "Fall-prevention guidance that reinforces confidence without creating alarm",
      "A care model built to fit trusted senior living relationships",
    ],
    localCommunities: [
      "Evergreen Place",
    ],
    familyFocus: [
      "Support independence before daily routines become noticeably smaller or harder",
      "Help families act thoughtfully when fall risk or slowed mobility begins to surface",
      "Preserve dignity and quality of life through early, practical support",
    ],
    partnerValue: [
      "A dependable therapy partner within the Chillicothe senior living footprint",
      "Resident-centered support that aligns with community life",
      "Warm, usable education for families and referral partners",
    ],
  },
];

export const communityPagesBySlug = Object.fromEntries(
  communityPages.map((page) => [page.slug, page]),
) as Record<string, CommunityPageData>;
