"use client"

import { FileCheck2, FileUp, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { SubRoleInfo } from "@/lib/campus-data"
import { generarPazYSalvoPDF } from "@/lib/pdf-generator"
import { toast } from "sonner"

interface TramiteGradoViewProps {
  subRoleInfo: SubRoleInfo
  tesisCargada: boolean
  pazSalvoGenerado: boolean
  onUploadTesis: () => void
  onGeneratePazSalvo: () => void
}

export function TramiteGradoView({
  subRoleInfo,
  tesisCargada,
  pazSalvoGenerado,
  onUploadTesis,
  onGeneratePazSalvo,
}: TramiteGradoViewProps) {
  const handleDownloadPDF = () => {
    onGeneratePazSalvo()
    generarPazYSalvoPDF({
      estudianteNombre: subRoleInfo.fullName || "Kevin Alexander Gómez",
      codigoEstudiantil: "2024100982",
      programaAcademico: "Ingeniería de Sistemas",
      cedula: "1.144.109.823",
    })
    toast.success("📜 Documento PDF descargado exitosamente con sello criptográfico.", {
      description: "Paz_y_Salvo_UniCamacho.pdf guardado en su dispositivo.",
    })
  }
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-center gap-3">
          <FileCheck2 className="size-6 text-primary" />
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Trámite de Grado & Paz y Salvo Digital Criptográfico
            </h2>
            <p className="text-xs text-muted-foreground">
              Suba su tesis final y obtenga el certificado de Paz y Salvo de biblioteca con sello QR al instante.
            </p>
          </div>
        </div>

        {/* Steps Timeline */}
        <div className="grid gap-4 sm:grid-cols-3 pt-2">
          <div className="rounded-2xl border border-border p-4 bg-muted/20">
            <p className="text-xs font-bold text-primary">Paso 1: Tesis Digital</p>
            <p className="text-xs text-muted-foreground mt-1">
              {tesisCargada ? "✅ Tesis cargada en repositorio." : "Pendiente subir PDF de tesis."}
            </p>
            <Button
              size="sm"
              variant={tesisCargada ? "outline" : "default"}
              onClick={onUploadTesis}
              className="mt-3 w-full rounded-full text-xs gap-1"
            >
              <FileUp className="size-3.5" />
              {tesisCargada ? "Reemplazar Tesis PDF" : "Cargar Tesis PDF"}
            </Button>
          </div>

          <div className="rounded-2xl border border-border p-4 bg-muted/20">
            <p className="text-xs font-bold text-primary">Paso 2: Verificación de Deudas</p>
            <p className="text-xs text-muted-foreground mt-1">
              Préstamos activos: 0 · Multas activas: $0 COP.
            </p>
            <span className="mt-3 inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-600">
              ESTADO CERO DEUDAS
            </span>
          </div>

          <div className="rounded-2xl border border-border p-4 bg-muted/20">
            <p className="text-xs font-bold text-primary">Paso 3: Emisión Paz y Salvo</p>
            <p className="text-xs text-muted-foreground mt-1">
              Firma criptográfica registrada.
            </p>
            <Button
              size="sm"
              onClick={handleDownloadPDF}
              className="mt-3 w-full rounded-full text-xs gap-1 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Download className="size-3.5" />
              Generar Paz y Salvo PDF
            </Button>
          </div>
        </div>

        {pazSalvoGenerado && (
          <div className="mt-4 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                📜 CERTIFICADO DE PAZ Y SALVO REGISTRADO
              </p>
              <span className="font-mono text-[10px] bg-background px-2 py-1 rounded">
                HASH: 0x9F82A39B21C
              </span>
            </div>
            <p className="text-xs text-emerald-700 dark:text-emerald-400">
              Emitido para: {subRoleInfo.fullName} · Programa: Ingeniería de Sistemas · Unicamacho Cali.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
