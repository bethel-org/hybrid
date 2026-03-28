import type { WorkoutSession } from "../../mocks/workout";
import {
  useHybridWorkoutQuery,
  useUpdateHybridWorkoutMutation,
} from "../../hooks/useHybridWorkout";
import { BLOCK_DISPLAY_THEMES } from "../../mocks/workout";
import { useWorkoutEditor } from "./hooks/useWorkoutEditor";
import EditHeader from "./components/EditHeader";
import SessionInfoCard from "./components/SessionInfoCard";
import EditBlockCard from "./components/EditBlockCard";
import SaveToast from "./components/SaveToast";

function EditPageShell({
  serverSession,
  persistWorkout,
  isSaving,
}: {
  serverSession: WorkoutSession;
  persistWorkout: (payload: WorkoutSession) => Promise<WorkoutSession>;
  isSaving: boolean;
}) {
  const {
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
  } = useWorkoutEditor(serverSession, {
    onSaveRequest: persistWorkout,
  });

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #0d0d0d 0%, #060606 60%, #000 100%)",
        fontFamily: "'Barlow', sans-serif",
      }}
    >
      <EditHeader
        onSave={() => void save()}
        isDirty={isDirty}
        isSaving={isSaving}
      />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 pb-32">
        <div className="mb-7">
          <div className="flex items-center gap-3 mb-1">
            <h1
              className="text-[2rem] font-black tracking-[0.18em] text-white leading-none"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              EDITAR SESIÓN
            </h1>
            {isDirty && (
              <span
                className="text-[10px] font-bold tracking-[0.2em] uppercase px-2 py-1 rounded-full"
                style={{
                  color: "#FFB800",
                  background: "rgba(255,184,0,0.1)",
                  border: "1px solid rgba(255,184,0,0.2)",
                  fontFamily: "'Barlow', sans-serif",
                }}
              >
                Sin guardar
              </span>
            )}
          </div>
          <p
            className="text-xs font-light text-zinc-600 tracking-wide"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Edita el contenido y pulsa Guardar para actualizar la pantalla de
            visualización.
          </p>
        </div>

        <div
          className="w-full h-px mb-7"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)",
          }}
        />

        <SessionInfoCard
          sessionTitle={session.sessionTitle}
          lastUpdated={session.lastUpdated}
          onUpdateSession={updateSession}
        />

        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-zinc-800/80" />
          <span
            className="text-[10px] font-semibold tracking-[0.35em] uppercase text-zinc-700"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Bloques de Entrenamiento
          </span>
          <div className="h-px flex-1 bg-zinc-800/80" />
        </div>

        {session.blocks.map((block, blockIndex) => {
          const theme =
            BLOCK_DISPLAY_THEMES[blockIndex % BLOCK_DISPLAY_THEMES.length];
          return (
            <EditBlockCard
              key={block.id}
              block={block}
              accent={theme.accent}
              glow={theme.glow}
              onUpdateBlock={(field, value) =>
                updateBlock(block.id, field, value)
              }
              onUpdateExercise={(exerciseId, field, value) =>
                updateExercise(block.id, exerciseId, field, value)
              }
              onAddExercise={() => addExercise(block.id)}
              onRemoveExercise={(exerciseId) =>
                removeExercise(block.id, exerciseId)
              }
              onMoveExercise={(exerciseId, direction) =>
                moveExercise(block.id, exerciseId, direction)
              }
            />
          );
        })}

        {saveError && (
          <p
            className="mt-4 text-sm text-red-400/90"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            {saveError}
          </p>
        )}

        <div className="flex items-center justify-between mt-6">
          <button
            type="button"
            onClick={reset}
            disabled={isSaving}
            className="flex items-center gap-2 text-xs font-medium text-zinc-700 cursor-pointer transition-colors whitespace-nowrap hover:text-zinc-400 disabled:opacity-40 disabled:pointer-events-none"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            <i className="ri-refresh-line text-sm" />
            Restaurar valores originales
          </button>

          <button
            type="button"
            onClick={() => void save()}
            disabled={isSaving || !isDirty}
            className="flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold tracking-wide cursor-pointer whitespace-nowrap transition-all duration-300 disabled:pointer-events-none"
            style={{
              background:
                isDirty && !isSaving ? "#ffffff" : "rgba(255,255,255,0.06)",
              color: isDirty && !isSaving ? "#000000" : "rgba(255,255,255,0.2)",
              boxShadow:
                isDirty && !isSaving
                  ? "0 0 28px rgba(255,255,255,0.12)"
                  : "none",
              fontFamily: "'Barlow', sans-serif",
            }}
          >
            <i
              className={`ri-save-3-line ${isSaving ? "animate-pulse" : ""}`}
            />
            {isSaving ? "Guardando…" : "Guardar cambios"}
          </button>
        </div>
      </main>

      <SaveToast visible={showSaved} />
    </div>
  );
}

export default function EditPage() {
  const { data, isPending, isError, error, refetch } = useHybridWorkoutQuery();
  const mutation = useUpdateHybridWorkoutMutation();

  if (isPending && data === undefined) {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center text-zinc-500 text-sm tracking-wide"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #0d0d0d 0%, #060606 60%, #000 100%)",
          fontFamily: "'Barlow', sans-serif",
        }}
      >
        Cargando sesión…
      </div>
    );
  }

  if (data === undefined) {
    return (
      <div
        className="min-h-screen w-full flex flex-col items-center justify-center gap-4 px-6 text-center"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #0d0d0d 0%, #060606 60%, #000 100%)",
          fontFamily: "'Barlow', sans-serif",
        }}
      >
        <p className="text-zinc-400 text-sm max-w-md">
          {isError && error instanceof Error
            ? error.message
            : "No se pudo cargar la sesión híbrida."}
        </p>
        <button
          type="button"
          onClick={() => void refetch()}
          className="px-5 py-2 rounded-full text-sm font-semibold text-black bg-white"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <EditPageShell
      serverSession={data}
      persistWorkout={mutation.mutateAsync}
      isSaving={mutation.isPending}
    />
  );
}
