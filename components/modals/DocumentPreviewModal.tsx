"use client"

import { FileCheck2, Download, X, ShieldCheck, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DocumentPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirmDownload: () => void
  title?: string
  studentName?: string
}

export function DocumentPreviewModal({
  isOpen,
  onClose,
  onConfirmDownload,
  title = "Certificado de Paz y Salvo Institucional",
  studentName = "Kevin Alexander Gómez",
}: DocumentPreviewModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-foreground/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg w-[95vw] max-h-[85vh] overflow-y-auto rounded-sm border border-border bg-card p-3 shadow-2xl space-y-2.5">
        <button
          onClick={onClose}
          className="absolute right-4 top-3 rounded-sm p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Cerrar modal"
        >
          <X className="size-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-border pb-3">
          <FileCheck2 className="size-6 text-primary" />
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-foreground">Vista Previa de Documento Oficial</h3>
            <p className="text-xs text-muted-foreground">Pre-visualización antes de generar archivo PDF</p>
          </div>
        </div>

        {/* Simulación del PDF impreso oficial */}
        <div className="rounded-sm border border-border bg-slate-50 dark:bg-slate-900 p-3 space-y-2.5 font-sans text-xs text-slate-800 dark:text-slate-200 shadow-inner">
          {/* Header oficial */}
          <div className="text-center border-b border-slate-300 dark:border-slate-700 pb-3 space-y-0.5">
            <p className="font-extrabold text-sm text-[#0F2043] dark:text-blue-400">INSTITUCIÓN UNIVERSITARIA ANTONIO JOSÉ CAMACHO</p>
            <p className="text-[10px] text-slate-500">Sede Principal Av. 6 Norte | Santiago de Cali, Colombia</p>
            <p className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200">CERTIFICADO DIGITAL DE PAZ Y SALVO N° 2026-892</p>
          </div>

          {/* Datos Estudiante */}
          <div className="space-y-1 bg-white dark:bg-slate-800 p-3 rounded-sm border border-slate-200 dark:border-slate-700">
            <p><span className="font-bold">Graduando:</span> {studentName}</p>
            <p><span className="font-bold">Programa:</span> Ingeniería de Sistemas</p>
            <p><span className="font-bold">Código:</span> 2024100982 | Cédula: 1.144.109.823</p>
          </div>

          {/* Lista Dependencias */}
          <div className="space-y-1">
            <p className="font-bold text-[11px] text-primary">Verificación de Paz y Salvos:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px]">
              <li className="bg-zinc-700/10 text-emerald-700 dark:text-emerald-300 p-2 rounded-sm font-semibold">✓ Biblioteca UniBiblio: Cero Deudas</li>
              <li className="bg-zinc-700/10 text-emerald-700 dark:text-emerald-300 p-2 rounded-sm font-semibold">✓ Tesorería: Paz y Salvo Matrícula</li>
              <li className="bg-zinc-700/10 text-emerald-700 dark:text-emerald-300 p-2 rounded-sm font-semibold">✓ Decanatura: Plan Aprobado</li>
              <li className="bg-zinc-700/10 text-emerald-700 dark:text-emerald-300 p-2 rounded-sm font-semibold">✓ Laboratorios: Insumos al Día</li>
            </ul>
          </div>

          {/* Hash y Sello */}
          <div className="flex items-center justify-between border-t border-slate-300 dark:border-slate-700 pt-3 text-[10px]">
            <div className="flex items-center gap-1 font-mono text-slate-500">
              <QrCode className="size-4 text-primary" />
              <span>HASH: SHA256-UNICAMACHO-982</span>
            </div>
            <span className="font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1">
              <ShieldCheck className="size-3.5" /> Sello Validador
            </span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" onClick={onClose} className="w-1/2 rounded-sm text-xs">
            Cerrar Vista Previa
          </Button>
          <Button
            onClick={onConfirmDownload}
            className="w-1/2 rounded-sm text-xs font-bold bg-zinc-800 hover:bg-emerald-700 text-white gap-1"
          >
            <Download className="size-3.5" />
            Descargar PDF Oficial
          </Button>
        </div>
      </div>
    </div>
  )
}
