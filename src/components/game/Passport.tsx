"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lock, Stamp as StampIcon } from "lucide-react";
import { SECTIONS } from "@/lib/data";
import { ACHIEVEMENTS, levelOf, LEVELS, useGame } from "./GameProvider";

export function Passport() {
  const { state, xp, reset, openBugBash } = useGame();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const lv = levelOf(xp);
  const floor = LEVELS[lv.index].at;
  const pct = lv.next ? Math.round(((xp - floor) / (lv.next - floor)) * 100) : 100;

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => !box.current?.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <div ref={box} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="passport"
        className="flex h-11 items-center gap-2 rounded-md border-[2.5px] border-[#15130F] bg-[#15130F] px-3 font-bold text-[#FFC72C]"
      >
        <StampIcon className="h-4 w-4" />
        <span className="tabular-nums">
          Lv {lv.index + 1}
          <span className="hidden sm:inline"> · </span>
          <motion.span key={xp} initial={{ y: -8 }} animate={{ y: 0 }} className="hidden sm:inline-block">
            {xp} XP
          </motion.span>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="passport"
            role="region"
            aria-label="Your passport: stamps and achievements"
            initial={{ opacity: 0, y: -10, rotate: 1.5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 420, damping: 26 }}
            className="board tone-white fixed inset-x-3 top-[4.6rem] max-h-[calc(100vh-6rem)] overflow-y-auto p-6 sm:absolute sm:inset-x-auto sm:right-0 sm:top-[3.6rem] sm:w-[23rem]"
          >
            <div className="relative z-10">
              <p className="font-sign text-3xl leading-none">{lv.title}</p>
              <p className="mt-1 text-sm font-semibold">
                Level {lv.index + 1} of {LEVELS.length} · {xp} XP{lv.next ? ` · ${lv.next - xp} to next` : " · max level"}
              </p>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#15130F]/10" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Progress to next level">
                <motion.div className="h-full rounded-full bg-[#C8321F]" initial={false} animate={{ width: `${pct}%` }} />
              </div>

              <h3 className="mt-6 text-sm font-bold uppercase tracking-[0.16em]">Stamps {state.stamps.length}/{SECTIONS.length}</h3>
              <ul className="mt-2 grid grid-cols-3 gap-2">
                {SECTIONS.map((s) => {
                  const got = state.stamps.includes(s.id);
                  return (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        onClick={() => setOpen(false)}
                        className={`grid h-16 place-items-center rounded-full text-center text-[0.72rem] font-bold uppercase leading-tight tracking-wide ${
                          got ? "-rotate-6 border-[3px] border-[#C8321F] text-[#C8321F]" : "border-2 border-dashed border-[#15130F]/30 text-[#15130F]/55"
                        }`}
                      >
                        {s.label}
                      </a>
                    </li>
                  );
                })}
              </ul>

              <h3 className="mt-6 text-sm font-bold uppercase tracking-[0.16em]">
                Achievements {state.achievements.length}/{ACHIEVEMENTS.length}
              </h3>
              <ul className="mt-2 space-y-2">
                {ACHIEVEMENTS.map((a) => {
                  const got = state.achievements.includes(a.id);
                  const hidden = !got && "secret" in a;
                  return (
                    <li key={a.id} className={`flex items-start gap-3 rounded-md px-3 py-2 ${got ? "bg-[#FFC72C]" : "bg-[#15130F]/[0.05]"}`}>
                      {got ? <StampIcon className="mt-0.5 h-4 w-4 shrink-0" /> : <Lock className="mt-0.5 h-4 w-4 shrink-0 opacity-50" />}
                      <div className={got ? "" : "opacity-70"}>
                        <p className="font-bold leading-tight">{hidden ? "Secret" : a.title}</p>
                        <p className="text-sm leading-snug">{hidden ? "Something on this street is hiding it." : a.desc}</p>
                      </div>
                      <span className="ml-auto text-sm font-bold tabular-nums">+{a.xp}</span>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-5 flex items-center justify-between gap-3">
                <button onClick={() => { setOpen(false); openBugBash(); }} className="plaque tone-vermilion !min-h-[44px] !px-4 text-sm">
                  Play Bug Bash
                </button>
                <button onClick={reset} className="min-h-[44px] text-sm font-semibold underline underline-offset-4">
                  Reset progress
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
