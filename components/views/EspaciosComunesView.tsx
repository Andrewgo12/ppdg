"use client"

import { useState } from "react"
import { CalendarCheck, Users, Music, Sparkles, MapPin, CheckCircle2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface EspaciosComunesViewProps {
  onOpenReservaModal: () => void
}

export function EspaciosComunesView({ onOpenReservaModal }: EspaciosComunesViewProps) {
  const [activeSpaceFilter, setActiveSpaceFilter] = useState<string>("todos")

  const espacios = [
    {
      id: "ESP-001",
      nombre: "Auditorio Principal Sede Av. 6",
      tipo: "Auditorio",
      aforo: 350,
      ubicacion: "Bloque A · Piso 1",
      logistica: "Pantalla LED 4K, Sonido Profesional, 350 Sillas",
      estado: "Disponible",
      imagen: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&q=80",
    },
    {
      id: "ESP-002",
      nombre: "Plazoleta Central de Eventos",
      tipo: "Plazoleta",
      aforo: 500,
      ubicacion: "Zona Central Campus",
      logistica: "Tarima Móvil, 4 Carpas 6x6m, Puntos Eléctricos RETIE",
      estado: "Reservado",
      imagen: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&q=80",
    },
    {
      id: "ESP-003",
      nombre: "Cafetería Central (Espacio Cultural)",
      tipo: "Cafetería",
      aforo: 200,
      ubicacion: "Bloque C · Piso 1",
      logistica: "Mesas Modulares, Amplificación para Talleres y Danza",
      estado: "Disponible",
      imagen: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&q=80",
    },
  ]

  const filteredEspacios = espacios.filter(
    (e) => activeSpaceFilter === "todos" || e.tipo.toLowerCase() === activeSpaceFilter.toLowerCase()
  )

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
            <CalendarCheck className="size-5 text-primary" />
            Reserva de Espacios Comunes, Auditorios & Eventos Culturales
          </h2>
          <p className="text-xs text-muted-foreground">
            Gestión formal para talleres de danza, música, teatro, debates y ceremonias institucionales.
          </p>
        </div>

        <Button onClick={onOpenReservaModal} className="rounded-full gap-2 text-xs font-bold">
          <Sparkles className="size-4" />
          Solicitar Reserva de Espacio
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 text-xs">
        {["todos", "auditorio", "plazoleta", "cafetería"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSpaceFilter(tab)}
            className={`rounded-full px-3 py-1.5 font-semibold capitalize transition-all ${
              activeSpaceFilter === tab
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Spaces Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {filteredEspacios.map((esp) => (
          <div key={esp.id} className="group rounded-xl border border-border bg-card overflow-hidden flex flex-col justify-between transition-all hover:border-primary/50 hover:shadow-xl">
            <div>
              <div className="relative h-44 w-full overflow-hidden bg-muted">
                <img
                  src={esp.imagen}
                  alt={esp.nombre}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className={`absolute top-3 right-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                  esp.estado === "Disponible"
                    ? "bg-emerald-500 text-white"
                    : "bg-rose-500 text-white"
                }`}>
                  {esp.estado}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <span className="text-[10px] font-bold uppercase text-primary bg-muted/40 px-2 py-0.5 rounded-full">
                  {esp.tipo}
                </span>
                <h3 className="text-base font-bold text-foreground">{esp.nombre}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="size-3 text-primary" /> {esp.ubicacion}
                </p>

                <div className="pt-2 text-xs space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Users className="size-3" /> Aforo Máximo:
                    </span>
                    <span className="text-foreground">{esp.aforo} Personas</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground bg-muted/40 p-2 rounded-xl">
                    <span className="font-bold text-foreground">Logística Disponible:</span> {esp.logistica}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <Button
                onClick={() => {
                  toast.success(`📅 Espacio "${esp.nombre}" Seleccionado`, {
                    description: "Formulario de requerimientos logísticos listo."
                  })
                  onOpenReservaModal()
                }}
                variant={esp.estado === "Disponible" ? "default" : "outline"}
                className="w-full rounded-full text-xs font-bold gap-1"
              >
                <Music className="size-3.5" />
                {esp.estado === "Disponible" ? "Reservar Espacio" : "Consultar Disponibilidad"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
