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
import CountUp from "@/components/reactbits/CountUp/CountUp"
import BlurText from "@/components/reactbits/BlurText/BlurText"
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

  const [subRoleId, setSubRoleId] = useState<SubRoleId>(
    initialSubRoleId || (role.defaultSubRole as SubRoleId)
  )

  const activeSubRole = SUB_ROLES[subRoleId]
  const isHome = activeView === "inicio"
  const RoleIcon = activeSubRole ? activeSubRole.icon : role.icon

  return (
    <div className="flex h-screen bg-background font-sans text-foreground overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border/60 bg-card transition-transform duration-200 lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Brand Header */}
          <div className="flex items-center justify-between border-b border-border/60 p-4">
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-sm bg-primary text-primary-foreground shadow-xs">
                <Building2 className="size-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase">
                  UNICAMACHO
                </p>
                <p className="text-xs font-bold text-foreground">SmartCampus</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="rounded-sm p-1 text-muted-foreground hover:bg-muted lg:hidden"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1 text-xs">
            <div className="px-2 py-1 text-[10px] font-mono text-muted-foreground uppercase">
              Vistas ({activeSubRole ? activeSubRole.name : role.name})
            </div>
            {(activeSubRole?.nav || role.nav).map((item) => {
              const Icon = item.icon
              const isActive = activeView === item.key
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    setActiveView(item.key)
                    setMobileOpen(false)
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-sm px-2.5 py-2 font-semibold transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-2xs"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* User profile & Carnet trigger */}
          <div className="border-t border-border/60 p-3 space-y-2">
            <button
              onClick={() => setCarnetOpen(true)}
              className="w-full flex items-center justify-between p-2 rounded-sm bg-muted/40 border border-border/60 text-xs text-foreground hover:bg-muted transition-all"
            >
              <div className="flex items-center gap-2 truncate">
                <CreditCard className="size-4 text-primary shrink-0" />
                <span className="truncate font-bold">Ver Carnet & ARL</span>
              </div>
              <span className="text-[10px] text-primary font-mono font-bold">→</span>
            </button>

            <button
              onClick={onLogout}
              className="w-full flex items-center justify-between p-2 rounded-sm text-xs font-bold text-destructive hover:bg-destructive/10 transition-all"
            >
              <span className="flex items-center gap-2">
                <LogOut className="size-4" />
                <span>Cerrar Sesión</span>
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-14 items-center justify-between border-b border-border/60 bg-card px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="rounded-sm p-1 text-muted-foreground hover:bg-muted lg:hidden"
            >
              <Menu className="size-5" />
            </button>
            
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-sm border border-border/60 bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted transition-all"
            >
              <Search className="size-3.5" />
              <span>Buscar salones, usuarios, libros...</span>
              <kbd className="rounded-xs bg-muted px-1.5 py-0.5 text-[9px] font-mono">⌘K</kbd>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
              <MapPin className="size-3.5 text-primary" />
              <select
                value={activeSede}
                onChange={(e) => setActiveSede(e.target.value)}
                className="bg-transparent border-none text-xs font-bold text-foreground outline-none cursor-pointer"
              >
                <option value="Sede Principal Av. 6">Sede Av. 6</option>
                <option value="Sede Sur">Sede Sur</option>
              </select>
            </div>

            {/* Notification Bell */}
            <button
              type="button"
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative rounded-sm p-1.5 text-muted-foreground hover:bg-muted transition-all"
            >
              <Bell className="size-4" />
              {notificaciones.some((n) => !n.leida) && (
                <span className="absolute top-1 right-1 size-2 rounded-full bg-primary animate-pulse" />
              )}
            </button>

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
          <div className="mx-auto max-w-7xl space-y-4">
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
                        <BlurText text={`Bienvenido, ${activeSubRole ? activeSubRole.fullName : role.fullName}`} />
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

                {/* Stats con CountUp de React Bits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {role.stats.map((stat) => {
                    const numMatch = stat.value.match(/\d+/)
                    const numVal = numMatch ? parseInt(numMatch[0]) : 0
                    const prefix = stat.value.includes("$") ? "$" : ""
                    const suffix = stat.value.includes("%") ? "%" : stat.value.includes("min") ? " min" : ""

                    return (
                      <div
                        key={stat.label}
                        className="rounded-sm border border-border/60 bg-card p-3 space-y-1 hover:border-primary/40 transition-colors"
                      >
                        <p className="text-[10px] font-mono text-muted-foreground uppercase">{stat.label}</p>
                        <p className={`text-base font-bold font-mono ${TONE_STYLES[stat.tone]}`}>
                          {numVal > 0 ? (
                            <CountUp to={numVal} prefix={prefix} suffix={suffix} duration={1.5} />
                          ) : (
                            stat.value
                          )}
                        </p>
                        <p className="text-[9px] text-muted-foreground font-mono">{stat.hint}</p>
                      </div>
                    )
                  })}
                </div>
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
