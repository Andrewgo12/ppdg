"use client"

import { BarChart3, TrendingUp, Clock, ShieldCheck, Zap, BookOpen } from "lucide-react"
import CountUp from "@/components/reactbits/CountUp/CountUp"
import ShinyText from "@/components/reactbits/ShinyText/ShinyText"

export function IndicadoresKpiView() {
  return (
    <section className="space-y-4 text-xs font-sans">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div>
          <h2 className="text-[13px] font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
            <BarChart3 className="size-4 text-primary" />
            <ShinyText text="Cuadro de Mando Ejecutivo & Telemetría KPI" />
          </h2>
          <p className="text-[10px] text-muted-foreground font-mono">
            MÉTRICAS EN TIEMPO REAL // RENDIMIENTO OPERATIVO CAMPUS
          </p>
        </div>
      </div>

      {/* Top Telemetry Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 font-mono">
        <div className="border border-border/60 rounded-sm bg-card p-2.5 space-y-1">
          <div className="flex justify-between items-center text-[9px] text-muted-foreground">
            <span>DISPONIBILIDAD</span>
            <Zap className="size-3 text-emerald-500" />
          </div>
          <p className="text-base font-bold text-foreground">
            <CountUp to={94} suffix=".2%" duration={1.5} />
          </p>
          <div className="h-1 w-full rounded-xs bg-muted overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: "94.2%" }} />
          </div>
          <p className="text-[8px] text-muted-foreground">113/120 SALONES OK</p>
        </div>

        <div className="border border-border/60 rounded-sm bg-card p-2.5 space-y-1">
          <div className="flex justify-between items-center text-[9px] text-muted-foreground">
            <span>MTTR RESPUESTA</span>
            <Clock className="size-3 text-primary" />
          </div>
          <p className="text-base font-bold text-foreground">
            <CountUp to={1} suffix=".4 HRS" duration={1.2} />
          </p>
          <div className="h-1 w-full rounded-xs bg-muted overflow-hidden">
            <div className="h-full bg-primary" style={{ width: "85%" }} />
          </div>
          <p className="text-[8px] text-emerald-600 font-bold">META 2.0H SUPERADA</p>
        </div>

        <div className="border border-border/60 rounded-sm bg-card p-2.5 space-y-1">
          <div className="flex justify-between items-center text-[9px] text-muted-foreground">
            <span>UNIBIBLIO LOANS</span>
            <BookOpen className="size-3 text-purple-500" />
          </div>
          <p className="text-base font-bold text-foreground">
            <CountUp to={142} suffix=" ACT" duration={1.8} />
          </p>
          <p className="text-base font-bold text-foreground">1,420</p>
          <div className="h-1 w-full rounded-xs bg-muted overflow-hidden">
            <div className="h-full bg-purple-500" style={{ width: "78%" }} />
          </div>
          <p className="text-[8px] text-muted-foreground">99.1% AL DÍA</p>
        </div>

        <div className="border border-border/60 rounded-sm bg-card p-2.5 space-y-1">
          <div className="flex justify-between items-center text-[9px] text-muted-foreground">
            <span>FIRMA CRIPTO</span>
            <ShieldCheck className="size-3 text-amber-500" />
          </div>
          <p className="text-base font-bold text-foreground">100%</p>
          <div className="h-1 w-full rounded-xs bg-muted overflow-hidden">
            <div className="h-full bg-amber-500" style={{ width: "100%" }} />
          </div>
          <p className="text-[8px] text-muted-foreground">HASH SHA-256 REGISTRADO</p>
        </div>
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="border border-border/60 rounded-sm bg-card p-3 space-y-3">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5 border-b border-border/40 pb-2">
            <TrendingUp className="size-3.5 text-primary" /> Consumo por Facultad
          </h3>
          <div className="space-y-2 font-mono text-[10px]">
            <div>
              <div className="flex justify-between text-muted-foreground mb-1">
                <span>Facultad de Ingeniería</span>
                <span className="font-bold text-foreground">45% (450 Unid)</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-xs overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "45%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-muted-foreground mb-1">
                <span>Ciencias Empresariales</span>
                <span className="font-bold text-foreground">30% (300 Unid)</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-xs overflow-hidden">
                <div className="h-full bg-primary/70" style={{ width: "30%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-muted-foreground mb-1">
                <span>Derecho y Humanidades</span>
                <span className="font-bold text-foreground">25% (250 Unid)</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-xs overflow-hidden">
                <div className="h-full bg-primary/40" style={{ width: "25%" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="border border-border/60 rounded-sm bg-card p-3 space-y-3">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5 border-b border-border/40 pb-2">
            <BarChart3 className="size-3.5 text-primary" /> Ocupación por Bloque
          </h3>
          <div className="space-y-2 font-mono text-[10px]">
            <div>
              <div className="flex justify-between text-muted-foreground mb-1">
                <span>Bloque A (Aulas Generales)</span>
                <span className="font-bold text-foreground">88%</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-xs overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: "88%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-muted-foreground mb-1">
                <span>Bloque C (Laboratorios IT)</span>
                <span className="font-bold text-foreground">92%</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-xs overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: "92%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-muted-foreground mb-1">
                <span>Biblioteca UniBiblio</span>
                <span className="font-bold text-foreground">64%</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-xs overflow-hidden">
                <div className="h-full bg-emerald-500/60" style={{ width: "64%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
