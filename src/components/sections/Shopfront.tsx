"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { PERSONAL_INFO, RATE_CARD } from "@/lib/data";
import { Board, Chains, Stamp, useSwing } from "@/components/Board";
import { useGame } from "@/components/game/GameProvider";

function Counter({ value, decimals, prefix, suffix }: (typeof RATE_CARD)[number]) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, amount: 1 });
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || !seen) return;
    const fmt = (n: number) => `${prefix}${n.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
    if (reduce) return void (el.textContent = fmt(value));
    const c = animate(0, value, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (n) => (el.textContent = fmt(n)) });
    return () => c.stop();
  }, [seen, reduce, value, decimals, prefix, suffix]);
  // Server render shows the final value so nothing is wrong without JS.
  return (
    <span ref={ref} className="tabular-nums">
      {`${prefix}${value.toLocaleString("en-IN")}${suffix}`}
    </span>
  );
}

export function Shopfront() {
  const { state, visit, unlock, play } = useGame();
  const { rotate, nudge, release, reduce } = useSwing(1.2);
  const spinY = useMotionValue(0);
  const clicks = useRef(0);
  const sign = useRef<HTMLDivElement>(null);
  const seen = useInView(sign, { amount: 0.5, once: true });

  useEffect(() => {
    if (seen) visit("shop");
  }, [seen, visit]);

  const knock = () => {
    play("chain");
    if (reduce) return;
    rotate.set(clicks.current % 2 ? -7 : 7);
    setTimeout(() => rotate.set(0), 90);
    if (++clicks.current === 5) {
      clicks.current = 0;
      unlock("spinner");
      animate(spinY, 720, { duration: 1.6, ease: [0.2, 0.8, 0.2, 1], onComplete: () => spinY.set(0) });
    }
  };

  return (
    <section id="shop" className="relative pb-16 pt-6 sm:pb-24">
      <div className="container">
        <div ref={sign} className="relative pt-16 [perspective:1600px]">
          <motion.div
            style={{ rotate, rotateY: spinY, transformOrigin: "50% -64px" }}
            onPointerMove={nudge}
            onPointerLeave={release}
            onClick={knock}
            className="board tone-yellow cursor-pointer select-none px-6 pb-8 pt-9 sm:px-12 sm:pb-11 sm:pt-12 lg:px-16"
          >
            <Chains length={64} />
            <div className="relative z-10 text-center">
              <h1 className="font-sign letter text-[clamp(3.2rem,12vw,6rem)] leading-[0.95] tracking-[-0.01em]">{PERSONAL_INFO.name}</h1>
              <p lang="bn" className="mt-2 font-bangla text-[clamp(1.6rem,4vw,2.4rem)] leading-none text-[#C8321F]">
                {PERSONAL_INFO.nameBengali}
              </p>
              <div className="mx-auto mt-6 inline-block rounded-md bg-[#C8321F] px-5 py-3 text-[#FFFAF0] shadow-[inset_0_0_0_2px_#FFC72C,0_8px_14px_-8px_rgba(30,45,55,.6)] sm:px-8">
                <p className="font-sign letter text-[clamp(1.25rem,3.4vw,2.1rem)] leading-tight [--shade:#5e140b]">
                  {PERSONAL_INFO.role} · {PERSONAL_INFO.title}
                </p>
              </div>
            </div>
            <Stamp on={state.stamps.includes("shop")} label="Open" className="-bottom-14 right-0 !h-20 !w-20 sm:!h-28 sm:!w-28 sm:right-4 sm:-top-8 sm:bottom-auto" />
          </motion.div>
        </div>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7 lg:pt-6">
            <p className="max-w-[34ch] text-[clamp(1.35rem,2.4vw,1.75rem)] font-semibold leading-snug">
              I design and lead serverless AWS platforms and full stack apps with React, Next.js, Node.js and TypeScript.
            </p>
            <p className="mt-4 max-w-[58ch] text-lg leading-relaxed text-[#15130F]/80">
              Team Lead at Langoor today. Before that, three years building internal platforms for 10,000+ people at Hindustan Unilever. Walk the street below: every board you visit gets stamped.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={PERSONAL_INFO.resume} download onClick={() => unlock("resume")} className="plaque tone-ink">
                <Download className="h-5 w-5" /> Download resume
              </a>
              <a href="#enquiry" className="plaque tone-teal">
                Make an enquiry
              </a>
            </div>
            <a href="#proprietor" className="min-h-[44px] mt-10 inline-flex items-center gap-2 text-base font-bold underline decoration-2 underline-offset-[6px]">
              <ArrowDown className="h-4 w-4" /> Walk down the street
            </a>
          </div>

          <div className="pt-12 lg:col-span-5 lg:pt-0">
            <Board tone="white" chain={48} strength={1.4} className="mx-auto max-w-md px-7 pb-7 pt-8">
              <div className="relative z-10">
                <h2 className="font-sign letter text-4xl leading-none">Rate card</h2>
                <dl className="mt-5 space-y-3.5">
                  {RATE_CARD.map((r) => (
                    <div key={r.label} className="flex items-baseline gap-2">
                      <dt className="text-base font-semibold">{r.label}</dt>
                      <span aria-hidden className="mb-1 flex-1 border-b-[3px] border-dotted border-[#15130F]/35" />
                      <dd className="font-sign text-3xl leading-none text-[#1F4FA3]">
                        <Counter {...r} />
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 text-sm font-semibold text-[#15130F]/70">Percentages measured on shipped work at Hindustan Unilever.</p>
              </div>
            </Board>
          </div>
        </div>
      </div>
    </section>
  );
}
