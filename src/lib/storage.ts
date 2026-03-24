"use client";

import type { ChatMessage, Exercise, ExerciseSet, Workout } from "@/lib/types";

const WORKOUTS_KEY = "gymbuddy.workouts.v1";
const CHAT_KEY = "gymbuddy.chat.v1";

function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object";
}

export function loadWorkouts(): Workout[] {
  if (typeof window === "undefined") return [];
  const parsed = safeJsonParse<unknown>(window.localStorage.getItem(WORKOUTS_KEY));
  if (!Array.isArray(parsed)) return [];

  return parsed
    .filter(isRecord)
    .map((w): Workout => {
      const exercisesRaw = Array.isArray(w.exercises) ? w.exercises : [];
    const normalizedExercises: Exercise[] = exercisesRaw
      .filter(isRecord)
      .map((exercise): Exercise => {
        const name = typeof exercise.name === "string" ? exercise.name : "";

        const setsFromArray: ExerciseSet[] = Array.isArray(exercise.sets)
          ? exercise.sets
              .filter(isRecord)
              .map((s): ExerciseSet => ({
                reps: typeof s.reps === "number" ? s.reps : undefined,
                weightLb: typeof s.weightLb === "number" ? s.weightLb : undefined,
              }))
          : [];

        const legacySet: ExerciseSet = {
          reps: typeof exercise.reps === "number" ? exercise.reps : undefined,
          weightLb:
            typeof exercise.weightLb === "number"
              ? exercise.weightLb
              : typeof exercise.weightKg === "number"
                ? Math.round(exercise.weightKg * 2.20462 * 10) / 10
                : undefined,
        };

        const normalizedSets: ExerciseSet[] = setsFromArray.length
          ? setsFromArray
          : [{ reps: legacySet.reps, weightLb: legacySet.weightLb }];

        return { name, sets: normalizedSets.length ? normalizedSets : [{ reps: undefined, weightLb: undefined }] };
      })
      .filter((e) => e.name);

      return {
        id: typeof w.id === "string" ? w.id : crypto.randomUUID(),
        title: typeof w.title === "string" ? w.title : "Workout",
        completedAt:
          typeof w.completedAt === "string" ? w.completedAt : new Date().toISOString(),
        notes: typeof w.notes === "string" ? w.notes : undefined,
        exercises: normalizedExercises,
      };
    });
}

export function saveWorkouts(workouts: Workout[]) {
  window.localStorage.setItem(WORKOUTS_KEY, JSON.stringify(workouts));
}

export function addWorkout(workout: Workout) {
  const workouts = loadWorkouts();
  saveWorkouts([workout, ...workouts]);
}

export function loadChat(): ChatMessage[] {
  if (typeof window === "undefined") return [];
  const parsed = safeJsonParse<ChatMessage[]>(window.localStorage.getItem(CHAT_KEY));
  return Array.isArray(parsed) ? parsed : [];
}

export function saveChat(messages: ChatMessage[]) {
  window.localStorage.setItem(CHAT_KEY, JSON.stringify(messages));
}
