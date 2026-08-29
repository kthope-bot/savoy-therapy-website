import React, { useState } from "react";
import { ArrowRight, CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRecommendationResult, recommendationQuestions, type QuizOption } from "@/lib/siteContent";

type RecommendationQuizSectionProps = {
  compact?: boolean;
};

export default function RecommendationQuizSection({ compact = false }: RecommendationQuizSectionProps) {
  const [quizResponses, setQuizResponses] = useState<Record<string, QuizOption>>({});

  const quizAnsweredCount = recommendationQuestions.filter((question) => quizResponses[question.id]).length;
  const quizIsComplete = quizAnsweredCount === recommendationQuestions.length;
  const quizResult = quizIsComplete ? getRecommendationResult(quizResponses) : null;
  const visibleQuestions = recommendationQuestions.slice(
    0,
    Math.min(quizAnsweredCount + 1, recommendationQuestions.length),
  );

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleQuizSelection = (questionId: string, option: QuizOption) => {
    setQuizResponses((current) => ({
      ...current,
      [questionId]: option,
    }));
  };

  return (
    <section id="education" className={compact ? "pb-18 sm:pb-20" : "py-18 sm:py-24"}>
      <div className="container">
        <div className="grid gap-10 rounded-[2.4rem] border border-slate-900/8 bg-white/76 p-6 shadow-[0_28px_80px_rgba(61,80,113,0.12)] sm:p-8 lg:grid-cols-[0.88fr_1.12fr] lg:p-10">
          <div className="max-w-xl">
            <div className="section-label">Interactive guide</div>
            <h2 className="section-heading mt-6 max-w-[12ch]">Find the right support for your loved one.</h2>
            <p className="section-copy mt-7 max-w-xl">
              Answer 4 quick questions and we’ll point you in the right direction.
            </p>
            <p className="section-copy mt-6 max-w-xl">
              This guide is meant to feel like a calm first conversation — warm, clear, and helpful for
              families who want to understand what kind of therapy support may fit best.
            </p>
            <div className="mt-8 rounded-[1.6rem] border border-slate-900/8 bg-[#eef4ff] p-5 shadow-[0_18px_52px_rgba(61,80,113,0.08)]">
              <div className="flex items-center gap-3 text-slate-800">
                <CircleHelp className="h-5 w-5" />
                <span className="font-semibold">Warm, practical guidance</span>
              </div>
              <p className="mt-3 text-[0.98rem] leading-7 text-slate-700">
                No commitment. Just a real conversation with someone who can help.
              </p>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-full bg-[#e8efff] px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-slate-700">
                4-question guide
              </div>
              <div className="rounded-full border border-slate-900/10 px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                {quizAnsweredCount}/{recommendationQuestions.length} answered
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {visibleQuestions.map((question, index) => {
                const selected = quizResponses[question.id];

                return (
                  <div
                    key={question.id}
                    className="rounded-[1.55rem] border border-slate-900/8 bg-[#fbfcff] p-5 shadow-[0_14px_40px_rgba(61,80,113,0.06)]"
                  >
                    <div className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Question {index + 1} of {recommendationQuestions.length}
                    </div>
                    <h3 className="mt-3 font-[DM_Sans] text-[1.32rem] leading-tight tracking-[-0.03em] text-slate-950">
                      {question.prompt}
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-6 text-slate-600">{question.helper}</p>
                    <div className="mt-5 grid gap-3">
                      {question.options.map((option) => {
                        const isSelected = selected?.value === option.value;

                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handleQuizSelection(question.id, option)}
                            className={`w-full rounded-[1.25rem] border px-4 py-4 text-left transition ${
                              isSelected
                                ? "border-slate-900 bg-[#eef4ff] shadow-[0_14px_34px_rgba(61,80,113,0.14)]"
                                : "border-slate-900/10 bg-white shadow-sm hover:border-slate-900/18 hover:bg-[#f8fbff]"
                            }`}
                            aria-pressed={isSelected}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <div className="text-[1rem] font-semibold leading-6 text-slate-900">
                                  {option.label}
                                </div>
                                {option.description ? (
                                  <div className="mt-1 text-[0.92rem] leading-6 text-slate-600">
                                    {option.description}
                                  </div>
                                ) : null}
                              </div>
                              <span
                                className={`mt-1 h-4 w-4 rounded-full border ${
                                  isSelected
                                    ? "border-slate-900 bg-slate-900 shadow-[inset_0_0_0_3px_white]"
                                    : "border-slate-300 bg-white"
                                }`}
                                aria-hidden="true"
                              />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 rounded-[1.7rem] bg-[#eef4ff] p-5 ring-1 ring-slate-900/6 sm:p-6">
              {quizResult ? (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Your personalized result
                      </div>
                      <div className="mt-2 font-[DM_Sans] text-[1.95rem] leading-tight tracking-[-0.04em] text-slate-950">
                        {quizResult.headline}
                      </div>
                    </div>
                    <div className="rounded-full bg-white px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-slate-700 shadow-sm">
                      Warm next step
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {quizResult.services.map((service) => (
                      <span
                        key={service}
                        className="rounded-full border border-slate-900/10 bg-white px-4 py-2 text-[0.92rem] font-semibold text-slate-800 shadow-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                  <p className="mt-5 text-[1rem] leading-7 text-slate-700">{quizResult.experienceNote}</p>
                  <p className="mt-3 text-[1rem] leading-7 text-slate-700">{quizResult.priorityNote}</p>
                  <p className="mt-3 text-[1rem] leading-7 text-slate-700">{quizResult.locationNote}</p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[0.96rem] leading-6 text-slate-600">
                      No commitment. Just a real conversation with someone who can help.
                    </p>
                    <Button
                      className="h-12 rounded-full bg-slate-900 px-6 text-white transition hover:bg-slate-800"
                      onClick={scrollToContact}
                    >
                      Start a conversation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Your personalized result
                  </div>
                  <p className="mt-3 text-[1rem] leading-7 text-slate-700">
                    Answer all four questions and we’ll recommend the services that may be the best fit for
                    your loved one.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
