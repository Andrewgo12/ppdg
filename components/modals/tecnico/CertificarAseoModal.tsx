"use client"

import { Sparkles, CheckCircle2, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CertificarAseoModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirmCertify: () => void
}

export function CertificarAseoModal({
  isOpen,
  onClose,
  onConfirmCertify,
}: CertificarAseoModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-xl border border-emerald-500/30 bg-card p-4 shadow-2xl space-y-4 text-center">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Cerrar modal"
        >
          <X className="size-5" />
        </button>

        <Sparkles className="size-10 text-zinc-800 dark:text-zinc-200 mx-auto" />
        <h3 className="text-xs sm:text-sm font-bold text-foreground">Certificar Aseo & Sanitización</h3>
        <p className="text-xs text-muted-foreground">
          Consola Técnico Servicios Generales · Registro de firma de aula higienizada y lista para clase.
        </p>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="w-1/2 rounded-full text-xs">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              onConfirmCertify()
              onClose()
            }}
            className="w-1/2 rounded-full text-xs font-bold bg-zinc-800 hover:bg-emerald-700 text-white gap-1.5"
          >
            <CheckCircle2 className="size-3.5" /> Certificar Aula
          </Button>
        </div>
      </div>
    </div>
  )
}
