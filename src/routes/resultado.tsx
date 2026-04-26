import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/syntesis/PhoneFrame";
import { ResultScreen } from "@/components/syntesis/ResultScreen";

export const Route = createFileRoute("/resultado")({
  head: () => ({
    meta: [
      { title: "SÍNTESIS — Resultado de la evaluación" },
      {
        name: "description",
        content:
          "Retroalimentación inmediata de la evaluación: puntaje, desglose de respuestas y siguiente acción.",
      },
      { property: "og:title", content: "SÍNTESIS — Resultado" },
      {
        property: "og:description",
        content: "Consulta tu puntaje y el desglose de respuestas correctas e incorrectas.",
      },
    ],
  }),
  component: ResultadoRoute,
});

function ResultadoRoute() {
  return (
    <PhoneFrame>
      <ResultScreen />
    </PhoneFrame>
  );
}
