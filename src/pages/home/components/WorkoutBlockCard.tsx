import type { WorkoutBlock } from "../../../mocks/workout";

interface WorkoutBlockCardProps {
  block: WorkoutBlock;
  index: number;
}

export default function WorkoutBlockCard({
  block,
  index,
}: WorkoutBlockCardProps) {
  const animationDelay = `${index * 120}ms`;

  return (
    <div
      className="flex flex-col flex-1 rounded-[1vw] p-[1.1vw] relative overflow-hidden min-h-0"
      style={{
        background: "linear-gradient(160deg, #141414 0%, #0f0f0f 100%)",
        border: `1px solid rgba(255,255,255,0.05)`,
        boxShadow: `0 0 4vw 0 ${block.glow}, 0 0.1vw 2vw rgba(0,0,0,0.6)`,
        animationDelay,
      }}
    >
      {/* Corner glow accent */}
      <div
        className="absolute top-0 right-0 w-[12vw] h-[12vw] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${block.accent}40 0%, transparent 70%)`,
          transform: "translate(30%, -30%)",
        }}
      />

      {/* Block header */}
      <div className="mb-[1.2vh] shrink-0">
        {/* Badge / Subtitle */}
        {block.subtitle && (
          <div className="mb-[0.6vh]">
            <span
              className="inline-block text-[0.9vw] font-bold tracking-[0.3em] uppercase px-[0.6vw] py-[0.3vh] rounded-full"
              style={{
                color: block.accent,
                background: `${block.accent}18`,
                border: `1px solid ${block.accent}30`,
                fontFamily: "'Barlow', sans-serif",
              }}
            >
              {block.subtitle}
            </span>
          </div>
        )}

        {/* Block Title */}
        <h2
          className="text-[3.5vw] font-black tracking-[0.12em] leading-none mb-[0.6vh]"
          style={{
            color: block.accent,
            fontFamily: "'Barlow Condensed', sans-serif",
            textShadow: `0 0 3vw ${block.accent}40`,
          }}
        >
          {block.title}
        </h2>

        {/* Accent underline */}
        <div className="flex items-center gap-[0.3vw]">
          <div
            className="h-[1px] w-[4vw] rounded-full"
            style={{
              background: `linear-gradient(90deg, ${block.accent}, transparent)`,
            }}
          />
          <div
            className="h-[1px] w-[1vw] rounded-full opacity-40"
            style={{ backgroundColor: block.accent }}
          />
        </div>
      </div>

      {/* Exercise List */}
      <div className="flex flex-col gap-0 flex-1 min-h-0">
        {block.exercises.map((exercise, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-[0.7vh] group"
            style={{
              borderBottom:
                i < block.exercises.length - 1
                  ? "1px solid rgba(255,255,255,0.05)"
                  : "none",
            }}
          >
            {/* Index dot + Exercise name */}
            <div className="flex items-center gap-[0.4vw]">
              <span
                className="text-[1.2vw] font-bold tabular-nums w-[1.5vw] text-right select-none"
                style={{
                  color: `${block.accent}`,
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="text-[1.4vw] font-semibold tracking-wide leading-tight text-zinc-100"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                {exercise.name}
              </span>
            </div>

            {/* Detail / reps */}
            {exercise.detail && (
              <span
                className="text-[1.4vw] font-bold tracking-widest whitespace-nowrap ml-[0.5vw]"
                style={{
                  color: block.accent,
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}
              >
                {exercise.detail}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Footer note */}
      {/* {block.footerNote && (
        <div
          className="mt-[1vh] pt-[0.8vh] shrink-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p
            className="text-[0.85vw] font-light tracking-wide italic"
            style={{ color: "rgba(160,160,160,0.7)", fontFamily: "'Barlow', sans-serif" }}
          >
            {block.footerNote}
          </p>
        </div>
      )} */}
    </div>
  );
}
