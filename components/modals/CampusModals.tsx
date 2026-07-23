"use client"

import type { Salon, Ticket, Libro } from "@/lib/campus-data"

// Estudiante Modals
import { CubiculoModal } from "@/components/modals/estudiante/CubiculoModal"
import { ReservaEventoModal } from "@/components/modals/estudiante/ReservaEventoModal"
import { ScanQrModal } from "@/components/modals/estudiante/ScanQrModal"
import { AsistenciaLabModal } from "@/components/modals/estudiante/AsistenciaLabModal"
import { UploadTesisModal } from "@/components/modals/estudiante/UploadTesisModal"
import { ReservaLibroModal } from "@/components/modals/estudiante/ReservaLibroModal"

// Docente Modals
import { NuevoReporteModal } from "@/components/modals/docente/NuevoReporteModal"
import { InsumoExpressModal } from "@/components/modals/docente/InsumoExpressModal"
import { ReasignacionClasesModal } from "@/components/modals/docente/ReasignacionClasesModal"

// Tecnico Modals
import { CerrarTicketModal } from "@/components/modals/tecnico/CerrarTicketModal"
import { EmergenciaElectricaModal } from "@/components/modals/tecnico/EmergenciaElectricaModal"
import { ConfirmarSoporteExpressModal } from "@/components/modals/tecnico/ConfirmarSoporteExpressModal"
import { CertificarAseoModal } from "@/components/modals/tecnico/CertificarAseoModal"

// Administracion Modals
import { BloquearEspacioModal } from "@/components/modals/administracion/BloquearEspacioModal"
import { AprobarDespachoModal } from "@/components/modals/administracion/AprobarDespachoModal"
import { AuditoriaLogsModal } from "@/components/modals/administracion/AuditoriaLogsModal"
import { SalonDetailModal } from "@/components/modals/administracion/SalonDetailModal"

interface CampusModalsProps {
  activeModal: string | null
  onClose: () => void

  // Salon Detail
  selectedSalon: Salon | null

  // Book Selection
  selectedBook?: Libro | null
  onConfirmReserveBook?: (libro: Libro) => void

  // Ticket Detail / Close
  selectedTicket: Ticket | null
  onCloseTicket: (ticketId: string) => void
  cierreComentario: string
  setCierreComentario: (val: string) => void
  cierreEvidenceDone: boolean
  setCierreEvidenceDone: (val: boolean) => void

  // Create Ticket Form
  handleCreateTicket: (e: React.FormEvent) => void
  reportCategory: "infraestructura" | "electrico" | "it" | "aseo"
  setReportCategory: (val: "infraestructura" | "electrico" | "it" | "aseo") => void
  reportDesc: string
  setReportDesc: (val: string) => void
  reportSalonId: string
  setReportSalonId: (val: string) => void
  reportPriority: "alta" | "media" | "baja" | "express"
  setReportPriority: (val: "alta" | "media" | "baja" | "express") => void
  evidenceUploaded: boolean
  setEvidenceUploaded: (val: boolean) => void
  salones: Salon[]

  // Event Booking Form
  handleCreateReserva: (e: React.FormEvent) => void
  eventSpace: string
  setEventSpace: (val: string) => void
  eventDate: string
  setEventDate: (val: string) => void
  eventTime: string
  setEventTime: (val: string) => void
  eventAforo: number
  setEventAforo: (val: number) => void
  eventLogistics: string
  setEventLogistics: (val: string) => void

  // Cubiculo Booking Form
  cubiculoDuration: string
  setCubiculoDuration: (val: string) => void
  onConfirmCubiculo: () => void

  // Escanear QR Form
  onConfirmScanQr: () => void

  // Asistencia Lab Form
  scannerEstudianteCode: string
  setScannerEstudianteCode: (val: string) => void
  onConfirmAsistenciaLab: () => void

  // Reasignacion Clases Form
  origSalon: string
  setOrigSalon: (val: string) => void
  destSalon: string
  setDestSalon: (val: string) => void
  handleReasignacion: () => void

  // Additional Role Actions
  onRequestExpressSupply?: (item: string, salon: string) => void
  onEmergencyLockdown?: () => void
  onRespondExpress?: () => void
  onCertifyClean?: () => void
  onLockSpace?: () => void
  onApproveDispatch?: () => void
  onAuditLogs?: () => void
  tesisCargada?: boolean
  pazSalvoGenerado?: boolean
  onUploadTesis?: () => void
  onGeneratePazSalvo?: () => void
}

