import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/syntesis/PhoneFrame";
import { ExamScreen } from "@/components/syntesis/ExamScreen";

export const Route = createFileRoute("/examen")({
  head: () => ({
    meta: [
      { title: "SÍNTESIS — Evaluación: Tabla Periódica" },
      {
        name: "description",
        content:
          "Motor de evaluación interactivo de SÍNTESIS con preguntas paso a paso, selección visual y envío al finalizar.",
      },
      { property: "og:title", content: "SÍNTESIS — Evaluación interactiva" },
      {
        property: "og:description",
        content: "Resuelve la evaluación de la unidad y recibe retroalimentación inmediata.",
      },
    ],
  }),
  component: ExamenRoute,
});

function ExamenRoute() {
  return (
    <PhoneFrame>
      <ExamScreen />
    </PhoneFrame>
  );
}
