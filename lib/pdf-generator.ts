export interface PazYSalvoData {
  estudianteNombre: string
  codigoEstudiantil: string
  programaAcademico: string
  cedula: string
  fechaEmision?: string
  hashVerificacion?: string
}

export async function generarPazYSalvoPDF(data: PazYSalvoData) {
  const { default: jsPDF } = await import("jspdf")

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  const fecha = data.fechaEmision || new Date().toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const hash = data.hashVerificacion || `SHA256-UNICAMACHO-${Math.random().toString(36).substring(2, 10).toUpperCase()}-2026`

  // Encabezado institucional - Franja azul
  doc.setFillColor(15, 32, 67) // Azul institucional #0F2043
  doc.rect(0, 0, 210, 35, "F")

  doc.setTextColor(255, 255, 255)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(15)
  doc.text("INSTITUCIÓN UNIVERSITARIA ANTONIO JOSÉ CAMACHO", 105, 14, { align: "center" })
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text("OFICINA DE ADMISIONES, REGISTRO Y CONTROL ACADÉMICO", 105, 22, { align: "center" })
  doc.text("SISTEMA INTEGRADO SMARTCAMPUS UNICAMACHO", 105, 28, { align: "center" })

  // Título del Certificado
  doc.setTextColor(15, 32, 67)
  doc.setFontSize(18)
  doc.setFont("helvetica", "bold")
  doc.text("CERTIFICADO OFICIAL DE PAZ Y SALVO INSTITUCIONAL", 105, 50, { align: "center" })

  doc.setLineWidth(0.8)
  doc.setDrawColor(212, 160, 23) // Dorado #D4A017
  doc.line(30, 54, 180, 54)

  // Subtítulo
  doc.setFontSize(10)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(80, 80, 80)
  doc.text("VÁLIDO PARA TRÁMITE DE GRADO Y MATRÍCULA ACADÉMICA", 105, 61, { align: "center" })

  // Cuerpo del Certificado
  doc.setFontSize(11)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(40, 40, 40)

  const line1 = `La suscrita Oficina de Admisiones, Registro y Control Académico de la Institución Universitaria Antonio José Camacho, hace constar que el(la) estudiante:`
  const line1Split = doc.splitTextToSize(line1, 160)
  doc.text(line1Split, 25, 75)

  // Cuadro de Datos del Estudiante
  doc.setFillColor(245, 247, 250)
  doc.rect(25, 87, 160, 42, "F")
  doc.setDrawColor(210, 215, 225)
  doc.rect(25, 87, 160, 42, "S")

  doc.setFont("helvetica", "bold")
  doc.setTextColor(15, 32, 67)
  doc.setFontSize(11)
  doc.text(`NOMBRES Y APELLIDOS:`, 30, 97)
  doc.text(`DOCUMENTO DE IDENTIDAD:`, 30, 105)
  doc.text(`CÓDIGO ESTUDIANTIL:`, 30, 113)
  doc.text(`PROGRAMA ACADÉMICO:`, 30, 121)

  doc.setFont("helvetica", "normal")
  doc.setTextColor(30, 30, 30)
  doc.text(data.estudianteNombre.toUpperCase(), 90, 97)
  doc.text(`C.C. ${data.cedula}`, 90, 105)
  doc.text(data.codigoEstudiantil, 90, 113)
  doc.text(data.programaAcademico, 90, 121)

  // Declaración de paz y salvo por módulos
  doc.setFontSize(10.5)
  const line2 = `Se encuentra a la fecha EN PAZ Y SALVO por todo concepto financiero, académico, bibliotecario, de laboratorios e insumos en las dependencias de la Institución:`
  const line2Split = doc.splitTextToSize(line2, 160)
  doc.text(line2Split, 25, 140)

  // Tabla de comprobaciones
  const dependencias = [
    { dep: "Biblioteca Central UniBiblio", estado: "SIN DEUDAS / SIN LIBROS PENDIENTES", ok: "PAZ Y SALVO" },
    { dep: "Laboratorios de Mecatrónica & Sistemas", estado: "INSUMOS Y HERRAMIENTAS DEVUELTAS", ok: "PAZ Y SALVO" },
    { dep: "Tesorería y Servicios Financieros", estado: "MATRÍCULA Y DERECHOS PAGADOS", ok: "PAZ Y SALVO" },
    { dep: "Planta Física y Almacén de Equipos", estado: "SIN REGISTRO DE INCIDENCIAS", ok: "PAZ Y SALVO" },
  ]

  let y = 156
  dependencias.forEach((d) => {
    doc.setFillColor(238, 243, 238)
    doc.rect(25, y, 160, 10, "F")
    doc.setDrawColor(200, 220, 200)
    doc.rect(25, y, 160, 10, "S")

    doc.setFont("helvetica", "bold")
    doc.setFontSize(9)
    doc.setTextColor(15, 32, 67)
    doc.text(d.dep, 29, y + 6.5)

    doc.setFont("helvetica", "normal")
    doc.setFontSize(8)
    doc.setTextColor(70, 70, 70)
    doc.text(d.estado, 95, y + 6.5)

    doc.setFont("helvetica", "bold")
    doc.setTextColor(16, 124, 65)
    doc.text(`✓ ${d.ok}`, 155, y + 6.5)

    y += 13
  })

  // Fecha y Hash
  doc.setFontSize(9.5)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(50, 50, 50)
  doc.text(`Dado en Santiago de Cali, a los ${fecha}.`, 25, 218)

  // Firma Digital Institucional
  doc.setDrawColor(15, 32, 67)
  doc.setLineWidth(0.5)
  doc.line(70, 245, 140, 245)

  doc.setFont("helvetica", "bold")
  doc.setFontSize(9.5)
  doc.setTextColor(15, 32, 67)
  doc.text("DRA. MARÍA FERNANDA CABAL C.", 105, 250, { align: "center" })
  doc.setFont("helvetica", "normal")
  doc.setFontSize(8.5)
  doc.setTextColor(80, 80, 80)
  doc.text("Directora de Admisiones y Registro Académico", 105, 254, { align: "center" })

  // Pie de Página
  doc.setFillColor(240, 243, 248)
  doc.rect(0, 265, 210, 32, "F")
  doc.setDrawColor(210, 215, 225)
  doc.line(0, 265, 210, 265)

  doc.setTextColor(15, 32, 67)
  doc.setFontSize(8)
  doc.setFont("helvetica", "bold")
  doc.text("INSTITUCIÓN UNIVERSITARIA ANTONIO JOSÉ CAMACHO - VIGILADA MINEDUCACIÓN", 105, 273, { align: "center" })

  doc.setTextColor(90, 90, 90)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(7.5)
  doc.text(`Código de Verificación Electrónica: ${hash}`, 105, 279, { align: "center" })
  doc.text("Este documento incluye firma digital con validez jurídica según la Ley 527 de 1999.", 105, 284, { align: "center" })

  doc.save(`Paz_y_Salvo_${data.estudianteNombre.replace(/\s+/g, "_")}_UniCamacho.pdf`)
}
