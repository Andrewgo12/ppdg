"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"
import type { Salon } from "@/lib/campus-data"

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
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
            <MapPin className="size-5 text-primary" />
            Mapa 2D & Ocupación del Campus en Tiempo Real
          </h2>
          <p className="text-xs text-muted-foreground">
            Sede Principal Av. 6 · Filtra por bloque y revisa el estado técnico de cada aula.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={sedeFilter}
            onChange={(e) => setSedeFilter(e.target.value)}
            className="rounded-xl border border-input bg-card px-3 py-1.5 text-xs text-foreground outline-none"
          >
            <option value="todas">Todas las Sedes</option>
            <option value="Sede Principal Av. 6">Sede Principal Av. 6</option>
            <option value="Sede Sur">Sede Sur</option>
          </select>

          <select
            value={bloqueFilter}
            onChange={(e) => setBloqueFilter(e.target.value)}
            className="rounded-xl border border-input bg-card px-3 py-1.5 text-xs text-foreground outline-none"
          >
            <option value="todos">Todos los Bloques</option>
            <option value="Bloque A">Bloque A</option>
            <option value="Bloque B">Bloque B</option>
            <option value="Bloque C">Bloque C</option>
            <option value="Biblioteca UniBiblio">Biblioteca</option>
            <option value="Zonas Comunes">Zonas Comunes</option>
          </select>
        </div>
      </div>

      {/* Real-time Campus Metrics */}
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-3 space-y-1">
          <p className="text-[11px] font-semibold text-muted-foreground">Tasa de Ocupación</p>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-foreground">{tasaOcupacion}%</span>
            <span className="text-[10px] text-muted-foreground">({ocupados} de {totalSalones} aulas)</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-primary transition-all" style={{ width: `${tasaOcupacion}%` }} />
          </div>
        </div>

        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 space-y-1">
          <p className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">Aulas Libres</p>
          <p className="text-xl font-bold text-emerald-700 dark:text-emerald-400">{disponibles} Disponibles</p>
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400">Listas para clases o estudio</p>
        </div>

        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 space-y-1">
          <p className="text-[11px] font-semibold text-amber-800 dark:text-amber-300">En Mantenimiento</p>
          <p className="text-xl font-bold text-amber-700 dark:text-amber-400">{mantenimiento} Salones</p>
          <p className="text-[10px] text-amber-600 dark:text-amber-400">Intervención técnica activa</p>
        </div>

        <div className="rounded-lg border border-border bg-card p-3 space-y-1">
          <p className="text-[11px] font-semibold text-muted-foreground">Aforo Total Acumulado</p>
          <p className="text-xl font-bold text-foreground">{aforoTotal} Personas</p>
          <p className="text-[10px] text-muted-foreground">Capacidad en zonas seleccionadas</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 rounded-lg bg-card border border-border p-3 text-xs">
        <div className="flex items-center gap-1.5"><span className="size-3 rounded-full bg-emerald-500" /><span>Verde: Libre/Disponible</span></div>
        <div className="flex items-center gap-1.5"><span className="size-3 rounded-full bg-rose-500" /><span>Rojo: Clase en Curso</span></div>
        <div className="flex items-center gap-1.5"><span className="size-3 rounded-full bg-amber-500" /><span>Gris: En Mantenimiento</span></div>
        <div className="flex items-center gap-1.5"><span className="size-3 rounded-full bg-blue-500" /><span>Azul: Reservado</span></div>
        <div className="flex items-center gap-1.5"><span className="size-3 rounded-full bg-purple-600 animate-pulse" /><span>⚡ Púrpura: Riesgo Eléctrico</span></div>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {filteredSalones.map((salon) => {
          const isDisp = salon.estado === "disponible"
          const isOcup = salon.estado === "ocupado"
          const isMant = salon.estado === "mantenimiento"
          const isRes = salon.estado === "reservado"

          return (
            <div
              key={salon.id}
              onClick={() => onSelectSalon(salon)}
              className={`group relative flex flex-col justify-between rounded-xl border p-4 transition-all cursor-pointer hover:shadow-lg ${
                isDisp ? "border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500" :
                isOcup ? "border-rose-500/30 bg-rose-500/5 hover:border-rose-500" :
                isMant ? "border-amber-500/30 bg-amber-500/5 hover:border-amber-500" :
                isRes ? "border-blue-500/30 bg-blue-500/5 hover:border-blue-500" :
                "border-purple-600 bg-purple-900/10 text-purple-200 animate-pulse"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-muted-foreground">{salon.bloque} · {salon.piso}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    isDisp ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300" :
                    isOcup ? "bg-rose-500/20 text-rose-700 dark:text-rose-300" :
                    isMant ? "bg-amber-500/20 text-amber-700 dark:text-amber-300" :
                    isRes ? "bg-blue-500/20 text-blue-700 dark:text-blue-300" : "bg-purple-600 text-white"
                  }`}>
                    {salon.estado}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-foreground group-hover:text-primary">{salon.nombre}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Capacidad: {salon.capacidad} personas</p>
                {salon.responsable && (
                  <p className="mt-2 text-xs font-medium text-foreground bg-background/60 p-2 rounded-xl">👤 {salon.responsable}</p>
                )}
              </div>
              <div className="mt-3 pt-2 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Clima: {salon.temperatura || "22°C"}</span>
                <span className="font-semibold text-primary">Ver detalle ➔</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
