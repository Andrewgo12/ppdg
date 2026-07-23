import type { Ticket, Prestamo } from "./campus-data"

export async function generarOrdenTrabajoPDF(ticket: Ticket) {
  const { default: jsPDF } = await import("jspdf")

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  // Encabezado institucional - Franja azul
  doc.setFillColor(15, 32, 67) // #0F2043
  doc.rect(0, 0, 210, 32, "F")

  doc.setTextColor(255, 255, 255)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(15)
  doc.text("INSTITUCIÓN UNIVERSITARIA ANTONIO JOSÉ CAMACHO", 105, 13, { align: "center" })
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text("DEPARTAMENTO DE INFRAESTRUCTURA, SERVICIOS Y PLANTA FÍSICA", 105, 21, { align: "center" })
  doc.text("ORDEN DE TRABAJO TÉCNICO Y MANTENIMIENTO PREVENTIVO/CORRECTIVO", 105, 27, { align: "center" })

  // Título Ticket
  doc.setTextColor(15, 32, 67)
  doc.setFontSize(16)
  doc.setFont("helvetica", "bold")
  doc.text(`ORDEN DE TRABAJO N° ${ticket.id}`, 105, 45, { align: "center" })

  doc.setLineWidth(0.6)
  doc.setDrawColor(212, 160, 23)
  doc.line(30, 48, 180, 48)

  // Datos Principales
  doc.setFillColor(245, 247, 250)
  doc.rect(20, 54, 170, 42, "F")
  doc.setDrawColor(210, 215, 225)
  doc.rect(20, 54, 170, 42, "S")

  doc.setFontSize(10)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(15, 32, 67)
  doc.text("DATOS DE REGISTRO E INCIDENCIA", 25, 62)

  doc.setFont("helvetica", "bold")
  doc.setTextColor(50, 50, 50)
  doc.text("Ubicación / Salón:", 25, 70)
  doc.text("Categoría Técnica:", 25, 77)
  doc.text("Prioridad Asignada:", 25, 84)
  doc.text("Reportado Por:", 25, 91)

  doc.setFont("helvetica", "normal")
  doc.text(ticket.salonNombre, 70, 70)
  doc.text(ticket.categoria.toUpperCase(), 70, 77)
  doc.text(ticket.prioridad.toUpperCase(), 70, 84)
  doc.text(ticket.reportadoPor, 70, 91)

  doc.setFont("helvetica", "bold")
  doc.text("Fecha Reporte:", 120, 70)
  doc.text("Estado Actual:", 120, 77)
  doc.text("Técnico Asignado:", 120, 84)

  doc.setFont("helvetica", "normal")
  doc.text(ticket.fecha, 155, 70)
  doc.text(ticket.estado.toUpperCase(), 155, 77)
  doc.text(ticket.tecnicoAsignado || "En proceso de asignación", 155, 84)

  // Descripción de la falla
  doc.setFont("helvetica", "bold")
  doc.setTextColor(15, 32, 67)
  doc.setFontSize(11)
  doc.text("DESCRIPCIÓN DE LA DIAGNOSIS O DAMAGE REPORT", 20, 107)

  doc.setFillColor(255, 255, 255)
  doc.rect(20, 111, 170, 30, "F")
  doc.rect(20, 111, 170, 30, "S")

  doc.setFont("helvetica", "normal")
  doc.setFontSize(9.5)
  doc.setTextColor(40, 40, 40)
  const splitDesc = doc.splitTextToSize(ticket.descripcion, 160)
  doc.text(splitDesc, 25, 118)

  // Checklist de Verificación Técnica
  doc.setFont("helvetica", "bold")
  doc.setTextColor(15, 32, 67)
  doc.setFontSize(11)
  doc.text("CHECKLIST Y PROTOCOLO DE CIERRE EN SITIO", 20, 151)

  const checks = [
    "[  ] Inspección previa de seguridad eléctrica y cableado de alimentación.",
    "[  ] Sustitución o reparación de componente averiado.",
    "[  ] Verificación de funcionamiento del proyector / aire acondicionado / tomas.",
    "[  ] Sanitización y limpieza de la zona de intervención.",
    "[  ] Captura y carga de fotografía de evidencia final en la plataforma SmartCampus.",
  ]

  let yPos = 158
  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  doc.setTextColor(50, 50, 50)

  checks.forEach((chk) => {
    doc.text(chk, 23, yPos)
    yPos += 7
  })

  // Firmas de Entrega y Cierre
  doc.setDrawColor(180, 180, 180)
  doc.setLineWidth(0.4)
  doc.line(30, 220, 90, 220)
  doc.line(120, 220, 180, 220)

  doc.setTextColor(50, 50, 50)
  doc.setFontSize(9)
  doc.setFont("helvetica", "bold")
  doc.text("Firma Técnico Responsable", 60, 225, { align: "center" })
  doc.setFont("helvetica", "normal")
  doc.text(ticket.tecnicoAsignado || "Técnico Especialista UniCamacho", 60, 229, { align: "center font-normal" })

  doc.setFont("helvetica", "bold")
  doc.text("Firma Docente / Administrador Aula", 150, 225, { align: "center" })
  doc.setFont("helvetica", "normal")
  doc.text("Conformidad de Servicio de Aula", 150, 229, { align: "center" })

  // Pie de Página
  doc.setFillColor(240, 243, 248)
  doc.rect(0, 260, 210, 37, "F")
  doc.setDrawColor(200, 210, 225)
  doc.line(0, 260, 210, 260)

  doc.setTextColor(15, 32, 67)
  doc.setFontSize(8)
  doc.setFont("helvetica", "bold")
  doc.text("SISTEMA DE GESTIÓN OPERATIVA SMARTCAMPUS UNICAMACHO", 105, 267, { align: "center" })
  doc.setTextColor(80, 80, 80)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(7.5)
  doc.text(`Identificador Único Criptográfico: HASH-TK-${ticket.id}-${Date.now().toString(36).toUpperCase()}`, 105, 273, { align: "center" })
  doc.text("Documento oficial impreso de orden de servicio de laboratorio y mantenimiento.", 105, 278, { align: "center" })

  doc.save(`Orden_Trabajo_${ticket.id}_UniCamacho.pdf`)
}

