import jsPDF from "jspdf"

export interface PazYSalvoData {
  estudianteNombre: string
  codigoEstudiantil: string
  programaAcademico: string
  cedula: string
  fechaEmision?: string
  hashVerificacion?: string
}

export function generarPazYSalvoPDF(data: PazYSalvoData) {
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

  // Título blanco en encabezado
  doc.setTextColor(255, 255, 255)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(16)
  doc.text("INSTITUCIÓN UNIVERSITARIA ANTONIO JOSÉ CAMACHO", 105, 14, { align: "center" })

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text("Sede Principal Av. 6 Norte | Santiago de Cali, Colombia | Vigilada Mineducación", 105, 22, { align: "center" })
  doc.text("SISTEMA INTEGRADO DE GESTIÓN DE GRADOS Y CERTIFICACIONES DIGITALES", 105, 28, { align: "center" })

  // Título del Certificado
  doc.setTextColor(15, 32, 67)
  doc.setFontSize(18)
  doc.setFont("helvetica", "bold")
  doc.text("CERTIFICADO DE PAZ Y SALVO INSTITUCIONAL", 105, 52, { align: "center" })

  doc.setLineWidth(0.8)
  doc.setDrawColor(212, 160, 23) // Dorado #D4A017
  doc.line(35, 56, 175, 56)

  // Subtítulo
  doc.setTextColor(80, 80, 80)
  doc.setFontSize(11)
  doc.setFont("helvetica", "italic")
  doc.text("DOCUMENTO OFICIAL DE REQUISITOS DE EGRESADO", 105, 62, { align: "center" })

  // Cuerpo del texto
  doc.setTextColor(40, 40, 40)
  doc.setFontSize(11)
  doc.setFont("helvetica", "normal")

  const textoIntroductorio = 
    `La Secretaría General y la Dirección de Registro y Control de la Institución Universitaria Antonio José Camacho (UniCamacho), ` +
    `hacen constar que el(la) estudiante mencionado(a) a continuación se encuentra a PAZ Y SALVO ` +
    `por todo concepto administrativo, financiero, bibliotecario, académico y de infraestructura con la Institución.`

  doc.text(doc.splitTextToSize(textoIntroductorio, 170), 20, 75)

  // Cuadro de datos del estudiante
  doc.setFillColor(245, 247, 250)
  doc.rect(20, 92, 170, 48, "F")
  doc.setDrawColor(200, 210, 225)
  doc.setLineWidth(0.3)
  doc.rect(20, 92, 170, 48, "S")

  doc.setFont("helvetica", "bold")
  doc.setTextColor(15, 32, 67)
  doc.text("DATOS DEL GRADUANDO", 25, 100)

  doc.setFontSize(10)
  doc.setFont("helvetica", "bold")
  doc.text("Estudiante:", 25, 108)
  doc.text("Cédula / ID:", 25, 115)
  doc.text("Código Estudiantil:", 25, 122)
  doc.text("Programa Académico:", 25, 129)

  doc.setFont("helvetica", "normal")
  doc.setTextColor(50, 50, 50)
  doc.text(data.estudianteNombre, 65, 108)
  doc.text(data.cedula || "1.144.109.823", 65, 115)
  doc.text(data.codigoEstudiantil || "2024100982", 65, 122)
  doc.text(data.programaAcademico || "Ingeniería de Sistemas", 65, 129)

  // Tabla de Verificación de Paz y Salvos por Dependencia
  doc.setFont("helvetica", "bold")
  doc.setTextColor(15, 32, 67)
  doc.setFontSize(11)
  doc.text("VERIFICACIÓN DE DEPENDENCIAS Y UNIDADES OPERATIVAS", 20, 150)

  const dependencias = [
    { dep: "UniBiblio Flow (Biblioteca)", resp: "Paz y Salvo de Libros, Tesis y Devoluciones", est: "APROBADO ✓" },
    { dep: "Financiera y Tesorería", resp: "Derechos de Grado y Paz y Salvo Matrículas", est: "APROBADO ✓" },
    { dep: "Decanatura de Ingeniería", resp: "Revisión de Plan de Estudios y Crts Académicos", est: "APROBADO ✓" },
    { dep: "Planta Física y Laboratorios", resp: "Paz y Salvo de Equipos e Insumos de Aula", est: "APROBADO ✓" },
  ]

  let startY = 156
  doc.setFillColor(15, 32, 67)
  doc.rect(20, startY, 170, 8, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(9)
  doc.setFont("helvetica", "bold")
  doc.text("DEPENDENCIA", 23, startY + 5.5)
  doc.text("CONCEPTO Y VERIFICACIÓN", 75, startY + 5.5)
  doc.text("ESTADO", 160, startY + 5.5)

  startY += 8

  dependencias.forEach((d, index) => {
    doc.setFillColor(index % 2 === 0 ? 255 : 245, index % 2 === 0 ? 255 : 247, index % 2 === 0 ? 255 : 250)
    doc.rect(20, startY, 170, 8, "F")
    doc.setDrawColor(220, 220, 220)
    doc.rect(20, startY, 170, 8, "S")

    doc.setTextColor(30, 30, 30)
    doc.setFont("helvetica", "bold")
    doc.setFontSize(8.5)
    doc.text(d.dep, 23, startY + 5.5)

    doc.setFont("helvetica", "normal")
    doc.text(d.resp, 75, startY + 5.5)

    doc.setTextColor(16, 124, 65) // Verde #107C41
    doc.setFont("helvetica", "bold")
    doc.text(d.est, 160, startY + 5.5)

    startY += 8
  })

  // Firma y Sello Digital
  doc.setDrawColor(180, 180, 180)
  doc.setLineWidth(0.4)
  doc.line(30, 220, 90, 220)
  doc.line(120, 220, 180, 220)

  doc.setTextColor(50, 50, 50)
  doc.setFontSize(9)
  doc.setFont("helvetica", "bold")
  doc.text("Dra. Patricia Salamanca H.", 60, 225, { align: "center" })
  doc.setFont("helvetica", "normal")
  doc.text("Secretaria General UNICAMACHO", 60, 229, { align: "center" })

  doc.setFont("helvetica", "bold")
  doc.text("Ing. Carlos Eduardo Rivas", 150, 225, { align: "center" })
  doc.setFont("helvetica", "normal")
  doc.text("Director de Registro y Control", 150, 229, { align: "center" })

  // Pie de página y Hash de Firma Criptográfica
  doc.setFillColor(240, 243, 248)
  doc.rect(0, 260, 210, 37, "F")
  doc.setDrawColor(200, 210, 225)
  doc.line(0, 260, 210, 260)

  doc.setTextColor(15, 32, 67)
  doc.setFontSize(8)
  doc.setFont("helvetica", "bold")
  doc.text("VALIDEZ DIGITAL Y FIRMA CRIPTOGRÁFICA DE SEGURIDAD", 105, 266, { align: "center" })

  doc.setTextColor(80, 80, 80)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(7.5)
  doc.text(`Fecha de Expedición: ${fecha} | Válido para trámite de grado presencial y virtual`, 105, 271, { align: "center" })
  doc.text(`Firma Criptográfica (Hash SHA-256): ${hash}`, 105, 276, { align: "center" })
  doc.text("Este documento electrónico cuenta con validez legal según la Ley 527 de 1999 y normatividad de UniCamacho Cali.", 105, 281, { align: "center" })

  // Guardar archivo PDF
  const filename = `Paz_y_Salvo_${data.estudianteNombre.replace(/\s+/g, "_")}_UniCamacho.pdf`
  doc.save(filename)
}
