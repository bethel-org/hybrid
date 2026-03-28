import { Link } from "react-router-dom";
import {
  workoutData,
  workoutSessionBlocksForDisplay,
} from "../../mocks/workout";
import HybridHeader from "./components/HybridHeader";
import WorkoutBlockCard from "./components/WorkoutBlockCard";

export default function Home() {
  const { sessionTitle, lastUpdated, blocks } = workoutData;
  const displayBlocks = workoutSessionBlocksForDisplay(workoutData);
  const exerciseCount = blocks.reduce((n, b) => n + b.exercises.length, 0);

  return (
    <div
      className="h-screen w-full flex flex-col overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #111111 0%, #080808 55%, #000000 100%)",
        fontFamily: "'Barlow', sans-serif",
      }}
    >
      {/* Subtle top texture line */}
      <div
        className="w-full h-px shrink-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent 100%)",
        }}
      />

      {/* Header */}
      <section className="shrink-0">
        <HybridHeader sessionTitle={sessionTitle} />
      </section>

      {/* 3-Column Workout Blocks */}
      <main className="flex-1 flex flex-col px-[2vw] pb-[1vh] min-h-0">
        {/* Section label row */}
        <div className="flex items-center gap-[0.5vw] mb-[1vh] px-[0.2vw] shrink-0">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-[0.85vw] font-light tracking-[0.4em] uppercase text-zinc-600">
            Sesión de Hoy
          </span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        {/* Blocks grid */}
        <section
          aria-label="LOCAL"
          className="flex-1 grid grid-cols-3 gap-[1vw] min-h-0"
        >
          {displayBlocks.map((block, index) => (
            <WorkoutBlockCard
              key={`${block.title}-${index}`}
              block={block}
              index={index}
            />
          ))}
        </section>
      </main>

      {/* Footer strip */}
      <footer className="flex items-center justify-between px-[2vw] py-[0.8vh] shrink-0">
        <div className="flex items-center gap-[0.3vw]">
          <div
            className="w-[1.3vw] h-[1.3vw] rounded-full flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span
              className="text-white text-[0.55vw] font-black"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              H
            </span>
          </div>
          <span className="text-[0.7vw] font-light tracking-[0.3em] uppercase text-zinc-700">
            Sistema de Visualización Hybrid
          </span>
        </div>

        <div className="flex items-center gap-[1vw]">
          <span className="text-[0.7vw] font-light tracking-wider text-zinc-700">
            {blocks.length} bloques &nbsp;·&nbsp; {exerciseCount} ítems
            &nbsp;·&nbsp; actualizado {lastUpdated}
          </span>
          <Link
            to="/edit"
            className="flex items-center gap-[0.4vw] text-[0.7vw] font-medium tracking-[0.15em] uppercase px-[0.8vw] py-[0.4vh] rounded-full cursor-pointer whitespace-nowrap transition-all duration-200"
            style={{
              color: "rgba(255,255,255,0.35)",
              border: "1px solid rgba(255,255,255,0.1)",
              fontFamily: "'Barlow', sans-serif",
            }}
          >
            <i className="ri-edit-2-line text-[0.7vw]" />
            Editar
          </Link>
          <span className="text-[0.7vw] font-light tracking-wider text-zinc-700">
            Modo Vista
          </span>
        </div>
      </footer>
    </div>
  );
}
