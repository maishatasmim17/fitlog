"use client";

import React, { useEffect, useState } from "react";
import { Workout } from "@/types/workout";
import { getAllWorkouts } from "@/lib/api";
import { LibrarySection } from "@/components/LibrarySection";
import { WorkoutSkeleton } from "@/components/WorkoutSkeleton";

export const HomeWorkoutContainer: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const data = await getAllWorkouts();
        if (isMounted) {
          setWorkouts(data);
        }
      } catch (err) {
        console.error("Failed to load workouts:", err);
      } finally {
        if (isMounted) {
          // slight delay for smooth visual feel if it loaded instantly
          setTimeout(() => {
            if (isMounted) setLoading(false);
          }, 300);
        }
      }
    };

    fetchWorkouts();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section id="library" className="scroll-mt-24 mb-20">
        <div className="mb-8">
          <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tight mb-2">
            THE LIBRARY
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#ccff00] animate-pulse" />
            Loading workouts from library…
          </p>
        </div>
        <WorkoutSkeleton />
      </section>
    );
  }

  return <LibrarySection initialWorkouts={workouts} />;
};
