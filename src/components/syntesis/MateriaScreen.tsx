import { useState } from "react";
import {
  BookOpen,
  ChevronLeft,
  CheckCircle2,
  FileText,
  Link as LinkIcon,
  Lock,
  PlayCircle,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────────────
 * Tipos — Estructura curricular: Unidades → OVAs
 * ────────────────────────────────────────────────────────────────────────── */
type OvaKind = "reader" | "exam" | "video" | "simulator";

interface Ova {
  id: string;
  kind: OvaKind;
  title: string;
  meta?: string;
  isExam?: boolean;
}

interface Unidad {
  id: string;
  index: number;
  title: string;
  description: string;
  unlocked: boolean;
  unlockHint?: string;
  ovas: Ova[];
}

/* ──────────────────────────────────────────────────────────────────────────
 * Datos demo — Química 10°A (JSON estático)
 * ────────────────────────────────────────────────────────────────────────── */
const UNIDADES: Unidad[] = [
  {
    id: "u1",
    index: 1,
    title: "Tabla Periódica",
    description: "Estructura, grupos y propiedades periódicas.",
    unlocked: true,
    ovas: [
      {
        id: "u1-ova1",
        kind: "reader",
        title: "Grupos y Periodos",
        meta: "Lectura · 12 min",
      },
      {
        id: "u1-ova2",
        kind: "exam",
        title: "Evaluación: Tabla Periódica",
        meta: "10 preguntas · 30 min",
        isExam: true,
      },
    ],
  },
  {
    id: "u2",
    index: 2,
    title: "Enlace Químico",
    description: "Enlaces iónicos, covalentes y metálicos.",
    unlocked: false,
    unlockHint: "Aprueba la evaluación de la Unidad 1 para desbloquear.",
    ovas: [
      {
        id: "u2-ova1",
        kind: "video",
        title: "Tipos de Enlace",
        meta: "Video · 8 min",
      },
      {
        id: "u2-ova2",
        kind: "simulator",
        title: "Laboratorio PhET",
        meta: "Simulador interactivo",
      },
    ],
  },
];

/* ──────────────────────────────────────────────────────────────────────────
 * Helpers — íconos por tipo de OVA
 * ────────────────────────────────────────────────────────────────────────── */
const OVA_ICON: Record<OvaKind, typeof BookOpen> = {
  reader: BookOpen,
  exam: FileText,
  video: PlayCircle,
  simulator: LinkIcon,
};

const OVA_LABEL: Record<OvaKind, string> = {
  reader: "Lectura",
  exam: "Evaluación",
  video: "Video",
  simulator: "Simulador",
};

/* ──────────────────────────────────────────────────────────────────────────
 * TopHeader — back + título centrado
 * ────────────────────────────────────────────────────────────────────────── */
function MateriaHeader({ subject }: { subject: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-overlay/70 bg-background/95 px-2 pb-3 pt-1 backdrop-blur">
      <div className="relative flex h-11 items-center justify-center">
        <Link
          to="/dashboard"
          aria-label="Volver al dashboard"
          className="absolute left-1 inline-flex items-center gap-0.5 rounded-full px-2 py-1.5 text-[14px] font-semibold text-indigo transition-colors hover:bg-indigo/10"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={2.6} />
          Volver
        </Link>
        <h1 className="text-[16px] font-bold tracking-tight text-navy">{subject}</h1>
      </div>
    </header>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * UnidadHeader — título de la unidad + chip de estado
 * ────────────────────────────────────────────────────────────────────────── */
function UnidadHeader({ unidad }: { unidad: Unidad }) {
  return (
    <div className="flex items-start justify-between gap-3 px-1">
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate">
          Unidad {unidad.index}
        </p>
        <h2 className="mt-0.5 text-[15px] font-bold leading-tight text-navy">
          {unidad.title}
        </h2>
        <p className="mt-0.5 text-[12px] text-slate">{unidad.description}</p>
      </div>
      {unidad.unlocked ? (
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald">
          <CheckCircle2 className="h-3 w-3" />
          Activa
        </span>
      ) : (
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-slate/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate">
          <Lock className="h-3 w-3" />
          Bloqueada
        </span>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * OvaCardContent — interior reusable (ícono + textos + candado)
 * ────────────────────────────────────────────────────────────────────────── */
function OvaCardContent({ ova, locked }: { ova: Ova; locked: boolean }) {
  const Icon = OVA_ICON[ova.kind];
  const isExam = ova.isExam;
  return (
    <>
      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
          locked
            ? "bg-slate/15 text-slate"
            : isExam
              ? "bg-amber/15 text-amber"
              : "bg-indigo/10 text-indigo",
        )}
      >
        <Icon className="h-[20px] w-[20px]" strokeWidth={2.2} />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate">
            {OVA_LABEL[ova.kind]}
          </p>
          {isExam && (
            <span className="inline-flex items-center rounded-full bg-amber px-2 py-[2px] text-[9px] font-bold uppercase tracking-wider text-amber-foreground shadow-amber-glow">
              Examen
            </span>
          )}
        </div>
        <h3 className="mt-0.5 truncate text-[14px] font-semibold text-navy">{ova.title}</h3>
        {ova.meta && <p className="mt-0.5 truncate text-[11px] text-slate">{ova.meta}</p>}
      </div>

      {locked && (
        <span
          aria-label="Contenido bloqueado"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate/15 text-slate"
        >
          <Lock className="h-[14px] w-[14px]" strokeWidth={2.4} />
        </span>
      )}
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * OvaCard — tarjeta MD3. Si es examen y está desbloqueada → Link a /examen.
 * ────────────────────────────────────────────────────────────────────────── */
function OvaCard({ ova, locked }: { ova: Ova; locked: boolean }) {
  const baseClasses = cn(
    "group relative flex items-center gap-3 rounded-2xl bg-surface-elevated p-3.5 shadow-md3-1 transition-shadow",
    locked
      ? "pointer-events-none opacity-50"
      : "hover:shadow-md3-2 active:scale-[0.99]",
  );

  if (ova.isExam && !locked) {
    return (
      <Link to="/examen" className={baseClasses}>
        <OvaCardContent ova={ova} locked={locked} />
      </Link>
    );
  }

  return (
    <article aria-disabled={locked} className={baseClasses}>
      <OvaCardContent ova={ova} locked={locked} />
    </article>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * UnidadSection — agrupa header + tarjetas + hint cuando bloqueada
 * ────────────────────────────────────────────────────────────────────────── */
function UnidadSection({ unidad }: { unidad: Unidad }) {
  const locked = !unidad.unlocked;

  return (
    <section className="space-y-3">
      <UnidadHeader unidad={unidad} />

      {locked && unidad.unlockHint && (
        <div className="flex items-start gap-2 rounded-2xl border border-dashed border-slate/30 bg-slate-blue/60 p-3">
          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-slate" />
          <p className="text-[12px] leading-snug text-slate">{unidad.unlockHint}</p>
        </div>
      )}

      <div className="space-y-2.5">
        {unidad.ovas.map((ova) => (
          <OvaCard key={ova.id} ova={ova} locked={locked} />
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * MateriaScreen — pantalla principal
 * ────────────────────────────────────────────────────────────────────────── */
export interface MateriaScreenProps {
  subject?: string;
}

export function MateriaScreen({ subject = "Química 10°A" }: MateriaScreenProps) {
  const [unidades] = useState<Unidad[]>(UNIDADES);

  return (
    <div className="flex h-full flex-col bg-background">
      <MateriaHeader subject={subject} />
      <div className="flex-1 space-y-6 overflow-y-auto px-4 pb-8 pt-4">
        {unidades.map((unidad) => (
          <UnidadSection key={unidad.id} unidad={unidad} />
        ))}
      </div>
    </div>
  );
}
