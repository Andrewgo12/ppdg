"use client"

import { useState, useEffect } from "react"
import {
  SUB_ROLES,
  type RoleId,
  type SubRoleId,
  type ViewKey,
  type Salon,
  type Ticket,
  type Libro,
  type Prestamo,
  type Insumo,
  type Despacho,
} from "@/lib/campus-data"
import { StorageManager } from "@/lib/storage-sync"

// Sub-role Individual Components
import { EstudianteRegularPanel } from "@/components/subroles/EstudianteRegularPanel"
import { EstudianteRepresentantePanel } from "@/components/subroles/EstudianteRepresentantePanel"
import { EstudianteMonitorPanel } from "@/components/subroles/EstudianteMonitorPanel"
import { EstudianteGradoPanel } from "@/components/subroles/EstudianteGradoPanel"
import { DocenteRegularPanel } from "@/components/subroles/DocenteRegularPanel"
import { DirectorProgramaPanel } from "@/components/subroles/DirectorProgramaPanel"
import { FuncionarioEventosPanel } from "@/components/subroles/FuncionarioEventosPanel"
import { TecnicoPlantaPanel } from "@/components/subroles/TecnicoPlantaPanel"
import { TecnicoElectricoPanel } from "@/components/subroles/TecnicoElectricoPanel"
import { TecnicoITPanel } from "@/components/subroles/TecnicoITPanel"
import { TecnicoServiciosPanel } from "@/components/subroles/TecnicoServiciosPanel"
import { AlmacenistaPanel } from "@/components/subroles/AlmacenistaPanel"
import { SuperAdminPanel } from "@/components/subroles/SuperAdminPanel"

// Dedicated Modular Views
import { MapaSalonesView } from "@/components/views/MapaSalonesView"
import { TicketsMantenimientoView } from "@/components/views/TicketsMantenimientoView"
import { InsumosExpressView } from "@/components/views/InsumosExpressView"
import { UniBiblioView } from "@/components/views/UniBiblioView"
import { TramiteGradoView } from "@/components/views/TramiteGradoView"
import { AlmacenInventarioView } from "@/components/views/AlmacenInventarioView"
import { UsuariosRbacView } from "@/components/views/UsuariosRbacView"

// Modular Modals Component
import { CampusModals } from "@/components/modals/CampusModals"

interface RoleContentProps {
  currentRole: RoleId
  currentSubRole: SubRoleId
  activeView: ViewKey
  onSelectSubRole: (subRoleId: SubRoleId) => void
}

