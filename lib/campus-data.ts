import type { LucideIcon } from "lucide-react"
import {
  LayoutDashboard,
  MapPin,
  CalendarCheck,
  BookOpen,
  Wrench,
  PackageSearch,
  AlertTriangle,
  ClipboardList,
  Boxes,
  Truck,
  Users,
  BarChart3,
  CheckSquare,
  Building2,
  GraduationCap,
  Presentation,
  HardHat,
  Warehouse,
  ShieldCheck,
  FileCheck2,
  QrCode,
  Sparkles,
  Zap,
  Music,
  UserCheck,
  Layers,
  History,
  FileText,
} from "lucide-react"

export type RoleId = "estudiante" | "docente" | "tecnico" | "almacen" | "admin"

export type SubRoleId =
  // Categoría A: Estudiantes
  | "estudiante_regular"
  | "estudiante_representante"
  | "estudiante_monitor"
  | "estudiante_grado"
  // Categoría B: Docentes
  | "docente_regular"
  | "director_programa"
  | "funcionario_eventos"
  // Categoría C: Mantenimiento
  | "tecnico_planta"
  | "tecnico_electrico"
  | "tecnico_it"
  | "tecnico_servicios"
  // Categoría D: Almacén
  | "almacenista"
  // Categoría E: Admin
  | "super_admin"

export type StatTone = "primary" | "accent" | "warning" | "danger" | "neutral"

export interface RoleStat {
  label: string
  value: string
  hint: string
  tone: StatTone
}

export interface RoleModule {
  title: string
  description: string
  icon: LucideIcon
}

export type ViewKey =
  | "inicio"
  | "mapa"
  | "reservas"
  | "biblioteca"
  | "reportar"
  | "insumos"
  | "tickets"
  | "atencion"
  | "inventario"
  | "despachos"
  | "alertas"
  | "indicadores"
  | "usuarios"
  | "aprobaciones"
  | "espacios"
  | "asistencia"
  | "grado"
  | "mantenimiento_preventivo"
  | "auditoria"

export interface NavItem {
  label: string
  icon: LucideIcon
  view: ViewKey
}

export interface SubRoleInfo {
  id: SubRoleId
  parentRole: RoleId
  category: "A. Estudiantes" | "B. Docentes y Personal" | "C. Mantenimiento" | "D. Almacén" | "E. Administración"
  name: string
  title: string
  fullName: string
  avatar: string
  icon: LucideIcon
  tagline: string
  badge: string
  permissions: string[]
}

export interface Role {
  id: RoleId
  name: string
  title: string
  fullName: string
  avatar: string
  icon: LucideIcon
  tagline: string
  nav: NavItem[]
  stats: RoleStat[]
  modules: RoleModule[]
}

