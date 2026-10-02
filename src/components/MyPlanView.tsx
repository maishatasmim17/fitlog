"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Clock,
  Flame,
  Star,
  Check,
  X,
  ChevronDown,
  Dumbbell,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { Workout, SortOption } from "@/types/workout";

export const MyPlanView: React.FC = () => {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "saved" ? "saved" : "today";

  const {
    todayPlan,
    savedWorkouts,
    completedWorkoutIds,
    removeFromTodayPlan,
    removeFromSaved,
    markAsDone,
    isMarkedDone,
  } = usePlan();

  const [activeTab, setActiveTab] = useState<"today" | "saved">(initialTab);
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [sortOpen, setSortOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Sync tab with URL if param changes
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "saved") {
      setActiveTab("saved");
    } else if (tabParam === "today") {
      setActiveTab("today");
    }
  }, [searchParams]);

  // Loading state simulation for smooth initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  // Compute live metrics summary for Today's Plan
  const metrics = useMemo(() => {
    const exerciseCount = todayPlan.length;
    const totalMinutes = todayPlan.reduce((acc, w) => acc + (w.duration || 0), 0);
    const totalCalories = todayPlan.reduce((acc, w) => acc + (w.caloriesBurned || 0), 0);

    return {
      exercises: exerciseCount,
      minutes: totalMinutes,
      calories: totalCalories,
    };
  }, [todayPlan]);

  // Current list based on active tab
  const currentList = activeTab === "today" ? todayPlan : savedWorkouts;

  // Sorted list based on sortBy
  const sortedList = useMemo(() => {
    const list = [...currentList];
    list.sort((a, b) => {
      if (sortBy === "duration") {
        return b.duration - a.duration;
      }
      if (sortBy === "calories") {
        return b.caloriesBurned - a.caloriesBurned;
      }
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });
    return list;
  }, [currentList, sortBy]);

  const sortLabelMap: Record<SortOption, string> = {
    duration: "Duration",
    calories: "Calories",
    rating: "Rating",
  };

  return (
    <div className="w-full pb-20">
      {/* Title & Subtitle */}
      <div className="mb-8">
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight mb-2">
          MY PLAN
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary Row (3 stat cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
        {/* Exercises Card */}
        <div className="rounded-2xl bg-[#11151e] border border-[#1d2330] p-6 shadow-md transition-all hover:border-neutral-700">
          <span className="block text-neutral-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Exercises
          </span>
          <span className="font-display font-black text-4xl sm:text-5xl text-[#ccff00] leading-none">
            {metrics.exercises}
          </span>
        </div>

        {/* Minutes Card */}
        <div className="rounded-2xl bg-[#11151e] border border-[#1d2330] p-6 shadow-md transition-all hover:border-neutral-700">
          <span className="block text-neutral-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Minutes
          </span>
          <span className="font-display font-black text-4xl sm:text-5xl text-white leading-none">
            {metrics.minutes}
          </span>
        </div>

        {/* Calories Card */}
        <div className="rounded-2xl bg-[#11151e] border border-[#1d2330] p-6 shadow-md transition-all hover:border-neutral-700">
          <span className="block text-neutral-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Calories
          </span>
          <span className="font-display font-black text-4xl sm:text-5xl text-white leading-none">
            {metrics.calories}
          </span>
        </div>
      </div>

      {/* Tabs and Controls Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {/* Tabs: Today's Plan / Saved */}
        <div className="inline-flex items-center p-1 bg-[#0e1118] border border-[#1d2330] rounded-xl self-start">
          <button
            type="button"
            onClick={() => setActiveTab("today")}
            className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
              activeTab === "today"
                ? "bg-[#18202c] text-white border border-[#263345] shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
            id="tab-todays-plan"
          >
            Today&apos;s Plan ({todayPlan.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
              activeTab === "saved"
                ? "bg-[#18202c] text-white border border-[#263345] shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
            id="tab-saved"
          >
            Saved ({savedWorkouts.length})
          </button>
        </div>

        {/* Sort By Dropdown (C1 Requirement) */}
        <div className="relative self-end sm:self-auto">
          <button
            type="button"
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-2 bg-[#11151e] border border-[#1f2635] hover:border-neutral-600 px-4 py-2 rounded-xl text-xs sm:text-sm text-neutral-300 transition-colors focus:outline-none"
            id="myplan-sort-button"
            aria-label="Sort options"
          >
            <span className="text-neutral-500">Sort By</span>
            <span className="font-semibold text-white">{sortLabelMap[sortBy]}</span>
            <ChevronDown
              className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
                sortOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {sortOpen && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setSortOpen(false)} />
              <div className="absolute right-0 mt-2 w-44 rounded-xl bg-[#131722] border border-[#21293a] shadow-2xl py-1.5 z-30 overflow-hidden">
                {(["duration", "calories", "rating"] as SortOption[]).map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option);
                      setSortOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs sm:text-sm transition-colors flex items-center justify-between ${
                      sortBy === option
                        ? "bg-[#1d2716] text-[#ccff00] font-semibold"
                        : "text-neutral-300 hover:bg-neutral-800/60"
                    }`}
                  >
                    <span>{sortLabelMap[option]}</span>
                    {sortBy === option && <Sparkles className="w-3.5 h-3.5 text-[#ccff00]" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="rounded-2xl bg-[#11151e] border border-[#1d2330] p-12 text-center">
          <p className="text-neutral-400 text-sm flex items-center justify-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00] animate-pulse" />
            Loading workouts…
          </p>
        </div>
      ) : sortedList.length === 0 ? (
        /* Empty State */
        <div className="rounded-3xl border-2 border-dashed border-[#1f2635] bg-[#0b0e14]/50 py-20 px-6 sm:px-12 text-center flex flex-col items-center justify-center">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-wider mb-2">
            NOTHING HERE YET
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-md mb-8">
            {activeTab === "today"
              ? "Browse the library and add a lift to get today moving."
              : "Save exercises you want to tackle on your future training sessions."}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#ccff00] hover:bg-[#d8ff33] text-black font-extrabold text-sm uppercase tracking-wider px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-[#ccff00]/15 active:scale-95"
            id="empty-state-cta"
          >
            <span>Go to workouts</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>
      ) : (
        /* Workout Cards List */
        <div className="space-y-4">
          {sortedList.map((workout) => {
            const completed = isMarkedDone(workout.id);

            return (
              <div
                key={workout.id}
                className={`group rounded-2xl bg-[#11151e] border transition-all duration-300 p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                  completed
                    ? "border-[#ccff00]/40 bg-[#0e1610]"
                    : "border-[#1d2330] hover:border-neutral-700 shadow-lg"
                }`}
              >
                {/* Left: Thumbnail & Details */}
                <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
                  {/* Thumbnail */}
                  <div className="relative w-24 h-18 sm:w-32 sm:h-20 rounded-xl overflow-hidden bg-[#0d1017] shrink-0 border border-[#1f2533]">
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      sizes="140px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3
                        className={`font-display font-black text-lg sm:text-xl uppercase tracking-wide truncate ${
                          completed ? "text-neutral-300 line-through decoration-[#ccff00]/60" : "text-white"
                        }`}
                      >
                        {workout.name}
                      </h3>
                      {completed && (
                        <span className="shrink-0 bg-[#ccff00]/20 text-[#ccff00] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border border-[#ccff00]/30">
                          Completed
                        </span>
                      )}
                    </div>

                    <p className="text-neutral-400 text-xs sm:text-sm truncate mb-2">
                      {workout.equipment}
                    </p>

                    {/* Stats Row */}
                    <div className="flex items-center gap-4 text-neutral-400 text-xs">
                      <div className="flex items-center gap-1.5" title="Duration">
                        <Clock className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{workout.duration} min</span>
                      </div>

                      <div className="flex items-center gap-1.5" title="Calories">
                        <Flame className="w-3.5 h-3.5 text-amber-500" />
                        <span>{workout.caloriesBurned} kcal</span>
                      </div>

                      <div className="flex items-center gap-1.5" title="Rating">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        <span>{workout.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Action Buttons */}
                <div className="flex items-center gap-2.5 self-end lg:self-center shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#1a202c] w-full lg:w-auto justify-end">
                  {/* View Details Button */}
                  <Link
                    href={`/workout/${workout.id}`}
                    className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#141923] hover:bg-[#1c2331] text-white border border-[#232b3a] hover:border-neutral-600 transition-colors"
                  >
                    View Details
                  </Link>

                  {/* Mark as Done Button (Only in Today's Plan tab, C3 requirement) */}
                  {activeTab === "today" && (
                    <button
                      type="button"
                      onClick={() => markAsDone(workout.id)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-200 active:scale-95 ${
                        completed
                          ? "bg-[#182613] text-[#ccff00] border border-[#2e4720]"
                          : "bg-[#ccff00] hover:bg-[#d8ff33] text-black shadow-md shadow-[#ccff00]/15"
                      }`}
                      title={completed ? "Unmark as done" : "Mark workout done"}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>{completed ? "Done" : "Mark as Done"}</span>
                    </button>
                  )}

                  {/* Remove Button (X) */}
                  <button
                    type="button"
                    onClick={() => {
                      if (activeTab === "today") {
                        removeFromTodayPlan(workout.id);
                      } else {
                        removeFromSaved(workout.id);
                      }
                    }}
                    className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                    aria-label="Remove workout"
                    title="Remove from list"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
