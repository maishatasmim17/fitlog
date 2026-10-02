import Link from "next/link";
import { Dumbbell, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      {/* Icon Badge */}
      <div className="w-16 h-16 rounded-2xl bg-[#141a12] border border-[#2d401e] flex items-center justify-center text-[#ccff00] mb-6 shadow-xl">
        <Dumbbell className="w-8 h-8 rotate-[-45deg] stroke-[2.5]" />
      </div>

      {/* 404 Heading */}
      <span className="font-display font-black text-6xl sm:text-8xl text-neutral-800 tracking-widest select-none">
        404
      </span>

      <h1 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-wider -mt-4 mb-3">
        PAGE NOT FOUND
      </h1>

      <p className="text-neutral-400 text-sm sm:text-base max-w-md mb-8">
        The workout or page you are looking for does not exist in our training registry.
      </p>

      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2.5 bg-[#ccff00] hover:bg-[#d8ff33] text-black font-extrabold text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-[#ccff00]/15 active:scale-95"
      >
        <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
        <span>Back to Workouts</span>
      </Link>
    </div>
  );
}
