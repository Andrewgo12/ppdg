"use client"

import { QrCode, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ScanQrModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirmScanQr: () => void
}

export function ScanQrModal({ isOpen, onClose, onConfirmScanQr }: ScanQrModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl space-y-4 text-center">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Cerrar modal"
        >
          <X className="size-5" />
        </button>

        <QrCode className="size-12 text-primary mx-auto animate-pulse" />
        <h3 className="text-base font-bold text-foreground">Escáner Ticket QR Préstamo</h3>
        <p className="text-xs text-muted-foreground">
          Consola Monitor: Coloque el código QR del estudiante frente a la cámara.
        </p>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="w-1/2 rounded-full text-xs">
            Cancelar
          </Button>
          <Button onClick={onConfirmScanQr} className="w-1/2 rounded-full text-xs font-bold">
            Simular Escaneo QR
          </Button>
        </div>
      </div>
    </div>
  )
}
