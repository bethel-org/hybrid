interface SessionInfoCardProps {
  sessionTitle: string;
  lastUpdated: string;
  onUpdateSession: (field: "sessionTitle" | "lastUpdated", value: string) => void;
}

export default function SessionInfoCard({
  sessionTitle,
  lastUpdated,
  onUpdateSession,
}: SessionInfoCardProps) {
  return (
    <div
      className="rounded-2xl p-6 mb-5"
      style={{
        background: "#0f0f0f",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex items-center gap-2 mb-6">
        <i className="ri-file-edit-line text-zinc-600 text-sm" />
        <span
          className="text-xs font-semibold tracking-[0.28em] uppercase text-zinc-600"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          Información de la Sesión
        </span>
      </div>

      <div className="mb-6">
        <label
          className="block text-xs font-medium tracking-[0.25em] uppercase text-zinc-700 mb-2"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          Título de sesión
        </label>
        <input
          type="text"
          value={sessionTitle}
          onChange={(e) => onUpdateSession("sessionTitle", e.target.value)}
          className="w-full bg-transparent text-[2.8rem] font-black tracking-[0.22em] text-white border-b border-zinc-800 focus:border-zinc-500 outline-none pb-1 transition-colors duration-200 leading-tight"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          placeholder="HYBRID"
        />
      </div>

      <div>
        <label
          className="block text-xs font-medium tracking-[0.25em] uppercase text-zinc-700 mb-2"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          Última actualización
        </label>
        <input
          type="text"
          value={lastUpdated}
          onChange={(e) => onUpdateSession("lastUpdated", e.target.value)}
          className="w-full max-w-xs bg-transparent text-sm font-medium text-zinc-300 border-b border-zinc-800 focus:border-zinc-500 outline-none pb-2 transition-colors duration-200"
          style={{ fontFamily: "'Barlow', sans-serif" }}
          placeholder="Ej. 07:45"
        />
        <p
          className="mt-2 text-[11px] font-light text-zinc-600 tracking-wide"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          Mismo campo que enviará el backend (hora o timestamp legible en pantalla).
        </p>
      </div>
    </div>
  );
}
