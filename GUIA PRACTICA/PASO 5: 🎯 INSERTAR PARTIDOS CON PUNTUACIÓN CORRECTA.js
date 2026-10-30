// 7. Insertar partidos con la puntuación correcta
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

print("\n✅ Partidos insertados correctamente")
print("Total partidos:", db.partidos.countDocuments())