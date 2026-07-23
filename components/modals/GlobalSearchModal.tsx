"use client"

import { useState, useEffect } from "react"
import { Search, X, MapPin, BookOpen, AlertTriangle, Boxes, ShieldCheck, ArrowRight } from "lucide-react"

interface GlobalSearchModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectResult: (view: string) => void
}

export function GlobalSearchModal({ isOpen, onClose, onSelectResult }: GlobalSearchModalProps) {
  const [query, setQuery] = useState("")

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        if (isOpen) onClose()
        else setQuery("")
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const items = [
    { title: "Aula A-101 (Laboratorio Sistemas)", category: "Salones", view: "mapa", icon: MapPin },
    { title: "Aula B-201 (Audiovisuales)", category: "Salones", view: "mapa", icon: MapPin },
    { title: "Auditorio Sede Principal (Av. 6)", category: "Espacios", view: "espacios", icon: MapPin },
    { title: "Libro: Cálculo Multivariable (Stewart)", category: "Biblioteca", view: "biblioteca", icon: BookOpen },
    { title: "Libro: Clean Architecture (Robert C. Martin)", category: "Biblioteca", view: "biblioteca", icon: BookOpen },
    { title: "Ticket TK-2026-001 (Proyector sin señal)", category: "Mantenimiento", view: "tickets", icon: AlertTriangle },
    { title: "Cable HDMI V2.0 3mts (Almacén)", category: "Inventario", view: "inventario", icon: Boxes },
    { title: "Paz y Salvo de Grado Criptográfico", category: "Grados", view: "grado", icon: ShieldCheck },
  ]

  const filtered = items.filter(
    (i) =>
      i.title.toLowerCase().includes(query.toLowerCase()) ||
      i.category.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-foreground/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-xl border border-border bg-card shadow-2xl overflow-hidden space-y-3 p-4">
        {/* Input Bar */}
        <div className="flex items-center gap-3 border-b border-border pb-3 px-2">
          <Search className="size-5 text-primary shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar salones, libros, tickets, insumos o trámites (Ctrl+K)..."
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none font-medium"
          />
          <button
            onClick={onClose}
            className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-72 overflow-y-auto space-y-1 pr-1">
          {filtered.length === 0 ? (
            <p className="text-xs text-muted-foreground p-4 text-center">No se encontraron resultados para "{query}"</p>
          ) : (
            filtered.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  onClick={() => {
                    onSelectResult(item.view)
                    onClose()
                  }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/40 hover:text-primary transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-muted group-hover:bg-primary/20 text-primary">
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground group-hover:text-primary">{item.title}</p>
                      <span className="text-[10px] text-muted-foreground uppercase font-semibold">{item.category}</span>
                    </div>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
