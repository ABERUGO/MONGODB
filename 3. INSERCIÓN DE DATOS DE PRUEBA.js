// ============================================
// 4. INSERCIÓN DE DATOS DE EJEMPLO
// ============================================

// 4.1 Insertar Torneos
db.torneos.insertMany([
   {
      nombre: "Torneo Nacional de Tejo 2026",
      fecha_inicio: ISODate("2026-07-15T08:00:00Z"),
      fecha_fin: ISODate("2026-07-20T18:00:00Z"),
      ubicacion: {
         ciudad: "Bogotá",
         direccion: "Coliseo Cubierto El Campín",
         coordenadas: { lat: 4.6456, lng: -74.0775 }
      },
      estado: "activo",
      categoria: "profesional",
      premio_total: 50000000,
      reglas: {
         puntos_por_emboque: 6,
         puntos_por_mano: 3,
         puntos_por_pasada: 1,
         rondas: 5
      },
      patrocinadores: [
         { nombre: "Coldeportes", aporte: 25000000 },
         { nombre: "Indumil", aporte: 15000000 }
      ],
      fecha_creacion: ISODate("2026-01-15T10:00:00Z")
   },
   {
      nombre: "Copa Ciudad de Medellín 2026",
      fecha_inicio: ISODate("2026-08-01T09:00:00Z"),
      fecha_fin: ISODate("2026-08-05T17:00:00Z"),
      ubicacion: {
         ciudad: "Medellín",
         direccion: "Unidad Deportiva Atanasio Girardot",
         coordenadas: { lat: 6.2518, lng: -75.5636 }
      },
      estado: "en_preparacion",
      categoria: "amateur",
      premio_total: 15000000,
      reglas: {
         puntos_por_emboque: 6,
         puntos_por_mano: 3,
         puntos_por_pasada: 1,
         rondas: 3
      },
      fecha_creacion: ISODate("2026-02-20T14:30:00Z")
   }
])

// 4.2 Insertar Jugadores
db.jugadores.insertMany([
   {
      nombre: "Carlos",
      apellidos: "Pérez Rodríguez",
      documento: "123456789",
      fecha_nacimiento: ISODate("1990-05-15T00:00:00Z"),
      ciudad_nacimiento: "Bogotá",
      contacto: {
         telefono: "3001234567",
         email: "carlos.perez@email.com"
      },
      estadisticas_carrera: {
         partidos_jugados: 25,
         puntos_totales: 580,
         emboques: 45,
         manos: 30,
         pasadas: 20,
         porcentaje_acierto: 78.5
      }
   },
   {
      nombre: "María",
      apellidos: "González López",
      documento: "987654321",
      fecha_nacimiento: ISODate("1992-08-22T00:00:00Z"),
      ciudad_nacimiento: "Medellín",
      contacto: {
         telefono: "3007654321",
         email: "maria.gonzalez@email.com"
      },
      estadisticas_carrera: {
         partidos_jugados: 20,
         puntos_totales: 450,
         emboques: 35,
         manos: 25,
         pasadas: 15,
         porcentaje_acierto: 72.3
      }
   },
   {
      nombre: "Juan",
      apellidos: "Martínez Castro",
      documento: "456789123",
      fecha_nacimiento: ISODate("1988-11-10T00:00:00Z"),
      ciudad_nacimiento: "Cali",
      contacto: {
         telefono: "3009876543",
         email: "juan.martinez@email.com"
      },
      estadisticas_carrera: {
         partidos_jugados: 30,
         puntos_totales: 720,
         emboques: 55,
         manos: 40,
         pasadas: 25,
         porcentaje_acierto: 82.1
      }
   }
])

// 4.3 Insertar Equipos
db.equipos.insertMany([
   {
      nombre: "Los Invencibles",
      ciudad: "Medellín",
      capitan_id: ObjectId("..."), // Reemplazar con ID de jugador
      integrantes: [
         { jugador_id: ObjectId("..."), rol: "capitan", numero_camiseta: 10 },
         { jugador_id: ObjectId("..."), rol: "tirador", numero_camiseta: 7 }
      ],
      categoria: "profesional",
      estadisticas: {
         partidos_jugados: 8,
         partidos_ganados: 6,
         partidos_perdidos: 2,
         puntos_totales: 450
      }
   },
   {
      nombre: "Los Titanes",
      ciudad: "Bogotá",
      capitan_id: ObjectId("..."),
      integrantes: [
         { jugador_id: ObjectId("..."), rol: "capitan", numero_camiseta: 5 },
         { jugador_id: ObjectId("..."), rol: "tirador", numero_camiseta: 9 }
      ],
      categoria: "profesional",
      estadisticas: {
         partidos_jugados: 8,
         partidos_ganados: 5,
         partidos_perdidos: 3,
         puntos_totales: 380
      }
   }
])

// 4.4 Insertar Partidos
db.partidos.insertMany([
   {
      torneo_id: ObjectId("..."), // ID del torneo
      fase: "semifinal",
      equipo_local: ObjectId("..."), // ID de equipo
      equipo_visitante: ObjectId("..."), // ID de equipo
      fecha_programada: ISODate("2026-07-18T14:00:00Z"),
      fecha_inicio: ISODate("2026-07-18T14:15:00Z"),
      fecha_fin: ISODate("2026-07-18T16:30:00Z"),
      estado: "finalizado",
      resultado: {
         puntos_local: 45,
         puntos_visitante: 32,
         ganador: ObjectId("...") // ID del equipo ganador
      },
      detalles: [
         {
            ronda: 1,
            turno: 1,
            equipo_id: ObjectId("..."),
            jugador_id: ObjectId("..."),
            tiros: [
               { tipo: "emboque", puntos: 6, distancia: 19.5 },
               { tipo: "mano", puntos: 3, distancia: 12.3 }
            ],
            puntos_ronda: 9
         }
      ]
   }
])