export function RoleContent({
  currentSubRole,
  activeView,
  onSelectSubRole,
}: RoleContentProps) {
  // Persistent State via StorageManager
  const [salones, setSalones] = useState<Salon[]>(() => StorageManager.getSalones())
  const [tickets, setTickets] = useState<Ticket[]>(() => StorageManager.getTickets())
  const [libros, setLibros] = useState<Libro[]>(() => StorageManager.getLibros())
  const [prestamos, setPrestamos] = useState<Prestamo[]>([])
  const [insumos] = useState<Insumo[]>([])
  const [despachos, setDespachos] = useState<Despacho[]>([])

  // Save changes to StorageManager
  useEffect(() => {
    StorageManager.saveSalones(salones)
  }, [salones])

  useEffect(() => {
    StorageManager.saveTickets(tickets)
  }, [tickets])

  useEffect(() => {
    StorageManager.saveLibros(libros)
  }, [libros])

  // Modals & Selection State
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [selectedBook, setSelectedBook] = useState<Libro | null>(null)

  // Report Form State
  const [reportCategory, setReportCategory] = useState<"infraestructura" | "electrico" | "it" | "aseo">("it")
  const [reportDesc, setReportDesc] = useState("")
  const [reportSalonId, setReportSalonId] = useState("a101")
  const [reportPriority, setReportPriority] = useState<"alta" | "media" | "baja" | "express">("alta")
  const [evidenceUploaded, setEvidenceUploaded] = useState(false)

  // Ticket Close State
  const [cierreComentario, setCierreComentario] = useState("")
  const [cierreEvidenceDone, setCierreEvidenceDone] = useState(false)

  // Event Reservation State
  const [eventSpace, setEventSpace] = useState("Plazoleta Central")
  const [eventDate, setEventDate] = useState("2026-08-10")
  const [eventTime, setEventTime] = useState("14:00 - 18:00")
  const [eventAforo, setEventAforo] = useState(150)
  const [eventLogistics, setEventLogistics] = useState("20 Sillas, Sonido, 2 Carpas")

  // Subrole Action States
  const [tesisCargada, setTesisCargada] = useState(false)
  const [pazSalvoGenerado, setPazSalvoGenerado] = useState(false)
  const [cubiculoDuration, setCubiculoDuration] = useState("2 Horas")
  const [scannerEstudianteCode, setScannerEstudianteCode] = useState("")
  const [origSalon, setOrigSalon] = useState("Aula A-101")
  const [destSalon, setDestSalon] = useState("Aula B-201")

  const subRoleInfo = SUB_ROLES[currentSubRole] || SUB_ROLES.estudiante_regular

  // --- HANDLERS ---
  const handleOpenCloseTicketModal = (tk: Ticket) => {
    setSelectedTicket(tk)
    setCierreComentario("")
    setCierreEvidenceDone(false)
    setActiveModal("cerrar_ticket")
  }

  const handleCloseTicket = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, estado: "resuelto" } : t))
    )
    if (selectedTicket) {
      setSalones((prev) =>
        prev.map((s) => (s.id === selectedTicket.salonId ? { ...s, estado: "disponible" } : s))
      )
    }
    StorageManager.logAuditAction(
      subRoleInfo.fullName,
      currentSubRole,
      "TICKET_RESOLVE",
      `Ticket ${ticketId} resuelto. Nota: ${cierreComentario || "Evidencia verificada"}`
    )
    setActiveModal(null)
  }

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault()
    if (!evidenceUploaded) {
      alert("⚠️ Debe capturar o subir la foto de evidencia obligatoria.")
      return
    }

    const matchedSalon = salones.find((s) => s.id === reportSalonId)
    const newTk: Ticket = {
      id: `TK-2026-${Math.floor(100 + Math.random() * 900)}`,
      salonId: reportSalonId,
      salonNombre: matchedSalon ? matchedSalon.nombre : "Aula Seleccionada",
      categoria: reportCategory,
      prioridad: reportPriority,
      descripcion: reportDesc,
      reportadoPor: subRoleInfo.fullName,
      fecha: new Date().toISOString().slice(0, 10),
      estado: "pendiente",
      evidenciaFoto: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80",
    }

    setTickets([newTk, ...tickets])
    setSalones((prev) =>
      prev.map((s) => (s.id === reportSalonId ? { ...s, estado: "mantenimiento" } : s))
    )
    StorageManager.logAuditAction(
      subRoleInfo.fullName,
      currentSubRole,
      "TICKET_CREATE",
      `Reportado ticket ${newTk.id} en ${newTk.salonNombre} (${reportCategory.toUpperCase()})`
    )
    setReportDesc("")
    setEvidenceUploaded(false)
    setActiveModal(null)
  }

  const handleCreateReserva = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`✅ Solicitud enviada para ${eventSpace} el ${eventDate} (${eventAforo} personas). Logística: ${eventLogistics}`)
    setActiveModal(null)
  }

  const handleReserveBook = (libro: Libro) => {
    if (libro.unidadesDisponibles <= 0) {
      alert("⚠️ No hay unidades disponibles de este libro.")
      return
    }
    const newPrestamo: Prestamo = {
      id: `PR-2026-${Math.floor(10 + Math.random() * 90)}`,
      libroId: libro.id,
      libroTitulo: libro.titulo,
      estudianteNombre: subRoleInfo.fullName,
      fechaPrestamo: new Date().toISOString().slice(0, 10),
      fechaVencimiento: "2026-08-05",
      qrCode: `QR-LIBRO-${libro.id.toUpperCase()}-2026`,
      estado: "activo",
      firmadoDigitalmente: true,
    }

    setPrestamos([newPrestamo, ...prestamos])
    setLibros((prev) =>
      prev.map((l) => (l.id === libro.id ? { ...l, unidadesDisponibles: l.unidadesDisponibles - 1 } : l))
    )
    alert(`🎉 Libro "${libro.titulo}" reservado. Presenta el código QR en caja: ${newPrestamo.qrCode}`)
  }

  const handleRequestExpressSupply = (item: string, salon: string) => {
    alert(`⚡ Solicitud Express de "${item}" para ${salon} enviada con éxito. El técnico IT va en camino.`)
  }

  const handleEmergencyLockdown = (salonId: string) => {
    setSalones((prev) =>
      prev.map((s) => (s.id === salonId ? { ...s, estado: "mantenimiento" } : s))
    )
    alert(`⚡ Aislamiento por riesgo eléctrico RETIE activado en ${salonId}. Aula fuera de servicio.`)
  }

  const handleApproveDispatch = () => {
    const newDespacho: Despacho = {
      id: `DESP-${Math.floor(100 + Math.random() * 900)}`,
      insumoId: "INS-001",
      insumoNombre: "Cable HDMI V2.0 3mts",
      cantidad: 2,
      ticketId: "TK-2026-001",
      tecnicoNombre: "Téc. Roberto Méndez",
      fecha: new Date().toISOString().slice(0, 10),
      estado: "entregado",
    }
    setDespachos([newDespacho, ...despachos])
    alert("📦 Despacho autorizado y registrado para el Ticket TK-2026-001.")
  }

  return (
    <div className="space-y-6">
      {/* RENDER DEDICATED INDIVIDUAL SUB-PROFILE PANEL */}
      {currentSubRole === "estudiante_regular" && (
        <EstudianteRegularPanel
          subRoleInfo={subRoleInfo}
          onOpenCubiculoModal={() => setActiveModal("cubiculo")}
          onReserveBook={(libro) => {
            setSelectedBook(libro)
            setActiveModal("reserva_libro")
          }}
          libros={libros}
        />
      )}

      {currentSubRole === "estudiante_representante" && (
        <EstudianteRepresentantePanel
          subRoleInfo={subRoleInfo}
          onOpenReservaEventoModal={() => setActiveModal("reserva_evento")}
        />
      )}

      {currentSubRole === "estudiante_monitor" && (
        <EstudianteMonitorPanel
          subRoleInfo={subRoleInfo}
          onOpenScanQrModal={() => setActiveModal("escanear_qr")}
          onOpenAsistenciaLabModal={() => setActiveModal("asistencia_lab")}
        />
      )}

      {currentSubRole === "estudiante_grado" && (
        <EstudianteGradoPanel
          subRoleInfo={subRoleInfo}
          tesisCargada={tesisCargada}
          pazSalvoGenerado={pazSalvoGenerado}
          onUploadTesis={() => setActiveModal("upload_tesis")}
          onGeneratePazSalvo={() => setActiveModal("upload_tesis")}
        />
      )}

      {currentSubRole === "docente_regular" && (
        <DocenteRegularPanel
          subRoleInfo={subRoleInfo}
          onOpenReportModal={() => setActiveModal("nuevo_reporte")}
          onRequestExpressSupply={() => setActiveModal("insumo_express")}
        />
      )}

      {currentSubRole === "director_programa" && (
        <DirectorProgramaPanel
          subRoleInfo={subRoleInfo}
          onOpenReasignacionModal={() => setActiveModal("reasignacion")}
        />
      )}

      {currentSubRole === "funcionario_eventos" && (
        <FuncionarioEventosPanel
          subRoleInfo={subRoleInfo}
          onLockSpace={() => setActiveModal("bloquear_espacio")}
        />
      )}

      {currentSubRole === "tecnico_planta" && (
        <TecnicoPlantaPanel
          subRoleInfo={subRoleInfo}
          onOpenCloseTicketModal={() => {
            if (tickets.length > 0) handleOpenCloseTicketModal(tickets[0])
            else alert("No hay tickets pendientes.")
          }}
        />
      )}

      {currentSubRole === "tecnico_electrico" && (
        <TecnicoElectricoPanel
          subRoleInfo={subRoleInfo}
          onEmergencyLockdown={() => setActiveModal("emergencia_electrica")}
        />
      )}

      {currentSubRole === "tecnico_it" && (
        <TecnicoITPanel
          subRoleInfo={subRoleInfo}
          onRespondExpress={() => setActiveModal("soporte_express")}
        />
      )}

      {currentSubRole === "tecnico_servicios" && (
        <TecnicoServiciosPanel
          subRoleInfo={subRoleInfo}
          onCertifyClean={() => setActiveModal("certificar_aseo")}
        />
      )}

      {currentSubRole === "almacenista" && (
        <AlmacenistaPanel
          subRoleInfo={subRoleInfo}
          onApproveDispatch={() => setActiveModal("aprobar_despacho")}
        />
      )}

      {currentSubRole === "super_admin" && (
        <SuperAdminPanel
          subRoleInfo={subRoleInfo}
          onAuditLogs={() => setActiveModal("auditoria_logs")}
        />
      )}

      {/* RENDER VIEW ACCORDING TO NAVIGATION */}
      {(activeView === "inicio" || activeView === "mapa") && (
        <MapaSalonesView
          salones={salones}
          onSelectSalon={(s) => {
            setSelectedSalon(s)
            setActiveModal("salon_detail")
          }}
        />
      )}

      {(activeView === "reportar" || activeView === "tickets") && (
        <TicketsMantenimientoView
          tickets={tickets}
          subRoleInfo={subRoleInfo}
          onOpenNewTicketModal={() => setActiveModal("nuevo_reporte")}
          onOpenCloseTicketModal={handleOpenCloseTicketModal}
          onEmergencyLockdown={handleEmergencyLockdown}
        />
      )}

      {activeView === "insumos" && (
        <InsumosExpressView onRequestExpressSupply={handleRequestExpressSupply} />
      )}

      {activeView === "biblioteca" && (
        <UniBiblioView
          libros={libros}
          prestamos={prestamos}
          onReserveBook={handleReserveBook}
        />
      )}

      {activeView === "grado" && (
        <TramiteGradoView
          subRoleInfo={subRoleInfo}
          tesisCargada={tesisCargada}
          pazSalvoGenerado={pazSalvoGenerado}
          onUploadTesis={() => setTesisCargada(true)}
          onGeneratePazSalvo={() => setPazSalvoGenerado(true)}
        />
      )}

      {(activeView === "inventario" || activeView === "despachos") && (
        <AlmacenInventarioView insumos={insumos} despachos={despachos} />
      )}

      {(activeView === "usuarios" || activeView === "auditoria") && (
        <UsuariosRbacView
          currentSubRoleId={currentSubRole}
          onSelectSubRole={onSelectSubRole}
        />
      )}

      {/* CAMPUS MODALS MANAGER */}
      <CampusModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        selectedSalon={selectedSalon}
        selectedTicket={selectedTicket}
        onCloseTicket={handleCloseTicket}
        cierreComentario={cierreComentario}
        setCierreComentario={setCierreComentario}
        cierreEvidenceDone={cierreEvidenceDone}
        setCierreEvidenceDone={setCierreEvidenceDone}
        handleCreateTicket={handleCreateTicket}
        reportCategory={reportCategory}
        setReportCategory={setReportCategory}
        reportDesc={reportDesc}
        setReportDesc={setReportDesc}
        reportSalonId={reportSalonId}
        setReportSalonId={setReportSalonId}
        reportPriority={reportPriority}
        setReportPriority={setReportPriority}
        evidenceUploaded={evidenceUploaded}
        setEvidenceUploaded={setEvidenceUploaded}
        salones={salones}
        handleCreateReserva={handleCreateReserva}
        eventSpace={eventSpace}
        setEventSpace={setEventSpace}
        eventDate={eventDate}
        setEventDate={setEventDate}
        eventTime={eventTime}
        setEventTime={setEventTime}
        eventAforo={eventAforo}
        setEventAforo={setEventAforo}
        eventLogistics={eventLogistics}
        setEventLogistics={setEventLogistics}
        cubiculoDuration={cubiculoDuration}
        setCubiculoDuration={setCubiculoDuration}
        onConfirmCubiculo={() => {
          alert(`✅ Cubículo de estudio reservado exitosamente por ${cubiculoDuration}.`)
          setActiveModal(null)
        }}
        onConfirmScanQr={() => {
          alert("✅ Código QR escaneado y validado. Préstamo registrado.")
          setActiveModal(null)
        }}
        scannerEstudianteCode={scannerEstudianteCode}
        setScannerEstudianteCode={setScannerEstudianteCode}
        onConfirmAsistenciaLab={() => {
          alert(`✅ Asistencia de estudiante ${scannerEstudianteCode || "2024100982"} registrada en laboratorio.`)
          setActiveModal(null)
        }}
        origSalon={origSalon}
        setOrigSalon={setOrigSalon}
        destSalon={destSalon}
        setDestSalon={setDestSalon}
        handleReasignacion={() => {
          alert(`🔄 Clases reasignadas de ${origSalon} a ${destSalon}. Notificación enviada a estudiantes y docentes.`)
          setActiveModal(null)
        }}
        selectedBook={selectedBook}
        onConfirmReserveBook={handleReserveBook}
        onRequestExpressSupply={handleRequestExpressSupply}
        onEmergencyLockdown={() => handleEmergencyLockdown("a101")}
        onRespondExpress={() => alert("🚚 Alerta Express confirmada: 'Técnico en camino al Aula A-203'.")}
        onCertifyClean={() => alert("✨ Certificación de sanitización registrada en sistema para Aula A-101.")}
        onLockSpace={() => alert("🛡️ Auditorio Sede Principal bloqueado para ceremonia de grados.")}
        onApproveDispatch={handleApproveDispatch}
        onAuditLogs={() => alert("🛡️ Registro de auditoría exportado con 100% de transacciones firmas criptográficas.")}
        tesisCargada={tesisCargada}
        pazSalvoGenerado={pazSalvoGenerado}
        onUploadTesis={() => {
          setTesisCargada(true)
          alert("✅ Documento de Tesis cargado exitosamente.")
        }}
        onGeneratePazSalvo={() => {
          setPazSalvoGenerado(true)
          alert("📜 Paz y Salvo Criptográfico generado con éxito.")
        }}
      />
    </div>
  )
}
