"use client"

import { useRef } from "react"
import { ShieldCheck, Download, Database, Upload, Check, X, ShieldAlert } from "lucide-react"
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
    toast("🛡️ Bitácora de Auditoría Exportada (CSV)")
  }

  const handleExportBackupJSON = () => {
    exportarRespaldoBD()
    toast("💾 Copia de Seguridad JSON Generada")
  }

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      const success = importarRespaldoBD(content)
      if (success) {
        toast("✅ Base de Datos Restaurada Exitosamente")
        setTimeout(() => window.location.reload(), 1200)
      } else {
        toast("❌ Archivo JSON Inválido")
      }
    }
    reader.readAsText(file)
  }

  const permissionsList = Object.keys(PERMISSION_CATALOG) as (keyof typeof PERMISSION_CATALOG)[]

  return (
    <section className="space-y-4 font-sans text-xs">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileImport}
        accept=".json"
        className="hidden"
      />

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div>
          <h2 className="text-[13px] font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
            <ShieldCheck className="size-4 text-primary" />
            Matriz de Control de Acceso (RBAC Security)
          </h2>
          <p className="text-[10px] text-muted-foreground font-mono">
            SISTEMA DE SEGURIDAD GRANULAR // 13 PERFILES ACTIVOS
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={handleExportAuditCSV} variant="outline" className="h-7 px-2 text-[10px] rounded-sm gap-1">
            <Download className="size-3" /> Bitácora
          </Button>
          <Button onClick={handleExportBackupJSON} variant="outline" className="h-7 px-2 text-[10px] rounded-sm gap-1">
            <Database className="size-3" /> Respaldo JSON
          </Button>
          <Button onClick={() => fileInputRef.current?.click()} className="h-7 px-2 text-[10px] rounded-sm gap-1 bg-primary text-primary-foreground">
            <Upload className="size-3" /> Importar
          </Button>
        </div>
      </div>

      {/* Role Selection Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-1.5">
        {Object.values(SUB_ROLES).map((s) => {
          const isSel = currentSubRoleId === s.id
          return (
            <button
              key={s.id}
              onClick={() => onSelectSubRole(s.id)}
              className={`p-1.5 rounded-sm border text-left transition-colors font-mono ${
                isSel
                  ? "border-primary bg-primary/10 text-primary font-bold shadow-xs"
                  : "border-border/40 bg-card hover:bg-muted/30 text-muted-foreground"
              }`}
            >
              <div className="text-[9px] truncate">{s.name}</div>
              <div className="text-[8px] opacity-70 truncate">{s.category.split(".")[1]?.trim()}</div>
            </button>
          )
        })}
      </div>

      {/* Matrix Table */}
      <div className="border border-border/60 rounded-sm overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[10px]">
            <thead>
              <tr className="border-b border-border/60 bg-muted/20 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                <th className="p-2 border-r border-border/40 min-w-[200px]">Permiso / Capacidad</th>
                <th className="p-2 border-r border-border/40">Descripción de Seguridad</th>
                <th className="p-2 text-center min-w-[100px]">Estado Perfil Activo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 font-mono">
              {permissionsList.map((pKey) => {
                const currentPerms = getRolePermissions(currentSubRoleId)
                const hasPerm = currentPerms.includes(pKey)
                const meta = PERMISSION_CATALOG[pKey]

                return (
                  <tr key={pKey} className="hover:bg-muted/10 transition-colors">
                    <td className="p-2 font-bold text-foreground border-r border-border/40">
                      {pKey}
                    </td>
                    <td className="p-2 text-muted-foreground border-r border-border/40 font-sans text-[11px]">
                      {meta?.description || "Control de acceso granular"}
                    </td>
                    <td className="p-2 text-center font-bold">
                      {hasPerm ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-xs">
                          <Check className="size-3" /> AUTORIZADO
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-muted-foreground/40">
                          <X className="size-3" /> DENEGADO
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
