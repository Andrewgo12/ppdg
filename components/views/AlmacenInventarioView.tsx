"use client"

import { Boxes, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Insumo, Despacho } from "@/lib/campus-data"
import { exportarInventarioCSV } from "@/lib/csv-exporter"
import { toast } from "sonner"

interface AlmacenInventarioViewProps {
  insumos: Insumo[]
  despachos: Despacho[]
}

export function AlmacenInventarioView({ insumos, despachos }: AlmacenInventarioViewProps) {
  const handleExportCSV = () => {
    exportarInventarioCSV(insumos, despachos)
    toast("📊 Inventario Exportado a CSV / Excel", {
      description: "Archivo Inventario_UniCamacho.csv descargado a su equipo."
    })
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
            <Boxes className="size-5 text-primary" />
            Control de Almacén, Despachos & Stock Mínimo
          </h2>
          <p className="text-xs text-muted-foreground">
            Despacho condicionado a Ticket ID activo. Alertas automáticas de reabastecimiento.
          </p>
        </div>

        <Button onClick={handleExportCSV} variant="outline" className="rounded-full gap-2 text-xs">
          <Download className="size-4 text-primary" />
          Exportar Inventario Excel / CSV
        </Button>
      </div>

      {/* Insumos Inventory Table */}
      <div className="space-y-2">
        <h3 className="text-[13px] font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
          Inventario de Componentes & Insumos
        </h3>
        <div className="overflow-x-auto border border-border/50 rounded-md">
          <table className="w-full text-left text-[11px] text-foreground">
            <thead className="border-b border-border/50 bg-muted/20 text-muted-foreground uppercase tracking-wider">
              <tr>
                <th className="px-3 py-2 font-medium">Código</th>
                <th className="px-3 py-2 font-medium">Insumo</th>
                <th className="px-3 py-2 font-medium">Categoría</th>
                <th className="px-3 py-2 font-medium">Stock Actual</th>
                <th className="px-3 py-2 font-medium">Stock Mínimo</th>
                <th className="px-3 py-2 font-medium">Ubicación</th>
                <th className="px-3 py-2 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30 bg-background">
              {insumos.map((i) => {
                const isCrit = i.stockActual <= i.stockMinimo
                return (
                  <tr key={i.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-3 py-1.5 font-mono text-muted-foreground">{i.id}</td>
                    <td className="px-3 py-1.5 font-medium">{i.nombre}</td>
                    <td className="px-3 py-1.5 capitalize text-muted-foreground">{i.categoria}</td>
                    <td className="px-3 py-1.5 font-bold">{i.stockActual} <span className="font-normal text-muted-foreground">{i.unidad}</span></td>
                    <td className="px-3 py-1.5 text-muted-foreground">{i.stockMinimo} {i.unidad}</td>
                    <td className="px-3 py-1.5">{i.ubicacion}</td>
                    <td className="px-3 py-1.5">
                      {isCrit ? (
                        <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold">
                          <span className="size-1.5 rounded-full bg-rose-500 animate-pulse"></span> Alerta
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-zinc-800 dark:text-zinc-200 dark:text-emerald-400">
                          <span className="size-1.5 rounded-full bg-zinc-700"></span> Óptimo
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Despachos Table */}
      <div className="space-y-2 pt-4">
        <h3 className="text-[13px] font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
          Historial de Despachos para Mantenimiento
        </h3>
        <div className="overflow-x-auto border border-border/50 rounded-md">
          <table className="w-full text-left text-[11px] text-foreground">
            <thead className="border-b border-border/50 bg-muted/20 text-muted-foreground uppercase tracking-wider">
              <tr>
                <th className="px-3 py-2 font-medium">ID Despacho</th>
                <th className="px-3 py-2 font-medium">Insumo</th>
                <th className="px-3 py-2 font-medium">Cantidad</th>
                <th className="px-3 py-2 font-medium">Ticket ID</th>
                <th className="px-3 py-2 font-medium">Técnico Receptor</th>
                <th className="px-3 py-2 font-medium">Fecha</th>
                <th className="px-3 py-2 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30 bg-background">
              {despachos.map((d) => (
                <tr key={d.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-3 py-1.5 font-mono text-muted-foreground">{d.id}</td>
                  <td className="px-3 py-1.5 font-medium">{d.insumoNombre}</td>
                  <td className="px-3 py-1.5 font-bold">{d.cantidad}</td>
                  <td className="px-3 py-1.5 font-mono text-primary">{d.ticketId}</td>
                  <td className="px-3 py-1.5">{d.tecnicoNombre}</td>
                  <td className="px-3 py-1.5 text-muted-foreground">{d.fecha}</td>
                  <td className="px-3 py-1.5">
                    <span className="rounded-sm bg-muted/50 border border-border/50 px-1.5 py-0.5 font-medium">
                      {d.estado}
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
