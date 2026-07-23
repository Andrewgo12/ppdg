"use client"

import { useState } from "react"
import Image from "next/image"
import { Building2, Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ROLES, ROLE_ORDER, type RoleId } from "@/lib/campus-data"

interface LoginScreenProps {
  onLogin: (role: RoleId) => void
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [selected, setSelected] = useState<RoleId>("estudiante")
  const activeRole = ROLES[selected]

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onLogin(selected)
  }

  return (
    <main className="min-h-dvh w-full bg-background lg:grid lg:grid-cols-2">
      {/* Brand / hero panel */}
      <section className="relative hidden flex-col justify-between overflow-hidden p-12 lg:flex">
        <Image
          src="/campus-hero.png"
          alt="Campus moderno de UNICAMACHO"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />

        <div className="relative flex items-center gap-3 text-background">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-background/15 backdrop-blur">
            <Building2 className="size-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight">SmartCampus</p>
            <p className="text-sm text-background/80">UNICAMACHO · Cali</p>
          </div>
        </div>

        <div className="relative max-w-md space-y-4 text-background">
          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight">
            Un solo campus. Digital y transparente.
          </h1>
          <p className="text-pretty leading-relaxed text-background/85">
            Consulta salones en tiempo real, reporta fallas con evidencia y gestiona biblioteca e
            insumos. Cada perfil accede únicamente a lo que le corresponde.
          </p>
        </div>
      </section>

      {/* Form panel */}
      <section className="flex min-h-dvh items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-md">
          {/* Mobile brand */}
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Building2 className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-base font-semibold tracking-tight text-foreground">
                SmartCampus UniCamacho
              </p>
              <p className="text-xs text-muted-foreground">Cali · Colombia</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">Iniciar sesión</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Selecciona tu perfil para ver tu panel personalizado.
            </p>
          </div>

          {/* Role picker */}
          <div className="mb-7">
            <p className="mb-2.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Perfil
            </p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {ROLE_ORDER.map((id) => {
                const role = ROLES[id]
                const Icon = role.icon
                const isActive = id === selected
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelected(id)}
                    aria-pressed={isActive}
                    className={`flex flex-col items-center gap-1.5 rounded-2xl border p-3 text-center transition-colors ${
                      isActive
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                    <span className="text-[11px] font-medium leading-tight">{role.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Correo institucional
              </label>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  id="email"
                  type="email"
                  key={activeRole.id}
                  defaultValue={`${activeRole.id}@unicamacho.edu.co`}
                  className="w-full rounded-2xl border border-input bg-card py-2.5 pl-11 pr-3 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Contraseña
              </label>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  id="password"
                  type="password"
                  defaultValue="demo1234"
                  className="w-full rounded-2xl border border-input bg-card py-2.5 pl-11 pr-3 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" defaultChecked className="size-4 accent-primary" />
                Recordarme
              </label>
              <button type="button" className="font-medium text-primary hover:underline">
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <Button type="submit" className="h-11 w-full rounded-full text-sm" size="lg">
              Entrar como {activeRole.name}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Demo visual · No se envían datos reales. Cualquier contraseña funciona.
          </p>
        </div>
      </section>
    </main>
  )
}
