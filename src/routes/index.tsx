import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/syntesis/PhoneFrame";
import { AuthScreen } from "@/components/syntesis/AuthScreen";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SÍNTESIS — Acceso · Aprende, sintetiza, avanza" },
      {
        name: "description",
        content:
          "SÍNTESIS es una plataforma educativa móvil (LMS) para estudiantes, docentes y practicantes. Inicia sesión o regístrate para comenzar.",
      },
      { property: "og:title", content: "SÍNTESIS — Plataforma educativa móvil" },
      {
        property: "og:description",
        content:
          "Sistema integral tecnológico para la enseñanza y el seguimiento interactivo secuencial.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PhoneFrame>
      <AuthScreen />
    </PhoneFrame>
  );
}
