import { Hero } from "@/components/Hero";
import { HomeWorkoutContainer } from "@/components/HomeWorkoutContainer";

export default function HomePage() {
  return (
    <div className="w-full">
      <Hero />
      <HomeWorkoutContainer />
    </div>
  );
}