export const SUB_ROLES: Record<SubRoleId, SubRoleInfo> = {
  // A. Estudiantes
  estudiante_regular: {
    id: "estudiante_regular",
    parentRole: "estudiante",
    category: "A. Estudiantes",
    name: "Estudiante Regular",
    title: "Ingeniería de Sistemas · 7mo Semestre",
    fullName: "Laura Restrepo",
    avatar: "LR",
    icon: GraduationCap,
    tagline: "Consulta disponibilidad de salones, reserva cubículos y gestiona tu biblioteca.",
    badge: "Estudiante Regular",
    permissions: [
      "Ver mapa y ocupación de salones",
      "Reservar cubículos de estudio",
      "Reservar libros y consultar catálogo",
      "Descargar Pre-Paz y Salvo de biblioteca",
    ],
  },
  estudiante_representante: {
    id: "estudiante_representante",
    parentRole: "estudiante",
    category: "A. Estudiantes",
    name: "Representante Cultural/Deportivo",
    title: "Líder Grupo Folclórico & Danzas",
    fullName: "Mateo Carvajal",
    avatar: "MC",
    icon: Sparkles,
    tagline: "Gestiona eventos culturales y deportivos en plazoletas, auditorios y zonas comunes.",
    badge: "Líder Estudiantil",
    permissions: [
      "Solicitar reserva de espacios de gran aforo",
      "Cargar planes de trabajo y listas de asistentes",
      "Solicitar insumos logísticos (sonido, silletería)",
      "Entregar espacios comunitarios con evidencia de aseo",
    ],
  },
  estudiante_monitor: {
    id: "estudiante_monitor",
    parentRole: "estudiante",
    category: "A. Estudiantes",
    name: "Monitor de Laboratorio / Aux. Biblioteca",
    title: "Monitor Lab. Sistemas & Redes",
    fullName: "Santiago Ortiz",
    avatar: "SO",
    icon: UserCheck,
    tagline: "Valida préstamos con escaneo QR y registra asistencia a laboratorios.",
    badge: "Monitor Institucional",
    permissions: [
      "Escanear tickets QR de préstamos bibliotecarios",
      "Registrar asistencia física a laboratorios mediante QR",
      "Reportar fallas rápidas de hardware en laboratorio",
      "Validar entregas y devoluciones de material",
    ],
  },
  estudiante_grado: {
    id: "estudiante_grado",
    parentRole: "estudiante",
    category: "A. Estudiantes",
    name: "Candidato a Grado / Matrícula",
    title: "Último Semestre · Tesis de Grado",
    fullName: "Valentina Gómez",
    avatar: "VG",
    icon: FileCheck2,
    tagline: "Carga tu tesis digital y genera tu Paz y Salvo automátizado de biblioteca.",
    badge: "Candidato a Grado",
    permissions: [
      "Subir documento final de tesis en PDF",
      "Firmar cesión de derechos autorales",
      "Generar Paz y Salvo digital con QR criptográfico",
      "Verificar estado cero deudas bibliotecarias",
    ],
  },

  // B. Docentes
  docente_regular: {
    id: "docente_regular",
    parentRole: "docente",
    category: "B. Docentes y Personal",
    name: "Docente de Cátedra/Tiempo Completo",
    title: "Facultad de Ingeniería · Electrónica",
    fullName: "Prof. Andrés Gil",
    avatar: "AG",
    icon: Presentation,
    tagline: "Reporta fallas de aula con foto/video, solicita insumos express y programa recuperaciones.",
    badge: "Docente Titular",
    permissions: [
      "Reportar fallas con foto/video obligatorio",
      "Solicitud de Insumos Express Just-In-Time",
      "Reservar salones para recuperaciones y talleres",
      "Ver estado técnico de aulas asignadas",
    ],
  },
  director_programa: {
    id: "director_programa",
    parentRole: "docente",
    category: "B. Docentes y Personal",
    name: "Director de Programa / Decano",
    title: "Director Programa Ing. de Sistemas",
    fullName: "Dr. Roberto Mendoza",
    avatar: "RM",
    icon: Building2,
    tagline: "Métricas de facultad, reasignación masiva de aulas de emergencia y aval de licencias.",
    badge: "Directivo Académico",
    permissions: [
      "Reasignación masiva de aulas por contingencia",
      "Solicitar compras de licencias y hardware IT",
      "Avalar proyectos culturales estudiantiles",
      "Consultar MTTR y disponibilidad por facultad",
    ],
  },
  funcionario_eventos: {
    id: "funcionario_eventos",
    parentRole: "docente",
    category: "B. Docentes y Personal",
    name: "Funcionario Administrativo de Eventos",
    title: "Coordinador de Eventos & Admisiones",
    fullName: "Beatriz Morales",
    avatar: "BM",
    icon: CalendarCheck,
    tagline: "Aprueba o rechaza reservas de espacios de gran aforo y bloquea zonas institucionales.",
    badge: "Administrativo Eventos",
    permissions: [
      "Aprobar/rechazar reservas de eventos con justificación",
      "Bloqueo institucional masivo de plazas y auditorios",
      "Asignar órdenes a servicios generales y logística",
      "Gestionar silletería y montaje de eventos",
    ],
  },

  // C. Mantenimiento
  tecnico_planta: {
    id: "tecnico_planta",
    parentRole: "tecnico",
    category: "C. Mantenimiento",
    name: "Técnico de Planta Física",
    title: "Infraestructura, Cerrajería & Obras",
    fullName: "Jorge Ramírez",
    avatar: "JR",
    icon: HardHat,
    tagline: "Reparación de puertas, plomería, pintura y mobiliario del campus.",
    badge: "Técnico Planta Física",
    permissions: [
      "Atender tickets de infraestructura física",
      "Solicitar repuestos y materiales a almacén",
      "Cierre de ticket con foto/video obligatorios",
      "Cambiar estado de aula a 'En Mantenimiento'",
    ],
  },
  tecnico_electrico: {
    id: "tecnico_electrico",
    parentRole: "tecnico",
    category: "C. Mantenimiento",
    name: "Técnico Eléctrico Certificado",
    title: "Redes Eléctricas, Iluminación & RETIE",
    fullName: "Ing. Esteban Osorio",
    avatar: "EO",
    icon: Zap,
    tagline: "Reparación de tomas, luminarias, tableros y protocolo de Riesgo Eléctrico.",
    badge: "Electricista RETIE",
    permissions: [
      "Atender tickets eléctricos y luminarias",
      "Activar protocolo 'Riesgo Eléctrico Alto' (Lockdown de aula)",
      "Comprobar parámetros de voltaje e iluminancia",
      "Generar certificado de cumplimiento RETIE",
    ],
  },
  tecnico_it: {
    id: "tecnico_it",
    parentRole: "tecnico",
    category: "C. Mantenimiento",
    name: "Técnico de Tecnología / Soporte IT",
    title: "Soporte A/V, Redes & Videobeams",
    fullName: "Carlos Mena",
    avatar: "CM",
    icon: Wrench,
    tagline: "Atención inmediata a videobeams, equipos de cómputo y alertas Insumos Express.",
    badge: "Soporte IT / A/V",
    permissions: [
      "Atender tickets de tecnología y proyecciones",
      "Respuesta Inmediata 'Insumo Express en Camino'",
      "Pruebas de velocidad de red y calibración A/V",
      "Cierre con foto de prueba de proyección",
    ],
  },
  tecnico_servicios: {
    id: "tecnico_servicios",
    parentRole: "tecnico",
    category: "C. Mantenimiento",
    name: "Técnico de Servicios Generales y Aseo",
    title: "Logística, Higiene & Adecuación",
    fullName: "María Fernanda Lopez",
    avatar: "FL",
    icon: Layers,
    tagline: "Aseo de salones, adecuación de montaje para eventos e higienización.",
    badge: "Servicios Generales",
    permissions: [
      "Marcar aula como 'Limpio e Higienizado'",
      "Confirmar montajes de silletería para eventos",
      "Reportar insumos de aseo consumidos",
      "Escalar daños de pintura o infraestructura",
    ],
  },

  // D. Almacén
  almacenista: {
    id: "almacenista",
    parentRole: "almacen",
    category: "D. Almacén",
    name: "Almacenista / Despachador de Repuestos",
    title: "Control de Inventario & Componentes",
    fullName: "Diana Ospina",
    avatar: "DO",
    icon: Warehouse,
    tagline: "Autoriza despachos de materiales vinculados a tickets y controla stock mínimo.",
    badge: "Jefe de Almacén",
    permissions: [
      "Aprobar/Rechazar despachos exigiendo Ticket ID activo",
      "Actualizar stock e ingresar compras",
      "Alertas automáticas de ítems bajo mínimo",
      "Registrar arqueos de inventario mensuales",
    ],
  },

  // E. Admin
  super_admin: {
    id: "super_admin",
    parentRole: "admin",
    category: "E. Administración",
    name: "Administrador General del Campus",
    title: "Director de Operaciones & SmartCampus",
    fullName: "Ing. Mónica Salazar",
    avatar: "MS",
    icon: ShieldCheck,
    tagline: "Gestión global RBAC de usuarios, KPIs de campus, cierre de espacios e historial de auditoría.",
    badge: "Super Admin",
    permissions: [
      "Gestión total de usuarios y asignación de Sub-Roles (RBAC)",
      "KPIs globales (MTTR, Ocupación, Recurrencia)",
      "Bloqueo y cierre de emergencia de bloques y salones",
      "Visor inalterable de Logs de Auditoría",
    ],
  },
}

