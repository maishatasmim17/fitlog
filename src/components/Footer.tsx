import React from "react";
import Link from "next/link";
import { Dumbbell } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#07090c] border-t border-[#151a22] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Brand logo icon + FITLOG */}
        <Link
          href="/"
          className="flex items-center gap-2 group transition-opacity hover:opacity-90"
          id="footer-logo"
        >
          <div className="text-[#ccff00]">
            <Dumbbell className="w-5 h-5 rotate-[-45deg] stroke-[2.5]" />
          </div>
          <span className="font-display font-black text-lg tracking-wider text-white">
            FITLOG
          </span>
        </Link>

        {/* Right: Copyright line */}
        <p className="text-xs text-neutral-400 text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};
