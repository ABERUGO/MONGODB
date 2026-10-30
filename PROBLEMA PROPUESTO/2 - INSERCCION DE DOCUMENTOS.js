// Insertar un solo documento
db.carros.insertOne({
  placa: "AND916",
  numero_serie: "123456789",
  modelo: "Sedán",
  marca: "Toyota",
  kilometraje: 15000,
  tipo: "Gasolina"
})

// Insertar varios documentos
db.carros.insertMany([
  {
    placa: "ARP123",
    numero_serie: "987654321",
    modelo: "Coupé",
    marca: "Chevrolet",
    kilometraje: 5000,
    tipo: "Diésel"
  },
  {
    placa: "EUF363",
    numero_serie: "3VWFE21C04M123456",
    modelo: "2022",
    marca: "Volkswagen",
    kilometraje: 5000,
    tipo: "Sedán"
  }
])