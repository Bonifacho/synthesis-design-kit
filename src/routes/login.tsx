import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AuthScreen } from "@/components/syntesis/AuthScreen";
import { PhoneFrame } from "@/components/syntesis/PhoneFrame";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "SÍNTESIS — Iniciar sesión · Aprende, sintetiza, avanza" },
      {
        name: "description",
        content:
          "Accede a SÍNTESIS: plataforma educativa móvil para estudiantes, docentes y practicantes. Inicia sesión o regístrate.",
      },
      { property: "og:title", content: "SÍNTESIS — Iniciar sesión" },
      {
        property: "og:description",
        content:
          "Inicio de sesión y registro en SÍNTESIS, la app educativa mobile-first con experiencias por rol.",
      },
    ],
  }),
  component: LoginRoute,
});

function LoginRoute() {
  return (
    <div className="relative">
      {/* Switch DEV — acceso directo al dashboard sin tocar AuthScreen */}
      <div className="absolute left-1/2 top-3 z-[60] hidden -translate-x-1/2 sm:block">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 rounded-full border border-overlay bg-surface-elevated/90 px-3 py-1.5 text-[11px] font-semibold text-navy shadow-md3-2 backdrop-blur transition-colors hover:text-indigo"
        >
          DEV · Saltar al Dashboard
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <PhoneFrame>
        <AuthScreen />
      </PhoneFrame>
    </div>
  );
}
