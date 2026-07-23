import { NextResponse } from "next/server"
import { INITIAL_SALONES } from "@/lib/campus-data"

export async function GET() {
  try {
    // In production, this will query `await prisma.salon.findMany()`
    return NextResponse.json({
      success: true,
      data: INITIAL_SALONES,
      total: INITIAL_SALONES.length,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al consultar salones" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { salonId, nuevoEstado } = body

    if (!salonId || !nuevoEstado) {
      return NextResponse.json(
        { success: false, error: "Parámetros insuficientes" },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `Estado de ${salonId} actualizado a ${nuevoEstado}`,
      salonId,
      nuevoEstado,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al actualizar estado del salón" },
      { status: 500 }
    )
  }
}