export const ROLES: Record<RoleId, Role> = {
  estudiante: {
    id: "estudiante",
    name: "Estudiante",
    title: "Portal Estudiantil",
    fullName: "Laura Restrepo",
    avatar: "LR",
    icon: GraduationCap,
    tagline: "Consulta salones, reserva espacios y gestiona tu biblioteca.",
    nav: [
      { label: "Inicio", icon: LayoutDashboard, view: "inicio" },
      { label: "Mapa de salones", icon: MapPin, view: "mapa" },
      { label: "Reservas", icon: CalendarCheck, view: "reservas" },
      { label: "Biblioteca", icon: BookOpen, view: "biblioteca" },
      { label: "Asistencia Lab", icon: QrCode, view: "asistencia" },
      { label: "Trámite Grado", icon: FileCheck2, view: "grado" },
    ],
    stats: [
      { label: "Salones libres ahora", value: "18", hint: "Sede Principal Av. 6", tone: "accent" },
      { label: "Mis reservas activas", value: "2", hint: "Cubículo C-12 + Libro", tone: "primary" },
      { label: "Préstamos vigentes", value: "1", hint: "Stewart Cálculo 8va Ed.", tone: "warning" },
      { label: "Estado Paz y Salvo", value: "AL DÍA", hint: "0 multas activas", tone: "accent" },
    ],
    modules: [
      { title: "Disponibilidad de Salones", description: "Consulta mapa 2D interactivo con estado en tiempo real.", icon: MapPin },
      { title: "Reserva de Cubículo / Espacio", description: "Aparta salas de estudio individuales o de grupo.", icon: CalendarCheck },
      { title: "Biblioteca UniBiblio", description: "Reserva libros con ticket QR y firma digital de préstamo.", icon: BookOpen },
      { title: "Grado y Paz y Salvo", description: "Carga tu tesis y descarga el Paz y Salvo firmado digitalmente.", icon: FileCheck2 },
    ],
  },
  docente: {
    id: "docente",
    name: "Docente",
    title: "Portal Docente & Decanatura",
    fullName: "Prof. Andrés Gil",
    avatar: "AG",
    icon: Presentation,
    tagline: "Reporta fallas, pide insumos express, aprueba eventos y reasigna aulas.",
    nav: [
      { label: "Inicio", icon: LayoutDashboard, view: "inicio" },
      { label: "Reportar falla", icon: AlertTriangle, view: "reportar" },
      { label: "Insumos Express", icon: PackageSearch, view: "insumos" },
      { label: "Reservas & Aulas", icon: CalendarCheck, view: "reservas" },
      { label: "Aprobaciones", icon: CheckSquare, view: "aprobaciones" },
    ],
    stats: [
      { label: "Mis reportes abiertos", value: "3", hint: "1 en atención por IT", tone: "warning" },
      { label: "Solicitudes Insumos", value: "2", hint: "HDMI + Marcadores A-203", tone: "primary" },
      { label: "Clases hoy", value: "4", hint: "Bloques A-203, B-105", tone: "accent" },
      { label: "Contingencias", value: "0", hint: "Aulas operativas al 100%", tone: "neutral" },
    ],
    modules: [
      { title: "Reporte de Falla de Aula", description: "Foto/Video inicial obligatorio y asignación inmediata.", icon: AlertTriangle },
      { title: "Botón Insumos Express", description: "Solicita marcadores o cables directamente a la clase.", icon: PackageSearch },
      { title: "Reserva de Aulas", description: "Programa clases de recuperación o talleres extraordinarios.", icon: CalendarCheck },
      { title: "Reasignación de Emergencia", description: "Mueve clases completas por contingencias técnicas.", icon: Building2 },
    ],
  },
  tecnico: {
    id: "tecnico",
    name: "Técnico",
    title: "Consola de Soporte y Mantenimiento",
    fullName: "Carlos Mena",
    avatar: "CM",
    icon: HardHat,
    tagline: "Atiende órdenes de trabajo de tu especialidad con evidencia fotográfica.",
    nav: [
      { label: "Inicio", icon: LayoutDashboard, view: "inicio" },
      { label: "Mis tickets", icon: ClipboardList, view: "tickets" },
      { label: "En atención", icon: Wrench, view: "atencion" },
      { label: "Mantenimiento Prev.", icon: History, view: "mantenimiento_preventivo" },
    ],
    stats: [
      { label: "Tickets asignados", value: "6", hint: "Filtrados por especialidad", tone: "primary" },
      { label: "En atención", value: "2", hint: "Videobeam B-105 en marcha", tone: "warning" },
      { label: "Resueltos semana", value: "14", hint: "MTTR promedio: 3.2 hrs", tone: "accent" },
      { label: "Riesgo Eléctrico", value: "0", hint: "No hay bloqueos activos", tone: "neutral" },
    ],
    modules: [
      { title: "Órdenes de Trabajo", description: "Visualiza tickets filtrados por tu perfil técnico.", icon: ClipboardList },
      { title: "Insumo Express en Camino", description: "Marca atención inmediata a docentes en clase.", icon: PackageSearch },
      { title: "Cierre con Evidencia", description: "Foto/Video final y pruebas de voltaje/red para cerrar.", icon: Wrench },
      { title: "Protocolo RETIE", description: "Certificación eléctrica e inspección reglamentaria.", icon: Zap },
    ],
  },
  almacen: {
    id: "almacen",
    name: "Almacén",
    title: "Gestión de Stock y Suministros",
    fullName: "Diana Ospina",
    avatar: "DO",
    icon: Warehouse,
    tagline: "Controla stock, autoriza despachos vinculados a tickets y reabastecimiento.",
    nav: [
      { label: "Inicio", icon: LayoutDashboard, view: "inicio" },
      { label: "Inventario", icon: Boxes, view: "inventario" },
      { label: "Despachos", icon: Truck, view: "despachos" },
      { label: "Alertas Stock", icon: AlertTriangle, view: "alertas" },
    ],
    stats: [
      { label: "Solicitudes pendientes", value: "5", hint: "Todas con Ticket ID válido", tone: "warning" },
      { label: "Bajo mínimo crítico", value: "3", hint: "Cables HDMI, Bombillos 18W", tone: "danger" },
      { label: "Despachos hoy", value: "12", hint: "Firma digital registrada", tone: "accent" },
      { label: "Arqueo mensual", value: "98.5%", hint: "Último reporte hace 4 días", tone: "primary" },
    ],
    modules: [
      { title: "Inventario en Tiempo Real", description: "Consulta existencias, precios y ubicaciones de insumos.", icon: Boxes },
      { title: "Aprobar Despacho", description: "Verifica que el técnico tenga un ticket activo antes de entregar.", icon: Truck },
      { title: "Alertas Reabastecimiento", description: "Notificación automática cuando el stock cae bajo mínimo.", icon: AlertTriangle },
    ],
  },
  admin: {
    id: "admin",
    name: "Administración",
    title: "Consola de Administración Campus",
    fullName: "Mónica Salazar",
    avatar: "MS",
    icon: ShieldCheck,
    tagline: "Control total de RBAC, indicadores de campus, auditoría y mapa institucional.",
    nav: [
      { label: "Inicio", icon: LayoutDashboard, view: "inicio" },
      { label: "Indicadores KPI", icon: BarChart3, view: "indicadores" },
      { label: "Usuarios & RBAC", icon: Users, view: "usuarios" },
      { label: "Aprobaciones", icon: CheckSquare, view: "aprobaciones" },
      { label: "Espacios & Campus", icon: Building2, view: "espacios" },
      { label: "Auditoría Logs", icon: FileText, view: "auditoria" },
    ],
    stats: [
      { label: "Tickets abiertos", value: "23", hint: "MTTR global 4.1 hrs", tone: "primary" },
      { label: "Reservas por aprobar", value: "7", hint: "3 de gran aforo", tone: "warning" },
      { label: "Ocupación Campus", value: "68%", hint: "Sede Principal Av. 6", tone: "accent" },
      { label: "Usuarios Activos", value: "3.240", hint: "RBAC 13 Sub-Roles activos", tone: "neutral" },
    ],
    modules: [
      { title: "Indicadores Institucionales", description: "Análisis de MTTR, tasa de fallas y uso de salones.", icon: BarChart3 },
      { title: "Gestión RBAC de Usuarios", description: "Asigna sub-roles y edita condiciones de seguridad JSON.", icon: Users },
      { title: "Aprobación de Eventos", description: "Revisa propuestas, aforos y asigna servicios generales.", icon: CheckSquare },
      { title: "Logs de Auditoría", description: "Registro inalterable de cambios de permisos y cierres de tickets.", icon: FileText },
    ],
  },
}

