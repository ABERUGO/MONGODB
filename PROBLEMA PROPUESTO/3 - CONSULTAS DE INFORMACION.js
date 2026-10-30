// Buscar carros de la marca Toyota
db.carros.find({ marca: "Toyota" })

// Buscar carros que NO sean de la marca Toyota
db.carros.find({ marca: { $ne: "Toyota" } })

// Buscar carros con kilometraje mayor o igual a 6000
db.carros.find({ kilometraje: { $gte: 6000 } })

// Consulta combinada: Toyota Y con kilometraje >= 6000
db.carros.find({ marca: "Toyota", kilometraje: { $gte: 6000 } })

// Buscar carros con kilometraje entre 5000 y 15000
db.carros.find({ kilometraje: { $gte: 5000, $lte: 15000 } })