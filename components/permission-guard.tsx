"use client"

import React from "react"
import { ShieldAlert, Lock } from "lucide-react"
import { hasPermission, PERMISSION_CATALOG, type PermissionKey } from "@/lib/permissions"
import type { SubRoleId } from "@/lib/campus-data"

interface PermissionGuardProps {
  subRole: SubRoleId
  permission: PermissionKey
  children: React.ReactNode
  mode?: "disable" | "hide" | "alert"
  fallbackMessage?: string
}

export function PermissionGuard({
  subRole,
  permission,
  children,
  mode = "disable",
  fallbackMessage
}: PermissionGuardProps) {
  const allowed = hasPermission(subRole, permission)

  if (allowed) {
    return <>{children}</>
  }

  const def = PERMISSION_CATALOG[permission]

  if (mode === "hide") {
    return null
  }

  if (mode === "alert") {
    return (
      <div className="rounded-xl border border-amber-500/30 bg-zinc-700/10 p-3 text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2.5">
        <ShieldAlert className="size-4 shrink-0 text-amber-600 dark:text-amber-400" />
        <div>
          <p className="font-bold">Acceso Restringido (403)</p>
          <p className="text-[11px] opacity-90">
            {fallbackMessage || `Tu perfil no tiene el permiso (${def?.label || permission}) asignado.`}
          </p>
        </div>
      </div>
    )
  }

  // "disable" mode
  return (
    <div className="relative group inline-block w-full">
      <div className="pointer-events-none opacity-50 grayscale cursor-not-allowed select-none">
        {children}
      </div>
      <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-xs rounded-xl p-2 text-center pointer-events-none">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-zinc-700/10 px-2.5 py-1 rounded-lg border border-amber-500/30 shadow-xs">
          <Lock className="size-3" />
          <span>Requiere permiso: {def?.label || permission}</span>
        </span>
      </div>
    </div>
  )
}
