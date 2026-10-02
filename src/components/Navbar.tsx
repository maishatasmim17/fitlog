"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, Menu, X } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { planCount, savedCount } = usePlan();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isWorkoutsActive = pathname === "/" || pathname.startsWith("/workout/");
  const isMyPlanActive = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0c10]/90 backdrop-blur-md border-b border-[#1b202a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group transition-transform active:scale-95"
          id="navbar-logo"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#ccff00] transition-colors">
            <Dumbbell className="w-6 h-6 rotate-[-45deg] stroke-[2.5]" />
          </div>
          <span className="font-display font-black text-xl tracking-wider text-white group-hover:text-[#ccff00] transition-colors">
            FITLOG
          </span>
        </Link>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-2" id="navbar-links">
          <Link
            href="/"
            className={`text-sm font-semibold transition-all duration-200 ${
              isWorkoutsActive
                ? "bg-[#182312] text-[#ccff00] border border-[#2c3d1f] px-4 py-1.5 rounded-full shadow-sm"
                : "text-neutral-400 hover:text-white px-3 py-1.5"
            }`}
            id="nav-link-workouts"
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`text-sm font-semibold transition-all duration-200 ${
              isMyPlanActive
                ? "bg-[#182312] text-[#ccff00] border border-[#2c3d1f] px-4 py-1.5 rounded-full shadow-sm"
                : "text-neutral-400 hover:text-white px-3 py-1.5"
            }`}
            id="nav-link-myplan"
          >
            My Plan
          </Link>
        </nav>

        {/* Right: Status Badges (Counters) */}
        <div className="flex items-center gap-3 sm:gap-4" id="navbar-badges">
          {/* Plan Badge - Filled with #ccff00 */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-neutral-300 hover:text-white transition-opacity"
            id="nav-badge-plan"
            title="View Today's Plan"
          >
            <span>Plan</span>
            <span className="bg-[#ccff00] text-black font-extrabold text-xs w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shadow-sm">
              {planCount}
            </span>
          </Link>

          {/* Saved Badge - Outlined pill */}
          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-neutral-300 hover:text-white transition-opacity"
            id="nav-badge-saved"
            title="View Saved Workouts"
          >
            <span>Saved</span>
            <span className="border border-neutral-600 bg-neutral-900/60 text-neutral-300 font-bold text-xs min-w-5 h-5 sm:min-w-6 sm:h-6 px-1.5 rounded-full flex items-center justify-center">
              {savedCount}
            </span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1b202a] bg-[#0c0f14] px-4 pt-3 pb-4 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors ${
              isWorkoutsActive
                ? "bg-[#182312] text-[#ccff00] border border-[#2c3d1f]"
                : "text-neutral-300 hover:bg-neutral-800"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            onClick={() => setMobileMenuOpen(false)}
            className={`block text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors ${
              isMyPlanActive
                ? "bg-[#182312] text-[#ccff00] border border-[#2c3d1f]"
                : "text-neutral-300 hover:bg-neutral-800"
            }`}
          >
            My Plan
          </Link>
        </div>
      )}
    </header>
  );
};
