import { StorageManager } from "./storage-sync"

export interface SmartCampusBackupSchema {
  version: string
  exportDate: string
  salones: ReturnType<typeof StorageManager.getSalones>
  tickets: ReturnType<typeof StorageManager.getTickets>
  libros: ReturnType<typeof StorageManager.getLibros>
  auditLogs: ReturnType<typeof StorageManager.getAuditLogs>
}

export function exportarRespaldoBD() {
  const data: SmartCampusBackupSchema = {
    version: "2026.1.0",
    exportDate: new Date().toISOString(),
    salones: StorageManager.getSalones(),
    tickets: StorageManager.getTickets(),
    libros: StorageManager.getLibros(),
    auditLogs: StorageManager.getAuditLogs(),
  }

  const jsonString = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonString], { type: "application/json" })
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.download = `SmartCampus_UniCamacho_Backup_${new Date().toISOString().slice(0, 10)}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function importarRespaldoBD(jsonText: string): boolean {
  try {
    const data = JSON.parse(jsonText) as SmartCampusBackupSchema

    if (!data.salones || !data.tickets || !data.libros) {
      throw new Error("El archivo JSON no contiene la estructura requerida de SmartCampus.")
    }

    StorageManager.saveSalones(data.salones)
    StorageManager.saveTickets(data.tickets)
    StorageManager.saveLibros(data.libros)

    if (data.auditLogs && Array.isArray(data.auditLogs)) {
      localStorage.setItem("smartcampus_audit_logs", JSON.stringify(data.auditLogs))
    }

    return true
  } catch (error) {
    console.error("Error al importar copia de seguridad:", error)
    return false
  }
}
