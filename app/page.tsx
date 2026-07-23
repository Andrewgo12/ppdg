"use client"

import { useState } from "react"
import { LoginScreen } from "@/components/login-screen"
import { SyncLoader } from "@/components/sync-loader"
import { Dashboard } from "@/components/dashboard"
import type { RoleId, SubRoleId } from "@/lib/campus-data"

export default function Page() {
  const [role, setRole] = useState<RoleId | null>(null)
  const [subRole, setSubRole] = useState<SubRoleId | null>(null)
  const [isSyncing, setIsSyncing] = useState<boolean>(false)

  if (!role) {
    return (
      <LoginScreen
        onLogin={(r, sr) => {
          setRole(r)
          setSubRole(sr)
          setIsSyncing(true)
        }}
      />
    )
  }

  if (isSyncing) {
    return (
      <SyncLoader
        roleId={role}
        subRoleId={subRole || "super_admin"}
        onComplete={() => setIsSyncing(false)}
      />
    )
  }

  return (
    <Dashboard
      roleId={role}
      initialSubRoleId={subRole || undefined}
      onLogout={() => {
        setRole(null)
        setSubRole(null)
        setIsSyncing(false)
      }}
    />
  )
}
