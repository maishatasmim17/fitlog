import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getWorkoutById, getAllWorkouts } from "@/lib/api";
import { WorkoutDetailView } from "@/components/WorkoutDetailView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const workout = await getWorkoutById(resolvedParams.id);
  if (!workout) {
    return {
      title: "Workout Not Found — FitLog",
    };
  }
  return {
    title: `${workout.name} — FitLog Workout Details`,
    description: workout.description,
  };
}

export default async function WorkoutDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const workout = await getWorkoutById(resolvedParams.id);

  if (!workout) {
    notFound();
  }

  return <WorkoutDetailView workout={workout} />;
}
