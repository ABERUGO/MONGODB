# Crear el archivo completo
cat > tejo_completo.js << 'EOF'
// ============================================
// TEJO - SCRIPT COMPLETO CON PUNTUACIÓN CORRECTA
// ============================================

use tejo_tournament_db

// ============================================
// 1. CREAR COLECCIONES (por si no existen)
// ============================================
db.createCollection("torneos")
db.createCollection("equipos")
db.createCollection("jugadores")
db.createCollection("partidos")
db.createCollection("usuarios")
db.createCollection("auditoria")

print("\n✅ Colecciones creadas/verificadas")

// ============================================
// 2. INSERTAR TORNEOS
// ============================================
db.torneos.insertMany([
   {
      nombre: "Torneo Nacional de Tejo 2026",
      fecha_inicio: new Date("2026-07-15T08:00:00Z"),
      fecha_fin: new Date("2026-07-20T18:00:00Z"),
      ubicacion: {
         ciudad: "Bogotá",
         direccion: "Coliseo Cubierto El Campín",
         coordenadas: { lat: 4.6456, lng: -74.0775 }
      },
      estado: "activo",
      categoria: "profesional",
      premio_total: 50000000,
      reglas_puntuacion: { moñona: 9, embocinada: 6, mecha: 3, mano: 1 }
   },
   {
      nombre: "Copa Ciudad de Medellín 2026",
      fecha_inicio: new Date("2026-08-01T09:00:00Z"),
      fecha_fin: new Date("2026-08-05T17:00:00Z"),
      ubicacion: {
         ciudad: "Medellín",
         direccion: "Unidad Deportiva Atanasio Girardot",
         coordenadas: { lat: 6.2518, lng: -75.5636 }
      },
      estado: "en_preparacion",
      categoria: "amateur",
      premio_total: 15000000,
      reglas_puntuacion: { moñona: 9, embocinada: 6, mecha: 3, mano: 1 }
   }
])

print("✅ Torneos insertados:", db.torneos.countDocuments())

// ============================================
// 3. INSERTAR JUGADORES
// ============================================
db.jugadores.insertMany([
   {
      nombre: "Carlos",
      apellidos: "Pérez Rodríguez",
      documento: "123456789",
      fecha_nacimiento: new Date("1990-05-15"),
      ciudad_nacimiento: "Bogotá",
      contacto: { telefono: "3001234567", email: "carlos.perez@email.com" },
      estadisticas_carrera: {
         partidos_jugados: 25,
         puntos_totales: 580,
         moñonas: 12,
         embocinadas: 25,
         mechas: 18,
         manos: 30,
         porcentaje_acierto: 78.5
      }
   },
   {
      nombre: "María",
      apellidos: "González López",
      documento: "987654321",
      fecha_nacimiento: new Date("1992-08-22"),
      ciudad_nacimiento: "Medellín",
      contacto: { telefono: "3007654321", email: "maria.gonzalez@email.com" },
      estadisticas_carrera: {
         partidos_jugados: 20,
         puntos_totales: 450,
         moñonas: 8,
         embocinadas: 20,
         mechas: 15,
         manos: 25,
         porcentaje_acierto: 72.3
      }
   },
   {
      nombre: "Juan",
      apellidos: "Martínez Castro",
      documento: "456789123",
      fecha_nacimiento: new Date("1988-11-10"),
      ciudad_nacimiento: "Cali",
      contacto: { telefono: "3009876543", email: "juan.martinez@email.com" },
      estadisticas_carrera: {
         partidos_jugados: 30,
         puntos_totales: 720,
         moñonas: 18,
         embocinadas: 30,
         mechas: 22,
         manos: 35,
         porcentaje_acierto: 82.1
      }
   }
])

print("✅ Jugadores insertados:", db.jugadores.countDocuments())

// ============================================
// 4. OBTENER IDs PARA RELACIONES
// ============================================
var torneo1 = db.torneos.findOne({nombre: "Torneo Nacional de Tejo 2026"})
var torneo2 = db.torneos.findOne({nombre: "Copa Ciudad de Medellín 2026"})
var jugador1 = db.jugadores.findOne({documento: "123456789"})
var jugador2 = db.jugadores.findOne({documento: "987654321"})
var jugador3 = db.jugadores.findOne({documento: "456789123"})

print("\n📋 IDs obtenidos:")
print("Torneo 1:", torneo1._id)
print("Torneo 2:", torneo2._id)
print("Jugador 1:", jugador1._id)
print("Jugador 2:", jugador2._id)
print("Jugador 3:", jugador3._id)

// ============================================
// 5. INSERTAR EQUIPOS
// ============================================
db.equipos.insertMany([
   {
      nombre: "Los Invencibles",
      ciudad: "Medellín",
      capitan_id: jugador1._id,
      integrantes: [
         { jugador_id: jugador1._id, rol: "capitan", numero_camiseta: 10 },
         { jugador_id: jugador2._id, rol: "tirador", numero_camiseta: 7 }
      ],
      categoria: "profesional",
      estadisticas: {
         partidos_jugados: 8,
         partidos_ganados: 6,
         partidos_perdidos: 2,
         puntos_totales: 450,
         moñonas: 15,
         embocinadas: 28,
         mechas: 20
      }
   },
   {
      nombre: "Los Titanes",
      ciudad: "Bogotá",
      capitan_id: jugador3._id,
      integrantes: [
         { jugador_id: jugador3._id, rol: "capitan", numero_camiseta: 5 },
         { jugador_id: jugador1._id, rol: "tirador", numero_camiseta: 9 }
      ],
      categoria: "profesional",
      estadisticas: {
         partidos_jugados: 8,
         partidos_ganados: 5,
         partidos_perdidos: 3,
         puntos_totales: 380,
         moñonas: 12,
         embocinadas: 22,
         mechas: 18
      }
   }
])

