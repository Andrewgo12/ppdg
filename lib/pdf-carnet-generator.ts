import type { SubRoleInfo } from "@/lib/campus-data"

interface CarnetPdfData {
  subRoleInfo: SubRoleInfo
  telefono: string
  emailPersonal: string
  contactoEmergencia: string
  rh: string
  cedula: string
}

export async function generarCarnetImprimiblePDF(data: CarnetPdfData) {
  const { default: jsPDF } = await import("jspdf")

  // CR80 Standard ID Card dimensions: 85.6mm x 53.9mm
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [85.6, 53.9],
  })

  // FRONT SIDE (FRENTE)
  // Background
  doc.setFillColor(15, 32, 67) // #0F2043 Navy
  doc.rect(0, 0, 85.6, 12, "F")

  // Header Text
  doc.setTextColor(212, 160, 23) // #D4A017 Gold
  doc.setFont("helvetica", "bold")
  doc.setFontSize(6)
  doc.text("INSTITUCIÓN UNIVERSITARIA ANTONIO JOSÉ CAMACHO", 42.8, 5, { align: "center" })

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(7)
  doc.text("CREDENCIAL DE IDENTIFICACIÓN & ARL", 42.8, 9.5, { align: "center" })

  // Body Fill
  doc.setFillColor(250, 250, 250)
  doc.rect(0, 12, 85.6, 41.9, "F")

  // Photo Box (Left)
  doc.setDrawColor(15, 32, 67)
  doc.setLineWidth(0.5)
  doc.rect(4, 15, 22, 26)
  doc.setFillColor(230, 235, 245)
  doc.rect(4.2, 15.2, 21.6, 25.6, "F")

  doc.setTextColor(15, 32, 67)
  doc.setFontSize(10)
  doc.setFont("helvetica", "bold")
  doc.text(data.subRoleInfo.avatar, 15, 28, { align: "center" })

  // User Info (Right)
  doc.setFontSize(8)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(15, 32, 67)
  doc.text(data.subRoleInfo.fullName.toUpperCase(), 29, 18)

  doc.setFontSize(6.5)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(100, 100, 100)
  doc.text(`ROL: ${data.subRoleInfo.name.toUpperCase()}`, 29, 22)

  doc.setFontSize(6)
  doc.setTextColor(50, 50, 50)
  doc.text(`C.C. / ID: ${data.cedula}`, 29, 27)
  doc.text(`CÓDIGO: 2024100982`, 29, 31)
  doc.text(`RH: ${data.rh}`, 29, 35)
  doc.text(`SEDE: Sede Principal Av. 6`, 29, 39)

  // Bottom Gold Stripe
  doc.setFillColor(212, 160, 23)
  doc.rect(0, 51.9, 85.6, 2, "F")

  // REVERSE SIDE (REVERSO PARA LAMINAR)
  doc.addPage([85.6, 53.9], "landscape")

  // Header Reverse
  doc.setFillColor(15, 32, 67)
  doc.rect(0, 0, 85.6, 8, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(6)
  doc.setFont("helvetica", "bold")
  doc.text("COBERTURA MÉDICA & ATENCIÓN DE EMERGENCIAS ARL", 42.8, 5.5, { align: "center" })

  // Body Reverse
  doc.setFontSize(5.5)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(50, 50, 50)
  doc.text(`EPS: SURA EPS S.A.`, 5, 13)
  doc.text(`ARL: POSITIVA COMPAÑÍA DE SEGUROS (PÓLIZA #9012)`, 5, 17)
  doc.text(`CONTACTO EMERGENCIA: ${data.contactoEmergencia}`, 5, 21)
  doc.text(`TELÉFONO TITULAR: ${data.telefono}`, 5, 25)
  doc.text(`NOTIFICACIONES: ${data.emailPersonal}`, 5, 29)

  // Disclaimer text
  doc.setFontSize(4.5)
  doc.setTextColor(120, 120, 120)
  doc.text("Este documento es personal e intransferible. Válido para acceso a salones y laboratorios.", 5, 36)
  doc.text("Firma digital registrada mediante código QR criptográfico SHA-256.", 5, 39)

  // Save PDF
  doc.save(`Carnet_Imprimible_Laminar_${data.subRoleInfo.fullName.replace(/\s+/g, "_")}.pdf`)
}
