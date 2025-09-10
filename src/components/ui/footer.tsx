"use client";

import { Instagram, Mail } from "lucide-react";
import { Logo } from "./logo";

const EVENT = {
  name: "Hack The Net",
  sponsorEmail: "hackthenethackathon@gmail.com",
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="font-semibold">{EVENT.name}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-neutral-400">
            <a href={`mailto:${EVENT.sponsorEmail}`} className="flex items-center gap-2 text-accent hover:underline">
              <Mail className="h-4 w-4" />
              {EVENT.sponsorEmail}
            </a>
            <a href="https://instagram.com/hackthenet2026" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-accent hover:underline">
              <Instagram className="h-4 w-4" />
              @hackthenet2026
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

    