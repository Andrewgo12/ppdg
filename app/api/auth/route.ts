import { NextResponse } from "next/server"
import { SUB_ROLES, type SubRoleId } from "@/lib/campus-data"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { subRoleId } = body

    if (!subRoleId || !SUB_ROLES[subRoleId as SubRoleId]) {
      return NextResponse.json(
        { success: false, error: "Sub-rol inválido o no existente" },
        { status: 400 }
      )
    }

    const subRoleInfo = SUB_ROLES[subRoleId as SubRoleId]

    // Simulación de firma de Token JWT con payload de permisos RBAC
    const mockJwtToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
      JSON.stringify({
        subRole: subRoleId,
        permissions: subRoleInfo.permissions,
        exp: Math.floor(Date.now() / 1000) + 3600 * 8, // 8 horas
      })
    )}.SMARTCAMPUS_SECRET_HASH`

    return NextResponse.json({
      success: true,
      message: `Autenticado exitosamente como ${subRoleInfo.name}`,
      token: mockJwtToken,
      user: {
        name: subRoleInfo.fullName,
        subRole: subRoleId,
        category: subRoleInfo.category,
        permissions: subRoleInfo.permissions,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error en el servidor de autenticación" },
      { status: 500 }
    )
  }
}
