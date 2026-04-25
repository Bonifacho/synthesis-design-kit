import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/syntesis/PhoneFrame";
import {
  Dashboard,
  RoleSwitcher,
  type SyntesisRole,
} from "@/components/syntesis/Dashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SÍNTESIS — Dashboard · Aprende, sintetiza, avanza" },
      {
        name: "description",
        content:
          "Dashboard inteligente multi-rol de SÍNTESIS: vistas dinámicas para estudiantes, docentes y practicantes con navegación móvil estilo iOS.",
      },
      { property: "og:title", content: "SÍNTESIS — Dashboard multi-rol" },
      {
        property: "og:description",
        content:
          "Plataforma educativa móvil con experiencias adaptadas por rol: estudiante, docente y practicante (solo lectura).",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [role, setRole] = useState<SyntesisRole>("estudiante");
  const [activeTab, setActiveTab] = useState<string>("home");

  const handleRoleChange = (next: SyntesisRole) => {
    setRole(next);
    // Reset a la primera pestaña del nuevo rol
    setActiveTab(next === "estudiante" ? "home" : "groups");
  };

  return (
    <div className="relative">
      <RoleSwitcher role={role} onChange={handleRoleChange} />
      <PhoneFrame>
        <Dashboard role={role} activeTab={activeTab} onTabChange={setActiveTab} />
      </PhoneFrame>
    </div>
  );
}
