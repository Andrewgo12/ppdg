"use client"

import { BookOpen, QrCode, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Libro } from "@/lib/campus-data"

interface ReservaLibroModalProps {
  isOpen: boolean
  onClose: () => void
  selectedBook: Libro | null
  onConfirmReserveBook: (libro: Libro) => void
}

export function ReservaLibroModal({
  isOpen,
  onClose,
  selectedBook,
  onConfirmReserveBook,
}: ReservaLibroModalProps) {
  if (!isOpen || !selectedBook) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl space-y-4">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Cerrar modal"
        >
          <X className="size-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-border pb-3">
          <BookOpen className="size-6 text-primary" />
          <div>
            <h3 className="text-base font-bold text-foreground">Confirmar Reserva de Libro</h3>
            <p className="text-xs text-muted-foreground">UniBiblio Flow · Préstamo con Ticket QR</p>
          </div>
        </div>

        <div className="bg-muted/30 p-4 rounded-2xl space-y-1 text-xs">
          <p className="font-bold text-foreground text-sm">{selectedBook.titulo}</p>
          <p className="text-muted-foreground">Autor: {selectedBook.autor}</p>
          <p className="text-muted-foreground">Ubicación: {selectedBook.ubicacion}</p>
          <p className="text-primary font-semibold mt-1">
            Disponibilidad: {selectedBook.unidadesDisponibles} de {selectedBook.totalUnidades} copias
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="w-1/2 rounded-full text-xs">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              onConfirmReserveBook(selectedBook)
              onClose()
            }}
            className="w-1/2 rounded-full text-xs font-bold gap-1.5"
          >
            <QrCode className="size-3.5" />
            Generar Ticket QR
          </Button>
        </div>
      </div>
    </div>
  )
}
