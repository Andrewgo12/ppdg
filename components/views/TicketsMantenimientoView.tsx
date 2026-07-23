"use client"

import { AlertTriangle, Plus, CheckCircle2, Zap, FileText, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Ticket, SubRoleInfo } from "@/lib/campus-data"
import { generarOrdenTrabajoPDF } from "@/lib/pdf-ticket-generator"
import { toast } from "sonner"

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
  const pendientes = tickets.filter((t) => t.estado === "pendiente").length
  const resueltos = tickets.filter((t) => t.estado === "resuelto").length

  return (
    <section className="space-y-4">
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

      {/* MTTR & Maintenance Statistics Bar */}
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-3 space-y-1">
          <p className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1.5">
            <Clock className="size-3.5 text-primary" />
            Tiempo Medio de Respuesta (MTTR)
          </p>
          <p className="text-xl font-bold text-foreground">1.4 Horas</p>
          <p className="text-[10px] text-emerald-600 font-medium">⚡ 25% más rápido que la meta de campus</p>
        </div>

        <div className="rounded-lg border border-border bg-card p-3 space-y-1">
          <p className="text-[11px] font-semibold text-muted-foreground">Tickets Pendientes</p>
          <p className="text-xl font-bold text-amber-600 dark:text-amber-400">{pendientes} Incidencias</p>

          <p className="text-[10px] text-muted-foreground">Esperando intervención técnica</p>
        </div>

        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 space-y-1">
          <p className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">Tasa de Solución</p>
          <p className="text-xl font-bold text-emerald-700 dark:text-emerald-400">
            {tickets.length > 0 ? Math.round((resueltos / tickets.length) * 100) : 100}%
          </p>
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400">{resueltos} tickets resueltos con evidencia foto</p>
        </div>
      </div>

      {/* Ticket List */}
      <div className="space-y-3">
        {tickets.map((tk) => {
          const isProc = tk.estado === "en_proceso"
          const isRes = tk.estado === "resuelto"

          return (
            <div
              key={tk.id}
              className="rounded-xl border border-border bg-card p-4 flex flex-wrap items-start justify-between gap-4 transition-all hover:border-primary/50"
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-primary">{tk.id}</span>
                  <span className="rounded-full bg-muted/40 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-primary">
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

                <div className="flex items-center gap-1.5 pt-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      generarOrdenTrabajoPDF(tk)
                      toast.success(`📄 Orden de Trabajo ${tk.id} descargada`, { description: "PDF listo para impresión y firmado técnico." })
                    }}
                    className="rounded-full text-[11px] h-7 gap-1"
                  >
                    <FileText className="size-3 text-primary" />
                    Orden PDF
                  </Button>

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
                </div>

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
