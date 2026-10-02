import { Workout } from "@/types/workout";
import { fallbackWorkouts } from "@/data/fallbackWorkouts";

const PRIMARY_API = "https://api.abcz.workers.dev/api/fitlog";
const BACKUP_API = "https://api.api-store.workers.dev/api/fitlog";

async function fetchWithTimeout(url: string, timeoutMs = 5000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });
    return res;
  } finally {
    clearTimeout(id);
  }
}

export async function getAllWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetchWithTimeout(PRIMARY_API, 5000);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (err) {
    console.warn("Primary API failed, trying backup API...", err);
  }

  try {
    const res = await fetchWithTimeout(BACKUP_API, 5000);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (err) {
    console.warn("Backup API failed, falling back to local dataset...", err);
  }

  return fallbackWorkouts;
}

export async function getWorkoutById(id: number | string): Promise<Workout | null> {
  const numId = Number(id);
  if (isNaN(numId)) return null;

  try {
    const res = await fetchWithTimeout(`${PRIMARY_API}/${numId}`, 5000);
    if (res.ok) {
      const data = await res.json();
      if (data && data.id) {
        return data;
      }
    }
  } catch (err) {
    console.warn(`Primary API failed for id ${numId}, trying backup API...`, err);
  }

  try {
    const res = await fetchWithTimeout(`${BACKUP_API}/${numId}`, 5000);
    if (res.ok) {
      const data = await res.json();
      if (data && data.id) {
        return data;
      }
    }
  } catch (err) {
    console.warn(`Backup API failed for id ${numId}, falling back to local dataset...`, err);
  }

  const found = fallbackWorkouts.find((w) => w.id === numId);
  return found || null;
}
