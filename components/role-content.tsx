"use client"

import { useState } from "react"
import type { RoleId, ViewKey } from "@/lib/campus-data"
import { Modal } from "@/components/ui/modal"
import { Dialog } from "@/components/ui/dialog"
import { Dropdown } from "@/components/ui/dropdown"
import { Tabs, type TabItem } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  Camera,
  MoreVertical,
} from "lucide-react"

/* ------------------------------ Primitives ------------------------------ */

function Panel({
  title,
  action,
  children,
  className = "",
}: {
  title: string
  action?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={`rounded-3xl border border-border bg-card p-5 sm:p-6 ${className}`}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold tracking-tight text-foreground">{title}</h2>
        {action && (
          <button type="button" className="text-sm font-medium text-primary hover:underline">
            {action}
          </button>
        )}
      </div>
      {children}
    </section>
  )
}

type Tone = "free" | "busy" | "reserved" | "maint"

function StatusChip({ label, tone }: { label: string; tone: Tone }) {
  const styles: Record<Tone, string> = {
    free: "bg-accent/10 text-accent",
    busy: "bg-destructive/10 text-destructive",
    reserved: "bg-primary/10 text-primary",
    maint: "bg-chart-3/15 text-chart-3",
  }
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[tone]}`}>
      {label}
    </span>
  )
}

function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h1>
      <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
    </div>
  )
}

function PrimaryBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
    >
      {children}
    </button>
  )
}

function GhostBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
    >
      {children}
    </button>
  )
}

function AccessNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-2xl bg-secondary px-4 py-3 text-xs leading-relaxed text-secondary-foreground">
      {children}
    </p>
  )
}

/* ============================= ESTUDIANTE ============================== */

const ROOMS = [
  { code: "A-201", tone: "free" as Tone, label: "Libre", detail: "Cap. 40 · Piso 2" },
  { code: "A-203", tone: "busy" as Tone, label: "Ocupado", detail: "Cálculo II" },
  { code: "B-105", tone: "reserved" as Tone, label: "Reservado", detail: "15:00–17:00" },
  { code: "B-110", tone: "free" as Tone, label: "Libre", detail: "Cap. 30 · Piso 1" },
  { code: "Lab-3", tone: "maint" as Tone, label: "Mantenimiento", detail: "Videobeam" },
  { code: "Sala-E1", tone: "free" as Tone, label: "Libre", detail: "Estudio grupal" },
]

// === ESTUDIANTE: DETALLE SALÓN ===
function StudentRoomDetailModal({
  isOpen,
  onClose,
  room,
}: {
  isOpen: boolean
  onClose: () => void
  room?: (typeof ROOMS)[0]
}) {
  if (!room) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Salón ${room.code}`} size="md">
      <div className="space-y-4">
        <div className="rounded-2xl border border-border bg-muted p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Estado actual</p>
            <StatusChip label={room.label} tone={room.tone} />
          </div>
          <p className="text-sm text-foreground">{room.detail}</p>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl border border-border p-3">
              <p className="text-xs text-muted-foreground">Capacidad</p>
              <p className="mt-1 font-semibold text-foreground">40 personas</p>
            </div>
            <div className="rounded-2xl border border-border p-3">
              <p className="text-xs text-muted-foreground">Piso</p>
              <p className="mt-1 font-semibold text-foreground">2</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border p-4">
          <p className="mb-2 text-sm font-medium text-foreground">Equipamiento</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ Videobeam</li>
            <li>✓ Aire acondicionado</li>
            <li>✓ Pizarra inteligente</li>
            <li>✓ Conexión Wi-Fi</li>
          </ul>
        </div>

        <div className="flex gap-2">
          <GhostBtn onClick={onClose}>Cerrar</GhostBtn>
          <PrimaryBtn onClick={onClose}>Reservar este salón</PrimaryBtn>
        </div>
      </div>
    </Modal>
  )
}

