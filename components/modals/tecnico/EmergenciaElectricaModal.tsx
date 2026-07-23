"use client"

import { Zap, AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmergenciaElectricaModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirmLockdown: () => void
}

export function EmergenciaElectricaModal({
  isOpen,
  onClose,
  onConfirmLockdown,
}: EmergenciaElectricaModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl border border-amber-500/50 bg-card p-6 shadow-2xl space-y-4 text-center">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Cerrar modal"
        >
          <X className="size-5" />
        </button>

        <Zap className="size-12 text-amber-500 mx-auto animate-bounce" />
        <h3 className="text-base font-bold text-foreground">Protocolo Aislamiento RETIE (Riesgo Alto)</h3>
        <p className="text-xs text-muted-foreground">
          Consola Técnico Eléctrico · Desconexión preventiva de la zona y bloqueo de seguridad del aula.
        </p>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="w-1/2 rounded-full text-xs">
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirmLockdown()
              onClose()
            }}
            className="w-1/2 rounded-full text-xs font-bold gap-1"
          >
            <AlertTriangle className="size-3.5" /> Activar Aislamiento
          </Button>
        </div>
      </div>
    </div>
  )
}
