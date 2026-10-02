import React from "react";

export const WorkoutSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-2xl bg-[#11151e] border border-[#1d2330] p-4 flex flex-col"
        >
          {/* Thumbnail Skeleton */}
          <div className="w-full aspect-[16/10] rounded-xl bg-neutral-800/60 mb-4" />

          {/* Tags Skeleton */}
          <div className="flex gap-2 mb-3">
            <div className="h-5 w-16 bg-neutral-800 rounded-full" />
            <div className="h-5 w-14 bg-neutral-800 rounded-full" />
          </div>

          {/* Title Skeleton */}
          <div className="h-6 w-3/4 bg-neutral-800 rounded mb-2" />

          {/* Equipment Skeleton */}
          <div className="h-4 w-1/2 bg-neutral-800/60 rounded mb-4" />

          {/* Stats Skeleton */}
          <div className="flex items-center gap-4 pt-3 border-t border-[#1b212c]">
            <div className="h-4 w-14 bg-neutral-800 rounded" />
            <div className="h-4 w-16 bg-neutral-800 rounded" />
            <div className="h-4 w-10 bg-neutral-800 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};
