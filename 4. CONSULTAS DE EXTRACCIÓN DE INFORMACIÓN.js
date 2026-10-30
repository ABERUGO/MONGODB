// ============================================
// 5. CONSULTAS BÁSICAS (FIND)
// ============================================

// 5.1 Obtener todos los torneos activos
db.torneos.find(
   { estado: "activo" },
   { nombre: 1, fecha_inicio: 1, ubicacion: 1, premio_total: 1 }
).sort({ fecha_inicio: -1 })

// 5.2 Buscar equipos de una ciudad específica
db.equipos.find(
   { ciudad: "Medellín" },
   { nombre: 1, "estadisticas.puntos_totales": 1 }
).sort({ "estadisticas.puntos_totales": -1 })

// 5.3 Jugadores con más de 50 puntos en su carrera
db.jugadores.find(
   { "estadisticas_carrera.puntos_totales": { $gt: 50 } }
).sort({ "estadisticas_carrera.puntos_totales": -1 })

// 5.4 Partidos programados para una fecha específica
db.partidos.find({
   fecha_programada: {
      $gte: ISODate("2026-07-18T00:00:00Z"),
      $lt: ISODate("2026-07-19T00:00:00Z")
   },
   estado: "programado"
})

// 5.5 Torneos por categoría
db.torneos.find(
   { categoria: "profesional" },
   { nombre: 1, fecha_inicio: 1, ubicacion: 1 }
)

// ============================================
// 6. CONSULTAS AVANZADAS (AGGREGATION PIPELINE)
// ============================================

// 6.1 Ranking de equipos con estadísticas calculadas
db.equipos.aggregate([
   { $match: { categoria: "profesional" } },
   { $addFields: {
      promedio_puntos: {
         $cond: {
            if: { $gt: ["$estadisticas.partidos_jugados", 0] },
            then: { $divide: ["$estadisticas.puntos_totales", "$estadisticas.partidos_jugados"] },
            else: 0
         }
      },
      porcentaje_victorias: {
         $cond: {
            if: { $gt: ["$estadisticas.partidos_jugados", 0] },
            then: { $multiply: [
               { $divide: ["$estadisticas.partidos_ganados", "$estadisticas.partidos_jugados"] },
               100
            ]},
            else: 0
         }
      }
   }},
   { $sort: { "estadisticas.puntos_totales": -1 } },
   { $project: {
      nombre: 1,
      ciudad: 1,
      puntos_totales: "$estadisticas.puntos_totales",
      promedio_puntos: { $round: ["$promedio_puntos", 2] },
      porcentaje_victorias: { $round: ["$porcentaje_victorias", 2] }
   }}
])

// 6.2 Estadísticas completas de jugadores por torneo
db.jugadores.aggregate([
   { $unwind: { 
      path: "$historial_torneos",
      preserveNullAndEmptyArrays: false 
   }},
   { $lookup: {
      from: "torneos",
      localField: "historial_torneos.torneo_id",
      foreignField: "_id",
      as: "torneo_info"
   }},
   { $unwind: "$torneo_info" },
   { $group: {
      _id: {
         jugador_id: "$_id",
         torneo_id: "$historial_torneos.torneo_id"
      },
      nombre_jugador: { $first: "$nombre" },
      apellidos_jugador: { $first: "$apellidos" },
      nombre_torneo: { $first: "$torneo_info.nombre" },
      puntos_totales: { $sum: "$historial_torneos.puntuacion" },
      partidos_jugados: { $sum: 1 },
      mejor_posicion: { $min: "$historial_torneos.posicion" }
   }},
   { $sort: { puntos_totales: -1 } }
])

// 6.3 Análisis de rendimiento por fase del torneo
db.partidos.aggregate([
   { $match: { 
      estado: "finalizado",
      fase: { $in: ["semifinal", "final"] }
   }},
   { $group: {
      _id: {
         torneo_id: "$torneo_id",
         fase: "$fase"
      },
      promedio_puntos_local: { $avg: "$resultado.puntos_local" },
      promedio_puntos_visitante: { $avg: "$resultado.puntos_visitante" },
      total_partidos: { $sum: 1 },
      puntos_max_local: { $max: "$resultado.puntos_local" },
      puntos_max_visitante: { $max: "$resultado.puntos_visitante" }
   }},
   { $lookup: {
      from: "torneos",
      localField: "_id.torneo_id",
      foreignField: "_id",
      as: "torneo"
   }},
   { $unwind: "$torneo" },
   { $project: {
      torneo: "$torneo.nombre",
      fase: "$_id.fase",
      promedio_puntos_local: { $round: ["$promedio_puntos_local", 2] },
      promedio_puntos_visitante: { $round: ["$promedio_puntos_visitante", 2] },
      total_partidos: 1,
      puntos_max_local: 1,
      puntos_max_visitante: 1
   }}
])

