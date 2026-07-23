"use client"

import { useState } from "react"
import { Building2, Bell, LogOut, Menu, Search, X, Check, AlertCircle, Info, Sparkles, Cpu, ShieldCheck } from "lucide-react"
import {
  ROLES,
  SUB_ROLES,
  INITIAL_NOTIFICACIONES,
  type RoleId,
  type SubRoleId,
  type StatTone,
  type ViewKey,
  type NotificacionPush,
} from "@/lib/campus-data"
import { RoleContent } from "@/components/role-content"
import { CarnetDigitalModal } from "@/components/modals/CarnetDigitalModal"
import { GlobalSearchModal } from "@/components/modals/GlobalSearchModal"
import { CreditCard, MapPin } from "lucide-react"

interface DashboardProps {
  roleId: RoleId
  initialSubRoleId?: SubRoleId
  onLogout: () => void
}

const TONE_STYLES: Record<StatTone, string> = {
  primary: "text-primary",
  accent: "text-accent",
  warning: "text-chart-3",
  danger: "text-destructive",
  neutral: "text-foreground",
}

export function Dashboard({ roleId, initialSubRoleId, onLogout }: DashboardProps) {
  const role = ROLES[roleId]
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeView, setActiveView] = useState<ViewKey>("inicio")
  const [notifOpen, setNotifOpen] = useState(false)
  const [carnetOpen, setCarnetOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeSede, setActiveSede] = useState<string>("Sede Principal Av. 6")
  const [notificaciones, setNotificaciones] = useState<NotificacionPush[]>(INITIAL_NOTIFICACIONES)

  // Sub-role selection state
  const [subRoleId, setSubRoleId] = useState<SubRoleId>(
    initialSubRoleId ||
      (roleId === "estudiante"
        ? "estudiante_regular"
        : roleId === "docente"
        ? "docente_regular"
        : roleId === "tecnico"
        ? "tecnico_it"
        : roleId === "almacen"
        ? "almacenista"
        : "super_admin")
  )

  const activeSubRole = SUB_ROLES[subRoleId]
  const RoleIcon = role.icon
  const isHome = activeView === "inicio"
  const unreadCount = notificaciones.filter((n) => !n.leida).length

  function markAllNotifsRead() {
    setNotificaciones(notificaciones.map((n) => ({ ...n, leida: true })))
  }

  const sidebar = (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Building2 className="size-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight">SmartCampus</p>
          <p className="truncate text-xs text-muted-foreground">SmartCampus Platform</p>
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
        {(activeSubRole?.nav || role.nav).map((item) => {
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
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
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

      <div className="border-t border-sidebar-border p-3 space-y-2">
        <button
          type="button"
          onClick={() => setCarnetOpen(true)}
          className="flex w-full items-center gap-2 rounded-xl bg-muted/40 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors"
        >
          <CreditCard className="size-4" />
          <span>Ver Mi Carnet Digital</span>
        </button>

        <div className="flex items-center gap-3 rounded-lg px-2 py-1.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground">
            {activeSubRole ? activeSubRole.avatar : role.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{activeSubRole ? activeSubRole.fullName : role.fullName}</p>
            <p className="truncate text-xs text-muted-foreground">{activeSubRole ? activeSubRole.name : role.title}</p>
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
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-sidebar-border lg:block h-full">
        <div className="h-full w-64 border-r border-sidebar-border">{sidebar}</div>
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
      <div className="flex min-w-0 flex-1 flex-col h-full overflow-hidden">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/80 px-4 py-1.5 sm:py-2 backdrop-blur sm:px-3 sm:px-4">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-xl p-2 text-foreground hover:bg-muted lg:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="size-5" />
          </button>

          <div className="relative hidden max-w-sm flex-1 sm:block">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex w-full items-center justify-between rounded-full border border-input bg-card py-1.5 pl-3 pr-3 text-xs text-muted-foreground hover:border-primary transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Search className="size-3.5 text-primary" />
                <span>Buscar salón, ticket o insumo...</span>
              </span>
              <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">Ctrl+K</kbd>
            </button>
          </div>

          <div className="ml-auto flex items-center gap-2 relative">
            {/* Campus Sede Selector */}
            <div className="hidden md:flex items-center gap-1 bg-muted/50 p-1 rounded-full border border-border text-xs">
              <MapPin className="size-3.5 text-primary ml-1.5" />
              <select
                value={activeSede}
                onChange={(e) => setActiveSede(e.target.value)}
                className="bg-transparent text-xs font-semibold text-foreground outline-none pr-2 cursor-pointer"
              >
                <option value="Sede Principal Av. 6">Sede Av. 6</option>
                <option value="Sede Sur">Sede Sur</option>
              </select>
            </div>

            {/* Notification Bell */}
            <button
              type="button"
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Notificaciones"
            >
              <Bell className="size-5" />
              {unreadCount > 0 && (
                <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Popover Panel */}
            {notifOpen && (
              <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-xl border border-border bg-card p-4 shadow-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                    <Sparkles className="size-4 text-primary" /> Notificaciones Push Campus
                  </h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotifsRead}
                      className="text-[11px] font-semibold text-primary hover:underline"
                    >
                      Marcar leídas
                    </button>
                  )}
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {notificaciones.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 rounded-lg border text-xs space-y-1 transition-all ${
                        !n.leida ? "bg-primary/5 border-primary/30" : "bg-muted/20 border-border"
                      }`}
                    >
                      <p className="font-semibold text-foreground flex items-center justify-between">
                        <span>{n.titulo}</span>
                        <span className="text-[10px] text-muted-foreground">{n.fecha}</span>
                      </p>
                      <p className="text-muted-foreground leading-relaxed">{n.mensaje}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Role User Badge */}
            <div className="flex items-center gap-2 rounded-sm bg-card py-1 pl-1 pr-3 border border-border/60">
              <span className="flex size-6 items-center justify-center rounded-sm bg-primary text-[10px] font-bold text-primary-foreground">
                {activeSubRole ? activeSubRole.avatar : role.avatar}
              </span>
              <span className="hidden text-[11px] font-bold text-foreground sm:inline">
                {activeSubRole ? activeSubRole.fullName : role.fullName}
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-4">
            {isHome && (
              <>
                {/* Greeting */}
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/40 pb-3">
                  <div className="flex items-start gap-2.5">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary">
                      <RoleIcon className="size-4" aria-hidden="true" />
                    </span>
                    <div>
                      <h1 className="text-sm font-bold text-foreground">
                        Bienvenido, {activeSubRole ? activeSubRole.fullName : role.fullName}
                      </h1>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {activeSubRole ? activeSubRole.tagline : role.tagline}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-sm bg-muted/30 px-2.5 py-1 text-[10px] font-mono font-bold text-primary border border-border/60">
                    ROL: {role.name.toUpperCase()}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {role.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-sm border border-border/60 bg-card p-3 space-y-1"
                    >
                      <p className="text-[10px] font-mono text-muted-foreground uppercase">{stat.label}</p>
                      <p
                        className={`text-base font-bold font-mono ${TONE_STYLES[stat.tone]}`}
                      >
                        {stat.value}
                      </p>
                      <p className="text-[9px] text-muted-foreground font-mono">{stat.hint}</p>
                    </div>
                  ))}
                </div>

                {/* Quick modules */}
                <section>
                  <h2 className="mb-3 text-sm font-semibold tracking-tight text-foreground">
                    Tus Módulos de Operación
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {role.modules.map((mod) => {
                      const Icon = mod.icon
                      return (
                        <div
                          key={mod.title}
                          className="group flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md"
                        >
                          <span className="flex size-9 items-center justify-center rounded-lg bg-muted/40 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                            <Icon className="size-5" aria-hidden="true" />
                          </span>
                          <span className="font-medium text-foreground">{mod.title}</span>
                          <span className="text-sm leading-relaxed text-muted-foreground">
                            {mod.description}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </section>
              </>
            )}

            {/* Role + view specific content */}
            <RoleContent
              currentRole={roleId}
              activeView={activeView}
              currentSubRole={subRoleId}
              onSelectSubRole={(newSubRole) => {
                setSubRoleId(newSubRole)
                setActiveView("inicio")
              }}
            />
          </div>
        </main>
      </div>



      <CarnetDigitalModal
        isOpen={carnetOpen}
        onClose={() => setCarnetOpen(false)}
        subRoleInfo={activeSubRole || SUB_ROLES.estudiante_regular}
      />

      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectResult={(view) => setActiveView(view as ViewKey)}
      />
    </div>
  )
}
