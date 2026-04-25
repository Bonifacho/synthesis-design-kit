import { useMemo } from "react";
import {
  Bell,
  BookOpen,
  Eye,
  GraduationCap,
  Home,
  LineChart,
  type LucideIcon,
  Search,
  Sparkles,
  TrendingUp,
  User as UserIcon,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────────────
 * Tipos compartidos — Roles SÍNTESIS
 * ────────────────────────────────────────────────────────────────────────── */
export type SyntesisRole = "estudiante" | "docente" | "practicante";

export interface DemoUser {
  name: string;
  role: SyntesisRole;
}

/* ──────────────────────────────────────────────────────────────────────────
 * Datos demo — Usuarios y grupos
 * ────────────────────────────────────────────────────────────────────────── */
export const DEMO_USERS: Record<SyntesisRole, DemoUser> = {
  estudiante: { name: "Mariana", role: "estudiante" },
  docente: { name: "Prof. Esteban", role: "docente" },
  practicante: { name: "Camila", role: "practicante" },
};

interface DemoGroup {
  id: string;
  subject: string;
  grade: string;
  description: string;
  studentsCount: number;
}

const TEACHER_GROUPS: DemoGroup[] = [
  {
    id: "qui-10a",
    subject: "Química",
    grade: "10°A",
    description: "Tabla periódica y enlaces químicos",
    studentsCount: 2,
  },
  {
    id: "fis-10a",
    subject: "Física",
    grade: "10°A",
    description: "Cinemática y movimiento rectilíneo",
    studentsCount: 2,
  },
];

/* ──────────────────────────────────────────────────────────────────────────
 * Configuración por rol — Bottom navigation y acentos
 * ────────────────────────────────────────────────────────────────────────── */
interface NavItem {
  key: string;
  label: string;
  icon: LucideIcon;
}

interface RoleConfig {
  navItems: NavItem[];
  /** Token semántico del color de acento principal del rol */
  accentToken: "indigo" | "sky";
  accentLabel: string;
}

const ROLE_CONFIG: Record<SyntesisRole, RoleConfig> = {
  estudiante: {
    accentToken: "indigo",
    accentLabel: "Estudiante",
    navItems: [
      { key: "home", label: "Inicio", icon: Home },
      { key: "subjects", label: "Materias", icon: BookOpen },
      { key: "progress", label: "Progreso", icon: TrendingUp },
      { key: "profile", label: "Perfil", icon: UserIcon },
    ],
  },
  docente: {
    accentToken: "indigo",
    accentLabel: "Docente",
    navItems: [
      { key: "groups", label: "Mis Grupos", icon: GraduationCap },
      { key: "students", label: "Estudiantes", icon: Users },
      { key: "results", label: "Resultados", icon: LineChart },
      { key: "profile", label: "Perfil", icon: UserIcon },
    ],
  },
  practicante: {
    accentToken: "sky",
    accentLabel: "Practicante · Solo lectura",
    navItems: [
      { key: "groups", label: "Mis Grupos", icon: GraduationCap },
      { key: "students", label: "Estudiantes", icon: Users },
      { key: "stats", label: "Estadísticas", icon: LineChart },
      { key: "profile", label: "Perfil", icon: UserIcon },
    ],
  },
};

/* ──────────────────────────────────────────────────────────────────────────
 * TopHeader — saludo + rol + acciones
 * ────────────────────────────────────────────────────────────────────────── */
function TopHeader({ user, accentToken }: { user: DemoUser; accentToken: "indigo" | "sky" }) {
  const config = ROLE_CONFIG[user.role];
  return (
    <header className="px-5 pb-4 pt-2">
      <div className="flex items-start justify-between">
        <div className="space-y-0.5">
          <p className="text-[13px] font-medium text-slate">Hola,</p>
          <h1 className="text-2xl font-bold tracking-tight text-navy">{user.name}</h1>
          <p className="text-[13px] font-medium text-slate">{config.accentLabel}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Buscar"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-elevated text-slate shadow-md3-1 transition-colors hover:text-navy"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>
          <button
            type="button"
            aria-label="Notificaciones"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-surface-elevated text-slate shadow-md3-1 transition-colors hover:text-navy"
          >
            <Bell className="h-[18px] w-[18px]" />
            <span
              className={cn(
                "absolute right-2.5 top-2.5 h-2 w-2 rounded-full ring-2 ring-surface-elevated",
                accentToken === "indigo" ? "bg-amber" : "bg-sky",
              )}
            />
          </button>
        </div>
      </div>
    </header>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * StudentDashboard — ESTADO A
 * ────────────────────────────────────────────────────────────────────────── */
function StudentDashboard() {
  return (
    <section className="space-y-4 px-5 pb-6">
      {/* Tarjeta principal — Resumen Académico */}
      <article className="relative overflow-hidden rounded-3xl bg-surface-elevated p-5 shadow-md3-2">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo/10 blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo/10 text-indigo">
              <Sparkles className="h-[18px] w-[18px]" />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate">
                Período actual
              </p>
              <h2 className="text-base font-bold text-navy">Mi Resumen Académico</h2>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <MetricCell
              icon={<BookOpen className="h-4 w-4" />}
              value="2"
              label="Materias matriculadas"
            />
            <MetricCell
              icon={<LineChart className="h-4 w-4" />}
              value="0"
              label="Exámenes presentados"
            />
          </div>
        </div>
      </article>

      {/* Próxima actividad — placeholder calmado */}
      <article className="rounded-3xl border border-overlay bg-surface-elevated p-5 shadow-md3-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate">
          Próxima actividad
        </p>
        <h3 className="mt-1 text-base font-semibold text-navy">Aún no tienes evaluaciones</h3>
        <p className="mt-1 text-[13px] leading-relaxed text-slate">
          Cuando tu docente publique un examen o taller, aparecerá aquí con su fecha y duración.
        </p>
      </article>
    </section>
  );
}

function MetricCell({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-blue/60 p-3">
      <div className="flex items-center gap-1.5 text-slate">
        {icon}
        <span className="text-[11px] font-medium uppercase tracking-wide">Total</span>
      </div>
      <p className="mt-1.5 text-2xl font-bold text-navy">{value}</p>
      <p className="text-[12px] font-medium leading-tight text-slate">{label}</p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * GroupsList — ESTADO B (Docente) y C (Practicante)
 * ────────────────────────────────────────────────────────────────────────── */
function GroupsList({ readOnly }: { readOnly: boolean }) {
  const accentBg = readOnly ? "bg-sky/10" : "bg-indigo/10";
  const accentText = readOnly ? "text-sky" : "text-indigo";
  const studentsColorClass = readOnly ? "text-sky" : "text-amber";

  return (
    <section className="space-y-4 px-5 pb-6">
      {/* Título de sección */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-base font-bold text-navy">Mis Grupos Asignados</h2>
          <p className="text-[12px] text-slate">
            {readOnly ? "Acceso de observación" : "Gestiona tus clases activas"}
          </p>
        </div>
        {readOnly && (
          <span className="inline-flex items-center gap-1 rounded-full bg-sky/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-sky">
            <Eye className="h-3 w-3" />
            Observador
          </span>
        )}
      </div>

      {TEACHER_GROUPS.map((group) => (
        <article
          key={group.id}
          className={cn(
            "rounded-3xl bg-surface-elevated p-4 shadow-md3-2 transition-shadow",
            "hover:shadow-md3-3",
          )}
        >
          <div className="flex items-start gap-3">
            <span
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
                accentBg,
                accentText,
              )}
            >
              <GraduationCap className="h-6 w-6" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="truncate text-[15px] font-bold text-navy">
                  {group.subject} {group.grade}
                </h3>
                {readOnly && (
                  <span className="inline-flex shrink-0 items-center rounded-full bg-sky/15 px-2 py-0.5 text-[10px] font-semibold text-sky">
                    Solo observación
                  </span>
                )}
              </div>
              <p className="mt-0.5 line-clamp-1 text-[12px] text-slate">{group.description}</p>
              <p
                className={cn(
                  "mt-2 text-[12px] font-semibold",
                  studentsColorClass,
                )}
              >
                {group.studentsCount} Estudiantes inscritos
              </p>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * BottomNavigation — barra fija inferior estilo iOS
 * ────────────────────────────────────────────────────────────────────────── */
function BottomNavigation({
  items,
  activeKey,
  onChange,
  accentToken,
}: {
  items: NavItem[];
  activeKey: string;
  onChange: (key: string) => void;
  accentToken: "indigo" | "sky";
}) {
  const activeColor = accentToken === "indigo" ? "text-indigo" : "text-sky";
  const activeIndicator = accentToken === "indigo" ? "bg-indigo" : "bg-sky";

  return (
    <nav
      aria-label="Navegación principal"
      className="sticky bottom-0 z-30 mt-auto border-t border-overlay bg-surface-elevated/95 px-2 pb-6 pt-2 backdrop-blur-md"
    >
      <ul className="flex items-stretch justify-around">
        {items.map((item) => {
          const isActive = item.key === activeKey;
          const Icon = item.icon;
          return (
            <li key={item.key} className="flex-1">
              <button
                type="button"
                onClick={() => onChange(item.key)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group flex w-full flex-col items-center gap-0.5 rounded-2xl px-1 py-1.5 transition-colors",
                  isActive ? activeColor : "text-slate hover:text-navy",
                )}
              >
                <span
                  className={cn(
                    "relative flex h-7 w-12 items-center justify-center rounded-full transition-colors",
                    isActive &&
                      (accentToken === "indigo" ? "bg-indigo/10" : "bg-sky/10"),
                  )}
                >
                  <Icon
                    className={cn(
                      "h-[20px] w-[20px] transition-transform",
                      isActive && "scale-110",
                    )}
                    strokeWidth={isActive ? 2.4 : 2}
                  />
                </span>
                <span
                  className={cn(
                    "text-[10px] font-semibold tracking-tight",
                    isActive ? "opacity-100" : "opacity-90",
                  )}
                >
                  {item.label}
                </span>
                <span
                  className={cn(
                    "mt-0.5 h-0.5 w-1 rounded-full transition-all",
                    isActive ? cn("w-5", activeIndicator) : "bg-transparent",
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * Dashboard — Componente principal multi-rol
 * ────────────────────────────────────────────────────────────────────────── */
export interface DashboardProps {
  role: SyntesisRole;
  /** Override opcional del usuario (por defecto usa DEMO_USERS[role]) */
  user?: DemoUser;
  /** Pestaña activa controlada (opcional) */
  activeTab?: string;
  /** Callback al cambiar de pestaña */
  onTabChange?: (key: string) => void;
}

export function Dashboard({ role, user, activeTab, onTabChange }: DashboardProps) {
  const config = ROLE_CONFIG[role];
  const currentUser = user ?? DEMO_USERS[role];

  // Estado local para la pestaña activa cuando no es controlado
  const resolvedActive = activeTab ?? config.navItems[0].key;

  const content = useMemo(() => {
    if (role === "estudiante") return <StudentDashboard />;
    return <GroupsList readOnly={role === "practicante"} />;
  }, [role]);

  return (
    <div className="flex h-full flex-col bg-background">
      <TopHeader user={currentUser} accentToken={config.accentToken} />
      <div className="flex-1 overflow-y-auto">{content}</div>
      <BottomNavigation
        items={config.navItems}
        activeKey={resolvedActive}
        onChange={(key) => onTabChange?.(key)}
        accentToken={config.accentToken}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * RoleSwitcher — Vista de desarrollo temporal (toggle de roles)
 * ────────────────────────────────────────────────────────────────────────── */
export function RoleSwitcher({
  role,
  onChange,
}: {
  role: SyntesisRole;
  onChange: (role: SyntesisRole) => void;
}) {
  const roles: { key: SyntesisRole; label: string }[] = [
    { key: "estudiante", label: "Estudiante" },
    { key: "docente", label: "Docente" },
    { key: "practicante", label: "Practicante" },
  ];

  return (
    <div className="absolute left-1/2 top-3 z-[60] hidden -translate-x-1/2 sm:block">
      <div className="flex items-center gap-1 rounded-full border border-overlay bg-surface-elevated/90 p-1 shadow-md3-2 backdrop-blur">
        <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate">
          DEV · Rol
        </span>
        {roles.map((r) => {
          const isActive = r.key === role;
          return (
            <button
              key={r.key}
              type="button"
              onClick={() => onChange(r.key)}
              className={cn(
                "rounded-full px-3 py-1 text-[11px] font-semibold transition-colors",
                isActive
                  ? r.key === "practicante"
                    ? "bg-sky text-white shadow-sm"
                    : "bg-indigo text-white shadow-sm"
                  : "text-slate hover:text-navy",
              )}
            >
              {r.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