// 6.4 Top 10 jugadores más precisos (mínimo 5 partidos)
db.jugadores.aggregate([
   { $match: {
      "estadisticas_carrera.porcentaje_acierto": { $exists: true },
      "estadisticas_carrera.partidos_jugados": { $gte: 5 }
   }},
   { $sort: { "estadisticas_carrera.porcentaje_acierto": -1 } },
   { $limit: 10 },
   { $project: {
      nombre_completo: { $concat: ["$nombre", " ", "$apellidos"] },
      ciudad: "$ciudad_nacimiento",
      "estadisticas_carrera.porcentaje_acierto": 1,
      "estadisticas_carrera.emboques": 1,
      "estadisticas_carrera.manos": 1,
      "estadisticas_carrera.partidos_jugados": 1
   }}
])

// 6.5 Distribución de tipos de tiros por torneo
db.partidos.aggregate([
   { $unwind: "$detalles" },
   { $unwind: "$detalles.tiros" },
   { $group: {
      _id: {
         torneo_id: "$torneo_id",
         tipo_tiro: "$detalles.tiros.tipo"
      },
      total_tiros: { $sum: 1 },
      total_puntos: { $sum: "$detalles.tiros.puntos" },
      promedio_puntos: { $avg: "$detalles.tiros.puntos" }
   }},
   { $lookup: {
      from: "torneos",
      localField: "_id.torneo_id",
      foreignField: "_id",
      as: "torneo"
   }},
   { $unwind: "$torneo" },
   { $project: {
      torneo: "$torneo.nombre",
      tipo_tiro: "$_id.tipo_tiro",
      total_tiros: 1,
      total_puntos: 1,
      promedio_puntos: { $round: ["$promedio_puntos", 2] }
   }},
   { $sort: { torneo: 1, total_tiros: -1 } }
])

// 6.6 Historial de cambios en torneos (auditoría)
db.auditoria.aggregate([
   { $match: {
      coleccion: "torneos",
      fecha: { $gte: ISODate("2026-07-01T00:00:00Z") }
   }},
   { $lookup: {
      from: "usuarios",
      localField: "usuario_id",
      foreignField: "_id",
      as: "usuario"
   }},
   { $unwind: "$usuario" },
   { $group: {
      _id: "$usuario_id",
      usuario: { $first: "$usuario.username" },
      total_acciones: { $sum: 1 },
      acciones: { $push: "$accion" },
      ultima_accion: { $max: "$fecha" }
   }},
   { $sort: { total_acciones: -1 } },
   { $project: {
      usuario: 1,
      total_acciones: 1,
      acciones: 1,
      ultima_accion: 1
   }}
])

// 6.7 Torneos con mayor participación (número de partidos y equipos)
db.partidos.aggregate([
   { $group: {
      _id: "$torneo_id",
      total_partidos: { $sum: 1 },
      equipos: { $addToSet: "$equipo_local" }
   }},
   { $addFields: {
      equipos: { $setUnion: ["$equipos", { $addToSet: "$equipo_visitante" }] }
   }},
   { $project: {
      total_partidos: 1,
      total_equipos: { $size: "$equipos" }
   }},
   { $lookup: {
      from: "torneos",
      localField: "_id",
      foreignField: "_id",
      as: "torneo"
   }},
   { $unwind: "$torneo" },
   { $project: {
      torneo: "$torneo.nombre",
      total_partidos: 1,
      total_equipos: 1,
      categoria: "$torneo.categoria"
   }},
   { $sort: { total_partidos: -1 } }
])

// ============================================
// 7. CONSULTAS CON GEOESPACIALES
// ============================================

// 7.1 Crear índice geoespacial
db.torneos.createIndex({ "ubicacion.coordenadas": "2dsphere" })

// 7.2 Buscar torneos cercanos a una ubicación
db.torneos.find({
   "ubicacion.coordenadas": {
      $near: {
         $geometry: {
            type: "Point",
            coordinates: [-74.0775, 4.6456] // Bogotá
         },
         $maxDistance: 100000 // 100km en metros
      }
   }
})

// ============================================
// 8. CONSULTAS CON TEXTO COMPLETO
// ============================================

// 8.1 Crear índice de texto
db.equipos.createIndex({ nombre: "text", ciudad: "text" })

// 8.2 Buscar equipos por texto
db.equipos.find({
   $text: {
      $search: "Invencibles Titanes"
   }
})

// ============================================
// 9. CONSULTAS CON OPERADORES AVANZADOS
// ============================================

// 9.1 Encontrar jugadores por rango de edad
db.jugadores.find({
   fecha_nacimiento: {
      $gte: ISODate("1985-01-01T00:00:00Z"),
      $lt: ISODate("1995-01-01T00:00:00Z")
   }
}).sort({ fecha_nacimiento: 1 })

// 9.2 Buscar partidos con diferencia de puntos mayor a 10
db.partidos.find({
   estado: "finalizado",
   $expr: {
      $or: [
         { $gt: [{ $subtract: ["$resultado.puntos_local", "$resultado.puntos_visitante"] }, 10] },
         { $gt: [{ $subtract: ["$resultado.puntos_visitante", "$resultado.puntos_local"] }, 10] }
      ]
   }
})

// 9.3 Equipos con jugadores que tienen más de 100 puntos
db.equipos.find({
   integrantes: {
      $elemMatch: {
         jugador_id: {
            $in: db.jugadores.find(
               { "estadisticas_carrera.puntos_totales": { $gt: 100 } },
               { _id: 1 }
            ).toArray().map(d => d._id)
         }
      }
   }
})