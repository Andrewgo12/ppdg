import { NextResponse } from "next/server"
import { INITIAL_TICKETS } from "@/lib/campus-data"

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: INITIAL_TICKETS,
      total: INITIAL_TICKETS.length,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al consultar tickets" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { salonId, salonNombre, categoria, descripcion, reportadoPor } = body

    if (!salonId || !categoria || !descripcion) {
      return NextResponse.json(
        { success: false, error: "Datos de ticket incompletos" },
        { status: 400 }
      )
    }

    const newTicket = {
      id: `TK-${Math.floor(500 + Math.random() * 500)}`,
      salonId,
      salonNombre: salonNombre || salonId,
      categoria,
      prioridad: "alta",
      reportadoPor: reportadoPor || "Usuario Autenticado",
      fecha: new Date().toISOString().replace("T", " ").substring(0, 16),
      descripcion,
      estado: "pendiente_asignacion",
    }

    return NextResponse.json(
      { success: true, message: "Ticket creado exitosamente", data: newTicket },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al registrar el ticket" },
      { status: 500 }
    )
  }
}
