"use client"

import { QrCode, X, ShieldCheck, Sparkles, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { SubRoleInfo } from "@/lib/campus-data"

interface CarnetDigitalModalProps {
  isOpen: boolean
  onClose: () => void
  subRoleInfo: SubRoleInfo
}

export function CarnetDigitalModal({ isOpen, onClose, subRoleInfo }: CarnetDigitalModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-3xl border border-border bg-card shadow-2xl overflow-hidden">
        {/* Encabezado Carnet - Franja Azul Institucional */}
        <div className="bg-[#0F2043] p-4 text-white text-center space-y-1 relative">
          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full p-1 text-white/70 hover:bg-white/10 hover:text-white"
            aria-label="Cerrar modal"
          >
            <X className="size-4" />
          </button>

          <p className="text-[10px] font-bold tracking-widest text-[#D4A017] uppercase">
            Institución Universitaria Antonio José Camacho
          </p>
          <h3 className="text-sm font-extrabold tracking-tight">CARNET DIGITAL INSTITUCIONAL</h3>
          <p className="text-[9px] text-white/70">UniCamacho Cali · PWA SmartCampus</p>
        </div>

        {/* Cuerpo del Carnet */}
        <div className="p-5 space-y-4 text-center">
          {/* Avatar y Badge */}
          <div className="relative mx-auto size-20 rounded-full bg-gradient-to-tr from-primary to-accent p-1 shadow-md">
            <div className="flex size-full items-center justify-center rounded-full bg-card text-3xl font-bold">
              {subRoleInfo.avatar}
            </div>
            <span className="absolute bottom-0 right-0 rounded-full bg-emerald-500 p-1 text-white shadow-xs">
              <ShieldCheck className="size-3.5" />
            </span>
          </div>

          <div>
            <h4 className="text-base font-bold text-foreground">{subRoleInfo.fullName}</h4>
            <p className="text-xs font-semibold text-primary">{subRoleInfo.name}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{subRoleInfo.title}</p>
          </div>

          <div className="rounded-2xl bg-muted/40 p-3 space-y-1 text-xs text-left border border-border">
            <div className="flex justify-between">
              <span className="text-muted-foreground">ID / Código:</span>
              <span className="font-mono font-bold text-foreground">2024100982</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sede Registrada:</span>
              <span className="font-medium text-foreground">Sede Principal Av. 6</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estado Académico:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">ACTIVO ✓</span>
            </div>
          </div>

          {/* Código QR Verificador */}
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-3 space-y-1 flex flex-col items-center">
            <QrCode className="size-16 text-primary" />
            <p className="font-mono text-[10px] text-muted-foreground">QR-ID-{subRoleInfo.id.toUpperCase()}-2026</p>
            <span className="text-[9px] text-emerald-600 font-semibold flex items-center gap-1">
              <Sparkles className="size-2.5" /> Firma Criptográfica Verificada
            </span>
          </div>

          <Button onClick={onClose} className="w-full rounded-full text-xs font-bold">
            Cerrar Carnet
          </Button>
        </div>
      </div>
    </div>
  )
}
