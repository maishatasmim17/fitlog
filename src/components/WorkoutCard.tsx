"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star, Dumbbell } from "lucide-react";
import { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block rounded-2xl bg-[#11151e] border border-[#1d2330] hover:border-neutral-600/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50"
      id={`workout-card-${workout.id}`}
    >
      {/* Thumbnail Container */}
      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#0d1017] mb-4">
        {!imageError ? (
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-neutral-600">
            <Dumbbell className="w-10 h-10 mb-2 stroke-[1.5]" />
            <span className="text-xs uppercase tracking-wider">{workout.name}</span>
          </div>
        )}
      </div>

      {/* Category Tag Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {workout.muscleGroups.map((group) => (
          <span
            key={group}
            className="inline-block bg-[#ccff00] text-black font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full"
          >
            {group}
          </span>
        ))}
      </div>

      {/* Workout Name */}
      <h3 className="font-display font-black text-lg sm:text-xl text-white uppercase tracking-wide group-hover:text-[#ccff00] transition-colors line-clamp-1 mb-1">
        {workout.name}
      </h3>

      {/* Equipment Line */}
      <p className="text-neutral-400 text-xs sm:text-sm font-normal mb-4 line-clamp-1">
        {workout.equipment}
      </p>

      {/* Stats Row */}
      <div className="flex items-center gap-4 text-neutral-400 text-xs sm:text-sm pt-2 border-t border-[#1b212c]">
        <div className="flex items-center gap-1.5" title="Duration">
          <Clock className="w-3.5 h-3.5 text-neutral-400" />
          <span>{workout.duration} min</span>
        </div>

        <div className="flex items-center gap-1.5" title="Calories Burned">
          <Flame className="w-3.5 h-3.5 text-amber-500" />
          <span>{workout.caloriesBurned} kcal</span>
        </div>

        <div className="flex items-center gap-1.5" title="Rating">
          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
          <span>{workout.rating}</span>
        </div>
      </div>
    </Link>
  );
};
