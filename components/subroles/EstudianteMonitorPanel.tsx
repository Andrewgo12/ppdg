"use client"

import { QrCode, UserCheck, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { SubRoleInfo } from "@/lib/campus-data"

interface EstudianteMonitorPanelProps {
  subRoleInfo: SubRoleInfo
  onOpenScanQrModal: () => void
  onOpenAsistenciaLabModal: () => void
}

export function EstudianteMonitorPanel({
  subRoleInfo,
  onOpenScanQrModal,
  onOpenAsistenciaLabModal,
}: EstudianteMonitorPanelProps) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-4 space-y-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted/40 text-primary">
            <UserCheck className="size-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">Consola: {subRoleInfo.name}</h3>
            <p className="text-xs text-muted-foreground">{subRoleInfo.title}</p>
          </div>
        </div>
        <span className="rounded-full bg-muted/40 px-3 py-1 text-xs font-semibold text-primary">
          {subRoleInfo.badge}
        </span>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        {subRoleInfo.tagline}
      </p>

      <div className="flex flex-wrap gap-2 pt-1">
        <Button
          size="sm"
          onClick={onOpenScanQrModal}
          className="rounded-full text-xs gap-1.5"
        >
          <QrCode className="size-3.5" />
          Escanear Ticket QR Préstamo
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={onOpenAsistenciaLabModal}
          className="rounded-full text-xs gap-1.5"
        >
          <UserCheck className="size-3.5" />
          Registrar Asistencia Laboratorio
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] bg-muted/30 p-3 rounded-lg pt-2">
        {subRoleInfo.permissions.map((perm, idx) => (
          <div key={idx} className="flex items-center gap-1.5 text-muted-foreground">
            <CheckCircle2 className="size-3 text-emerald-500 shrink-0" />
            <span className="truncate">{perm}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
