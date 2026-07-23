import type { SubRoleId } from "./campus-data"

export type PermissionKey =
  // Tickets & Mantenimiento
  | "TICKETS_VIEW"
  | "TICKETS_CREATE"
  | "TICKETS_ASSIGN"
  | "TICKETS_RESOLVE"
  | "TICKETS_DELETE"
  
  // Salones & Espacios
  | "SALON_VIEW"
  | "SALON_RESERVE"
  | "SALON_MAINTENANCE_TOGGLE"
  | "SALON_EVENT_BOOKING"

  // Biblioteca & Recursos
  | "LIBRARY_VIEW"
  | "LIBRARY_RESERVE"
  | "LIBRARY_LOAN_MANAGE"
  | "LIBRARY_CATALOG_EDIT"

  // Trámites de Grado
  | "GRADUATION_VIEW"
  | "GRADUATION_REQUEST"
  | "GRADUATION_PAZ_SALVO_CHECK"
  | "GRADUATION_FINAL_APPROVE"

  // Insumos Express
  | "INSUMOS_VIEW"
  | "INSUMOS_ORDER"
  | "INSUMOS_DISPATCH"
  | "INSUMOS_CATALOG_EDIT"

  // Almacén e Inventario
  | "INVENTORY_VIEW"
  | "INVENTORY_STOCK_UPDATE"
  | "INVENTORY_DISPATCH"
  | "INVENTORY_ADD_ITEM"

  // Seguridad y RBAC
  | "RBAC_MANAGE_USERS"
  | "RBAC_CHANGE_ROLES"
  | "AUDIT_LOG_VIEW"
  | "SYSTEM_BACKUP_EXPORT"

export interface PermissionDefinition {
  key: PermissionKey
  label: string
  category: "Mantenimiento" | "Espacios" | "Biblioteca" | "Grados" | "Insumos" | "Inventario" | "Seguridad"
  description: string
}

