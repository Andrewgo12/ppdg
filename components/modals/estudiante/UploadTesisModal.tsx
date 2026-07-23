"use client"

import { useState } from "react"
import { FileUp, CheckCircle2, Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SignaturePad } from "@/components/ui/signature-pad"
import { toast } from "sonner"

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
  const [signatureCaptured, setSignatureCaptured] = useState(false)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-foreground/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-sm border border-border bg-card p-3 shadow-2xl space-y-2.5">
        <button
          onClick={onClose}
          className="absolute right-4 top-3 rounded-sm p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Cerrar modal"
        >
          <X className="size-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-border pb-3">
          <FileUp className="size-6 text-primary" />
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-foreground">Trámite Grado: Carga Tesis & Firma</h3>
            <p className="text-xs text-muted-foreground">Estudiante Candidato a Grado</p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Cargue su documento de grado en formato PDF e ingrese su firma digital en pantalla para expedir el Paz y Salvo.
        </p>

        <div className="space-y-3">
          <Button
            onClick={onUploadTesis}
            className="w-full rounded-sm text-xs gap-1.5"
          >
            <FileUp className="size-3.5" />
            {tesisCargada ? "Reemplazar Documento PDF" : "Adjuntar Documento PDF Tesis"}
          </Button>

          {tesisCargada && (
            <SignaturePad
              label="Firma Digital del Graduando"
              onSaveSignature={() => {
                setSignatureCaptured(true)
                toast.success("✍️ Firma Registrada", { description: "Firma capturada e incrustada en el certificado." })
              }}
            />
          )}

          {tesisCargada && (
            <Button
              onClick={onGeneratePazSalvo}
              disabled={!signatureCaptured}
              className="w-full rounded-sm text-xs gap-1.5 bg-zinc-800 hover:bg-emerald-700 text-white disabled:opacity-50"
            >
              <Download className="size-3.5" />
              Generar y Descargar Paz y Salvo PDF
            </Button>
          )}
        </div>

        {pazSalvoGenerado && (
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-zinc-800 dark:text-zinc-200 bg-zinc-700/10 p-3 rounded-sm">
            <CheckCircle2 className="size-4" /> Paz y Salvo Certificado Exitosamente
          </div>
        )}
      </div>
    </div>
  )
}