export function CampusModals({
  activeModal,
  onClose,
  selectedSalon,
  selectedBook = null,
  onConfirmReserveBook = () => {},
  selectedTicket,
  onCloseTicket,
  cierreComentario,
  setCierreComentario,
  cierreEvidenceDone,
  setCierreEvidenceDone,
  handleCreateTicket,
  reportCategory,
  setReportCategory,
  reportDesc,
  setReportDesc,
  reportSalonId,
  setReportSalonId,
  reportPriority,
  setReportPriority,
  evidenceUploaded,
  setEvidenceUploaded,
  salones,
  handleCreateReserva,
  eventSpace,
  setEventSpace,
  eventDate,
  setEventDate,
  eventTime,
  setEventTime,
  eventAforo,
  setEventAforo,
  eventLogistics,
  setEventLogistics,
  cubiculoDuration,
  setCubiculoDuration,
  onConfirmCubiculo,
  onConfirmScanQr,
  scannerEstudianteCode,
  setScannerEstudianteCode,
  onConfirmAsistenciaLab,
  origSalon,
  setOrigSalon,
  destSalon,
  setDestSalon,
  handleReasignacion,
  onRequestExpressSupply = () => {},
  onEmergencyLockdown = () => {},
  onRespondExpress = () => {},
  onCertifyClean = () => {},
  onLockSpace = () => {},
  onApproveDispatch = () => {},
  onAuditLogs = () => {},
  tesisCargada = false,
  pazSalvoGenerado = false,
  onUploadTesis = () => {},
  onGeneratePazSalvo = () => {},
}: CampusModalsProps) {
  if (!activeModal) return null

  return (
    <>
      {/* 1. Estudiante Modals */}
      <CubiculoModal
        isOpen={activeModal === "cubiculo"}
        onClose={onClose}
        cubiculoDuration={cubiculoDuration}
        setCubiculoDuration={setCubiculoDuration}
        onConfirm={onConfirmCubiculo}
      />

      <ReservaEventoModal
        isOpen={activeModal === "reserva_evento"}
        onClose={onClose}
        handleCreateReserva={handleCreateReserva}
        eventSpace={eventSpace}
        setEventSpace={setEventSpace}
        eventDate={eventDate}
        setEventDate={setEventDate}
        eventAforo={eventAforo}
        setEventAforo={setEventAforo}
        eventLogistics={eventLogistics}
        setEventLogistics={setEventLogistics}
      />

      <ScanQrModal
        isOpen={activeModal === "escanear_qr"}
        onClose={onClose}
        onConfirmScanQr={onConfirmScanQr}
      />

      <AsistenciaLabModal
        isOpen={activeModal === "asistencia_lab"}
        onClose={onClose}
        scannerEstudianteCode={scannerEstudianteCode}
        setScannerEstudianteCode={setScannerEstudianteCode}
        onConfirmAsistenciaLab={onConfirmAsistenciaLab}
      />

      <UploadTesisModal
        isOpen={activeModal === "upload_tesis"}
        onClose={onClose}
        tesisCargada={tesisCargada}
        pazSalvoGenerado={pazSalvoGenerado}
        onUploadTesis={onUploadTesis}
        onGeneratePazSalvo={onGeneratePazSalvo}
      />

      <ReservaLibroModal
        isOpen={activeModal === "reserva_libro"}
        onClose={onClose}
        selectedBook={selectedBook}
        onConfirmReserveBook={onConfirmReserveBook}
      />

      {/* 2. Docente Modals */}
      <NuevoReporteModal
        isOpen={activeModal === "nuevo_reporte"}
        onClose={onClose}
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
      />

      <InsumoExpressModal
        isOpen={activeModal === "insumo_express"}
        onClose={onClose}
        onRequestExpressSupply={onRequestExpressSupply}
      />

      <ReasignacionClasesModal
        isOpen={activeModal === "reasignacion"}
        onClose={onClose}
        origSalon={origSalon}
        setOrigSalon={setOrigSalon}
        destSalon={destSalon}
        setDestSalon={setDestSalon}
        handleReasignacion={handleReasignacion}
      />

      {/* 3. Técnico Modals */}
      <CerrarTicketModal
        isOpen={activeModal === "cerrar_ticket"}
        onClose={onClose}
        selectedTicket={selectedTicket}
        onCloseTicket={onCloseTicket}
        cierreComentario={cierreComentario}
        setCierreComentario={setCierreComentario}
        cierreEvidenceDone={cierreEvidenceDone}
        setCierreEvidenceDone={setCierreEvidenceDone}
      />

      <EmergenciaElectricaModal
        isOpen={activeModal === "emergencia_electrica"}
        onClose={onClose}
        onConfirmLockdown={onEmergencyLockdown}
      />

      <ConfirmarSoporteExpressModal
        isOpen={activeModal === "soporte_express"}
        onClose={onClose}
        onConfirm={onRespondExpress}
      />

      <CertificarAseoModal
        isOpen={activeModal === "certificar_aseo"}
        onClose={onClose}
        onConfirmCertify={onCertifyClean}
      />

      {/* 4. Administración Modals */}
      <BloquearEspacioModal
        isOpen={activeModal === "bloquear_espacio"}
        onClose={onClose}
        onConfirmLockSpace={onLockSpace}
      />

      <AprobarDespachoModal
        isOpen={activeModal === "aprobar_despacho"}
        onClose={onClose}
        onApproveDispatch={onApproveDispatch}
      />

      <AuditoriaLogsModal
        isOpen={activeModal === "auditoria_logs"}
        onClose={onClose}
        onAuditLogs={onAuditLogs}
      />

      <SalonDetailModal
        isOpen={activeModal === "salon_detail"}
        onClose={onClose}
        selectedSalon={selectedSalon}
      />
    </>
  )
}
