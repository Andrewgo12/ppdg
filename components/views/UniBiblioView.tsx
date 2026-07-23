"use client"

import { BookOpen, QrCode, Check, FileText, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Libro, Prestamo } from "@/lib/campus-data"
import { generarComprobantePrestamoPDF } from "@/lib/pdf-ticket-generator"
import { toast } from "sonner"

interface UniBiblioViewProps {
  libros: Libro[]
  prestamos: Prestamo[]
  onReserveBook: (libro: Libro) => void
}

export function UniBiblioView({ libros, prestamos, onReserveBook }: UniBiblioViewProps) {
  const totalReservas = prestamos.length
  const morosos = prestamos.filter((p) => new Date(p.fechaVencimiento) < new Date()).length
  const tarifaMultaPorDia = 2500

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

      {/* Real-time Fine & Loan Statistics */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-3 space-y-1">
          <p className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1.5">
            <Calculator className="size-3.5 text-primary" />
            Tarifa de Sanción / Mora por Día
          </p>
          <p className="text-xl font-bold text-foreground">$2.500 COP / Día</p>
          <p className="text-[10px] text-muted-foreground">Calculado automáticamente sobre préstamos vencidos</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-3 space-y-1">
          <p className="text-[11px] font-semibold text-muted-foreground">Préstamos Activos en Sistema</p>
          <p className="text-xl font-bold text-primary">{totalReservas} Ejemplares</p>
          <p className="text-[10px] text-muted-foreground">Con firma digital registrada</p>
        </div>

        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 space-y-1">
          <p className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">Estado de Paz y Salvo</p>
          <p className="text-xl font-bold text-emerald-700 dark:text-emerald-400">
            {morosos === 0 ? "100% CERO DEUDAS" : `$${morosos * tarifaMultaPorDia} COP PENDIENTE`}
          </p>
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400">
            {morosos === 0 ? "Habilitado para matrícula y diploma de grado" : `${morosos} préstamos en mora`}
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
                <th className="p-3">Comprobante PDF</th>
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
                  <td className="p-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        generarComprobantePrestamoPDF(p)
                        toast.success(`📜 Comprobante ${p.id} descargado`, { description: "PDF con código QR guardado en su equipo." })
                      }}
                      className="rounded-full text-[11px] h-7 gap-1"
                    >
                      <FileText className="size-3 text-primary" />
                      PDF Tiquete
                    </Button>
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
