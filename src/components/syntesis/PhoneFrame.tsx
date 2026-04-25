import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
}

/**
 * PhoneFrame — Mockup móvil 375×812 (iPhone 13/14 mini base).
 *
 * Simula un dispositivo móvil real con:
 *  · Notch superior (cámara/altavoz)
 *  · Safe area top (notch + status bar)
 *  · Safe area bottom (home indicator)
 *  · Bordes redondeados de hardware
 *  · Sombra elegante sobre el fondo de página
 *
 * Todo el contenido SÍNTESIS se renderiza dentro del marco;
 * en pantallas pequeñas, el marco se adapta a viewport completo.
 */
export function PhoneFrame({ children, className }: PhoneFrameProps) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-overlay p-0 sm:p-6">
      <div
        className={cn(
          // Marco del teléfono — solo visible en sm+
          "relative h-screen w-full overflow-hidden bg-background sm:h-[812px] sm:w-[390px] sm:rounded-[3rem] sm:border-[10px] sm:border-navy sm:shadow-[0_30px_80px_-20px_oklch(0.205_0.04_265/0.5)]",
          className,
        )}
      >
        {/* Notch — solo visible cuando hay marco */}
        <div className="pointer-events-none absolute left-1/2 top-0 z-50 hidden h-7 w-36 -translate-x-1/2 rounded-b-[1.25rem] bg-navy sm:block" />

        {/* Status bar simulada */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center justify-between px-7 pt-3 text-[11px] font-semibold text-foreground">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            {/* Señal */}
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
              <rect x="0" y="6" width="2.5" height="4" rx="0.5" fill="currentColor" />
              <rect x="4" y="4" width="2.5" height="6" rx="0.5" fill="currentColor" />
              <rect x="8" y="2" width="2.5" height="8" rx="0.5" fill="currentColor" />
              <rect x="12" y="0" width="2.5" height="10" rx="0.5" fill="currentColor" />
            </svg>
            {/* Batería */}
            <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
              <rect
                x="0.5"
                y="0.5"
                width="18"
                height="9"
                rx="2"
                stroke="currentColor"
                strokeOpacity="0.4"
              />
              <rect x="2" y="2" width="14" height="6" rx="1" fill="currentColor" />
              <rect x="19.5" y="3.5" width="1.5" height="3" rx="0.5" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Contenido — con safe areas simuladas */}
        <div className="relative z-10 flex h-full flex-col overflow-y-auto pb-[env(safe-area-inset-bottom)] pt-10">
          {children}
        </div>

        {/* Home indicator */}
        <div className="pointer-events-none absolute bottom-2 left-1/2 z-50 hidden h-1 w-32 -translate-x-1/2 rounded-full bg-navy/80 sm:block" />
      </div>
    </div>
  );
}
