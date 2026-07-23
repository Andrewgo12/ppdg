"use client"

import { FileUp, CheckCircle2, Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UploadTesisModalProps {
  isOpen: boolean
  onClose: () => void
  tesisCargada: boolean
  pazSalvoGenerado: boolean
  onUploadTesis: () => void
  onGeneratePazSalvo: () => void
}

export function UploadTesisModal({
  isOpen,
  onClose,
  tesisCargada,
  pazSalvoGenerado,
  onUploadTesis,
  onGeneratePazSalvo,
}: UploadTesisModalProps) {
  if (!isOpen) return null

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
          <FileUp className="size-6 text-primary" />
          <div>
            <h3 className="text-base font-bold text-foreground">Trámite Grado: Carga Tesis PDF</h3>
            <p className="text-xs text-muted-foreground">Estudiante Candidato a Grado</p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Cargue su documento de grado en formato PDF para iniciar la validación de repositorio y generación automática de Paz y Salvo.
        </p>

        <div className="space-y-2">
          <Button
            onClick={onUploadTesis}
            className="w-full rounded-full text-xs gap-1.5"
          >
            <FileUp className="size-3.5" />
            {tesisCargada ? "Reemplazar Documento PDF" : "Adjuntar Documento PDF Tesis"}
          </Button>

          {tesisCargada && (
            <Button
              onClick={onGeneratePazSalvo}
              className="w-full rounded-full text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Download className="size-3.5" />
              Generar Paz y Salvo Criptográfico
            </Button>
          )}
        </div>

        {pazSalvoGenerado && (
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-500/10 p-3 rounded-2xl">
            <CheckCircle2 className="size-4" /> Paz y Salvo Certificado Exitosamente
          </div>
        )}
      </div>
    </div>
  )
}
