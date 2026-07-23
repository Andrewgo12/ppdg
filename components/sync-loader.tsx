"use client"

import { useEffect, useState, useRef } from "react"
import { Building2, ShieldCheck, Database, RefreshCw, Sparkles } from "lucide-react"
import { SUB_ROLES, type RoleId, type SubRoleId } from "@/lib/campus-data"

interface SyncLoaderProps {
  roleId: RoleId
  subRoleId: SubRoleId
  onComplete: () => void
}

export function SyncLoader({ roleId, subRoleId, onComplete }: SyncLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState("Inicializando conexión con SmartCampus...")
  const subInfo = SUB_ROLES[subRoleId]
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current += 10
      if (current >= 100) {
        setProgress(100)
        clearInterval(interval)
        setTimeout(() => {
          onCompleteRef.current()
        }, 150)
      } else {
        setProgress(current)
        if (current < 30) {
          setStatusText("⚡ Conectando con servidor de base de datos SmartCampus...")
        } else if (current < 60) {
          setStatusText(`🛡️ Verificando permisos RBAC para: ${subInfo ? subInfo.name : subRoleId}...`)
        } else if (current < 90) {
          setStatusText("📡 Sincronizando aulas, inventario, reservas y tickets...")
        } else {
          setStatusText("✅ Sincronización completa. Cargando entorno de usuario...")
        }
      }
    }, 40) // ~0.4s fast smooth load

    return () => clearInterval(interval)
  }, [subRoleId, subInfo])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background p-6 text-foreground">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute size-96 rounded-full bg-primary/10 blur-3xl animate-pulse" />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center space-y-6">
        {/* Animated Brand Logo */}
        <div className="relative flex items-center justify-center">
          <div className="absolute size-24 rounded-3xl bg-primary/20 blur-md animate-ping opacity-30" />
          <div className="relative flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xl">
            <Building2 className="size-8 animate-pulse" />
          </div>
        </div>

        {/* Brand & User info */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-[11px] font-semibold text-primary">
            <Sparkles className="size-3.5" />
            <span>SmartCampus Core Engine</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight">Cargando Entorno</h2>
          <p className="text-xs text-muted-foreground font-medium">
            Preparando permisos y datos en tiempo real
          </p>
        </div>

        {/* User Card */}
        <div className="w-full rounded-2xl border border-border bg-card/80 p-3.5 shadow-sm backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-sm">
              <ShieldCheck className="size-5" />
            </div>
            <div className="min-w-0 flex-1 text-left">
              <p className="text-xs font-bold text-foreground truncate">{subInfo?.name || subRoleId}</p>
              <p className="text-[10px] text-muted-foreground truncate">{subInfo?.badge || "Perfil Verificado"}</p>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
              <Database className="size-3" />
              <span>BD Creada</span>
            </div>
          </div>
        </div>

        {/* Progress & Status */}
        <div className="w-full space-y-2.5">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <RefreshCw className="size-3.5 animate-spin text-primary" />
              Sincronización inicial
            </span>
            <span className="font-mono font-bold text-primary">{progress}%</span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all duration-100 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-xs font-semibold text-foreground/90 min-h-[18px]">
            {statusText}
          </p>
        </div>
      </div>
    </div>
  )
}