export const ROLE_ORDER: RoleId[] = ["estudiante", "docente", "tecnico", "almacen", "admin"]

// Dataset Types
export interface Salon {
  id: string
  nombre: string
  bloque: string
  piso: string
  sede: string
  capacidad: number
  estado: "disponible" | "ocupado" | "mantenimiento" | "reservado" | "riesgo_electrico"
  tipo: "aula" | "laboratorio" | "comun" | "cubiculo" | "auditorio"
  equipamiento: string[]
  responsable?: string
  temperatura?: string
  ultimoAseo?: string
}

export interface Ticket {
  id: string
  salonId: string
  salonNombre: string
  categoria: "infraestructura" | "electrico" | "it" | "aseo"
  prioridad: "alta" | "media" | "baja" | "express"
  reportadoPor: string
  fecha: string
  descripcion: string
  estado: "pendiente_asignacion" | "asignado" | "en_proceso" | "resuelto"
  tecnicoAsignado?: string
  evidenciaAntesUrl?: string
  evidenciaDespuesUrl?: string
  checklistRetie?: boolean
  velocidadRedMbps?: number
  tiempoAtencionHoras?: number
  comentarioCierre?: string
}

export interface Reserva {
  id: string
  espacioNombre: string
  solicitante: string
  rolSolicitante: string
  fecha: string
  horaInicio: string
  horaFin: string
  aforoEstimado: number
  logisticaRequerida: string[]
  planPdfAdjunto?: string
  estado: "pendiente_aprobacion" | "aprobado" | "rechazado"
  motivoRechazo?: string
  evidenciaAseoEntregaUrl?: string
}

