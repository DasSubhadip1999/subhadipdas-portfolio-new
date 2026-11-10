"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { SECTIONS, PROJECTS } from "@/lib/data";
import { setSoundOn, sfx, unlockAudio } from "@/lib/sound";
import { BugBash } from "./BugBash";

export const ACHIEVEMENTS = [
  { id: "first_stamp", title: "First stamp", desc: "Visited your first board.", xp: 20 },
  { id: "window_shopper", title: "Window shopper", desc: "Walked the whole street.", xp: 60 },
  { id: "resume", title: "Took the brochure", desc: "Downloaded the resume.", xp: 60 },
  { id: "enquiry", title: "Made an enquiry", desc: "Reached out by email, phone or WhatsApp.", xp: 60 },
  { id: "flipper", title: "Turned every board", desc: "Read the back of all six project boards.", xp: 50 },
  { id: "stockist", title: "Checked the stock", desc: "Looked up three skills on the rack.", xp: 30 },
  { id: "bug_player", title: "Chai break", desc: "Played a round of Bug Bash.", xp: 30 },
  { id: "bug_master", title: "Exterminator", desc: "Squashed 15 or more bugs in one round.", xp: 50 },
  { id: "spinner", title: "Sign spinner", desc: "Spun the shop sign.", xp: 40, secret: true },
  { id: "konami", title: "Old school", desc: "Entered the Konami code.", xp: 40, secret: true },
  { id: "hire", title: "The magic word", desc: "Typed “hire” anywhere on the page.", xp: 40, secret: true },
] as const;

export type AchievementId = (typeof ACHIEVEMENTS)[number]["id"];

export const STAMP_XP = 20;
export const LEVELS = [
  { at: 0, title: "Passer-by" },
  { at: 80, title: "Window shopper" },
  { at: 200, title: "Regular" },
  { at: 340, title: "Trusted client" },
  { at: 480, title: "Hiring partner" },
];

type State = { stamps: string[]; achievements: string[]; flipped: string[]; skills: string[]; best: number; muted: boolean };
const EMPTY: State = { stamps: [], achievements: [], flipped: [], skills: [], best: 0, muted: false };
const KEY = "sd-bazaar-v1";

export function xpOf(s: State) {
  return s.stamps.length * STAMP_XP + ACHIEVEMENTS.filter((a) => s.achievements.includes(a.id)).reduce((n, a) => n + a.xp, 0);
}
export function levelOf(xp: number) {
  let i = 0;
  LEVELS.forEach((l, n) => xp >= l.at && (i = n));
  return { index: i, ...LEVELS[i], next: LEVELS[i + 1]?.at ?? null };
}

type Toast = { id: number; title: string; line: string };

type Game = {
  state: State;
  xp: number;
  visit: (id: string) => void;
  unlock: (id: AchievementId) => void;
  flip: (id: string) => void;
  checkSkill: (s: string) => void;
  setMuted: (m: boolean) => void;
  reset: () => void;
  openBugBash: () => void;
  play: (s: keyof typeof sfx) => void;
};

const Ctx = createContext<Game | null>(null);
export const useGame = () => {
  const g = useContext(Ctx);
  if (!g) throw new Error("useGame outside GameProvider");
  return g;
};

