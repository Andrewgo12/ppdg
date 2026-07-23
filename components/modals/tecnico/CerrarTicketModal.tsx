"use client"

import { CheckCircle2, Camera, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Ticket } from "@/lib/campus-data"

interface CerrarTicketModalProps {
  isOpen: boolean
  onClose: () => void
  selectedTicket: Ticket | null
  onCloseTicket: (ticketId: string) => void
  cierreComentario: string
  setCierreComentario: (val: string) => void
  cierreEvidenceDone: boolean
  setCierreEvidenceDone: (val: boolean) => void
}

export function CerrarTicketModal({
  isOpen,
  onClose,
  selectedTicket,
  onCloseTicket,
  cierreComentario,
  setCierreComentario,
  cierreEvidenceDone,
  setCierreEvidenceDone,
}: CerrarTicketModalProps) {
  if (!isOpen || !selectedTicket) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-xl border border-border bg-card p-4 shadow-2xl space-y-4">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Cerrar modal"
        >
          <X className="size-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-border pb-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
            <CheckCircle2 className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">Cierre de Ticket Mantenimiento</h3>
            <p className="text-xs text-muted-foreground">ID: {selectedTicket.id} · {selectedTicket.salonNombre}</p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Reportado: <span className="font-semibold text-foreground">{selectedTicket.descripcion}</span>
        </p>

        <div>
          <label className="text-xs font-semibold text-foreground">Comentario de Solución Técnica</label>
          <textarea
            rows={3}
            value={cierreComentario}
            onChange={(e) => setCierreComentario(e.target.value)}
            placeholder="Describe la labor realizada y repuestos utilizados..."
            className="mt-1 w-full rounded-lg border border-input bg-card p-3 text-xs text-foreground outline-none"
          />
        </div>

        <div className="rounded-lg border border-dashed border-emerald-500/40 bg-emerald-500/5 p-4 text-center space-y-2">
          <Camera className="size-6 text-emerald-600 mx-auto" />
          <p className="text-xs font-bold text-foreground">Foto Evidencia de Reparación Final</p>
          <p className="text-[11px] text-muted-foreground">
            Tome la foto del equipo operando nítidamente para certificar el cierre.
          </p>

          {!cierreEvidenceDone ? (
            <Button
              type="button"
              onClick={() => setCierreEvidenceDone(true)}
              className="rounded-full text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Upload className="size-3.5" /> Capturar Foto de Reparación Final
            </Button>
          ) : (
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-600">
              <CheckCircle2 className="size-4" /> Foto Final Validada
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="w-1/2 rounded-full text-xs">
            Cancelar
          </Button>
          <Button
            onClick={() => onCloseTicket(selectedTicket.id)}
            className="w-1/2 h-10 rounded-full text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Confirmar Cierre & Habilitar
          </Button>
        </div>
      </div>
    </div>
  )
}
