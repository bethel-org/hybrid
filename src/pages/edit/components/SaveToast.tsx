import { Link } from "react-router-dom";

interface SaveToastProps {
  visible: boolean;
}

export default function SaveToast({ visible }: SaveToastProps) {
  return (
    <div
      className="fixed bottom-8 left-1/2 z-50 flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-500"
      style={{
        transform: `translateX(-50%) translateY(${visible ? "0px" : "80px"})`,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        background: "#111111",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)",
        minWidth: "280px",
      }}
    >
      {/* Check icon */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(52, 211, 153, 0.15)" }}
      >
        <i className="ri-check-line text-emerald-400 text-base" />
      </div>

      {/* Text */}
      <div className="flex-1">
        <p
          className="text-sm font-semibold text-white leading-tight"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          Cambios guardados
        </p>
        <p
          className="text-xs text-zinc-600 mt-0.5"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          La pantalla se actualizará con los nuevos datos
        </p>
      </div>

      {/* View link */}
      <Link
        to="/"
        className="flex items-center gap-1.5 text-xs font-semibold tracking-wide cursor-pointer whitespace-nowrap px-3 py-1.5 rounded-full transition-colors"
        style={{
          color: "rgba(255,255,255,0.55)",
          border: "1px solid rgba(255,255,255,0.1)",
          fontFamily: "'Barlow', sans-serif",
        }}
      >
        <i className="ri-tv-2-line text-sm" />
        Ver pantalla
      </Link>
    </div>
  );
}
