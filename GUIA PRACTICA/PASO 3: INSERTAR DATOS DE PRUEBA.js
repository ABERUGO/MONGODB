// ============================================
// INSERTAR DATOS CON PUNTUACIÓN CORRECTA DEL TEJO
// ============================================

// 1. Insertar torneos
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
      reglas_puntuacion: {
         moñona: 9,
         embocinada: 6,
         mecha: 3,
         mano: 1
      }
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
      reglas_puntuacion: {
         moñona: 9,
         embocinada: 6,
         mecha: 3,
         mano: 1
      }
   }
])

// 2. Insertar jugadores
db.jugadores.insertMany([
   {
      nombre: "Carlos",
      apellidos: "Pérez Rodríguez",
      documento: "123456789",
      fecha_nacimiento: new Date("1990-05-15"),
      ciudad_nacimiento: "Bogotá",
      contacto: {
         telefono: "3001234567",
         email: "carlos.perez@email.com"
      },
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
      contacto: {
         telefono: "3007654321",
         email: "maria.gonzalez@email.com"
      },
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
      contacto: {
         telefono: "3009876543",
         email: "juan.martinez@email.com"
      },
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

// 3. Guardar IDs para usarlos después
print("\n========== IDs DE TORNEOS ==========")
db.torneos.find().forEach(doc => {
   print("Torneo:", doc.nombre, "→ ID:", doc._id)
})

print("\n========== IDs DE JUGADORES ==========")
db.jugadores.find().forEach(doc => {
   print("Jugador:", doc.nombre, doc.apellidos, "→ ID:", doc._id)
})

// 4. Obtener variables para usar después
var torneo1 = db.torneos.findOne({nombre: "Torneo Nacional de Tejo 2026"})
var torneo2 = db.torneos.findOne({nombre: "Copa Ciudad de Medellín 2026"})
var jugador1 = db.jugadores.findOne({documento: "123456789"})
var jugador2 = db.jugadores.findOne({documento: "987654321"})
var jugador3 = db.jugadores.findOne({documento: "456789123"})

print("\n✅ Variables creadas para usar en consultas:")
print("torneo1, torneo2, jugador1, jugador2, jugador3")