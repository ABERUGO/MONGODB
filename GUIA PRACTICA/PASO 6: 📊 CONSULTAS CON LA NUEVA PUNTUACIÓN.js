// ============================================
// CONSULTAS CON PUNTUACIÓN CORRECTA
// ============================================

// 1. Ver torneos con sus reglas de puntuación
db.torneos.find({}, { nombre: 1, reglas_puntuacion: 1 }).pretty()

// 2. Ranking de jugadores por moñonas
db.jugadores.aggregate([
   { $sort: { "estadisticas_carrera.moñonas": -1 } },
   { $project: {
      nombre_completo: { $concat: ["$nombre", " ", "$apellidos"] },
      moñonas: "$estadisticas_carrera.moñonas",
      embocinadas: "$estadisticas_carrera.embocinadas",
      mechas: "$estadisticas_carrera.mechas",
      puntos_totales: "$estadisticas_carrera.puntos_totales"
   }}
]).pretty()

// 3. Análisis de tipos de tiros en el torneo
db.partidos.aggregate([
   { $unwind: "$detalles" },
   { $unwind: "$detalles.tiros" },
   { $group: {
      _id: "$detalles.tiros.tipo",
      total_tiros: { $sum: 1 },
      total_puntos: { $sum: "$detalles.tiros.puntos" },
      promedio_distancia: { $avg: "$detalles.tiros.distancia" }
   }},
   { $project: {
      tipo: "$_id",
      total_tiros: 1,
      total_puntos: 1,
      promedio_distancia: { $round: ["$promedio_distancia", 2] },
      puntos_por_tiro: { $round: [{ $avg: "$detalles.tiros.puntos" }, 2] }
   }}
]).pretty()

// 4. Jugadores con más moñonas (máxima puntuación)
db.jugadores.aggregate([
   { $match: { "estadisticas_carrera.moñonas": { $gte: 10 } } },
   { $project: {
      nombre: 1,
      apellidos: 1,
      moñonas: "$estadisticas_carrera.moñonas",
      puntos_por_moñona: { $multiply: ["$estadisticas_carrera.moñonas", 9] }
   }},
   { $sort: { moñonas: -1 } }
]).pretty()

// 5. Distribución de puntos por tipo de tiro (global)
db.partidos.aggregate([
   { $unwind: "$detalles" },
   { $unwind: "$detalles.tiros" },
   { $group: {
      _id: null,
      total_moñonas: { $sum: { $cond: [{ $eq: ["$detalles.tiros.tipo", "moñona"] }, 1, 0] } },
      total_embocinadas: { $sum: { $cond: [{ $eq: ["$detalles.tiros.tipo", "embocinada"] }, 1, 0] } },
      total_mechas: { $sum: { $cond: [{ $eq: ["$detalles.tiros.tipo", "mecha"] }, 1, 0] } },
      total_manos: { $sum: { $cond: [{ $eq: ["$detalles.tiros.tipo", "mano"] }, 1, 0] } }
   }},
   { $project: {
      moñonas: "$total_moñonas",
      embocinadas: "$total_embocinadas",
      mechas: "$total_mechas",
      manos: "$total_manos",
      total_tiros: { $sum: ["$total_moñonas", "$total_embocinadas", "$total_mechas", "$total_manos"] }
   }}
]).pretty()

// 6. Calcular puntos totales correctamente por jugador
db.jugadores.aggregate([
   { $project: {
      nombre_completo: { $concat: ["$nombre", " ", "$apellidos"] },
      puntos_calculados: {
         $sum: [
            { $multiply: ["$estadisticas_carrera.moñonas", 9] },
            { $multiply: ["$estadisticas_carrera.embocinadas", 6] },
            { $multiply: ["$estadisticas_carrera.mechas", 3] },
            { $multiply: ["$estadisticas_carrera.manos", 1] }
         ]
      },
      puntos_reales: "$estadisticas_carrera.puntos_totales"
   }},
   { $project: {
      nombre_completo: 1,
      puntos_calculados: 1,
      puntos_reales: 1,
      diferencia: { $subtract: ["$puntos_calculados", "$puntos_reales"] }
   }}
]).pretty()

// 7. Equipos con mejor rendimiento por tipo de tiro
db.equipos.aggregate([
   { $project: {
      nombre: 1,
      ciudad: 1,
      moñonas: "$estadisticas.moñonas",
      embocinadas: "$estadisticas.embocinadas",
      mechas: "$estadisticas.mechas",
      puntos_totales: "$estadisticas.puntos_totales",
      puntos_por_moñona: { $multiply: ["$estadisticas.moñonas", 9] },
      puntos_por_embocinada: { $multiply: ["$estadisticas.embocinadas", 6] },
      puntos_por_mecha: { $multiply: ["$estadisticas.mechas", 3] }
   }},
   { $project: {
      nombre: 1,
      ciudad: 1,
      total_puntos_calculados: {
         $sum: ["$puntos_por_moñona", "$puntos_por_embocinada", "$puntos_por_mecha"]
      },
      puntos_reales: "$puntos_totales"
   }},
   { $sort: { total_puntos_calculados: -1 } }
]).pretty()