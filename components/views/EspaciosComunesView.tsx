"use client"

import { useState } from "react"
import { CalendarCheck, Sparkles, MapPin, Users, Clock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EspaciosComunesViewProps {
  onOpenReservaModal: () => void
}

export function EspaciosComunesView({ onOpenReservaModal }: EspaciosComunesViewProps) {
  const [activeSpaceFilter, setActiveSpaceFilter] = useState<string>("todos")

  const espacios = [
    {
      id: "ESP-001",
      nombre: "Auditorio Principal Av. 6",
      tipo: "Auditorio",
      aforo: 350,
      ubicacion: "Bloque A · Piso 1",
      logistica: "Pantalla LED 4K, Sonido Profesional",
      estado: "Disponible",
      proximaReserva: "14:00 - Ensayo Banda",
    },
    {
      id: "ESP-002",
      nombre: "Plazoleta Central de Eventos",
      tipo: "Plazoleta",
      aforo: 500,
      ubicacion: "Zona Central Campus",
      logistica: "Tarima Móvil, Puntos Eléctricos RETIE",
      estado: "Reservado",
      proximaReserva: "16:00 - Festival Folclórico",
    },
    {
      id: "ESP-003",
      nombre: "Cafetería Central (Espacio Cultural)",
      tipo: "Cafetería",
      aforo: 200,
      ubicacion: "Bloque C · Piso 1",
      logistica: "Mesas Modulares, Amplificación",
      estado: "Disponible",
      proximaReserva: "Sin eventos hoy",
    },
  ]

  const filteredEspacios = espacios.filter(
    (e) => activeSpaceFilter === "todos" || e.tipo.toLowerCase() === activeSpaceFilter.toLowerCase()
  )

  return (
    <section className="space-y-4 text-xs font-sans">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div>
          <h2 className="text-[13px] font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
            <CalendarCheck className="size-4 text-primary" />
            Agenda & Cronograma de Espacios Comunes
          </h2>
          <p className="text-[10px] text-muted-foreground font-mono">
            DISPONIBILIDAD EN TIEMPO REAL // EVENTOS INSTITUCIONALES
          </p>
        </div>

        <Button onClick={onOpenReservaModal} className="h-7 px-3 text-[10px] rounded-sm gap-1 bg-primary text-primary-foreground">
          <Sparkles className="size-3" /> Solicitar Reserva
        </Button>
      </div>

      {/* Timeline Grid */}
      <div className="space-y-3">
        <div className="flex gap-2">
          {["todos", "auditorio", "plazoleta", "cafetería"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSpaceFilter(tab)}
              className={`px-2 py-1 text-[10px] font-mono uppercase rounded-sm border ${
                activeSpaceFilter === tab
                  ? "border-primary bg-primary/10 text-primary font-bold"
                  : "border-border/50 bg-card text-muted-foreground hover:bg-muted/20"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {filteredEspacios.map((esp) => {
            const isDisp = esp.estado === "Disponible"
            return (
              <div key={esp.id} className="border border-border/60 rounded-sm bg-card p-3 flex flex-col justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[9px] text-muted-foreground">{esp.id}</span>
                    <span className={`px-1.5 py-0.5 text-[8px] font-mono font-bold rounded-sm border ${
                      isDisp ? "border-emerald-500/40 text-emerald-600 bg-emerald-500/10" : "border-amber-500/40 text-amber-600 bg-amber-500/10"
                    }`}>
                      {esp.estado.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-[12px] font-bold text-foreground leading-tight">{esp.nombre}</h3>
                  <div className="text-[10px] text-muted-foreground flex items-center gap-1 font-mono">
                    <MapPin className="size-3 text-primary" /> {esp.ubicacion}
                  </div>
                  <div className="text-[10px] text-muted-foreground flex items-center gap-1 font-mono">
                    <Users className="size-3 text-primary" /> Aforo Max: {esp.aforo} PAX
                  </div>
                </div>

                <div className="border-t border-border/40 pt-2 space-y-1 bg-muted/10 p-1.5 rounded-sm">
                  <span className="text-[9px] font-mono text-muted-foreground block">PRÓXIMA ACTIVIDAD:</span>
                  <div className="text-[10px] font-bold text-foreground flex items-center gap-1">
                    <Clock className="size-3 text-amber-500" /> {esp.proximaReserva}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
