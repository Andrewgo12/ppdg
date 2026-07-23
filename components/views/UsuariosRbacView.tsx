"use client"

import { useRef } from "react"
import { ShieldCheck, CheckCircle2, Download, Database, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SUB_ROLES, type SubRoleId } from "@/lib/campus-data"
import { getRolePermissions, PERMISSION_CATALOG } from "@/lib/permissions"
import { exportarAuditoriaCSV } from "@/lib/csv-exporter"
import { exportarRespaldoBD, importarRespaldoBD } from "@/lib/db-backup"
import { toast } from "sonner"

interface UsuariosRbacViewProps {
  currentSubRoleId: SubRoleId
  onSelectSubRole: (id: SubRoleId) => void
}

export function UsuariosRbacView({ currentSubRoleId, onSelectSubRole }: UsuariosRbacViewProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleExportAuditCSV = () => {
    exportarAuditoriaCSV()
    toast.success("🛡️ Bitácora de Auditoría Exportada", {
      description: "Archivo Bitacora_Auditoria_RBAC_UniCamacho.csv generado con firmas SHA-256."
    })
  }

  const handleExportBackupJSON = () => {
    exportarRespaldoBD()
    toast.success("💾 Copia de Seguridad JSON Generada", {
      description: "Base de Datos SmartCampus respaldada exitosamente."
    })
  }

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      const success = importarRespaldoBD(content)
      if (success) {
        toast.success("✅ Base de Datos Restaurada", {
          description: "Estado importado exitosamente. Recargando datos..."
        })
        setTimeout(() => window.location.reload(), 1200)
      } else {
        toast.error("❌ Error de Importación", {
          description: "El archivo JSON no coincide con la estructura de SmartCampus."
        })
      }
    }
    reader.readAsText(file)
  }

  return (
    <section className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileImport}
        accept=".json"
        className="hidden"
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
            <ShieldCheck className="size-5 text-primary" />
            Matriz de Control de Acceso Basado en Roles (RBAC) - 13 Sub-Perfiles
          </h2>
          <p className="text-xs text-muted-foreground">
            Seleccione cualquier perfil individual para probar sus permisos granulares y vistas exclusivas.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={handleExportAuditCSV} variant="outline" className="rounded-full gap-1.5 text-xs h-8">
            <Download className="size-3.5 text-primary" />
            Bitácora CSV
          </Button>
          <Button onClick={handleExportBackupJSON} variant="outline" className="rounded-full gap-1.5 text-xs h-8">
            <Database className="size-3.5 text-primary" />
            Respaldo JSON BD
          </Button>
          <Button onClick={() => fileInputRef.current?.click()} className="rounded-full gap-1.5 text-xs h-8 bg-primary">
            <Upload className="size-3.5" />
            Restaurar BD JSON
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Object.values(SUB_ROLES).map((s) => {
          const isSel = currentSubRoleId === s.id
          const pKeys = getRolePermissions(s.id)
          return (
            <div
              key={s.id}
              onClick={() => onSelectSubRole(s.id)}
              className={`rounded-xl border p-4 transition-all cursor-pointer ${
                isSel
                  ? "border-primary bg-muted/40 shadow-md ring-2 ring-primary/20"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase text-primary bg-muted/40 px-2 py-0.5 rounded-full">
                  {s.category}
                </span>
                {isSel && (
                  <span className="text-xs font-bold text-primary flex items-center gap-1">
                    ✓ Activo
                  </span>
                )}
              </div>

              <h3 className="text-sm font-bold text-foreground">{s.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{s.fullName} · {s.title}</p>
              <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">{s.tagline}</p>

              <div className="mt-3 pt-3 border-t border-border/60 text-[10px] space-y-1 text-muted-foreground">
                <p className="font-semibold text-foreground flex items-center justify-between">
                  <span>Acciones Otorgadas en BD:</span>
                  <span className="font-mono text-primary font-bold">{pKeys.length} permisos</span>
                </p>
                <div className="space-y-0.5 max-h-20 overflow-y-auto pr-1">
                  {pKeys.map((pk) => {
                    const def = PERMISSION_CATALOG[pk]
                    return (
                      <p key={pk} className="flex items-center gap-1 text-[10px] text-foreground/80">
                        <CheckCircle2 className="size-3 text-emerald-500 shrink-0" />
                        <span className="truncate">{def?.label || pk}</span>
                      </p>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
