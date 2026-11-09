import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trackCtaClick, trackFormSubmission, trackGaEvent, trackPhoneTap } from "@/lib/analytics";
import { trpc } from "@/lib/trpc";
import { FileText, Phone, Trees, Users } from "lucide-react";
import { toast } from "sonner";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Therapy Rockstars", href: "/therapy-rockstars" },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Communities", href: "/communities" },
  { label: "Careers", href: "/careers" },
];

const interestOptions = [
  "Family therapy support",
  "Community partnership",
  "Fall prevention and balance support",
  "Resources or general question",
];

const SAVOY_LOGO_URL = "/Savoy_Therapy_Logo_Enhanced.webp";

// "Join Our Team" destination: Gusto job posting (opens in a new tab).
export const JOIN_TEAM_URL =
  "https://jobs.gusto.com/postings/savoy-therapy-physical-therapist-assistant-a6c7d2ec-379e-4693-a859-8eee28464849";
const joinTeamIsExternal = /^https?:\/\//.test(JOIN_TEAM_URL);

type MarketingLayoutProps = {
  children: React.ReactNode;
  currentPath: string;
  showContactSection?: boolean;
};

type ContactLeadPayload = {
  fullName: string;
  email: string;
  phone?: string;
  organization?: string;
  interest: string;
  message?: string;
  sourcePage: string;
};

