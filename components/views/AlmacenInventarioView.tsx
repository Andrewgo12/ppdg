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
    toast.success("📊 Inventario Exportado a CSV / Excel", {
      description: "Archivo Inventario_UniCamacho.csv descargado a su equipo."
    })
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
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
      <div className="rounded-3xl border border-border bg-card p-5 space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Inventario de Componentes & Insumos</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-foreground">
            <thead className="border-b border-border bg-muted/40 text-muted-foreground">
              <tr>
                <th className="p-3">Código</th>
                <th className="p-3">Insumo</th>
                <th className="p-3">Categoría</th>
                <th className="p-3">Stock Actual</th>
                <th className="p-3">Stock Mínimo</th>
                <th className="p-3">Ubicación</th>
                <th className="p-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {insumos.map((i) => {
                const isCrit = i.stockActual <= i.stockMinimo
                return (
                  <tr key={i.id}>
                    <td className="p-3 font-semibold text-primary">{i.id}</td>
                    <td className="p-3 font-medium">{i.nombre}</td>
                    <td className="p-3 capitalize">{i.categoria}</td>
                    <td className="p-3 font-bold">{i.stockActual} {i.unidad}</td>
                    <td className="p-3 text-muted-foreground">{i.stockMinimo} {i.unidad}</td>
                    <td className="p-3">{i.ubicacionEstante}</td>
                    <td className="p-3">
                      {isCrit ? (
                        <span className="rounded-full bg-rose-500/20 text-rose-700 dark:text-rose-300 px-2.5 py-0.5 text-[10px] font-bold">
                          ⚠️ ALERTA REABASTECIMIENTO
                        </span>
                      ) : (
                        <span className="rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-2.5 py-0.5 text-[10px] font-bold">
                          ÓPTIMO
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
      <div className="rounded-3xl border border-border bg-card p-5 space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Historial de Despachos para Mantenimiento</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-foreground">
            <thead className="border-b border-border bg-muted/40 text-muted-foreground">
              <tr>
                <th className="p-3">ID Despacho</th>
                <th className="p-3">Insumo</th>
                <th className="p-3">Cantidad</th>
                <th className="p-3">Ticket ID</th>
                <th className="p-3">Técnico Receptor</th>
                <th className="p-3">Fecha</th>
                <th className="p-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {despachos.map((d) => (
                <tr key={d.id}>
                  <td className="p-3 font-semibold text-primary">{d.id}</td>
                  <td className="p-3 font-medium">{d.insumoNombre}</td>
                  <td className="p-3">{d.cantidad}</td>
                  <td className="p-3 font-mono">{d.ticketId}</td>
                  <td className="p-3">{d.tecnicoNombre}</td>
                  <td className="p-3 text-muted-foreground">{d.fecha}</td>
                  <td className="p-3">
                    <span className="rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 text-[10px] font-bold uppercase">
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
