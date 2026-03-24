"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { TopBar } from "@/components/TopBar";
import { addWorkout } from "@/lib/storage";
import type { Exercise, ExerciseSet, Workout } from "@/lib/types";

type SetDraft = {
  reps: string;
  weightLb: string;
};

type ExerciseDraft = {
  name: string;
  sets: SetDraft[];
};

const emptySet = (): SetDraft => ({ reps: "", weightLb: "" });

const emptyExercise = (): ExerciseDraft => ({
  name: "",
  sets: [emptySet()],
});

function toNumber(value: string): number | undefined {
  const v = value.trim();
  if (!v) return undefined;
  const num = Number(v);
  return Number.isFinite(num) ? num : undefined;
}

export default function NewWorkoutPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [exercises, setExercises] = useState<ExerciseDraft[]>([emptyExercise()]);
  const [saving, setSaving] = useState(false);

  const canSave = useMemo(() => {
    if (!title.trim()) return false;
    const anyNamed = exercises.some((e) => e.name.trim());
    if (!anyNamed) return false;
    return exercises.every((e) => !e.name.trim() || e.name.trim().length >= 2);
  }, [exercises, title]);

  function updateExercise(index: number, patch: Partial<ExerciseDraft>) {
    setExercises((prev) => prev.map((ex, i) => (i === index ? { ...ex, ...patch } : ex)));
  }

  function updateSet(exerciseIndex: number, setIndex: number, patch: Partial<SetDraft>) {
    setExercises((prev) =>
      prev.map((ex, i) => {
        if (i !== exerciseIndex) return ex;
        return {
          ...ex,
          sets: ex.sets.map((s, j) => (j === setIndex ? { ...s, ...patch } : s)),
        };
      })
    );
  }

  function addSet(exerciseIndex: number) {
    setExercises((prev) =>
      prev.map((ex, i) => (i === exerciseIndex ? { ...ex, sets: [...ex.sets, emptySet()] } : ex))
    );
  }

  function removeSet(exerciseIndex: number, setIndex: number) {
    setExercises((prev) =>
      prev.map((ex, i) => {
        if (i !== exerciseIndex) return ex;
        const nextSets = ex.sets.filter((_, j) => j !== setIndex);
        return { ...ex, sets: nextSets.length ? nextSets : [emptySet()] };
      })
    );
  }

  function removeExercise(index: number) {
    setExercises((prev) => prev.filter((_, i) => i !== index));
  }

  async function onSave() {
    if (!canSave) return;
    setSaving(true);

    const parsedExercises: Exercise[] = exercises
      .filter((e) => e.name.trim())
      .map((e) => {
        const sets: ExerciseSet[] = e.sets.map((s) => ({
          reps: toNumber(s.reps),
          weightLb: toNumber(s.weightLb),
        }));

        return {
          name: e.name.trim(),
          sets: sets.length ? sets : [{ reps: undefined, weightLb: undefined }],
        };
      });

    const workout: Workout = {
      id: crypto.randomUUID(),
      title: title.trim(),
      completedAt: new Date().toISOString(),
      exercises: parsedExercises,
      notes: notes.trim() ? notes.trim() : undefined,
    };

    addWorkout(workout);
    router.push("/workouts");
  }

  return (
    <div className="min-h-dvh">
      <TopBar title="Log workout" />

      <main className="px-4 pt-4 md:px-6 md:pt-8">
        <div className="mb-4 hidden items-center justify-between md:flex">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Log workout</h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Save a workout to local storage.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-zinc-200/70 bg-white p-4 dark:border-white/10 dark:bg-zinc-950">
            <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Push day"
              className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400 dark:border-white/10 dark:bg-black"
            />
          </div>

          <div className="rounded-3xl border border-zinc-200/70 bg-white p-4 dark:border-white/10 dark:bg-zinc-950">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold tracking-tight">Exercises</p>
              <button
                type="button"
                onClick={() => setExercises((prev) => [...prev, emptyExercise()])}
                className="rounded-xl border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-200 dark:hover:bg-white/5"
              >
                Add
              </button>
            </div>

            <div className="mt-3 space-y-3">
              {exercises.map((ex, i) => (
                <div
                  key={i}
                  className="rounded-3xl bg-zinc-50 p-3 dark:bg-white/5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <input
                      value={ex.name}
                      onChange={(e) => updateExercise(i, { name: e.target.value })}
                      placeholder="Bench press"
                      className="w-full rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-white/10 dark:bg-black"
                    />
                    {exercises.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => removeExercise(i)}
                        className="shrink-0 rounded-2xl border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-100 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/10"
                      >
                        Remove
                      </button>
                    ) : null}
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        Sets
                      </p>
                      <button
                        type="button"
                        onClick={() => addSet(i)}
                        className="inline-flex items-center gap-1 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:border-white/10 dark:bg-black dark:text-zinc-200 dark:hover:bg-white/10"
                        aria-label="Add set"
                      >
                        <Plus className="h-4 w-4" />
                        Set
                      </button>
                    </div>

                    <div className="space-y-2">
                      {ex.sets.map((s, setIndex) => (
                        <div
                          key={setIndex}
                          className="rounded-2xl bg-white p-3 ring-1 ring-zinc-200 dark:bg-black dark:ring-white/10"
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                              Set {setIndex + 1}
                            </p>

                            {ex.sets.length > 1 ? (
                              <button
                                type="button"
                                onClick={() => removeSet(i, setIndex)}
                                className="rounded-xl px-2 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/10"
                              >
                                Remove
                              </button>
                            ) : null}
                          </div>

                          <div className="mt-2 grid grid-cols-2 gap-2">
                            <input
                              value={s.reps}
                              onChange={(e) =>
                                updateSet(i, setIndex, { reps: e.target.value })
                              }
                              inputMode="numeric"
                              placeholder="Reps"
                              className="rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-white/10 dark:bg-black"
                            />
                            <input
                              value={s.weightLb}
                              onChange={(e) =>
                                updateSet(i, setIndex, {
                                  weightLb: e.target.value,
                                })
                              }
                              inputMode="decimal"
                              placeholder="Weight (lb)"
                              className="rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-white/10 dark:bg-black"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200/70 bg-white p-4 dark:border-white/10 dark:bg-zinc-950">
            <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="How it felt, what to improve next time..."
              className="mt-2 w-full resize-none rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400 dark:border-white/10 dark:bg-black"
            />
          </div>

          <button
            type="button"
            disabled={!canSave || saving}
            onClick={onSave}
            className="w-full rounded-2xl bg-zinc-950 py-3 text-sm font-medium text-white disabled:opacity-50 dark:bg-white dark:text-zinc-950"
          >
            {saving ? "Saving..." : "Save workout"}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="w-full rounded-2xl border border-zinc-200 bg-white py-3 text-sm font-medium text-zinc-900 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-50"
          >
            Cancel
          </button>
        </div>
      </main>
    </div>
  );
}