export interface Libro {
  id: string
  codigo: string
  titulo: string
  autor: string
  categoria: string
  unidadesDisponibles: number
  totalUnidades: number
  ubicacion: string
}

export interface Prestamo {
  id: string
  estudiante: string
  libroId: string
  libroTitulo: string
  fechaPrestamo: string
  fechaVencimiento: string
  qrCode: string
  estado: "reservado" | "entregado" | "devuelto_exitoso" | "devuelto_mora"
  multaCop: number
  firmadoDigitalmente: boolean
}

export interface Insumo {
  id: string
  codigo: string
  nombre: string
  categoria: "tecnologia" | "electrico" | "infraestructura" | "aseo"
  stockActual: number
  stockMinimo: number
  unidad: string
  ubicacion: string
}

export interface Despacho {
  id: string
  insumoNombre: string
  cantidad: number
  ticketId: string
  tecnicoNombre: string
  fecha: string
  estado: "pendiente" | "aprobado" | "rechazado"
}

export interface NotificacionPush {
  id: string
  titulo: string
  mensaje: string
  tipo: "info" | "warning" | "success" | "danger"
  fecha: string
  leida: boolean
}

export interface UsuarioRBAC {
  id: string
  nombre: string
  email: string
  subRole: SubRoleId
  dependencia: string
  estado: "activo" | "suspendido"
  ultimoAcceso: string
}

export interface LogAuditoria {
  id: string
  fecha: string
  usuario: string
  accion: string
  recurso: string
  detalles: string
}

