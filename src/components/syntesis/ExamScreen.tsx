import { useState } from "react";
import { ArrowLeft, Check, X } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────────────
 * Tipos & datos demo (Zero Trust: la "respuesta correcta" se mantiene
 * solo para la pantalla de resultado simulada — en producción real esto
 * NUNCA viaja al cliente; la corrección se ejecuta server-side.)
 * ────────────────────────────────────────────────────────────────────────── */
interface ExamOption {
  id: string;
  label: string;
}
interface ExamQuestion {
  id: string;
  prompt: string;
  options: ExamOption[];
}

const QUESTIONS: ExamQuestion[] = [
  {
    id: "q1",
    prompt: "¿En qué grupo se encuentran los gases nobles?",
    options: [
      { id: "a", label: "Grupo 1 (Metales alcalinos)" },
      { id: "b", label: "Grupo 17 (Halógenos)" },
      { id: "c", label: "Grupo 18 (Gases nobles)" },
      { id: "d", label: "Grupo 2 (Alcalinotérreos)" },
    ],
  },
  {
    id: "q2",
    prompt: "¿Cuál de estos elementos es un metal alcalino?",
    options: [
      { id: "a", label: "Helio (He)" },
      { id: "b", label: "Sodio (Na)" },
      { id: "c", label: "Cloro (Cl)" },
      { id: "d", label: "Oxígeno (O)" },
    ],
  },
];

/* ────────────────────────────────────────────────────────────────────────── */
function ExamHeader({ current, total }: { current: number; total: number }) {
  const pct = ((current + 1) / total) * 100;
  return (
    <header className="sticky top-0 z-30 border-b border-overlay/70 bg-background/95 px-3 pb-3 pt-1 backdrop-blur">
      <div className="relative flex h-11 items-center justify-center">
        <Link
          to="/materia"
          aria-label="Salir de la evaluación"
          className="absolute left-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-slate transition-colors hover:bg-slate/10"
        >
          <X className="h-5 w-5" strokeWidth={2.4} />
        </Link>
        <div className="text-center">
          <h1 className="text-[15px] font-bold leading-tight text-navy">
            Evaluación: Tabla Periódica
          </h1>
          <p className="text-[11px] font-medium text-slate">
            Pregunta {current + 1} de {total}
          </p>
        </div>
      </div>
      {/* Progress bar */}
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-overlay">
        <div
          className="h-full rounded-full bg-indigo transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </header>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
function OptionButton({
  option,
  selected,
  onSelect,
}: {
  option: ExamOption;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "group flex w-full items-center gap-3 rounded-2xl border-2 bg-surface-elevated p-4 text-left transition-all",
        selected
          ? "border-indigo bg-indigo/5 shadow-md3-1"
          : "border-overlay hover:border-slate/40",
      )}
    >
      <span
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all",
          selected ? "border-indigo bg-indigo text-white" : "border-slate/40 bg-transparent",
        )}
      >
        {selected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
      </span>
      <span
        className={cn(
          "text-[14px] font-medium leading-snug",
          selected ? "text-indigo" : "text-navy",
        )}
      >
        {option.label}
      </span>
    </button>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
export function ExamScreen() {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  // Selección por pregunta: { qId: optionId }
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const total = QUESTIONS.length;
  const question = QUESTIONS[currentIdx];
  const isLast = currentIdx === total - 1;
  const selectedForCurrent = answers[question.id];
  const canAdvance = Boolean(selectedForCurrent);

  const handleSelect = (optionId: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: optionId }));
  };

  const handleNext = () => {
    if (!canAdvance) return;
    if (isLast) {
      navigate({ to: "/resultado" });
    } else {
      setCurrentIdx((i) => i + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx === 0) return;
    setCurrentIdx((i) => i - 1);
  };

  const canGoBack = currentIdx > 0;

  return (
    <div className="flex h-full flex-col bg-background">
      <ExamHeader current={currentIdx} total={total} />

      <div className="flex-1 space-y-5 overflow-y-auto px-4 pb-6 pt-5">
        {/* Tarjeta del enunciado */}
        <article className="rounded-3xl bg-surface-elevated p-5 shadow-md3-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-indigo">
            Pregunta {currentIdx + 1}
          </p>
          <h2 className="mt-1.5 text-[18px] font-bold leading-snug text-navy">
            {question.prompt}
          </h2>
        </article>

        {/* Opciones */}
        <div className="flex flex-col gap-2.5">
          {question.options.map((opt) => (
            <OptionButton
              key={opt.id}
              option={opt}
              selected={selectedForCurrent === opt.id}
              onSelect={() => handleSelect(opt.id)}
            />
          ))}
        </div>
      </div>

      {/* Controles inferiores */}
      <div className="flex items-center gap-2.5 border-t border-overlay/70 bg-background/95 px-4 pb-5 pt-3 backdrop-blur">
        {/* Anterior — secundario, oculto en la primera pregunta */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={!canGoBack}
          aria-label="Pregunta anterior"
          className={cn(
            "flex h-12 shrink-0 items-center justify-center gap-1.5 rounded-2xl border-2 px-4 text-[14px] font-semibold tracking-tight transition-all",
            canGoBack
              ? "border-overlay bg-surface-elevated text-navy hover:border-slate/40 active:scale-[0.98]"
              : "cursor-not-allowed border-transparent bg-overlay/60 text-slate/60",
          )}
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2.6} />
          Anterior
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={!canAdvance}
          className={cn(
            "h-12 flex-1 rounded-2xl text-[15px] font-bold tracking-tight transition-all",
            !canAdvance && "cursor-not-allowed bg-overlay text-slate",
            canAdvance && isLast && "bg-emerald text-white shadow-md3-2 hover:brightness-105",
            canAdvance &&
              !isLast &&
              "bg-indigo text-white shadow-indigo-glow hover:brightness-110",
          )}
        >
          {isLast ? "Enviar" : "Siguiente"}
        </button>
      </div>
    </div>
  );
}
