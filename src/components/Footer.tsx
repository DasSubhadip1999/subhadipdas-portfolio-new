import { PERSONAL_INFO } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t-[3px] border-[#15130F] bg-[#15130F] text-[#FFFAF0]">
      <div className="container flex flex-col gap-3 py-8 text-base font-medium sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-sign text-xl text-[#FFC72C]">{PERSONAL_INFO.name}</span> · hand-lettered in Raniganj, built with Next.js
        </p>
        <p className="text-[#FFFAF0]/75">© {new Date().getFullYear()} · Psst: try the Konami code.</p>
      </div>
    </footer>
  );
}