const add = (list: string[], v: string) => (list.includes(v) ? list : [...list, v]);
const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(EMPTY);
  const ref = useRef(state);
  const loaded = useRef(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [bugOpen, setBugOpen] = useState(false);

  const toast = useCallback((title: string, line: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t.slice(-2), { id, title, line }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  }, []);

  // All writes go through here so checks can read the latest state synchronously.
  const update = useCallback(
    (fn: (s: State) => State) => {
      const before = ref.current;
      const after = fn(before);
      if (after === before) return;
      ref.current = after;
      setState(after);
      const lv = levelOf(xpOf(after));
      if (lv.index > levelOf(xpOf(before)).index) {
        setTimeout(() => {
          toast(`Level ${lv.index + 1}: ${lv.title}`, "You levelled up on the street.");
          sfx.fanfare();
        }, 500);
      }
    },
    [toast],
  );

  const unlock = useCallback(
    (id: AchievementId) => {
      if (ref.current.achievements.includes(id)) return;
      const a = ACHIEVEMENTS.find((x) => x.id === id)!;
      update((s) => ({ ...s, achievements: add(s.achievements, id) }));
      toast(a.title, `Achievement · +${a.xp} XP`);
      sfx.coin();
    },
    [toast, update],
  );

  const visit = useCallback(
    (id: string) => {
      if (ref.current.stamps.includes(id)) return;
      update((s) => ({ ...s, stamps: add(s.stamps, id) }));
      sfx.stamp();
      const n = ref.current.stamps.length;
      if (n === 1) unlock("first_stamp");
      if (n === SECTIONS.length) unlock("window_shopper");
    },
    [unlock, update],
  );

  const flip = useCallback(
    (id: string) => {
      update((s) => ({ ...s, flipped: add(s.flipped, id) }));
      if (ref.current.flipped.length === PROJECTS.length) unlock("flipper");
    },
    [unlock, update],
  );

  const checkSkill = useCallback(
    (skill: string) => {
      update((s) => ({ ...s, skills: add(s.skills, skill) }));
      if (ref.current.skills.length >= 3) unlock("stockist");
    },
    [unlock, update],
  );

  const setMuted = useCallback(
    (muted: boolean) => {
      setSoundOn(!muted);
      update((s) => ({ ...s, muted }));
      if (!muted) sfx.bell();
    },
    [update],
  );

  const reset = useCallback(() => {
    ref.current = { ...EMPTY, muted: ref.current.muted };
    setState(ref.current);
  }, []);

  // Load saved progress once, merging with anything earned before it arrived.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "null") as Partial<State> | null;
      if (saved) {
        const s = ref.current;
        ref.current = {
          stamps: [...new Set([...(saved.stamps ?? []), ...s.stamps])],
          achievements: [...new Set([...(saved.achievements ?? []), ...s.achievements])],
          flipped: [...new Set([...(saved.flipped ?? []), ...s.flipped])],
          skills: [...new Set([...(saved.skills ?? []), ...s.skills])],
          best: Math.max(saved.best ?? 0, s.best),
          muted: !!saved.muted,
        };
        setSoundOn(!ref.current.muted);
        setState(ref.current);
      }
    } catch {}
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      // From the ref, not `state`: on the load commit `state` is still the empty initial value.
      localStorage.setItem(KEY, JSON.stringify(ref.current));
    } catch {}
  }, [state]);

  // Global UI sounds, easter-egg keys and the audio unlock on first gesture.
  useEffect(() => {
    let last: Element | null = null;
    let keys: string[] = [];
    const over = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = (e.target as Element).closest("a,button");
      if (el && el !== last && !el.hasAttribute("data-quiet")) sfx.tick();
      last = el;
    };
    // Browsers only count mouse pointerdown, touch pointerup and non-Escape keydown as a user activation.
    const down = (e: PointerEvent) => {
      if (e.pointerType === "mouse") unlockAudio();
      const el = (e.target as Element).closest("a,button");
      if (el && !el.hasAttribute("data-quiet")) sfx.knock();
    };
    const up = (e: PointerEvent) => e.pointerType !== "mouse" && unlockAudio();
    const key = (e: KeyboardEvent) => {
      if (e.key !== "Escape") unlockAudio();
      if ((e.target as Element).closest("input,textarea")) return;
      keys = [...keys, e.key].slice(-10);
      if (KONAMI.every((k, i) => keys[i]?.toLowerCase() === k.toLowerCase())) {
        unlock("konami");
        setBugOpen(true);
        keys = [];
      }
      if (keys.slice(-4).join("").toLowerCase() === "hire") {
        unlock("hire");
        document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    document.addEventListener("pointerover", over);
    document.addEventListener("pointerdown", down);
    document.addEventListener("pointerup", up);
    document.addEventListener("keydown", key);
    console.log(
      "%cHey, fellow engineer.%c\nThe street has secrets. Try the Konami code, or type “hire”.\n— Subhadip",
      "font: 700 16px system-ui; color: #C8321F",
      "font: 13px system-ui",
    );
    return () => {
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("pointerup", up);
      document.removeEventListener("keydown", key);
    };
  }, [unlock]);

  const game: Game = {
    state,
    xp: xpOf(state),
    visit,
    unlock,
    flip,
    checkSkill,
    setMuted,
    reset,
    openBugBash: () => setBugOpen(true),
    play: (s) => sfx[s](),
  };

  return (
    <Ctx.Provider value={game}>
      <MotionConfig reducedMotion="user">
        {children}
        {bugOpen && (
          <BugBash
            best={state.best}
            onClose={() => setBugOpen(false)}
            onFinish={(score) => {
              unlock("bug_player");
              if (score >= 15) unlock("bug_master");
              update((s) => (score > s.best ? { ...s, best: score } : s));
            }}
          />
        )}
        <div aria-live="polite" className="pointer-events-none fixed bottom-4 left-4 right-4 z-[70] flex flex-col items-end gap-3 sm:left-auto">
          <AnimatePresence>
            {toasts.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 24, rotate: -4 }}
                animate={{ opacity: 1, y: 0, rotate: -1.5 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ type: "spring", stiffness: 380, damping: 18 }}
                className="board tone-yellow px-5 py-3.5 pr-7"
              >
                <p className="font-sign text-xl leading-tight">{t.title}</p>
                <p className="text-sm font-semibold opacity-80">{t.line}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </MotionConfig>
    </Ctx.Provider>
  );
}
