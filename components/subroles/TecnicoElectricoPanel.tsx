"use client"

import { Zap, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { SubRoleInfo } from "@/lib/campus-data"

interface TecnicoElectricoPanelProps {
  subRoleInfo: SubRoleInfo
  onEmergencyLockdown: () => void
}

export function TecnicoElectricoPanel({
  subRoleInfo,
  onEmergencyLockdown,
}: TecnicoElectricoPanelProps) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-4 space-y-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-700/10 text-amber-500">
            <Zap className="size-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">Consola: {subRoleInfo.name}</h3>
            <p className="text-xs text-muted-foreground">{subRoleInfo.title}</p>
          </div>
        </div>
        <span className="rounded-full bg-zinc-700/10 px-3 py-1 text-xs font-semibold text-amber-600">
          {subRoleInfo.badge}
        </span>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        {subRoleInfo.tagline}
      </p>

      <div className="flex flex-wrap gap-2 pt-1">
        <Button
          size="sm"
          variant="destructive"
          onClick={onEmergencyLockdown}
          className="rounded-full text-xs gap-1.5"
        >
          <Zap className="size-3.5" />
          Activar Aislamiento RETIE (Riesgo Eléctrico Alto)
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
