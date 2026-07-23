"use client"

import { BookOpen, QrCode, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Libro, Prestamo } from "@/lib/campus-data"

interface UniBiblioViewProps {
  libros: Libro[]
  prestamos: Prestamo[]
  onReserveBook: (libro: Libro) => void
}

export function UniBiblioView({ libros, prestamos, onReserveBook }: UniBiblioViewProps) {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
            <BookOpen className="size-5 text-primary" />
            UniBiblio Flow · Catálogo & Préstamo Digital por QR
          </h2>
          <p className="text-xs text-muted-foreground">
            Reserva libros en 1 clic, presenta tu ticket QR en caja y firma el préstamo digital sin papel.
          </p>
        </div>
      </div>

      {/* Libros Catalog Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {libros.map((libro) => (
          <div key={libro.id} className="rounded-3xl border border-border bg-card p-5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {libro.categoria}
              </span>
              <h3 className="text-sm font-semibold text-foreground mt-2">{libro.titulo}</h3>
              <p className="text-xs text-muted-foreground">{libro.autor}</p>
              <p className="text-[11px] text-muted-foreground mt-1">Ubicación: {libro.ubicacion}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
              <span className="text-xs font-medium text-foreground">
                Disponibles: {libro.unidadesDisponibles}/{libro.totalUnidades}
              </span>
              <Button
                size="sm"
                onClick={() => onReserveBook(libro)}
                className="rounded-full text-[11px] px-3"
              >
                Reservar QR
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Active Loans Table */}
      <div className="rounded-3xl border border-border bg-card p-5 space-y-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <QrCode className="size-4 text-primary" />
          Tus Préstamos y Tickets QR Activos
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-foreground">
            <thead className="border-b border-border bg-muted/40 text-muted-foreground">
              <tr>
                <th className="p-3">ID Préstamo</th>
                <th className="p-3">Libro</th>
                <th className="p-3">Vencimiento</th>
                <th className="p-3">Código QR</th>
                <th className="p-3">Firma Digital</th>
                <th className="p-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {prestamos.map((p) => (
                <tr key={p.id}>
                  <td className="p-3 font-semibold text-primary">{p.id}</td>
                  <td className="p-3 font-medium">{p.libroTitulo}</td>
                  <td className="p-3">{p.fechaVencimiento}</td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] bg-muted px-2 py-1 rounded-lg">
                      <QrCode className="size-3" /> {p.qrCode}
                    </span>
                  </td>
                  <td className="p-3">
                    {p.firmadoDigitalmente ? (
                      <span className="text-emerald-600 font-semibold flex items-center gap-1">
                        <Check className="size-3" /> Firmado
                      </span>
                    ) : (
                      <span className="text-amber-600 font-semibold">Pendiente Firma</span>
                    )}
                  </td>
                  <td className="p-3">
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                      {p.estado.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
