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
  const pendientes = tickets.filter((t) => t.estado === "pendiente_asignacion").length
  const resueltos = tickets.filter((t) => t.estado === "resuelto").length

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
            <AlertTriangle className="size-5 text-amber-500" />
            Tablero Kanban de Mantenimiento & Fallas
          </h2>
          <p className="text-xs text-muted-foreground">
            Trazabilidad completa de incidencias técnicas en campus.
          </p>
        </div>

        <Button onClick={onOpenNewTicketModal} className="h-8 px-3 rounded-md text-xs">
          <Plus className="size-3.5 mr-1" /> Reportar Falla
        </Button>
      </div>

      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-md border border-border bg-card p-3 space-y-1">
          <p className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1.5">
            <Clock className="size-3.5 text-primary" />
            Tiempo Medio de Respuesta (MTTR)
          </p>
          <p className="text-xs sm:text-sm sm:text-lg font-medium font-bold text-foreground">1.4 Horas</p>
          <p className="text-[10px] text-zinc-800 dark:text-zinc-200 font-medium">⚡ 25% más rápido que la meta de campus</p>
        </div>
        <div className="rounded-md border border-border bg-card p-3 space-y-1">
          <p className="text-[11px] font-semibold text-muted-foreground">Tickets Pendientes</p>
          <p className="text-xs sm:text-sm sm:text-lg font-medium font-bold text-amber-600 dark:text-amber-400">{pendientes} Incidencias</p>
          <p className="text-[10px] text-muted-foreground">Esperando intervención técnica</p>
        </div>
        <div className="rounded-md border border-emerald-500/30 bg-zinc-700/10 p-3 space-y-1">
          <p className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">Tasa de Solución</p>
          <p className="text-xs sm:text-sm sm:text-lg font-medium font-bold text-emerald-700 dark:text-emerald-400">
            {tickets.length > 0 ? Math.round((resueltos / tickets.length) * 100) : 100}%
          </p>
          <p className="text-[10px] text-zinc-800 dark:text-zinc-200 dark:text-emerald-400">{resueltos} resueltos con evidencia foto</p>
        </div>
      </div>

      {/* Kanban Board Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 pt-2 items-start">
        {/* Columna Pendientes */}
        <div className="space-y-2">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between border-b border-border/50 pb-2">
            <span>Pendientes</span>
            <span className="bg-muted px-1.5 py-0.5 rounded-sm">{pendientes}</span>
          </h3>
          <div className="space-y-2">
            {tickets.filter((t) => t.estado === "pendiente_asignacion").map((tk) => (
              <TicketKanbanCard key={tk.id} tk={tk} subRoleInfo={subRoleInfo} onOpenCloseTicketModal={onOpenCloseTicketModal} />
            ))}
          </div>
        </div>

        {/* Columna En Proceso */}
        <div className="space-y-2">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-amber-600 flex items-center justify-between border-b border-border/50 pb-2">
            <span>En Atención Técnica</span>
            <span className="bg-zinc-700/10 px-1.5 py-0.5 rounded-sm">{tickets.filter((t) => t.estado === "en_proceso").length}</span>
          </h3>
          <div className="space-y-2">
            {tickets.filter((t) => t.estado === "en_proceso").map((tk) => (
              <TicketKanbanCard key={tk.id} tk={tk} subRoleInfo={subRoleInfo} onOpenCloseTicketModal={onOpenCloseTicketModal} />
            ))}
          </div>
        </div>

        {/* Columna Resueltos */}
        <div className="space-y-2">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 flex items-center justify-between border-b border-border/50 pb-2">
            <span>Resueltos & Evidencia</span>
            <span className="bg-zinc-700/10 px-1.5 py-0.5 rounded-sm">{resueltos}</span>
          </h3>
          <div className="space-y-2">
            {tickets.filter((t) => t.estado === "resuelto").map((tk) => (
              <TicketKanbanCard key={tk.id} tk={tk} subRoleInfo={subRoleInfo} onOpenCloseTicketModal={onOpenCloseTicketModal} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TicketKanbanCard({
  tk,
  subRoleInfo,
  onOpenCloseTicketModal
}: {
  tk: Ticket
  subRoleInfo: SubRoleInfo
  onOpenCloseTicketModal: (t: Ticket) => void
}) {
  const isProc = tk.estado === "en_proceso"
  const isRes = tk.estado === "resuelto"

  return (
    <div className="rounded-md border border-border/60 bg-card p-3 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <span className="text-[10px] font-bold text-primary">{tk.id}</span>
        <span className="rounded-sm bg-muted/50 px-1.5 py-0.5 text-[9px] font-semibold uppercase text-muted-foreground border border-border/50">
          {tk.categoria}
        </span>
      </div>

      <div>
        <h4 className="text-[12px] font-bold text-foreground leading-tight">{tk.salonNombre}</h4>
        <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1">{tk.descripcion}</p>
      </div>

      <div className="text-[10px] text-muted-foreground pt-1 border-t border-border/50 flex flex-col gap-1">
        <div className="flex justify-between">
          <span>Rep: {tk.reportadoPor.split(" ")[0]}</span>
          {tk.tecnicoAsignado && <span className="text-primary font-medium">Téc: {tk.tecnicoAsignado.split(" ")[0]}</span>}
        </div>
        <div className="flex justify-between items-center">
          <span>{tk.fecha.split(" ")[0]}</span>
          {isRes && (
            <span className="flex items-center gap-1 text-zinc-800 dark:text-zinc-200 font-medium">
              <CheckCircle2 className="size-3" /> Cerrado
            </span>
          )}
        </div>
      </div>

      {subRoleInfo && subRoleInfo.isTecnico && !isRes && (
        <div className="pt-2">
          <Button
            onClick={() => onOpenCloseTicketModal(tk)}
            variant={isProc ? "default" : "outline"}
            className="w-full h-7 text-[10px] rounded-sm"
          >
            {isProc ? "Subir Evidencia & Cerrar" : "Tomar Ticket"}
          </Button>
        </div>
      )}
      
      {!subRoleInfo?.isTecnico && isRes && (
        <div className="pt-2">
          <Button
            onClick={() => generarOrdenTrabajoPDF(tk)}
            variant="outline"
            className="w-full h-7 text-[10px] rounded-sm gap-1"
          >
            <FileText className="size-3" /> Ver Acta PDF
          </Button>
        </div>
      )}
    </div>
  )
}