export default function MarketingLayout({
  children,
  currentPath,
  showContactSection = true,
}: MarketingLayoutProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [interest, setInterest] = useState(interestOptions[0]);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const contactMutationFallback: {
    mutateAsync: (input: ContactLeadPayload) => Promise<{ success: boolean; leadId: number | null }>;
    isPending: boolean;
  } = {
    mutateAsync: async (_input: ContactLeadPayload) => ({ success: false, leadId: null }),
    isPending: false,
  };
  const shortcutMutationFallback: {
    mutateAsync: (input: { shortcutAction: "call" | "inquiry"; sourcePage: string }) => Promise<{ success: boolean; eventId: number | null }>;
  } = {
    mutateAsync: async (_input: { shortcutAction: "call" | "inquiry"; sourcePage: string }) => ({ success: false, eventId: null }),
  };

  let submitContactLead = contactMutationFallback;
  let recordMobileShortcut = shortcutMutationFallback;

  try {
    const mutationFactory = trpc.contact?.submitLead?.useMutation;
    const shortcutMutationFactory = trpc.contact?.recordMobileShortcut?.useMutation;

    if (mutationFactory) {
      submitContactLead = mutationFactory();
    }
    if (shortcutMutationFactory) {
      recordMobileShortcut = shortcutMutationFactory();
    }
  } catch {
    submitContactLead = contactMutationFallback;
    recordMobileShortcut = shortcutMutationFallback;
  }

  const normalizedSourcePage = currentPath === "/" ? "home" : currentPath.replace(/^\//, "") || "site";

  const handleGlobalConversionClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null;
    const anchor = target?.closest("a");

    if (!anchor) {
      return;
    }

    const href = anchor.getAttribute("href") ?? "";
    const label = anchor.textContent?.trim().replace(/\s+/g, " ") || "link";
    const placement = anchor.getAttribute("data-analytics-placement") ?? undefined;

    if (href.startsWith("tel:")) {
      trackPhoneTap({
        sourcePage: normalizedSourcePage,
        placement,
        phoneNumber: href.replace(/^tel:/, ""),
        label,
      });
      return;
    }

    if (href === "#contact" || anchor.getAttribute("data-track-cta") === "true") {
      trackCtaClick({
        sourcePage: normalizedSourcePage,
        placement,
        label,
        destination: href,
      });
    }
  };

  const trackLeadShortcut = (shortcutAction: "call" | "inquiry") => {
    if (typeof window === "undefined") return;

    recordMobileShortcut
      .mutateAsync({
        shortcutAction,
        sourcePage: normalizedSourcePage,
      })
      .catch(error => {
        console.error("[Mobile shortcut tracking error]", error);
      });

    const payload = {
      shortcut_action: shortcutAction,
      source_page: normalizedSourcePage,
      page_location: window.location.href,
    };

    if (shortcutAction === "call") {
      trackPhoneTap({
        sourcePage: normalizedSourcePage,
        placement: "mobile_shortcut_call",
        phoneNumber: "2178988393",
        label: "Call Savoy Therapy",
      });
    } else {
      trackCtaClick({
        sourcePage: normalizedSourcePage,
        placement: "mobile_shortcut_inquiry",
        label: "Start a conversation",
        destination: "#contact",
      });
    }

    trackGaEvent("mobile_shortcut_clicked", payload);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentInterest = interest;
    const result = await submitContactLead.mutateAsync({
      fullName,
      email,
      phone: phone || undefined,
      organization: organization || undefined,
      interest: currentInterest,
      message: message || undefined,
      sourcePage: normalizedSourcePage,
    });

    if ((result as { success?: boolean }).success) {
      trackFormSubmission({
        sourcePage: normalizedSourcePage,
        placement: "shared_contact_section",
        formName: "shared_contact_form",
        formType: currentInterest,
      });
      setSubmitted(true);
      setFullName("");
      setEmail("");
      setPhone("");
      setOrganization("");
      setInterest(interestOptions[0]);
      setMessage("");
      toast.success("Your message has been received. Savoy Therapy can follow up soon.");
      if (typeof window !== "undefined") {
        const thankYouPath = `/contact-thank-you?interest=${encodeURIComponent(currentInterest)}&source=${encodeURIComponent(normalizedSourcePage)}`;
        window.history.pushState({}, "", thankYouPath);
        window.dispatchEvent(new window.PopStateEvent("popstate"));
      }
      return;
    }

    toast.error("We could not save your message just now. Please try again.");
  };

  return (
    <div className="min-h-screen bg-background text-foreground" onClickCapture={handleGlobalConversionClick}>
      <header className="sticky top-0 z-40 border-b border-[#4157A2]/10 bg-[color:rgba(236,241,252,0.94)] shadow-[0_8px_24px_rgba(65,87,162,0.06)] backdrop-blur-xl">
        <div className="container">
          <div className="flex items-center justify-between gap-3 py-3 sm:gap-6 sm:py-4">
            <a href="/" className="min-w-0 shrink text-left">
              <img
                src={SAVOY_LOGO_URL}
                alt="Savoy Therapy"
                className="h-10 w-auto max-w-[170px] object-contain sm:h-16 sm:max-w-[360px]"
              />
            </a>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <Button
                className="h-10 rounded-full bg-[#0201FE] px-4 text-[0.92rem] font-semibold text-white shadow-[0_10px_30px_rgba(2,1,254,0.24)] transition hover:bg-[#0101C4] sm:h-11 sm:px-6 sm:text-[0.98rem]"
                asChild
              >
                <a
                  href={JOIN_TEAM_URL}
                  data-track-cta="true"
                  data-analytics-placement="header_join_team"
                  {...(joinTeamIsExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  Join Our Team
                </a>
              </Button>
              <Button
                className="hidden h-11 rounded-full bg-[#C0302D] px-6 text-white shadow-[0_10px_30px_rgba(192,48,45,0.24)] transition hover:bg-[#a52927] sm:inline-flex"
                asChild
              >
                <a href="#contact" data-analytics-placement="desktop_header_cta">Start a conversation</a>
              </Button>
            </div>
          </div>

          <nav
            aria-label="Main"
            className="flex gap-1 overflow-x-auto border-t border-[#4157A2]/10 py-2 text-[0.95rem] [scrollbar-width:none] lg:justify-center [&::-webkit-scrollbar]:hidden"
          >
            {navigationItems.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 transition ${
                    isActive ? "bg-[#4157A2]/10 font-semibold text-[#4157A2]" : "text-slate-700 hover:text-[#4157A2]"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      </header>

      <main className={showContactSection ? "pb-24 sm:pb-0" : undefined}>{children}</main>

      {showContactSection ? (
        <>
          <div className="fixed inset-x-4 bottom-4 z-40 flex items-center gap-3 rounded-full border border-[#4157A2]/14 bg-white/96 p-2 shadow-[0_20px_50px_rgba(65,87,162,0.18)] backdrop-blur sm:hidden">
            <a
              href="tel:2178988393"
              onClick={() => trackLeadShortcut("call")}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#4157A2] px-4 text-[0.95rem] font-semibold text-white transition hover:bg-[#374a8a]"
            >
              <Phone className="h-4 w-4" />
              Call now
            </a>
            <a
              href="#contact"
              onClick={() => trackLeadShortcut("inquiry")}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-[#C0302D]/14 bg-[#C0302D]/8 px-4 text-[0.95rem] font-semibold text-[#C0302D] transition hover:bg-[#C0302D]/12"
            >
              <FileText className="h-4 w-4" />
              Start inquiry
            </a>
          </div>

            <section id="contact" className="pb-20 pt-10 sm:pb-24">
          <div className="container">
            <div className="rounded-[2.4rem] bg-[#4157A2] px-7 py-10 text-white shadow-[0_32px_90px_rgba(65,87,162,0.28)] sm:px-10 sm:py-12 lg:px-14 lg:py-14">
              <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-4 py-2 text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-blue-50/88">
                    <Users className="h-4 w-4" />
                    Let’s talk about partnership
                  </div>
                  <h2 className="mt-6 max-w-[11ch] font-[DM_Sans] text-[3rem] leading-[0.95] tracking-[-0.05em] sm:text-[4rem]">
                    Therapy support that feels coordinated, calm, and credible.
                  </h2>
                  <p className="mt-6 max-w-xl text-[1.08rem] leading-8 text-blue-50/88">
                    Savoy Therapy can introduce its regional presence, explain its community-based model, and help families understand how therapy supports safer independence.
                  </p>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                      <a
                        href="tel:2178988393"
                        data-analytics-placement="contact_phone_card"
                        className="rounded-[1.4rem] border border-white/14 bg-white/8 p-5 transition hover:bg-white/12"
                      >

                      <div className="flex items-center gap-3 text-blue-50/88">
                        <Phone className="h-4 w-4" />
                        Phone
                      </div>
                      <div className="mt-3 font-[DM_Sans] text-[1.4rem] tracking-[-0.03em] text-white">217-898-8393</div>
                    </a>
                    <div className="rounded-[1.4rem] border border-white/14 bg-white/8 p-5">
                      <div className="flex items-center gap-3 text-blue-50/88">
                        <FileText className="h-4 w-4" />
                        Fax
                      </div>
                      <div className="mt-3 font-[DM_Sans] text-[1.4rem] tracking-[-0.03em] text-white">217-633-4553</div>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <Button
                      className="h-13 rounded-full bg-[#C0302D] px-7 text-[1rem] text-white shadow-[0_14px_36px_rgba(192,48,45,0.24)] transition hover:bg-[#a52927]"
                      asChild
                    >
                      <a href="tel:2178988393" data-analytics-placement="contact_call_button">Call Savoy Therapy</a>
                    </Button>
                    <div className="inline-flex items-center gap-3 text-blue-50/88">
                      <Trees className="h-4 w-4" />
                      Serving communities across Central Illinois
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.8rem] border border-white/14 bg-white/10 p-6 shadow-[0_20px_60px_rgba(8,34,61,0.18)] backdrop-blur">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <div className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-blue-50/75">
                        Contact form conversions
                      </div>
                      <h3 className="mt-2 font-[DM_Sans] text-[1.8rem] leading-tight tracking-[-0.03em] text-white">
                        Start the conversation here.
                      </h3>
                    </div>
                    <a href="/contact-report" className="text-sm font-semibold text-blue-50/88 transition hover:text-white">
                      View contact report
                    </a>
                  </div>

                  {submitted ? (
                    <div className="mt-6 rounded-[1.4rem] border border-white/14 bg-[#6FBD44]/18 p-5 text-[1rem] leading-7 text-white">
                      Thank you. Your message was recorded as a contact inquiry, and the Savoy Therapy team can follow up with the right next step.
                    </div>
                  ) : null}

                  <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="grid gap-2 text-sm text-blue-50/88">
                        Full name
                        <Input
                          required
                          value={fullName}
                          onChange={event => setFullName(event.target.value)}
                          placeholder="Your full name"
                          className="border-white/18 bg-white text-[#0A1628] placeholder:text-slate-500"
                        />
                      </label>
                      <label className="grid gap-2 text-sm text-blue-50/88">
                        Email
                        <Input
                          required
                          type="email"
                          value={email}
                          onChange={event => setEmail(event.target.value)}
                          placeholder="you@example.com"
                          className="border-white/18 bg-white text-[#0A1628] placeholder:text-slate-500"
                        />
                      </label>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="grid gap-2 text-sm text-blue-50/88">
                        Phone
                        <Input
                          value={phone}
                          onChange={event => setPhone(event.target.value)}
                          placeholder="217-555-0123"
                          className="border-white/18 bg-white text-[#0A1628] placeholder:text-slate-500"
                        />
                      </label>
                      <label className="grid gap-2 text-sm text-blue-50/88">
                        Community or organization
                        <Input
                          value={organization}
                          onChange={event => setOrganization(event.target.value)}
                          placeholder="Community name"
                          className="border-white/18 bg-white text-[#0A1628] placeholder:text-slate-500"
                        />
                      </label>
                    </div>
                    <label className="grid gap-2 text-sm text-blue-50/88">
                      What are you reaching out about?
                      <select
                        value={interest}
                        onChange={event => setInterest(event.target.value)}
                        className="h-11 rounded-md border border-white/18 bg-white px-3 text-sm text-[#0A1628] outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-white/40"
                      >
                        {interestOptions.map(option => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="grid gap-2 text-sm text-blue-50/88">
                      Message
                      <Textarea
                        value={message}
                        onChange={event => setMessage(event.target.value)}
                        placeholder="Share a few details so the right team member can follow up."
                        className="min-h-[130px] border-white/18 bg-white text-[#0A1628] placeholder:text-slate-500"
                      />
                    </label>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm leading-6 text-blue-50/72">
                        Each submission is stored as a contact lead and appears in the lightweight internal report.
                      </p>
                      <Button
                        type="submit"
                        disabled={submitContactLead.isPending}
                        className="h-11 rounded-full bg-[#C0302D] px-6 text-white transition hover:bg-[#a52927] disabled:opacity-70"
                      >
                        {submitContactLead.isPending ? "Sending…" : "Send message"}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>

              <footer className="mt-14 border-t border-white/14 pt-8 text-sm text-blue-50/70">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <img
                      src={SAVOY_LOGO_URL}
                      alt="Savoy Therapy"
                      className="h-14 w-auto max-w-[280px] object-contain brightness-0 invert"
                    />
                    <p className="mt-3 max-w-lg leading-7 text-blue-50/72">
                      Therapy services for senior living communities across Champaign-Urbana, Bloomington-Normal, Decatur, Peoria, and Chillicothe.
                    </p>
                  </div>
                  <div className="space-y-2 text-blue-50/78 lg:text-right">
                    <div>
                      <a className="transition hover:text-white" href="tel:2178988393" data-analytics-placement="footer_phone_link">
                        Phone: 217-898-8393
                      </a>
                    </div>
                    <div>Fax: 217-633-4553</div>
                    <div>
                      <a className="transition hover:text-white" href="/contact-report">
                        Contact report
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {navigationItems.map((item) => (
                      <a key={item.href} className="transition hover:text-white" href={item.href}>
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </section>
        </>
      ) : null}
    </div>
  );
}
