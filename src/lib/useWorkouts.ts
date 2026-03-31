"use client";

import { useSyncExternalStore } from "react";

import { loadWorkouts, subscribeWorkouts } from "@/lib/storage";

const EMPTY: never[] = [];

let cachedRaw: string | null = null;
let cachedValue: unknown[] = EMPTY;

function getSnapshot() {
  if (typeof window === "undefined") return cachedValue;
  const raw = window.localStorage.getItem("gymbuddy.workouts.v1");
  if (raw === cachedRaw) return cachedValue;
  cachedRaw = raw;
  cachedValue = loadWorkouts();
  return cachedValue;
}

export function useWorkouts() {
  return useSyncExternalStore(subscribeWorkouts, getSnapshot, () => cachedValue);
}
