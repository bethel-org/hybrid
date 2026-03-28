import { Link } from "react-router-dom";

interface EditHeaderProps {
  onSave: () => void;
  isDirty: boolean;
}

export default function EditHeader({ onSave, isDirty }: EditHeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between px-5 sm:px-8 py-4"
      style={{
        background: "rgba(5,5,5,0.96)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Left: brand identity */}
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <span
            className="text-white text-sm font-black leading-none"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            H
          </span>
        </div>
        <span
          className="text-white font-black tracking-[0.22em] text-lg hidden sm:block"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          HYBRID
        </span>
        <span
          className="text-xs font-bold tracking-[0.22em] uppercase px-3 py-1 rounded-full"
          style={{
            color: "rgba(255,255,255,0.4)",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.09)",
            fontFamily: "'Barlow', sans-serif",
          }}
        >
          MODO EDICIÓN
        </span>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-sm font-medium tracking-wide cursor-pointer whitespace-nowrap transition-all duration-200"
          style={{
            color: "rgba(255,255,255,0.38)",
            border: "1px solid rgba(255,255,255,0.08)",
            fontFamily: "'Barlow', sans-serif",
          }}
        >
          <i className="ri-tv-2-line text-base" />
          <span className="hidden sm:inline">Vista Previa</span>
        </Link>

        <button
          onClick={onSave}
          className="flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full text-sm font-bold tracking-wide cursor-pointer whitespace-nowrap transition-all duration-300"
          style={{
            background: isDirty ? "#ffffff" : "rgba(255,255,255,0.07)",
            color: isDirty ? "#000000" : "rgba(255,255,255,0.22)",
            fontFamily: "'Barlow', sans-serif",
            boxShadow: isDirty ? "0 0 24px rgba(255,255,255,0.15)" : "none",
          }}
        >
          <i className={`ri-save-3-line text-base ${isDirty ? "text-black" : ""}`} />
          <span>Guardar</span>
        </button>
      </div>
    </header>
  );
}
