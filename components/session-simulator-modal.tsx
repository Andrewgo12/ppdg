"use client"

import { useState } from "react"
import { ShieldAlert, Download, Upload, RefreshCw, KeyRound, CheckCircle2, History, Database, Cpu, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StorageManager } from "@/lib/storage-sync"
import { getRolePermissions, PERMISSION_CATALOG } from "@/lib/permissions"
import type { SubRoleId } from "@/lib/campus-data"

interface SessionSimulatorModalProps {
  subRole: SubRoleId
  onClose: () => void
  onExpireSession: () => void
}

export function SessionSimulatorModal({ subRole, onClose, onExpireSession }: SessionSimulatorModalProps) {
  const [activeTab, setActiveTab] = useState<"permissions" | "audit" | "backup" | "security">("permissions")
  const [importStatus, setImportStatus] = useState<string | null>(null)
  
  const permissions = getRolePermissions(subRole)
  const auditLogs = StorageManager.getAuditLogs()

  function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string)
        if (json.salones) StorageManager.saveSalones(json.salones)
        if (json.tickets) StorageManager.saveTickets(json.tickets)
        if (json.reservas) StorageManager.saveReservas(json.reservas)
        if (json.libros) StorageManager.saveLibros(json.libros)
        if (json.prestamos) StorageManager.savePrestamos(json.prestamos)
        if (json.insumos) StorageManager.saveInsumos(json.insumos)
        if (json.despachos) StorageManager.saveDespachos(json.despachos)
        if (json.usuarios) StorageManager.saveUsuarios(json.usuarios)
        
        setImportStatus("✅ Datos importados con éxito. Recargando...")
        setTimeout(() => window.location.reload(), 800)
      } catch (err) {
        setImportStatus("❌ Archivo JSON no válido.")
      }
    }
    reader.readAsText(file)
  }

  function handleResetData() {
    if (confirm("¿Estás seguro de restablecer todos los datos locales a los valores iniciales?")) {
      StorageManager.resetAll()
      window.location.reload()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl w-[95vw] max-h-[88vh] overflow-y-auto rounded-xl border border-border bg-card p-4 shadow-2xl space-y-3 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-muted/40 text-primary font-bold">
              <Cpu className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Consola de Estado y Simulación Frontend</h2>
              <p className="text-xs text-muted-foreground">Pruebas de Seguridad RBAC, Auditoría y Persistencia</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-xl">
            ✕ Cerrar
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border/60 pb-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab("permissions")}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "permissions"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <Lock className="size-3.5" />
            <span>Matriz Permisos ({permissions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("audit")}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "audit"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <History className="size-3.5" />
            <span>Bitácora de Auditoría ({auditLogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("backup")}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "backup"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <Database className="size-3.5" />
            <span>Respaldos & LocalStorage</span>
          </button>

          <button
            onClick={() => setActiveTab("security")}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "security"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <KeyRound className="size-3.5" />
            <span>Simulador de Tokens/Sesión</span>
          </button>
        </div>

        {/* Tab 1: Permissions */}
        {activeTab === "permissions" && (
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            <p className="text-xs text-muted-foreground">
              Lista de acciones específicas otorgadas al sub-perfil <span className="font-bold text-foreground">{subRole}</span>:
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-1 sm:grid-cols-2">
              {permissions.map((pKey) => {
                const def = PERMISSION_CATALOG[pKey]
                return (
                  <div key={pKey} className="flex items-start gap-2.5 rounded-xl border border-border/80 bg-background/80 p-2.5 text-xs">
                    <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-foreground">{def?.label || pKey}</p>
                      <p className="text-[10px] text-muted-foreground">{def?.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Audit Logs Stream */}
        {activeTab === "audit" && (
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-foreground">Registro en Tiempo Real (Audit Stream)</span>
              <span className="text-[10px] text-muted-foreground">{auditLogs.length} eventos guardados</span>
            </div>
            {auditLogs.map((log) => (
              <div key={log.id} className="rounded-xl border border-border/80 bg-background/80 p-2.5 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary">{log.accion}</span>
                  <span className="text-[10px] text-muted-foreground">{log.fecha}</span>
                </div>
                <p className="text-muted-foreground text-[11px]">{log.detalles}</p>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground pt-1 border-t border-border/40">
                  <span>Usuario: <strong>{log.usuario}</strong></span>
                  <span>•</span>
                  <span>Recurso/Rol: <strong>{log.recurso}</strong></span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Backup & LocalStorage */}
        {activeTab === "backup" && (
          <div className="space-y-4 text-xs">
            <div className="rounded-lg border border-border p-4 bg-background/80 space-y-3">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <Download className="size-4 text-primary" />
                Exportar Respaldo en JSON
              </h3>
              <p className="text-muted-foreground text-[11px]">
                Descarga todo el estado actual (tickets, aulas, inventario, biblioteca y grados) en un archivo JSON seguro para respaldo offline.
              </p>
              <Button size="sm" onClick={() => StorageManager.exportBackupJSON()} className="rounded-xl text-xs">
                Descargar Backup Completo (.json)
              </Button>
            </div>

            <div className="rounded-lg border border-border p-4 bg-background/80 space-y-3">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <Upload className="size-4 text-primary" />
                Restaurar o Cargar Respaldo JSON
              </h3>
              <input
                type="file"
                accept=".json"
                onChange={handleImportFile}
                className="block w-full text-xs text-muted-foreground file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-muted/40 file:text-primary hover:file:bg-primary/20"
              />
              {importStatus && <p className="text-xs font-bold text-primary">{importStatus}</p>}
            </div>

            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 space-y-2">
              <h3 className="font-bold text-destructive flex items-center gap-2">
                <RefreshCw className="size-4" />
                Restablecer Datos de Fabrica
              </h3>
              <p className="text-muted-foreground text-[11px]">
                Borra el LocalStorage local y restaura las listas iniciales del campus.
              </p>
              <Button size="sm" variant="destructive" onClick={handleResetData} className="rounded-xl text-xs">
                Borrar LocalStorage y Reiniciar
              </Button>
            </div>
          </div>
        )}

        {/* Tab 4: Security & Session Expire Simulator */}
        {activeTab === "security" && (
          <div className="space-y-4 text-xs">
            <div className="rounded-lg border border-amber-500/30 bg-zinc-700/10 p-4 space-y-2 text-amber-800 dark:text-amber-200">
              <h3 className="font-bold flex items-center gap-2">
                <ShieldAlert className="size-4" />
                Simulador de Expiración de Token JWT
              </h3>
              <p className="text-[11px] opacity-90">
                Prueba la reacción de la interfaz ante un evento HTTP 401 (Sesión Expirada). Al presionar, el sistema simulará el cierre de sesión seguro y retornará al Login.
              </p>
              <Button size="sm" variant="outline" onClick={onExpireSession} className="rounded-xl text-xs border-amber-500/40 text-amber-800 dark:text-amber-200 hover:bg-zinc-700/20">
                Simular 401 Token Expired (Cerrar Sesión)
              </Button>
            </div>

            <div className="rounded-lg border border-border p-4 bg-background/80 space-y-2">
              <h3 className="font-bold text-foreground">Información de Cabeceras HTTP simuladas</h3>
              <div className="space-y-1 font-mono text-[11px] text-muted-foreground bg-muted p-2.5 rounded-xl">
                <p>Authorization: Bearer smartcampus_sim_token_9843209423</p>
                <p>X-RBAC-SubRole: {subRole}</p>
                <p>X-Client-Timestamp: {new Date().toISOString()}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
