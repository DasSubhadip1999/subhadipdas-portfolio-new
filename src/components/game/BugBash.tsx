"use client";

import { useEffect, useRef, useState } from "react";
import { Bug, X } from "lucide-react";
import { sfx } from "@/lib/sound";

const ROUND = 20;
type Critter = { id: number; x: number; y: number; dx: number; dy: number; golden: boolean; life: number };
type Splat = { id: number; x: number; y: number };

export function BugBash({ best, onClose, onFinish }: { best: number; onClose: () => void; onFinish: (score: number) => void }) {
  const [phase, setPhase] = useState<"ready" | "play" | "done">("ready");
  const [bugs, setBugs] = useState<Critter[]>([]);
  const [splats, setSplats] = useState<Splat[]>([]);
  const [score, setScore] = useState(0);
  const [left, setLeft] = useState(ROUND);
  const startBtn = useRef<HTMLButtonElement>(null);
  const finish = useRef(onFinish);
  finish.current = onFinish;

  useEffect(() => {
    startBtn.current?.focus();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  useEffect(() => {
    if (phase !== "play") return;
    const started = Date.now();
    let next = 0;
    const timer = setInterval(() => {
      const elapsed = (Date.now() - started) / 1000;
      const remaining = Math.max(0, ROUND - elapsed);
      setLeft(remaining);
      setBugs((b) => b.filter((c) => c.life > Date.now()));
      // Spawn faster as the round goes on.
      if (Date.now() > next) {
        next = Date.now() + 650 - elapsed * 18;
        const life = 1500 - elapsed * 25;
        setBugs((b) => [
          ...b,
          {
            id: Math.random(),
            x: 6 + Math.random() * 82,
            y: 8 + Math.random() * 78,
            dx: (Math.random() - 0.5) * 140,
            dy: (Math.random() - 0.5) * 100,
            golden: Math.random() < 0.12,
            life: Date.now() + life,
          },
        ]);
      }
      if (remaining <= 0) {
        clearInterval(timer);
        setBugs([]);
        setPhase("done");
        sfx.fanfare();
      }
    }, 80);
    return () => clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    if (phase === "done") finish.current(score);
  }, [phase, score]);

  const start = () => {
    setScore(0);
    setSplats([]);
    setLeft(ROUND);
    setPhase("play");
  };

  const squash = (c: Critter) => {
    sfx.squash();
    setScore((s) => s + (c.golden ? 3 : 1));
    setBugs((b) => b.filter((x) => x.id !== c.id));
    setSplats((s) => [...s.slice(-14), { id: c.id, x: c.x, y: c.y }]);
  };

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-[#15130F]/55 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bugbash-title"
        onClick={(e) => e.stopPropagation()}
        className="board tone-yellow flex h-[min(560px,86vh)] w-[min(760px,100%)] flex-col p-5 sm:p-7"
      >
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
          <h2 id="bugbash-title" className="font-sign letter text-4xl sm:text-5xl">
            Bug Bash
          </h2>
          <div className="flex items-center gap-4 text-base font-bold tabular-nums">
            <span>Score {score}</span>
            <span>{left.toFixed(1)}s</span>
            <span className="hidden sm:inline">Best {Math.max(best, phase === "done" ? score : 0)}</span>
            <button onClick={onClose} aria-label="Close Bug Bash" className="grid h-10 w-10 place-items-center rounded-full bg-[#15130F] text-[#FFC72C]">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative z-10 mt-4 flex-1 overflow-hidden rounded-md bg-[#EEF3F4] wall-texture">
          {splats.map((s) => (
            <span key={s.id} className="splat" style={{ left: `${s.x}%`, top: `${s.y}%` }} />
          ))}
          {bugs.map((c) => (
            <button
              key={c.id}
              data-quiet
              aria-label={c.golden ? "Golden bug, 3 points" : "Bug, 1 point"}
              onPointerDown={() => squash(c)}
              className="critter absolute grid h-12 w-12 place-items-center"
              style={{ left: `${c.x}%`, top: `${c.y}%`, ["--dx" as string]: `${c.dx}px`, ["--dy" as string]: `${c.dy}px` }}
            >
              <Bug className={`h-8 w-8 ${c.golden ? "text-[#B8860B]" : "text-[#15130F]"}`} strokeWidth={2.4} />
            </button>
          ))}

          {phase !== "play" && (
            <div className="absolute inset-0 grid place-items-center p-6 text-center">
              <div className="max-w-sm">
                {phase === "ready" ? (
                  <>
                    <p className="text-lg font-semibold">
                      Bugs are crawling over the wall. Squash as many as you can in {ROUND} seconds. Golden bugs are worth 3.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-sign text-5xl">{score} squashed</p>
                    <p className="mt-2 text-lg font-semibold">
                      {score >= 15 ? "Production is safe. Ship it." : "A few slipped into prod. One more round?"}
                    </p>
                  </>
                )}
                <button ref={startBtn} onClick={start} className="plaque tone-vermilion mt-6">
                  {phase === "ready" ? "Start round" : "Play again"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
