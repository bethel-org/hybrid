import { BLOCK_DISPLAY_THEMES } from "../../mocks/workout";
import { useWorkoutEditor } from "./hooks/useWorkoutEditor";
import EditHeader from "./components/EditHeader";
import SessionInfoCard from "./components/SessionInfoCard";
import EditBlockCard from "./components/EditBlockCard";
import SaveToast from "./components/SaveToast";

export default function EditPage() {
  const {
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
  } = useWorkoutEditor();

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, #0d0d0d 0%, #060606 60%, #000 100%)",
        fontFamily: "'Barlow', sans-serif",
      }}
    >
      {/* Sticky top nav */}
      <EditHeader onSave={save} isDirty={isDirty} />

      {/* Scrollable edit area */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 pb-32">

        {/* Page heading */}
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
            Edita el contenido y pulsa Guardar para actualizar la pantalla de visualización.
          </p>
        </div>

        {/* Thin accent divider */}
        <div
          className="w-full h-px mb-7"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)",
          }}
        />

        {/* Session info card */}
        <SessionInfoCard
          sessionTitle={session.sessionTitle}
          lastUpdated={session.lastUpdated}
          onUpdateSession={updateSession}
        />

        {/* Section label */}
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

        {/* Block edit cards */}
        {session.blocks.map((block, blockIndex) => {
          const theme =
            BLOCK_DISPLAY_THEMES[blockIndex % BLOCK_DISPLAY_THEMES.length];
          return (
            <EditBlockCard
              key={block.id}
              block={block}
              accent={theme.accent}
              glow={theme.glow}
              onUpdateBlock={(field, value) => updateBlock(block.id, field, value)}
              onUpdateExercise={(exerciseId, field, value) =>
                updateExercise(block.id, exerciseId, field, value)
              }
              onAddExercise={() => addExercise(block.id)}
              onRemoveExercise={(exerciseId) => removeExercise(block.id, exerciseId)}
              onMoveExercise={(exerciseId, direction) =>
                moveExercise(block.id, exerciseId, direction)
              }
            />
          );
        })}

        {/* Bottom action row */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={reset}
            className="flex items-center gap-2 text-xs font-medium text-zinc-700 cursor-pointer transition-colors whitespace-nowrap hover:text-zinc-400"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            <i className="ri-refresh-line text-sm" />
            Restaurar valores originales
          </button>

          <button
            onClick={save}
            className="flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold tracking-wide cursor-pointer whitespace-nowrap transition-all duration-300"
            style={{
              background: isDirty ? "#ffffff" : "rgba(255,255,255,0.06)",
              color: isDirty ? "#000000" : "rgba(255,255,255,0.2)",
              boxShadow: isDirty ? "0 0 28px rgba(255,255,255,0.12)" : "none",
              fontFamily: "'Barlow', sans-serif",
            }}
          >
            <i className="ri-save-3-line" />
            Guardar cambios
          </button>
        </div>
      </main>

      {/* Success toast */}
      <SaveToast visible={showSaved} />
    </div>
  );
}
