import { useState } from "react";
import type { EditableExercise } from "../hooks/useWorkoutEditor";

interface ExerciseRowProps {
  exercise: EditableExercise;
  index: number;
  accent: string;
  isFirst: boolean;
  isLast: boolean;
  onUpdate: (field: "name" | "detail", value: string) => void;
  onRemove: () => void;
  // onMoveUp: () => void;
  // onMoveDown: () => void;
}

export default function ExerciseRow({
  exercise,
  index,
  accent,
  isFirst,
  isLast,
  onUpdate,
  onRemove,
  // onMoveUp,
  // onMoveDown,
}: ExerciseRowProps) {
  const [deleteHover, setDeleteHover] = useState(false);

  return (
    <div
      className="group flex items-center gap-2 sm:gap-3 py-3.5"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.045)" }}
    >
      {/* Index */}
      <span
        className="text-xs font-bold w-5 text-right flex-shrink-0 select-none tabular-nums"
        style={{
          color: `${accent}55`,
          fontFamily: "'Barlow Condensed', sans-serif",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Exercise name input */}
      <input
        type="text"
        value={exercise.name}
        onChange={(e) => onUpdate("name", e.target.value)}
        className="flex-1 min-w-0 bg-transparent text-[15px] font-semibold text-zinc-100 outline-none placeholder:text-zinc-700 transition-colors"
        style={{ fontFamily: "'Barlow', sans-serif" }}
        placeholder="Nombre del ejercicio"
      />

      {/* Detail input */}
      <input
        type="text"
        value={exercise.detail}
        onChange={(e) => onUpdate("detail", e.target.value)}
        className="w-24 sm:w-28 flex-shrink-0 bg-transparent text-sm font-bold text-right outline-none placeholder:text-zinc-700 transition-colors"
        style={{
          color: accent,
          fontFamily: "'Barlow Condensed', sans-serif",
          letterSpacing: "0.05em",
        }}
        placeholder="3×10"
      />

      {/* Actions — visible on group hover or focus-within */}
      <div className="flex items-center gap-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-150">
        {/* <button
          onClick={onMoveUp}
          disabled={isFirst}
          title="Mover arriba"
          className="w-7 h-7 flex items-center justify-center rounded-md cursor-pointer transition-colors duration-150 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/5"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          <i className="ri-arrow-up-s-line text-sm" />
        </button>
        <button
          onClick={onMoveDown}
          disabled={isLast}
          title="Mover abajo"
          className="w-7 h-7 flex items-center justify-center rounded-md cursor-pointer transition-colors duration-150 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/5"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          <i className="ri-arrow-down-s-line text-sm" />
        </button> */}
        <button
          onClick={onRemove}
          onMouseEnter={() => setDeleteHover(true)}
          onMouseLeave={() => setDeleteHover(false)}
          title="Eliminar ejercicio"
          className="w-7 h-7 flex items-center justify-center rounded-md cursor-pointer transition-colors duration-150 hover:bg-red-500/10"
          style={{ color: deleteHover ? "#f87171" : "rgba(255,255,255,0.25)" }}
        >
          <i className="ri-delete-bin-line text-sm" />
        </button>
      </div>
    </div>
  );
}
