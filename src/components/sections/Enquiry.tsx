"use client";

import { useState } from "react";
import { Check, Copy, Download, Github, Mail, MessageCircle, Phone } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";
import { Board, SectionSign } from "@/components/Board";
import { levelOf, useGame } from "@/components/game/GameProvider";

export function Enquiry() {
  const { unlock, play, xp, openBugBash } = useGame();
  const [copied, setCopied] = useState(false);
  const lv = levelOf(xp);

  const reached = () => {
    play("bell");
    unlock("enquiry");
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      reached();
    } catch {
      window.location.href = `mailto:${PERSONAL_INFO.email}`;
    }
  };

  const rows = [
    { icon: Mail, label: "Email", value: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}` },
    { icon: Phone, label: "Phone", value: PERSONAL_INFO.phone, href: `tel:${PERSONAL_INFO.phone.replace(/\s/g, "")}` },
    { icon: MessageCircle, label: "WhatsApp", value: "Message me", href: PERSONAL_INFO.whatsapp },
    { icon: Github, label: "GitHub", value: "DasSubhadip1999", href: PERSONAL_INFO.github },
  ];

  return (
    <section id="enquiry" className="py-20 sm:py-28">
      <div className="container">
        <SectionSign id="enquiry" title="Enquiry" plain="Contact" tone="yellow" />

        <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
          <div className="pt-14 lg:col-span-8">
            <Board tone="teal" chain={56} strength={0.7} className="px-6 pb-9 pt-10 sm:px-11 sm:pb-11 sm:pt-12">
              <div className="relative z-10">
                <h3 className="font-sign letter text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[1]">Hiring for a senior engineer?</h3>
                <p className="mt-4 max-w-[48ch] text-lg font-medium leading-relaxed">
                  I&apos;m open to Senior Software Engineer, Senior Full Stack and Node.js / AWS backend roles. The quickest way to reach me is email or WhatsApp.
                </p>

                <ul className="mt-8 divide-y-2 divide-dashed divide-[#FFFAF0]/35 border-y-2 border-dashed border-[#FFFAF0]/35">
                  {rows.map(({ icon: Icon, label, value, href }) => (
                    <li key={label} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-4">
                      <Icon className="h-5 w-5 shrink-0" />
                      <span className="w-24 text-sm font-bold uppercase tracking-[0.16em] opacity-90">{label}</span>
                      <a
                        href={href}
                        onClick={reached}
                        data-quiet
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="items-center min-h-[44px] inline-flex min-w-0 break-all text-lg font-bold underline decoration-2 underline-offset-[6px] sm:text-xl"
                      >
                        {value}
                      </a>
                      {label === "Email" && (
                        <button onClick={copy} data-quiet className="ml-auto inline-flex min-h-[44px] items-center gap-1.5 rounded-md px-3 text-sm font-bold shadow-[inset_0_0_0_2px_#FFC72C]">
                          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          {copied ? "Copied" : "Copy"}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>

                <a href={PERSONAL_INFO.resume} download onClick={() => unlock("resume")} className="plaque tone-yellow mt-9">
                  <Download className="h-5 w-5" /> Download resume (PDF)
                </a>
              </div>
            </Board>
          </div>

          <div className="space-y-14 pt-14 lg:col-span-4">
            <Board tone="vermilion" chain={44} strength={1.6} className="px-7 pb-7 pt-8">
              <div className="relative z-10">
                <h3 className="font-sign letter text-4xl leading-none">Chai break?</h3>
                <p className="mt-3 text-base font-medium leading-relaxed">Squash as many bugs as you can in 20 seconds. Golden bugs count triple.</p>
                <button onClick={openBugBash} className="plaque tone-yellow mt-5 !min-h-[44px] !px-5 text-sm">
                  Play Bug Bash
                </button>
              </div>
            </Board>
            <Board tone="white" chain={44} strength={1.6} className="px-7 pb-7 pt-8">
              <div className="relative z-10">
                <h3 className="font-sign text-3xl leading-none">{lv.title}</h3>
                <p className="mt-3 text-base font-medium leading-relaxed">
                  That&apos;s your rank on this street.{" "}
                  {lv.next ? "Open the passport at the top to see which stamps and secrets are still out there." : "You found everything. The next step is an email."}
                </p>
              </div>
            </Board>
          </div>
        </div>
      </div>
    </section>
  );
}
