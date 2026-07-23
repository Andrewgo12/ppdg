# 🎓 PROPUESTA MULTIMODULAR DE PROYECTO DE GRADO: SMARTCAMPUS UNICAMACHO
**Sistema Integrado de Gestión de Infraestructura, Servicios de Aula, Reservas Culturales y Trazabilidad Bibliotecaria (Facility & Campus Management System)**
*Diseñado bajo la perspectiva de un Arquitecto de Software Senior con más de 15 años de experiencia.*

---

## 🏛️ 1. INTRODUCCIÓN Y DIAGNÓSTICO CIENTÍFICO

### 1.1 Contexto Institucional (UniCamacho - Cali)
La Institución Universitaria Antonio José Camacho (UNICAMACHO) cuenta con múltiples sedes en la ciudad de Santiago de Cali (Sede Principal Av. 6, Sede Sur, entre otras). Diariamente, miles de estudiantes, docentes, técnicos de soporte y administrativos convergen en estos campus físicos. 

Actualmente, la gestión de los recursos físicos de la institución se encuentra fragmentada:
1.  **La Ocupación de Aulas:** El inventario de salones y su disponibilidad real se maneja a través de grillas estáticas en hojas de cálculo o listados físicos, lo que genera subutilización de espacios o cruces de horarios.
2.  **Soporte de Mantenimiento:** La detección y reporte de fallas de infraestructura (aires acondicionados dañados, tomas eléctricas defectuosas, videobeams sin señal, mobiliario roto) depende de llamadas telefónicas, correos electrónicos informales o el reporte verbal de los docentes al terminar su jornada. Esto incrementa el tiempo de resolución (MTTR) e interrumpe el normal desarrollo de las clases.
3.  **Trazabilidad Bibliotecaria (UniBiblio Flow):** Los procesos de préstamo de material físico, validaciones con firmas físicas, generación manual de paz y salvos bibliotecarios para matrículas y grados generan cuellos de botella administrativos y colas presenciales ineficientes.
4.  **Reservas de Espacios Comunes:** La planeación de eventos extracurriculares (danza, canto, teatro, debates) carece de un flujo de aprobación formalizado, lo que genera disputas territoriales por el uso de la cafetería, el auditorio o las plazoletas.

### 1.2 La Solución Propuesta: EcoIntegra SmartCampus
**EcoIntegra SmartCampus** es una plataforma web progresiva (PWA) e inteligente que unifica en un solo ecosistema relacional la gestión operativa del campus (SmartCampus) y el flujo automatizado de recursos de aprendizaje (UniBiblio). El sistema funciona como un ERP de Facility Management diseñado específicamente para el sector educativo, optimizando la comunicación bidireccional entre todos los estamentos universitarios en tiempo real.

---

## ✨ 2. PROPUESTA INTEGRAL: SMARTCAMPUS UNICAMACHO Y UNI-BIBLIO FLOW

SmartCampus Unicamacho se define como un proyecto multimódulo que transforma la gestión física del campus en un proceso transparente, colaborativo y medible. Es una plataforma web ligera orientada a PC y móviles, que resuelve cuatro necesidades centrales:

- visibilidad real de ocupación y estado de salones,
- reporte y seguimiento de mantenimiento con evidencia multimedia,
- reserva ordenada de espacios para actividades culturales y académicas,
- digitalización del préstamo y devolución de material bibliográfico.

### 2.1 SmartCampus Unicamacho: gestión de salones, ocupación y mantenimiento

Este módulo no es un simple mapa. Es una solución que combina:

- una matriz de ocupación en tiempo real con estados claros de cada salón,
- un mapa interactivo de campus con bloques, pisos y sedes,
- un sistema de tickets de mantenimiento estructurado por especialidad técnica,
- un flujo de soporte rápido para insumos y equipos necesarios en clase.

#### Problemática resuelta

- falta de visibilidad sobre la ocupación real de salones,
- desorientación de estudiantes y docentes entre sedes,
- salones marcados como ocupados cuando están libres,
- lentitud para reportar daños de equipos como videobeam, aire acondicionado o computadores,
- comunicación deficiente entre quien detecta el problema y quien lo resuelve.

#### Módulos clave

- **Matriz de Ocupación en Tiempo Real:** tablero de estado para estudiantes, docentes y administración que muestra si el salón está libre, ocupado, reservado o en mantenimiento.
- **Mapa Interactivo 2D de Campus:** visor simple que permite ubicar con precisión salones, laboratorios, auditorios, cafeterías y espacios públicos por sede y piso.
- **Módulo de Mantenimiento de Aula:** ticketing por categorías de daño con evidencia obligatoria de foto o video, asignación por especialidad técnica y cierre con evidencia final.
- **Solicitudes Express de Insumos:** botón de atención rápida para profesores que necesiten cables, conectores, proyectores o material urgente durante la clase.
- **Reservas de Espacios para Eventos:** solicitud formal de uso de cafetería, plazoleta, auditorio o salón para actividades culturales, talleres de danza, canto o reuniones estudiantiles.
- **Indicadores Institucionales:** panel de control administrativo que mide tiempos de respuesta, uso de salones, recurrencia de fallas y demanda de espacios.

#### Cómo funciona en el campus

- el estudiante consulta el estado del salón y su disponibilidad antes de llegar,
- el docente reporta una falla desde el salón o escaneando un QR en su mesa,
- el técnico recibe la orden de trabajo asignada a su especialidad,
- el administrador aprueba reservas y reasigna estados de los espacios,
- el personal de insumos verifica stock y despacha recursos urgentes.

### 2.2 UniBiblio Flow: digitalización integral de la biblioteca

Este módulo ataca los procesos manuales actuales de biblioteca que dependen de correos y firmas en papel.

#### Problemática resuelta

- trámites de préstamo lentos y análogos,
- filas físicas para firmar documentos y sacar libros,
- falta de trazabilidad en devoluciones y multas,
- demora en la expedición de paz y salvo para matrícula o grado.

#### Módulos clave

- **Catálogo Digital y Reserva de Material:** los usuarios buscan y reservan libros o recursos académicos en línea.
- **Validación Digital por QR:** el sistema genera un ticket QR dinámico con la reserva aprobada y el bibliotecario lo escanea en la entrega.
- **Firma Digital y Pase de Salida:** el estudiante firma en pantalla y el sistema registra automáticamente el préstamo en la base de datos.
- **Alertas y Paz y Salvo Automático:** recordatorios por la plataforma antes del vencimiento y generación digital del certificado de paz y salvo cuando no hay deudas.

#### Cómo funciona el flujo bibliotecario

- el estudiante reserva un libro y recibe un código QR,
- el auxiliar de biblioteca escanea el QR y entrega el material,
- el préstamo queda registrado con fecha límite,
- la devolución se procesa con escaneo y se calcula la multa automáticamente,
- el sistema emite el paz y salvo digital cuando se cumplen las condiciones.

### 2.3 Perfiles y permisos detallados

Para que el sistema sea claro y seguro, cada perfil tiene responsabilidades definidas. Esto evita confusiones y permite una gobernanza confiable en la operación diaria.

#### 2.3.1 Estudiantes (4 perfiles)

- **Estudiante Regular:** ve disponibilidad de salones, puede reservar espacios de estudio y biblioteca, no reporta mantenimiento físico.
- **Estudiante Representante Cultural/Deportivo:** gestiona solicitudes de espacios para eventos, puede añadir requerimientos logísticos, no aprueba por sí mismo.
- **Monitor de Laboratorio o Auxiliar de Biblioteca:** procesa préstamos, reporta daños menores de su zona, no cierra tickets complejos.
- **Estudiante en Grado o Matrícula:** realiza trámites de paz y salvo, sube tesis y documentos de grado, activa la generación automática del certificado.

Para cada estudiante el sistema define:

- qué puede ver: mapa, estado de salones, reservas propias, estado de biblioteca,
- qué puede solicitar: espacios de estudio, reserva de eventos, préstamos de libros,
- qué no puede hacer: cambiar estados de salones, cerrar tickets de mantenimiento, aprobar reservas de alto impacto,
- qué debe hacer: aportar información clara en la solicitud, adjuntar evidencia cuando corresponda, entregar los espacios en buen estado.

#### 2.3.2 Docentes y trabajadores internos

- **Docente Regular:** puede reportar fallas con evidencia, solicitar insumos urgentes, reservar salones para actividades de recuperación.
- **Director de Programa / Decano:** ve métricas de su facultad, puede reasignar aulas en caso de falla mayor, avala solicitudes de eventos de su área.
- **Funcionario Administrativo de Eventos:** bloquea espacios institucionales, revisa y aprueba solicitudes de actividades, asigna logística y aseo.

Los docentes tienen permisos para:

- ver su agenda y el estado real del salón,
- reportar daños de equipos,
- solicitar apoyo inmediato,
- no reasignar clases fuera de las reglas del cronograma,
- no aprobar compras de alto costo sin autorización.

#### 2.3.3 Mantenimiento y especialidades técnicas

La operación de mantenimiento se divide en especialidades para reflejar la estructura real de la institución.

- **Técnico de Planta Física:** atiende plomería, cerrajería, mobiliario, pintura.
- **Técnico Eléctrico:** atiende red eléctrica, enchufes, alumbrado y seguridad eléctrica.
- **Técnico de Tecnología / Soporte IT:** atiende videobeams, televisores, redes, computadoras.
- **Técnico de Servicios Generales:** atiende aseo, adecuación de espacios y preparación de eventos.

Cada técnico define:

- qué puede ver: tickets de su categoría, ubicación de salones, evidencia inicial,
- qué puede hacer: aceptar órdenes, cambiar estado a en proceso, subir evidencia final,
- qué no puede hacer: resolver tickets fuera de su especialidad, alterar estados de reservas,
- qué debe hacer: documentar tiempo de trabajo, pedir repuestos con ticket válido, cerrar con evidencia.

#### 2.3.4 Tecnología, almacén y suministros

- **Coordinador de Tecnología:** supervisa equipos, valora adquisiciones, prioriza despachos.
- **Responsable de Insumos Electrónicos:** controla stock, responde solicitudes urgentes, emite alertas de reabastecimiento.
- **Almacenista:** aprueba despacho de materiales, actualiza inventario y gestiona el flujo de repuestos.

Sus permisos incluyen:

- ver solicitudes de piezas asociadas a tickets,
- autorizar salidas de material,
- no despachar sin ticket o sin permiso administrativo,
- mantener el inventario con datos de stock y ubicación.

#### 2.3.5 Administración general

- **Administrador del Campus:** controla usuarios, perfiles, estado de espacios, métricas y aprobación de reservas.
- **Coordinador de Eventos:** organiza el uso de auditorio, plazoleta y cafetería, resuelve conflictos de agenda.
- **Supervisor de Mantenimiento:** valida cierres, revisa tiempos de respuesta y garantiza cumplimiento de procedimientos.

La administración tiene permisos para:

- ver y editar cualquier información relevante,
- aprobar o rechazar reservas y tickets críticos,
- asignar técnicos,
- definir reglas de negocio en el sistema.

### 2.4 Gestión de perfiles y permisos

La plataforma implementa un modelo de control de acceso basado en roles. Esto asegura que:

- cada usuario accede solo a lo que necesita,
- las interfaces muestran menús diferentes por rol,
- las acciones se validan tanto en la pantalla como en el servidor,
- los permisos no se limitan a la apariencia, sino a la lógica interna.

En la práctica esto significa:

- un estudiante no puede ver los paneles de gestión de mantenimiento,
- un técnico no puede aprobar reservas de eventos,
- un administrador puede delegar funciones sin perder control,
- los cambios críticos quedan registrados con usuario y fecha.

### 2.5 Modelo de datos conceptual

La plataforma está soportada por una base de datos relacional con información organizada en grandes dominios:

- **Usuarios:** datos personales, rol, dependencia y estado.
- **Espacios:** salones, auditorios, laboratorios, cafeterías, plazoletas y zonas comunes con sus recursos.
- **Tickets de mantenimiento:** registros de fallas, categoría técnica, prioridad, responsable y estado.
- **Evidencias:** fotos y videos asociados a cada ticket antes y después de la reparación.
- **Reservas de espacios:** solicitudes de uso, fechas, estado de aprobación, recursos logísticos y asistentes autorizados.
- **Asistencias y control de eventos:** registro de asistencia en laboratorios, eventos y actividades con QR/carné.
- **Libros y préstamos:** catálogo físico, préstamos activos, devoluciones, multas y paz y salvo.
- **Tesis y trámites de grado:** documentos entregados, revisión de tesis y generación de paz y salvo digital.
- **Insumos y repuestos:** stock, solicitudes de despacho y control de entregas.
- **Notificaciones y auditoría:** mensajes internos, eventos de cambio y registros de trazabilidad.

Este modelo permite que las relaciones entre objetos queden claras y que la base de datos responda a consultas reales como:

- qué salones están en mantenimiento en una sede,
- cuáles son los tickets abiertos de tecnología,
- qué reservas de eventos se aprueban con más frecuencia,
- qué estudiantes tienen multas en biblioteca,
- qué repuestos se están agotando en almacén.

### 2.6 Funcionamiento en móvil y PC

La plataforma debe ser una página web progresiva (PWA), sencilla de usar y sin la complejidad de una aplicación nativa. Esto la hace más accesible y práctica para la Universidad.

#### Móvil

- diseño mobile-first con botones grandes y navegación simple,
- acceso inmediato a cámara para escanear QR y tomar fotos/videos,
- formularios cortos para reportar fallas o solicitar recursos,
- cola local de acciones cuando la conexión es débil,
- notificaciones visuales y auditivas en el navegador.

#### PC

- paneles amplios de control para administración y análisis,
- mapa 2D completo del campus con filtros avanzados,
- tablas de gestión para tickets, reservas y libros,
- generación de reportes e informes en formato descargable,
- herramientas de aprobación y auditoría con historial completo.

#### Un mismo sistema, dos experiencias

El objetivo es que la misma página funcione bien en ambos entornos. En móviles se prioriza la acción rápida; en PC se prioriza la supervisión y el análisis. La experiencia permanece coherente, pero adaptada a las necesidades de cada perfil.

### 2.7 Cómo se hará todo y cuál será su alcance

La implementación debe partir de una estructura clara:

- definir los módulos principales,
- establecer los perfiles y permisos,
- construir un flujo de datos simple para tickets, reservas y préstamos,
- diseñar un esquema de interfaz móvil/desktop,
- asegurar la trazabilidad de cada evento con evidencias y registros de auditoría.

El desarrollo procura la simplicidad técnica del lado del usuario, pero la robustez operativa del lado del sistema. No se trata de una aplicación compleja para instalar, sino de una plataforma web que ofrece:

- vista de campus en tiempo real,
- reporte inmediato de fallas,
- reserva organizada de espacios,
- digitalización de biblioteca,
- gestión de insumos y repuestos,
- paneles administrativos y métricas.

