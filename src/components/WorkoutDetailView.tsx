"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarPlus, Bookmark, Check, Dumbbell, Star, Clock, Flame } from "lucide-react";
import { Workout } from "@/types/workout";
import { usePlan } from "@/context/PlanContext";

interface WorkoutDetailViewProps {
  workout: Workout;
}

export const WorkoutDetailView: React.FC<WorkoutDetailViewProps> = ({ workout }) => {
  const { addToTodayPlan, addToSaved, isInTodayPlan, isSaved, todayPlan } = usePlan();
  const [imageError, setImageError] = useState(false);

  const inPlan = isInTodayPlan(workout.id);
  const saved = isSaved(workout.id);
  const isCapReached = todayPlan.length >= 5 && !inPlan;

  const keySpecs = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: workout.sets.toString() },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
    { label: "RATING", value: workout.rating.toString() },
  ];

  return (
    <div className="w-full pb-16">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-400 hover:text-[#ccff00] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO WORKOUTS</span>
        </Link>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Visual / Media */}
        <div className="lg:col-span-6 w-full">
          <div className="relative w-full aspect-[4/4] sm:aspect-[4/5] rounded-3xl overflow-hidden bg-[#11151e] border border-[#1d2330] shadow-2xl">
            {!imageError ? (
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
                onError={() => setImageError(true)}
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-neutral-600">
                <Dumbbell className="w-20 h-20 mb-4 stroke-[1.2]" />
                <p className="font-display uppercase tracking-widest text-lg text-neutral-400">
                  {workout.name}
                </p>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Right Column: Details & Specs */}
        <div className="lg:col-span-6 flex flex-col justify-start">
          {/* Title */}
          <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight leading-tight mb-3">
            {workout.name}
          </h1>

          {/* Subtitle / Description */}
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-5">
            {workout.description}
          </p>

          {/* Category Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="inline-block bg-[#ccff00] text-black font-extrabold text-xs tracking-wider uppercase px-3 py-1 rounded-full shadow-sm"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Key Specs Table Panel */}
          <div className="rounded-2xl bg-[#11151e] border border-[#1d2330] p-5 sm:p-6 mb-8 shadow-lg">
            <div className="divide-y divide-[#1b212c]">
              {keySpecs.map((spec) => (
                <div
                  key={spec.label}
                  className="py-3 flex items-center justify-between text-xs sm:text-sm first:pt-0 last:pb-0"
                >
                  <span className="font-bold text-neutral-500 uppercase tracking-wider text-[11px] sm:text-xs">
                    {spec.label}
                  </span>
                  <span className="font-semibold text-white tracking-wide">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* INSTRUCTIONS Section */}
          <div className="mb-8">
            <h2 className="font-display font-black text-xl text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span>INSTRUCTIONS</span>
            </h2>
            <ol className="space-y-3">
              {workout.instructions.map((step, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3.5 text-neutral-300 text-sm sm:text-base leading-relaxed"
                >
                  <span className="shrink-0 w-6 h-6 rounded-full bg-[#18202c] border border-[#252f40] text-neutral-300 text-xs font-bold flex items-center justify-center mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Call-To-Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            {/* Primary: Add to today's plan */}
            <button
              type="button"
              onClick={() => addToTodayPlan(workout)}
              disabled={inPlan || isCapReached}
              className={`flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-extrabold text-sm uppercase tracking-wider transition-all duration-200 shadow-lg ${
                inPlan
                  ? "bg-[#1d2716] border border-[#2d401e] text-[#ccff00] cursor-default"
                  : isCapReached
                  ? "bg-neutral-800 text-neutral-500 border border-neutral-700 cursor-not-allowed opacity-80"
                  : "bg-[#ccff00] hover:bg-[#d8ff33] text-black active:scale-95 shadow-[#ccff00]/15"
              }`}
              id="detail-add-plan-btn"
            >
              {inPlan ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>In Today&apos;s Plan</span>
                </>
              ) : (
                <>
                  <CalendarPlus className="w-4 h-4 stroke-[2.5]" />
                  <span>{isCapReached ? "Daily Cap Reached (5)" : "Add to today's plan"}</span>
                </>
              )}
            </button>

            {/* Secondary: Save for later */}
            <button
              type="button"
              onClick={() => addToSaved(workout)}
              disabled={saved}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-200 border ${
                saved
                  ? "bg-[#151a24] border-neutral-700 text-neutral-400 cursor-default"
                  : "bg-[#11151e] border-neutral-700 hover:border-neutral-500 text-white hover:bg-neutral-800/80 active:scale-95"
              }`}
              id="detail-save-later-btn"
            >
              <Bookmark className={`w-4 h-4 ${saved ? "fill-neutral-400" : ""}`} />
              <span>{saved ? "Saved" : "Save for later"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
