"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

export const Hero: React.FC = () => {
  const scrollToLibrary = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const elem = document.getElementById("library");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#11151d] border border-[#1d232f] p-6 sm:p-10 lg:p-12 mb-12 sm:mb-16 shadow-2xl">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ccff00]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Copy & CTA */}
        <div className="lg:col-span-7 flex flex-col items-start justify-center">
          {/* Eyebrow */}
          <span className="inline-block text-[#ccff00] font-black text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4">
            WORKOUT LIBRARY
          </span>

          {/* Main Heading */}
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-[1.08] mb-4 sm:mb-6">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          {/* Subtitle */}
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xl mb-8">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          {/* Primary CTA Button */}
          <a
            href="#library"
            onClick={scrollToLibrary}
            className="inline-flex items-center gap-2.5 bg-[#ccff00] hover:bg-[#d8ff33] text-black font-extrabold text-sm uppercase tracking-wider px-6 py-3.5 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-[#ccff00]/20"
            id="browse-workouts-cta"
          >
            <span>BROWSE WORKOUTS</span>
            <ArrowDown className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>

        {/* Right Column: Hero Visual Illustration */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-[#0b0e14]/50 group">
            <Image
              src="/hero-illustration.jpg"
              alt="FitLog Training Illustration"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Subtle gradient vignette to blend with dark card */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#11151d] via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};
