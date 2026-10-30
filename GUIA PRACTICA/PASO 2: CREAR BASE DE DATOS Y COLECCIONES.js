// Copia y pega esto en mongosh (una línea a la vez o todo)

// 1. Crear/Usar la base de datos
use tejo_tournament_db

// 2. Crear colecciones
db.createCollection("torneos")
db.createCollection("equipos")
db.createCollection("jugadores")
db.createCollection("partidos")
db.createCollection("usuarios")
db.createCollection("auditoria")

// 3. Verificar que se crearon
show collections