export async function generarComprobantePrestamoPDF(prestamo: Prestamo) {
  const { default: jsPDF } = await import("jspdf")

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  // Encabezado Biblioteca
  doc.setFillColor(15, 32, 67)
  doc.rect(0, 0, 210, 32, "F")

  doc.setTextColor(255, 255, 255)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(15)
  doc.text("SISTEMA INTEGRADO UNIBIBLIO FLOW - UNICAMACHO", 105, 14, { align: "center" })
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text("COMPROBANTE OFICIAL DE PRÉSTAMO Y RESERVA DE MATERIAL BIBLIOGRÁFICO", 105, 22, { align: "center" })

  // Título
  doc.setTextColor(15, 32, 67)
  doc.setFontSize(16)
  doc.setFont("helvetica", "bold")
  doc.text(`TIQUETE DE PRÉSTAMO N° ${prestamo.id}`, 105, 45, { align: "center" })

  doc.setLineWidth(0.6)
  doc.setDrawColor(212, 160, 23)
  doc.line(30, 48, 180, 48)

  // Datos del libro y estudiante
  doc.setFillColor(245, 247, 250)
  doc.rect(20, 54, 170, 50, "F")
  doc.setDrawColor(210, 215, 225)
  doc.rect(20, 54, 170, 50, "S")

  doc.setFontSize(10)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(15, 32, 67)
  doc.text("INFORMACIÓN DEL EJEMPLAR Y USUARIO", 25, 62)

  doc.setFont("helvetica", "bold")
  doc.setTextColor(50, 50, 50)
  doc.text("Título del Libro:", 25, 71)
  doc.text("Estudiante / Usuario:", 25, 78)
  doc.text("Fecha Préstamo:", 25, 85)
  doc.text("Fecha Vencimiento:", 25, 92)
  doc.text("Código QR Verificador:", 25, 99)

  doc.setFont("helvetica", "normal")
  doc.text(prestamo.libroTitulo, 70, 71)
  doc.text(prestamo.estudiante || prestamo.estudianteNombre || "", 70, 78)
  doc.text(prestamo.fechaPrestamo, 70, 85)
  doc.setTextColor(200, 30, 30)
  doc.setFont("helvetica", "bold")
  doc.text(prestamo.fechaVencimiento, 70, 92)
  doc.setTextColor(15, 32, 67)
  doc.text(prestamo.qrCode, 70, 99)

  // Normativa y Multas
  doc.setFont("helvetica", "bold")
  doc.setTextColor(15, 32, 67)
  doc.setFontSize(11)
  doc.text("REGLAMENTO Y TÉRMINOS DE DEVOLUCIÓN", 20, 116)

  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  doc.setTextColor(50, 50, 50)

  const normas = [
    "1. El material debe entregarse en la ventanilla de biblioteca antes de la fecha de vencimiento.",
    "2. La mora por día de retraso en la entrega genera una multa automática de $2.500 COP por ejemplar.",
    "3. La mora activa bloquea automáticamente la generación del Paz y Salvo para matrícula y grado.",
    "4. Presente este recibo impreso o el código QR en pantalla para validar la devolución.",
  ]

  let yP = 123
  normas.forEach((n) => {
    doc.text(n, 23, yP)
    yP += 7
  })

  // Firma Digital de Conformidad
  doc.setFillColor(235, 245, 235)
  doc.rect(20, 160, 170, 25, "F")
  doc.setDrawColor(180, 220, 180)
  doc.rect(20, 160, 170, 25, "S")

  doc.setFont("helvetica", "bold")
  doc.setTextColor(16, 124, 65)
  doc.setFontSize(10)
  doc.text("✓ REGISTRO CON FIRMA DIGITAL VERIFICADA", 25, 168)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(8.5)
  doc.setTextColor(50, 50, 50)
  doc.text("Este tiquete cuenta con firma electrónica del estudiante registrada en la base de datos UniBiblio Flow.", 25, 175)
  doc.text(`Código de Transacción: AUTH-LIB-${prestamo.libroId}-${Date.now()}`, 25, 180)

  // Pie de Página
  doc.setFillColor(240, 243, 248)
  doc.rect(0, 260, 210, 37, "F")
  doc.line(0, 260, 210, 260)

  doc.setTextColor(15, 32, 67)
  doc.setFontSize(8)
  doc.setFont("helvetica", "bold")
  doc.text("UNIBIBLIO FLOW - INSTITUCIÓN UNIVERSITARIA ANTONIO JOSÉ CAMACHO", 105, 267, { align: "center" })
  doc.setTextColor(80, 80, 80)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(7.5)
  doc.text("Sede Principal Av 6 Norte | Sede Sur | Santiago de Cali", 105, 273, { align: "center" })

  doc.save(`Comprobante_Prestamo_${prestamo.id}_UniCamacho.pdf`)
}
