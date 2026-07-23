import { PrismaClient } from "@prisma/client"
import {
  INITIAL_SALONES,
  INITIAL_TICKETS,
  INITIAL_RESERVAS,
  INITIAL_LIBROS,
  INITIAL_PRESTAMOS,
  INITIAL_INSUMOS,
  INITIAL_DESPACHOS,
  INITIAL_USUARIOS_RBAC,
} from "../lib/campus-data"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Poblando base de datos SQLite de SmartCampus...")

  // 1. Salones
  for (const s of INITIAL_SALONES) {
    await prisma.salon.upsert({
      where: { id: s.id },
      update: {},
      create: {
        id: s.id,
        nombre: s.nombre,
        bloque: s.bloque,
        piso: s.piso,
        sede: s.sede,
        capacidad: s.capacidad,
        estado: s.estado,
        tipo: s.tipo,
        responsable: s.responsable,
        temperatura: s.temperatura,
        ultimoAseo: s.ultimoAseo,
      },
    })
  }

  // 2. Usuarios RBAC
  for (const u of INITIAL_USUARIOS_RBAC) {
    await prisma.usuario.upsert({
      where: { email: u.email },
      update: {},
      create: {
        id: u.id,
        nombre: u.nombre,
        email: u.email,
        subRole: u.subRole,
        dependencia: u.dependencia,
        estado: u.estado,
        ultimoAcceso: u.ultimoAcceso,
      },
    })
  }

  // 3. Tickets
  for (const t of INITIAL_TICKETS) {
    await prisma.ticket.upsert({
      where: { id: t.id },
      update: {},
      create: {
        id: t.id,
        salonId: t.salonId,
        salonNombre: t.salonNombre,
        categoria: t.categoria,
        prioridad: t.prioridad,
        reportadoPor: t.reportadoPor,
        fecha: t.fecha,
        descripcion: t.descripcion,
        estado: t.estado,
        tecnicoAsignado: t.tecnicoAsignado,
        evidenciaAntesUrl: t.evidenciaAntesUrl,
      },
    })
  }

  // 4. Libros
  for (const l of INITIAL_LIBROS) {
    await prisma.libro.upsert({
      where: { codigo: l.codigo },
      update: {},
      create: {
        id: l.id,
        codigo: l.codigo,
        titulo: l.titulo,
        autor: l.autor,
        categoria: l.categoria,
        unidadesDisponibles: l.unidadesDisponibles,
        totalUnidades: l.totalUnidades,
        ubicacion: l.ubicacion,
      },
    })
  }

  console.log("✅ Base de datos poblada exitosamente con datos universitarios de prueba.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