export const PERMISSION_CATALOG: Record<PermissionKey, PermissionDefinition> = {
  TICKETS_VIEW: { key: "TICKETS_VIEW", label: "Ver Tickets", category: "Mantenimiento", description: "Ver lista de reportes e incidencias" },
  TICKETS_CREATE: { key: "TICKETS_CREATE", label: "Crear Ticket", category: "Mantenimiento", description: "Reportar fallas de infraestructura o IT" },
  TICKETS_ASSIGN: { key: "TICKETS_ASSIGN", label: "Asignar Técnico", category: "Mantenimiento", description: "Asignar responsable de solución" },
  TICKETS_RESOLVE: { key: "TICKETS_RESOLVE", label: "Resolver Ticket", category: "Mantenimiento", description: "Marcar falla como reparada" },
  TICKETS_DELETE: { key: "TICKETS_DELETE", label: "Eliminar Ticket", category: "Mantenimiento", description: "Eliminar reportes obsoletos" },

  SALON_VIEW: { key: "SALON_VIEW", label: "Ver Mapa Salones", category: "Espacios", description: "Consultar estados de aulas y laboratorios" },
  SALON_RESERVE: { key: "SALON_RESERVE", label: "Reservar Salón", category: "Espacios", description: "Solicitar aula o laboratorio para clase" },
  SALON_MAINTENANCE_TOGGLE: { key: "SALON_MAINTENANCE_TOGGLE", label: "Bloquear por Mantenimiento", category: "Espacios", description: "Cambiar salón a en mantenimiento" },
  SALON_EVENT_BOOKING: { key: "SALON_EVENT_BOOKING", label: "Reserva de Eventos", category: "Espacios", description: "Aprobar auditorios para eventos" },

  LIBRARY_VIEW: { key: "LIBRARY_VIEW", label: "Ver Biblioteca", category: "Biblioteca", description: "Buscar libros y tesis" },
  LIBRARY_RESERVE: { key: "LIBRARY_RESERVE", label: "Reservar Libro", category: "Biblioteca", description: "Apartar ejemplar en UniBiblio" },
  LIBRARY_LOAN_MANAGE: { key: "LIBRARY_LOAN_MANAGE", label: "Gestionar Préstamos", category: "Biblioteca", description: "Registrar entregas y devoluciones" },
  LIBRARY_CATALOG_EDIT: { key: "LIBRARY_CATALOG_EDIT", label: "Editar Catálogo", category: "Biblioteca", description: "Agregar o modificar libros" },

  GRADUATION_VIEW: { key: "GRADUATION_VIEW", label: "Ver Trámites Grado", category: "Grados", description: "Consultar estado de paz y salvos" },
  GRADUATION_REQUEST: { key: "GRADUATION_REQUEST", label: "Iniciar Trámite Grado", category: "Grados", description: "Postular solicitud de grado" },
  GRADUATION_PAZ_SALVO_CHECK: { key: "GRADUATION_PAZ_SALVO_CHECK", label: "Firmar Paz y Salvo", category: "Grados", description: "Verificar requisitos de egreso" },
  GRADUATION_FINAL_APPROVE: { key: "GRADUATION_FINAL_APPROVE", label: "Aprobación Final Grado", category: "Grados", description: "Autorizar grado de estudiante" },

  INSUMOS_VIEW: { key: "INSUMOS_VIEW", label: "Ver Insumos", category: "Insumos", description: "Consultar catálogo de papelería y cafetería" },
  INSUMOS_ORDER: { key: "INSUMOS_ORDER", label: "Solicitar Insumos", category: "Insumos", description: "Crear pedido express de materiales" },
  INSUMOS_DISPATCH: { key: "INSUMOS_DISPATCH", label: "Despachar Insumos", category: "Insumos", description: "Entregar productos solicitados" },
  INSUMOS_CATALOG_EDIT: { key: "INSUMOS_CATALOG_EDIT", label: "Editar Precios e Insumos", category: "Insumos", description: "Modificar catálogo de insumos" },

  INVENTORY_VIEW: { key: "INVENTORY_VIEW", label: "Ver Inventario", category: "Inventario", description: "Consultar existencias de almacén" },
  INVENTORY_STOCK_UPDATE: { key: "INVENTORY_STOCK_UPDATE", label: "Actualizar Stock", category: "Inventario", description: "Ajustar unidades de insumos/herramientas" },
  INVENTORY_DISPATCH: { key: "INVENTORY_DISPATCH", label: "Despachar Herramientas", category: "Inventario", description: "Autorizar salida de materiales" },
  INVENTORY_ADD_ITEM: { key: "INVENTORY_ADD_ITEM", label: "Agregar Artículo", category: "Inventario", description: "Registrar nuevos activos en almacén" },

  RBAC_MANAGE_USERS: { key: "RBAC_MANAGE_USERS", label: "Administrar Usuarios", category: "Seguridad", description: "Ver y editar cuentas de usuario" },
  RBAC_CHANGE_ROLES: { key: "RBAC_CHANGE_ROLES", label: "Modificar Sub-Roles", category: "Seguridad", description: "Asignar roles y matriz RBAC" },
  AUDIT_LOG_VIEW: { key: "AUDIT_LOG_VIEW", label: "Ver Bitácora Auditoría", category: "Seguridad", description: "Consultar historial de cambios" },
  SYSTEM_BACKUP_EXPORT: { key: "SYSTEM_BACKUP_EXPORT", label: "Exportar/Importar Respaldos", category: "Seguridad", description: "Generar JSON de base de datos" },
}

