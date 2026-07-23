"use client"

import { RefreshCw, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ReasignacionClasesModalProps {
  isOpen: boolean
  onClose: () => void
  origSalon: string
  setOrigSalon: (val: string) => void
  destSalon: string
  setDestSalon: (val: string) => void
  handleReasignacion: () => void
}

export function ReasignacionClasesModal({
  isOpen,
  onClose,
  origSalon,
  setOrigSalon,
  destSalon,
  setDestSalon,
  handleReasignacion,
}: ReasignacionClasesModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-xl border border-border bg-card p-4 shadow-2xl space-y-4">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Cerrar modal"
        >
          <X className="size-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-border pb-3">
          <RefreshCw className="size-6 text-primary" />
          <div>
            <h3 className="text-base font-bold text-foreground">Reasignación Masiva de Clases</h3>
            <p className="text-xs text-muted-foreground">Director de Programa · Contingencia</p>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-foreground">Salón Afectado (Origen)</label>
          <input
            type="text"
            value={origSalon}
            onChange={(e) => setOrigSalon(e.target.value)}
            className="mt-1 w-full rounded-lg border border-input bg-card p-2.5 text-xs text-foreground outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-foreground">Salón Destino (Disponible)</label>
          <input
            type="text"
            value={destSalon}
            onChange={(e) => setDestSalon(e.target.value)}
            className="mt-1 w-full rounded-lg border border-input bg-card p-2.5 text-xs text-foreground outline-none"
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="w-1/2 rounded-full text-xs">
            Cancelar
          </Button>
          <Button onClick={handleReasignacion} className="w-1/2 rounded-full text-xs font-bold">
            Ejecutar Reasignación
          </Button>
        </div>
      </div>
    </div>
  )
}
