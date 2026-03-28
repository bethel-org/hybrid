/**
 * Contrato alineado con el backend: solo estos campos vendrán del API.
 * Los colores (accent / glow) se resuelven en el cliente según el índice del bloque.
 */

export interface WorkoutExercise {
  name: string;
  detail?: string;
}

export interface WorkoutBlock {
  title: string;
  subtitle?: string;
  exercises: WorkoutExercise[];
}

export interface WorkoutSession {
  sessionTitle: string;
  lastUpdated: string;
  blocks: WorkoutBlock[];
}

/** Tema visual por columna (LOCAL → FUERZA → AERÓBICA); se repite si hay más de 3 bloques. */
export const BLOCK_DISPLAY_THEMES = [
  { accent: "#00D9FF", glow: "rgba(0, 217, 255, 0.12)" },
  { accent: "#FFB800", glow: "rgba(255, 184, 0, 0.12)" },
  { accent: "#FF2D78", glow: "rgba(255, 45, 120, 0.12)" },
] as const;

export type WorkoutBlockForDisplay = WorkoutBlock & {
  accent: string;
  glow: string;
};

export function workoutBlockForDisplay(
  block: WorkoutBlock,
  index: number,
): WorkoutBlockForDisplay {
  const theme = BLOCK_DISPLAY_THEMES[index % BLOCK_DISPLAY_THEMES.length];
  return { ...block, accent: theme.accent, glow: theme.glow };
}

export function workoutSessionBlocksForDisplay(
  session: WorkoutSession,
): WorkoutBlockForDisplay[] {
  return session.blocks.map(workoutBlockForDisplay);
}

/** Mock con la misma forma que la respuesta del servidor */
export const workoutData: WorkoutSession = {
  sessionTitle: "HYBRID",
  lastUpdated: "07:45",
  blocks: [
    {
      title: "LOCAL",
      subtitle: "3 circuitos × 2",
      exercises: [
        { name: "Sentadilla común", detail: "1′" },
        { name: "Sentadilla abierta", detail: "1′" },
        { name: "Sentadilla cerrada", detail: "1′" },
        { name: "Sentadilla común c/salto", detail: "30″" },
        { name: "Sentadilla abierta c/salto", detail: "30″" },
        { name: "Sentadilla cerrada c/salto", detail: "30″" },
        { name: "Manguito rotador", detail: "30″" },
        { name: "Bíceps alternados", detail: "1′" },
        { name: "Vuelos laterales alternados", detail: "1′" },
        { name: "Bíceps martillo", detail: "30″" },
        { name: "Abdominales piernas estiradas arriba", detail: "45″" },
        { name: "Toco talones", detail: "45″" },
        { name: "Rodilla al pecho", detail: "45″" },
        { name: "Ravieta", detail: "45″" },
      ],
    },
    {
      title: "FUERZA",
      subtitle: "Estación principal",
      exercises: [
        { name: "Estocadas búlgaras c/peso" },
        { name: "Sentadilla c/barra" },
        { name: "Elevación cadera uni c/peso" },
        { name: "Bicho muerto c/peso + bicho muerto alternado" },
        { name: "Press militar uni posición estocadas" },
        { name: "Vuelos posteriores sentados + fondos tríceps" },
        { name: "Cuerda cross" },
        { name: "Zona media a elección" },
      ],
    },
    {
      title: "AERÓBICA",
      subtitle: "AMRAP 10′",
      exercises: [
        { name: "Sentadilla c/salto", detail: "× 20" },
        { name: "Swing", detail: "× 15" },
        { name: "Toco punta", detail: "× 10" },
        { name: "Burpees", detail: "× 5" },
        { name: "Pausa", detail: "2′" },
        { name: "Escaladores", detail: "× 20" },
        { name: "Subidas al cajón", detail: "× 15" },
        { name: "Toco hombro", detail: "× 10" },
        { name: "Flexiones", detail: "× 5" },
      ],
    },
  ],
};
