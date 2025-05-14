module.exports = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Sirve para permitir todas las peticiones al servidor
  res.header(
    "Access-Control-Allow-Headers", // Permitir aceptar todos los encabezados
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET"); // Métodos permitidos para realizar peticiones al servidor
    return res.status(200).json({});
  }
  next();
};
