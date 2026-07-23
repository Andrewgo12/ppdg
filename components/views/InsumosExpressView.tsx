"use client"

import { useState } from "react"
import { PackageSearch, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

interface InsumosExpressViewProps {
  onRequestExpressSupply: (item: string, salon: string) => void
}

export function InsumosExpressView({ onRequestExpressSupply }: InsumosExpressViewProps) {
  const [expressItem, setExpressItem] = useState("Cable HDMI 3m")
  const [expressSalon, setExpressSalon] = useState("Aula A-203")

  return (
    <section className="space-y-4">
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <PackageSearch className="size-5" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-semibold text-foreground">
              Solicitud Express de Insumos para Clase (Just-in-Time)
            </h2>
            <p className="text-xs text-muted-foreground">
              ¿Falta un cable HDMI o marcadores durante tu clase? Solicítalo en un clic y el técnico irá en camino.
            </p>
          </div>
        </div>

        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="text-xs font-medium text-foreground">Insumo Requerido</label>
            <select
              value={expressItem}
              onChange={(e) => setExpressItem(e.target.value)}
              className="mt-1 w-full rounded-lg border border-input bg-card p-2.5 text-xs text-foreground outline-none"
            >
              <option value="Cable HDMI 3m">Cable HDMI 3m</option>
              <option value="Caja Marcadores y Borrador">Caja Marcadores & Borrador</option>
              <option value="Adaptador USB-C a VGA">Adaptador USB-C a VGA</option>
              <option value="Extensión Eléctrica 5m">Extensión Eléctrica 5m</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-foreground">Salón de Clase</label>
            <select
              value={expressSalon}
              onChange={(e) => setExpressSalon(e.target.value)}
              className="mt-1 w-full rounded-lg border border-input bg-card p-2.5 text-xs text-foreground outline-none"
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
              className="w-full h-8 sm:h-9 rounded-full text-xs gap-2"
            >
              <Send className="size-4" />
              Solicitar Insumo Inmediato
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
