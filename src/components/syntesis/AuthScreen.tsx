import { useMemo, useState, type FormEvent } from "react";
import {
  BookOpen,
  Check,
  ChevronDown,
  Eye,
  EyeOff,
  Info,
  Lock,
  Search,
  Sparkles,
  User as UserIcon,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────────────
 * Datos mockeados — Grupos académicos
 * ────────────────────────────────────────────────────────────────────────── */
type AcademicGroup = {
  id: string;
  subject: string;
  grade: string;
  teacher: string;
};

const ACADEMIC_GROUPS: AcademicGroup[] = [
  { id: "qui-10a", subject: "Química", grade: "10°A", teacher: "Prof. Mariana Ortiz" },
  { id: "qui-10b", subject: "Química", grade: "10°B", teacher: "Prof. Mariana Ortiz" },
  { id: "fis-11a", subject: "Física", grade: "11°A", teacher: "Prof. Esteban Cruz" },
  { id: "fis-11b", subject: "Física", grade: "11°B", teacher: "Prof. Esteban Cruz" },
  { id: "bio-9a", subject: "Biología", grade: "9°A", teacher: "Prof. Lucía Camargo" },
  { id: "bio-9b", subject: "Biología", grade: "9°B", teacher: "Prof. Lucía Camargo" },
  { id: "mat-10a", subject: "Matemáticas", grade: "10°A", teacher: "Prof. Daniel Rojas" },
  { id: "mat-11a", subject: "Matemáticas", grade: "11°A", teacher: "Prof. Daniel Rojas" },
  { id: "esp-9a", subject: "Lengua Castellana", grade: "9°A", teacher: "Prof. Andrea Mejía" },
  { id: "his-10a", subject: "Ciencias Sociales", grade: "10°A", teacher: "Prof. Carlos Henao" },
  { id: "ing-11a", subject: "Inglés", grade: "11°A", teacher: "Prof. Sofía Vélez" },
  { id: "fil-11a", subject: "Filosofía", grade: "11°A", teacher: "Prof. Mateo Restrepo" },
];

/* ──────────────────────────────────────────────────────────────────────────
 * Logotipo SÍNTESIS — curva S con nodo ámbar central
 * ────────────────────────────────────────────────────────────────────────── */
function SyntesisLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Logotipo SÍNTESIS"
    >
      <path
        d="M14 18 C14 10, 30 8, 32 22 C34 36, 50 38, 50 46 C50 56, 32 58, 22 50"
        stroke="oklch(0.5 0.22 277)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="32" cy="32" r="6" fill="oklch(0.737 0.16 65)" />
      <circle cx="32" cy="32" r="2.4" fill="oklch(1 0 0)" />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * Field — Input estilizado MD3 con label flotante e ícono opcional
 * ────────────────────────────────────────────────────────────────────────── */
interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  trailing?: React.ReactNode;
}

