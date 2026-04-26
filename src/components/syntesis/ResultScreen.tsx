import { CheckCircle2, XCircle, X as XIcon, ListChecks } from "lucide-react";
import { Link } from "@tanstack/react-router";

/* ──────────────────────────────────────────────────────────────────────────
 * ResultScreen — Estado simulado: REPROBADO (0 / 100)
 * En producción real, el puntaje viene del backend (Zero Trust: la
 * corrección y la calificación viven server-side).
 * ────────────────────────────────────────────────────────────────────────── */
const SCORE = 0;
const TOTAL = 100;
const CORRECT = 0;
const INCORRECT = 2;
const TOTAL_QUESTIONS = 2;

function ResultHeader() {
  return (
    <header className="border-b border-overlay/70 bg-background/95 px-3 pb-3 pt-1">
      <div className="flex h-11 items-center justify-center">
        <h1 className="text-[15px] font-bold tracking-tight text-navy">
          Resultado de la evaluación
        </h1>
      </div>
    </header>
  );
}

function ScoreRing() {
  return (
    <div className="relative mx-auto flex h-44 w-44 items-center justify-center">
      {/* Anillo decorativo */}
      <div className="absolute inset-0 rounded-full border-[10px] border-danger/15" />
      <div
        className="absolute inset-0 rounded-full border-[10px] border-danger"
        style={{ clipPath: "inset(0 50% 50% 0)" }}
        aria-hidden
      />
      <div className="relative z-10 flex flex-col items-center">
        <span className="text-[34px] font-extrabold leading-none tracking-tight text-navy">
          {SCORE}
        </span>
        <span className="mt-1 text-[12px] font-semibold uppercase tracking-wider text-slate">
          de {TOTAL}
        </span>
      </div>
    </div>
  );
}

function BreakdownRow({
  icon,
  iconClass,
  label,
  value,
}: {
  icon: React.ReactNode;
  iconClass: string;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-full ${iconClass}`}
        >
          {icon}
        </span>
        <span className="text-[13px] font-medium text-navy">{label}</span>
      </div>
      <span className="text-[15px] font-bold tabular-nums text-navy">{value}</span>
    </div>
  );
}

export function ResultScreen() {
  return (
    <div className="flex h-full flex-col bg-background">
      <ResultHeader />

      <div className="flex-1 space-y-6 overflow-y-auto px-4 pb-8 pt-6">
        {/* Visual principal — estado reprobado */}
        <section className="flex flex-col items-center text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-danger/15 text-danger shadow-md3-1">
            <XIcon className="h-12 w-12" strokeWidth={2.6} />
          </span>
          <h2 className="mt-4 text-[22px] font-extrabold tracking-tight text-danger">
            No aprobado
          </h2>
          <p className="mt-1 max-w-[260px] text-[13px] leading-snug text-slate">
            Revisa el material de la unidad y vuelve a intentarlo cuando estés listo.
          </p>
        </section>

        {/* Puntaje */}
        <section>
          <ScoreRing />
        </section>

        {/* Desglose */}
        <section className="rounded-3xl bg-surface-elevated p-4 shadow-md3-2">
          <p className="px-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate">
            Desglose
          </p>
          <div className="mt-1 divide-y divide-overlay/70">
            <BreakdownRow
              icon={<CheckCircle2 className="h-5 w-5" strokeWidth={2.4} />}
              iconClass="bg-emerald/15 text-emerald"
              label="Respuestas correctas"
              value={CORRECT}
            />
            <BreakdownRow
              icon={<XCircle className="h-5 w-5" strokeWidth={2.4} />}
              iconClass="bg-danger/15 text-danger"
              label="Respuestas incorrectas"
              value={INCORRECT}
            />
            <BreakdownRow
              icon={<ListChecks className="h-5 w-5" strokeWidth={2.4} />}
              iconClass="bg-slate/15 text-slate"
              label="Total de preguntas"
              value={TOTAL_QUESTIONS}
            />
          </div>
        </section>
      </div>

      {/* Controles */}
      <div className="border-t border-overlay/70 bg-background/95 px-4 pb-5 pt-3 backdrop-blur">
        <Link
          to="/materia"
          className="flex h-12 w-full items-center justify-center rounded-2xl bg-indigo text-[15px] font-bold tracking-tight text-white shadow-indigo-glow transition-all hover:brightness-110"
        >
          Volver a Materias
        </Link>
      </div>
    </div>
  );
}
