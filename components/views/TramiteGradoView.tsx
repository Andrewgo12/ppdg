"use client"

import { FileCheck2, FileUp, Download, CheckCircle2, CircleDashed } from "lucide-react"
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
    toast("📜 Documento PDF descargado exitosamente con sello criptográfico.")
  }
  
  return (
    <section className="max-w-4xl w-[95vw] max-h-[88vh] overflow-y-auto mx-auto space-y-6">
      <div className="text-center space-y-2 border-b border-border/50 pb-6">
        <h2 className="text-xs sm:text-sm sm:text-lg font-medium font-bold tracking-tight text-foreground flex items-center justify-center gap-2">
          <FileCheck2 className="size-5 text-primary" />
          Proceso Formal de Grado
        </h2>
        <p className="text-[13px] text-muted-foreground max-w-lg w-[95vw] max-h-[85vh] overflow-y-auto mx-auto">
          Complete los requisitos institucionales para la obtención de su Paz y Salvo Académico y Financiero con firma digital.
        </p>
      </div>

      <div className="relative pl-6 space-y-8 before:absolute before:inset-0 before:ml-8 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border before:via-border/50 before:to-transparent">
        
        {/* Step 1 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-primary bg-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
            {tesisCargada ? <CheckCircle2 className="size-4 text-primary" /> : <CircleDashed className="size-4 text-muted-foreground" />}
          </div>
          <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-md border border-border/60 bg-card shadow-sm">
            <h3 className="font-bold text-[13px] text-foreground mb-1">1. Recepción de Tesis de Grado</h3>
            <p className="text-[11px] text-muted-foreground mb-3 leading-relaxed">
              Debe cargar su trabajo de grado en formato PDF. Será revisado por el sistema anti-plagio de la institución.
            </p>
            <Button
              size="sm"
              variant={tesisCargada ? "outline" : "default"}
              onClick={onUploadTesis}
              className="w-full h-8 text-[11px]"
            >
              <FileUp className="size-3.5 mr-1" />
              {tesisCargada ? "Actualizar Documento" : "Cargar Archivo PDF"}
            </Button>
          </div>
        </div>

        {/* Step 2 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-emerald-500 bg-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
            <CheckCircle2 className="size-4 text-emerald-500" />
          </div>
          <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-md border border-border/60 bg-card shadow-sm">
            <h3 className="font-bold text-[13px] text-foreground mb-1">2. Auditoría Financiera y Biblioteca</h3>
            <p className="text-[11px] text-muted-foreground mb-3 leading-relaxed">
              Validación automática de deudas activas, multas o material bibliográfico sin entregar.
            </p>
            <div className="bg-zinc-700/10 border border-emerald-500/20 rounded px-2 py-1.5 flex items-center justify-between text-[10px] font-mono">
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">ESTADO:</span>
              <span className="text-zinc-800 dark:text-zinc-200 dark:text-emerald-300">0 DEUDAS · 0 MULTAS</span>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${tesisCargada ? 'border-primary' : 'border-border'} bg-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10`}>
            {pazSalvoGenerado ? <CheckCircle2 className="size-4 text-primary" /> : <CircleDashed className="size-4 text-muted-foreground" />}
          </div>
          <div className={`w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-md border ${tesisCargada ? 'border-border/60 bg-card shadow-sm' : 'border-border/30 bg-muted/10'} transition-all`}>
            <h3 className="font-bold text-[13px] text-foreground mb-1">3. Emisión de Paz y Salvo Institucional</h3>
            <p className="text-[11px] text-muted-foreground mb-3 leading-relaxed">
              Documento oficial firmado criptográficamente requerido para la ceremonia de grado.
            </p>
            <Button
              size="sm"
              onClick={handleDownloadPDF}
              disabled={!tesisCargada}
              className="w-full h-8 text-[11px] bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              <Download className="size-3.5 mr-1" />
              Generar y Firmar Documento
            </Button>
          </div>
        </div>

      </div>

      {pazSalvoGenerado && (
        <div className="mt-8 p-4 rounded-md border border-emerald-500/30 bg-zinc-700/10 animate-in fade-in slide-in-from-bottom-4">
          <p className="text-[12px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <CheckCircle2 className="size-4" /> Certificado Registrado
          </p>
          <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-3 text-[10px] font-mono text-emerald-700/80 dark:text-emerald-400/80 border-t border-emerald-500/20 pt-3">
            <div>
              <span className="block opacity-70">HASH FIRMA</span>
              <span className="font-bold">0x8f3c...4a2b</span>
            </div>
            <div>
              <span className="block opacity-70">FECHA REGISTRO</span>
              <span className="font-bold">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