function Field({ label, icon, trailing, className, id, ...props }: FieldProps) {
  const inputId = id ?? `field-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={inputId}
        className="block px-1 text-xs font-medium text-muted-foreground"
      >
        {label}
      </label>
      <div
        className={cn(
          "group flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3.5 transition-all",
          "focus-within:border-indigo focus-within:shadow-[0_0_0_4px_oklch(0.5_0.22_277/0.12)]",
          className,
        )}
      >
        {icon && (
          <span className="text-muted-foreground transition-colors group-focus-within:text-indigo">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className="min-w-0 flex-1 bg-transparent text-[15px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
          {...props}
        />
        {trailing}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * GroupPickerDrawer — Bottom sheet con búsqueda interna
 * ────────────────────────────────────────────────────────────────────────── */
interface GroupPickerDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedId: string | null;
  onSelect: (group: AcademicGroup) => void;
}

function GroupPickerDrawer({ open, onClose, selectedId, onSelect }: GroupPickerDrawerProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ACADEMIC_GROUPS;
    return ACADEMIC_GROUPS.filter((g) =>
      `${g.subject} ${g.grade} ${g.teacher}`.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <>
      {/* Scrim */}
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 z-[60] bg-navy/40 backdrop-blur-[2px] transition-opacity duration-300",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden
      />

      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Seleccionar grupo académico"
        className={cn(
          "absolute inset-x-0 bottom-0 z-[70] flex max-h-[78%] flex-col rounded-t-3xl bg-card shadow-[0_-12px_40px_-8px_oklch(0.205_0.04_265/0.25)]",
          "transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
          open ? "translate-y-0" : "translate-y-full",
        )}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-2.5">
          <div className="h-1 w-10 rounded-full bg-overlay" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-3">
          <div>
            <h3 className="text-base font-semibold text-foreground">Grupo académico</h3>
            <p className="text-xs text-muted-foreground">Selecciona tu curso actual</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-overlay"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search */}
        <div className="px-5 pt-4">
          <div className="flex items-center gap-2 rounded-2xl border border-border bg-muted/60 px-4 py-3 focus-within:border-indigo focus-within:bg-card">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar materia, grado o docente…"
              className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Limpiar búsqueda"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* List */}
        <div className="mt-3 flex-1 overflow-y-auto px-3 pb-6">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">Sin resultados</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Intenta con otra materia o grado
              </p>
            </div>
          ) : (
            <ul className="space-y-1">
              {filtered.map((g) => {
                const active = g.id === selectedId;
                return (
                  <li key={g.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onSelect(g);
                        setQuery("");
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors",
                        active ? "bg-indigo/8" : "hover:bg-muted",
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                          active
                            ? "bg-indigo text-indigo-foreground"
                            : "bg-muted text-indigo",
                        )}
                      >
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {g.subject} · {g.grade}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">{g.teacher}</p>
                      </div>
                      {active && (
                        <Check className="h-5 w-5 shrink-0 text-indigo" strokeWidth={2.5} />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * Pantalla principal: Autenticación unificada
 * ────────────────────────────────────────────────────────────────────────── */
type Tab = "login" | "register";

export function AuthScreen() {
  const [tab, setTab] = useState<Tab>("login");

  // Login
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [showLoginPass, setShowLoginPass] = useState(false);

  // Registro
  const [fullName, setFullName] = useState("");
  const [docId, setDocId] = useState("");
  const [group, setGroup] = useState<AcademicGroup | null>(null);
  const [regUser, setRegUser] = useState("");
  const [regPass, setRegPass] = useState("");
  const [showRegPass, setShowRegPass] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // UI pura — solo log para verificación
    console.log("[SÍNTESIS] login →", { loginUser, loginPass });
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) return;
    console.log("[SÍNTESIS] register →", {
      fullName,
      docId,
      groupId: group?.id,
      regUser,
      regPass,
    });
  };

  return (
    <div className="relative flex h-full flex-col">
      {/* ── Cabecera con identidad ────────────────────────────── */}
      <header className="px-6 pb-6 pt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-card shadow-md3-1">
            <SyntesisLogo className="h-9 w-9" />
          </div>
          <div>
            <h1 className="text-[22px] font-bold leading-tight tracking-tight text-foreground">
              SÍNTESIS
            </h1>
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Aprende · Sintetiza · Avanza
            </p>
          </div>
        </div>
      </header>

      {/* ── Segmented control Login / Registro ──────────────────── */}
      <div className="px-6">
        <div
          role="tablist"
          aria-label="Modo de acceso"
          className="relative flex rounded-2xl bg-muted p-1"
        >
          {/* Indicador deslizante */}
          <span
            aria-hidden
            className={cn(
              "absolute inset-y-1 w-[calc(50%-4px)] rounded-xl bg-card shadow-md3-1 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
              tab === "login" ? "translate-x-0" : "translate-x-[calc(100%+4px)]",
            )}
          />
          <button
            role="tab"
            aria-selected={tab === "login"}
            type="button"
            onClick={() => setTab("login")}
            className={cn(
              "relative z-10 flex-1 rounded-xl py-2.5 text-sm font-semibold transition-colors",
              tab === "login" ? "text-indigo" : "text-muted-foreground",
            )}
          >
            Iniciar sesión
          </button>
          <button
            role="tab"
            aria-selected={tab === "register"}
            type="button"
            onClick={() => setTab("register")}
            className={cn(
              "relative z-10 flex-1 rounded-xl py-2.5 text-sm font-semibold transition-colors",
              tab === "register" ? "text-indigo" : "text-muted-foreground",
            )}
          >
            Registrarse
          </button>
        </div>
      </div>

      {/* ── Contenido del formulario ────────────────────────────── */}
      <main className="flex-1 px-6 pb-8 pt-6">
        {tab === "login" ? (
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Banner credenciales demo */}
            <div className="flex gap-3 rounded-2xl border border-sky/30 bg-sky/8 p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky text-white">
                <Info className="h-4 w-4" strokeWidth={2.5} />
              </div>
              <div className="min-w-0 space-y-1">
                <p className="text-xs font-semibold text-foreground">Credenciales demo</p>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  Usuarios:{" "}
                  <span className="font-mono font-semibold text-foreground">docente</span> ·{" "}
                  <span className="font-mono font-semibold text-foreground">estudiante</span>{" "}
                  ·{" "}
                  <span className="font-mono font-semibold text-foreground">practicante</span>
                  <br />
                  Contraseña:{" "}
                  <span className="font-mono font-semibold text-foreground">1234</span>
                </p>
              </div>
            </div>

            <Field
              label="Usuario"
              type="text"
              autoComplete="username"
              placeholder="docente"
              icon={<UserIcon className="h-4 w-4" />}
              value={loginUser}
              onChange={(e) => setLoginUser(e.target.value)}
            />

            <Field
              label="Contraseña"
              type={showLoginPass ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••"
              icon={<Lock className="h-4 w-4" />}
              value={loginPass}
              onChange={(e) => setLoginPass(e.target.value)}
              trailing={
                <button
                  type="button"
                  onClick={() => setShowLoginPass((v) => !v)}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showLoginPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showLoginPass ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              }
            />

            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs font-semibold text-indigo hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-amber py-4 text-[15px] font-bold text-amber-foreground shadow-amber-glow transition-all active:scale-[0.98]"
            >
              Ingresar
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <Field
              label="Nombres y apellidos"
              type="text"
              autoComplete="name"
              placeholder="Ej. Laura Mendoza Pérez"
              icon={<UserIcon className="h-4 w-4" />}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <Field
              label="Documento de identidad"
              type="text"
              inputMode="numeric"
              placeholder="1.020.345.678"
              icon={
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <circle cx="9" cy="12" r="2.5" />
                  <path d="M14 10h5M14 14h3" />
                </svg>
              }
              value={docId}
              onChange={(e) => setDocId(e.target.value)}
            />

            {/* Searchable select — abre bottom drawer */}
            <div className="space-y-1.5">
              <label className="block px-1 text-xs font-medium text-muted-foreground">
                Grupo académico
              </label>
              <button
                type="button"
                onClick={() => setPickerOpen(true)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all",
                  group
                    ? "border-indigo/40 bg-card"
                    : "border-border bg-card hover:border-indigo/30",
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                    group ? "bg-indigo text-indigo-foreground" : "bg-muted text-muted-foreground",
                  )}
                >
                  <BookOpen className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  {group ? (
                    <>
                      <span className="block truncate text-sm font-semibold text-foreground">
                        {group.subject} · {group.grade}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {group.teacher}
                      </span>
                    </>
                  ) : (
                    <span className="text-sm text-muted-foreground/80">
                      Selecciona tu grupo…
                    </span>
                  )}
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
              </button>
            </div>

            <Field
              label="Nombre de usuario"
              type="text"
              autoComplete="username"
              placeholder="laura.mendoza"
              icon={<Sparkles className="h-4 w-4" />}
              value={regUser}
              onChange={(e) => setRegUser(e.target.value)}
            />

            <Field
              label="Contraseña"
              type={showRegPass ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Mínimo 4 caracteres"
              icon={<Lock className="h-4 w-4" />}
              value={regPass}
              onChange={(e) => setRegPass(e.target.value)}
              trailing={
                <button
                  type="button"
                  onClick={() => setShowRegPass((v) => !v)}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showRegPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showRegPass ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              }
            />

            {/* Checkbox términos */}
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-indigo/30">
              <span
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all",
                  acceptTerms
                    ? "border-indigo bg-indigo"
                    : "border-overlay bg-card",
                )}
              >
                {acceptTerms && (
                  <Check
                    className="h-3.5 w-3.5 text-indigo-foreground"
                    strokeWidth={3}
                  />
                )}
              </span>
              <input
                type="checkbox"
                className="sr-only"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
              <span className="text-[12px] leading-relaxed text-muted-foreground">
                Acepto los{" "}
                <span className="font-semibold text-indigo">términos del servicio</span> y la{" "}
                <span className="font-semibold text-indigo">
                  política de tratamiento de datos
                </span>{" "}
                personales conforme a la Ley 1581 de 2012.
              </span>
            </label>

            <button
              type="submit"
              disabled={!acceptTerms}
              className={cn(
                "mt-2 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-[15px] font-bold transition-all active:scale-[0.98]",
                acceptTerms
                  ? "bg-amber text-amber-foreground shadow-amber-glow"
                  : "cursor-not-allowed bg-muted text-muted-foreground",
              )}
            >
              <Sparkles className="h-4 w-4" />
              Comenzar aventura
            </button>
          </form>
        )}
      </main>

      {/* Drawer de selección de grupo */}
      <GroupPickerDrawer
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        selectedId={group?.id ?? null}
        onSelect={(g) => {
          setGroup(g);
          setPickerOpen(false);
        }}
      />
    </div>
  );
}
