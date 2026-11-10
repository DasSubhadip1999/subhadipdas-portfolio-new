"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CERTIFICATES, EDUCATION, SKILLS, usedAt } from "@/lib/data";
import { Board, SectionSign } from "@/components/Board";
import { useGame } from "@/components/game/GameProvider";

export function Stock() {
  const { checkSkill } = useGame();
  const [pick, setPick] = useState<string | null>(null);
  const where = pick ? usedAt(pick) : [];

  const choose = (s: string) => {
    setPick(s);
    checkSkill(s);
  };

  return (
    <section id="stock" className="py-20 sm:py-28">
      <div className="container">
        <SectionSign id="stock" title="In Stock" plain="Skills · pick a tag" tone="teal" />

        <div className="grid gap-14 lg:grid-cols-12">
          <div className="space-y-9 lg:col-span-8">
            {SKILLS.map((g) => (
              <div key={g.group} className="relative grid gap-3 sm:grid-cols-[9rem_1fr] sm:gap-5">
                <p className="pt-3 font-sign text-2xl leading-none">{g.group}</p>
                <div className="relative pt-3">
                  {/* Metal rail the tags hang from. */}
                  <span aria-hidden className="absolute inset-x-0 top-0 h-[5px] rounded-full bg-gradient-to-b from-[#c9d0d4] to-[#6b757a] shadow-[0_2px_3px_rgba(0,0,0,.2)]" />
                  <ul className="flex flex-wrap gap-x-3 gap-y-4">
                    {g.items.map((s) => {
                      const on = pick === s;
                      return (
                        <li key={s} className="relative pt-3">
                          <span aria-hidden className="absolute left-1/2 top-0 h-3 w-[2px] -translate-x-1/2 bg-[#6b757a]" />
                          <button
                            onClick={() => choose(s)}
                            aria-pressed={on}
                            className={`board tone-${on ? "ink" : g.tone} hover-sway block min-h-[44px] px-4 py-2.5 text-[0.95rem] font-bold before:!inset-[4px] before:!border-[1.5px] after:!hidden`}
                          >
                            <span className="relative z-10">{s}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  {pick && g.items.includes(pick) && (
                    <p aria-hidden className="mt-3 text-base font-semibold lg:hidden">
                      <span className="font-bold">{pick}:</span> {where.length ? `used at ${where.join(", ")}` : "everyday practice across my roles"}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Board tone="white" chain={44} strength={1.4} className="min-h-[15rem] px-7 pb-7 pt-8">
                <div className="relative z-10" aria-live="polite">
                  <AnimatePresence mode="wait">
                    {pick ? (
                      <motion.div key={pick} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                        <p className="font-sign letter text-4xl leading-none">{pick}</p>
                        <p className="mt-4 text-sm font-bold uppercase tracking-[0.16em]">{where.length ? "Used at" : "Where it shows"}</p>
                        {where.length ? (
                          <ul className="mt-2 space-y-1.5 text-lg font-semibold">
                            {where.map((w) => (
                              <li key={w} className="flex items-center gap-2.5">
                                <span aria-hidden className="h-2 w-2 rotate-45 bg-[#C8321F]" />
                                {w}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-2 text-lg font-semibold leading-snug">Everyday practice across my roles, from planning to code review.</p>
                        )}
                      </motion.div>
                    ) : (
                      <motion.p key="empty" className="text-lg font-semibold leading-snug">
                        <span className="font-sign text-4xl leading-none">Stock check</span>
                        <br />
                        <span className="mt-3 block">Pick any tag on the rack to see where I&apos;ve used it.</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </Board>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-12 pt-6 md:grid-cols-2">
          <Board tone="yellow" chain={44} strength={1} className="px-7 pb-7 pt-8">
            <div className="relative z-10">
              <h3 className="font-sign letter text-4xl leading-none">Schooling</h3>
              <ul className="mt-5 space-y-4">
                {EDUCATION.map((e) => (
                  <li key={e.what}>
                    <p className="text-lg font-bold leading-snug">{e.what}</p>
                    <p className="text-base font-medium">
                      {e.where} · <span className="tabular-nums">{e.when}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Board>
          <Board tone="green" chain={44} strength={1} className="px-7 pb-7 pt-8">
            <div className="relative z-10">
              <h3 className="font-sign letter text-4xl leading-none">Certificates</h3>
              <ul className="mt-5 space-y-4">
                {CERTIFICATES.map((c) => (
                  <li key={c.what}>
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="items-center min-h-[44px] group inline-flex items-start gap-1.5 text-lg font-bold leading-snug underline decoration-2 underline-offset-[6px]">
                      {c.what} <ArrowUpRight className="mt-1 h-4 w-4 shrink-0" />
                    </a>
                    <p className="text-base font-medium">{c.where}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Board>
        </div>
      </div>
    </section>
  );
}
