// ============================================
// 10. SCRIPTS DE MANTENIMIENTO
// ============================================

// 10.1 Backup de colección
db.torneos.aggregate([{ $out: "torneos_backup" }])

// 10.2 Limpiar datos antiguos (partidos de hace más de 1 año)
db.partidos.deleteMany({
   fecha_fin: {
      $lt: new Date(new Date().setFullYear(new Date().getFullYear() - 1))
   }
})

// 10.3 Actualizar estadísticas de equipos
db.equipos.updateMany(
   { "estadisticas.partidos_jugados": { $exists: true } },
   [
      { $set: {
         "estadisticas.partidos_ganados": { 
            $cond: {
               if: { $gt: ["$estadisticas.partidos_jugados", 0] },
               then: "$estadisticas.partidos_ganados",
               else: 0
            }
         }
      }}
   ]
)

// 10.4 Verificar integridad de datos
db.equipos.find({
   $or: [
      { "integrantes": { $size: 0 } },
      { "integrantes": { $exists: false } }
   ]
})

// 10.5 Estadísticas de uso de la base de datos
db.stats()
db.torneos.stats()
db.equipos.stats()

// 10.6 Reindexar colecciones
db.torneos.reIndex()
db.equipos.reIndex()
db.jugadores.reIndex()