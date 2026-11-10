"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, RotateCcw } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/data";
import { SectionSign, useSwing } from "@/components/Board";
import { useGame } from "@/components/game/GameProvider";

function Stall({ p }: { p: Project }) {
  const { flip, play } = useGame();
  const [back, setBack] = useState(false);
  const { rotate, nudge, release, reduce } = useSwing(0.9);
  const frontBtn = useRef<HTMLButtonElement>(null);
  const backBtn = useRef<HTMLButtonElement>(null);
  const turn = () => {
    play("flip");
    if (!back) flip(p.id);
    setBack(!back);
    // Keep keyboard focus on the face that is now showing.
    requestAnimationFrame(() => (back ? frontBtn : backBtn).current?.focus({ preventScroll: true }));
  };
  const face = `board tone-${p.tone} [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [grid-area:1/1] flex flex-col`;

  return (
    <li className="relative pt-12 [perspective:1600px]">
      <motion.div style={{ rotate, transformOrigin: "50% -48px" }} onPointerMove={nudge} onPointerLeave={release} className="relative h-full">
        <span aria-hidden className="pointer-events-none absolute inset-x-0 -top-12 flex h-12 justify-between px-[16%]">
          <span className="chain" />
          <span className="chain" />
        </span>
        <motion.div
          className="grid h-full [transform-style:preserve-3d]"
          animate={{ rotateY: back && !reduce ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 140, damping: 17 }}
        >
          {/* Front */}
          <button
            ref={frontBtn}
            onClick={turn}
            data-quiet
            aria-hidden={back}
            tabIndex={back ? -1 : 0}
            className={`${face} min-h-[19rem] p-7 text-left sm:p-8 ${back ? "motion-reduce:invisible" : ""}`}
          >
            <span className="relative z-10 flex h-full flex-col">
              <span className="self-start rounded-[4px] border-2 border-current px-2.5 py-0.5 text-sm font-bold uppercase tracking-[0.14em]">{p.badge}</span>
              <span className="font-sign letter mt-6 text-[clamp(2.2rem,4vw,3rem)] leading-[0.98]">{p.title}</span>
              <span className="mt-4 text-lg font-medium leading-snug">{p.tagline}</span>
              <span className="mt-6 flex flex-wrap gap-1.5">
                {p.tech.slice(0, 4).map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </span>
              <span className="min-h-[44px] mt-auto inline-flex items-center gap-2 pt-8 text-base font-bold underline decoration-2 underline-offset-[6px]">
                <RotateCcw className="h-4 w-4" /> Turn the board
              </span>
            </span>
          </button>

          {/* Back */}
          <div
            aria-hidden={!back}
            className={`${face} p-6 sm:p-7 motion-safe:[transform:rotateY(180deg)] ${back ? "" : "motion-reduce:invisible"}`}
          >
            <div className="relative z-10 flex h-full flex-col">
              {p.image && (
                <div className="relative mb-5 aspect-[16/8] overflow-hidden rounded-[4px] shadow-[0_0_0_3px_var(--board-line)]">
                  <Image src={p.image} alt={`${p.title} screenshot`} fill sizes="(min-width: 1024px) 380px, 90vw" className="object-cover object-top" />
                </div>
              )}
              <p className="font-sign text-2xl leading-none">{p.title}</p>
              <ul className="mt-3 space-y-1.5 text-[0.98rem] leading-snug">
                {p.points.map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <span aria-hidden className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rotate-45 bg-current" />
                    {x}
                  </li>
                ))}
              </ul>
              <ul aria-label="Tech used" className="mt-4 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <li key={t} className="tag !text-[0.74rem]">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 text-base font-bold">
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer" tabIndex={back ? 0 : -1} className="min-h-[44px] inline-flex items-center gap-1 underline decoration-2 underline-offset-[6px]">
                    Visit live <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer" tabIndex={back ? 0 : -1} className="min-h-[44px] inline-flex items-center gap-1 underline decoration-2 underline-offset-[6px]">
                    <Github className="h-4 w-4" /> Code
                  </a>
                )}
                <button ref={backBtn} onClick={turn} data-quiet tabIndex={back ? 0 : -1} className="ml-auto inline-flex items-center gap-1.5">
                  <RotateCcw className="h-4 w-4" /> Turn back
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </li>
  );
}

export function Stalls() {
  const { state } = useGame();
  return (
    <section id="stalls" className="py-20 sm:py-28">
      <div className="container">
        <SectionSign id="stalls" title="Stalls" plain="Projects · tap a board to turn it" tone="blue" />
        <p className="-mt-6 mb-4 text-base font-semibold text-[#15130F]/75">
          Turned {state.flipped.length} of {PROJECTS.length} boards. Client projects are under NDA, so they show what I built rather than the code.
        </p>
        <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <Stall key={p.id} p={p} />
          ))}
        </ul>
      </div>
    </section>
  );
}
