"use client"

import { Boxes, CheckCircle2, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AprobarDespachoModalProps {
  isOpen: boolean
  onClose: () => void
  onApproveDispatch: () => void
}

export function AprobarDespachoModal({
  isOpen,
  onClose,
  onApproveDispatch,
}: AprobarDespachoModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-foreground/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-sm border border-border bg-card p-3 shadow-2xl space-y-2.5 text-center">
        <button
          onClick={onClose}
          className="absolute right-4 top-3 rounded-sm p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Cerrar modal"
        >
          <X className="size-5" />
        </button>

        <Boxes className="size-10 text-primary mx-auto" />
        <h3 className="text-xs sm:text-sm font-bold text-foreground">Autorización Despacho Insumo Almacén</h3>
        <p className="text-xs text-muted-foreground">
          Consola Almacenista · Verificación de Ticket ID previo a la entrega física de repuestos.
        </p>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="w-1/2 rounded-sm text-xs">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              onApproveDispatch()
              onClose()
            }}
            className="w-1/2 rounded-sm text-xs font-bold gap-1.5"
          >
            <CheckCircle2 className="size-3.5" /> Despachar Insumo
          </Button>
        </div>
      </div>
    </div>
  )
}
