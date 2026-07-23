"use client"

import { useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Dialog } from "@/components/ui/dialog"
import { Dropdown } from "@/components/ui/dropdown"
import { Tabs } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Toast } from "@/components/ui/toast"
import { EmptyState } from "@/components/ui/empty-state"
import { SearchBox } from "@/components/ui/search-box"
import { Card } from "@/components/ui/card"
import { Input, Textarea, Select } from "@/components/ui/form"
import { Alert } from "@/components/ui/alert"
import { Stat } from "@/components/ui/stat"
import { Timeline } from "@/components/ui/timeline"
import { Rating } from "@/components/ui/rating"
import { Steps } from "@/components/ui/steps"
import { EventCard } from "@/components/ui/event-card"
import { Avatar } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Checkbox, Radio } from "@/components/ui/checkbox-radio"
import { Collapsible } from "@/components/ui/collapsible"
import { Divider } from "@/components/ui/divider"
import { Skeleton, SkeletonText } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { Comment } from "@/components/ui/comment"
import { Gallery } from "@/components/ui/gallery"
import { Clock, AlertCircle, CheckCircle } from "lucide-react"

export default function ComponentsShowcase() {
  const [modalOpen, setModalOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)

  const timelineItems = [
    {
      title: "Reporte creado",
      description: "Ticket #1042 enviado al sistema",
      time: "Hace 2 horas",
      icon: <CheckCircle className="size-4" />,
      status: "completed" as const,
    },
    {
      title: "Asignado a técnico",
      description: "Carlos Mena - Especialidad IT",
      time: "Hace 1 hora 30 min",
      icon: <Clock className="size-4" />,
      status: "completed" as const,
    },
    {
      title: "En atención",
      description: "Técnico trabajando en la falla",
      time: "Hace 30 min",
      icon: <AlertCircle className="size-4" />,
      status: "pending" as const,
    },
  ]

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground">Componentes SmartCampus</h1>
          <p className="mt-2 text-muted-foreground">
            Todos los componentes visuales disponibles para la plataforma
          </p>
        </div>

        {/* Modales */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Modales & Diálogos</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <button
              onClick={() => setModalOpen(true)}
              className="rounded-2xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Abrir Modal
            </button>
            <button
              onClick={() => setDialogOpen(true)}
              className="rounded-2xl border border-border bg-card px-4 py-3 text-sm font-medium hover:bg-muted"
            >
              Abrir Diálogo
            </button>
          </div>
        </section>

        {/* Componentes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Tarjetas & Contenedores</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card title="Tarjeta básica" subtitle="Con contenido personalizado">
              <p className="text-sm text-foreground">Este es un componente Card reutilizable.</p>
            </Card>
            <Card title="Tarjeta destacada" highlighted>
              <p className="text-sm text-foreground">Versión resaltada del componente.</p>
            </Card>
          </div>
        </section>

        {/* Badges */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Badges</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Principal</Badge>
            <Badge variant="secondary">Secundario</Badge>
            <Badge variant="accent">Acento</Badge>
            <Badge variant="destructive">Destructivo</Badge>
          </div>
        </section>

        {/* Alerts */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Alertas</h2>
          <div className="space-y-3">
            <Alert type="info" title="Información" message="Este es un mensaje informativo." />
            <Alert type="success" title="Éxito" message="La operación se completó exitosamente." />
            <Alert type="warning" title="Advertencia" message="Debes tener cuidado con esto." />
            <Alert type="error" title="Error" message="Algo salió mal." />
          </div>
        </section>

        {/* Inputs & Forms */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Formularios</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Campo de texto" placeholder="Escribe aquí" />
            <Select
              label="Selector"
              options={[
                { value: "1", label: "Opción 1" },
                { value: "2", label: "Opción 2" },
              ]}
            />
            <Checkbox label="Aceptar términos" />
            <Radio label="Opción A" name="test" />
          </div>
          <Textarea label="Área de texto" placeholder="Escribe comentarios" rows={3} />
        </section>

        {/* Stats */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Estadísticas</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat
              label="Tickets abiertos"
              value="23"
              change={{ value: 12, isPositive: false }}
            />
            <Stat
              label="Ocupación"
              value="68%"
              change={{ value: 5, isPositive: true }}
            />
            <Stat label="Usuarios activos" value="3.2K" />
            <Stat label="Satisfacción" value="4.6" />
          </div>
        </section>

        {/* Timeline */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Timeline</h2>
          <Card>
            <Timeline items={timelineItems} />
          </Card>
        </section>

        {/* Rating */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Rating</h2>
          <div className="flex gap-8">
            <div>
              <p className="mb-2 text-sm text-foreground">Pequeño</p>
              <Rating size="sm" onChange={() => {}} />
            </div>
            <div>
              <p className="mb-2 text-sm text-foreground">Mediano</p>
              <Rating size="md" value={4} onChange={() => {}} />
            </div>
            <div>
              <p className="mb-2 text-sm text-foreground">Grande</p>
              <Rating size="lg" value={3} onChange={() => {}} />
            </div>
          </div>
        </section>

        {/* Progress */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Barras de progreso</h2>
          <div className="space-y-4">
            <Progress value={30} label="Descarga" showPercentage />
            <Progress value={60} label="Instalación" showPercentage variant="success" />
            <Progress value={75} label="Procesamiento" showPercentage variant="warning" />
            <Progress value={100} label="Completo" showPercentage variant="error" />
          </div>
        </section>

        {/* Steps */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Pasos</h2>
          <Card>
            <Steps
              items={[
                { label: "Crear reporte", description: "Describe el problema" },
                { label: "Asignación", description: "Se asigna a un técnico" },
                { label: "Resolución", description: "El técnico trabaja en ello" },
                { label: "Cierre", description: "Se completa el ticket" },
              ]}
              currentStep={2}
            />
          </Card>
        </section>

        {/* Avatars */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Avatares</h2>
          <div className="flex gap-4">
            <div className="flex flex-col items-center gap-2">
              <Avatar initials="LR" size="sm" />
              <p className="text-xs text-muted-foreground">Pequeño</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar initials="AG" size="md" status="online" />
              <p className="text-xs text-muted-foreground">Mediano (Online)</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar initials="CM" size="lg" status="offline" />
              <p className="text-xs text-muted-foreground">Grande (Offline)</p>
            </div>
          </div>
        </section>

        {/* Comments */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Comentarios</h2>
          <div className="space-y-4">
            <Comment
              author="Laura Restrepo"
              initials="LR"
              timestamp="Hace 2 horas"
              message="Excelente, el videobeam está funcionando nuevamente. ¡Gracias por la rápida reparación!"
              actions={[{ label: "Responder", onClick: () => {} }]}
            />
            <Comment
              author="Carlos Mena"
              initials="CM"
              timestamp="Hace 3 horas"
              message="Confirmado. He reemplazado el cable HDMI y verificado las conexiones. Todo en orden."
              actions={[{ label: "Responder", onClick: () => {} }]}
            />
          </div>
        </section>

        {/* Loading */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Estados de carga</h2>
          <div className="flex gap-4">
            <div className="rounded-2xl border border-border p-4">
              <Spinner size="sm" />
              <p className="mt-2 text-xs text-muted-foreground">Pequeño</p>
            </div>
            <div className="rounded-2xl border border-border p-4">
              <Spinner size="md" />
              <p className="mt-2 text-xs text-muted-foreground">Mediano</p>
            </div>
            <div className="rounded-2xl border border-border p-4">
              <Spinner size="lg" />
              <p className="mt-2 text-xs text-muted-foreground">Grande</p>
            </div>
          </div>
        </section>

        {/* Skeleton */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Esqueletos (Loading)</h2>
          <div className="space-y-3">
            <Card title="Contenido cargando">
              <SkeletonText lines={3} />
            </Card>
          </div>
        </section>

        {/* Search */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Búsqueda</h2>
          <SearchBox placeholder="Buscar salones, reportes, libros..." />
        </section>

        {/* Toast Button */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Notificaciones</h2>
          <button
            onClick={() => setToastVisible(true)}
            className="rounded-2xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Mostrar Toast
          </button>
          {toastVisible && (
            <Toast
              type="success"
              message="Esta es una notificación de éxito"
              onClose={() => setToastVisible(false)}
              autoClose={3000}
            />
          )}
        </section>

        {/* Divider */}
        <Divider text="Fin de componentes" />
      </div>

      {/* Modals */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Modal de ejemplo">
        <div className="space-y-4">
          <p className="text-sm text-foreground">
            Este es un modal completamente funcional con contenido personalizable.
          </p>
          <p className="text-sm text-muted-foreground">
            Puedes cerrar con el botón X o hacer clic fuera (si lo configuras así).
          </p>
        </div>
      </Modal>

      <Dialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={() => setDialogOpen(false)}
        type="confirm"
        title="Confirmación"
        message="¿Estás seguro de que deseas continuar?"
        confirmText="Continuar"
        cancelText="Cancelar"
      />
    </div>
  )
}
