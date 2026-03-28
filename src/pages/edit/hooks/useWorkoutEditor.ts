import { useCallback, useLayoutEffect, useState } from "react";
import type { WorkoutSession } from "../../../mocks/workout";

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
}

export interface EditableSession {
  sessionTitle: string;
  lastUpdated: string;
  blocks: EditableBlock[];
}

const genId = (): string =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

export function sessionFromApi(data: WorkoutSession): EditableSession {
  return {
    sessionTitle: data.sessionTitle,
    lastUpdated: data.lastUpdated,
    blocks: data.blocks.map((block) => ({
      id: genId(),
      title: block.title,
      subtitle: block.subtitle ?? "",
      exercises: block.exercises.map((ex) => ({
        id: genId(),
        name: ex.name,
        detail: ex.detail ?? "",
      })),
    })),
  };
}

export function editableSessionToWorkoutSession(
  s: EditableSession,
): WorkoutSession {
  return {
    sessionTitle: s.sessionTitle,
    lastUpdated: s.lastUpdated,
    blocks: s.blocks.map((b) => ({
      title: b.title,
      subtitle: b.subtitle.trim() === "" ? undefined : b.subtitle,
      exercises: b.exercises.map((e) => ({
        name: e.name,
        detail: e.detail,
      })),
    })),
  };
}

export function useWorkoutEditor(
  serverSession: WorkoutSession,
  options: {
    onSaveRequest: (payload: WorkoutSession) => Promise<WorkoutSession>;
  },
) {
  const { onSaveRequest } = options;

  const [session, setSession] = useState<EditableSession>(() =>
    sessionFromApi(serverSession),
  );
  const [showSaved, setShowSaved] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useLayoutEffect(() => {
    if (isDirty) return;
    setSession(sessionFromApi(serverSession));
  }, [serverSession, isDirty]);

  const markDirty = () => {
    setSaveError(null);
    setIsDirty(true);
  };

  const updateSession = useCallback(
    (field: "sessionTitle" | "lastUpdated", value: string) => {
      setSession((prev) => ({ ...prev, [field]: value }));
      markDirty();
    },
    [],
  );

  const updateBlock = useCallback(
    (blockId: string, field: "title" | "subtitle", value: string) => {
      setSession((prev) => ({
        ...prev,
        blocks: prev.blocks.map((b) =>
          b.id === blockId ? { ...b, [field]: value } : b,
        ),
      }));
      markDirty();
    },
    [],
  );

  const updateExercise = useCallback(
    (
      blockId: string,
      exerciseId: string,
      field: "name" | "detail",
      value: string,
    ) => {
      setSession((prev) => ({
        ...prev,
        blocks: prev.blocks.map((b) =>
          b.id === blockId
            ? {
                ...b,
                exercises: b.exercises.map((e) =>
                  e.id === exerciseId ? { ...e, [field]: value } : e,
                ),
              }
            : b,
        ),
      }));
      markDirty();
    },
    [],
  );

  const addExercise = useCallback((blockId: string) => {
    setSession((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) =>
        b.id === blockId
          ? {
              ...b,
              exercises: [
                ...b.exercises,
                { id: genId(), name: "", detail: "" },
              ],
            }
          : b,
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
          : b,
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
    [],
  );

  const save = useCallback(async () => {
    setSaveError(null);
    try {
      const payload = editableSessionToWorkoutSession(session);
      const updated = await onSaveRequest(payload);
      setSession(sessionFromApi(updated));
      setIsDirty(false);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 3500);
    } catch (e) {
      setSaveError(
        e instanceof Error ? e.message : "No se pudo guardar. Reintentá.",
      );
    }
  }, [session, onSaveRequest]);

  const reset = useCallback(() => {
    setSession(sessionFromApi(serverSession));
    setIsDirty(false);
    setSaveError(null);
  }, [serverSession]);

  return {
    session,
    showSaved,
    isDirty,
    saveError,
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
