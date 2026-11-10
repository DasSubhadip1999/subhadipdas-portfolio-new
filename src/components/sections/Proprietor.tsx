"use client";

import { MapPin, Plane, Briefcase } from "lucide-react";
import { PERSONAL_INFO, SUMMARY } from "@/lib/data";
import { Board, SectionSign } from "@/components/Board";

const FACTS = [
  { icon: Briefcase, label: "Now", value: "Team Lead at Langoor", tone: "teal" as const },
  { icon: MapPin, label: "Based in", value: PERSONAL_INFO.location, tone: "white" as const },
  { icon: Plane, label: "Open to", value: PERSONAL_INFO.openTo, tone: "pink" as const },
];

export function Proprietor() {
  return (
    <section id="proprietor" className="py-20 sm:py-28">
      <div className="container">
        <SectionSign id="proprietor" title="The Proprietor" plain="About me" tone="green" />
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-7">
            {SUMMARY.map((p, i) => (
              <p key={i} className={i === 0 ? "max-w-[40ch] text-[clamp(1.4rem,2.6vw,1.9rem)] font-semibold leading-snug" : "max-w-[62ch] text-lg leading-relaxed text-[#15130F]/82"}>
                {p}
              </p>
            ))}
          </div>
          <ul className="grid content-start gap-12 pt-10 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1 lg:pt-4">
            {FACTS.map(({ icon: Icon, label, value, tone }, i) => (
              <li key={label} className={i % 2 ? "lg:ml-16" : ""}>
                <Board tone={tone} chain={36} strength={1.8} className="px-6 pb-5 pt-6">
                  <div className="relative z-10 flex items-start gap-3">
                    <Icon className="mt-1 h-5 w-5 shrink-0" />
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.16em] opacity-85">{label}</p>
                      <p className="mt-0.5 text-lg font-bold leading-snug">{value}</p>
                    </div>
                  </div>
                </Board>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
