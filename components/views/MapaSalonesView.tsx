"use client"

import { useState } from "react"
import { MapPin, Filter, Activity, Thermometer, Info } from "lucide-react"
import type { Salon } from "@/lib/campus-data"
import { Button } from "@/components/ui/button"

interface MapaSalonesViewProps {
  salones: Salon[]
  onSelectSalon: (salon: Salon) => void
}

export function MapaSalonesView({ salones, onSelectSalon }: MapaSalonesViewProps) {
  const [sedeFilter, setSedeFilter] = useState<string>("todas")
  const [bloqueFilter, setBloqueFilter] = useState<string>("todos")

  const filteredSalones = salones.filter(
    (s) =>
      (sedeFilter === "todas" || s.sede === sedeFilter) &&
      (bloqueFilter === "todos" || s.bloque === bloqueFilter)
  )

  const totalSalones = filteredSalones.length
  const disponibles = filteredSalones.filter((s) => s.estado === "disponible").length
  const ocupados = filteredSalones.filter((s) => s.estado === "ocupado").length
  const mantenimiento = filteredSalones.filter((s) => s.estado === "mantenimiento").length
  const aforoTotal = filteredSalones.reduce((acc, s) => acc + (s.capacidad || 0), 0)
  const tasaOcupacion = totalSalones > 0 ? Math.round((ocupados / totalSalones) * 100) : 0

  return (
    <section className="flex flex-col h-full bg-background">
      {/* Control Panel Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 border-b border-border pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-1.5 rounded-sm">
            <MapPin className="size-4 text-primary" />
          </div>
          <div>
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-foreground leading-tight">
              Control de Tráfico Espacial
            </h2>
            <p className="text-[10px] text-muted-foreground font-mono">
              SYS_MAP_AV6 // V 2.1
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="size-3 text-muted-foreground" />
          <select
            value={sedeFilter}
            onChange={(e) => setSedeFilter(e.target.value)}
            className="h-7 rounded-sm border border-border/60 bg-muted/20 px-2 text-[10px] uppercase font-bold outline-none cursor-pointer hover:bg-muted/40"
          >
            <option value="todas">Sede: Todas</option>
            <option value="Sede Principal Av. 6">Sede: Av. 6</option>
            <option value="Sede Sur">Sede: Sur</option>
          </select>

          <select
            value={bloqueFilter}
            onChange={(e) => setBloqueFilter(e.target.value)}
            className="h-7 rounded-sm border border-border/60 bg-muted/20 px-2 text-[10px] uppercase font-bold outline-none cursor-pointer hover:bg-muted/40"
          >
            <option value="todos">Bloque: Todos</option>
            <option value="Bloque A">Blq A</option>
            <option value="Bloque B">Blq B</option>
            <option value="Bloque C">Blq C</option>
            <option value="Biblioteca UniBiblio">Biblio</option>
            <option value="Zonas Comunes">Z.Comunes</option>
          </select>
        </div>
      </div>

      {/* Telemetry Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-4 bg-card border border-border/50 rounded-sm p-2 text-[10px] font-mono">
        <div className="flex-1 flex items-center justify-between px-3 border-r border-border/50">
          <span className="text-muted-foreground">OCUPACIÓN</span>
          <span className="font-bold">{tasaOcupacion}%</span>
        </div>
        <div className="flex-1 flex items-center justify-between px-3 border-r border-border/50">
          <span className="text-emerald-500">LIBRES</span>
          <span className="font-bold">{disponibles}</span>
        </div>
        <div className="flex-1 flex items-center justify-between px-3 border-r border-border/50">
          <span className="text-amber-500">MANTENIMIENTO</span>
          <span className="font-bold">{mantenimiento}</span>
        </div>
        <div className="flex-1 flex items-center justify-between px-3">
          <span className="text-muted-foreground">AFORO MAX</span>
          <span className="font-bold">{aforoTotal} PAX</span>
        </div>
      </div>

      {/* Map Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {filteredSalones.map((salon) => {
          const isDisp = salon.estado === "disponible"
          const isOcup = salon.estado === "ocupado"
          const isMant = salon.estado === "mantenimiento"
          const isRes = salon.estado === "reservado"
          
          let borderColor = "border-purple-600"
          let bgColor = "bg-purple-900/10"
          let textColor = "text-purple-400"
          let statusText = "CRITICO"

          if (isDisp) {
            borderColor = "border-emerald-500/40"
            bgColor = "bg-zinc-700/5 hover:bg-zinc-700/10"
            textColor = "text-zinc-800 dark:text-zinc-200 dark:text-emerald-400"
            statusText = "OK"
          } else if (isOcup) {
            borderColor = "border-rose-500/40"
            bgColor = "bg-rose-500/5 hover:bg-rose-500/10"
            textColor = "text-rose-600 dark:text-rose-400"
            statusText = "IN_USE"
          } else if (isMant) {
            borderColor = "border-amber-500/40"
            bgColor = "bg-zinc-700/5 hover:bg-zinc-700/10"
            textColor = "text-amber-600 dark:text-amber-400"
            statusText = "MAINT"
          } else if (isRes) {
            borderColor = "border-blue-500/40"
            bgColor = "bg-slate-800 dark:bg-slate-700/5 hover:bg-slate-800 dark:bg-slate-700/10"
            textColor = "text-slate-900 dark:text-slate-200 dark:text-blue-400"
            statusText = "RSVD"
          }

          return (
            <div
              key={salon.id}
              onClick={() => onSelectSalon(salon)}
              className={`group flex flex-col justify-between border ${borderColor} ${bgColor} rounded-sm p-2 cursor-pointer transition-colors h-24`}
            >
              <div className="flex justify-between items-start">
                <span className="font-mono text-[11px] font-bold text-foreground">
                  {salon.nombre.substring(0, 8)}
                </span>
                <span className={`text-[8px] font-mono font-bold px-1 rounded-sm border ${borderColor} ${textColor}`}>
                  {statusText}
                </span>
              </div>
              
              <div className="flex flex-col gap-0.5">
                <div className="text-[9px] text-muted-foreground flex items-center gap-1">
                  <Thermometer className="size-2.5" />
                  {salon.temperatura || "22°C"}
                </div>
                <div className="text-[9px] text-muted-foreground flex items-center gap-1">
                  <Activity className="size-2.5" />
                  {salon.capacidad} PAX
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Legend Footer */}
      <div className="mt-4 flex gap-3 text-[9px] font-mono text-muted-foreground border-t border-border/50 pt-2">
        <span className="flex items-center gap-1"><span className="size-1.5 bg-zinc-700 rounded-full"></span> OK = DISPONIBLE</span>
        <span className="flex items-center gap-1"><span className="size-1.5 bg-rose-500 rounded-full"></span> IN_USE = EN CLASE</span>
        <span className="flex items-center gap-1"><span className="size-1.5 bg-zinc-700 rounded-full"></span> MAINT = MANTENIMIENTO</span>
        <span className="flex items-center gap-1"><span className="size-1.5 bg-slate-800 dark:bg-slate-700 rounded-full"></span> RSVD = RESERVADO</span>
        <span className="flex items-center gap-1"><span className="size-1.5 bg-purple-500 rounded-full animate-pulse"></span> CRIT = RIESGO ELECTRICO</span>
      </div>
    </section>
  )
}
