"use client"

import { AlertTriangle, Plus, CheckCircle2, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Ticket, SubRoleInfo } from "@/lib/campus-data"

interface TicketsMantenimientoViewProps {
  tickets: Ticket[]
  subRoleInfo: SubRoleInfo
  onOpenNewTicketModal: () => void
  onOpenCloseTicketModal: (ticket: Ticket) => void
  onEmergencyLockdown: (salonId: string) => void
}

export function TicketsMantenimientoView({
  tickets,
  subRoleInfo,
  onOpenNewTicketModal,
  onOpenCloseTicketModal,
  onEmergencyLockdown,
}: TicketsMantenimientoViewProps) {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
            <AlertTriangle className="size-5 text-amber-500" />
            Mantenimiento & Reporte de Fallas con Foto/Video
          </h2>
          <p className="text-xs text-muted-foreground">
            Trazabilidad completa con foto inicial y foto de cierre obligatorias.
          </p>
        </div>

        <Button onClick={onOpenNewTicketModal} className="rounded-full gap-2 text-xs">
          <Plus className="size-4" />
          Reportar Nueva Falla con Foto/Video
        </Button>
      </div>

      {/* Ticket List */}
      <div className="space-y-3">
        {tickets.map((tk) => {
          const isProc = tk.estado === "en_proceso"
          const isRes = tk.estado === "resuelto"

          return (
            <div
              key={tk.id}
              className="rounded-3xl border border-border bg-card p-5 flex flex-wrap items-start justify-between gap-4 transition-all hover:border-primary/50"
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-primary">{tk.id}</span>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-primary">
                    {tk.categoria}
                  </span>
                  <span className="text-xs text-muted-foreground">· {tk.fecha}</span>
                </div>

                <h3 className="text-base font-semibold text-foreground">{tk.salonNombre}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tk.descripcion}</p>

                <p className="text-xs text-muted-foreground pt-1">
                  Reportado por: <span className="font-medium text-foreground">{tk.reportadoPor}</span>
                  {tk.tecnicoAsignado && (
                    <span>
                      {" "}
                      | Técnico: <span className="font-medium text-primary">{tk.tecnicoAsignado}</span>
                    </span>
                  )}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    isRes
                      ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                      : isProc
                      ? "bg-amber-500/20 text-amber-700 dark:text-amber-300"
                      : "bg-blue-500/20 text-blue-700 dark:text-blue-300"
                  }`}
                >
                  {tk.estado.replace("_", " ").toUpperCase()}
                </span>

                {subRoleInfo.parentRole === "tecnico" && !isRes && (
                  <Button
                    size="sm"
                    onClick={() => onOpenCloseTicketModal(tk)}
                    className="rounded-full text-xs gap-1.5"
                  >
                    <CheckCircle2 className="size-3.5" />
                    Cerrar con Foto Evidencia
                  </Button>
                )}

                {subRoleInfo.id === "tecnico_electrico" && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onEmergencyLockdown(tk.salonId)}
                    className="rounded-full text-[11px] gap-1"
                  >
                    <Zap className="size-3" />
                    Activar Riesgo Eléctrico (RETIE)
                  </Button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
