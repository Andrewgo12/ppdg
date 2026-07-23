import {
  INITIAL_SALONES,
  INITIAL_TICKETS,
  INITIAL_RESERVAS,
  INITIAL_LIBROS,
  INITIAL_PRESTAMOS,
  INITIAL_INSUMOS,
  INITIAL_DESPACHOS,
  INITIAL_USUARIOS_RBAC,
  INITIAL_AUDITORIA,
  type Salon,
  type Ticket,
  type Reserva,
  type Libro,
  type Prestamo,
  type Insumo,
  type Despacho,
  type UsuarioRBAC,
  type LogAuditoria
} from "./campus-data"

const STORAGE_KEYS = {
  SALONES: "smartcampus_salones_v2",
  TICKETS: "smartcampus_tickets_v2",
  RESERVAS: "smartcampus_reservas_v2",
  LIBROS: "smartcampus_libros_v2",
  PRESTAMOS: "smartcampus_prestamos_v2",
  INSUMOS: "smartcampus_insumos_v2",
  DESPACHOS: "smartcampus_despachos_v2",
  USUARIOS: "smartcampus_usuarios_v2",
  AUDITORIA: "smartcampus_auditoria_v2"
}

// Universal LocalStorage getter with fallback to initial data
export function getStoredData<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch (error) {
    console.warn(`[StorageSync] Error leyendo ${key}:`, error)
    return fallback
  }
}

// Universal LocalStorage saver
export function saveStoredData<T>(key: string, data: T): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.warn(`[StorageSync] Error guardando ${key}:`, error)
  }
}

// Helper methods for specific collections
export const StorageManager = {
  // Salones
  getSalones: (): Salon[] => getStoredData(STORAGE_KEYS.SALONES, INITIAL_SALONES),
  saveSalones: (salones: Salon[]) => saveStoredData(STORAGE_KEYS.SALONES, salones),

  // Tickets
  getTickets: (): Ticket[] => getStoredData(STORAGE_KEYS.TICKETS, INITIAL_TICKETS),
  saveTickets: (tickets: Ticket[]) => saveStoredData(STORAGE_KEYS.TICKETS, tickets),

  // Reservas
  getReservas: (): Reserva[] => getStoredData(STORAGE_KEYS.RESERVAS, INITIAL_RESERVAS),
  saveReservas: (reservas: Reserva[]) => saveStoredData(STORAGE_KEYS.RESERVAS, reservas),

  // Libros
  getLibros: (): Libro[] => getStoredData(STORAGE_KEYS.LIBROS, INITIAL_LIBROS),
  saveLibros: (libros: Libro[]) => saveStoredData(STORAGE_KEYS.LIBROS, libros),

  // Prestamos
  getPrestamos: (): Prestamo[] => getStoredData(STORAGE_KEYS.PRESTAMOS, INITIAL_PRESTAMOS),
  savePrestamos: (prestamos: Prestamo[]) => saveStoredData(STORAGE_KEYS.PRESTAMOS, prestamos),

  // Insumos
  getInsumos: (): Insumo[] => getStoredData(STORAGE_KEYS.INSUMOS, INITIAL_INSUMOS),
  saveInsumos: (insumos: Insumo[]) => saveStoredData(STORAGE_KEYS.INSUMOS, insumos),

  // Despachos
  getDespachos: (): Despacho[] => getStoredData(STORAGE_KEYS.DESPACHOS, INITIAL_DESPACHOS),
  saveDespachos: (despachos: Despacho[]) => saveStoredData(STORAGE_KEYS.DESPACHOS, despachos),

  // Usuarios
  getUsuarios: (): UsuarioRBAC[] => getStoredData(STORAGE_KEYS.USUARIOS, INITIAL_USUARIOS_RBAC),
  saveUsuarios: (usuarios: UsuarioRBAC[]) => saveStoredData(STORAGE_KEYS.USUARIOS, usuarios),

  // Audit Logs
  getAuditLogs: (): LogAuditoria[] => getStoredData(STORAGE_KEYS.AUDITORIA, INITIAL_AUDITORIA),
  saveAuditLogs: (logs: LogAuditoria[]) => saveStoredData(STORAGE_KEYS.AUDITORIA, logs),
  
  // Log a new action to Audit
  logAuditAction: (usuario: string, subRole: string, accion: string, detalle: string) => {
    const logs = StorageManager.getAuditLogs()
    const newLog: LogAuditoria = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      fecha: "Ahora " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      usuario,
      accion,
      recurso: subRole,
      detalles: detalle
    }
    const updated = [newLog, ...logs]
    StorageManager.saveAuditLogs(updated)
    return updated
  },

  // Reset to Factory Default
  resetAll: () => {
    if (typeof window === "undefined") return
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k))
  },

  // Export full DB backup JSON
  exportBackupJSON: () => {
    const backup = {
      timestamp: new Date().toISOString(),
      salones: StorageManager.getSalones(),
      tickets: StorageManager.getTickets(),
      reservas: StorageManager.getReservas(),
      libros: StorageManager.getLibros(),
      prestamos: StorageManager.getPrestamos(),
      insumos: StorageManager.getInsumos(),
      despachos: StorageManager.getDespachos(),
      usuarios: StorageManager.getUsuarios(),
      auditoria: StorageManager.getAuditLogs()
    }
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `SmartCampus_Backup_${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }
}
