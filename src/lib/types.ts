export type ExerciseSet = {
  reps?: number;
  weightLb?: number;
};

export type Exercise = {
  name: string;
  sets: ExerciseSet[];
};

export type Workout = {
  id: string;
  title: string;
  completedAt: string;
  exercises: Exercise[];
  notes?: string;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};