export const SUB_ROLE_PERMISSIONS: Record<SubRoleId, PermissionKey[]> = {
  // Estudiantes
  estudiante_regular: [
    "SALON_VIEW",
    "LIBRARY_VIEW",
    "LIBRARY_RESERVE",
    "TICKETS_VIEW",
    "TICKETS_CREATE"
  ],
  estudiante_representante: [
    "SALON_VIEW",
    "SALON_RESERVE",
    "LIBRARY_VIEW",
    "LIBRARY_RESERVE",
    "TICKETS_VIEW",
    "TICKETS_CREATE"
  ],
  estudiante_monitor: [
    "SALON_VIEW",
    "SALON_RESERVE",
    "LIBRARY_VIEW",
    "LIBRARY_RESERVE",
    "LIBRARY_LOAN_MANAGE",
    "TICKETS_VIEW",
    "TICKETS_CREATE",
    "INSUMOS_VIEW",
    "INSUMOS_ORDER"
  ],
  estudiante_grado: [
    "SALON_VIEW",
    "LIBRARY_VIEW",
    "LIBRARY_RESERVE",
    "GRADUATION_VIEW",
    "GRADUATION_REQUEST",
    "TICKETS_VIEW",
    "TICKETS_CREATE"
  ],

  // Docentes
  docente_regular: [
    "SALON_VIEW",
    "SALON_RESERVE",
    "LIBRARY_VIEW",
    "LIBRARY_RESERVE",
    "INSUMOS_VIEW",
    "INSUMOS_ORDER",
    "TICKETS_VIEW",
    "TICKETS_CREATE"
  ],
  director_programa: [
    "SALON_VIEW",
    "SALON_RESERVE",
    "SALON_MAINTENANCE_TOGGLE",
    "LIBRARY_VIEW",
    "GRADUATION_VIEW",
    "GRADUATION_PAZ_SALVO_CHECK",
    "GRADUATION_FINAL_APPROVE",
    "INSUMOS_VIEW",
    "INSUMOS_ORDER",
    "TICKETS_VIEW",
    "TICKETS_CREATE",
    "AUDIT_LOG_VIEW"
  ],
  funcionario_eventos: [
    "SALON_VIEW",
    "SALON_RESERVE",
    "SALON_EVENT_BOOKING",
    "INSUMOS_VIEW",
    "INSUMOS_ORDER",
    "TICKETS_VIEW",
    "TICKETS_CREATE"
  ],

  // Técnicos
  tecnico_planta: [
    "SALON_VIEW",
    "SALON_MAINTENANCE_TOGGLE",
    "TICKETS_VIEW",
    "TICKETS_CREATE",
    "TICKETS_ASSIGN",
    "TICKETS_RESOLVE",
    "INVENTORY_VIEW"
  ],
  tecnico_electrico: [
    "SALON_VIEW",
    "SALON_MAINTENANCE_TOGGLE",
    "TICKETS_VIEW",
    "TICKETS_CREATE",
    "TICKETS_RESOLVE",
    "INVENTORY_VIEW"
  ],
  tecnico_it: [
    "SALON_VIEW",
    "SALON_MAINTENANCE_TOGGLE",
    "TICKETS_VIEW",
    "TICKETS_CREATE",
    "TICKETS_RESOLVE",
    "TICKETS_ASSIGN",
    "INVENTORY_VIEW"
  ],
  tecnico_servicios: [
    "SALON_VIEW",
    "SALON_MAINTENANCE_TOGGLE",
    "TICKETS_VIEW",
    "TICKETS_CREATE",
    "TICKETS_RESOLVE",
    "INSUMOS_VIEW",
    "INSUMOS_DISPATCH"
  ],

  // Almacén
  almacenista: [
    "INVENTORY_VIEW",
    "INVENTORY_STOCK_UPDATE",
    "INVENTORY_DISPATCH",
    "INVENTORY_ADD_ITEM",
    "INSUMOS_VIEW",
    "INSUMOS_ORDER",
    "INSUMOS_DISPATCH",
    "INSUMOS_CATALOG_EDIT",
    "TICKETS_VIEW",
    "TICKETS_CREATE"
  ],

  // Super Admin
  super_admin: [
    "TICKETS_VIEW",
    "TICKETS_CREATE",
    "TICKETS_ASSIGN",
    "TICKETS_RESOLVE",
    "TICKETS_DELETE",
    "SALON_VIEW",
    "SALON_RESERVE",
    "SALON_MAINTENANCE_TOGGLE",
    "SALON_EVENT_BOOKING",
    "LIBRARY_VIEW",
    "LIBRARY_RESERVE",
    "LIBRARY_LOAN_MANAGE",
    "LIBRARY_CATALOG_EDIT",
    "GRADUATION_VIEW",
    "GRADUATION_REQUEST",
    "GRADUATION_PAZ_SALVO_CHECK",
    "GRADUATION_FINAL_APPROVE",
    "INSUMOS_VIEW",
    "INSUMOS_ORDER",
    "INSUMOS_DISPATCH",
    "INSUMOS_CATALOG_EDIT",
    "INVENTORY_VIEW",
    "INVENTORY_STOCK_UPDATE",
    "INVENTORY_DISPATCH",
    "INVENTORY_ADD_ITEM",
    "RBAC_MANAGE_USERS",
    "RBAC_CHANGE_ROLES",
    "AUDIT_LOG_VIEW",
    "SYSTEM_BACKUP_EXPORT"
  ]
}

export function hasPermission(subRole: SubRoleId, permission: PermissionKey): boolean {
  const allowed = SUB_ROLE_PERMISSIONS[subRole]
  if (!allowed) return false
  return allowed.includes(permission)
}

export function getRolePermissions(subRole: SubRoleId): PermissionKey[] {
  return SUB_ROLE_PERMISSIONS[subRole] || []
}
