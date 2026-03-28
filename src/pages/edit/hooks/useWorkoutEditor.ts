import { useState, useCallback } from "react";
import { workoutData } from "../../../mocks/workout";

export interface EditableExercise {
  id: string;
  name: string;
  detail: string;
}

export interface EditableBlock {
  id: string;
  title: string;
  subtitle: string;
  exercises: EditableExercise[];
  footerNote: string;
  accent: string;
  glow: string;
}

export interface EditableSession {
  sessionTitle: string;
  className: string;
  coach: string;
  blocks: EditableBlock[];
}

const genId = (): string =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

function buildInitialSession(): EditableSession {
  return {
    sessionTitle: workoutData.sessionTitle,
    className: workoutData.className,
    coach: workoutData.coach,
    blocks: workoutData.blocks.map((block) => ({
      id: block.id,
      title: block.title,
      subtitle: block.subtitle ?? "",
      exercises: block.exercises.map((ex) => ({
        id: genId(),
        name: ex.name,
        detail: ex.detail ?? "",
      })),
      footerNote: block.footerNote ?? "",
      accent: block.accent,
      glow: block.glow,
    })),
  };
}

export function useWorkoutEditor() {
  const [session, setSession] = useState<EditableSession>(buildInitialSession);
  const [showSaved, setShowSaved] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const markDirty = () => setIsDirty(true);

  const updateSession = useCallback(
    (field: "sessionTitle" | "className" | "coach", value: string) => {
      setSession((prev) => ({ ...prev, [field]: value }));
      markDirty();
    },
    []
  );

  const updateBlock = useCallback(
    (blockId: string, field: "title" | "subtitle" | "footerNote", value: string) => {
      setSession((prev) => ({
        ...prev,
        blocks: prev.blocks.map((b) =>
          b.id === blockId ? { ...b, [field]: value } : b
        ),
      }));
      markDirty();
    },
    []
  );

  const updateExercise = useCallback(
    (blockId: string, exerciseId: string, field: "name" | "detail", value: string) => {
      setSession((prev) => ({
        ...prev,
        blocks: prev.blocks.map((b) =>
          b.id === blockId
            ? {
                ...b,
                exercises: b.exercises.map((e) =>
                  e.id === exerciseId ? { ...e, [field]: value } : e
                ),
              }
            : b
        ),
      }));
      markDirty();
    },
    []
  );

  const addExercise = useCallback((blockId: string) => {
    setSession((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) =>
        b.id === blockId
          ? { ...b, exercises: [...b.exercises, { id: genId(), name: "", detail: "" }] }
          : b
      ),
    }));
    markDirty();
  }, []);

  const removeExercise = useCallback((blockId: string, exerciseId: string) => {
    setSession((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) =>
        b.id === blockId
          ? { ...b, exercises: b.exercises.filter((e) => e.id !== exerciseId) }
          : b
      ),
    }));
    markDirty();
  }, []);

  const moveExercise = useCallback(
    (blockId: string, exerciseId: string, direction: "up" | "down") => {
      setSession((prev) => ({
        ...prev,
        blocks: prev.blocks.map((b) => {
          if (b.id !== blockId) return b;
          const idx = b.exercises.findIndex((e) => e.id === exerciseId);
          if (idx === -1) return b;
          const next = [...b.exercises];
          const target = direction === "up" ? idx - 1 : idx + 1;
          if (target < 0 || target >= next.length) return b;
          [next[idx], next[target]] = [next[target], next[idx]];
          return { ...b, exercises: next };
        }),
      }));
      markDirty();
    },
    []
  );

  const save = useCallback(() => {
    setShowSaved(true);
    setIsDirty(false);
    setTimeout(() => setShowSaved(false), 3500);
  }, []);

  const reset = useCallback(() => {
    setSession(buildInitialSession());
    setIsDirty(false);
  }, []);

  return {
    session,
    showSaved,
    isDirty,
    updateSession,
    updateBlock,
    updateExercise,
    addExercise,
    removeExercise,
    moveExercise,
    save,
    reset,
  };
}
