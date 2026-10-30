// 5. Insertar equipos (reemplaza ObjectId con los IDs que te salieron)
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

// 6. Guardar IDs de equipos
var equipo1 = db.equipos.findOne({nombre: "Los Invencibles"})
var equipo2 = db.equipos.findOne({nombre: "Los Titanes"})

print("\n========== IDs DE EQUIPOS ==========")
print("Los Invencibles →", equipo1._id)
print("Los Titanes →", equipo2._id)