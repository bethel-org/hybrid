export interface Exercise {
  name: string;
  detail?: string;
  note?: string;
}

export interface WorkoutBlock {
  id: string;
  title: string;
  subtitle?: string;
  accent: string;
  glow: string;
  exercises: Exercise[];
  footerNote?: string;
}

export const workoutData = {
  sessionTitle: "HYBRID",
  className: "Poder Matutino — Semana 12 / Día 3",
  coach: "Entrenador Alex Rivera",
  lastUpdated: "07:45",
  date: "MIÉ 18 MAR 2026",
  blocks: [
    {
      id: "local",
      title: "LOCAL",
      subtitle: "Tonificación",
      accent: "#00D9FF",
      glow: "rgba(0, 217, 255, 0.12)",
      exercises: [
        { name: "Estiramiento de Cadera 90/90", detail: "2 × 60s cada lado" },
        { name: "Almejas con Banda Elástica", detail: "3 × 15 reps" },
        { name: "Bicho Muerto", detail: "3 × 10 reps" },
        { name: "Rotación Torácica", detail: "2 × 8 reps" },
        { name: "Círculos de Tobillo", detail: "2 × 20 reps" },
        { name: "Puentes de Glúteos", detail: "3 × 20 reps" },
      ],
      footerNote:
        "Enfócate en la respiración controlada durante todo el ejercicio",
    },
    {
      id: "strength",
      title: "FUERZA",
      subtitle: "Potencia",
      accent: "#FFB800",
      glow: "rgba(255, 184, 0, 0.12)",
      exercises: [
        { name: "Sentadilla con Barra", detail: "5 × 5 @ 80%" },
        { name: "Peso Muerto Rumano", detail: "4 × 8 reps" },
        { name: "Press con Mancuernas", detail: "4 × 10 reps" },
        { name: "Remo Inclinado con Barra", detail: "4 × 10 reps" },
        { name: "Sentadilla Goblet", detail: "3 × 15 reps" },
        { name: "Cargada del Granjero", detail: "3 × 40m" },
      ],
      footerNote: "Descansa 90s entre series — prioriza la técnica",
    },
    {
      id: "aerobic",
      title: "AERÓBICO",
      subtitle: "AMRAP",
      accent: "#FF2D78",
      glow: "rgba(255, 45, 120, 0.12)",
      exercises: [
        { name: "Remo en Máquina", detail: "Min 1 → 250m Esprint" },
        { name: "Saltos al Cajón", detail: "Min 2 → 12 reps" },
        { name: "Balanceos con Pesa Rusa", detail: "Min 3 → 20 reps" },
        { name: "Cuerdas de Batalla", detail: "Min 4 → 30s máx" },
        { name: "Bicicleta de Asalto", detail: "Min 5 → 15 cals" },
        { name: "Burpee con Salto Largo", detail: "× 5 reps + descanso" },
      ],
      footerNote: "Mantén el ritmo — RPE 7–8 durante toda la sesión",
    },
  ] as WorkoutBlock[],
};
