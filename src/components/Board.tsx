"use client";

import { useEffect, useId, useRef } from "react";
import { motion, useInView, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useVelocity, type MotionValue } from "framer-motion";
import type { Tone } from "@/lib/data";
import { useGame } from "@/components/game/GameProvider";

const clamp = (v: number, n: number) => Math.max(-n, Math.min(n, v));

// A spring that swings a hanging board when the page scrolls or the cursor brushes it.
export function useSwing(strength = 1) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const rotate = useSpring(0, { stiffness: 120, damping: 5, mass: 0.7 });
  useMotionValueEvent(velocity, "change", (v) => {
    if (!reduce) rotate.set(clamp((-v / 700) * strength, 3.5 * strength));
  });
  const nudge = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    rotate.set(((e.clientX - r.left) / r.width - 0.5) * -2.4 * strength);
  };
  return { rotate, nudge, release: () => rotate.set(0), reduce };
}

export function Chains({ length = 44 }: { length?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-full flex justify-between px-[12%]" style={{ height: length }}>
      {[0, 1].map((i) => (
        <span key={i} className="chain" />
      ))}
    </div>
  );
}

type BoardProps = {
  tone: Tone;
  className?: string;
  children: React.ReactNode;
  chain?: number | false;
  strength?: number;
  rotate?: MotionValue<number>;
  style?: React.CSSProperties;
};

export function Board({ tone, className = "", children, chain = 44, strength = 1, rotate, style }: BoardProps) {
  const own = useSwing(strength);
  return (
    <motion.div
      style={{ rotate: rotate ?? own.rotate, transformOrigin: chain ? `50% -${chain}px` : "50% 0", ...style }}
      onPointerMove={own.nudge}
      onPointerLeave={own.release}
      className={`board tone-${tone} ${className}`}
    >
      {chain !== false && <Chains length={chain} />}
      {children}
    </motion.div>
  );
}

export function Stamp({ on, label = "Visited", className = "" }: { on: boolean; label?: string; className?: string }) {
  const reduce = useReducedMotion();
  const ring = `ring${useId().replace(/:/g, "")}`;
  if (!on) return null;
  return (
    <motion.svg
      viewBox="0 0 120 120"
      aria-hidden
      initial={reduce ? false : { scale: 2.2, opacity: 0, rotate: -40 }}
      animate={{ scale: 1, opacity: 0.88, rotate: -14 }}
      transition={{ type: "spring", stiffness: 500, damping: 22 }}
      className={`stamp pointer-events-none absolute z-20 h-24 w-24 sm:h-28 sm:w-28 ${className}`}
    >
      <defs>
        <path id={ring} d="M60,60 m-41,0 a41,41 0 1,1 82,0 a41,41 0 1,1 -82,0" />
      </defs>
      <g filter="url(#ink-rough)" fill="none" stroke="#C8321F">
        <circle cx="60" cy="60" r="54" strokeWidth="5" />
        <circle cx="60" cy="60" r="31" strokeWidth="2.5" />
      </g>
      <g filter="url(#ink-rough)" fill="#C8321F" fontFamily="var(--font-body)" fontWeight="700">
        <text fontSize="11.5" letterSpacing="2.2">
          <textPath href={`#${ring}`}>SUBHADIP DAS · RANIGANJ · EST. 2023 ·</textPath>
        </text>
        <text x="60" y="66" fontSize="15" textAnchor="middle" letterSpacing="0.5">
          {label.toUpperCase()}
        </text>
      </g>
    </motion.svg>
  );
}

// Hanging section sign. Visiting it earns a stamp.
export function SectionSign({ id, title, plain, tone }: { id: string; title: string; plain: string; tone: Tone }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { amount: 0.8, once: true });
  const { state, visit } = useGame();
  useEffect(() => {
    if (seen) visit(id);
  }, [seen, id, visit]);
  return (
    <div ref={ref} className="relative mb-14 inline-block max-w-full pt-12">
      <Board tone={tone} chain={48} strength={1.6} className={`unlit px-6 pb-5 pt-6 sm:px-12 ${state.stamps.includes(id) ? "lit" : ""}`}>
        <h2 className="font-sign letter relative z-10 text-[clamp(2.4rem,10.5vw,3.75rem)] leading-none">{title}</h2>
        <p className="relative z-10 mt-2 text-sm font-bold uppercase tracking-[0.18em] opacity-85">{plain}</p>
        <Stamp on={state.stamps.includes(id)} className="-right-1 -top-14 !h-20 !w-20 sm:-right-14 sm:-top-6 sm:!h-28 sm:!w-28" />
      </Board>
    </div>
  );
}
