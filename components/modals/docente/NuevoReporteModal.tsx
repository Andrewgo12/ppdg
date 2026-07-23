"use client"

import { Camera, Upload, CheckCircle2, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Salon } from "@/lib/campus-data"

interface NuevoReporteModalProps {
  isOpen: boolean
  onClose: () => void
  handleCreateTicket: (e: React.FormEvent) => void
  reportCategory: "infraestructura" | "electrico" | "it" | "aseo"
  setReportCategory: (val: "infraestructura" | "electrico" | "it" | "aseo") => void
  reportDesc: string
  setReportDesc: (val: string) => void
  reportSalonId: string
  setReportSalonId: (val: string) => void
  reportPriority: "alta" | "media" | "baja" | "express"
  setReportPriority: (val: "alta" | "media" | "baja" | "express") => void
  evidenceUploaded: boolean
  setEvidenceUploaded: (val: boolean) => void
  salones: Salon[]
}

export function NuevoReporteModal({
  isOpen,
  onClose,
  handleCreateTicket,
  reportCategory,
  setReportCategory,
  reportDesc,
  setReportDesc,
  reportSalonId,
  setReportSalonId,
  reportPriority,
  setReportPriority,
  evidenceUploaded,
  setEvidenceUploaded,
  salones,
}: NuevoReporteModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Cerrar modal"
        >
          <X className="size-5" />
        </button>

        <form onSubmit={handleCreateTicket} className="space-y-4">
          <div className="flex items-center gap-3 border-b border-border pb-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600">
              <Camera className="size-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Reportar Falla Técnica en Aula</h3>
              <p className="text-xs text-muted-foreground">UNICAMACHO · Evidencia foto/video obligatoria</p>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground">Selecciona el Salón</label>
            <select
              value={reportSalonId}
              onChange={(e) => setReportSalonId(e.target.value)}
              className="mt-1 w-full rounded-2xl border border-input bg-card p-2.5 text-xs text-foreground outline-none"
            >
              {salones.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nombre} ({s.bloque} - {s.piso})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-foreground">Categoría Técnica</label>
              <select
                value={reportCategory}
                onChange={(e) =>
                  setReportCategory(e.target.value as "infraestructura" | "electrico" | "it" | "aseo")
                }
                className="mt-1 w-full rounded-2xl border border-input bg-card p-2.5 text-xs text-foreground outline-none"
              >
                <option value="it">Soporte IT / Videobeam</option>
                <option value="electrico">Red Eléctrica / Luces</option>
                <option value="infraestructura">Planta Física / Puertas</option>
                <option value="aseo">Servicios Generales / Aseo</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground">Nivel de Prioridad</label>
              <select
                value={reportPriority}
                onChange={(e) =>
                  setReportPriority(e.target.value as "alta" | "media" | "baja" | "express")
                }
                className="mt-1 w-full rounded-2xl border border-input bg-card p-2.5 text-xs text-foreground outline-none"
              >
                <option value="alta">Alta (Impide la Clase)</option>
                <option value="express">Express (Inmediato)</option>
                <option value="media">Media</option>
                <option value="baja">Baja (Mantenimiento)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground">Descripción del Daño</label>
            <textarea
              rows={3}
              value={reportDesc}
              onChange={(e) => setReportDesc(e.target.value)}
              placeholder="Describe la falla observada (ej. Videobeam no enciende, aire botando agua...)"
              className="mt-1 w-full rounded-2xl border border-input bg-card p-3 text-xs text-foreground outline-none"
              required
            />
          </div>

          <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-4 text-center space-y-2">
            <Camera className="size-6 text-primary mx-auto" />
            <p className="text-xs font-bold text-foreground">Evidencia Fotográfica / Video Requerida</p>
            <p className="text-[11px] text-muted-foreground">
              Debe capturar o subir la evidencia del daño antes de enviar el reporte.
            </p>

            {!evidenceUploaded ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => setEvidenceUploaded(true)}
                className="rounded-full text-xs gap-1.5 mt-1"
              >
                <Upload className="size-3.5" /> Capturar Foto/Video con Cámara
              </Button>
            ) : (
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-600">
                <CheckCircle2 className="size-4" /> Foto de Evidencia Capturada Satisfactoriamente
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="w-1/2 rounded-full text-xs">
              Cancelar
            </Button>
            <Button type="submit" className="w-1/2 h-10 rounded-full text-xs font-bold gap-2">
              <Send className="size-4" /> Enviar Reporte
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
