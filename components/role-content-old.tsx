"use client"

import type { RoleId, ViewKey } from "@/lib/campus-data"

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
    <section className={`rounded-xl border border-border bg-card p-4 sm:p-4 ${className}`}>
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
    reserved: "bg-muted/40 text-primary",
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
    <div className="mb-2">
      <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h1>
      <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
    </div>
  )
}

function PrimaryBtn({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
    >
      {children}
    </button>
  )
}

function GhostBtn({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
    >
      {children}
    </button>
  )
}

/* Access note reused across role pages */
function AccessNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-lg bg-secondary px-4 py-3 text-xs leading-relaxed text-secondary-foreground">
      {children}
    </p>
  )
}

/* ============================ ESTUDIANTE ============================ */

const ROOMS = [
  { code: "A-201", tone: "free" as Tone, label: "Libre", detail: "Cap. 40 · Piso 2" },
  { code: "A-203", tone: "busy" as Tone, label: "Ocupado", detail: "Cálculo II" },
  { code: "B-105", tone: "reserved" as Tone, label: "Reservado", detail: "15:00–17:00" },
  { code: "B-110", tone: "free" as Tone, label: "Libre", detail: "Cap. 30 · Piso 1" },
  { code: "Lab-3", tone: "maint" as Tone, label: "Mantenimiento", detail: "Videobeam" },
  { code: "Sala-E1", tone: "free" as Tone, label: "Libre", detail: "Estudio grupal" },
]

function StudentHome() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Panel title="Salones disponibles ahora" action="Ver mapa" className="lg:col-span-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {ROOMS.map((r) => (
            <div key={r.code} className="rounded-lg border border-border p-4">
              <span className="font-semibold text-foreground">{r.code}</span>
              <div className="mt-2">
                <StatusChip label={r.label} tone={r.tone} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{r.detail}</p>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Mi biblioteca" action="Reservar">
        <ul className="space-y-3">
          {[
            { t: "Cálculo de una variable", s: "Vence en 3 días", warn: true },
            { t: "Física universitaria", s: "Recoger hoy", warn: false },
          ].map((b) => (
            <li key={b.t} className="rounded-lg border border-border p-4">
              <p className="text-sm font-medium text-foreground">{b.t}</p>
              <p className={`mt-1 text-xs ${b.warn ? "text-chart-3" : "text-muted-foreground"}`}>
                {b.s}
              </p>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  )
}

function StudentMapa() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Mapa de salones"
        subtitle="Ocupación en tiempo real de la Sede Principal. Toca un salón para ver el detalle."
      />
      <Panel title="Bloque A · Bloque B">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4">
          {ROOMS.concat([
            { code: "A-108", tone: "free", label: "Libre", detail: "Cap. 35" },
            { code: "B-210", tone: "busy", label: "Ocupado", detail: "Química" },
          ]).map((r) => (
            <div
              key={r.code}
              className="flex flex-col gap-2 rounded-lg border border-border p-4 transition-colors hover:border-primary/40"
            >
              <span className="font-semibold text-foreground">{r.code}</span>
              <StatusChip label={r.label} tone={r.tone} />
              <p className="text-xs text-muted-foreground">{r.detail}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  )
}

function StudentReservas() {
  const slots = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"]
  return (
    <div className="space-y-4">
      <PageHeader
        title="Reservar espacio de estudio"
        subtitle="Aparta salas individuales o grupales por franja horaria."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Elige una franja · Sala-E1" className="lg:col-span-2">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {slots.map((s, i) => (
              <button
                key={s}
                type="button"
                disabled={i === 2}
                className="rounded-lg border border-border py-3 text-sm font-medium text-foreground transition-colors enabled:hover:border-primary enabled:hover:text-primary disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
              >
                {s}
              </button>
            ))}
          </div>
          <div className="mt-5">
            <PrimaryBtn>Confirmar reserva</PrimaryBtn>
          </div>
        </Panel>
        <Panel title="Mis reservas activas">
          <ul className="space-y-3">
            {[
              { t: "Sala-E1 · Hoy 14:00", s: "Estudio grupal" },
              { t: "Libro reservado", s: "Recoger en biblioteca" },
            ].map((r) => (
              <li key={r.t} className="rounded-lg border border-border p-4">
                <p className="text-sm font-medium text-foreground">{r.t}</p>
                <p className="mt-1 text-xs text-muted-foreground">{r.s}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  )
}

function StudentBiblioteca() {
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
        <div className="grid gap-3 sm:grid-cols-1 sm:grid-cols-2">
          {books.map((b) => (
            <div
              key={b.t}
              className="flex items-center justify-between gap-3 rounded-lg border border-border p-4"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{b.t}</p>
                <p className="truncate text-xs text-muted-foreground">{b.a}</p>
              </div>
              <StatusChip label={b.s} tone={b.tone} />
            </div>
          ))}
        </div>
      </Panel>
    </div>
  )
}

/* ============================ DOCENTE ============================ */

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
            { t: "Marcadores x3", s: "Aprobado · Recoger" },
            { t: "Cable HDMI", s: "Pendiente de despacho" },
          ].map((i) => (
            <li key={i.t} className="rounded-lg border border-border p-4">
              <p className="text-sm font-medium text-foreground">{i.t}</p>
              <p className="mt-1 text-xs text-muted-foreground">{i.s}</p>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  )
}

