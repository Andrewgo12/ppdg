"use client"

import { useState } from "react"
import Image from "next/image"
import { Building2, Mail, ShieldCheck, Check, ArrowRight, UserCheck, Layers, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ROLES, ROLE_ORDER, SUB_ROLES, INITIAL_USUARIOS_RBAC, type RoleId, type SubRoleId, type UsuarioRBAC } from "@/lib/campus-data"

interface LoginScreenProps {
  onLogin: (role: RoleId, subRole: SubRoleId) => void
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  // Login steps: "email" | "manual"
  const [step, setStep] = useState<"email" | "manual">("email")
  
  // Email input state
  const [emailInput, setEmailInput] = useState("monica.salazar@smartcampus.edu.co")

  // Manual selector state
  const [selectedRole, setSelectedRole] = useState<RoleId>("admin")
  const [selectedSubRole, setSelectedSubRole] = useState<SubRoleId>("super_admin")

  // Find user in database by email or match custom
  function findUserByEmail(email: string): { user: UsuarioRBAC; subRole: SubRoleId; parentRole: RoleId } {
    const cleanEmail = email.trim().toLowerCase()
    const found = INITIAL_USUARIOS_RBAC.find((u) => u.email.toLowerCase() === cleanEmail)
    
    if (found) {
      const subInfo = SUB_ROLES[found.subRole]
      return {
        user: found,
        subRole: found.subRole,
        parentRole: subInfo ? subInfo.parentRole : "estudiante"
      }
    }

    // Default heuristics if typing custom email
    if (cleanEmail.includes("admin") || cleanEmail.includes("monica") || cleanEmail.includes("director")) {
      const u = INITIAL_USUARIOS_RBAC.find((x) => x.subRole === "super_admin")!
      return { user: u, subRole: "super_admin", parentRole: "admin" }
    }
    if (cleanEmail.includes("docente") || cleanEmail.includes("prof") || cleanEmail.includes("andres")) {
      const u = INITIAL_USUARIOS_RBAC.find((x) => x.subRole === "docente_regular")!
      return { user: u, subRole: "docente_regular", parentRole: "docente" }
    }
    if (cleanEmail.includes("tecnico") || cleanEmail.includes("soporte") || cleanEmail.includes("carlos")) {
      const u = INITIAL_USUARIOS_RBAC.find((x) => x.subRole === "tecnico_it")!
      return { user: u, subRole: "tecnico_it", parentRole: "tecnico" }
    }
    if (cleanEmail.includes("almacen") || cleanEmail.includes("diana")) {
      const u = INITIAL_USUARIOS_RBAC.find((x) => x.subRole === "almacenista")!
      return { user: u, subRole: "almacenista", parentRole: "almacen" }
    }

    // Default fallback to Estudiante Regular
    const defaultStudent = INITIAL_USUARIOS_RBAC.find((x) => x.subRole === "estudiante_regular")!
    return { user: defaultStudent, subRole: "estudiante_regular", parentRole: "estudiante" }
  }

  // Handle direct login from email submit
  function handleEmailSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault()
    if (!emailInput.trim()) return

