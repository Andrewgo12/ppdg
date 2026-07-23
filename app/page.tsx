"use client"

import { useState } from "react"
import { LoginScreen } from "@/components/login-screen"
import { Dashboard } from "@/components/dashboard"
import type { RoleId } from "@/lib/campus-data"

export default function Page() {
  const [role, setRole] = useState<RoleId | null>(null)

  if (!role) {
    return <LoginScreen onLogin={setRole} />
  }

  return <Dashboard roleId={role} onLogout={() => setRole(null)} />
}
