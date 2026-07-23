"use client"

import { Shield, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { SubRoleInfo } from "@/lib/campus-data"

interface SuperAdminPanelProps {
  subRoleInfo: SubRoleInfo
  onAuditLogs: () => void
}

export function SuperAdminPanel({
  subRoleInfo,
  onAuditLogs,
}: SuperAdminPanelProps) {
  return (
    <div className="rounded-sm border border-border/60 bg-card p-3 space-y-2.5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-6 items-center justify-center rounded-sm bg-muted/40 text-primary">
            <Shield className="size-4" />
          </div>
          <div>
            <h3 className="text-[12px] font-bold uppercase tracking-wider font-mono text-foreground">Perfil: {subRoleInfo.name}</h3>
            <p className="text-[10px] text-muted-foreground font-mono">{subRoleInfo.title}</p>
          </div>
        </div>
        
      </div>

      <p className="text-[10px] text-muted-foreground font-mono leading-relaxed">
        {subRoleInfo.tagline}
      </p>

      <div className="flex flex-wrap gap-2 pt-1">
        <Button
          size="sm"
          onClick={onAuditLogs}
          className="rounded-sm text-[10px] gap-1.5"
        >
          <Shield className="size-3.5" />
          Auditar Permisos & Transacciones RBAC
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] bg-muted/30 p-3 rounded-sm pt-2">
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