Cada módulo debe quedar documentado con claridad y sin huecos. El documento debe responder a las preguntas:

- qué hace cada perfil,
- qué puede y qué no puede hacer,
- cómo se integran los módulos,
- cómo se garantiza la operación en móvil y PC,
- qué datos se cruzan y cómo se mantienen seguros.

Con esta propuesta, SmartCampus Unicamacho es un sistema integral, más que un mapa o un formulario: es la plataforma operativa que hace al campus más transparente, eficiente y seguro.

---

## 🎭 3. ARQUITECTURA DE ROLES Y PERMISOS DETALLADA (RBAC)

Para garantizar la integridad transaccional y la seguridad de la información, el sistema implementa un modelo de Control de Acceso Basado en Roles (RBAC) de alta granularidad. A continuación, se detallan los perfiles de usuario, sus responsabilidades, limitaciones y flujos de acción.

```
                                  ┌──────────────────────────┐
                                  │    SUPER-ADMINISTRADOR   │
                                  └─────────────┬────────────┘
                                                │
       ┌────────────────────────┬───────────────┼───────────────┬────────────────────────┐
       ▼                        ▼               ▼               ▼                        ▼
┌──────────────┐         ┌────────────┐  ┌─────────────┐  ┌───────────┐         ┌────────────────┐
│ ESTUDIANTES  │         │  DOCENTES  │  │ MANTENIMIENTO│  │ ALMACÉN   │         │ ADMINISTRATIVO │
└──────┬───────┘         └─────┬──────┘  └──────┬──────┘  └─────┬─────┘         └────────────────┘
       │                       │                │               │
       ├─ Regular              ├─ Cátedra       ├─ Planta       └─ Tecnológico/Repuestos
       ├─ Representante        ├─ Investigador  ├─ Eléctrico
       ├─ Monitor              └─ Decano        ├─ IT/Soporte
       └─ Candidato Grado                       └─ Servicios G.
```

---

### 👥 CATEGORÍA A: ESTUDIANTES (4 Sub-Perfiles)

#### A.1 Estudiante Regular
*   **Definición:** Alumno activo matriculado en cualquier programa académico de la institución.
*   **Permisos de Visualización (¿Qué puede ver?):**
    *   Mapa interactivo 2D del campus por bloques y pisos, identificando el estado físico de los salones (Verde: Libre/Disponible, Rojo: Clase en Curso, Gris: En Mantenimiento).
    *   Disponibilidad de cubículos de estudio y salas de cómputo en tiempo real.
    *   Catálogo general de la biblioteca, historial de libros prestados, fechas de vencimiento, multas acumuladas y estado de solicitudes de reserva de material físico.
    *   Cronograma de actividades culturales aprobadas en zonas comunes (plazoleta, cafetería).
*   **Acciones y Solicitudes (¿Qué puede hacer?):**
    *   Reservar de forma digital libros, revistas o tesis del catálogo de la biblioteca para recogida en ventanilla (UniBiblio Flow).
    *   Consultar su estado de cuenta de biblioteca (para matrículas) y descargar su pre-paz y salvo digital.
    *   Solicitar de manera instantánea el uso de un cubículo de estudio libre por un tiempo máximo paramétrico (ej. 2 horas).
*   **Restricciones de Seguridad (¿Qué NO puede hacer?):**
    *   Crear tickets de mantenimiento físico (daño de aires, videobeam, etc.) para salones oficiales, con el fin de evitar reportes falsos o malintencionados.
    *   Modificar de forma directa el estado de ocupación de cualquier aula de clase.
    *   Reservar espacios de gran aforo (Auditorio, Cafetería completa) de manera directa sin aval institucional.
*   **Deberes en el Sistema:**
    *   Confirmar la devolución de material bibliográfico mediante el escaneo del código QR en los puntos de control de biblioteca.

#### A.2 Representante Cultural o Deportivo (Estudiante Líder)
*   **Definición:** Estudiante debidamente avalado por la Vicerrectoría de Bienestar Universitario para liderar grupos colectivos (danza, canto, teatro, fútbol, baloncesto, debates).
*   **Permisos de Visualización (¿Qué puede ver?):**
    *   Mismo acceso que el Estudiante Regular, adicionando el calendario detallado de reservas de espacios no convencionales (Plazoleta Central, Cafetería, Auditorio, Salón de Espejos, Canchas Deportivas).
    *   Inventario de insumos deportivos o culturales disponibles para préstamo de eventos (parlantes portátiles, micrófonos, sillas, petos, balones).
*   **Acciones y Solicitudes (¿Qué puede hacer?):**
    *   Crear solicitudes formales de reserva de espacios públicos para ensayos, muestras artísticas o torneos con un plazo mínimo obligatorio de anticipación (ej. 48 horas).
    *   Especificar requisitos logísticos para el evento (cantidad de sillas, conexión a energía, sonido requerido, aforo estimado).
    *   Cargar el listado de participantes del evento (estudiantes y externos autorizados) para el control de ingreso en portería. Este registro se almacena en una estructura específica de `event_participants` para soporte de auditoría y control de acceso.
*   **Restricciones de Seguridad (¿Qué NO puede hacer?):**
    *   Reservar espacios de manera indefinida o recurrente sin un plan de trabajo aprobado y cargado en formato PDF.
    *   Aprobar de manera autónoma sus propias solicitudes (siempre requieren la firma digital de un Administrativo).
*   **Deberes en el Sistema:**
    *   Cargar evidencia fotográfica del estado del espacio comunitario una vez finalizada la actividad, garantizando que se entregó limpio y ordenado.

#### A.3 Monitor de Laboratorio o Auxiliar de Biblioteca (Estudiante Becado/Trabajador)
*   **Definición:** Estudiante con asignación especial que apoya operativamente los laboratorios de cómputo, electrónica o las ventanillas de biblioteca.
*   **Permisos de Visualización (¿Qué puede ver?):**
    *   Bandeja de solicitudes de préstamo de libros asignados a su puesto de atención.
    *   Inventario detallado de equipos y reactivos en el laboratorio a su cargo.
    *   Historial de usuarios que han ingresado o reservado equipos en su bloque específico.
*   **Acciones y Solicitudes (¿Qué puede hacer?):**
    *   Escanear el código QR del ticket digital del estudiante para procesar la entrega o devolución física de libros (UniBiblio Flow).
    *   Reportar daños rápidos de equipos del laboratorio a su cargo (ej. ratón dañado, teclado faltante, osciloscopio descalibrado).
    *   Registrar la asistencia física de estudiantes al laboratorio mediante escaneo de su carné digital. La asistencia se guarda en una tabla de `attendance_records` para trazabilidad y análisis de uso de espacios académicos.
*   **Restricciones de Seguridad (¿Qué NO puede hacer?):**
    *   Cerrar o dar por resueltos tickets de mantenimiento complejos asignados a personal técnico profesional.
    *   Dar de baja del inventario libros o equipos electrónicos (solo puede reportar la anomalía).
*   **Deberes en el Sistema:**
    *   Registrar el inventario físico al iniciar y finalizar su turno de monitoría mediante un formulario dinámico de validación.

#### A.4 Estudiante en Proceso de Grado o Matrícula
*   **Definición:** Estudiante en la fase final de su carrera académica o en periodo de renovación de matrícula financiera que requiere paz y salvos institucionales.
*   **Permisos de Visualización (¿Qué puede ver?):**
    *   Estado de su trámite de grado/matrícula de forma visual en una línea de tiempo paso a paso.
    *   Bandeja de alertas de documentos pendientes (tesis digital, firmas, entrega de materiales).
*   **Acciones y Solicitudes (¿Qué puede hacer?):**
    *   Cargar la versión final de su Proyecto de Grado/Tesis en formato PDF estructurado para el repositorio digital de la universidad.
    *   Solicitar de manera automatizada el "Paz y Salvo de Biblioteca" en un solo clic. Si el sistema no registra libros vencidos o multas, genera un documento PDF firmado criptográficamente por la institución de manera instantánea.
*   **Restricciones de Seguridad (¿Qué NO puede hacer?):**
    *   Solicitar el Paz y Salvo si tiene libros pendientes por entregar o multas por pagar en el módulo UniBiblio Flow.
*   **Deberes en el Sistema:**
    *   Firmar digitalmente (firma en pantalla táctil o OTP por correo institucional) la declaración de autoría y cesión de derechos de distribución académica de su tesis.

---

### 👥 CATEGORÍA B: DOCENTES Y TRABAJADORES (3 Sub-Perfiles)

#### B.1 Docente (Cátedra o Tiempo Completo)
*   **Definición:** Profesores encargados de impartir clases teóricas, prácticas o laboratorios en la institución.
*   **Permisos de Visualización (¿Qué puede ver?):**
    *   Su agenda de clases asignada vinculada a los salones físicos del campus.
    *   Estado detallado del salón asignado para su siguiente bloque de clase (Estado del aire acondicionado, disponibilidad de proyectores, conectores, etc.).
    *   Inventario de insumos del centro de copiado y recursos de apoyo docente.
*   **Acciones y Solicitudes (¿Qué puede hacer?):**
    *   **Reporte de Mantenimiento con un Solo Clic:** Escanear el código QR del salón y levantar un ticket de falla inmediata (ej. aire no enfría, videobeam sin señal, humedad en el techo). Deberá adjuntar obligatoriamente una foto o video de máximo 15 segundos capturado desde la cámara de la WebApp para evidenciar el estado inicial de la falla.
    *   **Solicitud Express de Insumos (Just-in-Time):** Botón de pánico/asistencia para solicitar un insumo crítico durante la clase (ej. "Necesito cable HDMI en el salón B-302", "Faltan marcadores y borrador"). Esta solicitud salta como alerta prioritaria al personal de Almacén/Tecnología.
    *   Reservar salones de clase para recuperaciones de horas o talleres extraordinarios.
*   **Restricciones de Seguridad (¿Qué NO puede hacer?):**
    *   Asignarse a sí mismo salones que se encuentren ocupados en el horario institucional.
    *   Aprobar solicitudes de mantenimiento físico que impliquen compras de repuestos de alto costo (estas pasan a aprobación del Administrador de Planta Física).
*   **Deberes en el Sistema:**
    *   Reportar cualquier anomalía física detectada en el aula al iniciar su bloque para deslindar responsabilidad de daños previos.

#### B.2 Director de Programa / Decano
*   **Definición:** Personal administrativo-académico encargado de la planeación curricular, asignación de docentes y gestión de laboratorios de su facultad.
*   **Permisos de Visualización (¿Qué puede ver?):**
    *   Estadísticas de uso y eficiencia de los salones asignados a su facultad.
    *   Métricas de fallas recurrentes de equipos de cómputo o proyectores en los laboratorios de su dependencia.
    *   Historial de tickets de mantenimiento creados por los docentes a su cargo y sus tiempos de resolución (MTTR).
*   **Acciones y Solicitudes (¿Qué puede hacer?):**
    *   Reasignar de manera masiva los horarios de clases a diferentes aulas en caso de una falla catastrófica de infraestructura (ej. salón inundado, cortocircuito).
    *   Solicitar al Área de Tecnología la adquisición o actualización de licencias de software para los computadores de los laboratorios de su facultad.
    *   Avalar solicitudes de eventos culturales de estudiantes bajo su tutoría académica.
*   **Restricciones de Seguridad (¿Qué NO puede hacer?):**
    *   Modificar bases de datos de inventario general de la universidad.
    *   Asignar técnicos de mantenimiento directamente sin la mediación del Administrador de Planta Física o Coordinador de IT.
*   **Deberes en el Sistema:**
    *   Aprobar de forma mensual los informes de uso de espacios de su facultad para la optimización de la planta física de la institución.

#### B.3 Funcionario Administrativo (Eventos / Admisiones)
*   **Definición:** Personal encargado de la logística general de la universidad, planeación de eventos de admisiones, grados y actividades institucionales de gran escala.
*   **Permisos de Visualización (¿Qué puede ver?):**
    *   Agenda global consolidada de todos los bloques, auditorios y zonas públicas del campus.
    *   Inventario de silletería, tarimas, sonido e iluminación institucional.
*   **Acciones y Solicitudes (¿Qué puede hacer?):**
    *   Bloquear de manera prioritaria espacios del campus para eventos institucionales (ej. "Día del Estudiante Unicamacho", "Feria de Admisiones").
    *   Revisar, aprobar u objetar (con comentarios) las solicitudes de reserva de espacios realizadas por los Representantes Culturales/Deportivos o Docentes.
*   **Restricciones de Seguridad (¿Qué NO puede hacer?):**
    *   Modificar la programación de clases reglamentarias programadas por Registro Académico (salvo concertación previa documentada en el sistema).
*   **Deberes en el Sistema:**
    *   Asignar personal de Logística/Servicios Generales para el acondicionamiento físico de los salones reservados para eventos institucionales.

---

### 👥 CATEGORÍA C: SOPORTE, MANTENIMIENTO E INFRAESTRUCTURA (4 Sub-Perfiles)

Esta categoría de usuarios gestiona y soluciona de forma operativa los problemas físicos del campus. Reciben las órdenes de trabajo a través de una consola optimizada para celulares, eliminando las órdenes de servicio en papel.

#### C.1 Técnico de Planta Física e Infraestructura
*   **Definición:** Personal experto en obras civiles, plomería, cerrajería, pintura, cubiertas y mobiliario institucional.
*   **Permisos de Visualización (¿Qué puede ver?):**
    *   Bandeja de tickets asignados específicamente a la categoría "Infraestructura/Planta Física".
    *   Ubicación precisa en el mapa 2D del aula afectada.
    *   Fotos y videos del daño cargados por el profesor en la fase de reporte.