// Initial Mock Datasets
export const INITIAL_SALONES: Salon[] = [
  { id: "S-101", nombre: "Aula A-101", bloque: "Bloque A", piso: "Piso 1", sede: "Sede Principal Av. 6", capacidad: 40, estado: "disponible", tipo: "aula", equipamiento: ["Videobeam HDMI", "Aire Acondicionado", "40 Pupitres", "Red WiFi"], temperatura: "22°C", ultimoAseo: "Hace 1 hora" },
  { id: "S-203", nombre: "Aula A-203", bloque: "Bloque A", piso: "Piso 2", sede: "Sede Principal Av. 6", capacidad: 35, estado: "ocupado", tipo: "aula", equipamiento: ["Videobeam", "Aire Acondicionado", "Red Ethernet"], responsable: "Prof. Andrés Gil (Cálculo)", temperatura: "23°C", ultimoAseo: "Hace 3 horas" },
  { id: "S-105", nombre: "Aula B-105", bloque: "Bloque B", piso: "Piso 1", sede: "Sede Principal Av. 6", capacidad: 45, estado: "mantenimiento", tipo: "aula", equipamiento: ["Videobeam Smart", "Aire Acondicionado 24K BTU", "Altavoces"], responsable: "Soporte IT (Reparación videobeam)", temperatura: "N/A", ultimoAseo: "Ayer" },
  { id: "LAB-E1", nombre: "Lab. Electrónica 1", bloque: "Bloque C", piso: "Piso 1", sede: "Sede Principal Av. 6", capacidad: 25, estado: "disponible", tipo: "laboratorio", equipamiento: ["Osciloscopios Tektronix", "Fuentes DC", "Generadores de Señales", "25 PCs"], temperatura: "21°C", ultimoAseo: "Hace 2 horas" },
  { id: "LAB-S3", nombre: "Lab. Sistemas 3", bloque: "Bloque C", piso: "Piso 2", sede: "Sede Principal Av. 6", capacidad: 30, estado: "ocupado", tipo: "laboratorio", equipamiento: ["30 i7 16GB", "Red Fibra 1Gbps", "Proyector Laser"], responsable: "Ing. Sistemas (Redes II)", temperatura: "20°C", ultimoAseo: "Hace 1 hora" },
  { id: "PLAZ-1", nombre: "Plazoleta Central", bloque: "Zonas Comunes", piso: "Piso 1", sede: "Sede Principal Av. 6", capacidad: 250, estado: "disponible", tipo: "comun", equipamiento: ["Tomacorrientes Intemperie", "Escenario Módulos", "Iluminación LED"] },
  { id: "AUD-1", nombre: "Auditorio Principal", bloque: "Bloque A", piso: "Piso 1", sede: "Sede Principal Av. 6", capacidad: 180, estado: "reservado", tipo: "auditorio", equipamiento: ["Consola Sonido 16Ch", "Proyección 4K", "Aire Central", "Sillería Reclinable"], responsable: "Bienestar Universitario (Conferencia)", temperatura: "21°C" },
  { id: "CUB-12", nombre: "Cubículo de Estudio C-12", bloque: "Biblioteca UniBiblio", piso: "Piso 2", sede: "Sede Principal Av. 6", capacidad: 4, estado: "disponible", tipo: "cubiculo", equipamiento: ["Mesa Colaborativa", "4 Sillas", "Pantalla TV 42''", "Tomas USB-C"] },
]

export const INITIAL_TICKETS: Ticket[] = [
  { id: "TK-481", salonId: "S-105", salonNombre: "Aula B-105", categoria: "it", prioridad: "alta", reportadoPor: "Prof. Andrés Gil", fecha: "2026-07-22 08:30", descripcion: "Proyección de videobeam presenta colores parpadeantes e invertidos en azul/verde.", estado: "en_proceso", tecnicoAsignado: "Carlos Mena (Soporte IT)", evidenciaAntesUrl: "/images/evidence_videobeam_bad.jpg" },
  { id: "TK-482", salonId: "S-203", salonNombre: "Aula A-203", categoria: "infraestructura", prioridad: "media", reportadoPor: "Prof. Andrés Gil", fecha: "2026-07-22 09:15", descripcion: "La bisagra de la puerta principal hace fricción y no cierra adecuadamente.", estado: "asignado", tecnicoAsignado: "Jorge Ramírez (Planta Física)", evidenciaAntesUrl: "/images/evidence_door.jpg" },
  { id: "TK-483", salonId: "LAB-E1", salonNombre: "Lab. Electrónica 1", categoria: "electrico", prioridad: "alta", reportadoPor: "Santiago Ortiz (Monitor)", fecha: "2026-07-22 10:00", descripcion: "Toma de corriente de la mesa 4 chispas al conectar osciloscopio.", estado: "pendiente_asignacion", evidenciaAntesUrl: "/images/evidence_outlet.jpg" },
]

export const INITIAL_RESERVAS: Reserva[] = [
  { id: "RES-101", espacioNombre: "Plazoleta Central", solicitante: "Mateo Carvajal (Líder Folclórico)", rolSolicitante: "Representante Cultural", fecha: "2026-07-25", horaInicio: "16:00", horaFin: "18:00", aforoEstimado: 60, logisticaRequerida: ["2 Mesas", "20 Sillas", "1 Parlante de Sonido 500W", "Punto Eléctrico 110V"], planPdfAdjunto: "Plan_Ensayo_Danzas_Agosto.pdf", estado: "pendiente_aprobacion" },
  { id: "RES-102", espacioNombre: "Cubículo de Estudio C-12", solicitante: "Laura Restrepo", rolSolicitante: "Estudiante Regular", fecha: "2026-07-22", horaInicio: "14:00", horaFin: "16:00", aforoEstimado: 3, logisticaRequerida: ["Pantalla HDMI TV"], estado: "aprobado" },
  { id: "RES-103", espacioNombre: "Auditorio Principal", solicitante: "Beatriz Morales", rolSolicitante: "Funcionario Eventos", fecha: "2026-07-24", horaInicio: "09:00", horaFin: "12:00", aforoEstimado: 150, logisticaRequerida: ["Micrófonos Inalámbricos", "Proyector Laser 4K", "Aseo previo"], estado: "aprobado" },
]

