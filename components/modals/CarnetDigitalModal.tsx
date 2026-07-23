"use client"

import { useState, useRef } from "react"
import { QrCode, X, ShieldCheck, Cpu, Download, Camera, Save, KeyRound, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { SubRoleInfo } from "@/lib/campus-data"
import { generarCarnetImprimiblePDF } from "@/lib/pdf-carnet-generator"
import { toast } from "sonner"

interface CarnetDigitalModalProps {
  isOpen: boolean
  onClose: () => void
  subRoleInfo: SubRoleInfo
}

export function CarnetDigitalModal({ isOpen, onClose, subRoleInfo }: CarnetDigitalModalProps) {
  const [activeTab, setActiveTab] = useState<"carnet" | "perfil" | "config">("carnet")
  
  // Profile Editable State
  const [telefono, setTelefono] = useState("+57 312 459 9081")
  const [emailPersonal, setEmailPersonal] = useState("laura.restrepo.personal@gmail.com")
  const [contactoEmergencia, setContactoEmergencia] = useState("Sra. Elena Gómez (Madre) - 315 889 2011")
  const [rh, setRh] = useState("O POSITIVO (O+)")
  const [cedula, setCedula] = useState("1.144.109.823")
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(null)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const photoInputRef = useRef<HTMLInputElement | null>(null)

  if (!isOpen) return null

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      setCustomPhotoUrl(event.target?.result as string)
      toast("📷 Foto de perfil actualizada correctamente")
    }
    reader.readAsDataURL(file)
  }

  const handleSaveProfile = () => {
    toast("✅ Perfil y datos de contacto actualizados exitosamente")
  }

  const handleDownloadPrintablePdf = () => {
    generarCarnetImprimiblePDF({
      subRoleInfo,
      telefono,
      emailPersonal,
      contactoEmergencia,
      rh,
      cedula,
    })
    toast("🪪 Carnet PDF descargado listo para Imprimir y Laminar (Frente y Reverso).")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-foreground/50 backdrop-blur-md animate-in fade-in duration-200">
      <input
        type="file"
        ref={photoInputRef}
        onChange={handlePhotoUpload}
        accept="image/*"
        className="hidden"
      />

      <div className="relative w-full max-w-lg rounded-sm border border-border/80 bg-card shadow-2xl overflow-hidden font-sans text-xs">
        
        {/* Header Superior Institucional estilo ARL / Credencial Oficial */}
        <div className="bg-[#0F2043] p-3 text-white flex items-center justify-between border-b-2 border-[#D4A017]">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-sm bg-[#D4A017]/20 border border-[#D4A017]/40">
              <ShieldCheck className="size-5 text-[#D4A017]" />
            </div>
            <div>
              <p className="text-[9px] font-mono font-bold tracking-widest text-[#D4A017] uppercase leading-none">
                INSTITUCIÓN UNIVERSITARIA ANTONIO JOSÉ CAMACHO
              </p>
              <h3 className="text-[12px] font-extrabold uppercase tracking-wider mt-0.5">
                CREDENCIAL DIGITAL INSTITUCIONAL & ARL
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-sm p-1 text-white/70 hover:bg-white/10 hover:text-white"
            aria-label="Cerrar modal"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-border/60 bg-muted/20 text-[10px] font-mono uppercase">
          <button
            onClick={() => setActiveTab("carnet")}
            className={`flex-1 py-2 text-center font-bold border-b-2 transition-colors ${
              activeTab === "carnet"
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-muted-foreground hover:bg-muted/40"
            }`}
          >
            🪪 Carnet ARL / ID
          </button>
          <button
            onClick={() => setActiveTab("perfil")}
            className={`flex-1 py-2 text-center font-bold border-b-2 transition-colors ${
              activeTab === "perfil"
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-muted-foreground hover:bg-muted/40"
            }`}
          >
            👤 Editar Perfil & Foto
          </button>
          <button
            onClick={() => setActiveTab("config")}
            className={`flex-1 py-2 text-center font-bold border-b-2 transition-colors ${
              activeTab === "config"
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-muted-foreground hover:bg-muted/40"
            }`}
          >
            ⚙️ Configuraciones
          </button>
        </div>

        {/* TAB 1: CARNET OFICIAL ARL / CREDENCIAL */}
        {activeTab === "carnet" && (
          <div className="p-4 space-y-3 bg-gradient-to-b from-card to-muted/10">
            {/* Holograma de Seguridad / Chip ARL */}
            <div className="flex justify-between items-center bg-muted/30 p-2 rounded-sm border border-border/40 font-mono text-[9px]">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                <Cpu className="size-3.5 text-primary" /> CHIP NFC SEGURO PASIVO
              </span>
              <span className="bg-[#D4A017]/10 text-[#D4A017] border border-[#D4A017]/30 px-1.5 py-0.5 rounded-xs font-bold">
                VERIFICADO ARL POSITIVA
              </span>
            </div>

            {/* Layout de Foto y Datos Oficiales */}
            <div className="grid grid-cols-3 gap-3 items-center">
              {/* Foto de Ficha / Avatar */}
              <div className="col-span-1 flex flex-col items-center space-y-1">
                <div
                  onClick={() => photoInputRef.current?.click()}
                  className="size-24 rounded-sm border-2 border-primary/60 bg-muted flex items-center justify-center font-bold text-xl text-primary shadow-xs relative overflow-hidden cursor-pointer group"
                >
                  {customPhotoUrl ? (
                    <img src={customPhotoUrl} alt="Perfil" className="size-full object-cover" />
                  ) : (
                    subRoleInfo.avatar
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                    <Camera className="size-5" />
                  </div>
                </div>
                <span className="text-[8px] font-mono text-muted-foreground font-bold">RH: {rh}</span>
              </div>

              {/* Ficha Técnica del Titular */}
              <div className="col-span-2 space-y-1.5 font-mono text-[10px]">
                <div>
                  <span className="text-[8px] text-muted-foreground block uppercase">NOMBRES Y APELLIDOS:</span>
                  <span className="font-bold text-foreground text-[11px] block leading-tight">{subRoleInfo.fullName}</span>
                </div>
                <div className="grid grid-cols-2 gap-1 border-t border-border/40 pt-1">
                  <div>
                    <span className="text-[8px] text-muted-foreground block">CÉDULA / C.C.:</span>
                    <span className="font-bold text-foreground">{cedula}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-muted-foreground block">CÓDIGO UNICAMACHO:</span>
                    <span className="font-bold text-primary">2024100982</span>
                  </div>
                </div>
                <div className="border-t border-border/40 pt-1">
                  <span className="text-[8px] text-muted-foreground block uppercase">PROGRAMA / ROL ACADÉMICO:</span>
                  <span className="font-medium text-foreground">{subRoleInfo.name}</span>
                </div>
              </div>
            </div>

            {/* Tabla de Cobertura Médica & ARL */}
            <div className="border border-border/60 rounded-sm overflow-hidden bg-card font-mono text-[9px]">
              <table className="w-full text-left">
                <tbody className="divide-y divide-border/40">
                  <tr className="bg-muted/10">
                    <td className="p-1.5 text-muted-foreground border-r border-border/40 font-bold">EPS AFILIADA:</td>
                    <td className="p-1.5 text-foreground font-semibold">SURA EPS S.A.</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 text-muted-foreground border-r border-border/40 font-bold">ARL INSTITUCIONAL:</td>
                    <td className="p-1.5 text-foreground font-semibold">ARL POSITIVA / POLIZA CAMPUS #9012</td>
                  </tr>
                  <tr className="bg-muted/10">
                    <td className="p-1.5 text-muted-foreground border-r border-border/40 font-bold">NOTIFICACIONES:</td>
                    <td className="p-1.5 text-foreground font-semibold truncate">{emailPersonal}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* QR Verificador & Botón Imprimir Laminar */}
            <div className="p-2 border border-border/60 bg-muted/20 rounded-sm flex items-center justify-between font-mono">
              <div className="space-y-0.5">
                <span className="text-[8px] text-muted-foreground block">SELLO QR DE VALIDACIÓN CAMPUS:</span>
                <span className="text-[9px] font-bold text-primary block">QR-ARL-CAMACHO-2026-X9</span>
                <span className="text-[8px] text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="size-3" /> Paz y Salvo Vigente 2026-A
                </span>
              </div>
              <QrCode className="size-10 text-foreground shrink-0" />
            </div>

            <Button
              onClick={handleDownloadPrintablePdf}
              className="w-full h-8 text-[10px] font-mono uppercase rounded-sm bg-[#0F2043] text-white hover:bg-[#0F2043]/90 gap-1.5 font-bold"
            >
              <Download className="size-3.5 text-[#D4A017]" /> Descargar Carnet PDF (Imprimir & Laminar CR80)
            </Button>
          </div>
        )}

        {/* TAB 2: EDITAR PERFIL & FOTO */}
        {activeTab === "perfil" && (
          <div className="p-4 space-y-3 font-sans">
            <div className="space-y-1 border-b border-border/40 pb-2">
              <h4 className="font-bold text-[12px] uppercase text-foreground">Editar Datos Personales y Foto</h4>
              <p className="text-[10px] text-muted-foreground font-mono">Actualiza tu foto de carnet y datos de contacto.</p>
            </div>

            <div className="space-y-2.5 font-mono text-[10px]">
              {/* Campos Inmutables de Identidad Oficial */}
              <div className="p-2 border border-amber-500/30 bg-amber-500/5 rounded-sm space-y-1.5">
                <div className="flex items-center justify-between text-[8px] font-bold text-amber-700 dark:text-amber-400">
                  <span className="flex items-center gap-1 uppercase">
                    <Lock className="size-3 text-amber-500" /> Identidad Oficial Inmutable
                  </span>
                  <span>REGISTRO ACADÉMICO UNICAMACHO</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[9px]">
                  <div>
                    <span className="text-[8px] text-muted-foreground block">NOMBRE Y APELLIDOS:</span>
                    <span className="font-bold text-foreground">{subRoleInfo.fullName}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-muted-foreground block">CÉDULA DE CIUDADANÍA:</span>
                    <span className="font-bold text-foreground">{cedula}</span>
                  </div>
                  <div className="col-span-2 border-t border-amber-500/20 pt-1">
                    <span className="text-[8px] text-muted-foreground block">CORREO INSTITUCIONAL OFICIAL (Único de Acceso):</span>
                    <span className="font-bold text-primary truncate block">{subRoleInfo.fullName.toLowerCase().replace(/\s+/g, ".")}@unicamacho.edu.co</span>
                  </div>
                </div>
              </div>

              {/* Cambiar foto */}
              <div className="flex items-center justify-between p-2 border border-border/40 rounded-sm bg-card">
                <div className="flex items-center gap-2">
                  <div className="size-10 rounded-sm border border-primary/40 bg-muted flex items-center justify-center font-bold text-primary overflow-hidden">
                    {customPhotoUrl ? <img src={customPhotoUrl} alt="Foto" className="size-full object-cover" /> : subRoleInfo.avatar}
                  </div>
                  <div>
                    <span className="font-bold text-foreground block">Fotografía Oficial del Carnet</span>
                    <span className="text-[8px] text-muted-foreground">Formato JPG o PNG</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => photoInputRef.current?.click()} className="h-6 text-[9px] gap-1">
                  <Camera className="size-3" /> Subir Foto
                </Button>
              </div>

              {/* Campos Editables */}
              <div>
                <label className="text-[8px] text-muted-foreground uppercase block font-bold mb-0.5">TELÉFONO DE CONTACTO (EDITABLE)</label>
                <input
                  type="text"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="w-full h-7 px-2 rounded-sm border border-border/60 bg-background text-[10px] outline-none font-bold"
                />
              </div>

              <div>
                <label className="text-[8px] text-muted-foreground uppercase block font-bold mb-0.5">CORREO PERSONAL PARA NOTIFICACIONES (EDITABLE)</label>
                <input
                  type="email"
                  value={emailPersonal}
                  onChange={(e) => setEmailPersonal(e.target.value)}
                  className="w-full h-7 px-2 rounded-sm border border-border/60 bg-background text-[10px] outline-none font-bold"
                />
              </div>

              <div>
                <label className="text-[8px] text-muted-foreground uppercase block font-bold mb-0.5">CONTACTO DE EMERGENCIA & PARENTESCO (EDITABLE)</label>
                <input
                  type="text"
                  value={contactoEmergencia}
                  onChange={(e) => setContactoEmergencia(e.target.value)}
                  className="w-full h-7 px-2 rounded-sm border border-border/60 bg-background text-[10px] outline-none font-bold"
                />
              </div>

              <div>
                <label className="text-[8px] text-muted-foreground uppercase block font-bold mb-0.5">GRUPO SANGUÍNEO (RH)</label>
                <input
                  type="text"
                  value={rh}
                  onChange={(e) => setRh(e.target.value)}
                  className="w-full h-7 px-2 rounded-sm border border-border/60 bg-background text-[10px] outline-none font-bold"
                />
              </div>
            </div>

            <Button
              onClick={handleSaveProfile}
              className="w-full h-8 text-[10px] font-mono uppercase rounded-sm bg-primary text-primary-foreground font-bold gap-1.5 mt-2"
            >
              <Save className="size-3.5" /> Guardar Cambios en Mi Perfil
            </Button>
          </div>
        )}

        {/* TAB 3: CONFIGURACIONES */}
        {activeTab === "config" && (
          <div className="p-4 space-y-3 font-sans">
            <div className="space-y-1 border-b border-border/40 pb-2">
              <h4 className="font-bold text-[12px] uppercase text-foreground">Preferencias de Notificación y Token JWT</h4>
              <p className="text-[10px] text-muted-foreground font-mono">Ajustes de alertas universitarias y credenciales de acceso.</p>
            </div>

            <div className="space-y-2 font-mono text-[10px]">
              <div className="flex items-center justify-between p-2 border border-border/40 rounded-sm bg-card">
                <div>
                  <span className="font-bold text-foreground block">Notificaciones al Correo Personal</span>
                  <span className="text-[8px] text-muted-foreground">Alertas a {emailPersonal}</span>
                </div>
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  className="size-4 text-primary rounded-xs"
                />
              </div>

              <div className="p-2 border border-border/40 rounded-sm bg-card space-y-1">
                <span className="font-bold text-foreground block">Token JWT Activo</span>
                <span className="text-[8px] text-muted-foreground block truncate">Bearer eyJhbGciOiJIUzI1NiIsInR...</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toast("🔑 Token de sesión renovado exitosamente.")}
                  className="h-6 text-[9px] rounded-sm gap-1 mt-1"
                >
                  <KeyRound className="size-3" /> Renovar Token JWT
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-3 border-t border-border/60 bg-muted/20 flex justify-end">
          <Button onClick={onClose} variant="outline" className="h-7 text-[10px] font-mono rounded-sm px-4">
            Cerrar Ficha
          </Button>
        </div>
      </div>
    </div>
  )
}
