// Actualizar el kilometraje del Toyota
db.carros.updateOne(
    { placa: "AND916" },
    { $set: { kilometraje: 16000 } }
)

// Eliminar el carro Volkswagen
db.carros.deleteOne({ placa: "EUF363" })