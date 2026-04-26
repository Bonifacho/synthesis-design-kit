import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/syntesis/PhoneFrame";
import { MateriaScreen } from "@/components/syntesis/MateriaScreen";

export const Route = createFileRoute("/materia")({
  head: () => ({
    meta: [
      { title: "SÍNTESIS — Química 10°A · Unidades y OVAs" },
      {
        name: "description",
        content:
          "Vista de materia en SÍNTESIS: unidades curriculares con OVAs (lecturas, evaluaciones, videos y simuladores) y candados digitales por progreso.",
      },
      { property: "og:title", content: "SÍNTESIS — Química 10°A" },
      {
        property: "og:description",
        content:
          "Estudia por unidades, presenta evaluaciones y desbloquea contenido avanzado a tu ritmo.",
      },
    ],
  }),
  component: MateriaRoute,
});

function MateriaRoute() {
  return (
    <PhoneFrame>
      <MateriaScreen subject="Química 10°A" />
    </PhoneFrame>
  );
}
