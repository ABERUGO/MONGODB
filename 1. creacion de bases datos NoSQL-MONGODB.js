// ============================================
// 1. CREACIÓN DE LA BASE DE DATOS
// ============================================

use tejo_tournament_db

// ============================================
// 2. CREACIÓN DE COLECCIONES CON VALIDACIÓN
// ============================================

// 2.1 Colección: torneos
db.createCollection("torneos", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["nombre", "fecha_inicio", "fecha_fin", "estado", "categoria"],
         properties: {
            nombre: {
               bsonType: "string",
               description: "Nombre del torneo - obligatorio"
            },
            fecha_inicio: {
               bsonType: "date",
               description: "Fecha de inicio - obligatorio"
            },
            fecha_fin: {
               bsonType: "date",
               description: "Fecha de fin - obligatorio"
            },
            ubicacion: {
               bsonType: "object",
               required: ["ciudad", "direccion"],
               properties: {
                  ciudad: { bsonType: "string" },
                  direccion: { bsonType: "string" },
                  coordenadas: {
                     bsonType: "object",
                     properties: {
                        lat: { bsonType: "double" },
                        lng: { bsonType: "double" }
                     }
                  }
               }
            },
            estado: {
               bsonType: "string",
               enum: ["activo", "finalizado", "cancelado", "en_preparacion"],
               description: "Estado del torneo - obligatorio"
            },
            categoria: {
               bsonType: "string",
               enum: ["profesional", "amateur", "juvenil", "femenino"],
               description: "Categoría del torneo - obligatorio"
            },
            premio_total: { bsonType: "number" },
            reglas: {
               bsonType: "object",
               properties: {
                  puntos_por_emboque: { bsonType: "number" },
                  puntos_por_mano: { bsonType: "number" },
                  puntos_por_pasada: { bsonType: "number" },
                  rondas: { bsonType: "number" }
               }
            }
         }
      }
   }
})

// 2.2 Colección: equipos
db.createCollection("equipos", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["nombre", "ciudad", "categoria", "integrantes"],
         properties: {
            nombre: { bsonType: "string" },
            ciudad: { bsonType: "string" },
            capitan_id: { bsonType: "objectId" },
            integrantes: {
               bsonType: "array",
               items: {
                  bsonType: "object",
                  required: ["jugador_id", "rol"],
                  properties: {
                     jugador_id: { bsonType: "objectId" },
                     rol: { 
                        bsonType: "string",
                        enum: ["tirador", "reserva", "capitan"]
                     },
                     numero_camiseta: { bsonType: "number" }
                  }
               }
            },
            categoria: {
               bsonType: "string",
               enum: ["profesional", "amateur", "juvenil", "femenino"]
            },
            estadisticas: {
               bsonType: "object",
               properties: {
                  partidos_jugados: { bsonType: "number" },
                  partidos_ganados: { bsonType: "number" },
                  partidos_perdidos: { bsonType: "number" },
                  puntos_totales: { bsonType: "number" }
               }
            }
         }
      }
   }
})

// 2.3 Colección: jugadores
db.createCollection("jugadores", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["nombre", "apellidos", "documento", "fecha_nacimiento"],
         properties: {
            nombre: { bsonType: "string" },
            apellidos: { bsonType: "string" },
            documento: { bsonType: "string" },
            fecha_nacimiento: { bsonType: "date" },
            ciudad_nacimiento: { bsonType: "string" },
            contacto: {
               bsonType: "object",
               properties: {
                  telefono: { bsonType: "string" },
                  email: { bsonType: "string" }
               }
            },
            estadisticas_carrera: {
               bsonType: "object",
               properties: {
                  partidos_jugados: { bsonType: "number" },
                  puntos_totales: { bsonType: "number" },
                  emboques: { bsonType: "number" },
                  manos: { bsonType: "number" },
                  pasadas: { bsonType: "number" },
                  porcentaje_acierto: { bsonType: "number" }
               }
            },
            historial_torneos: {
               bsonType: "array",
               items: {
                  bsonType: "object",
                  properties: {
                     torneo_id: { bsonType: "objectId" },
                     equipo_id: { bsonType: "objectId" },
                     puntuacion: { bsonType: "number" },
                     posicion: { bsonType: "number" }
                  }
               }
            }
         }
      }
   }
})

// 2.4 Colección: partidos
db.createCollection("partidos", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["torneo_id", "equipo_local", "equipo_visitante", "fecha_programada"],
         properties: {
            torneo_id: { bsonType: "objectId" },
            fase: {
               bsonType: "string",
               enum: ["grupos", "octavos", "cuartos", "semifinal", "final"]
            },
            equipo_local: { bsonType: "objectId" },
            equipo_visitante: { bsonType: "objectId" },
            fecha_programada: { bsonType: "date" },
            fecha_inicio: { bsonType: "date" },
            fecha_fin: { bsonType: "date" },
            estado: {
               bsonType: "string",
               enum: ["programado", "en_curso", "finalizado", "cancelado"]
            },
            resultado: {
               bsonType: "object",
               properties: {
                  puntos_local: { bsonType: "number" },
                  puntos_visitante: { bsonType: "number" },
                  ganador: { bsonType: "objectId" }
               }
            },
            detalles: {
               bsonType: "array",
               items: {
                  bsonType: "object",
                  properties: {
                     ronda: { bsonType: "number" },
                     turno: { bsonType: "number" },
                     equipo_id: { bsonType: "objectId" },
                     jugador_id: { bsonType: "objectId" },
                     tiros: {
                        bsonType: "array",
                        items: {
                           bsonType: "object",
                           properties: {
                              tipo: {
                                 bsonType: "string",
                                 enum: ["emboque", "mano", "pasada"]
                              },
                              puntos: { bsonType: "number" },
                              distancia: { bsonType: "number" }
                           }
                        }
                     },
                     puntos_ronda: { bsonType: "number" }
                  }
               }
            }
         }
      }
   }
})

// 2.5 Colección: usuarios (autenticación y auditoría)
db.createCollection("usuarios", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["username", "email", "password_hash", "rol"],
         properties: {
            username: { bsonType: "string" },
            email: { bsonType: "string" },
            password_hash: { bsonType: "string" },
            rol: {
               bsonType: "string",
               enum: ["administrador", "arbitro", "espectador", "periodista"]
            },
            permisos: { bsonType: "array" },
            ultimo_acceso: { bsonType: "date" },
            activo: { bsonType: "boolean" }
         }
      }
   }
})

// 2.6 Colección: auditoria
db.createCollection("auditoria", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["usuario_id", "accion", "coleccion", "documento_id", "fecha"],
         properties: {
            usuario_id: { bsonType: "objectId" },
            accion: { bsonType: "string" },
            coleccion: { bsonType: "string" },
            documento_id: { bsonType: "objectId" },
            cambios: { bsonType: "object" },
            ip_origen: { bsonType: "string" },
            fecha: { bsonType: "date" }
         }
      }
   }
})