function TeacherReportar() {
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
                className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Tipo de falla
              </label>
              <div className="flex flex-wrap gap-2">
                {["Videobeam", "Red / IT", "Eléctrico", "Mobiliario"].map((t, i) => (
                  <span
                    key={t}
                    className={`rounded-full px-3 py-1.5 text-sm ${
                      i === 0
                        ? "bg-primary text-primary-foreground"
                        : "border border-border text-muted-foreground"
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Descripción</label>
              <textarea
                rows={3}
                defaultValue="El videobeam no proyecta señal desde el HDMI 1."
                className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
              />
            </div>
            <PrimaryBtn>Enviar reporte</PrimaryBtn>
          </div>
        </Panel>
        <Panel title="Reportes recientes">
          <ReportsTable />
        </Panel>
      </div>
    </div>
  )
}

function TeacherInsumos() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Solicitar insumos"
        subtitle="Pide materiales directamente al almacén; requieren aprobación."
      />
      <div className="grid gap-4 lg:grid-cols-1 sm:grid-cols-2">
        <Panel title="Solicitud rápida">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {["Marcadores", "Cable HDMI", "Borrador", "Adaptador VGA"].map((i) => (
              <button
                key={i}
                type="button"
                className="rounded-lg border border-border p-4 text-left text-sm font-medium text-foreground transition-colors hover:border-primary/40"
              >
                {i}
              </button>
            ))}
          </div>
          <div className="mt-5">
            <PrimaryBtn>Enviar solicitud</PrimaryBtn>
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
                className="flex items-center justify-between gap-3 rounded-lg border border-border p-4"
              >
                <span className="text-sm font-medium text-foreground">{i.t}</span>
                <StatusChip label={i.s} tone={i.tone} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  )
}

function TeacherReservas() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Reservar salón"
        subtitle="Aparta espacios para tutorías o clases de recuperación."
      />
      <Panel title="Salones disponibles" action="Filtrar">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {ROOMS.filter((r) => r.tone === "free").concat([
            { code: "B-110", tone: "free", label: "Libre", detail: "Cap. 30" },
          ]).map((r) => (
            <div key={r.code + r.detail} className="rounded-lg border border-border p-4">
              <span className="font-semibold text-foreground">{r.code}</span>
              <p className="mt-1 text-xs text-muted-foreground">{r.detail}</p>
              <button
                type="button"
                className="mt-3 w-full rounded-full bg-primary py-2 text-xs font-medium text-primary-foreground hover:opacity-90"
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

/* ============================ TÉCNICO ============================ */

const TICKETS = [
  { id: "#1042", room: "A-203", issue: "Videobeam sin señal", prio: "Alta", tone: "busy" as Tone },
  { id: "#1050", room: "Lab-3", issue: "Switch de red caído", prio: "Alta", tone: "busy" as Tone },
  { id: "#1047", room: "B-210", issue: "TV no enciende", prio: "Media", tone: "maint" as Tone },
  { id: "#1033", room: "A-108", issue: "PC sin arranque", prio: "Baja", tone: "reserved" as Tone },
]

function TicketList({ items }: { items: typeof TICKETS }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li
          key={t.id}
          className="flex flex-wrap items-center gap-3 rounded-lg border border-border p-4"
        >
          <span className="font-semibold text-foreground">{t.id}</span>
          <span className="text-sm text-muted-foreground">{t.room}</span>
          <span className="flex-1 text-sm text-foreground">{t.issue}</span>
          <StatusChip label={`Prioridad ${t.prio}`} tone={t.tone} />
          <PrimaryBtn>Atender</PrimaryBtn>
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
      <TicketList items={TICKETS} />
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
        <TicketList items={TICKETS} />
      </Panel>
    </div>
  )
}

function TechnicianAtencion() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="En atención"
        subtitle="Tickets que estás resolviendo. Registra avance y adjunta evidencia de cierre."
      />
      <Panel title="Trabajos activos">
        <ul className="space-y-3">
          {TICKETS.filter((t) => t.tone === "busy").map((t) => (
            <li key={t.id} className="rounded-lg border border-border p-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-semibold text-foreground">{t.id}</span>
                <span className="text-sm text-muted-foreground">{t.room}</span>
                <span className="flex-1 text-sm text-foreground">{t.issue}</span>
                <StatusChip label="En proceso" tone="reserved" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <GhostBtn>Registrar avance</GhostBtn>
                <PrimaryBtn>Cerrar ticket</PrimaryBtn>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  )
}

/* ============================ ALMACÉN ============================ */

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
            <li key={d.t} className="rounded-lg border border-border p-4">
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
            <li key={d.t} className="rounded-lg border border-border p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{d.t}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{d.s}</p>
                </div>
                <StatusChip label={d.tone === "free" ? "Listo" : d.tone === "maint" ? "Pendiente" : "Revisar"} tone={d.tone} />
              </div>
              <div className="mt-4 flex gap-2">
                <PrimaryBtn>Aprobar</PrimaryBtn>
                <GhostBtn>Rechazar</GhostBtn>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
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
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border p-4"
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

/* ============================ ADMINISTRADOR ============================ */

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
  return (
    <ul className="space-y-3">
      {APPROVALS.map((a) => (
        <li key={a.who} className="rounded-lg border border-border p-4">
          <p className="text-sm font-medium text-foreground">{a.who}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{a.what}</p>
          <div className="mt-3 flex gap-2">
            <PrimaryBtn>Aprobar</PrimaryBtn>
            <GhostBtn>Rechazar</GhostBtn>
          </div>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.l} className="rounded-xl border border-border bg-card p-4">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
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
  return (
    <div className="space-y-4">
      <PageHeader
        title="Estado de espacios"
        subtitle="Controla salones libres, ocupados o en mantenimiento."
      />
      <Panel title="Todos los salones">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4">
          {ROOMS.map((r) => (
            <div key={r.code} className="rounded-lg border border-border p-4">
              <span className="font-semibold text-foreground">{r.code}</span>
              <div className="mt-2">
                <StatusChip label={r.label} tone={r.tone} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{r.detail}</p>
            </div>
          ))}
        </div>
      </Panel>
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
