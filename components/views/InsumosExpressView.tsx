"use client"

import { useState } from "react"
import { PackageSearch, Send, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface InsumosExpressViewProps {
  onRequestExpressSupply: (item: string, salon: string) => void
}

export function InsumosExpressView({ onRequestExpressSupply }: InsumosExpressViewProps) {
  const [expressItem, setExpressItem] = useState("Cable HDMI 3m")
  const [expressSalon, setExpressSalon] = useState("Aula A-203")

  const quickItems = [
    { name: "Cable HDMI 3m", icon: "🔌" },
    { name: "Caja Marcadores & Borrador", icon: "✏️" },
    { name: "Adaptador USB-C a VGA", icon: "💻" },
    { name: "Extensión Eléctrica 5m", icon: "⚡" },
  ]

  return (
    <section className="space-y-4 text-xs font-sans max-w-2xl mx-auto">
      <div className="border border-border/60 rounded-sm bg-card p-4 space-y-4 shadow-sm">
        <div className="flex items-center gap-2.5 border-b border-border/40 pb-3">
          <div className="p-1.5 rounded-sm bg-primary/10 text-primary">
            <PackageSearch className="size-4" />
          </div>
          <div>
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-foreground">
              Despacho Express Just-in-Time
            </h2>
            <p className="text-[10px] text-muted-foreground font-mono">
              SOLICITUD INMEDIATA PARA DOCENTES EN CLASE
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-mono font-bold uppercase text-muted-foreground block mb-1.5">
              1. SELECCIONAR INSUMO REQUERIDO
            </label>
            <div className="grid grid-cols-2 gap-2">
              {quickItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setExpressItem(item.name)}
                  className={`p-2 rounded-sm border text-left flex items-center gap-2 font-mono transition-colors ${
                    expressItem === item.name
                      ? "border-primary bg-primary/10 text-primary font-bold"
                      : "border-border/50 bg-background text-muted-foreground hover:bg-muted/20"
                  }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-[10px] truncate">{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="text-[10px] font-mono font-bold uppercase text-muted-foreground block mb-1">
                2. UBICACIÓN / SALÓN
              </label>
              <select
                value={expressSalon}
                onChange={(e) => setExpressSalon(e.target.value)}
                className="w-full h-8 rounded-sm border border-border/60 bg-background px-2 text-[10px] font-mono outline-none"
              >
                <option value="Aula A-203">Aula A-203</option>
                <option value="Aula A-101">Aula A-101</option>
                <option value="Lab. Electrónica 1">Lab. Electrónica 1</option>
                <option value="Lab. Sistemas 3">Lab. Sistemas 3</option>
              </select>
            </div>

            <div className="flex items-end">
              <Button
                onClick={() => onRequestExpressSupply(expressItem, expressSalon)}
                className="w-full h-8 text-[10px] font-mono uppercase rounded-sm bg-primary text-primary-foreground font-bold gap-1.5"
              >
                <Send className="size-3" /> Despachar AHORA
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
