"use client"

import { Zap, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface InsumoExpressModalProps {
  isOpen: boolean
  onClose: () => void
  onRequestExpressSupply: (item: string, salon: string) => void
}

export function InsumoExpressModal({
  isOpen,
  onClose,
  onRequestExpressSupply,
}: InsumoExpressModalProps) {
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
          <Zap className="size-6 text-amber-500" />
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-foreground">Solicitar Insumo Express (Just-in-Time)</h3>
            <p className="text-xs text-muted-foreground">Consola Docente · Asistencia Inmediata</p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Solicitud de cables, marcadores o adaptadores de entrega rápida a su aula durante el desarrollo de la clase.
        </p>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="w-1/2 rounded-full text-xs">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              onRequestExpressSupply("Cable HDMI 3m", "Aula A-203")
              onClose()
            }}
            className="w-1/2 rounded-full text-xs font-bold gap-1.5"
          >
            <Send className="size-3.5" />
            Enviar Alerta IT
          </Button>
        </div>
      </div>
    </div>
  )
}
