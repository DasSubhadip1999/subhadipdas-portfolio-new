"use client";

import { useState } from "react";
import { EXPERIENCE, type Job } from "@/lib/data";
import { Board, SectionSign } from "@/components/Board";

const SHOWN = 4;

function JobBoard({ job, index }: { job: Job; index: number }) {
  const [all, setAll] = useState(false);
  const points = all ? job.points : job.points.slice(0, SHOWN);
  const offset = ["lg:mr-24", "lg:ml-24", "lg:mr-40"][index] ?? "";
  return (
    <li className={`pt-14 ${offset}`}>
      <Board tone={job.tone} chain={56} strength={0.45} className="px-6 pb-8 pt-9 sm:px-10 sm:pb-10 sm:pt-11">
        <div className="relative z-10">
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
            <h3 className="font-sign letter text-[clamp(2.4rem,6vw,4.2rem)] leading-[0.95]">{job.company}</h3>
            <p className="pb-1 text-base font-bold tabular-nums">{job.period}</p>
          </div>
          <h4 className="mt-3 text-xl font-bold leading-snug">
            {job.role}
            {job.client && <span className="font-semibold opacity-90"> · for {job.client}</span>}
          </h4>
          {job.project && <p className="mt-1 text-base font-medium opacity-90">Project: {job.project}</p>}

          <ul id={`${job.id}-points`} className="mt-6 grid gap-x-10 gap-y-3 text-[1.05rem] leading-relaxed md:grid-cols-2">
            {points.map((p) => (
              <li key={p} className="flex gap-3">
                <span aria-hidden className="mt-[0.6em] h-2 w-2 shrink-0 rotate-45 bg-current opacity-80" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          {job.points.length > SHOWN && (
            <button
              onClick={() => setAll(!all)}
              aria-expanded={all}
              aria-controls={`${job.id}-points`}
              className="items-center min-h-[44px] inline-flex mt-5 text-base font-bold underline decoration-2 underline-offset-[6px]"
            >
              {all ? "Show fewer" : `Show all ${job.points.length}`}
            </button>
          )}

          <ul aria-label="Tech used" className="mt-7 flex flex-wrap gap-2">
            {job.tech.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Board>
    </li>
  );
}

export function Workshops() {
  return (
    <section id="workshops" className="py-20 sm:py-28">
      <div className="container">
        <SectionSign id="workshops" title="Workshops" plain="Experience · 3.5+ years" tone="vermilion" />
        <ol className="space-y-10">
          {EXPERIENCE.map((job, i) => (
            <JobBoard key={job.id} job={job} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
