"use client";

import React, { useState, useMemo } from "react";
import { Workout, SortOption } from "@/types/workout";
import { WorkoutCard } from "@/components/WorkoutCard";
import { ChevronDown, Search, ArrowUpDown, Sparkles } from "lucide-react";

interface LibrarySectionProps {
  initialWorkouts: Workout[];
}

export const LibrarySection: React.FC<LibrarySectionProps> = ({ initialWorkouts }) => {
  const [workouts] = useState<Workout[]>(initialWorkouts);
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState<string>("ALL");
  const [sortOpen, setSortOpen] = useState(false);

  // Extract unique muscle groups for quick filters
  const allMuscleGroups = useMemo(() => {
    const groups = new Set<string>();
    initialWorkouts.forEach((w) => {
      w.muscleGroups.forEach((m) => groups.add(m));
    });
    return ["ALL", ...Array.from(groups)];
  }, [initialWorkouts]);

  // Filter and sort workouts
  const filteredAndSortedWorkouts = useMemo(() => {
    let result = [...workouts];

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.equipment.toLowerCase().includes(q) ||
          w.muscleGroups.some((m) => m.toLowerCase().includes(q))
      );
    }

    // Filter by muscle group
    if (selectedMuscle !== "ALL") {
      result = result.filter((w) =>
        w.muscleGroups.some((m) => m.toLowerCase() === selectedMuscle.toLowerCase())
      );
    }

    // Sort
    result.sort((a, b) => {
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

    return result;
  }, [workouts, searchQuery, selectedMuscle, sortBy]);

  const sortLabelMap: Record<SortOption, string> = {
    duration: "Duration",
    calories: "Calories",
    rating: "Rating",
  };

  return (
    <section id="library" className="scroll-mt-24 mb-20">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tight mb-2">
            THE LIBRARY
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Controls: Search & Sort Dropdown */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search lifts or muscles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#11151e] border border-[#1f2635] text-white text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl placeholder-neutral-500 focus:outline-none focus:border-[#ccff00] transition-colors"
            />
          </div>

          {/* Sort By Dropdown (C1 Requirement) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 bg-[#11151e] border border-[#1f2635] hover:border-neutral-600 px-4 py-2.5 rounded-xl text-xs sm:text-sm text-neutral-300 transition-colors focus:outline-none"
              id="sort-by-button"
              aria-label="Sort options"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-neutral-500">Sort By:</span>
              <span className="font-semibold text-white">{sortLabelMap[sortBy]}</span>
              <ChevronDown
                className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
                  sortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {sortOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setSortOpen(false)}
                />
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
      </div>

      {/* Quick Filter Muscle Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        {allMuscleGroups.map((group) => {
          const isActive = selectedMuscle.toLowerCase() === group.toLowerCase();
          return (
            <button
              key={group}
              onClick={() => setSelectedMuscle(group)}
              className={`shrink-0 px-3.6 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                isActive
                  ? "bg-[#ccff00] text-black shadow-sm"
                  : "bg-[#11151e] border border-[#1f2635] text-neutral-400 hover:text-white hover:border-neutral-600"
              }`}
            >
              {group}
            </button>
          );
        })}
      </div>

      {/* Grid: 3x4 on large screens, responsive */}
      {filteredAndSortedWorkouts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#1f2635] p-12 text-center bg-[#0d1017]">
          <p className="text-neutral-400 text-sm">No exercises found matching your search.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedMuscle("ALL");
            }}
            className="mt-4 text-xs uppercase tracking-wider text-[#ccff00] hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
};
