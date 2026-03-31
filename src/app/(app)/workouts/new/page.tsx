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
  const [error, setError] = useState<string | null>(null);

  const canSave = useMemo(() => {
    if (!title.trim()) return false;
    const anyNamed = exercises.some((e) => e.name.trim());
    if (!anyNamed) return false;
    return exercises.every((e) => !e.name.trim() || e.name.trim().length >= 2);
  }, [exercises, title]);

  const validationError = useMemo(() => {
    if (!title.trim()) return "Add a workout title.";
    const anyNamed = exercises.some((e) => e.name.trim());
    if (!anyNamed) return "Add at least one exercise.";
    const shortName = exercises.find((e) => e.name.trim() && e.name.trim().length < 2);
    if (shortName) return "Exercise names must be at least 2 characters.";
    return null;
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
    setError(null);
    if (!canSave) {
      setError(validationError ?? "Missing required fields.");
      return;
    }
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

    try {
      addWorkout(workout);
      router.push("/workouts");
    } catch (e) {
      setSaving(false);
      setError(
        e instanceof Error
          ? e.message
          : "Could not save workout. Is local storage available?"
      );
    }
  }

  return (
    <div className="min-h-dvh bg-[color:var(--gb-bg)] text-[color:var(--gb-fg)]">
      <TopBar title="Log workout" />

      <main className="px-4 pt-4 md:px-12 md:pt-12">
        <div className="mb-4 hidden items-center justify-between md:flex">
          <div>
            <p className="font-mono text-xs tracking-[0.25em] text-[color:var(--gb-muted)]">
              WORKOUT LOGGING
            </p>
            <h1 className="mt-2 font-mono text-3xl tracking-tight">Log workout</h1>
          </div>
        </div>

        <div className="space-y-4 md:space-y-6">
          {error ? (
            <div className="rounded-3xl border border-[var(--gb-border)] bg-[color:var(--gb-card)] px-5 py-4 text-sm text-[color:var(--gb-muted)] backdrop-blur">
              <span className="font-medium text-[color:var(--gb-fg)]">Fix:</span> {error}
            </div>
          ) : null}
          <div className="gb-card rounded-[2rem] border border-[var(--gb-border)] bg-[color:var(--gb-card)] p-5 backdrop-blur md:p-8">
            <label className="font-mono text-[10px] tracking-[0.25em] text-[color:var(--gb-muted)]">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Push day"
              className="mt-3 w-full rounded-2xl border border-[var(--gb-border)] bg-[color:var(--gb-bg)] px-4 py-3 text-sm outline-none focus:border-[color:var(--gb-accent)]"
            />
          </div>

          <div className="gb-card rounded-[2rem] border border-[var(--gb-border)] bg-[color:var(--gb-card)] p-5 backdrop-blur md:p-8">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold tracking-tight">Exercises</p>
                <button
                  type="button"
                  onClick={() => setExercises((prev) => [...prev, emptyExercise()])}
                  className="gb-btn rounded-xl border border-[var(--gb-border)] bg-[color:var(--gb-card)] px-3 py-2 text-xs font-medium hover:bg-[color:var(--gb-card-strong)]"
                >
                  Add
                </button>
            </div>

            <div className="mt-3 space-y-3">
              {exercises.map((ex, i) => (
                  <div
                    key={i}
                    className="rounded-[2rem] border border-[var(--gb-border)] bg-[color:var(--gb-card-strong)] p-4 md:p-5"
                  >
                  <div className="flex items-center justify-between gap-3">
                    <input
                      value={ex.name}
                      onChange={(e) => updateExercise(i, { name: e.target.value })}
                      placeholder="Bench press"
                      className="w-full rounded-2xl border border-[var(--gb-border)] bg-[color:var(--gb-bg)] px-3 py-2 text-sm outline-none focus:border-[color:var(--gb-accent)]"
                    />
                    {exercises.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => removeExercise(i)}
                        className="shrink-0 rounded-2xl border border-[var(--gb-border)] bg-[color:var(--gb-card)] px-3 py-2 text-xs font-medium text-[color:var(--gb-muted)] hover:bg-[color:var(--gb-card-strong)]"
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
                          className="gb-btn inline-flex items-center gap-1 rounded-xl border border-[var(--gb-border)] bg-[color:var(--gb-card)] px-3 py-2 text-xs font-medium hover:bg-[color:var(--gb-card-strong)]"
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
                          className="rounded-2xl bg-[color:var(--gb-bg)] p-3 ring-1 ring-[var(--gb-border)]"
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                              Set {setIndex + 1}
                            </p>

                            {ex.sets.length > 1 ? (
                              <button
                                type="button"
                                onClick={() => removeSet(i, setIndex)}
                                className="rounded-xl px-2 py-1 text-xs font-medium text-[color:var(--gb-muted)] hover:bg-[color:var(--gb-card-strong)]"
                              >
                                Remove
                              </button>
                            ) : null}
                          </div>

                          <div className="mt-2 grid grid-cols-2 gap-2">
                            <input
                              value={s.weightLb}
                              onChange={(e) =>
                                updateSet(i, setIndex, {
                                  weightLb: e.target.value,
                                })
                              }
                              inputMode="decimal"
                              placeholder="Weight (lb)"
                              className="rounded-2xl border border-[var(--gb-border)] bg-[color:var(--gb-bg)] px-3 py-2 text-sm outline-none focus:border-[color:var(--gb-accent)]"
                            />
                            <input
                              value={s.reps}
                              onChange={(e) =>
                                updateSet(i, setIndex, { reps: e.target.value })
                              }
                              inputMode="numeric"
                              placeholder="Reps"
                              className="rounded-2xl border border-[var(--gb-border)] bg-[color:var(--gb-bg)] px-3 py-2 text-sm outline-none focus:border-[color:var(--gb-accent)]"
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

          <div className="gb-card rounded-[2rem] border border-[var(--gb-border)] bg-[color:var(--gb-card)] p-5 backdrop-blur md:p-8">
            <label className="font-mono text-[10px] tracking-[0.25em] text-[color:var(--gb-muted)]">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="How it felt, what to improve next time..."
              className="mt-3 w-full resize-none rounded-2xl border border-[var(--gb-border)] bg-[color:var(--gb-bg)] px-4 py-3 text-sm outline-none focus:border-[color:var(--gb-accent)]"
            />
          </div>

          <button
            type="button"
            disabled={saving}
            onClick={onSave}
            className="gb-btn w-full rounded-2xl bg-[color:var(--gb-fg)] py-3 text-sm font-semibold text-[color:var(--gb-bg)] disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save workout"}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="gb-btn w-full rounded-2xl border border-[var(--gb-border)] bg-[color:var(--gb-card)] py-3 text-sm font-semibold text-[color:var(--gb-fg)] hover:bg-[color:var(--gb-card-strong)]"
          >
            Cancel
          </button>
        </div>
      </main>
    </div>
  );
}