function StudentHome() {
  const [selectedRoom, setSelectedRoom] = useState<(typeof ROOMS)[0] | null>(null)
  const [roomDetailOpen, setRoomDetailOpen] = useState(false)

  const handleRoomClick = (room: (typeof ROOMS)[0]) => {
    setSelectedRoom(room)
    setRoomDetailOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Salones disponibles ahora" action="Ver mapa" className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {ROOMS.map((r) => (
              <button
                key={r.code}
                onClick={() => handleRoomClick(r)}
                className="rounded-2xl border border-border p-4 text-left transition-all hover:border-primary hover:shadow-md"
              >
                <span className="font-semibold text-foreground">{r.code}</span>
                <div className="mt-2">
                  <StatusChip label={r.label} tone={r.tone} />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{r.detail}</p>
              </button>
            ))}
          </div>
        </Panel>
        <Panel title="Mi biblioteca" action="Reservar">
          <ul className="space-y-3">
            {[
              { t: "Cálculo de una variable", s: "Vence en 3 días", warn: true },
              { t: "Física universitaria", s: "Recoger hoy", warn: false },
            ].map((b) => (
              <li key={b.t} className="rounded-2xl border border-border p-4">
                <p className="text-sm font-medium text-foreground">{b.t}</p>
                <p className={`mt-1 text-xs ${b.warn ? "text-chart-3" : "text-muted-foreground"}`}>
                  {b.s}
                </p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <StudentRoomDetailModal
        isOpen={roomDetailOpen}
        onClose={() => setRoomDetailOpen(false)}
        room={selectedRoom || undefined}
      />
    </div>
  )
}

// === ESTUDIANTE: MAPA ===
function StudentMapa() {
  const [selectedRoom, setSelectedRoom] = useState<(typeof ROOMS)[0] | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  return (
    <div className="space-y-4">
      <PageHeader
        title="Mapa de salones"
        subtitle="Ocupación en tiempo real de la Sede Principal. Toca un salón para ver el detalle."
      />
      <Panel title="Bloque A · Bloque B">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {ROOMS.concat([
            { code: "A-108", tone: "free", label: "Libre", detail: "Cap. 35" },
            { code: "B-210", tone: "busy", label: "Ocupado", detail: "Química" },
          ]).map((r) => (
            <button
              key={r.code}
              onClick={() => {
                setSelectedRoom(r)
                setDetailOpen(true)
              }}
              className="flex flex-col gap-2 rounded-2xl border border-border p-4 text-left transition-all hover:border-primary hover:shadow-md"
            >
              <span className="font-semibold text-foreground">{r.code}</span>
              <StatusChip label={r.label} tone={r.tone} />
              <p className="text-xs text-muted-foreground">{r.detail}</p>
            </button>
          ))}
        </div>
      </Panel>

      <StudentRoomDetailModal
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        room={selectedRoom || undefined}
      />
    </div>
  )
}

// === ESTUDIANTE: RESERVAS ===
function StudentReservas() {
  const [reservaOpen, setReservaOpen] = useState(false)
  const slots = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"]

  return (
    <div className="space-y-4">
      <PageHeader
        title="Reservar espacio de estudio"
        subtitle="Aparta salas individuales o grupales por franja horaria."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Elige una franja · Sala-E1" className="lg:col-span-2">
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-muted p-4">
              <p className="text-sm font-medium text-foreground">Disponibilidad hoy</p>
              <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-6">
                {slots.map((s, i) => (
                  <button
                    key={s}
                    type="button"
                    disabled={i === 2}
                    className="rounded-2xl border border-border py-3 text-sm font-medium text-foreground transition-all enabled:hover:border-primary enabled:hover:text-primary disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <PrimaryBtn onClick={() => setReservaOpen(true)}>Confirmar reserva</PrimaryBtn>
          </div>
        </Panel>
        <Panel title="Mis reservas activas">
          <ul className="space-y-3">
            {[
              { t: "Sala-E1 · Hoy 14:00", s: "Estudio grupal" },
              { t: "Libro reservado", s: "Recoger en biblioteca" },
            ].map((r) => (
              <li key={r.t} className="rounded-2xl border border-border p-4">
                <p className="text-sm font-medium text-foreground">{r.t}</p>
                <p className="mt-1 text-xs text-muted-foreground">{r.s}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Dialog
        isOpen={reservaOpen}
        onClose={() => setReservaOpen(false)}
        onConfirm={() => setReservaOpen(false)}
        type="success"
        title="Reserva confirmada"
        message="Tu espacio en Sala-E1 está reservado para hoy de 14:00 a 16:00."
        confirmText="Aceptar"
      />
    </div>
  )
}

// === ESTUDIANTE: BIBLIOTECA ===
function StudentBiblioteca() {
  const [bookDetailOpen, setBookDetailOpen] = useState(false)
  const books = [
    { t: "Cálculo de una variable", a: "Stewart", tone: "reserved" as Tone, s: "Prestado" },
    { t: "Física universitaria", a: "Sears · Zemansky", tone: "free" as Tone, s: "Disponible" },
    { t: "Álgebra lineal", a: "Grossman", tone: "free" as Tone, s: "Disponible" },
    { t: "Química general", a: "Chang", tone: "busy" as Tone, s: "Agotado" },
  ]

  return (
    <div className="space-y-4">
      <PageHeader
        title="Biblioteca"
        subtitle="Reserva libros y recibe tu código QR para el préstamo digital."
      />
      <Panel title="Catálogo" action="Buscar">
        <div className="grid gap-3 sm:grid-cols-2">
          {books.map((b) => (
            <button
              key={b.t}
              onClick={() => setBookDetailOpen(true)}
              className="flex items-center justify-between gap-3 rounded-2xl border border-border p-4 text-left transition-all hover:border-primary hover:shadow-md"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{b.t}</p>
                <p className="truncate text-xs text-muted-foreground">{b.a}</p>
              </div>
              <StatusChip label={b.s} tone={b.tone} />
            </button>
          ))}
        </div>
      </Panel>

      <Modal isOpen={bookDetailOpen} onClose={() => setBookDetailOpen(false)} title="Cálculo de una variable" size="md">
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-muted p-4">
            <p className="text-sm text-muted-foreground">Autor</p>
            <p className="mt-1 text-sm font-semibold text-foreground">James Stewart</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl border border-border p-3">
              <p className="text-xs text-muted-foreground">Editorial</p>
              <p className="mt-1 font-semibold text-foreground">Cengage</p>
            </div>
            <div className="rounded-2xl border border-border p-3">
              <p className="text-xs text-muted-foreground">ISBN</p>
              <p className="mt-1 font-semibold text-foreground">978-0.....</p>
            </div>
          </div>
          <div className="flex gap-2">
            <GhostBtn onClick={() => setBookDetailOpen(false)}>Cerrar</GhostBtn>
            <PrimaryBtn onClick={() => setBookDetailOpen(false)}>Reservar libro</PrimaryBtn>
          </div>
        </div>
      </Modal>
    </div>
  )
}

/* ============================= DOCENTE ============================== */

const REPORTS = [
  { id: "#1042", room: "A-203", issue: "Videobeam sin señal", status: "En atención", tone: "reserved" as Tone },
  { id: "#1039", room: "B-105", issue: "Toma eléctrica floja", status: "Asignado", tone: "maint" as Tone },
  { id: "#1021", room: "A-201", issue: "Silla rota", status: "Resuelto", tone: "free" as Tone },
]

function ReportsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
            <th className="pb-3 font-medium">Ticket</th>
            <th className="pb-3 font-medium">Salón</th>
            <th className="pb-3 font-medium">Falla</th>
            <th className="pb-3 font-medium">Estado</th>
            <th className="pb-3 font-medium">Acción</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {REPORTS.map((r) => (
            <tr key={r.id}>
              <td className="py-3 font-medium text-foreground">{r.id}</td>
              <td className="py-3 text-muted-foreground">{r.room}</td>
              <td className="py-3 text-muted-foreground">{r.issue}</td>
              <td className="py-3">
                <StatusChip label={r.status} tone={r.tone} />
              </td>
              <td className="py-3">
                <button className="text-xs font-medium text-primary hover:underline">Ver</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TeacherHome() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Panel title="Mis reportes de falla" action="Nuevo reporte" className="lg:col-span-2">
        <ReportsTable />
      </Panel>
      <Panel title="Insumos solicitados">
        <ul className="space-y-3">
          {[
            { t: "Marcadores x3", s: "Aprobado · Recoger", tone: "free" as Tone },
            { t: "Cable HDMI", s: "Pendiente de despacho", tone: "maint" as Tone },
          ].map((i) => (
            <li key={i.t} className="flex items-center justify-between rounded-2xl border border-border p-4">
              <div>
                <p className="text-sm font-medium text-foreground">{i.t}</p>
                <p className="mt-1 text-xs text-muted-foreground">{i.s}</p>
              </div>
              <StatusChip label={i.tone === "free" ? "Listo" : "Pendiente"} tone={i.tone} />
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  )
}

// === DOCENTE: REPORTAR ===
function TeacherReportar() {
  const [reportSubmitted, setReportSubmitted] = useState(false)

  return (
    <div className="space-y-4">
      <PageHeader
        title="Reportar falla del aula"
        subtitle="Describe el daño y adjunta evidencia. Se asigna al técnico por especialidad."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Nuevo reporte" className="lg:col-span-2">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Salón</label>
              <input
                defaultValue="A-203"
                className="w-full rounded-2xl border border-input bg-card px-4 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Tipo de falla
              </label>
              <div className="flex flex-wrap gap-2">
                {["Videobeam", "Red / IT", "Eléctrico", "Mobiliario"].map((t, i) => (
                  <button
                    key={t}
                    type="button"
                    className={`rounded-full px-3 py-1.5 text-sm transition-all ${
                      i === 0
                        ? "bg-primary text-primary-foreground"
                        : "border border-border text-muted-foreground hover:border-primary"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Descripción</label>
              <textarea
                rows={3}
                defaultValue="El videobeam no proyecta señal desde el HDMI 1."
                className="w-full rounded-2xl border border-input bg-card px-4 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Evidencia (foto/video)</label>
              <button
                type="button"
                className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border p-6 text-center transition-colors hover:border-primary hover:bg-primary/5"
              >
                <Camera className="size-6 text-muted-foreground" />
                <p className="text-sm font-medium text-muted-foreground">Captura o sube evidencia</p>
              </button>
            </div>
            <PrimaryBtn onClick={() => setReportSubmitted(true)}>Enviar reporte</PrimaryBtn>
          </div>
        </Panel>
        <Panel title="Reportes recientes">
          <ReportsTable />
        </Panel>
      </div>

      <Dialog
        isOpen={reportSubmitted}
        onClose={() => setReportSubmitted(false)}
        type="success"
        title="Reporte enviado"
        message="Tu reporte #1051 ha sido creado y asignado al técnico de IT."
        confirmText="Aceptar"
      />
    </div>
  )
}

// === DOCENTE: INSUMOS ===
function TeacherInsumos() {
  const [requestOpen, setRequestOpen] = useState(false)

  return (
    <div className="space-y-4">
      <PageHeader
        title="Solicitar insumos"
        subtitle="Pide materiales directamente al almacén; requieren aprobación."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Solicitud rápida">
          <div className="grid grid-cols-2 gap-3">
            {["Marcadores", "Cable HDMI", "Borrador", "Adaptador VGA"].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRequestOpen(true)}
                className="rounded-2xl border border-border p-4 text-left text-sm font-medium text-foreground transition-all hover:border-primary hover:shadow-md"
              >
                {i}
              </button>
            ))}
          </div>
          <div className="mt-5">
            <PrimaryBtn onClick={() => setRequestOpen(true)}>Otra solicitud</PrimaryBtn>
          </div>
        </Panel>
        <Panel title="Historial de solicitudes">
          <ul className="space-y-3">
            {[
              { t: "Marcadores x3", s: "Aprobado", tone: "free" as Tone },
              { t: "Cable HDMI", s: "Pendiente", tone: "maint" as Tone },
              { t: "Adaptador VGA", s: "Rechazado", tone: "busy" as Tone },
            ].map((i) => (
              <li
                key={i.t}
                className="flex items-center justify-between gap-3 rounded-2xl border border-border p-4"
              >
                <span className="text-sm font-medium text-foreground">{i.t}</span>
                <StatusChip label={i.s} tone={i.tone} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Modal isOpen={requestOpen} onClose={() => setRequestOpen(false)} title="Nueva solicitud" size="md">
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Ítem</label>
            <input placeholder="Ej: Marcadores rojo" className="w-full rounded-2xl border border-input bg-card px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Cantidad</label>
            <input type="number" defaultValue="1" className="w-full rounded-2xl border border-input bg-card px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Nota</label>
            <textarea rows={2} placeholder="Urgencia: necesito para hoy" className="w-full rounded-2xl border border-input bg-card px-4 py-2.5 text-sm" />
          </div>
          <div className="flex gap-2">
            <GhostBtn onClick={() => setRequestOpen(false)}>Cancelar</GhostBtn>
            <PrimaryBtn onClick={() => setRequestOpen(false)}>Enviar solicitud</PrimaryBtn>
          </div>
        </div>
      </Modal>
    </div>
  )
}

// === DOCENTE: RESERVAS ===
function TeacherReservas() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Reservar salón"
        subtitle="Aparta espacios para tutorías o clases de recuperación."
      />
      <Panel title="Salones disponibles" action="Filtrar">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {ROOMS.filter((r) => r.tone === "free")
            .concat([{ code: "B-110", tone: "free", label: "Libre", detail: "Cap. 30" }])
            .map((r) => (
              <div key={r.code + r.detail} className="rounded-2xl border border-border p-4">
                <span className="font-semibold text-foreground">{r.code}</span>
                <p className="mt-1 text-xs text-muted-foreground">{r.detail}</p>
                <button
                  type="button"
                  className="mt-3 w-full rounded-full bg-primary py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Reservar
                </button>
              </div>
            ))}
        </div>
      </Panel>
    </div>
  )
}

/* ============================= TÉCNICO ============================== */

const TICKETS = [
  { id: "#1042", room: "A-203", issue: "Videobeam sin señal", prio: "Alta", tone: "busy" as Tone },
  { id: "#1050", room: "Lab-3", issue: "Switch de red caído", prio: "Alta", tone: "busy" as Tone },
  { id: "#1047", room: "B-210", issue: "TV no enciende", prio: "Media", tone: "maint" as Tone },
  { id: "#1033", room: "A-108", issue: "PC sin arranque", prio: "Baja", tone: "reserved" as Tone },
]

function TicketList({ items, expandable = false }: { items: typeof TICKETS; expandable?: boolean }) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li
          key={t.id}
          className="rounded-2xl border border-border p-4 transition-all"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold text-foreground">{t.id}</span>
            <span className="text-sm text-muted-foreground">{t.room}</span>
            <span className="flex-1 text-sm text-foreground">{t.issue}</span>
            <StatusChip label={`${t.prio}`} tone={t.tone} />
          </div>
          {expandable && (
            <div className="mt-3 flex gap-2">
              <GhostBtn onClick={() => setExpandedId(expandedId === t.id ? null : t.id)}>
                {expandedId === t.id ? "Ocultar" : "Ver detalle"}
              </GhostBtn>
              <PrimaryBtn>Atender</PrimaryBtn>
            </div>
          )}
          {expandable && expandedId === t.id && (
            <div className="mt-3 border-t border-border pt-3">
              <p className="text-xs text-muted-foreground">
                Reportado por: Prof. Andrés Gil · Hace 2 horas
              </p>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

function TechnicianHome() {
  return (
    <Panel title="Órdenes de trabajo · Especialidad IT / A-V" action="Filtrar">
      <div className="mb-4">
        <AccessNote>
          Solo ves tickets asignados a tu especialidad. Otras áreas (planta física, eléctrico) no
          aparecen en tu bandeja.
        </AccessNote>
      </div>
      <TicketList items={TICKETS} expandable />
    </Panel>
  )
}

function TechnicianTickets() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Mis tickets"
        subtitle="Todas las órdenes de trabajo de tu especialidad, ordenadas por prioridad."
      />
      <Panel title="Bandeja completa">
        <TicketList items={TICKETS} expandable />
      </Panel>
    </div>
  )
}

function TechnicianAtencion() {
  const [closeConfirm, setCloseConfirm] = useState(false)

  return (
    <div className="space-y-4">
      <PageHeader
        title="En atención"
        subtitle="Tickets que estás resolviendo. Registra avance y adjunta evidencia de cierre."
      />
      <Panel title="Trabajos activos">
        <ul className="space-y-3">
          {TICKETS.filter((t) => t.tone === "busy").map((t) => (
            <li key={t.id} className="rounded-2xl border border-border p-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-semibold text-foreground">{t.id}</span>
                <span className="text-sm text-muted-foreground">{t.room}</span>
                <span className="flex-1 text-sm text-foreground">{t.issue}</span>
                <StatusChip label="En proceso" tone="reserved" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <GhostBtn>Registrar avance</GhostBtn>
                <PrimaryBtn onClick={() => setCloseConfirm(true)}>Cerrar ticket</PrimaryBtn>
              </div>
            </li>
          ))}
        </ul>
      </Panel>

      <Dialog
        isOpen={closeConfirm}
        onClose={() => setCloseConfirm(false)}
        onConfirm={() => setCloseConfirm(false)}
        type="confirm"
        title="Cerrar ticket"
        message="¿Estás seguro de que deseas cerrar este ticket? Se requerirá evidencia de cierre."
        confirmText="Cerrar"
      />
    </div>
  )
}

/* ============================= ALMACÉN ============================== */

const INVENTORY = [
  { name: "Cable HDMI 2m", stock: 3, min: 10, tone: "busy" as Tone },
  { name: "Marcadores (caja)", stock: 6, min: 8, tone: "maint" as Tone },
  { name: "Fusibles 10A", stock: 24, min: 15, tone: "free" as Tone },
  { name: "Tóner impresora", stock: 2, min: 6, tone: "busy" as Tone },
  { name: "Adaptador VGA", stock: 11, min: 8, tone: "free" as Tone },
]

function InventoryTable({ rows }: { rows: typeof INVENTORY }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
            <th className="pb-3 font-medium">Ítem</th>
            <th className="pb-3 font-medium">Stock</th>
            <th className="pb-3 font-medium">Mínimo</th>
            <th className="pb-3 font-medium">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((i) => (
            <tr key={i.name}>
              <td className="py-3 font-medium text-foreground">{i.name}</td>
              <td className="py-3 text-muted-foreground">{i.stock}</td>
              <td className="py-3 text-muted-foreground">{i.min}</td>
              <td className="py-3">
                <StatusChip
                  label={i.stock < i.min ? "Bajo mínimo" : "OK"}
                  tone={i.stock < i.min ? i.tone : "free"}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function WarehouseHome() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Panel title="Inventario · niveles de stock" action="Exportar" className="lg:col-span-2">
        <InventoryTable rows={INVENTORY.slice(0, 4)} />
      </Panel>
      <Panel title="Despachos pendientes" action="Ver todos">
        <ul className="space-y-3">
          {[
            { t: "Cable HDMI · #1042", s: "Con ticket · Autorizar" },
            { t: "Marcadores · Prof. Gil", s: "Requiere aprobación" },
          ].map((d) => (
            <li key={d.t} className="rounded-2xl border border-border p-4">
              <p className="text-sm font-medium text-foreground">{d.t}</p>
              <p className="mt-1 text-xs text-muted-foreground">{d.s}</p>
              <button
                type="button"
                className="mt-3 w-full rounded-full bg-primary py-2 text-xs font-medium text-primary-foreground hover:opacity-90"
              >
                Aprobar despacho
              </button>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  )
}

function WarehouseInventario() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Inventario de insumos"
        subtitle="Stock de repuestos y materiales en tiempo real."
      />
      <Panel title="Todos los ítems" action="Agregar ítem">
        <InventoryTable rows={INVENTORY} />
      </Panel>
    </div>
  )
}

function WarehouseDespachos() {
  const [approveConfirm, setApproveConfirm] = useState(false)

  return (
    <div className="space-y-4">
      <PageHeader
        title="Despachos"
        subtitle="Autoriza entregas solo con ticket o permiso administrativo."
      />
      <Panel title="Solicitudes de despacho">
        <ul className="space-y-3">
          {[
            { t: "Cable HDMI · Ticket #1042", s: "Con ticket asociado", tone: "free" as Tone },
            { t: "Marcadores · Prof. Gil", s: "Requiere aprobación", tone: "maint" as Tone },
            { t: "Tóner · Secretaría", s: "Sin ticket · revisar", tone: "busy" as Tone },
          ].map((d) => (
            <li key={d.t} className="rounded-2xl border border-border p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{d.t}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{d.s}</p>
                </div>
                <StatusChip label={d.tone === "free" ? "Listo" : d.tone === "maint" ? "Pendiente" : "Revisar"} tone={d.tone} />
              </div>
              <div className="mt-4 flex gap-2">
                <PrimaryBtn onClick={() => setApproveConfirm(true)}>Aprobar</PrimaryBtn>
                <GhostBtn>Rechazar</GhostBtn>
              </div>
            </li>
          ))}
        </ul>
      </Panel>

      <Dialog
        isOpen={approveConfirm}
        onClose={() => setApproveConfirm(false)}
        onConfirm={() => setApproveConfirm(false)}
        type="success"
        title="Despacho autorizado"
        message="El ítem está listo para ser entregado al solicitante."
        confirmText="Aceptar"
      />
    </div>
  )
}

function WarehouseAlertas() {
  const low = INVENTORY.filter((i) => i.stock < i.min)

  return (
    <div className="space-y-4">
      <PageHeader
        title="Alertas de reabastecimiento"
        subtitle="Ítems que bajaron del mínimo y requieren reorden."
      />
      <Panel title="Bajo mínimo">
        <ul className="space-y-3">
          {low.map((i) => (
            <li
              key={i.name}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border p-4"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{i.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Stock {i.stock} · mínimo {i.min}
                </p>
              </div>
              <PrimaryBtn>Generar orden</PrimaryBtn>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  )
}

/* ============================= ADMINISTRADOR ============================== */

const USAGE = [
  { label: "Sede Principal", pct: 68 },
  { label: "Sede Sur", pct: 42 },
  { label: "Biblioteca", pct: 81 },
]

const APPROVALS = [
  { who: "Rep. Cultural · Auditorio", what: "Evento 20 nov · 200 pers.", tone: "reserved" as Tone },
  { who: "Prof. Gil · Salón B-105", what: "Recuperación sábado", tone: "maint" as Tone },
  { who: "Semillero · Lab-3", what: "Uso extendido nocturno", tone: "reserved" as Tone },
]

function UsageBars() {
  return (
    <ul className="space-y-4">
      {USAGE.map((u) => (
        <li key={u.label}>
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">{u.label}</span>
            <span className="text-muted-foreground">{u.pct}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary" style={{ width: `${u.pct}%` }} />
          </div>
        </li>
      ))}
    </ul>
  )
}

function ApprovalList() {
  const [approveId, setApproveId] = useState<string | null>(null)

  return (
    <ul className="space-y-3">
      {APPROVALS.map((a, i) => (
        <li key={`${a.who}-${i}`} className="rounded-2xl border border-border p-4">
          <p className="text-sm font-medium text-foreground">{a.who}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{a.what}</p>
          <div className="mt-3 flex gap-2">
            <PrimaryBtn onClick={() => setApproveId(`${a.who}-${i}`)}>Aprobar</PrimaryBtn>
            <GhostBtn>Rechazar</GhostBtn>
          </div>

          <Dialog
            isOpen={approveId === `${a.who}-${i}`}
            onClose={() => setApproveId(null)}
            onConfirm={() => setApproveId(null)}
            type="success"
            title="Reserva aprobada"
            message={`La reserva de "${a.who}" ha sido aprobada exitosamente.`}
            confirmText="Aceptar"
          />
        </li>
      ))}
    </ul>
  )
}

function AdminHome() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Panel title="Ocupación por sede" action="Ver indicadores" className="lg:col-span-2">
        <UsageBars />
      </Panel>
      <Panel title="Reservas por aprobar" action="Ver todas">
        <ApprovalList />
      </Panel>
    </div>
  )
}

function AdminIndicadores() {
  const kpis = [
    { l: "MTTR global", v: "4.1 h", h: "-12% vs mes anterior" },
    { l: "Tickets / semana", v: "86", h: "72 resueltos" },
    { l: "Uso de salones", v: "68%", h: "Promedio campus" },
    { l: "Satisfacción", v: "4.6", h: "Encuestas de cierre" },
  ]

  return (
    <div className="space-y-4">
      <PageHeader
        title="Indicadores institucionales"
        subtitle="Tiempos de respuesta, uso de salones y recurrencia de fallas."
      />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.l} className="rounded-3xl border border-border bg-card p-5 transition-all hover:shadow-md">
            <p className="text-xs font-medium text-muted-foreground">{k.l}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">{k.v}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{k.h}</p>
          </div>
        ))}
      </div>
      <Panel title="Ocupación por sede">
        <UsageBars />
      </Panel>
    </div>
  )
}

function AdminUsuarios() {
  const [detailOpen, setDetailOpen] = useState(false)
  const users = [
    { n: "Laura Restrepo", r: "Estudiante", tone: "free" as Tone },
    { n: "Prof. Andrés Gil", r: "Docente", tone: "reserved" as Tone },
    { n: "Carlos Mena", r: "Técnico IT", tone: "maint" as Tone },
    { n: "Diana Ospina", r: "Almacén", tone: "reserved" as Tone },
  ]

  return (
    <div className="space-y-4">
      <PageHeader
        title="Gestión de usuarios"
        subtitle="Crea perfiles, asigna roles y define dependencias."
      />
      <Panel title="Usuarios del campus" action="Nuevo usuario">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="pb-3 font-medium">Nombre</th>
                <th className="pb-3 font-medium">Rol</th>
                <th className="pb-3 font-medium">Estado</th>
                <th className="pb-3 font-medium">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((u) => (
                <tr key={u.n}>
                  <td className="py-3 font-medium text-foreground">{u.n}</td>
                  <td className="py-3 text-muted-foreground">{u.r}</td>
                  <td className="py-3">
                    <StatusChip label="Activo" tone="free" />
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => setDetailOpen(true)}
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Modal isOpen={detailOpen} onClose={() => setDetailOpen(false)} title="Editar usuario" size="md">
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Nombre</label>
            <input defaultValue="Laura Restrepo" className="w-full rounded-2xl border border-input bg-card px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Rol</label>
            <select className="w-full rounded-2xl border border-input bg-card px-4 py-2.5 text-sm">
              <option>Estudiante</option>
              <option>Docente</option>
            </select>
          </div>
          <div className="flex gap-2">
            <GhostBtn onClick={() => setDetailOpen(false)}>Cancelar</GhostBtn>
            <PrimaryBtn onClick={() => setDetailOpen(false)}>Guardar cambios</PrimaryBtn>
          </div>
        </div>
      </Modal>
    </div>
  )
}

function AdminAprobaciones() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Aprobación de reservas"
        subtitle="Autoriza eventos, reasigna estados y delega funciones."
      />
      <Panel title="Pendientes de aprobación">
        <ApprovalList />
      </Panel>
    </div>
  )
}

function AdminEspacios() {
  const [roomDetailOpen, setRoomDetailOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<(typeof ROOMS)[0] | null>(null)

  return (
    <div className="space-y-4">
      <PageHeader
        title="Estado de espacios"
        subtitle="Controla salones libres, ocupados o en mantenimiento."
      />
      <Panel title="Todos los salones" action="Asignar estado">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {ROOMS.map((r) => (
            <button
              key={r.code}
              onClick={() => {
                setSelectedRoom(r)
                setRoomDetailOpen(true)
              }}
              className="rounded-2xl border border-border p-4 text-left transition-all hover:border-primary hover:shadow-md"
            >
              <span className="font-semibold text-foreground">{r.code}</span>
              <div className="mt-2">
                <StatusChip label={r.label} tone={r.tone} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{r.detail}</p>
            </button>
          ))}
        </div>
      </Panel>

      <Modal
        isOpen={roomDetailOpen}
        onClose={() => setRoomDetailOpen(false)}
        title={`Editar ${selectedRoom?.code}`}
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Estado</label>
            <select className="w-full rounded-2xl border border-input bg-card px-4 py-2.5 text-sm">
              <option>Libre</option>
              <option>Ocupado</option>
              <option>Reservado</option>
              <option>Mantenimiento</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Nota</label>
            <textarea rows={2} className="w-full rounded-2xl border border-input bg-card px-4 py-2.5 text-sm" />
          </div>
          <div className="flex gap-2">
            <GhostBtn onClick={() => setRoomDetailOpen(false)}>Cancelar</GhostBtn>
            <PrimaryBtn onClick={() => setRoomDetailOpen(false)}>Guardar cambios</PrimaryBtn>
          </div>
        </div>
      </Modal>
    </div>
  )
}

/* ============================ Router ============================ */

const VIEWS: Record<RoleId, Partial<Record<ViewKey, () => React.JSX.Element>>> = {
  estudiante: {
    inicio: StudentHome,
    mapa: StudentMapa,
    reservas: StudentReservas,
    biblioteca: StudentBiblioteca,
  },
  docente: {
    inicio: TeacherHome,
    reportar: TeacherReportar,
    insumos: TeacherInsumos,
    reservas: TeacherReservas,
  },
  tecnico: {
    inicio: TechnicianHome,
    tickets: TechnicianTickets,
    atencion: TechnicianAtencion,
  },
  almacen: {
    inicio: WarehouseHome,
    inventario: WarehouseInventario,
    despachos: WarehouseDespachos,
    alertas: WarehouseAlertas,
  },
  admin: {
    inicio: AdminHome,
    indicadores: AdminIndicadores,
    usuarios: AdminUsuarios,
    aprobaciones: AdminAprobaciones,
    espacios: AdminEspacios,
  },
}

export function RoleContent({ roleId, view }: { roleId: RoleId; view: ViewKey }) {
  const Component = VIEWS[roleId]?.[view] ?? VIEWS[roleId]?.inicio
  return Component ? <Component /> : null
}
