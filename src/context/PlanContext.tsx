"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Workout } from "@/types/workout";

export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

interface PlanContextType {
  todayPlan: Workout[];
  savedWorkouts: Workout[];
  completedWorkoutIds: number[];
  addToTodayPlan: (workout: Workout) => boolean;
  removeFromTodayPlan: (id: number) => void;
  addToSaved: (workout: Workout) => boolean;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
  isMarkedDone: (id: number) => boolean;
  isInTodayPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  planCount: number;
  savedCount: number;
  toasts: ToastMessage[];
  showToast: (message: string, type?: ToastMessage["type"]) => void;
  removeToast: (id: string) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

const STORAGE_KEYS = {
  TODAY: "fitlog_today_plan_v1",
  SAVED: "fitlog_saved_v1",
  COMPLETED: "fitlog_completed_v1",
};

const MAX_TODAY_PLAN = 5;

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todayPlan, setTodayPlan] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
  const [completedWorkoutIds, setCompletedWorkoutIds] = useState<number[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const storedToday = localStorage.getItem(STORAGE_KEYS.TODAY);
      const storedSaved = localStorage.getItem(STORAGE_KEYS.SAVED);
      const storedCompleted = localStorage.getItem(STORAGE_KEYS.COMPLETED);

      if (storedToday) {
        setTodayPlan(JSON.parse(storedToday));
      }
      if (storedSaved) {
        setSavedWorkouts(JSON.parse(storedSaved));
      }
      if (storedCompleted) {
        setCompletedWorkoutIds(JSON.parse(storedCompleted));
      }
    } catch (e) {
      console.error("Failed to load fitlog state from localStorage", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEYS.TODAY, JSON.stringify(todayPlan));
    } catch (e) {
      console.error("Failed to save todayPlan", e);
    }
  }, [todayPlan, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(savedWorkouts));
    } catch (e) {
      console.error("Failed to save savedWorkouts", e);
    }
  }, [savedWorkouts, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify(completedWorkoutIds));
    } catch (e) {
      console.error("Failed to save completed workouts", e);
    }
  }, [completedWorkoutIds, isHydrated]);

  const showToast = (message: string, type: ToastMessage["type"] = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const isInTodayPlan = (id: number) => todayPlan.some((w) => w.id === id);
  const isSaved = (id: number) => savedWorkouts.some((w) => w.id === id);
  const isMarkedDone = (id: number) => completedWorkoutIds.includes(id);

  const addToTodayPlan = (workout: Workout): boolean => {
    if (isInTodayPlan(workout.id)) {
      showToast(`"${workout.name}" is already in today's plan!`, "info");
      return false;
    }

    if (todayPlan.length >= MAX_TODAY_PLAN) {
      showToast(`Daily cap reached! Maximum ${MAX_TODAY_PLAN} lifts allowed in today's plan.`, "warning");
      return false;
    }

    setTodayPlan((prev) => [...prev, workout]);
    showToast(`Added to today's plan: ${workout.name}`, "success");
    return true;
  };

  const removeFromTodayPlan = (id: number) => {
    const found = todayPlan.find((w) => w.id === id);
    setTodayPlan((prev) => prev.filter((w) => w.id !== id));
    setCompletedWorkoutIds((prev) => prev.filter((wId) => wId !== id));
    if (found) {
      showToast(`Removed "${found.name}" from today's plan`, "info");
    }
  };

  const addToSaved = (workout: Workout): boolean => {
    if (isSaved(workout.id)) {
      showToast(`"${workout.name}" is already saved for later!`, "info");
      return false;
    }

    setSavedWorkouts((prev) => [...prev, workout]);
    showToast(`Saved for later: ${workout.name}`, "success");
    return true;
  };

  const removeFromSaved = (id: number) => {
    const found = savedWorkouts.find((w) => w.id === id);
    setSavedWorkouts((prev) => prev.filter((w) => w.id !== id));
    if (found) {
      showToast(`Removed "${found.name}" from saved workouts`, "info");
    }
  };

  const markAsDone = (id: number) => {
    const found = todayPlan.find((w) => w.id === id);
    if (!found) return;

    if (completedWorkoutIds.includes(id)) {
      setCompletedWorkoutIds((prev) => prev.filter((wId) => wId !== id));
      showToast(`Unmarked "${found.name}" as done`, "info");
    } else {
      setCompletedWorkoutIds((prev) => [...prev, id]);
      showToast(`Completed! Great job on "${found.name}"`, "success");
    }
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        completedWorkoutIds,
        addToTodayPlan,
        removeFromTodayPlan,
        addToSaved,
        removeFromSaved,
        markAsDone,
        isMarkedDone,
        isInTodayPlan,
        isSaved,
        planCount: todayPlan.length,
        savedCount: savedWorkouts.length,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
};
