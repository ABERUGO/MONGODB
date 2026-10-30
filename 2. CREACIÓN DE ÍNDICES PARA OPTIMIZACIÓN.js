// ============================================
// 3. ÍNDICES PARA MEJORAR RENDIMIENTO
// ============================================

// Índices para torneos
db.torneos.createIndex({ estado: 1, fecha_inicio: -1 })
db.torneos.createIndex({ categoria: 1 })
db.torneos.createIndex({ "ubicacion.ciudad": 1 })

// Índices para equipos
db.equipos.createIndex({ ciudad: 1 })
db.equipos.createIndex({ categoria: 1 })
db.equipos.createIndex({ nombre: 1 }, { unique: true })
db.equipos.createIndex({ "estadisticas.puntos_totales": -1 })

// Índices para jugadores
db.jugadores.createIndex({ documento: 1 }, { unique: true })
db.jugadores.createIndex({ "estadisticas_carrera.puntos_totales": -1 })
db.jugadores.createIndex({ apellidos: 1, nombre: 1 })

// Índices para partidos
db.partidos.createIndex({ torneo_id: 1, fecha_programada: 1 })
db.partidos.createIndex({ equipo_local: 1, equipo_visitante: 1 })
db.partidos.createIndex({ estado: 1 })
db.partidos.createIndex({ "resultado.ganador": 1 })

// Índices para usuarios
db.usuarios.createIndex({ username: 1 }, { unique: true })
db.usuarios.createIndex({ email: 1 }, { unique: true })

// Índice para auditoría
db.auditoria.createIndex({ fecha: -1 })
db.auditoria.createIndex({ usuario_id: 1, fecha: -1 })