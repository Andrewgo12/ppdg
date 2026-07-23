"use client"

import { useState } from "react"
import { BookOpen, QrCode, FileText, Search, Filter } from "lucide-react"
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
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCat, setSelectedCat] = useState("todas")

  const categories = ["todas", ...Array.from(new Set(libros.map((l) => l.categoria.toLowerCase())))]

  const filteredLibros = libros.filter((l) => {
    const matchCat = selectedCat === "todas" || l.categoria.toLowerCase() === selectedCat
    const matchText = l.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || l.autor.toLowerCase().includes(searchTerm.toLowerCase())
    return matchCat && matchText
  })

  return (
    <section className="space-y-4 text-xs font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div>
          <h2 className="text-[13px] font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
            <BookOpen className="size-4 text-primary" />
            Catálogo Digital UniBiblio Flow
          </h2>
          <p className="text-[10px] text-muted-foreground font-mono">
            RESERVA INSTANTÁNEA POR QR // PRÉSTAMO DIGITAL
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="size-3.5 absolute left-2 top-2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar título o autor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-7 pl-7 pr-2 rounded-sm border border-border/60 bg-card text-[10px] outline-none w-48"
            />
          </div>
        </div>
      </div>

      {/* Main Layout with Sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
        {/* Sidebar Facets */}
        <div className="border border-border/60 rounded-sm bg-card p-3 space-y-3">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5 border-b border-border/40 pb-2">
            <Filter className="size-3 text-primary" /> Categorías
          </h3>
          <div className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`w-full text-left px-2 py-1 text-[10px] font-mono uppercase rounded-sm transition-colors ${
                  selectedCat === cat
                    ? "bg-primary/10 text-primary font-bold border border-primary/40"
                    : "text-muted-foreground hover:bg-muted/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {filteredLibros.map((libro) => (
            <div key={libro.id} className="border border-border/60 rounded-sm bg-card p-3 flex flex-col justify-between gap-2 hover:border-primary/40 transition-colors">
              <div>
                <span className="text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded-sm bg-muted/40 text-muted-foreground border border-border/40">
                  {libro.categoria}
                </span>
                <h4 className="text-[12px] font-bold text-foreground leading-tight mt-1.5">{libro.titulo}</h4>
                <p className="text-[10px] text-muted-foreground">{libro.autor}</p>
                <p className="text-[9px] font-mono text-muted-foreground/70 mt-1">UBICACIÓN: {libro.ubicacion}</p>
              </div>

              <div className="border-t border-border/40 pt-2 flex items-center justify-between">
                <span className="text-[10px] font-mono">
                  STOCK: <span className="font-bold">{libro.unidadesDisponibles}/{libro.totalUnidades}</span>
                </span>
                <Button
                  size="sm"
                  onClick={() => onReserveBook(libro)}
                  className="h-6 px-2 text-[9px] rounded-sm bg-primary text-primary-foreground font-mono"
                >
                  RESERVAR QR
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Loans Table */}
      <div className="space-y-2 pt-2 border-t border-border/60">
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
          <QrCode className="size-3.5 text-primary" /> Préstamos y Tickets QR Activos
        </h3>

        <div className="overflow-x-auto border border-border/60 rounded-sm bg-card">
          <table className="w-full text-left border-collapse text-[10px]">
            <thead>
              <tr className="border-b border-border/60 bg-muted/20 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                <th className="p-2 border-r border-border/40">Ticket QR</th>
                <th className="p-2 border-r border-border/40">Libro</th>
                <th className="p-2 border-r border-border/40">Fecha Vencimiento</th>
                <th className="p-2 border-r border-border/40">Estado</th>
                <th className="p-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 font-mono">
              {prestamos.map((p) => (
                <tr key={p.id} className="hover:bg-muted/10 transition-colors">
                  <td className="p-2 font-bold text-primary border-r border-border/40">{p.qrCode}</td>
                  <td className="p-2 border-r border-border/40 font-sans font-medium text-[11px]">{p.libroTitulo}</td>
                  <td className="p-2 border-r border-border/40 text-muted-foreground">{p.fechaVencimiento}</td>
                  <td className="p-2 border-r border-border/40">
                    <span className="px-1.5 py-0.5 rounded-sm bg-emerald-500/10 text-emerald-600 font-bold border border-emerald-500/20 text-[8px]">
                      {p.estado.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-2 text-center">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        generarComprobantePrestamoPDF(p)
                        toast("📄 Comprobante PDF Descargado")
                      }}
                      className="h-6 px-2 text-[9px] rounded-sm gap-1"
                    >
                      <FileText className="size-3" /> PDF
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