print("✅ Equipos insertados:", db.equipos.countDocuments())

// ============================================
// 6. OBTENER IDs DE EQUIPOS
// ============================================
var equipo1 = db.equipos.findOne({nombre: "Los Invencibles"})
var equipo2 = db.equipos.findOne({nombre: "Los Titanes"})

print("Equipo 1:", equipo1._id)
print("Equipo 2:", equipo2._id)

// ============================================
// 7. INSERTAR PARTIDOS
// ============================================
db.partidos.insertMany([
   {
      torneo_id: torneo1._id,
      fase: "semifinal",
      equipo_local: equipo1._id,
      equipo_visitante: equipo2._id,
      fecha_programada: new Date("2026-07-18T14:00:00Z"),
      fecha_inicio: new Date("2026-07-18T14:15:00Z"),
      fecha_fin: new Date("2026-07-18T16:30:00Z"),
      estado: "finalizado",
      resultado: {
         puntos_local: 54,
         puntos_visitante: 36,
         ganador: equipo1._id,
         detalle_puntuacion: {
            local: { moñonas: 3, embocinadas: 4, mechas: 2, manos: 3 },
            visitante: { moñonas: 2, embocinadas: 2, mechas: 3, manos: 3 }
         }
      },
      detalles: [
         {
            ronda: 1,
            turno: 1,
            equipo_id: equipo1._id,
            jugador_id: jugador1._id,
            tiros: [
               { tipo: "moñona", puntos: 9, distancia: 19.5 },
               { tipo: "embocinada", puntos: 6, distancia: 15.2 },
               { tipo: "mecha", puntos: 3, distancia: 8.7 },
               { tipo: "mano", puntos: 1, distancia: 5.3 }
            ],
            puntos_ronda: 19
         },
         {
            ronda: 1,
            turno: 2,
            equipo_id: equipo2._id,
            jugador_id: jugador3._id,
            tiros: [
               { tipo: "embocinada", puntos: 6, distancia: 16.8 },
               { tipo: "mecha", puntos: 3, distancia: 9.2 },
               { tipo: "mano", puntos: 1, distancia: 4.7 }
            ],
            puntos_ronda: 10
         },
         {
            ronda: 2,
            turno: 1,
            equipo_id: equipo1._id,
            jugador_id: jugador2._id,
            tiros: [
               { tipo: "moñona", puntos: 9, distancia: 20.1 },
               { tipo: "moñona", puntos: 9, distancia: 19.8 },
               { tipo: "embocinada", puntos: 6, distancia: 14.5 }
            ],
            puntos_ronda: 24
         },
         {
            ronda: 2,
            turno: 2,
            equipo_id: equipo2._id,
            jugador_id: jugador1._id,
            tiros: [
               { tipo: "embocinada", puntos: 6, distancia: 15.9 },
               { tipo: "embocinada", puntos: 6, distancia: 16.3 },
               { tipo: "mecha", puntos: 3, distancia: 8.1 }
            ],
            puntos_ronda: 15
         }
      ]
   },
   {
      torneo_id: torneo1._id,
      fase: "final",
      equipo_local: equipo1._id,
      equipo_visitante: equipo2._id,
      fecha_programada: new Date("2026-07-19T16:00:00Z"),
      fecha_inicio: new Date("2026-07-19T16:15:00Z"),
      fecha_fin: new Date("2026-07-19T18:45:00Z"),
      estado: "programado",
      resultado: {
         puntos_local: 0,
         puntos_visitante: 0,
         ganador: null
      }
   }
])

print("✅ Partidos insertados:", db.partidos.countDocuments())

// ============================================
// 8. CREAR ÍNDICES
// ============================================
db.torneos.createIndex({ estado: 1, fecha_inicio: -1 })
db.torneos.createIndex({ categoria: 1 })
db.equipos.createIndex({ ciudad: 1 })
db.equipos.createIndex({ nombre: 1 }, { unique: true })
db.jugadores.createIndex({ documento: 1 }, { unique: true })
db.partidos.createIndex({ torneo_id: 1, fecha_programada: 1 })
db.torneos.createIndex({ "ubicacion.coordenadas": "2dsphere" })
db.equipos.createIndex({ nombre: "text", ciudad: "text" })

print("✅ Índices creados correctamente")

// ============================================
// 9. RESUMEN FINAL
// ============================================
print("\n" + "=".repeat(50))
print("📊 RESUMEN FINAL DE LA BASE DE DATOS")
print("=".repeat(50))
print("Torneos:", db.torneos.countDocuments())
print("Equipos:", db.equipos.countDocuments())
print("Jugadores:", db.jugadores.countDocuments())
print("Partidos:", db.partidos.countDocuments())
print("=".repeat(50))
print("✅ Script ejecutado correctamente")
print("=".repeat(50))
EOF

# Ejecutar el script
mongosh tejo_completo.js