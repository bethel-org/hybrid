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
  lastUpdated: "07:45",
  blocks: [
    {
      id: "local",
      title: "LOCAL",
      subtitle: "Tonificación",
      accent: "#00D9FF",
      glow: "rgba(0, 217, 255, 0.12)",
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
      footerNote:
        "Cada bloque completo se repite dos veces antes de pasar al siguiente",
    },
    {
      id: "strength",
      title: "FUERZA",
      subtitle: "Potencia",
      accent: "#FFB800",
      glow: "rgba(255, 184, 0, 0.12)",
      exercises: [
        { name: "Estocadas búlgaras c/peso" },
        { name: "Sentadilla c/barra" },
        { name: "Elevación cadera uni c/peso" },
        {
          name: "Bicho muerto c/peso + bicho muerto alternado",
        },
        { name: "Press militar uni posición estocadas" },
        { name: "Vuelos posteriores sentados + fondos tríceps" },
        { name: "Cuerda cross" },
        { name: "Zona media a elección" },
      ],
      footerNote: "Prioriza técnica y rangos completos",
    },
    {
      id: "aerobic",
      title: "AERÓBICA",
      subtitle: "AMRAP 10′",
      accent: "#FF2D78",
      glow: "rgba(255, 45, 120, 0.12)",
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
      footerNote:
        "Parte 1 y 2 en formato AMRAP dentro del tiempo de clase; pausa de 2′ entre ambas",
    },
  ] as WorkoutBlock[],
};
