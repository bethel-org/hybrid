import { useState } from "react";
import type { EditableBlock } from "../hooks/useWorkoutEditor";
import ExerciseRow from "./ExerciseRow";

interface EditBlockCardProps {
  block: EditableBlock;
  accent: string;
  glow: string;
  onUpdateBlock: (field: "title" | "subtitle", value: string) => void;
  onUpdateExercise: (exerciseId: string, field: "name" | "detail", value: string) => void;
  onAddExercise: () => void;
  onRemoveExercise: (exerciseId: string) => void;
  onMoveExercise: (exerciseId: string, direction: "up" | "down") => void;
}

export default function EditBlockCard({
  block,
  accent,
  glow,
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
        boxShadow: `0 0 50px 0 ${glow}`,
      }}
    >
      <div
        className="h-[3px] w-full"
        style={{
          background: `linear-gradient(90deg, ${accent}, ${accent}40)`,
        }}
      />

      <div className="p-6">
        <div className="mb-7">
          <div className="mb-3">
            <input
              type="text"
              value={block.subtitle}
              onChange={(e) => onUpdateBlock("subtitle", e.target.value)}
              className="text-[11px] font-bold tracking-[0.32em] uppercase outline-none bg-transparent placeholder:opacity-30 transition-colors"
              style={{
                color: accent,
                fontFamily: "'Barlow', sans-serif",
              }}
              placeholder="Subtítulo del bloque"
            />
          </div>

          <input
            type="text"
            value={block.title}
            onChange={(e) => onUpdateBlock("title", e.target.value)}
            className="w-full bg-transparent font-black tracking-[0.1em] outline-none leading-none pb-2 border-b transition-colors duration-200 placeholder:opacity-25"
            style={{
              color: accent,
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(2.8rem, 6vw, 3.8rem)",
              textShadow: `0 0 30px ${accent}25`,
              borderBottomColor: `${accent}25`,
            }}
            placeholder="TÍTULO DEL BLOQUE"
          />
        </div>

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
              color: `${accent}90`,
              background: `${accent}12`,
              fontFamily: "'Barlow Condensed', sans-serif",
            }}
          >
            {block.exercises.length}
          </span>
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
        </div>

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
              accent={accent}
              isFirst={idx === 0}
              isLast={idx === block.exercises.length - 1}
              onUpdate={(field, value) => onUpdateExercise(exercise.id, field, value)}
              onRemove={() => onRemoveExercise(exercise.id)}
              onMoveUp={() => onMoveExercise(exercise.id, "up")}
              onMoveDown={() => onMoveExercise(exercise.id, "down")}
            />
          ))}
        </div>

        <button
          onClick={onAddExercise}
          onMouseEnter={() => setAddHover(true)}
          onMouseLeave={() => setAddHover(false)}
          className="flex items-center gap-2 text-sm font-semibold py-2.5 px-4 rounded-xl cursor-pointer transition-all duration-200 whitespace-nowrap w-full justify-center sm:w-auto sm:justify-start"
          style={{
            color: accent,
            background: addHover ? `${accent}1a` : `${accent}0d`,
            border: `1px dashed ${accent}35`,
            fontFamily: "'Barlow', sans-serif",
          }}
        >
          <i className="ri-add-line text-base" />
          Añadir ejercicio
        </button>
      </div>
    </div>
  );
}
