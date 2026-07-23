"use client"

import { useState } from "react"
import { Building2, Bell, LogOut, Menu, Search, X } from "lucide-react"
import { ROLES, type RoleId, type StatTone, type ViewKey } from "@/lib/campus-data"
import { RoleContent } from "@/components/role-content"

interface DashboardProps {
  roleId: RoleId
  onLogout: () => void
}

const TONE_STYLES: Record<StatTone, string> = {
  primary: "text-primary",
  accent: "text-accent",
  warning: "text-chart-3",
  danger: "text-destructive",
  neutral: "text-foreground",
}

export function Dashboard({ roleId, onLogout }: DashboardProps) {
  const role = ROLES[roleId]
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeView, setActiveView] = useState<ViewKey>("inicio")
  const RoleIcon = role.icon
  const isHome = activeView === "inicio"

  const sidebar = (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="flex size-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Building2 className="size-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight">SmartCampus</p>
          <p className="truncate text-xs text-muted-foreground">UNICAMACHO</p>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="ml-auto rounded-lg p-1 text-muted-foreground hover:bg-sidebar-accent lg:hidden"
          aria-label="Cerrar menú"
        >
          <X className="size-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {role.nav.map((item) => {
          const Icon = item.icon
          const isActive = item.view === activeView
          return (
            <button
              key={item.view}
              type="button"
              onClick={() => {
                setActiveView(item.view)
                setMobileOpen(false)
              }}
              aria-current={isActive ? "page" : undefined}
              className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon className="size-5 shrink-0" aria-hidden="true" />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-2xl px-2 py-2">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground">
            {role.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{role.fullName}</p>
            <p className="truncate text-xs text-muted-foreground">{role.title}</p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            aria-label="Cerrar sesión"
          >
            <LogOut className="size-5" />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-dvh bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-sidebar-border lg:block">
        <div className="fixed inset-y-0 w-64 border-r border-sidebar-border">{sidebar}</div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 w-72 shadow-2xl">{sidebar}</div>
        </div>
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/80 px-4 py-3 backdrop-blur sm:px-6">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-xl p-2 text-foreground hover:bg-muted lg:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="size-5" />
          </button>

          <div className="relative hidden max-w-sm flex-1 sm:block">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Buscar salón, ticket o insumo..."
              className="w-full rounded-full border border-input bg-card py-2 pl-10 pr-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="relative rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Notificaciones"
            >
              <Bell className="size-5" />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive" />
            </button>
            <div className="flex items-center gap-2 rounded-full bg-card py-1 pl-1 pr-3">
              <span className="flex size-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                {role.avatar}
              </span>
              <span className="hidden text-sm font-medium text-foreground sm:inline">
                {role.name}
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl space-y-6">
            {isHome && (
              <>
                {/* Greeting */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <RoleIcon className="size-6" aria-hidden="true" />
                    </span>
                    <div>
                      <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                        Hola, {role.fullName.split(" ").slice(-1)[0]}
                      </h1>
                      <p className="mt-0.5 text-sm text-muted-foreground">{role.tagline}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                    {role.title}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                  {role.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-3xl border border-border bg-card p-5"
                    >
                      <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                      <p
                        className={`mt-1 text-3xl font-semibold tracking-tight ${TONE_STYLES[stat.tone]}`}
                      >
                        {stat.value}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{stat.hint}</p>
                    </div>
                  ))}
                </div>

                {/* Quick modules */}
                <section>
                  <h2 className="mb-3 text-sm font-semibold tracking-tight text-foreground">
                    Tus módulos
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {role.modules.map((mod) => {
                      const Icon = mod.icon
                      return (
                        <button
                          key={mod.title}
                          type="button"
                          className="group flex flex-col items-start gap-3 rounded-3xl border border-border bg-card p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-md"
                        >
                          <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                            <Icon className="size-5" aria-hidden="true" />
                          </span>
                          <span className="font-medium text-foreground">{mod.title}</span>
                          <span className="text-sm leading-relaxed text-muted-foreground">
                            {mod.description}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </section>
              </>
            )}

            {/* Role + view specific content */}
            <RoleContent roleId={roleId} view={activeView} />
          </div>
        </main>
      </div>
    </div>
  )
}
