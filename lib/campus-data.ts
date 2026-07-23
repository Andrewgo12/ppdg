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
} from "lucide-react"

export type RoleId = "estudiante" | "docente" | "tecnico" | "almacen" | "admin"

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

export interface NavItem {
  label: string
  icon: LucideIcon
  view: ViewKey
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

export const ROLES: Record<RoleId, Role> = {
  estudiante: {
    id: "estudiante",
    name: "Estudiante",
    title: "Estudiante Regular",
    fullName: "Laura Restrepo",
    avatar: "LR",
    icon: GraduationCap,
    tagline: "Consulta salones, reserva espacios y gestiona tu biblioteca.",
    nav: [
      { label: "Inicio", icon: LayoutDashboard, view: "inicio" },
      { label: "Mapa de salones", icon: MapPin, view: "mapa" },
      { label: "Reservas", icon: CalendarCheck, view: "reservas" },
      { label: "Biblioteca", icon: BookOpen, view: "biblioteca" },
    ],
    stats: [
      { label: "Salones libres ahora", value: "18", hint: "Sede Principal Av. 6", tone: "accent" },
      { label: "Mis reservas activas", value: "2", hint: "Sala de estudio + libro", tone: "primary" },
      { label: "Préstamos vigentes", value: "1", hint: "Vence en 3 días", tone: "warning" },
    ],
    modules: [
      { title: "Disponibilidad de salones", description: "Consulta en tiempo real si un salón está libre, ocupado o reservado.", icon: MapPin },
      { title: "Reservar espacio de estudio", description: "Aparta salas de estudio individuales o grupales por franja horaria.", icon: CalendarCheck },
      { title: "Biblioteca", description: "Reserva libros, recibe tu código QR y firma el préstamo digital.", icon: BookOpen },
    ],
  },
  docente: {
    id: "docente",
    name: "Docente",
    title: "Docente Regular",
    fullName: "Prof. Andrés Gil",
    avatar: "AG",
    icon: Presentation,
    tagline: "Reporta fallas, pide insumos urgentes y reserva salones.",
    nav: [
      { label: "Inicio", icon: LayoutDashboard, view: "inicio" },
      { label: "Reportar falla", icon: AlertTriangle, view: "reportar" },
      { label: "Insumos", icon: PackageSearch, view: "insumos" },
      { label: "Reservas", icon: CalendarCheck, view: "reservas" },
    ],
    stats: [
      { label: "Mis reportes abiertos", value: "3", hint: "1 en atención", tone: "warning" },
      { label: "Solicitudes de insumo", value: "2", hint: "Marcadores y cable HDMI", tone: "primary" },
      { label: "Clases hoy", value: "4", hint: "Bloques A-203, B-105", tone: "accent" },
    ],
    modules: [
      { title: "Reportar falla del aula", description: "Adjunta foto o video del daño; se asigna al técnico por especialidad.", icon: AlertTriangle },
      { title: "Solicitar insumos urgentes", description: "Pide marcadores, cables o materiales directamente al almacén.", icon: PackageSearch },
      { title: "Reservar salón", description: "Aparta espacios para actividades de recuperación o tutorías.", icon: CalendarCheck },
    ],
  },
  tecnico: {
    id: "tecnico",
    name: "Técnico",
    title: "Técnico de Tecnología / Soporte IT",
    fullName: "Carlos Mena",
    avatar: "CM",
    icon: HardHat,
    tagline: "Atiende las órdenes de trabajo asignadas a tu especialidad.",
    nav: [
      { label: "Inicio", icon: LayoutDashboard, view: "inicio" },
      { label: "Mis tickets", icon: ClipboardList, view: "tickets" },
      { label: "En atención", icon: Wrench, view: "atencion" },
    ],
    stats: [
      { label: "Tickets asignados", value: "6", hint: "Especialidad: IT / A/V", tone: "primary" },
      { label: "En atención", value: "2", hint: "Videobeam B-105", tone: "warning" },
      { label: "Resueltos esta semana", value: "14", hint: "MTTR 3.2 h", tone: "accent" },
    ],
    modules: [
      { title: "Órdenes de trabajo", description: "Solo verás tickets de tu especialidad (videobeams, redes, equipos).", icon: ClipboardList },
      { title: "Registrar avance", description: "Actualiza el estado y adjunta evidencia final de cierre.", icon: Wrench },
      { title: "Historial de fallas", description: "Consulta la recurrencia de daños por salón y equipo.", icon: BarChart3 },
    ],
  },
  almacen: {
    id: "almacen",
    name: "Almacén",
    title: "Responsable de Insumos",
    fullName: "Diana Ospina",
    avatar: "DO",
    icon: Warehouse,
    tagline: "Controla stock, despachos y alertas de reabastecimiento.",
    nav: [
      { label: "Inicio", icon: LayoutDashboard, view: "inicio" },
      { label: "Inventario", icon: Boxes, view: "inventario" },
      { label: "Despachos", icon: Truck, view: "despachos" },
      { label: "Alertas", icon: AlertTriangle, view: "alertas" },
    ],
    stats: [
      { label: "Solicitudes pendientes", value: "5", hint: "3 con ticket asociado", tone: "warning" },
      { label: "Ítems bajo mínimo", value: "8", hint: "Requieren reorden", tone: "danger" },
      { label: "Despachos hoy", value: "12", hint: "Todos con ticket", tone: "accent" },
    ],
    modules: [
      { title: "Inventario de insumos", description: "Consulta stock de repuestos y materiales en tiempo real.", icon: Boxes },
      { title: "Aprobar despachos", description: "Autoriza entregas solo con ticket o permiso administrativo.", icon: Truck },
      { title: "Alertas de reabastecimiento", description: "Recibe avisos automáticos cuando un ítem baja del mínimo.", icon: AlertTriangle },
    ],
  },
  admin: {
    id: "admin",
    name: "Administrador",
    title: "Administrador del Campus",
    fullName: "Mónica Salazar",
    avatar: "MS",
    icon: ShieldCheck,
    tagline: "Supervisa métricas, usuarios, espacios y aprobaciones.",
    nav: [
      { label: "Inicio", icon: LayoutDashboard, view: "inicio" },
      { label: "Indicadores", icon: BarChart3, view: "indicadores" },
      { label: "Usuarios", icon: Users, view: "usuarios" },
      { label: "Aprobaciones", icon: CheckSquare, view: "aprobaciones" },
      { label: "Espacios", icon: Building2, view: "espacios" },
    ],
    stats: [
      { label: "Tickets abiertos", value: "23", hint: "MTTR global 4.1 h", tone: "primary" },
      { label: "Reservas por aprobar", value: "7", hint: "Eventos y salones", tone: "warning" },
      { label: "Ocupación del campus", value: "68%", hint: "Sede Principal", tone: "accent" },
      { label: "Usuarios activos", value: "3.240", hint: "En las últimas 24 h", tone: "neutral" },
    ],
    modules: [
      { title: "Indicadores institucionales", description: "Tiempos de respuesta, uso de salones y recurrencia de fallas.", icon: BarChart3 },
      { title: "Gestión de usuarios", description: "Crea perfiles, asigna roles y define dependencias.", icon: Users },
      { title: "Aprobación de reservas", description: "Autoriza eventos, reasigna estados y delega funciones.", icon: CheckSquare },
      { title: "Estado de espacios", description: "Controla salones libres, ocupados o en mantenimiento.", icon: Building2 },
    ],
  },
}

export const ROLE_ORDER: RoleId[] = ["estudiante", "docente", "tecnico", "almacen", "admin"]
