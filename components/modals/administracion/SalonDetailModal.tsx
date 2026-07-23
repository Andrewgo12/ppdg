"use client"

import { Building2, MapPin, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Salon } from "@/lib/campus-data"

interface SalonDetailModalProps {
  isOpen: boolean
  onClose: () => void
  selectedSalon: Salon | null
}

export function SalonDetailModal({
  isOpen,
  onClose,
  selectedSalon,
}: SalonDetailModalProps) {
  if (!isOpen || !selectedSalon) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-foreground/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg w-[95vw] max-h-[85vh] overflow-y-auto rounded-sm border border-border bg-card p-3 shadow-2xl space-y-2.5">
        <button
          onClick={onClose}
          className="absolute right-4 top-3 rounded-sm p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Cerrar modal"
        >
          <X className="size-5" />
        </button>

        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2.5">
            <Building2 className="size-5 text-primary" />
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-foreground">{selectedSalon.nombre}</h3>
              <p className="text-xs text-muted-foreground">{selectedSalon.sede} · {selectedSalon.bloque} - {selectedSalon.piso}</p>
            </div>
          </div>
          <span className="rounded-sm bg-muted/40 px-3 py-1 text-xs font-bold uppercase text-primary">
            {selectedSalon.estado}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-muted/20 p-3 rounded-sm">
          <div>
            <p className="text-muted-foreground">Capacidad Máxima</p>
            <p className="font-semibold text-foreground">{selectedSalon.capacidad} Personas</p>
          </div>
          <div>
            <p className="text-muted-foreground">Telemetría Climatización</p>
            <p className="font-semibold text-foreground">{selectedSalon.temperatura || "22°C"}</p>
          </div>
          {selectedSalon.responsable && (
            <div className="col-span-2">
              <p className="text-muted-foreground">Docente / Ocupante Activo</p>
              <p className="font-semibold text-foreground">{selectedSalon.responsable}</p>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose} className="rounded-sm text-xs">
            Cerrar Ventana
          </Button>
        </div>
      </div>
    </div>
  )
}
