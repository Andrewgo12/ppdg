import type { Insumo, Despacho } from "./campus-data"
import { StorageManager } from "./storage-sync"

export function exportarInventarioCSV(insumos: Insumo[], despachos: Despacho[]) {
  let csvContent = "data:text/csv;charset=utf-8,"

  // Sección 1: Existencias de Almacén
  csvContent += "=== EXISTENCIAS DE ALMACEN E INVENTARIO SMARTCAMPUS ===\r\n"
  csvContent += "ID,Nombre Artículo,Categoría,Stock Actual,Stock Mínimo,Ubicación,Estado\r\n"

  insumos.forEach((item) => {
    const estado = item.stockActual <= item.stockMinimo ? "REORDEN REQUERIDO" : "OK"
    const row = [
      item.id,
      `"${item.nombre}"`,
      item.categoria,
      item.stockActual,
      item.stockMinimo,
      `"${item.ubicacion}"`,
      estado,
    ].join(",")
    csvContent += row + "\r\n"
  })

  csvContent += "\r\n"
  csvContent += "=== REGISTRO DE DESPACHOS A TECNICOS Y DOCENTES ===\r\n"
  csvContent += "ID Despacho,Insumo,Cantidad,Ticket Asociado,Técnico Responsable,Fecha,Estado\r\n"

  despachos.forEach((d) => {
    const row = [
      d.id,
      `"${d.insumoNombre}"`,
      d.cantidad,
      d.ticketId,
      `"${d.tecnicoNombre}"`,
      d.fecha,
      d.estado,
    ].join(",")
    csvContent += row + "\r\n"
  })

  const encodedUri = encodeURI(csvContent)
  const link = document.createElement("a")
  link.setAttribute("href", encodedUri)
  link.setAttribute("download", `Inventario_UniCamacho_${new Date().toISOString().slice(0, 10)}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportarAuditoriaCSV() {
  const logs = StorageManager.getAuditLogs()
  let csvContent = "data:text/csv;charset=utf-8,"

  csvContent += "=== BITACORA DE AUDITORIA Y ACCIONES RBAC SMARTCAMPUS UNICAMACHO ===\r\n"
  csvContent += "ID Audit,Usuario,Subrol,Acción Permiso,Detalles de Transacción,Timestamp ISO,Firma Criptográfica SHA-256\r\n"

  logs.forEach((log) => {
    const row = [
      log.id,
      `"${log.usuario}"`,
      log.subRole,
      log.accion,
      `"${log.detalles.replace(/"/g, '""')}"`,
      log.timestamp,
      log.hashCriptografico,
    ].join(",")
    csvContent += row + "\r\n"
  })

  const encodedUri = encodeURI(csvContent)
  const link = document.createElement("a")
  link.setAttribute("href", encodedUri)
  link.setAttribute("download", `Bitacora_Auditoria_RBAC_UniCamacho_${new Date().toISOString().slice(0, 10)}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
