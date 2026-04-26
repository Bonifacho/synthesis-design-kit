import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { PhoneFrame } from "@/components/syntesis/PhoneFrame";
import {
  Dashboard,
  RoleSwitcher,
  type SyntesisRole,
} from "@/components/syntesis/Dashboard";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "SÍNTESIS — Dashboard multi-rol" },
      {
        name: "description",
        content:
          "Dashboard inteligente de SÍNTESIS: vistas dinámicas para estudiantes, docentes y practicantes con navegación móvil estilo iOS.",
      },
      { property: "og:title", content: "SÍNTESIS — Dashboard multi-rol" },
      {
        property: "og:description",
        content:
          "Plataforma educativa móvil con experiencias adaptadas por rol: estudiante, docente y practicante (solo lectura).",
      },
    ],
  }),
  component: DashboardRoute,
});

function DashboardRoute() {
  const [role, setRole] = useState<SyntesisRole>("estudiante");
  const [activeTab, setActiveTab] = useState<string>("home");

  const handleRoleChange = (next: SyntesisRole) => {
    setRole(next);
    setActiveTab(next === "estudiante" ? "home" : "groups");
  };

  return (
    <div className="relative">
      <RoleSwitcher role={role} onChange={handleRoleChange} />

      {/* Acceso de regreso a /login (DEV) */}
      <div className="absolute right-4 top-3 z-[60] hidden sm:block">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 rounded-full border border-overlay bg-surface-elevated/90 px-3 py-1.5 text-[11px] font-semibold text-slate shadow-md3-2 backdrop-blur transition-colors hover:text-navy"
        >
          <LogOut className="h-3 w-3" />
          Salir
        </Link>
      </div>

      <PhoneFrame>
        <Dashboard role={role} activeTab={activeTab} onTabChange={setActiveTab} />
      </PhoneFrame>
    </div>
  );
}