    const match = findUserByEmail(emailInput)
    onLogin(match.parentRole, match.subRole)
  }

  // Quick account selection - DIRECT 1-CLICK LOGIN
  function handleSelectQuickAccount(email: string) {
    const match = findUserByEmail(email)
    const subInfo = SUB_ROLES[match.subRole]
    if (subInfo) {
      onLogin(subInfo.parentRole, match.subRole)
    } else {
      onLogin(match.parentRole, match.subRole)
    }
  }

  // Manual role picker helpers
  const activeRole = ROLES[selectedRole]
  const availableSubRoles = Object.values(SUB_ROLES).filter((sr) => sr.parentRole === selectedRole)

  function handleManualRoleSelect(id: RoleId) {
    setSelectedRole(id)
    const firstSub = Object.values(SUB_ROLES).find((sr) => sr.parentRole === id)
    if (firstSub) {
      setSelectedSubRole(firstSub.id)
    }
  }

  return (
    <main className="min-h-dvh w-full bg-background lg:grid lg:grid-cols-1 sm:grid-cols-2">
      {/* Visual Editorial Hero Side (Left) */}
      <section className="relative hidden flex-col justify-between overflow-hidden p-12 lg:flex">
        <Image
          src="/campus-hero.png"
          alt="Campus UNICAMACHO"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        <div className="relative flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg">
            <Building2 className="size-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">UNICAMACHO</p>
            <p className="text-sm font-extrabold text-foreground">Plataforma de Campus Inteligente</p>
          </div>
        </div>

        <div className="relative max-w-md space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-muted/40 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
            <ShieldCheck className="size-3.5" />
            <span>Autenticación Granular · 13 Perfiles</span>
          </div>
          <h2 className="text-balance text-2xl font-black tracking-tight text-foreground">
            Control de Gestión e Infraestructura
          </h2>
          <p className="text-pretty text-xs text-muted-foreground leading-relaxed">
            Aulas, biblioteca, servicios IT, inventario y solicitudes académicas sincronizados en un solo sistema.
          </p>
        </div>
      </section>

      {/* Login Form Panel (Right) */}
      <section className="flex min-h-dvh items-center justify-center px-6 py-10">
        <div className="w-full max-w-md space-y-4">
          
          {/* Unified Single Title Header */}
          <div className="space-y-1.5 text-left border-b border-border/60 pb-5">
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <Building2 className="size-5" />
              </div>
              <h1 className="text-2xl font-black tracking-tight text-foreground">SmartCampus</h1>
            </div>
            <p className="text-xs text-muted-foreground font-medium">
              Acceso Institucional · Seleccione un perfil para ingresar al sistema
            </p>
          </div>

          {/* STEP 1: EMAIL INPUT & DIRECT QUICK ACCOUNT SELECT */}
          {step === "email" && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-foreground">
                    Correo Institucional
                  </label>
                  <div className="relative">
                    <Mail
                      className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <input
                      id="email"
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="usuario@smartcampus.edu.co"
                      required
                      className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-xs font-medium text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm"
                    />
                  </div>
                </div>

                <Button type="submit" className="h-11 w-full rounded-lg text-xs font-semibold shadow" size="lg">
                  <span>Ingresar con Correo</span>
                  <ArrowRight className="size-4 ml-1.5" />
                </Button>
              </form>

              {/* Quick Select Accounts Grid (Direct 1-Click Login) */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground flex items-center gap-1.5">
                    <UserCheck className="size-3.5 text-primary" />
                    Perfiles de Prueba (Ingreso Directo):
                  </span>
                  <span className="text-[10px] font-bold text-primary bg-muted/40 px-2 py-0.5 rounded-md">
                    13 Sub-Roles RBAC
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-1 sm:grid-cols-2 max-h-64 overflow-y-auto pr-1">
                  {INITIAL_USUARIOS_RBAC.map((usr) => {
                    const subInfo = SUB_ROLES[usr.subRole]
                    return (
                      <button
                        key={usr.id}
                        type="button"
                        onClick={() => handleSelectQuickAccount(usr.email)}
                        className="flex items-center gap-2.5 rounded-lg border border-border/80 bg-card p-2 text-left hover:border-primary hover:bg-primary/5 transition-all group shadow-xs"
                      >
                        <div className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-muted/40 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-xs font-bold">
                          {usr.nombre.split(' ').map(n=>n[0]).join('').slice(0,2)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-foreground truncate group-hover:text-primary transition-colors">
                            {usr.nombre}
                          </p>
                          <p className="text-[10px] text-muted-foreground truncate">
                            {subInfo ? subInfo.name : usr.subRole}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setStep("manual")}
                  className="w-full py-2.5 text-center text-xs font-semibold text-primary hover:underline flex items-center justify-center gap-1.5 bg-primary/5 rounded-xl border border-border/60"
                >
                  <Layers className="size-3.5" />
                  <span>Ver Todos los Perfiles por Categoría (Catálogo)</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP MANUAL: CATALOG EXPLORER */}
          {step === "manual" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground">Catálogo de Permisos RBAC</span>
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  ← Volver a prueba rápida
                </button>
              </div>

              {/* Main Role picker */}
              <div className="grid grid-cols-5 gap-1.5">
                {ROLE_ORDER.map((id) => {
                  const role = ROLES[id]
                  const Icon = role.icon
                  const isActive = id === selectedRole
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => handleManualRoleSelect(id)}
                      className={`flex flex-col items-center gap-1 rounded-lg border p-2 text-center transition-all ${
                        isActive
                          ? "border-primary bg-muted/40 text-primary font-bold shadow-xs"
                          : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                      }`}
                    >
                      <Icon className="size-4" />
                      <span className="text-[10px] font-medium leading-tight truncate w-full">{role.name}</span>
                    </button>
                  )
                })}
              </div>

              {/* Sub-Role Selector */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-foreground">
                  Sub-Perfiles para {activeRole.name}:
                </p>
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {availableSubRoles.map((sub) => {
                    const isSelected = sub.id === selectedSubRole
                    const SubIcon = sub.icon
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => setSelectedSubRole(sub.id)}
                        className={`w-full flex items-center gap-3 rounded-lg p-2.5 text-left border text-xs transition-all ${
                          isSelected
                            ? "border-primary bg-primary/5 text-foreground ring-1 ring-primary font-semibold"
                            : "border-border/60 bg-card/60 text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        <SubIcon className={`size-4 shrink-0 ${isSelected ? "text-primary" : ""}`} />
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-foreground truncate">{sub.name}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{sub.badge}</p>
                        </div>
                        {isSelected && <Check className="size-4 text-primary shrink-0" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              <Button
                type="button"
                onClick={() => onLogin(selectedRole, selectedSubRole)}
                className="h-11 w-full rounded-lg text-xs font-semibold shadow" size="lg"
              >
                Ingresar como {SUB_ROLES[selectedSubRole].name}
              </Button>
            </div>
          )}

        </div>
      </section>
    </main>
  )
}

