"use client"

import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CubiculoModalProps {
  isOpen: boolean
  onClose: () => void
  cubiculoDuration: string
  setCubiculoDuration: (val: string) => void
  onConfirm: () => void
}

export function CubiculoModal({
  isOpen,
  onClose,
  cubiculoDuration,
  setCubiculoDuration,
  onConfirm,
}: CubiculoModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl space-y-4 text-center">
        <Clock className="size-10 text-primary mx-auto" />
        <h3 className="text-base font-bold text-foreground">Reserva Express Cubículo de Estudio</h3>
        <p className="text-xs text-muted-foreground">
          Biblioteca UniBiblio · Disponibilidad inmediata garantizada
        </p>

        <select
          value={cubiculoDuration}
          onChange={(e) => setCubiculoDuration(e.target.value)}
          className="w-full rounded-2xl border border-input bg-card p-2.5 text-xs text-foreground outline-none"
        >
          <option value="1 Hora">1 Hora</option>
          <option value="2 Horas">2 Horas (Máximo Estándar)</option>
          <option value="3 Horas">3 Horas (Sujeto a disponibilidad)</option>
        </select>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="w-1/2 rounded-full text-xs">
            Cancelar
          </Button>
          <Button onClick={onConfirm} className="w-1/2 rounded-full text-xs font-bold">
            Confirmar Reserva
          </Button>
        </div>
      </div>
    </div>
  )
}
