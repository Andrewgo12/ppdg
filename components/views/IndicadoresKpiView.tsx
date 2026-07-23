"use client"

import { BarChart3, TrendingUp, Clock, ShieldCheck, Zap, BookOpen, Users, CheckCircle2 } from "lucide-react"

export function IndicadoresKpiView() {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
            <BarChart3 className="size-5 text-primary" />
            Panel de Indicadores Institucionales & KPIs de Gestión
          </h2>
          <p className="text-xs text-muted-foreground">
            Cuadro de mando ejecutivo: rendimiento operativo, uso de campus e indicadores bibliotecarios.
          </p>
        </div>
      </div>

      {/* Primary Top Executive Cards */}
      <div className="grid gap-4 sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Disponibilidad Campus</span>
            <Zap className="size-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-foreground">94.2%</p>
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: "94.2%" }} />
          </div>
          <p className="text-[10px] text-muted-foreground">113 de 120 salones operativos</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Tiempo Respuesta MTTR</span>
            <Clock className="size-4 text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">1.4 Horas</p>
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-primary" style={{ width: "85%" }} />
          </div>
          <p className="text-[10px] text-emerald-600 font-semibold">⚡ Meta de 2.0h superada</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Prestamos UniBiblio</span>
            <BookOpen className="size-4 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-foreground">1,420</p>
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-purple-500" style={{ width: "78%" }} />
          </div>
          <p className="text-[10px] text-muted-foreground">99.1% con Paz y Salvo al día</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Firmas Criptográficas</span>
            <ShieldCheck className="size-4 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-foreground">100%</p>
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-amber-500" style={{ width: "100%" }} />
          </div>
          <p className="text-[10px] text-muted-foreground">Transacciones con hash SHA-256</p>
        </div>
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid gap-4 md:grid-cols-1 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4 space-y-4">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <TrendingUp className="size-4 text-primary" />
            Consumo de Insumos por Facultad (Último Semestre)
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Facultad de Ingeniería (Sede Principal)</span>
                <span>45% (450 Cables & Conectores)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "45%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Facultad de Ciencias Empresariales</span>
                <span>30% (300 Insumos)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: "30%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Educación a Distancia & Virtual</span>
                <span>25% (250 Insumos)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-purple-500" style={{ width: "25%" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 space-y-4">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Users className="size-4 text-primary" />
            Satisfacción Institucional y Cumplimiento RETIE
          </h3>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-lg bg-muted/40 flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">Aulas con Certificación Eléctrica RETIE</p>
                <p className="text-[11px] text-muted-foreground">Inspección de enchufes y tableros</p>
              </div>
              <span className="font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full text-xs">100% Cumplido</span>
            </div>

            <div className="p-3 rounded-lg bg-muted/40 flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">Tiempo Emisión Paz y Salvo Grado</p>
                <p className="text-[11px] text-muted-foreground">Promedio de generación instantánea</p>
              </div>
              <span className="font-bold text-primary bg-muted/40 px-2.5 py-1 rounded-full text-xs">0.5 Segundos</span>
            </div>

            <div className="p-3 rounded-lg bg-muted/40 flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">Efectividad Solicitudes Express</p>
                <p className="text-[11px] text-muted-foreground">Atención de insumos en clase</p>
              </div>
              <span className="font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full text-xs">98.4% Entregados</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
