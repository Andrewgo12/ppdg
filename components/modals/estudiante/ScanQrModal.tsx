"use client"

import { useState } from "react"
import { QrCode, X, Sparkles, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ScanQrModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirmScanQr: () => void
}

export function ScanQrModal({ isOpen, onClose, onConfirmScanQr }: ScanQrModalProps) {
  const [scannedCode, setScannedCode] = useState("QR-LIBRO-L001-2026")

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

        <div className="space-y-1">
          <h3 className="text-xs sm:text-sm font-bold text-foreground flex items-center justify-center gap-2">
            <QrCode className="size-5 text-primary" />
            Escáner de Ticket QR UniBiblio Flow
          </h3>
          <p className="text-xs text-muted-foreground">
            Apunta la cámara o selecciona un código de prueba para validar el préstamo.
          </p>
        </div>

        {/* Viewfinder Box with Laser Animation */}
        <div className="relative mx-auto w-56 h-56 rounded-sm border-2 border-primary/40 bg-slate-950/90 overflow-hidden flex flex-col items-center justify-center">
          {/* Corner Markers */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary" />

          {/* Animated Laser Beam */}
          <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-bounce top-1/3" />

          <QrCode className="size-24 text-white/30" />
          <p className="mt-2 text-[10px] text-emerald-400 font-mono tracking-wider animate-pulse">
            BUSCANDO TICKET...
          </p>
        </div>

        {/* Quick Sample Selector */}
        <div className="space-y-1 text-left">
          <label className="text-[11px] font-semibold text-muted-foreground">Código Detectado:</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={scannedCode}
              onChange={(e) => setScannedCode(e.target.value)}
              className="w-full rounded-sm border border-input bg-background px-3 py-1.5 text-xs font-mono text-foreground outline-none"
            />
          </div>
          <div className="flex gap-1.5 pt-1">
            <button
              onClick={() => setScannedCode("QR-LIBRO-L001-2026")}
              className="text-[10px] bg-muted px-2 py-1 rounded-sm hover:bg-primary/20 hover:text-primary transition-colors"
            >
              📖 Libro L001
            </button>
            <button
              onClick={() => setScannedCode("QR-TESIS-2026-982")}
              className="text-[10px] bg-muted px-2 py-1 rounded-sm hover:bg-primary/20 hover:text-primary transition-colors"
            >
              🎓 Tesis Grado
            </button>
            <button
              onClick={() => setScannedCode("QR-LAB-A101-2026")}
              className="text-[10px] bg-muted px-2 py-1 rounded-sm hover:bg-primary/20 hover:text-primary transition-colors"
            >
              💻 Lab A-101
            </button>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" onClick={onClose} className="w-1/2 rounded-sm text-xs">
            Cancelar
          </Button>
          <Button
            onClick={onConfirmScanQr}
            className="w-1/2 rounded-sm text-xs font-bold bg-zinc-800 hover:bg-emerald-700 text-white gap-1"
          >
            <CheckCircle2 className="size-3.5" />
            Validar Código
          </Button>
        </div>
      </div>
    </div>
  )
}
