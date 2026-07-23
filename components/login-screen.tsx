"use client"

import { useState, useEffect, useRef } from "react"
import { Building2, Mail, ArrowRight, Layers, ChevronRight, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ROLES, ROLE_ORDER, SUB_ROLES, INITIAL_USUARIOS_RBAC, type RoleId, type SubRoleId, type UsuarioRBAC } from "@/lib/campus-data"

interface LoginScreenProps {
  onLogin: (role: RoleId, subRole: SubRoleId) => void
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [step, setStep] = useState<"email" | "manual">("email")
  const [emailInput, setEmailInput] = useState("monica.salazar@smartcampus.edu.co")

  const [selectedRole, setSelectedRole] = useState<RoleId>("admin")
  const [selectedSubRole, setSelectedSubRole] = useState<SubRoleId>("super_admin")

  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Lightweight Particle Canvas Animation (Gemini / Antigravity Style)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    window.addEventListener("resize", handleResize)

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2,
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${p.alpha})`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 * (1 - dist / 100)})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

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

    const defaultStudent = INITIAL_USUARIOS_RBAC.find((x) => x.subRole === "estudiante_regular")!
    return { user: defaultStudent, subRole: "estudiante_regular", parentRole: "estudiante" }
  }

  function handleEmailSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault()
    if (!emailInput.trim()) return

    const match = findUserByEmail(emailInput)
    onLogin(match.parentRole, match.subRole)
  }

  function handleSelectQuickAccount(email: string) {
    const match = findUserByEmail(email)
    const subInfo = SUB_ROLES[match.subRole]
    if (subInfo) {
      onLogin(subInfo.parentRole, match.subRole)
    } else {
      onLogin(match.parentRole, match.subRole)
    }
  }

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
    <main className="h-screen max-h-screen w-full bg-[#070B14] text-slate-100 grid grid-cols-1 lg:grid-cols-12 font-sans antialiased overflow-hidden">
      
      {/* COLUMNA IZQUIERDA: HERO ANIMADO COMPACTO (7 COLS) */}
      <section className="relative hidden lg:flex lg:col-span-7 flex-col justify-between p-8 bg-gradient-to-br from-[#0A0F1D] via-[#0D152A] to-[#070B14] border-r border-slate-800/60 overflow-hidden h-full">
        {/* Canvas Animado de Partículas */}
        <canvas ref={canvasRef} className="absolute inset-0 size-full pointer-events-none opacity-60" />

        {/* Halo de Luz animado */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-72 rounded-full bg-blue-600/10 blur-3xl animate-pulse pointer-events-none" />

        {/* Header Minimalista */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 backdrop-blur-md shadow-md shadow-blue-500/10">
            <Building2 className="size-4" />
          </div>
          <div>
            <p className="text-[9px] font-mono tracking-widest text-blue-400 font-bold uppercase">
              UNICAMACHO
            </p>
            <h1 className="text-xs font-bold text-white tracking-tight">
              SmartCampus
            </h1>
          </div>
        </div>

        {/* Emblema Central Animado (Escudo 3D Institucional de Gran Tamaño) */}
        <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center space-y-6">
          <div className="relative flex items-center justify-center">
            {/* Aura de Luz Externa */}
            <div className="absolute size-52 rounded-full bg-gradient-to-tr from-blue-600/20 via-indigo-500/10 to-[#D4A017]/10 blur-2xl animate-pulse" />
            
            {/* Anillos Giratorios de Alta Precisión */}
            <div className="absolute size-48 rounded-full border border-blue-500/30 border-t-[#D4A017] animate-spin transition-all shadow-lg" style={{ animationDuration: "14s" }} />
            <div className="absolute size-36 rounded-full border border-indigo-400/20 border-b-blue-400 animate-spin" style={{ animationDuration: "9s", animationDirection: "reverse" }} />
            
            {/* Escudo Metalizado de Alta Seguridad */}
            <div className="relative flex size-28 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#0F2043] via-[#1E293B] to-[#0F172A] border-2 border-[#D4A017]/60 text-white shadow-2xl shadow-blue-900/50 transition-all duration-300 hover:scale-105 group backdrop-blur-md">
              <div className="absolute inset-1 rounded-xl border border-white/10" />
              <div className="flex flex-col items-center justify-center space-y-1">
                <Building2 className="size-10 text-[#D4A017] group-hover:scale-110 transition-transform duration-300" />
                <span className="text-[8px] font-mono font-bold tracking-widest text-white/90 uppercase">UNICAMACHO</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5 max-w-sm">
            <h2 className="text-2xl font-black tracking-tight text-white leading-tight">
              Plataforma de Campus Inteligente
            </h2>
            <p className="text-xs text-slate-300 font-medium">
              Gestión Operativa & Acceso Institucional Granular
            </p>
          </div>
        </div>

        {/* Footer Sutil */}
        <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-400 font-mono border-t border-slate-800/80 pt-3 pl-12 pr-4">
          <span className="flex items-center gap-1.5 text-[#D4A017] font-bold truncate">
            <ShieldCheck className="size-3.5 shrink-0" /> CONEXIÓN SEGURA ENCRIPTADA (JWT RBAC)
          </span>
          <span className="shrink-0">Sedes: Av. 6 | Sur · Cali</span>
        </div>
      </section>

      {/* SECCIÓN DERECHA: FORMULARIO RESPONSIVO COMPACTO (5 COLS) */}
      <section className="col-span-1 lg:col-span-5 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#0A0E1A] h-full overflow-hidden">
        <div className="w-full max-w-md space-y-3.5 flex flex-col justify-center max-h-full">
          
          {/* Header Formulario */}
          <div className="space-y-0.5 text-left border-b border-slate-800/80 pb-3 shrink-0">
            <h3 className="text-sm sm:text-base font-bold tracking-tight text-slate-100">
              Iniciar Sesión
            </h3>
            <p className="text-[11px] text-slate-400">
              Seleccione una cuenta de usuario o ingrese su correo institucional.
            </p>
          </div>

          {/* STEP 1: EMAIL INPUT & SELECCIÓN DE CUENTAS */}
          {step === "email" && (
            <div className="space-y-3 animate-in fade-in duration-300 overflow-hidden flex flex-col">
              <form onSubmit={handleEmailSubmit} className="space-y-2 shrink-0">
                <div className="space-y-1">
                  <label htmlFor="email" className="text-[11px] font-semibold text-slate-300">
                    Correo Institucional
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-500" />
                    <input
                      id="email"
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="usuario@unicamacho.edu.co"
                      required
                      className="w-full h-8 px-2.5 pl-8 rounded-lg border border-slate-800 bg-slate-900/90 text-xs text-slate-100 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all duration-200 shadow-xs"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="h-8.5 w-full rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 shadow-md shadow-blue-600/20 gap-1.5"
                >
                  <span>Ingresar al Sistema</span>
                  <ArrowRight className="size-3.5" />
                </Button>
              </form>

              {/* Lista de Cuentas Directas en 2 Columnas Compactas para Enfitar la Ventana */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800/80 overflow-hidden flex flex-col">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 shrink-0">
                  <span>Directorio de Cuentas RBAC:</span>
                  <span className="text-[9px] text-blue-400 font-bold bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.2 rounded-full">
                    13 Perfiles
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 overflow-y-auto max-h-[38vh] pr-1">
                  {INITIAL_USUARIOS_RBAC.map((usr) => {
                    const subInfo = SUB_ROLES[usr.subRole]
                    return (
                      <button
                        key={usr.id}
                        type="button"
                        onClick={() => handleSelectQuickAccount(usr.email)}
                        className="flex items-center justify-between p-1.5 rounded-lg border border-slate-800/80 bg-slate-900/40 hover:bg-slate-800/60 hover:border-blue-500/50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 text-left group shadow-xs"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="size-6 shrink-0 rounded-md bg-blue-600/10 border border-blue-500/20 text-blue-400 font-bold text-[10px] flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                            {usr.nombre.split(' ').map(n=>n[0]).join('').slice(0,2)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[11px] font-bold text-slate-200 truncate group-hover:text-white transition-colors leading-tight">
                              {usr.nombre.split(' ')[0]} {usr.nombre.split(' ')[1]?.[0]}.
                            </p>
                            <p className="text-[9px] text-slate-400 truncate leading-tight">
                              {subInfo ? subInfo.name : usr.subRole}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="size-3 text-slate-500 group-hover:text-blue-400 transition-all shrink-0" />
                      </button>
                    )
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setStep("manual")}
                  className="w-full py-1.5 text-center text-[11px] font-semibold text-slate-400 hover:text-white hover:bg-slate-800/50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-1 bg-slate-900/50 rounded-lg border border-slate-800 mt-1 shrink-0"
                >
                  <Layers className="size-3.5" />
                  <span>Ver Catálogo Completo por Roles</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CATÁLOGO MANUAL DE ROLES */}
          {step === "manual" && (
            <div className="space-y-3 animate-in fade-in duration-300 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span className="font-bold text-slate-200">Matriz de Roles RBAC</span>
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="text-[11px] font-semibold text-blue-400 hover:underline"
                >
                  ← Volver
                </button>
              </div>

              {/* Main Role picker */}
              <div className="grid grid-cols-5 gap-1">
                {ROLE_ORDER.map((id) => {
                  const role = ROLES[id]
                  const Icon = role.icon
                  const isActive = id === selectedRole
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => handleManualRoleSelect(id)}
                      className={`flex flex-col items-center justify-center p-1.5 rounded-lg border text-center transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] ${
                        isActive
                          ? "bg-blue-600 text-white border-blue-500 font-bold shadow-md shadow-blue-600/20"
                          : "border-slate-800 bg-slate-900/40 text-slate-400 hover:bg-slate-800"
                      }`}
                    >
                      <Icon className="size-3.5 mb-0.5" />
                      <span className="text-[9px] leading-tight">{role.name}</span>
                    </button>
                  )
                })}
              </div>

              {/* Subrole picker */}
              <div className="space-y-1 pt-1">
                <span className="text-[11px] text-slate-400 font-semibold">Sub-Roles Disponibles:</span>
                <div className="space-y-1 max-h-[30vh] overflow-y-auto pr-1">
                  {availableSubRoles.map((sr) => (
                    <button
                      key={sr.id}
                      type="button"
                      onClick={() => setSelectedSubRole(sr.id)}
                      className={`w-full p-2 text-left rounded-lg border transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-between ${
                        selectedSubRole === sr.id
                          ? "border-blue-500 bg-blue-600/10 text-white font-bold"
                          : "border-slate-800 bg-slate-900/40 text-slate-300 hover:bg-slate-800/50"
                      }`}
                    >
                      <div>
                        <span className="block font-bold text-xs">{sr.name}</span>
                        <span className="text-[9px] text-slate-400 block">{sr.tagline}</span>
                      </div>
                      {selectedSubRole === sr.id && <CheckCircle2 className="size-3.5 text-blue-400 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => onLogin(selectedRole, selectedSubRole)}
                className="w-full h-8.5 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 shadow-md shadow-blue-600/20 mt-1"
              >
                Ingresar como {SUB_ROLES[selectedSubRole]?.name}
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
