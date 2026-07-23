"use client"

import { UserCheck, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AsistenciaLabModalProps {
  isOpen: boolean
  onClose: () => void
  scannerEstudianteCode: string
  setScannerEstudianteCode: (val: string) => void
  onConfirmAsistenciaLab: () => void
}

export function AsistenciaLabModal({
  isOpen,
  onClose,
  scannerEstudianteCode,
  setScannerEstudianteCode,
  onConfirmAsistenciaLab,
}: AsistenciaLabModalProps) {
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
          <UserCheck className="size-6 text-primary" />
          <h3 className="text-base font-bold text-foreground">Registro de Asistencia Lab</h3>
        </div>

        <div>
          <label className="text-xs font-semibold text-foreground">Código o Carné Estudiante</label>
          <input
            type="text"
            value={scannerEstudianteCode}
            onChange={(e) => setScannerEstudianteCode(e.target.value)}
            placeholder="Ej. 2024100982"
            className="mt-1 w-full rounded-lg border border-input bg-card p-2.5 text-xs text-foreground outline-none"
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="w-1/2 rounded-full text-xs">
            Cancelar
          </Button>
          <Button onClick={onConfirmAsistenciaLab} className="w-1/2 rounded-full text-xs font-bold">
            Registrar Asistencia
          </Button>
        </div>
      </div>
    </div>
  )
}
