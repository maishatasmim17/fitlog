import { Suspense } from "react";
import { Metadata } from "next";
import { MyPlanView } from "@/components/MyPlanView";

export const metadata: Metadata = {
  title: "My Plan — FitLog",
  description: "View and manage your active workout plan and saved exercises.",
};

export default function MyPlanPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full py-20 text-center">
          <p className="text-neutral-400 text-sm flex items-center justify-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00] animate-pulse" />
            Loading plan...
          </p>
        </div>
      }
    >
      <MyPlanView />
    </Suspense>
  );
}
