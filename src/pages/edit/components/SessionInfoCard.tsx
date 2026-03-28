interface SessionInfoCardProps {
  sessionTitle: string;
  className: string;
  coach: string;
  onUpdateSession: (field: "sessionTitle" | "className" | "coach", value: string) => void;
}

export default function SessionInfoCard({
  sessionTitle,
  className,
  coach,
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
      {/* Card label */}
      <div className="flex items-center gap-2 mb-6">
        <i className="ri-file-edit-line text-zinc-600 text-sm" />
        <span
          className="text-xs font-semibold tracking-[0.28em] uppercase text-zinc-600"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          Información de la Sesión
        </span>
      </div>

      {/* Session title — large */}
      <div className="mb-6">
        <label
          className="block text-xs font-medium tracking-[0.25em] uppercase text-zinc-700 mb-2"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          Título
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

      {/* Class name + Coach — two columns on sm+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            className="block text-xs font-medium tracking-[0.25em] uppercase text-zinc-700 mb-2"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Nombre de Clase
          </label>
          <input
            type="text"
            value={className}
            onChange={(e) => onUpdateSession("className", e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-zinc-300 border-b border-zinc-800 focus:border-zinc-500 outline-none pb-2 transition-colors duration-200"
            style={{ fontFamily: "'Barlow', sans-serif" }}
            placeholder="Ej. Poder Matutino — Semana 12"
          />
        </div>
        <div>
          <label
            className="block text-xs font-medium tracking-[0.25em] uppercase text-zinc-700 mb-2"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Entrenador
          </label>
          <input
            type="text"
            value={coach}
            onChange={(e) => onUpdateSession("coach", e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-zinc-300 border-b border-zinc-800 focus:border-zinc-500 outline-none pb-2 transition-colors duration-200"
            style={{ fontFamily: "'Barlow', sans-serif" }}
            placeholder="Nombre del entrenador"
          />
        </div>
      </div>
    </div>
  );
}
