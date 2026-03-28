import { useState } from "react";
import type { EditableBlock } from "../hooks/useWorkoutEditor";
import ExerciseRow from "./ExerciseRow";

interface EditBlockCardProps {
  block: EditableBlock;
  onUpdateBlock: (field: "title" | "subtitle" | "footerNote", value: string) => void;
  onUpdateExercise: (exerciseId: string, field: "name" | "detail", value: string) => void;
  onAddExercise: () => void;
  onRemoveExercise: (exerciseId: string) => void;
  onMoveExercise: (exerciseId: string, direction: "up" | "down") => void;
}

export default function EditBlockCard({
  block,
  onUpdateBlock,
  onUpdateExercise,
  onAddExercise,
  onRemoveExercise,
  onMoveExercise,
}: EditBlockCardProps) {
  const [addHover, setAddHover] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden mb-5"
      style={{
        background: "#0d0d0d",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: `0 0 50px 0 ${block.glow}`,
      }}
    >
      {/* Top accent stripe */}
      <div
        className="h-[3px] w-full"
        style={{
          background: `linear-gradient(90deg, ${block.accent}, ${block.accent}40)`,
        }}
      />

      <div className="p-6">
        {/* Block header */}
        <div className="mb-7">
          {/* Subtitle / timing badge input */}
          <div className="mb-3">
            <input
              type="text"
              value={block.subtitle}
              onChange={(e) => onUpdateBlock("subtitle", e.target.value)}
              className="text-[11px] font-bold tracking-[0.32em] uppercase outline-none bg-transparent placeholder:opacity-30 transition-colors"
              style={{
                color: block.accent,
                fontFamily: "'Barlow', sans-serif",
              }}
              placeholder="AMRAP / EMOM / ACTIVACIÓN"
            />
          </div>

          {/* Title input — styled like the display mode */}
          <input
            type="text"
            value={block.title}
            onChange={(e) => onUpdateBlock("title", e.target.value)}
            className="w-full bg-transparent font-black tracking-[0.1em] outline-none leading-none pb-2 border-b transition-colors duration-200 placeholder:opacity-25"
            style={{
              color: block.accent,
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(2.8rem, 6vw, 3.8rem)",
              textShadow: `0 0 30px ${block.accent}25`,
              borderBottomColor: `${block.accent}25`,
            }}
            placeholder="TÍTULO DEL BLOQUE"
          />
        </div>

        {/* Exercises section label */}
        <div className="flex items-center gap-3 mb-1">
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
          <span
            className="text-[10px] font-semibold tracking-[0.3em] uppercase text-zinc-700"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Ejercicios
          </span>
          <span
            className="text-[10px] font-bold px-1.5 py-0.5 rounded"
            style={{
              color: `${block.accent}90`,
              background: `${block.accent}12`,
              fontFamily: "'Barlow Condensed', sans-serif",
            }}
          >
            {block.exercises.length}
          </span>
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
        </div>

        {/* Exercise list */}
        <div className="mb-5 min-h-[40px]">
          {block.exercises.length === 0 && (
            <div className="py-7 text-center">
              <p
                className="text-sm text-zinc-700 italic"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                Sin ejercicios aún. Añade uno abajo.
              </p>
            </div>
          )}
          {block.exercises.map((exercise, idx) => (
            <ExerciseRow
              key={exercise.id}
              exercise={exercise}
              index={idx}
              accent={block.accent}
              isFirst={idx === 0}
              isLast={idx === block.exercises.length - 1}
              onUpdate={(field, value) => onUpdateExercise(exercise.id, field, value)}
              onRemove={() => onRemoveExercise(exercise.id)}
              onMoveUp={() => onMoveExercise(exercise.id, "up")}
              onMoveDown={() => onMoveExercise(exercise.id, "down")}
            />
          ))}
        </div>

        {/* Add exercise button */}
        <button
          onClick={onAddExercise}
          onMouseEnter={() => setAddHover(true)}
          onMouseLeave={() => setAddHover(false)}
          className="flex items-center gap-2 text-sm font-semibold py-2.5 px-4 rounded-xl cursor-pointer transition-all duration-200 whitespace-nowrap mb-6 w-full justify-center sm:w-auto sm:justify-start"
          style={{
            color: block.accent,
            background: addHover ? `${block.accent}1a` : `${block.accent}0d`,
            border: `1px dashed ${block.accent}35`,
            fontFamily: "'Barlow', sans-serif",
          }}
        >
          <i className="ri-add-line text-base" />
          Añadir ejercicio
        </button>

        {/* Footer note */}
        <div
          className="pt-5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center gap-2 mb-2.5">
            <i className="ri-chat-quote-line text-zinc-700 text-sm" />
            <span
              className="text-[10px] font-semibold tracking-[0.28em] uppercase text-zinc-700"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              Nota del bloque
            </span>
          </div>
          <input
            type="text"
            value={block.footerNote}
            onChange={(e) => onUpdateBlock("footerNote", e.target.value)}
            className="w-full bg-transparent text-sm italic font-light text-zinc-500 outline-none placeholder:text-zinc-800 transition-colors"
            style={{ fontFamily: "'Barlow', sans-serif" }}
            placeholder="Ej. Descansa 90s entre series — prioriza la técnica"
          />
        </div>
      </div>
    </div>
  );
}
