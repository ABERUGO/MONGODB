// ============================================
// 12. PRUEBAS DE FUNCIONAMIENTO
// ============================================

// 12.1 Verificar conexión
db.runCommand({ ping: 1 })

// 12.2 Contar documentos en cada colección
print("Torneros:", db.torneos.countDocuments())
print("Equipos:", db.equipos.countDocuments())
print("Jugadores:", db.jugadores.countDocuments())
print("Partidos:", db.partidos.countDocuments())
print("Usuarios:", db.usuarios.countDocuments())

// 12.3 Verificar índices
db.torneos.getIndexes()
db.equipos.getIndexes()

// 12.4 Probar consulta de ejemplo
db.torneos.find({ estado: "activo" }).pretty()