*   **Acciones y Solicitudes (¿Qué puede hacer?):**
    *   Aceptar el ticket y cambiar el estado de la orden de trabajo a "En Proceso" (lo que cambia automáticamente el estado del salón en el mapa interactivo a "En Mantenimiento").
    *   Solicitar repuestos o insumos de construcción al Almacenista a través del sistema (ej. "Necesito chazo metálico de 1/4", bisagra de puerta, teja de fibrocemento").
    *   **Cierre de Ticket con Evidencia Obligatoria:** Registrar la solución de la falla cargando de manera obligatoria una foto o video final en la WebApp como evidencia física de la reparación del daño. Agregar descripción técnica de la labor realizada (ej. "Se reemplaza bisagra de puerta principal y se realiza ajuste de marco").
*   **Restricciones de Seguridad (¿Qué NO puede hacer?):**
    *   Aceptar o resolver tickets de categorías de soporte que no correspondan a su área técnica (ej. problemas de redes de datos o configuración de videobeam).
*   **Deberes en el Sistema:**
    *   Registrar el tiempo real empleado en cada reparación para calcular el indicador de eficiencia (horas hombre por labor).

#### C.2 Técnico de Redes Eléctricas y Electrónica
*   **Definición:** Ingeniero o técnico electricista certificado encargado del cableado de potencia, luminarias, tableros de control, tomas de corriente y subestaciones del campus.
*   **Permisos de Visualización (¿Qué puede ver?):**
    *   Tickets del área de "Redes Eléctricas/Iluminación/Tomas de Corriente".
    *   Diagramas de topología y distribución eléctrica del bloque del salón reportado (cargados en la sección de recursos del aula).
*   **Acciones y Solicitudes (¿Qué puede hacer?):**
    *   Aceptar y documentar órdenes de trabajo eléctricas.
    *   Solicitar materiales eléctricos (bombillos LED de x vatios, breakers, tomacorrientes GFCI, cable de cobre número 12) al Almacén.
    *   Marcar un salón en estado de "Riesgo Eléctrico Alto", lo que inhabilita el aula inmediatamente en el sistema y notifica al área académica para la reubicación de los estudiantes.
    *   Cerrar el ticket adjuntando foto de la toma de corriente reparada o luminaria reemplazada en funcionamiento con mediciones de voltaje en pantalla.
*   **Restricciones de Seguridad (¿Qué NO puede hacer?):**
    *   Efectuar reparaciones de transformadores principales sin la supervisión del Administrador de Planta Física y la generación de un permiso de trabajo en alturas/alta tensión digital.
*   **Deberes en el Sistema:**
    *   Verificar y certificar que la reparación cumple con el Reglamento Técnico de Instalaciones Eléctricas (RETIE) de Colombia, marcando un checklist digital obligatorio antes de cerrar la orden de trabajo.

#### C.3 Técnico de Tecnología y Soporte IT
*   **Definición:** Personal técnico encargado del mantenimiento preventivo y correctivo de los videobeams, televisores, computadores de laboratorio, sistemas de audio, redes de datos WiFi/Ethernet de los salones.
*   **Permisos de Visualización (¿Qué puede ver?):**
    *   Tickets asociados a "Soporte IT / Hardware de Aula / Redes de Datos".
    *   Consola de "Alertas de Insumos Express" generadas por los profesores en tiempo de clase (HDMI, adaptadores, marcadores).
*   **Acciones y Solicitudes (¿Qué puede hacer?):**
    *   Atender de forma prioritaria las Alertas Express de Aula, marcando "Insumo en Camino" en su celular (el docente ve en tiempo real que el técnico va hacia su aula).
    *   Aceptar y procesar tickets de configuración de software o reparación física de hardware de aula (ej. cambio de lámpara de videobeam, reinstalación de sistema operativo).
    *   Solicitar repuestos tecnológicos al Almacén de Electrónica (ej. tarjetas RAM, discos de estado sólido, cables HDMI, adaptadores de video USB-C a VGA).
    *   Cerrar tickets de tecnología con captura de pantalla o foto del videobeam proyectando de forma óptima la señal de prueba de video de la universidad.
*   **Restricciones de Seguridad (¿Qué NO puede hacer?):**
    *   Intervenir la red troncal (Core Router / Firewall) de la universidad sin autorización explícita escrita de la Dirección de Tecnología.
*   **Deberes en el Sistema:**
    *   Realizar pruebas de ancho de banda y conectividad del salón al finalizar el mantenimiento tecnológico, registrando el resultado de velocidad en el ticket de cierre.

#### C.4 Técnico de Servicios Generales y Logística (Aseo y Adecuación)
*   **Definición:** Auxiliares encargados del aseo del campus, desinfección, organización del mobiliario de los salones y preparación de espacios para eventos académicos y culturales.
*   **Permisos de Visualización (¿Qué puede ver?):**
    *   Calendario de salones y zonas comunes reservadas para eventos de danza, canto, exposiciones o reuniones.
    *   Órdenes de servicio de aseo y desinfección programadas.
*   **Acciones y Solicitudes (¿Qué puede hacer?):**
    *   Confirmar la preparación física de un espacio para un evento (ej. "Sillas organizadas en Plazoleta Central para evento de danza").
    *   Reportar daños en cortinas, persianas o necesidad de mantenimiento profundo de pisos.
    *   Marcar el salón de clase como "Limpio e Higienizado" al finalizar cada jornada (lo que habilita el color de aseo óptimo en la consola administrativa).
*   **Restricciones de Seguridad (¿Qué NO puede hacer?):**
    *   Intervenir cableados eléctricos o destapar carcasas de equipos tecnológicos (deberá escalar el caso a través del sistema a las áreas técnicas correspondientes).
*   **Deberes en el Sistema:**
    *   Registrar el inventario básico de implementos de aseo consumidos durante la adecuación de salones de gran aforo.

---

### 👥 CATEGORÍA D: ÁREA DE TECNOLOGÍA, ALMACÉN Y SUMINISTROS (1 Sub-Perfil)

#### D.1 Almacenista / Despachador de Componentes y Repuestos
*   **Definición:** Personal encargado de custodiar el inventario de repuestos, componentes de electrónica, herramientas, útiles escolares e insumos tecnológicos de la universidad.
*   **Permisos de Visualización (¿Qué puede ver?):**
    *   Bandeja de solicitudes de materiales emitidas por los técnicos de mantenimiento (Planta Física, Electricistas, Soporte IT) asociadas a un ticket de daño real y activo.
    *   Inventario completo, stocks mínimos y máximos de repuestos y componentes.
*   **Acciones y Solicitudes (¿Qué puede hacer?):**
    *   Aprobar o rechazar el despacho de repuestos y materiales a un técnico (ej. "Aprobado despacho de 10 metros de cable UTP Cat 6 y 1 conector RJ-45 para Ticket #482").
    *   Actualizar el inventario físico (Ingreso de compras, bajas por obsolescencia).
    *   Generar alertas automáticas de reabastecimiento cuando un repuesto tecnológico crítico llegue a su nivel mínimo de stock (ej. si quedan menos de 5 cables HDMI en inventario).
*   **Restricciones de Seguridad (¿Qué NO puede hacer?):**
    *   Despachar materiales o repuestos costosos sin un ID de ticket de mantenimiento válido registrado en el sistema.
    *   Modificar de forma unilateral los precios o proveedores cargados en la base de datos de compras.
*   **Deberes en el Sistema:**
    *   Efectuar arqueos físicos de inventario mensuales cruzando las salidas del sistema contra las existencias físicas del almacén, registrando el acta digital en el sistema.

---

### 👥 CATEGORÍA E: ADMINISTRACIÓN GENERAL (SÚPER-ADMIN) (1 Sub-Perfil)

#### E.1 Administrador del Campus (Planta Física / Dirección General)
*   **Definición:** Director de operaciones, infraestructura física y recursos de la universidad. Máxima autoridad en la toma de decisiones espaciales del sistema.
*   **Permisos de Visualización (¿Qué puede ver?):**
    *   Control absoluto y sin restricciones de todas las bases de datos de la aplicación.
    *   Dashboard analítico general con indicadores estratégicos de gestión (KPIs):
        *   Tiempo promedio de respuesta de mantenimiento por área técnica (MTTR).
        *   Eficiencia de uso de aulas (porcentaje de horas vacías vs. horas programadas).
        *   Tasa de recurrencia de daños por salón de clase (Aires, Proyectores).
        *   Métricas del sistema UniBiblio Flow (Libros más prestados, tasas de mora).
*   **Acciones y Solicitudes (¿Qué puede hacer?):**
    *   Crear, suspender o modificar cuentas de usuario de cualquier perfil y asignar permisos especiales (RBAC).
    *   Agregar nuevos bloques, pisos o aulas de clase al mapa interactivo de la universidad.
    *   Asignar tickets de mantenimiento complejos o de alto costo a técnicos externos de manera manual.
    *   Aprobar presupuestos de reparación de infraestructura que superen el límite operativo de los técnicos.
    *   Cerrar de manera forzada reservas de espacios comunitarios por motivos de fuerza mayor o seguridad nacional.
*   **Restricciones de Seguridad (¿Qué NO puede hacer?):**
    *   Ninguna restricción técnica dentro del sistema, sujeto únicamente a auditoría y logs de base de datos inalterables de sus acciones críticas.
*   **Deberes en el Sistema:**
    *   Revisar semanalmente el log de auditoría del sistema para validar el correcto funcionamiento de los flujos de autorización.

### 3.1 Lógica de autorización y validación de permisos

El sistema no se queda en un listado de roles estáticos. La autorización se ejecuta en cada acción importante del sistema y utiliza una combinación de:

- `roles` para mapear funciones institucionales,
- `permisos` para definir acciones concretas sobre recursos,
- `perfiles` para agrupar comportamientos operativos,
- `permisos_usuario` para excepciones y permisos temporales,
- `permisos_perfil` para políticas por grupos funcionales.

La secuencia de autorización es clara:

1.  El backend recibe la solicitud de un usuario.
2.  Identifica el recurso implicado (`espacios`, `tickets`, `reservas`, `libros`, `inventario`).
3.  Valida si el usuario tiene un permiso explícito en `permisos_usuario`.
4.  Si no existe permiso directo, revisa los permisos asociados a los roles activos del usuario en `roles_usuario` y `permisos_rol`.
5.  Si aún no se determina, consulta los permisos de perfil en `perfiles_usuario` y `permisos_perfil`.
6.  Si el permiso es condicional, evalúa `condition_json` con datos del contexto (estado del salón, categoría del ticket, horario de la reserva, stock disponible, registro de multas del estudiante).

Si una regla presenta una denegación explícita `allowed = false`, esta prevalece sobre cualquier permiso permisivo heredado por rol o perfil.

#### Ejemplos de reglas de negocio de permisos

- El permiso `crear_ticket` para `tickets` sólo se habilita si el usuario pertenece a un rol docente o administrativo y si el espacio reportado no está ya en `en_mantenimiento`.
- El permiso `aprobar_reserva` para `reservas` exige que el funcionario tenga el rol `funcionario` o `super_admin`, que la capacidad del espacio no supere el límite del bloque y que no exista colisión de horario con eventos preaprobados.
- El permiso `despachar_repuesto` para `inventario` se otorga al almacenista sólo si el ticket asociado está en estado `asignado` o `en_proceso`, si el repuesto existe en stock y si la categoría del ticket coincide con el área técnica solicitante.
- El permiso `generar_paz_salvo` para `libros` requiere que el estudiante no tenga préstamos vencidos ni multas activas; esa condición se expresa en `condition_json` y se evalúa antes de generar el PDF.

#### Auditoría y trazabilidad de cambios de permisos

Toda modificación de roles, permisos o perfiles se registra en `auditoria_permisos` con:

- el sujeto afectado (`usuario`, `rol`, `perfil`),
- el permiso modificado,
- la acción realizada (`conceder`, `revocar`, `modificar`, `mover`),
- el usuario que ejecutó el cambio,
- el motivo del ajuste.

Este registro impide movimientos opacos de permisos, garantiza la trazabilidad y permite revisar con detalle quién movió permisos desde un perfil a otro en casos de emergencia.

---

## 🔁 4. FLUJOS DE TRABAJO Y LÓGICA DE NEGOCIO DETALLADA

Para que el sistema funcione de manera fluida y libre de inconsistencias, se definen tres macro-procesos de negocio automatizados mediante lógica transaccional estricta.

### 🛠️ 4.1 Flujo de Mantenimiento Integral con Evidencias Fotográficas/Video

Este flujo garantiza la transparencia total y la trazabilidad del proceso de reparación física de los salones de la universidad.

```
┌─────────────────┐      Carga Foto/Video       ┌─────────────────┐
│ Profesor        ├────────────────────────────>│ Servidor API    │
│ (Abre Ticket)   │      y Georreferencia       │ (Asigna Ticket) │
└─────────────────┘                             └────────┬────────┘
                                                         │
                                                         ▼
┌─────────────────┐      Resuelve con Evidencia  ┌─────────────────┐
│ Técnico         │<────────────────────────────┤ Almacén         │
│ (Cierra Ticket) │      Fotográfica / Video    │ (Libera Insumo) │
└────────┬────────┘                             └─────────────────┘
         │
         ▼
┌─────────────────┐
│ Salón Cambia a  │  Notificación Automática al Profesor
│ "DISPONIBLE"    │
└─────────────────┘
```

1.  **Detección de Daño:** El Docente ingresa al salón de clase (ej. Salón A-402) y detecta que el videobeam proyecta con colores invertidos.
2.  **Apertura del Ticket:**
    *   El Docente escanea el código QR ubicado en el escritorio. La aplicación abre instantáneamente el formulario de reporte con el salón pre-seleccionado.
    *   El Docente selecciona la categoría "Videobeam / Soporte IT".
    *   Escribe una descripción breve (ej. "Colores invertidos en proyección, imposible dar clase de circuitos").
    *   **Evidencia Inicial:** El sistema requiere de forma obligatoria que capture una foto o un video corto (máximo 15 segundos) desde la cámara del celular. El archivo se almacena en la nube en una carpeta cifrada (`/tickets/evidences_before/`).
3.  **Procesamiento y Asignación:**
    *   La base de datos inserta el registro con estado `PENDIENTE_ASIGNACION`.
    *   El motor de mensajería (SSE) envía una notificación push al celular del Técnico de Soporte IT.
    *   El Administrador de Planta Física o el sistema de enrutamiento automático asigna el ticket al técnico correspondiente. El estado cambia a `ASIGNADO`.
4.  **Ejecución de la Reparación:**
    *   El Técnico de Soporte IT recibe la alerta, lee la descripción y reproduce el video inicial del docente para comprender el daño antes de desplazarse.
    *   El Técnico se desplaza al salón. Al iniciar la labor, marca en su celular "Iniciar Trabajo". El estado del ticket cambia a `EN_PROCESO`, y en el mapa dinámico el salón Salón A-402 se colorea automáticamente en Gris (En Mantenimiento).
    *   El Técnico detecta que el cable VGA del proyector está dañado en sus pines internos.
    *   El Técnico solicita un nuevo cable HDMI al Almacén de Electrónica mediante la WebApp de soporte.
    *   El Almacenista ve el ticket activo, autoriza la salida del cable HDMI y el stock de almacén se descuenta de forma automatizada.
    *   El Técnico instala el cable nuevo, configura el videobeam y realiza pruebas.
5.  **Cierre de Ticket con Evidencia Final:**
    *   Para dar por terminada la labor, el Técnico debe presionar "Cerrar Ticket".
    *   La WebApp le exige capturar una foto o video corto final de la pantalla del salón proyectando con colores nítidos.
    *   La evidencia final se guarda en `/tickets/evidences_after/`.
    *   El Técnico escribe una justificación de cierre (ej. "Se reemplaza cable VGA defectuoso por cable HDMI nuevo despachado por almacén. Pruebas de color y resolución exitosas").
    *   El estado del ticket cambia a `RESUELTO`.
    *   En el mapa interactivo de la universidad, el salón Salón A-402 vuelve instantáneamente a su color Verde (Disponible).
    *   El Docente que reportó el daño recibe una notificación automática de cierre por correo electrónico con las fotos de la solución.

---

### 📚 4.2 Flujo UniBiblio Flow (Préstamo, QR, Devolución y Paz y Salvo Automático)

Este flujo automatiza y digitaliza por completo el departamento de biblioteca de la Unicamacho, eliminando la firma en papel y el soporte manual de paz y salvos.

```
┌───────────────────────┐   Reserva de Libro   ┌───────────────────────┐
│ Estudiante            ├─────────────────────>│ Servidor UniBiblio    │
│ (WebApp Reservas)     │   en Catálogo 24/7   │ (Verifica Libre/Multa)│
└───────────────────────┘                      └──────────┬────────────┘
                                                          │  Aprobación e Ticket QR
                                                          ▼
┌───────────────────────┐   Firma en Pantalla  ┌───────────────────────┐
│ Auxiliar de Biblioteca│<─────────────────────┤ Estudiante            │
│ (Escanea QR de Libro) │   e Inserta Préstamo │ (Presenta QR en Caja) │
└──────────┬────────────┘                      └───────────────────────┘
           │
           ▼  Control de Vencimientos Automatizado
┌───────────────────────┐
│ Paz y Salvo Digital   │  Generación PDF con Código de Barras
│ Firmado al Instante   │  para Matrícula / Grado
└───────────────────────┘
```

1.  **Reserva del Libro:**
    *   El Estudiante ingresa al módulo de Biblioteca desde su celular, busca un libro (ej. "Cálculo de una Variable, de James Stewart") y ve que hay 3 unidades disponibles.
    *   Presiona "Reservar". El sistema valida dos condiciones críticas en milisegundos:
        1. Que el estudiante no tenga deudas o multas activas en biblioteca.
        2. Que el estudiante no tenga más de 3 libros activos en su poder.
    *   Si pasa las validaciones, el sistema genera un "Ticket de Reserva Digital" con un código QR exclusivo y válido por un máximo de 24 horas. El libro físico queda temporalmente bloqueado en el inventario de biblioteca.
2.  **Recogida Física en Ventanilla:**
    *   El Estudiante se acerca a la ventanilla de biblioteca de la Unicamacho y presenta el código QR en la pantalla de su celular.
    *   El Auxiliar de Biblioteca (o Monitor) escanea el código QR del estudiante con una tablet o lector de código de barras conectado al computador. El sistema despliega en pantalla la información de la reserva y la foto del estudiante para validación de identidad.
    *   El Auxiliar toma el libro Stewart físico y escanea la etiqueta de código de barras o tag de radiofrecuencia (RFID) del libro para asociarlo al préstamo.
    *   El sistema le solicita al Estudiante firmar directamente sobre la pantalla táctil de su celular o de la tablet del auxiliar para confirmar que recibe el material de forma óptima.
    *   El sistema registra el préstamo en la base de datos de PostgreSQL, asignando la fecha límite de devolución (ej. 8 días calendario). El estado de la reserva cambia a `ENTREGADO` y se envía un correo automático al estudiante con los términos del préstamo.
3.  **Proceso de Devolución Física:**
    *   El Estudiante regresa el libro Stewart en la ventanilla de biblioteca antes del vencimiento.
    *   El Auxiliar escanea el código de barras del libro Stewart físico.
    *   El sistema detecta automáticamente si la devolución se realiza dentro del plazo permitido.
        *   **Si es a tiempo:** El préstamo cambia a estado `DEVUELTO_EXITOSO`, se libera la unidad en la base de datos de inventario y se emite un recibo digital al estudiante.
        *   **Si presenta retraso:** El sistema cambia el préstamo a `DEVUELTO_MORA` y calcula de forma automática la multa diaria acumulada basada en las tarifas vigentes parametrizadas por la universidad. El perfil del estudiante queda temporalmente en estado `BLOQUEADO` para nuevos préstamos y reservas hasta que realice el pago.
4.  **Generación de Paz y Salvo Automático (Zero Papel):**
    *   Al final del semestre, cuando el estudiante se va a matricular o graduar, el módulo financiero del sistema universitario consulta de manera automatizada a través de un servicio REST API el estado del estudiante en la biblioteca.
    *   Si el estudiante no tiene libros pendientes ni multas por pagar en `UniBiblio Flow`, el sistema genera un archivo PDF oficial firmado criptográficamente de forma instantánea. Este documento se inyecta directamente en el expediente académico del estudiante, eliminando por completo la necesidad de ir a la biblioteca física a firmar paz y salvos presenciales.

---

### 🎭 4.3 Flujo de Gestión de Reservas de Espacios de Gran Aforo para Eventos Estudiantiles

Este flujo permite ordenar y descentralizar el uso de áreas recreativas, plazoletas y auditorías de la universidad, evitando el cruce de eventos ruidosos con clases o exámenes teóricos.

1.  **Solicitud de Reserva:** El Representante Cultural (ej. líder del grupo de Danza Folclórica de la Unicamacho) ingresa a la plataforma web y desea reservar la Plazoleta Central para un ensayo especial.
2.  **Diligenciamiento de Parámetros:**
    *   El sistema exige que la reserva se realice con una anticipación mínima obligatoria de 48 horas.
    *   El Representante selecciona la zona "Plazoleta Central".
    *   Elige el bloque de horas (ej. Viernes de 4:00 PM a 6:00 PM).
    *   Indica el tipo de actividad, aforo esperado (ej. 40 personas), requerimiento de logística (ej. 2 mesas, 1 parlante, 10 sillas) y carga un archivo en formato PDF con la justificación cultural y el plan del ensayo.
3.  **Validaciones de Cruces Lógicos:**
    *   El sistema evalúa de forma inmediata:
        *   Que no exista otra reserva aprobada en el mismo espacio y horario.
        *   Que el espacio no se encuentre deshabilitado por reparaciones locativas del área de Planta Física.
        *   Que no se afecte el dictado de clases teóricas de alta concentración en los salones adyacentes de acuerdo con la programación de aulas (ej. evitar música de alto volumen al lado de un bloque de aulas donde se programan exámenes finales).
4.  **Aprobación Administrativa:**
    *   La solicitud queda en estado `PENDIENTE_APROBACION` y salta en la bandeja de la Secretaría de Bienestar Universitario / Administrativo de Eventos.
    *   El Funcionario Administrativo revisa el PDF, evalúa los recursos de silletería solicitados y el aforo.
    *   **Decisión del Administrativo:**
        *   **Si es Aprobado:** El estado de la reserva cambia a `APROBADO`. El sistema notifica al Representante de Danza y envía una orden de trabajo automática al personal de Logística/Aseo para que acondicionen la plazoleta con las mesas y sillas solicitadas para esa hora.
        *   **Si es Rechazado:** El estado cambia a `RECHAZADO` y el sistema obliga al funcionario a escribir las observaciones detalladas del rechazo (ej. "No es posible el ensayo a esa hora porque en el Auditorio adyacente se realiza una conferencia académica formal. Sugerimos trasladar el ensayo al Salón de Espejos").
5.  **Finalización de la Reserva y Auditoría:**
    *   Terminado el ensayo, la WebApp le notifica al Representante que debe cerrar la reserva.
    *   El Representante debe tomar y cargar una foto del espacio limpio y las sillas organizadas en los puntos de acopio para garantizar que la zona se devolvió en perfectas condiciones. El sistema registra esta métrica de responsabilidad del estudiante para futuras aprobaciones de reservas.

---

## 🗄️ 5. MODELO DE BASE DE DATOS Y RELACIONES (POSTGRESQL CONCEPTUAL)

Para asegurar la alta velocidad de respuesta y la integridad referencial de los datos, se propone un modelo relacional robusto sobre **PostgreSQL**, aprovechando sus características especiales de indexación y tipos de datos JSONB para flexibilidad en evidencias fotográficas e inventario dinámico.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              DIAGRAMA DE ENTIDAD-RELACIÓN                              │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│   ┌───────────────┐           ┌──────────────────┐           ┌────────────────────┐    │
│   │    usuarios    │1         *│      espacios     │1         *│tickets_mantenimiento│    │
│   ├───────────────┤           ├──────────────────┤           ├────────────────────┤    │
│   │ id (UUID-PK)  ├──────────>│ id (UUID-PK)     ├──────────>│ id (UUID-PK)       │    │
│   │ name (VARCHAR)│           │ name (B-202)     │           │ espacio_id (FK)    │    │
│   │ email (UNIQUE)│           │ block (VARCHAR)  │           │ reported_by (FK)   │    │
│   │ role (ENUM)   │           │ floor (INT)      │           │ assigned_to (FK)   │    │
│   └───────┬───────┘           │ status (ENUM)    │           │ status (ENUM)      │    │
│           │                   └────────┬─────────┘           └─────────┬──────────┘    │
│           │                            │                               │               │
│           │1                           │1                              │1              │
│           ▼                            ▼                               ▼               │
│   ┌──────────────────────────────────────────────┐           ┌────────────────────┐    │
│   │              reservas_espacios               │           │  evidencias_ticket │    │
│   ├──────────────────────────────────────────────┤           ├────────────────────┤    │
│   │ id (UUID-PK)                                 │           │ id (UUID-PK)       │    │
│   │ applicant_user_id (FK)                       │           │ ticket_id (FK)     │    │
│   │ space_id (FK)                                │           │ file_url (VARCHAR) │    │
│   │ start_time / end_time (TIMESTAMP)            │           │ file_type (ENUM)   │    │
│   │ status (ENUM)                                │           │ stage (ENUM)       │    │
│   └──────────────────────────────────────────────┘           └────────────────────┘    │
│                                                                                        │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 📋 5.1 Diccionario Conceptual de Tablas Clave

#### Tabla: `usuarios`
Almacena el registro de todas las personas autenticadas en el sistema.
*   `id` (UUID, Primary Key): Identificador único inalterable de cada persona.
*   `identification_number` (VARCHAR, Unique, Indexed): Cédula de ciudadanía o código institucional del estudiante/docente/técnico.
*   `name` (VARCHAR): Nombre completo del usuario.
*   `email` (VARCHAR, Unique, Indexed): Correo electrónico institucional (ej. `@unicamacho.edu.co`).
*   `role` (ENUM): Rol principal del usuario (estudiante_regular, estudiante_representante, estudiante_monitor, docente, decano, funcionario, tecnico_planta, tecnico_electricista, tecnico_it, tecnico_aseo, almacenista, super_admin).
*   `password_hash` (VARCHAR): Contraseña encriptada con algoritmos de alta seguridad (Bcrypt).
*   `status` (BOOLEAN): Estado del usuario (Activo / Suspendido).
*   `created_at` (TIMESTAMP WITH TIME ZONE).

#### Tabla: `espacios`
Almacena la planta física de la universidad (salones, auditorios, laboratorios, cubículos, plazoletas).
*   `id` (UUID, Primary Key).
*   `name` (VARCHAR, Indexed): Código identificador del espacio (ej. "Salón B-302", "Auditorio Central", "Plazoleta Sede Sur").
*   `sede` (ENUM): Identificación de la sede ("norte_av6", "sur").
*   `block` (VARCHAR): Letra o nombre del bloque (ej. "Bloque A", "Bloque B").
*   `floor` (INTEGER): Piso del salón (ej. 1, 2, 3, 4).
*   `capacity` (INTEGER): Aforo máximo de personas permitido.
*   `amenities` (JSONB): Características especiales del salón (ej. `{"aire_acondicionado": true, "videobeam": true, "computadores": 30, "pizarra_vidrio": true}`). El índice GIN en esta columna permite búsquedas de salones por recursos en milisegundos.
*   `status` (ENUM): Estado operativo del salón en tiempo real (`disponible`, `ocupado_clase`, `ocupado_evento`, `en_mantenimiento`).
*   `created_at` (TIMESTAMP WITH TIME ZONE).

#### Tabla: `unidades_academicas`
Registra las unidades académicas y administrativas de la institución para soportar dependencias, facultades y programas.
*   `id` (UUID, Primary Key).
*   `name` (VARCHAR, Indexed): Nombre de la unidad académica o administrativa (ej. "Facultad de Ingenierías", "Programa de Sistemas", "Registro Académico").
*   `type` (VARCHAR): Tipo de unidad (`facultad`, `programa`, `dependencia`, `administrativa`).
*   `parent_unit_id` (UUID, Foreign Key -> `unidades_academicas.id`, Nullable): Permite jerarquías de dependencia entre unidades.
*   `description` (TEXT, Nullable): Descripción del ámbito funcional de la unidad.
*   `created_at` (TIMESTAMP WITH TIME ZONE).

#### Tabla: `usuario_unidades_academicas`
Relaciona usuarios con su unidad académica o dependencia para consultas de métricas de decanos y directores de programa.
*   `id` (UUID, Primary Key).
*   `user_id` (UUID, Foreign Key -> `usuarios.id`, Indexed): Usuario asociado a la unidad.
*   `academic_unit_id` (UUID, Foreign Key -> `unidades_academicas.id`, Indexed): Unidad a la que pertenece el usuario.
*   `role_in_unit` (VARCHAR, Nullable): Rol del usuario dentro de la unidad (`docente`, `decano`, `director`, `coordinador`).
*   `assigned_at` (TIMESTAMP WITH TIME ZONE).

#### Tabla: `horarios_clases`
Registra la programación de clases y actividades académicas para evitar colisiones con reservas de eventos y para mostrar la agenda de los docentes.
*   `id` (UUID, Primary Key).
*   `course_name` (VARCHAR): Nombre del curso o actividad académica.
*   `instructor_user_id` (UUID, Foreign Key -> `usuarios.id`, Indexed): Docente responsable de la clase.
*   `academic_unit_id` (UUID, Foreign Key -> `unidades_academicas.id`, Nullable): Unidad académica que dicta la clase.
*   `space_id` (UUID, Foreign Key -> `espacios.id`, Indexed): Espacio físico donde se dicta la clase.
*   `start_time` (TIMESTAMP WITH TIME ZONE, Indexed): Fecha y hora de inicio de la clase.
*   `end_time` (TIMESTAMP WITH TIME ZONE, Indexed): Fecha y hora de finalización de la clase.
*   `status` (ENUM): Estado de la programación (`programado`, `cancelado`, `pospuesto`).
*   `created_at` (TIMESTAMP WITH TIME ZONE).

#### Tabla: `tickets_mantenimiento`
Registra el historial de daños y el proceso de reparación física de los salones.
*   `id` (UUID, Primary Key).
*   `space_id` (UUID, Foreign Key -> `espacios.id`, Indexed): ID del salón donde se presentó la falla.
*   `reported_by_user_id` (UUID, Foreign Key -> `usuarios.id`, Indexed): ID del docente o funcionario que abrió el ticket de soporte.
*   `assigned_to_user_id` (UUID, Foreign Key -> `usuarios.id`, Nullable, Indexed): ID del técnico de soporte asignado.
*   `category` (ENUM): Tipo de daño (`planta_fisica`, `electrico`, `tecnologico_it`, `servicios_generales`).
*   `description` (TEXT): Detalles explicativos del reporte inicial.
*   `resolution_description` (TEXT, Nullable): Detalles de la reparación ejecutada por el técnico.
*   `status` (ENUM, Indexed): Estado de la orden de trabajo (`abierto_pendiente`, `asignado`, `en_proceso`, `esperando_repuesto`, `resuelto`, `cancelado`).
*   `priority` (ENUM): Urgencia de la atención (`baja`, `media`, `alta`, `critica_express`).
*   `started_at` (TIMESTAMP WITH TIME ZONE, Nullable): Fecha y hora en que el técnico inició la labor en sitio.
*   `resolved_at` (TIMESTAMP WITH TIME ZONE, Nullable): Fecha y hora en que se cerró el ticket con éxito.
*   `created_at` (TIMESTAMP WITH TIME ZONE).

#### Tabla: `evidencias_ticket`
Registra los archivos multimedia capturados antes y después del mantenimiento para control de calidad.
*   `id` (UUID, Primary Key).
*   `ticket_id` (UUID, Foreign Key -> `tickets_mantenimiento.id`, Indexed): Relación al ticket correspondiente.
*   `file_url` (VARCHAR): Ruta del archivo multimedia en la nube de forma segura (ej. Supabase Storage, S3 o servidor seguro local).
*   `file_type` (ENUM): Formato del archivo (`foto`, `video`).
*   `stage` (ENUM): Fase de captura (`antes_reparacion`, `despues_reparacion`).
*   `created_at` (TIMESTAMP WITH TIME ZONE).

#### Tabla: `reservas_espacios`
Registra las solicitudes de alquiler o reserva de salones y zonas públicas para eventos académicos o culturales.
*   `id` (UUID, Primary Key).
*   `space_id` (UUID, Foreign Key -> `espacios.id`, Indexed): El salón o zona solicitada.
*   `applicant_user_id` (UUID, Foreign Key -> `usuarios.id`, Indexed): El estudiante representante o docente que solicita el espacio.
*   `approved_by_user_id` (UUID, Foreign Key -> `usuarios.id`, Nullable): El funcionario administrativo que aprueba o rechaza el espacio.
*   `purpose` (VARCHAR): Título o motivo del evento (ej. "Ensayo Danza Folclórica", "Mesa Redonda sobre Paz y Sistemas").
*   `details` (TEXT): Requerimientos logísticos del evento (sonido, silletería).
*   `start_time` (TIMESTAMP WITH TIME ZONE, Indexed): Fecha y hora de inicio de la reserva.
*   `end_time` (TIMESTAMP WITH TIME ZONE, Indexed): Fecha y hora de finalización del evento.
*   `status` (ENUM, Indexed): Estado del trámite (`pendiente`, `aprobado`, `rechazado_con_observaciones`, `cancelado_usuario`).
*   `rejection_reason` (TEXT, Nullable): Justificación en caso de rechazo del espacio.
*   `justification_pdf_url` (VARCHAR, Nullable): Ruta de la carta de aval o plan de trabajo.
*   `evidence_delivery_url` (VARCHAR, Nullable): Foto cargada al finalizar el evento como prueba de orden y limpieza.
*   `created_at` (TIMESTAMP WITH TIME ZONE).

#### Tabla: `participantes_evento`
Registra los asistentes autorizados a un evento aprobado dentro de la reserva.
*   `id` (UUID, Primary Key).
*   `reservation_id` (UUID, Foreign Key -> `reservas_espacios.id`, Indexed): Reserva asociada al evento.
*   `participant_user_id` (UUID, Foreign Key -> `usuarios.id`, Nullable): Usuario registrado en el sistema.
*   `external_name` (VARCHAR, Nullable): Nombre del participante externo autorizado.
*   `external_document` (VARCHAR, Nullable): Documento de identidad del participante externo.
*   `role` (VARCHAR): Papel del participante en el evento (`asistente`, `organizador`, `externo`).
*   `created_at` (TIMESTAMP WITH TIME ZONE).

#### Tabla: `recursos_reserva`
Registra los requerimientos logísticos específicos de una reserva de espacio.
*   `id` (UUID, Primary Key).
*   `reservation_id` (UUID, Foreign Key -> `reservas_espacios.id`, Indexed): Reserva asociada.
*   `resource_name` (VARCHAR): Nombre del recurso solicitado (ej. `sillas`, `parlante`, `tarima`).
*   `quantity` (INTEGER): Cantidad solicitada.
*   `unit` (VARCHAR): Unidad de medida (`unidad`, `juego`, `metro`).
*   `status` (ENUM): Estado de la provisión (`pendiente`, `aprobado`, `entregado`, `rechazado`).
*   `provided_by_user_id` (UUID, Foreign Key -> `usuarios.id`, Nullable): Responsable de logística o almacén.
*   `created_at` (TIMESTAMP WITH TIME ZONE).

#### Tabla: `registros_asistencia`
Registra las asistencias físicas en laboratorios, aulas y eventos de la universidad.
*   `id` (UUID, Primary Key).
*   `user_id` (UUID, Foreign Key -> `usuarios.id`, Indexed): Usuario que asistió.
*   `space_id` (UUID, Foreign Key -> `espacios.id`, Indexed): Espacio donde se registró la asistencia.
*   `reservation_id` (UUID, Foreign Key -> `reservas_espacios.id`, Nullable): Reserva asociada cuando aplica.
*   `recorded_by_user_id` (UUID, Foreign Key -> `usuarios.id`, Nullable): Usuario que registró la asistencia (monitor, auxiliar, docente).
*   `method` (VARCHAR): Método de registro (`qr`, `carné`, `manual`).
*   `status` (ENUM): Estado de asistencia (`presente`, `ausente`, `tarde`).
*   `recorded_at` (TIMESTAMP WITH TIME ZONE): Momento de la lectura del carné o QR.
*   `created_at` (TIMESTAMP WITH TIME ZONE).

#### Tabla: `entregas_tesis`
Registra las entregas de proyectos de grado, tesis y documentos finales de estudiante.
*   `id` (UUID, Primary Key).
*   `user_id` (UUID, Foreign Key -> `usuarios.id`, Indexed): Estudiante que envía la tesis.
*   `title` (VARCHAR): Título del proyecto de grado o tesis.
*   `description` (TEXT, Nullable): Resumen breve del documento entregado.
*   `document_url` (VARCHAR): Ruta segura al archivo PDF o documento digital.
*   `status` (ENUM): Estado de la entrega (`en_revision`, `aprobado`, `rechazado`).
*   `reviewed_by_user_id` (UUID, Foreign Key -> `usuarios.id`, Nullable): Administrador o tutor que valida la entrega.
*   `review_comments` (TEXT, Nullable): Observaciones asociadas a la revisión.
*   `submitted_at` (TIMESTAMP WITH TIME ZONE).
*   `reviewed_at` (TIMESTAMP WITH TIME ZONE, Nullable).
*   `created_at` (TIMESTAMP WITH TIME ZONE).

#### Tabla: `solicitudes_paz_salvo`
Registra las solicitudes de paz y salvo y otros certificados de trámite académico o administrativo.
*   `id` (UUID, Primary Key).
*   `user_id` (UUID, Foreign Key -> `usuarios.id`, Indexed): Estudiante que solicita el trámite.
*   `clearance_type` (VARCHAR): Tipo de trámite (`biblioteca`, `financiera`, `administrativa`, `grado`).
*   `status` (ENUM): Estado de la solicitud (`pendiente`, `aprobado`, `rechazado`, `generado`).
*   `requested_by_user_id` (UUID, Foreign Key -> `usuarios.id`, Nullable): Usuario que creó la solicitud si es un gestor.
*   `approved_by_user_id` (UUID, Foreign Key -> `usuarios.id`, Nullable): Usuario que aprobó la solicitud.
*   `approval_notes` (TEXT, Nullable): Observaciones sobre la resolución del trámite.
*   `generated_document_url` (VARCHAR, Nullable): Ruta del documento digital generado.
*   `created_at` (TIMESTAMP WITH TIME ZONE).

#### Tabla: `libros`
Catálogo físico de los libros y recursos impresos de la biblioteca.
*   `id` (UUID, Primary Key).
*   `barcode` (VARCHAR, Unique, Indexed): Código de barras físico del libro para escaneo rápido.
*   `title` (VARCHAR, Indexed): Título del libro.
*   `author` (VARCHAR): Nombre del autor.
*   `edition` (VARCHAR): Edición y año de publicación.
*   `category` (VARCHAR): Área académica (Sistemas, Electrónica, Administración, etc.).
*   `total_copies` (INTEGER): Cantidad total comprada por la universidad.
*   `available_copies` (INTEGER): Unidades físicas en estante listas para préstamo.
*   `created_at` (TIMESTAMP WITH TIME ZONE).

#### Tabla: `prestamos_libros`
Historial de transacciones de préstamos físicos y cálculo automático de multas (UniBiblio Flow).
*   `id` (UUID, Primary Key).
*   `book_id` (UUID, Foreign Key -> `libros.id`, Indexed): Libro prestado.
*   `user_id` (UUID, Foreign Key -> `usuarios.id`, Indexed): Estudiante o docente receptor.
*   `loan_officer_user_id` (UUID, Foreign Key -> `usuarios.id`): Auxiliar que despachó el libro.
*   `status` (ENUM, Indexed): Estado del préstamo (`reservado`, `entregado`, `devuelto_a_tiempo`, `devuelto_con_mora`, `perdido`).
*   `reserve_qr_code` (VARCHAR, Unique): Token único de reserva digital.
*   `due_date` (TIMESTAMP WITH TIME ZONE): Fecha límite obligatoria de devolución del material.
*   `returned_at` (TIMESTAMP WITH TIME ZONE, Nullable): Fecha real de entrega física en biblioteca.
*   `digital_signature_url` (VARCHAR, Nullable): Firma digital del estudiante en formato SVG/PNG para blindaje jurídico.
*   `accrued_fine` (DECIMAL(10,2), Default 0.00): Valor de la multa generada automáticamente por mora.
*   `created_at` (TIMESTAMP WITH TIME ZONE).

#### Tabla: `insumos_almacen`
Catálogo de insumos, repuestos y componentes físicos del almacén.
*   `id` (UUID, Primary Key).
*   `sku` (VARCHAR, Unique, Indexed): Código interno del insumo o repuesto.
*   `name` (VARCHAR, Indexed): Nombre corto del componente o insumo.
*   `category` (VARCHAR): Categoría del item (`electronica`, `plomeria`, `material_aseo`, `mobiliario`).
*   `unit` (VARCHAR): Unidad de medida (`unidad`, `metro`, `litro`, `caja`).
*   `quantity_on_hand` (INTEGER): Cantidad disponible en almacén.
*   `minimum_stock` (INTEGER): Nivel mínimo de stock para alerta de reabastecimiento.
*   `location` (VARCHAR): Ubicación física del insumo en el almacén.
*   `metadata` (JSONB, Nullable): Datos adicionales flexibles (`{"marca":"LG","modelo":"HDMI2.0"}`).
*   `created_at` (TIMESTAMP WITH TIME ZONE).

#### Tabla: `solicitudes_materiales`
Registra las solicitudes de despacho de insumos y repuestos por parte de los técnicos.
*   `id` (UUID, Primary Key).
*   `requested_by_user_id` (UUID, Foreign Key -> `usuarios.id`, Indexed): Técnico o responsable que solicita el material.
*   `requested_for_ticket_id` (UUID, Foreign Key -> `tickets_mantenimiento.id`, Nullable): Ticket asociado a la solicitud.
*   `inventory_item_id` (UUID, Foreign Key -> `insumos_almacen.id`, Indexed): Insumo solicitado.
*   `quantity_requested` (INTEGER): Cantidad solicitada.
*   `quantity_approved` (INTEGER, Nullable): Cantidad aprobada por el almacenista.
*   `approved_by_user_id` (UUID, Foreign Key -> `usuarios.id`, Nullable): Almacenista, supervisor o administrador que aprobó la solicitud.
*   `status` (ENUM, Indexed): Estado de la solicitud (`pendiente`, `aprobado`, `rechazado`, `despachado`, `cancelado`).
*   `requested_at` (TIMESTAMP WITH TIME ZONE).
*   `approved_at` (TIMESTAMP WITH TIME ZONE, Nullable).
*   `fulfilled_at` (TIMESTAMP WITH TIME ZONE, Nullable).

#### Tabla: `movimientos_inventario`
Audita los cambios de inventario por ingresos, salidas, ajustes y transferencias.
*   `id` (UUID, Primary Key).
*   `inventory_item_id` (UUID, Foreign Key -> `insumos_almacen.id`, Indexed): Item modificado.
*   `change_type` (ENUM): Tipo de movimiento (`ingreso`, `salida`, `ajuste`, `transferencia`, `devolucion`).
*   `quantity` (INTEGER): Cantidad que cambia en el inventario.
*   `related_ticket_id` (UUID, Foreign Key -> `tickets_mantenimiento.id`, Nullable).
*   `related_request_id` (UUID, Foreign Key -> `solicitudes_materiales.id`, Nullable).
*   `performed_by_user_id` (UUID, Foreign Key -> `usuarios.id`, Indexed): Usuario que realizó el movimiento.
*   `note` (TEXT, Nullable): Comentario del ajuste.
*   `created_at` (TIMESTAMP WITH TIME ZONE).

#### Tabla: `notificaciones`
Registra alertas y mensajes para usuarios del sistema.
*   `id` (UUID, Primary Key).
*   `user_id` (UUID, Foreign Key -> `usuarios.id`, Nullable): Usuario receptor de la notificación.
*   `channel` (ENUM): Medio de entrega (`email`, `push`, `in_app`).
*   `category` (VARCHAR): Categoría de la notificación (`ticket`, `reserva`, `biblioteca`, `inventario`).
*   `message` (TEXT): Texto de la notificación.
*   `target_resource_type` (VARCHAR, Nullable): Recurso asociado (`tickets`, `reservas`, `libros`, `inventario`).
*   `target_resource_id` (UUID, Nullable): ID del recurso asociado.
*   `read_at` (TIMESTAMP WITH TIME ZONE, Nullable).
*   `created_at` (TIMESTAMP WITH TIME ZONE).

### 📌 5.2 Modelo de permisos y perfiles centralizado (RBAC + ABAC)

Para que la base de datos sea grande, robusta y cubra todos los perfiles, se propone un modelo unificado de control de acceso. En lugar de listas rígidas por rol, la base de datos contiene una sola tabla de permisos y una estructura escalable que permite mover permisos entre roles, usuarios y perfiles.

#### Tabla: `roles`
*   `id` (UUID, Primary Key): Identificador único del rol.
*   `name` (VARCHAR, Unique, Indexed): Nombre lógico del rol (`estudiante_regular`, `estudiante_representante`, `docente`, `tecnico_it`, `almacenista`, `super_admin`).
*   `description` (TEXT): Descripción del propósito del rol.
*   `category` (VARCHAR): Categoría funcional del rol (`academico`, `operativo`, `administrativo`, `infraestructura`).
*   `created_at` (TIMESTAMP WITH TIME ZONE).

#### Tabla: `permisos`
*   `id` (UUID, Primary Key): Permiso único.
*   `name` (VARCHAR, Unique, Indexed): Nombre corto del permiso (`ver_estado_espacio`, `crear_ticket`, `aprobar_reserva`, `despachar_repuesto`, `generar_paz_salvo`).
*   `resource_type` (VARCHAR): Recurso al que aplica el permiso (`espacios`, `tickets`, `reservas`, `libros`, `inventario`, `usuarios`, `reportes`).
*   `action` (VARCHAR): Acción permitida (`leer`, `crear`, `actualizar`, `eliminar`, `aprobar`, `asignar`, `cerrar`, `exportar`).
*   `scope` (VARCHAR): Ámbito de aplicación (`global`, `sede`, `bloque`, `piso`, `espacio`, `modulo`).
*   `condition_json` (JSONB, Nullable): Reglas dinámicas de permiso para ABAC (`{"max_capacity": 100, "allowed_days": ["lunes","martes"], "requires_approval": true}`).
*   `is_core` (BOOLEAN): Indica si el permiso es parte del núcleo del sistema.
*   `created_at` (TIMESTAMP WITH TIME ZONE).

#### Tabla: `permisos_rol`
*   `id` (UUID, Primary Key).
*   `role_id` (UUID, Foreign Key -> `roles.id`, Indexed).
*   `permission_id` (UUID, Foreign Key -> `permisos.id`, Indexed).
*   `allowed` (BOOLEAN, Default TRUE): Si el rol tiene permiso permitido.
*   `created_at` (TIMESTAMP WITH TIME ZONE).

#### Tabla: `roles_usuario`
*   `id` (UUID, Primary Key).
*   `user_id` (UUID, Foreign Key -> `usuarios.id`, Indexed).
*   `role_id` (UUID, Foreign Key -> `roles.id`, Indexed).
*   `assigned_by_user_id` (UUID, Foreign Key -> `usuarios.id`, Nullable): Quien asignó el rol.
*   `assigned_at` (TIMESTAMP WITH TIME ZONE).
*   `expires_at` (TIMESTAMP WITH TIME ZONE, Nullable): Fecha de vencimiento opcional para roles temporales.

#### Tabla: `permisos_usuario`
*   `id` (UUID, Primary Key).
*   `user_id` (UUID, Foreign Key -> `usuarios.id`, Indexed).
*   `permission_id` (UUID, Foreign Key -> `permisos.id`, Indexed).
*   `allowed` (BOOLEAN, Default TRUE): Permiso directo al usuario, que puede complementar o anular el rol.
*   `scope_resource_id` (UUID, Nullable): Identificador de recurso específico cuando el permiso es de ámbito fino.
*   `created_at` (TIMESTAMP WITH TIME ZONE).

#### Tabla: `auditoria_permisos`
*   `id` (UUID, Primary Key).
*   `subject_type` (VARCHAR): Tipo de sujeto (`usuario`, `rol`, `perfil`).
*   `subject_id` (UUID): ID del sujeto afectado.
*   `permission_id` (UUID, Foreign Key -> `permisos.id`).
*   `action` (VARCHAR): Acción realizada (`conceder`, `revocar`, `modificar`, `mover`).
*   `performed_by_user_id` (UUID, Foreign Key -> `usuarios.id`).
*   `reason` (TEXT, Nullable): Motivo del cambio.
*   `created_at` (TIMESTAMP WITH TIME ZONE).

#### Tabla: `perfiles`
*   `id` (UUID, Primary Key).
*   `name` (VARCHAR, Unique, Indexed): Nombre del perfil (`Perfil Biblioteca`, `Perfil Mantenimiento`, `Perfil Eventos`, `Perfil Operativo de Planta`).
*   `description` (TEXT): Explicación de la agrupación de permisos.
*   `default_role_id` (UUID, Foreign Key -> `roles.id`, Nullable): Rol recomendado para el perfil.
*   `created_at` (TIMESTAMP WITH TIME ZONE).

#### Tabla: `permisos_perfil`
*   `id` (UUID, Primary Key).
*   `profile_id` (UUID, Foreign Key -> `perfiles.id`, Indexed).
*   `permission_id` (UUID, Foreign Key -> `permisos.id`, Indexed).
*   `allowed` (BOOLEAN, Default TRUE).
*   `created_at` (TIMESTAMP WITH TIME ZONE).

#### Tabla: `perfiles_usuario`
*   `id` (UUID, Primary Key).
*   `user_id` (UUID, Foreign Key -> `usuarios.id`, Indexed).
*   `profile_id` (UUID, Foreign Key -> `perfiles.id`, Indexed).
*   `assigned_at` (TIMESTAMP WITH TIME ZONE).

### 🧠 5.3 Gestión de permisos por categorías de perfiles y repositorios de roles

La arquitectura de permisos centralizada permite que cada categoría de perfil tenga su propia “capa” de acceso a datos. De este modo, el almacén de datos no depende de tablas múltiples por perfil, sino de una sola tabla de permisos enlazada con roles y perfiles.

- `roles` define funciones básicas de la organización.
- `perfiles` define grupos de usuario con propósito operacional.
- `permisos` define acciones sobre recursos.
- `permisos_rol` mapea roles a permisos.
- `permisos_usuario` permite excepciones o autorizaciones temporales.
- `auditoria_permisos` registra cada movimiento, por ejemplo cuando un super-admin mueve permisos de `tecnico_it` a `almacenista` para un caso de urgencia.

### 🔗 5.4 Ejemplo de permisos y casos de uso

1.  Permiso `ver_estado_espacio`:
    *   Recurso: `espacios`
    *   Acción: `leer`
    *   Roles comunes: `estudiante_regular`, `docente`, `funcionario`, `super_admin`.
    *   Escenario: Un estudiante ve el estado de ocupación y disponibilidad de auditorios.

2.  Permiso `crear_ticket`:
    *   Recurso: `tickets`
    *   Acción: `crear`
    *   Roles comunes: `docente`, `funcionario`, `super_admin`.
    *   Condición: `condition_json` permite validar que solo se cree un ticket con reserva activa y que el usuario tenga perfil docente o administrativo.
    *   Ejemplo de condición: `{"allowed_roles": ["docente", "funcionario"], "requires_space_status": ["ocupado_clase", "en_mantenimiento"]}`.

3.  Permiso `aprobar_reserva`:
    *   Recurso: `reservas`
    *   Acción: `aprobar`
    *   Roles comunes: `funcionario`, `super_admin`.
    *   Condición: `condition_json` puede contemplar `{"requires_approval_from_role": "funcionario", "max_capacity": 200}`.
    *   Escenario: Un funcionario administrativo decide si aprueba o rechaza una reserva de la plazoleta con más de 50 asistentes.

4.  Permiso `despachar_repuesto`:
    *   Recurso: `inventario`
    *   Acción: `asignar`
    *   Roles comunes: `almacenista`, `super_admin`.
    *   Condición: `condition_json` permite `{"requires_ticket_status": ["asignado", "en_proceso"], "allowed_categories": ["tecnologico_it", "electrico"]}`.
    *   Escenario: El almacenista despacha un repuesto asociado a un ticket activo de soporte IT.

5.  Permiso `generar_paz_salvo`:
    *   Recurso: `libros`
    *   Acción: `exportar`
    *   Roles comunes: `bibliotecario`, `funcionario`, `super_admin`.
    *   Condición: `condition_json` valida `{"user_has_no_pending_loans": true, "user_has_no_fines": true}` antes de generar el documento.
    *   Escenario: El sistema genera el paz y salvo digital automáticamente para un estudiante que cumple las condiciones de biblioteca.

6.  Permiso `mover_permiso`:
    *   Recurso: `usuarios`
    *   Acción: `actualizar`
    *   Roles comunes: `super_admin`.
    *   Condición: `condition_json` permite `{"requires_audit_log": true, "restriction": "only_super_admin"}`.
    *   Escenario: El super-admin mueve un permiso específico desde el perfil de `tecnico_it` al perfil de `almacenista` durante una emergencia de soporte.

### 5.5 Evaluación del modelo de permisos en la base de datos

La evaluación de permisos se realiza con consultas combinadas sobre `permisos_usuario`, `roles_usuario`, `permisos_rol`, `perfiles_usuario` y `permisos_perfil`.

Un motor de autorización típico usa una función que recibe:

- `user_id`,
- `resource_type`,
- `action`,
- `resource_id`,
- `context_json` con atributos adicionales.

Una posible consulta SQL simplificada sería:

```sql
WITH roles_usuario AS (
  SELECT role_id
  FROM roles_usuario
  WHERE user_id = :user_id
), permisos_rol AS (
  SELECT p.*
  FROM permisos p
  JOIN permisos_rol rp ON rp.permission_id = p.id
  WHERE rp.role_id IN (SELECT role_id FROM roles_usuario)
), permisos_usuario AS (
  SELECT p.*
  FROM permisos p
  JOIN permisos_usuario up ON up.permission_id = p.id
  WHERE up.user_id = :user_id
)
SELECT DISTINCT p.*
FROM (
  SELECT * FROM permisos_usuario
  UNION ALL
  SELECT * FROM permisos_rol
) p
WHERE p.resource_type = :resource_type
  AND p.action = :action
  AND (p.condition_json IS NULL OR jsonb_path_exists(p.condition_json, :condition_path));
```

Este esquema permite:

- aplicar `permisos_usuario` como excepción inmediata,
- heredar permisos desde roles y perfiles,
- evaluar condiciones dinámicas en JSONB,
- mover permisos de un perfil a otro sin abrir nuevas tablas por perfil,
- normalizar la estructura del catálogo de acciones.

#### Índices recomendados

- índice compuesto en `permisos_usuario(user_id, permission_id)`,
- índice compuesto en `permisos_rol(role_id, permission_id)`,
- índice GIN en `permisos(condition_json)` para acelerar evaluaciones ABAC,
- índices en `perfiles_usuario(user_id)` y `permisos_perfil(profile_id)`.

#### Ejemplo práctico de autorización en un flujo de reserva

1.  Un funcionario administrativo intenta aprobar una reserva.
2.  El backend consulta si existe permiso `aprobar_reserva` para ese usuario.
3.  Verifica `permisos_usuario` directo. Si el usuario no tiene permiso explícito, busca en roles y perfiles.
4.  Contrasta el estado del espacio, la capacidad, la hora y la categoría del evento con los valores de `condition_json`.
5.  Si todo cumple, marca la reserva como `APROBADO`; si no, genera un mensaje de rechazo con la regla específica que falló.

---
## 📱 6. ESTRATEGIA DE DISEÑO RESPONSIBA Y DISPOSITIVOS MÓVILES (WEB APP)

### 📲 6.1 Experiencia Móvil (Celulares y Tablets del Personal de Campo)

La interfaz móvil está dirigida al **Docente**, al **Estudiante** y, especialmente, al **Técnico de Mantenimiento / Servicios Generales / Auxiliar**. Su objetivo es la acción táctil rápida, la ligereza y el acceso instantáneo al hardware nativo del celular.

```
┌────────────────────────────────────────────────────────┐
│                   VISTA MÓVIL (Celular)                │
├────────────────────────────────────────────────────────┤
│  [Escáner QR Integrado]   -> Abre Cámara al Instante   │
│                                                        │
│  [Botones de Acción de 44px] -> Tamaño táctil óptimo   │
│                                                        │
│  [Ficha Rápida del Salón] -> Disponible/Ocupado        │
│                                                        │
│  [Formularios Sencillos]  -> Entrada rápida de datos   │
│                                                        │
│  [Notificaciones Push]     -> Alertas vibratorias      │
│                                                        │
└────────────────────────────────────────────────────────┘
```

1.  **Interactividad Táctil Avanzada (Touch Targets):**
    *   Todos los botones y disparadores interactivos tienen un tamaño físico mínimo de **44px por 44px** (estándar Apple UX / Android Accessibility), previniendo errores de pulsación accidental en pantallas pequeñas de estudiantes o técnicos que cargan herramientas en sus manos.
    *   Uso de gestos fluidos (deslizar a la izquierda para archivar una alerta, deslizar a la derecha para aceptar una tarea de mantenimiento).
2.  **Integración de Hardware Nativo (Cámara e inputs directos):**
    *   **Escáner QR Integrado en el Navegador:** El sistema cuenta con un lector QR por cámara que se ejecuta directamente desde la interfaz web (utilizando bibliotecas seguras como `html5-qrcode` o las API nativas del navegador). No requiere descargar aplicaciones nativas de la App Store.
    *   **Captura Directa de Foto y Video:** Al levantar o cerrar un ticket de mantenimiento, el sistema abre la cámara nativa del celular mediante el atributo HTML `capture="camera"`. Los archivos se comprimen en tiempo de ejecución en el cliente antes de ser enviados por red para no consumir los planes de datos celulares de los técnicos o profesores.
    *   **Módulo de Firma Táctil en Ventanilla:** En la biblioteca, el estudiante firma la entrega del libro directamente en la pantalla del celular o de la tablet del auxiliar usando un lienzo dinámico en HTML5 Canvas con suavizado de trazo vectorial.
3.  **Resiliencia Fuera de Red (Offline Cache - IndexedDB):**
    *   En las laderas o sótanos de los bloques de la universidad donde la señal celular e internet inalámbrico es deficiente, la WebApp funciona de manera asíncrona.
    *   Los técnicos pueden ver sus tickets asignados del día cargados en la base de datos local `IndexedDB` de su navegador.
    *   Si cierran un ticket en un salón sin internet, la evidencia final (foto/video) y el log de finalización se encolan localmente. Al detectar red móvil o WiFi estable de la universidad, el sistema realiza una sincronización en segundo plano (Background Sync) enviando los reportes ordenados y resolviendo colisiones.
4.  **Consumo Eficiente de Memoria RAM:**
    *   La versión móvil prescinde de tablas de datos gigantescas o mapas de calor vectoriales complejos para mantener el consumo de RAM del celular del técnico o estudiante en un rango menor a **100MB**, evitando cierres de la app por falta de recursos de hardware en dispositivos gama baja.

---

### 💻 6.2 Experiencia Desktop / PC (Consolas Administrativas y Auditorías)

La interfaz de escritorio está dirigida a los **Súper-Administradores**, **Decanos**, **Almacenistas** y **Funcionarios de Bienestar**. Su diseño prioriza la visualización de datos complejos, la toma de decisiones estratégicas, el análisis geoespacial y la generación de reportes masivos.

```
┌────────────────────────────────────────────────────────┐
│                  VISTA ESCRITORIO (PC)                 │
├────────────────────────────────────────────────────────┤
│  [Mapa 2D Completo]       -> Visualización interactiva │
│                                                        │
│  [Tablas de Gestión]      -> Filtros avanzados y orden │
│                                                        │
│  [Gráficas e Indicadores] -> Métricas de rendimiento   │
│                                                        │
│  [Generación de Reportes] -> Descarga de PDFs oficiales│
│                                                        │
│  [Módulo de Inventario]   -> Gestión de stocks         │
│                                                        │
└────────────────────────────────────────────────────────┘
```

1.  **Dashboard Analítico de Gestión e Indicadores de Rendimiento (KPIs):**
    *   La página de inicio de administración muestra una estructura bento-grid con analítica visual dinámica utilizando Recharts o D3.js:
        *   Mide el **MTTR** (Mean Time To Repair - Tiempo promedio en reparar fallas) segmentado por tipo de técnico y bloque.
        *   Tasa de ocupación física real de los salones frente a las clases matriculadas.
        *   Historial financiero de biblioteca (multas recaudadas, libros en mora de devolución).
2.  **Tablas de Datos Densas de Gestión de Recursos (Data Tables):**
    *   Visualización de miles de registros de alumnos, libros y tickets en un formato de tabla responsiva de alta densidad de información.
    *   Herramientas avanzadas integradas de ordenamiento, filtrado múltiple (ej. filtrar tickets por "Sede Sur", categoría "Eléctrico", estado "En Proceso" y urgencia "Alta") y exportación directa de bases de datos a formatos estándar como Excel (CSV) o reportes formales PDF firmados digitalmente.
3.  **Editor y Visor Geográfico de Campus 2D Completo:**
    *   En pantalla grande, el administrador puede visualizar el plano arquitectónico completo (cargado en formato SVG optimizado) de la universidad.
    *   Puede hacer zoom, arrastrar la vista y seleccionar cualquier aula de manera interactiva.
    *   **Editor Locativo:** Permite arrastrar elementos del inventario directamente sobre los salones en el plano interactivo de la universidad (ej. "arrastrar un videobeam al salón C-102" para que el inventario del salón se actualice de inmediato).
4.  **Gestor de Aprobaciones de Espacios de Gran Escala:**
    *   Consola de doble pantalla para el Funcionario de Eventos: a la izquierda ve el calendario mensual completo de todas las actividades para evitar colisiones logísticas, y a la derecha el formulario de solicitud con el PDF cargado por el estudiante listo para revisión y clic de aprobación rápida.

---

## 🛡️ 7. SEGURIDAD, REGULACIÓN Y LEGISLACIÓN COLOMBIANA

Un proyecto de grado de ingeniería en sistemas moderno de nivel científico en Colombia debe garantizar el estricto cumplimiento del marco legal y regulatorio vigente.

1.  **Ley de Protección de Datos Personales (Ley 1581 de 2012 de Colombia):**
    *   El sistema recopila fotos, videos de evidencias de mantenimiento con siluetas de personas, firmas táctiles en biblioteca y datos de contacto de estudiantes y docentes de la Unicamacho.
    *   La base de datos cifra la información confidencial mediante algoritmos AES-256.
    *   Al registrarse en la plataforma, el sistema despliega el aviso obligatorio de "Autorización de Tratamiento de Datos Personales (Habeas Data)" que el usuario debe autorizar formalmente en el sistema, registrando la fecha, hora y hash de consentimiento en su perfil.
2.  **Reglamento Técnico de Instalaciones Eléctricas (RETIE) de Colombia:**
    *   Para el cierre de tickets de la categoría de mantenimiento eléctrico, el sistema despliega de forma obligatoria un formulario dinámico de validación RETIE que el Técnico Electricista debe llenar como certificación técnica de que la reparación no representa un riesgo de incendio o cortocircuito para los estudiantes y cumple con las normas del Ministerio de Minas y Energía de Colombia.
3.  **Normativa de Conciliación y Conflictos de Convivencia (Ley 2220 de 2022 de Colombia):**
    *   En el caso del módulo de reservas de espacios estudiantiles, si se presenta un conflicto por uso del espacio público o un incidente de daños a la infraestructura física durante una actividad, la plataforma cuenta con un registro inmutable (Logs de auditoría inalterables en PostgreSQL con marcas temporales SHA-256) que sirve como prueba técnica ante los comités de convivencia universitarios o para el flujo formal de conciliación digital de conflictos, garantizando el debido proceso técnico.

---

## 📊 8. MÉTRICAS EXPERIMENTALES PARA LA SUSTENTACIÓN DE GRADO

Para asegurar que tu jurado calificador de la **Institución Universitaria Antonio José Camacho** te otorgue una calificación perfecta (Sustentación Laureada), el documento escrito de tu tesis debe reflejar un análisis estadístico y de rendimiento riguroso basado en métricas de ingeniería reales y objetivas del sistema:

1.  **Latencia del Canal de Tiempo Real (SSE):**
    *   Registrar el tiempo en milisegundos desde que el docente presiona el "Botón de Insumos Express" en su celular hasta que el sonido de alerta prioritaria se reproduce en la consola de IT del Almacenista. (Métrica esperada: `< 250ms` mediante Server-Sent Events).
2.  **Reducción del MTTR (Mean Time To Repair):**
    *   Comparar la media de tiempo que le tomaba a la universidad reparar un aire dañado antes del sistema (ej. 5 días hábiles debido a la burocracia de reportes presenciales) contra el tiempo de resolución registrado de forma autónoma en la plataforma (ej. `< 4 horas` debido al ruteo ágil, evidencias tempranas y despacho ágil de repuestos).
3.  **Porcentaje de Reducción de Pérdidas de Biblioteca (UniBiblio):**
    *   Demostrar mediante análisis de datos de PostgreSQL la disminución de libros vencidos o perdidos gracias al sistema automático de recordatorios por sistema y el bloqueo automático de usuarios morosos antes de que puedan solicitar nuevos recursos.
4.  **Carga del Navegador en Dispositivos de Campo (Lighthouse Metrics):**
    *   Métricas de rendimiento en móviles de la WebApp: First Contentful Paint (FCP) de `< 1.2 segundos`, tamaño de la app en caché local de `< 10MB` y consumo promedio estable de memoria de ejecución de la RAM móvil de `< 80MB` para garantizar la viabilidad en dispositivos de gama baja.

---

## 🧩 9. TECNOLOGÍAS PROPUESTAS Y ARQUITECTURA TÉCNICA

La propuesta técnica de SmartCampus Unicamacho se construye sobre principios de escalabilidad, mantenibilidad, seguridad y compatibilidad con la infraestructura de una institución pública promedio. El objetivo es presentar una solución viable como prototipo y como sistema de producción para una universidad de mediano tamaño.

### 9.1 Stack Tecnológico recomendado

#### 9.1.1 Frontend

- **Framework:** React con TypeScript. La elección garantiza componentes reutilizables, tipado estricto y ecosistema sólido.
- **Rendering:** Single Page Application (SPA) con prerenderizado parcial y rutas públicas/privadas.
- **PWA:** Service worker con cacheo inteligente para recursos estáticos y API cacheada en modo offline. Permite notificaciones push y uso offline parcial.
- **UI/UX:** Design system basado en componentes accesibles (Botones 44px, contrastes AA/AAA, navegación por teclado).
- **Bibliotecas clave:** React Router, Zustand o Redux Toolkit para estado local, React Query para datos remotos, Tailwind CSS o Chakra UI para estilos consistentes.
- **Accesibilidad:** etiquetado ARIA, manejo de foco, compatibilidad con lectores de pantalla y estructuras semánticas para usuarios con discapacidad.

#### 9.1.2 Backend

- **Framework:** Node.js con NestJS (recomendado) o Express con arquitectura modular.
- **Segmentos de API:** servicios separados para autenticación, usuarios, espacios, tickets, reservas, inventario, auditoría, biblioteca.
- **Patrones de diseño:** controlador-servicio-repositorio, inyección de dependencias, interceptores para logging y manejo global de errores.
- **Comunicación en tiempo real:** Server-Sent Events (SSE) para notificaciones de estado livianas; WebSocket opcional para paneles de operación en tiempo real.
- **Seguridad del API:** validación de payload con Zod o Joi, rate limiting, CORS configurado según sedes y dominios institucionales.

#### 9.1.3 Base de datos

- **Motor:** PostgreSQL 15+.
- **Particularidades:** tablas normalizadas con relaciones claras, índices en campos más consultados y uso de `JSONB` para atributos flexibles.
- **Campos JSONB clave:** evidencias multimedia, `condition_json` de permisos, atributos de `amenities` de espacios.
- **Extensiones recomendadas:** `pgcrypto` para generación de UUID y hashes, `pg_stat_statements` para monitoreo de consultas, `btree_gin` para índices mixtos.

#### 9.1.4 Autenticación y autorización

- **JWT:** tokens accesibles y refresh tokens con expiración controlada.
- **OAuth2:** adaptador opcional para SSO institucional si UNICAMACHO dispone de un proveedor como Azure AD, Keycloak o Okta.
- **RBAC + ABAC:** modelo de permisos basado en roles y condiciones contextuales. El token JWT puede incluir `role_id`, `profile_id` y `tenant_id` si se requiere segmentación por sede.
- **MFA:** recomendación de habilitar autenticación multifactor para perfiles administrativos o super-admin.

#### 9.1.5 Almacenamiento de archivos y multimedia

- **Files:** usar objetos con firma temporal (`signed URLs`) para carga segura.
- **Proveedor:** Supabase Storage, S3 o DigitalOcean Spaces.
- **Criterios:** versionado de objetos, cifrado en reposo, contenido validado en el cliente, limitación de tamaño y formatos permitidos.
- **Retención:** políticas de limpieza automática para evidencias antiguas si el sistema debe liberar espacio.

#### 9.1.6 DevOps y CI/CD

- **Contenedores:** Docker para separar frontend, backend y migraciones.
- **CI/CD:** GitHub Actions o GitLab CI con pasos de lint, test, build y deploy.
- **Entornos:** desarrollo local, staging y producción.
- **Infraestructura as Code:** plantillas simples de Docker Compose y manifiestos YAML si se usa Kubernetes o un servicio PaaS.

#### 9.1.7 Observabilidad

- **Logging estructurado:** JSON logs con identificadores de request, usuario y correlación de transacciones.
- **Métricas:** latencia de API, tiempo de respuesta del DB, tasa de errores 4xx/5xx.
- **Alertas:** notificaciones ante caídas de servicios, errores críticos o uso excesivo de recursos.

### 9.2 Arquitectura general del sistema

La arquitectura se plantea en cuatro capas principales más la infraestructura de soporte. Cada capa debe ser independiente y fácilmente testable.

#### 9.2.1 Capa de presentación

- **PWA móvil/desktop:** la misma aplicación en el navegador con adaptaciones según el tamaño de pantalla.
- **Módulos clave:** login, dashboard, gestión de tickets, reservaciones, biblioteca, inventario, notificaciones.
- **Experiencia offline:** cacheo estático y sincronización periódica para usar funciones esenciales sin red.
- **Accesos contextualizados:** menús y opciones de la UI dependen de permisos calculados en el backend.

#### 9.2.2 Capa de negocio

- **API Gateway:** punto único de entrada para la lógica de negocio.
- **Servicios modulares:** cada recurso (usuarios, permisos, tickets, reservas, inventario) se implementa en su propio módulo.
- **Lógica de autorización:** middleware global que consulta permisos RBAC/ABAC antes de ejecutar cualquier operación crítica.
- **Reglas de negocio:** claras, auditable y con trazabilidad en `auditoria_permisos`.

#### 9.2.3 Capa de datos

- **Modelo relacional:** tablas normalizadas y relaciones de integridad referencial.
- **Consultas optimizadas:** vistas materializadas para reportes de uso de espacios, estado de inventario y métricas de mantenimiento.
- **Cache transaccional:** uso de índices GIN en JSONB, índices compuestos para consultas frecuentes y tablas de resumen para consultas analíticas.

#### 9.2.4 Capa de mensajería y sincronización

- **Server-Sent Events:** canal push para notificaciones de estado en vivo sin sobrecarga de WebSockets.
- **Mensajería en segundo plano:** colas ligeras (Redis Streams o RabbitMQ opcional) para trabajos asíncronos como envío de emails, generación de PDFs y procesamiento de evidencias.
- **Sincronización offline:** `IndexedDB` en cliente móvil para guardar cambios temporales y sincronizarlos cuando vuelva la conectividad.

#### 9.2.5 Capa de auditoría y compliance

- **Auditoría de cambios:** registro detallado en `auditoria_permisos` y `movimientos_inventario`.
- **Integridad:** hashes y marcas de tiempo para evidencias y cambios críticos.
- **Visibilidad:** reportes de trazabilidad para comités internos y para el proceso administrativo de conciliación y seguridad.

### 9.3 Infraestructura de despliegue

Una solución universitaria debe desplegarse con bajo costo operativo y alta disponibilidad. Esta sección detalla las opciones prácticas.

#### 9.3.1 Arquitectura de despliegue recomendada

- **Frontend:** servido desde un CDN o un bucket estático con cacheo inteligente.
- **Backend:** contenedor en VPS, PaaS o instancia administrada.
- **Base de datos:** PostgreSQL administrado o servidor Docker con volúmenes persistentes.
- **Almacenamiento:** servicios de objetos con firma y políticas de retención.

#### 9.3.2 Entornos de despliegue

- **Desarrollo local:** Docker Compose para levantar servicios esenciales.
- **Staging:** entorno de validación que replica producción en la medida de lo posible.
- **Producción:** configuración segura con HTTPS, certificados automáticos (Let's Encrypt) y balanceo de carga si corresponde.

#### 9.3.3 Orquestación y automatización

- **Docker Compose:** ideal para desarrollo y demostraciones.
- **Kubernetes / Nomad:** recomendado si la universidad dispone de experiencia y recursos para orquestación.
- **PaaS simple:** Railway, Render o Heroku para minimizar la complejidad operacional.

#### 9.3.4 Seguridad del despliegue

- **HTTPS obligatorio:** TLS en todas las comunicaciones.
- **Firewall / seguridad de red:** restringir accesos directos a bases de datos y servicios internos.
- **Secretos gestionados:** usar variables de entorno seguras o servicios de vault.
- **Backups y restauración:** snapshot diario de PostgreSQL y copia de archivos multimedia fuera de sitio.

#### 9.3.5 Gestión de versiones

- **Versionado semántico:** etiquetas `v1.0.0`, `v1.1.0`.
- **Ramas:** `main`, `develop`, `release/*`.
- **Despliegue controlado:** rollback automático ante fallas críticas.

### 9.4 Diseño detallado de la solución técnica

#### 9.4.1 Diagrama de componentes

```
[Usuario Móvil/PC] --> [PWA] --> [API Gateway] --> [Módulos de Negocio]
                                         |--> [Auth Service]
                                         |--> [Permisos RBAC/ABAC]
                                         |--> [Ticket Service]
                                         |--> [Reserva Service]
                                         |--> [Biblioteca Service]
                                         |--> [Inventario Service]
                                         |--> [Auditoría Service]
                                         v
                                     [PostgreSQL]
                                         |
                                         v
                                   [Almacenamiento de Archivos]
```

#### 9.4.2 Capas de seguridad y protección de datos

- **Protección en tránsito:** TLS 1.2+ en todas las rutas.
- **Protección en reposo:** cifrado AES-256 en objetos y en la base de datos.
- **Control de acceso:** políticas de permiso estrictas, segmentos de datos por sede y perfiles.
- **Gestión de sesiones:** refresh tokens guardados de forma segura y expiración corta del access token.
- **Política de contraseñas:** mínimo 12 caracteres, complejidad y bloqueo tras varios intentos fallidos.
- **Observabilidad de seguridad:** alertas por múltiples intentos fallidos y accesos desde ubicaciones anómalas.

#### 9.4.3 Estrategia de resiliencia

- **Reintentos exponenciales:** en llamadas externas y operaciones de archivo.
- **Circuit breaker:** para evitar cascadas de fallas si un servicio está caído.
- **Fallbacks:** mensajes claros al usuario cuando partes del sistema no estén disponibles.
- **Disponibilidad local:** la PWA debe permitir consulta de información crítica en caché si la red se interrumpe durante un proceso.

### 9.5 Mapa de tecnologías recomendado

| Capa | Tecnología recomendada | Justificación |
|---|---|---|
| Frontend | React + TypeScript | Ecosistema amplio, componentes tipados, PWA nativo |
| Estado | React Query + Zustand | Manejo de datos remotos y cache local ligero |
| UI | Tailwind CSS / Chakra UI | Estilos rápidos, accesibles y consistentes |
| Backend | NestJS | Arquitectura modular, inyección de dependencias y escalabilidad |
| Base de datos | PostgreSQL | Transaccionalidad fuerte y JSONB flexible |
| Archivos | S3/Supabase Storage | Escalabilidad y almacenamiento seguro |
| CI/CD | GitHub Actions | Integración continua automatizada |
| Contenedores | Docker | Portabilidad y desarrollo reproducible |
| Mensajería | SSE / Redis | Notificaciones en vivo y trabajo asíncrono |
| Autenticación | JWT + OAuth2 | Seguridad, compatibilidad con SSO institucional |

## 📅 10. PLAN DE IMPLEMENTACIÓN Y CRONOGRAMA

### 10.1 Fases del proyecto

Cada fase se entrega con artefactos claros y revisiones puntuales.

1.  **Fase de análisis y diseño (2 semanas)**
    *   Entregables: mapa de stakeholders, mapa de procesos, requerimientos funcionales y no funcionales, diagrama de casos de uso.
    *   Actividades: entrevistas con usuarios clave, definición de perfiles, validación de flujos de tickets y reservas.
    *   Salida: especificación técnica y producto mínimo viable (MVP) alineado con el alcance de tesis.

2.  **Fase de arquitectura y prototipado (2 semanas)**
    *   Entregables: wireframes móviles/desktop, prototipo de alta fidelidad, diagrama ER, diagrama de componentes y diagrama de despliegue.
    *   Actividades: elección de stack, prototipo de pantallas principales, diseño de la API y modelo de datos.
    *   Salida: base técnica validada y prototipo de interacción aprobado.

3.  **Fase de desarrollo inicial (4 semanas)**
    *   Entregables: backend con autenticación, frontend con login y dashboard inicial, pruebas unitarias básicas.
    *   Actividades: implementación de estructuras de usuario, módulos de espacios y tickets, integración inicial con base de datos.
    *   Salida: MVP funcional básico con flujo de login, listado de espacios y creación de tickets.

4.  **Fase de integración de módulos clave (4 semanas)**
    *   Entregables: módulos de reservas, biblioteca, inventario y auditoría integrados.
    *   Actividades: creación de flujos completos, integración de notificaciones y manejo de roles/permisos.
    *   Salida: versión beta del sistema que cubre las principales necesidades operativas.

5.  **Fase de pruebas y ajuste (3 semanas)**
    *   Entregables: reporte de pruebas, plan de correcciones, métricas de rendimiento.
    *   Actividades: pruebas funcionales, pruebas de integración, pruebas de carga y de seguridad.
    *   Salida: sistema ajustado, documentado y listo para presentación.

6.  **Fase de documentación y entrega (2 semanas)**
    *   Entregables: informe final de tesis, manual de usuario, presentación de sustentación y anexos técnicos.
    *   Actividades: redacción del documento, armado del demo, preparación de la defensa.
    *   Salida: tesis completa y material soportable para el jurado.

### 10.2 Cronograma detallado

#### Semana 1-2: Análisis y definición
- Reuniones con stakeholders.
- Mapeo de procesos de mantenimiento, reservas y biblioteca.
- Matriz de requisitos.
- Definición de perfiles, roles y permisos.

#### Semana 3-4: Diseño y prototipado
- Wireframes de la PWA.
- Definición de arquitectura técnica.
- Diagrama ER y modelo de datos.
- Validación de la solución propuesta.

#### Semana 5-8: Desarrollo del MVP
- Autenticación y gestión de usuarios.
- Registro, gestión y visualización de espacios.
- Creación de tickets y flujos de mantenimiento.
- Implementación básica de `permisos` y `roles`.

#### Semana 9-12: Integración de módulos amplios
- Módulo de reservas de espacios.
- UniBiblio Flow (préstamo, devolución, paz y salvo).
- Gestion de insumos e inventario.
- Auditoría y trazabilidad.

#### Semana 13-15: Pruebas y ajustes
- Pruebas funcionales completas.
- Pruebas de carga y rendimiento.
- Correcciones y mejoras de UX.
- Validación de seguridad.

#### Semana 16-17: Documentación y presentación
- Redacción del documento final.
- Preparación de anexos técnicos y diagramas.
- Ensayo de sustentación.

### 10.3 Matriz de entregables

| Entrega | Descripción | Responsable | Fecha estimada |
|---|---|---|---|
| Documento de requerimientos | Requisitos funcionales y no funcionales | Autor del proyecto | Semana 2 |
| Prototipo UI/UX | Wireframes y prototipo navegable | Autor del proyecto | Semana 4 |
| MVP inicial | Login, espacios, tickets | Autor del proyecto | Semana 8 |
| Beta integrada | Reservas, biblioteca, inventario, auditoría | Autor del proyecto | Semana 12 |
| Reporte de pruebas | Resultados de pruebas funcionales y de carga | Autor del proyecto | Semana 15 |
| Informe final | Tesis escrita completa | Autor del proyecto | Semana 17 |

### 10.4 Riesgos y mitigaciones

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Falta de datos de origen | Alto | Definir datos mínimos y usar datos sintéticos para pruebas |
| Dependencia de sistemas externos | Medio | Diseñar adaptadores desacoplados y modo degradado |
| Retrasos en desarrollo | Alto | dividir tareas en sprint cortos y priorizar MVP |
| Problemas de sincronización offline | Medio | aplicar pruebas de integración offline y validación de conflictos |
| Incidentes de seguridad | Alto | auditoría de código y pruebas de penetración simples |

## 🧪 11. ESTRATEGIA DE PRUEBAS Y VALIDACIÓN

La estrategia de pruebas de SmartCampus Unicamacho se organiza en niveles para asegurar calidad, seguridad y experiencia de usuario.

### 11.1 Pruebas funcionales

- **Casos de uso por perfil:** pruebas de estresamiento de permisos para cada perfil descrito en el documento.
- **Escenarios principales:** registro de ticket, asignación de técnico, cierre con evidencia, reserva de espacio, aprobación administrativa, préstamo y devolución de libro.
- **Validaciones de formulario:** campos obligatorios, formatos de datos y carga de archivos multimedia.
- **Manejo de errores:** mensajes claros y consistentes cuando el usuario no puede proceder.

### 11.2 Pruebas de integración

- **Frontend/Backend:** flujo de datos del cliente al servidor y respuestas adecuadas.
- **Backend/Base de datos:** integridad referencial, transacciones y estados de procesos múltiples.
- **Servicios externos:** validación de carga de objetos a almacenamiento y de envío de notificaciones (email/push) en modo mock.
- **Sincronización offline:** ensayos de pérdida y recuperación de conectividad.

### 11.3 Pruebas de rendimiento y calidad

- **Performance API:** pruebas con herramientas como k6 o JMeter para medir latencia bajo carga de usuarios concurrentes.
- **Pruebas de UI:** medición de Core Web Vitals, FCP, LCP y TTI en dispositivos de gama baja.
- **Pruebas de escalabilidad:** verificar tiempos de consulta con 10k registros de espacios, tickets y libros.
- **Calidad de código:** linting, formateo y cobertura mínima de pruebas unitarias.

### 11.4 Pruebas de seguridad

- **Auditoría de dependencias:** revisar vulnerabilidades de paquetes.
- **Pruebas de inyección:** validar sanitización de entradas y protección contra SQL injection/XSS.
- **Control de autenticación:** revisar expiración de tokens, revocación y protección de refresh tokens.
- **Acceso no autorizado:** simular intentos de acceso a recursos restringidos.

### 11.5 Métricas de calidad definidas

- **Tasa de éxito de pruebas funcionales:** ≥ 95%.
- **Cobertura de backend:** ≥ 70% en servicios críticos.
- **Tiempos de respuesta API:** promedio < 250ms en endpoints de lectura.
- **Tiempo de carga móvil:** FCP < 1.2s, LCP < 2.5s.
- **Disponibilidad:** 99.5% en ambiente de staging y producción.

## 🔗 12. INTEGRACIÓN CON SISTEMAS EXISTENTES Y MIGRACIÓN

El proyecto debe coexistir con sistemas institucionales existentes y no reemplazarlos abruptamente.

### 12.1 Integración con servicios institucionales

#### 12.1.1 Identidad y directorio

- **Objetivo:** sincronizar usuarios con el sistema de identidad institucional.
- **Patrón:** adaptador REST/SOAP que traduzca los atributos del directorio a `usuarios`.
- **Atributos sincronizados:** identificación, email, nombres, rol académico, sede y estado.
- **Estrategia:** sincronización incremental diaria y validación manual inicial.

#### 12.1.2 Correo electrónico y notificaciones

- **Objetivo:** integrar notificaciones institucionales para reservas, tickets y biblioteca.
- **Opciones:** SMTP institucional o servicio de correo transaccional.
- **Mensajes:** confirmaciones, alertas de vencimiento, aprobación de reservas y cierre de tickets.

#### 12.1.3 Integración con sistemas de matrícula / ERP

- **Objetivo:** recibir datos de programas, planes de estudio y horarios.
- **Patrón:** consumo de un endpoint REST o importación periódica de CSV.
- **Requisito:** mantener la consistencia de `unidades_academicas` y `horarios_clases`.

#### 12.1.4 API de servicios externos

- **Objetivo:** habilitar intercambio de datos con sistemas adicionales como pagos, biblioteca física o administración.
- **Seguridad:** claves API y autenticación mutua si es necesario.

### 12.2 Migración de datos históricos

#### 12.2.1 Estrategia de migración

- **Evaluación inicial:** inventario de datos existentes, fuentes disponibles y calidad.
- **Normalización:** estandarizar nombres de sedes, espacios, categorías y roles.
- **Mapeo:** definir equivalencias entre datos legacy y tablas del nuevo modelo.

#### 12.2.2 Fases de migración

1.  **Extracción:** obtención de fuentes de datos (hojas de cálculo, SQL, CSV).
2.  **Transformación:** limpieza, validación y enriquecimiento.
3.  **Carga:** inserción controlada en la base de datos de destino.
4.  **Verificación:** pruebas de reconciliación y validación de datos.

#### 12.2.3 Plan de pruebas post-migración

- Comparar número de registros importados con fuentes originales.
- Verificar enlaces referenciales en reservas, tickets y usuarios.
- Ejecutar escenarios críticos con datos importados.
- Validar que las políticas de permisos se apliquen correctamente sobre datos migrados.

### 12.3 Modelos de coexistencia

- **Modo dual:** sistema antiguo en paralelo con SmartCampus durante un período de transición.
- **Sync incremental:** transferir datos en batch diario y verificar discrepancias.
- **Ruptura controlada:** dejar de usar el sistema antiguo solo cuando los procesos clave estén estabilizados.

## ✅ 13. CONCLUSIONES Y RECOMENDACIONES

### 13.1 Conclusiones

- SmartCampus Unicamacho es una solución técnica sólida y viable para la gestión integrada de infraestructura, servicios de aula, reservas y biblioteca.
- El diseño propuesto combina un modelo de datos relacional con reglas ABAC para ofrecer control de permisos fino sin complejidad excesiva.
- La arquitectura PWA asegura accesibilidad a través de dispositivos móviles y PC, manteniendo una experiencia de usuario coherente.
- La propuesta considera tanto la operación diaria (tickets, reservas, préstamos) como la gobernanza institucional (auditoría, regulación, trazabilidad).

### 13.2 Recomendaciones

- Priorizar la implementación de los flujos de mantenimiento y reserva antes de avanzar a módulos secundarios. Estos representan los casos de uso de mayor impacto inmediato.
- Documentar y versionar todas las decisiones arquitectónicas para el jurado y para el equipo de desarrollo.
- Preparar un anexo con diagramas de despliegue, de clases, de secuencia y de flujo de datos.
- Realizar una prueba piloto en una sede o facultad antes de una adopción institucional completa.
- Mantener el modelo de datos abierto a extensiones futuras, como la integración con sistemas de pagos, movilidad interna o gestión de eventos académicos.

### 13.3 Resultado esperado de sustentación

- Un documento con esta estructura y profundidad puede sustentarse como una propuesta de grado de investigación aplicada, con suficiente soporte técnico, alcance operativo y análisis de factibilidad.
- El jurado valorará especialmente la claridad de la arquitectura, la trazabilidad de permisos y la estrategia de pruebas.
- Un capítulo adicional con métricas reales obtenidas en un piloto aumentará sustancialmente el valor de la tesis.

---

### 13.4 Anexos sugeridos para la tesis

- **Anexo A:** Diagrama ER completo.
- **Anexo B:** Diagrama de componentes y despliegue.
- **Anexo C:** Especificación de endpoints API.
- **Anexo D:** Casos de prueba más importantes.
- **Anexo E:** Plan de capacitación para usuarios.
