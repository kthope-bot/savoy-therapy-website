import { Toaster } from "@/components/ui/sonner";
import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import AboutPage from "./pages/AboutPage";
import BalanceIQPage from "./pages/BalanceIQPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import CommunitiesOverviewPage from "./pages/CommunitiesOverviewPage";
import CommunityPage from "./pages/CommunityPage";
import ContactReportPage from "./pages/ContactReportPage";
import ContactThankYouPage from "./pages/ContactThankYouPage";
import EducationPage from "./pages/EducationPage";
import Home from "./pages/Home";
import HomeSafetyAssessmentPage from "./pages/HomeSafetyAssessmentPage";
import ServicesPage from "./pages/ServicesPage";
import StimPodPage from "./pages/StimPodPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import TherapyRockstarsPage from "./pages/TherapyRockstarsPage";

const CANONICAL_BASE_URL = "https://www.savoytherapy.com";

export function syncCanonicalUrl(pathname: string) {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const canonicalHref = `${CANONICAL_BASE_URL}${normalizedPath === "/" ? "/" : normalizedPath}`;

  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

  if (!canonicalLink) {
    canonicalLink = document.createElement("link");
    canonicalLink.setAttribute("rel", "canonical");
    document.head.appendChild(canonicalLink);
  }

  canonicalLink.setAttribute("href", canonicalHref);
}

export function EducationRedirect() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    setLocation("/resources", { replace: true });
  }, [setLocation]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={AboutPage} />
      <Route path="/balanceiq" component={BalanceIQPage} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/therapy-rockstars" component={TherapyRockstarsPage} />
      <Route path="/testimonials" component={TestimonialsPage} />
      <Route path="/resources" component={EducationPage} />
      <Route path="/education" component={EducationRedirect} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={BlogPostPage} />
      <Route path="/communities" component={CommunitiesOverviewPage} />
      <Route path="/contact-report" component={ContactReportPage} />
      <Route path="/contact-thank-you" component={ContactThankYouPage} />
      <Route path="/stimpod" component={StimPodPage} />
      <Route path="/home-safety-assessment" component={HomeSafetyAssessmentPage} />
      <Route path="/communities/:slug" component={CommunityPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();

  useEffect(() => {
    syncCanonicalUrl(location);
  }, [location]);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
