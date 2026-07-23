"use client"

import { CalendarCheck, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ReservaEventoModalProps {
  isOpen: boolean
  onClose: () => void
  handleCreateReserva: (e: React.FormEvent) => void
  eventSpace: string
  setEventSpace: (val: string) => void
  eventDate: string
  setEventDate: (val: string) => void
  eventAforo: number
  setEventAforo: (val: number) => void
  eventLogistics: string
  setEventLogistics: (val: string) => void
}

export function ReservaEventoModal({
  isOpen,
  onClose,
  handleCreateReserva,
  eventSpace,
  setEventSpace,
  eventDate,
  setEventDate,
  eventAforo,
  setEventAforo,
  eventLogistics,
  setEventLogistics,
}: ReservaEventoModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-foreground/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg w-[95vw] max-h-[85vh] overflow-y-auto rounded-sm border border-border bg-card p-3 shadow-2xl space-y-2.5">
        <button
          onClick={onClose}
          className="absolute right-4 top-3 rounded-sm p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Cerrar modal"
        >
          <X className="size-5" />
        </button>

        <form onSubmit={handleCreateReserva} className="space-y-2.5">
          <div className="flex items-center gap-3 border-b border-border pb-3">
            <div className="flex size-10 items-center justify-center rounded-sm bg-muted/40 text-primary">
              <CalendarCheck className="size-5" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-foreground">Solicitud Reserva Espacio Público</h3>
              <p className="text-xs text-muted-foreground">Eventos culturales, deportivos y debates de representación</p>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground">Espacio Solicitado</label>
            <select
              value={eventSpace}
              onChange={(e) => setEventSpace(e.target.value)}
              className="mt-1 w-full rounded-sm border border-input bg-card p-2.5 text-xs text-foreground outline-none"
            >
              <option value="Plazoleta Central">Plazoleta Central</option>
              <option value="Auditorio Sede Principal">Auditorio Sede Principal</option>
              <option value="Cafetería Central">Cafetería Central</option>
              <option value="Salón de Espejos / Danza">Salón de Espejos / Danza</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-foreground">Fecha del Evento</label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="mt-1 w-full rounded-sm border border-input bg-card p-2 text-xs text-foreground outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground">Aforo Estimado</label>
              <input
                type="number"
                value={eventAforo}
                onChange={(e) => setEventAforo(Number(e.target.value))}
                className="mt-1 w-full rounded-sm border border-input bg-card p-2 text-xs text-foreground outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground">Requerimientos Logísticos</label>
            <input
              type="text"
              value={eventLogistics}
              onChange={(e) => setEventLogistics(e.target.value)}
              placeholder="Ej. 20 Sillas, 2 Mesas, Sonido..."
              className="mt-1 w-full rounded-sm border border-input bg-card p-2.5 text-xs text-foreground outline-none"
            />
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="w-1/2 rounded-sm text-xs">
              Cancelar
            </Button>
            <Button type="submit" className="w-1/2 h-8 sm:h-9 rounded-sm text-xs font-bold gap-2">
              <Send className="size-4" /> Enviar Solicitud
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