export const INITIAL_LIBROS: Libro[] = [
  { id: "LIB-001", codigo: "515.3 S841c", titulo: "Cálculo de una Variable", autor: "James Stewart", categoria: "Matemáticas", unidadesDisponibles: 3, totalUnidades: 5, ubicacion: "Estante A-12" },
  { id: "LIB-002", codigo: "004.6 T158r", titulo: "Redes de Computadoras 5ta Ed.", autor: "Andrew S. Tanenbaum", categoria: "Ingeniería", unidadesDisponibles: 2, totalUnidades: 4, ubicacion: "Estante C-04" },
  { id: "LIB-003", codigo: "621.38 H381f", titulo: "Fundamentos de Circuitos Eléctricos", autor: "Charles K. Alexander", categoria: "Electrónica", unidadesDisponibles: 4, totalUnidades: 6, ubicacion: "Estante B-08" },
  { id: "LIB-004", codigo: "005.13 J129j", titulo: "Estructuras de Datos y Algoritmos", autor: "Mark Allen Weiss", categoria: "Sistemas", unidadesDisponibles: 1, totalUnidades: 3, ubicacion: "Estante C-09" },
]

export const INITIAL_PRESTAMOS: Prestamo[] = [
  { id: "PRES-881", estudiante: "Laura Restrepo (12104521)", libroId: "LIB-001", libroTitulo: "Cálculo de una Variable (Stewart)", fechaPrestamo: "2026-07-18", fechaVencimiento: "2026-07-25", qrCode: "QR-PRES-881-UC", estado: "entregado", multaCop: 0, firmadoDigitalmente: true },
  { id: "PRES-882", estudiante: "Santiago Ortiz (12103310)", libroId: "LIB-002", libroTitulo: "Redes de Computadoras (Tanenbaum)", fechaPrestamo: "2026-07-10", fechaVencimiento: "2026-07-17", qrCode: "QR-PRES-882-UC", estado: "devuelto_exitoso", multaCop: 0, firmadoDigitalmente: true },
]

export const INITIAL_INSUMOS: Insumo[] = [
  { id: "INS-01", codigo: "CAB-HDMI-02", nombre: "Cable HDMI de Alta Velocidad 3m", categoria: "tecnologia", stockActual: 4, stockMinimo: 8, unidad: "Unidades", ubicacion: "Estantería IT A2" },
  { id: "INS-02", codigo: "MAR-BOR-01", nombre: "Caja Marcadores Borra Seco Negro/Azul", categoria: "aseo", stockActual: 18, stockMinimo: 10, unidad: "Cajas", ubicacion: "Estantería General B1" },
  { id: "INS-03", codigo: "BOM-LED-18", nombre: "Bombillo Panel LED 18W 6500K", categoria: "electrico", stockActual: 3, stockMinimo: 10, unidad: "Unidades", ubicacion: "Estantería Eléctrica E4" },
  { id: "INS-04", codigo: "BIS-MET-25", nombre: "Bisagra Acero Inoxidable 3x3 pulg.", categoria: "infraestructura", stockActual: 12, stockMinimo: 5, unidad: "Unidades", ubicacion: "Estantería Planta F3" },
  { id: "INS-05", codigo: "CON-RJ45-6", nombre: "Conectores RJ45 Cat6 Amphonel", categoria: "tecnologia", stockActual: 85, stockMinimo: 30, unidad: "Piezas", ubicacion: "Estantería IT A5" },
]

export const INITIAL_DESPACHOS: Despacho[] = [
  { id: "DESP-301", insumoNombre: "Cable HDMI 3m", cantidad: 1, ticketId: "TK-481", tecnicoNombre: "Carlos Mena", fecha: "2026-07-22 09:30", estado: "pendiente" },
  { id: "DESP-302", insumoNombre: "Bisagra Acero 3x3", cantidad: 1, ticketId: "TK-482", tecnicoNombre: "Jorge Ramírez", fecha: "2026-07-22 09:45", estado: "pendiente" },
]

