"use client"

import { Truck, CheckCircle2, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ConfirmarSoporteExpressModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function ConfirmarSoporteExpressModal({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmarSoporteExpressModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-xl border border-border bg-card p-4 shadow-2xl space-y-4 text-center">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Cerrar modal"
        >
          <X className="size-5" />
        </button>

        <Truck className="size-10 text-primary mx-auto" />
        <h3 className="text-xs sm:text-sm font-bold text-foreground">Aceptar Solicitud Express de Insumo</h3>
        <p className="text-xs text-muted-foreground">
          Consola Técnico IT · Notificará al docente que usted va en camino al aula con el insumo requerid.
        </p>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="w-1/2 rounded-full text-xs">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className="w-1/2 rounded-full text-xs font-bold gap-1.5"
          >
            <CheckCircle2 className="size-3.5" />
            Notificar "En Camino"
          </Button>
        </div>
      </div>
    </div>
  )
}
