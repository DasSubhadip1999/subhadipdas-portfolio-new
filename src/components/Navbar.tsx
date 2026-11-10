"use client";

import { useState } from "react";
import { Menu, Volume2, VolumeX, X } from "lucide-react";
import { SECTIONS } from "@/lib/data";
import { useGame } from "@/components/game/GameProvider";
import { Passport } from "@/components/game/Passport";

const LINKS = SECTIONS.slice(1);

export function Navbar() {
  const { state, setMuted } = useGame();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-[#15130F] bg-[#EEF3F4]/92 backdrop-blur-sm">
      <div className="container flex h-16 items-center gap-3">
        <a href="#shop" className="board tone-yellow grid h-11 w-14 shrink-0 place-items-center !rounded-[5px] font-sign text-2xl leading-none before:!inset-[5px] before:!border-2" aria-label="SD: Subhadip Das, back to top">
          <span className="relative z-10 pt-1">SD</span>
        </a>

        <nav aria-label="Sections" className="ml-2 hidden flex-1 items-center gap-1 lg:flex">
          {LINKS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="group relative rounded-md px-3 py-2 text-[0.95rem] font-bold transition-colors hover:bg-[#15130F] hover:text-[#FFC72C]"
            >
              {s.label}
              {state.stamps.includes(s.id) && (
                <>
                  <span aria-hidden className="ml-1.5 inline-block h-2 w-2 rounded-full bg-[#C8321F] align-middle group-hover:bg-[#FFC72C]" />
                  <span className="sr-only"> (visited)</span>
                </>
              )}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Passport />
          <button
            onClick={() => setMuted(!state.muted)}
            aria-pressed={!state.muted}
            aria-label={state.muted ? "Turn sound on" : "Turn sound off"}
            title={state.muted ? "Sound off" : "Sound on"}
            className="grid h-11 w-11 place-items-center rounded-md border-[2.5px] border-[#15130F] bg-[#FFFAF0] transition-colors hover:bg-[#15130F] hover:text-[#FFC72C]"
          >
            {state.muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-md border-[2.5px] border-[#15130F] bg-[#FFFAF0] lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Sections" className="container grid gap-1 pb-4 lg:hidden">
          {LINKS.map((s) => (
            <a key={s.id} href={`#${s.id}`} onClick={() => setOpen(false)} className="flex items-center justify-between rounded-md px-3 py-3 text-lg font-bold hover:bg-[#15130F] hover:text-[#FFC72C]">
              {s.label}
              {state.stamps.includes(s.id) && <span className="text-sm font-bold text-[#C8321F]">Visited</span>}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