export const INITIAL_NOTIFICACIONES: NotificacionPush[] = [
  { id: "NOT-1", titulo: "⚡ Solicitud Express de Insumos", mensaje: "El Prof. Andrés Gil solicita Cable HDMI urgente en Salón A-203.", tipo: "warning", fecha: "Hace 5 min", leida: false },
  { id: "NOT-2", titulo: "📜 Paz y Salvo Emitido", mensaje: "El estudiante Valentina Gómez ha descargado su Paz y Salvo digital de Grado.", tipo: "success", fecha: "Hace 20 min", leida: false },
  { id: "NOT-3", titulo: "🛠️ Orden Asignada", mensaje: "Se te ha asignado el Ticket TK-481 (Videobeam Aula B-105).", tipo: "info", fecha: "Hace 45 min", leida: true },
]

export const INITIAL_USUARIOS_RBAC: UsuarioRBAC[] = [
  { id: "USR-01", nombre: "Laura Restrepo", email: "laura.restrepo@smartcampus.edu.co", subRole: "estudiante_regular", dependencia: "Ingeniería de Sistemas", estado: "activo", ultimoAcceso: "Hoy 10:15" },
  { id: "USR-02", nombre: "Mateo Carvajal", email: "mateo.carvajal@smartcampus.edu.co", subRole: "estudiante_representante", dependencia: "Bienestar Cultural & Deportivo", estado: "activo", ultimoAcceso: "Hoy 09:30" },
  { id: "USR-03", nombre: "Santiago Ortiz", email: "santiago.ortiz@smartcampus.edu.co", subRole: "estudiante_monitor", dependencia: "Laboratorios de Ingeniería", estado: "activo", ultimoAcceso: "Hoy 11:00" },
  { id: "USR-04", nombre: "Valentina Gómez", email: "valentina.gomez@smartcampus.edu.co", subRole: "estudiante_grado", dependencia: "Facultad de Ingeniería", estado: "activo", ultimoAcceso: "Hoy 08:45" },
  { id: "USR-05", nombre: "Prof. Andrés Gil", email: "andres.gil@smartcampus.edu.co", subRole: "docente_regular", dependencia: "Facultad de Electrónica", estado: "activo", ultimoAcceso: "Hoy 11:20" },
  { id: "USR-06", nombre: "Dr. Roberto Mendoza", email: "roberto.mendoza@smartcampus.edu.co", subRole: "director_programa", dependencia: "Dirección Ing. de Sistemas", estado: "activo", ultimoAcceso: "Hoy 09:10" },
  { id: "USR-07", nombre: "Beatriz Morales", email: "beatriz.morales@smartcampus.edu.co", subRole: "funcionario_eventos", dependencia: "Coordinación de Eventos & Admisiones", estado: "activo", ultimoAcceso: "Hoy 10:05" },
  { id: "USR-08", nombre: "Jorge Ramírez", email: "jorge.ramirez@smartcampus.edu.co", subRole: "tecnico_planta", dependencia: "Infraestructura & Mantenimiento", estado: "activo", ultimoAcceso: "Hoy 08:30" },
  { id: "USR-09", nombre: "Ing. Esteban Osorio", email: "esteban.osorio@smartcampus.edu.co", subRole: "tecnico_electrico", dependencia: "División Eléctrica & RETIE", estado: "activo", ultimoAcceso: "Hoy 07:45" },
  { id: "USR-10", nombre: "Carlos Mena", email: "carlos.mena@smartcampus.edu.co", subRole: "tecnico_it", dependencia: "Dirección de Tecnología & A/V", estado: "activo", ultimoAcceso: "Hoy 11:10" },
  { id: "USR-11", nombre: "María Fernanda López", email: "maria.lopez@smartcampus.edu.co", subRole: "tecnico_servicios", dependencia: "Servicios Generales & Aseo", estado: "activo", ultimoAcceso: "Hoy 06:50" },
  { id: "USR-12", nombre: "Diana Ospina", email: "diana.ospina@smartcampus.edu.co", subRole: "almacenista", dependencia: "Almacén General & Suministros", estado: "activo", ultimoAcceso: "Hoy 08:00" },
  { id: "USR-13", nombre: "Ing. Mónica Salazar", email: "monica.salazar@smartcampus.edu.co", subRole: "super_admin", dependencia: "Dirección Operativa Campus", estado: "activo", ultimoAcceso: "Hoy 07:30" },
]

export const INITIAL_AUDITORIA: LogAuditoria[] = [
  { id: "LOG-901", fecha: "2026-07-22 11:05", usuario: "Mónica Salazar", accion: "MODIFICAR_RBAC", recurso: "Usuario USR-02", detalles: "Asignado Sub-Rol estudiante_representante con permisos de reserva de gran aforo." },
  { id: "LOG-902", fecha: "2026-07-22 10:20", usuario: "Carlos Mena", accion: "CAMBIO_ESTADO_AULA", recurso: "Aula B-105", detalles: "Estado cambiado a 'En Mantenimiento' tras iniciar reparación de videobeam." },
  { id: "LOG-903", fecha: "2026-07-22 09:00", usuario: "Sistema AutoUniBiblio", accion: "FIRMA_PAZ_SALVO", recurso: "Estudiante Valentina Gómez", detalles: "Certificado generado sin deudas activas. Hash criptográfico: 0x9f82a...bc3" },
]
