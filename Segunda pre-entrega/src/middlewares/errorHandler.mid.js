const errorHandler = (err, req, res, next) => {
  console.log("Error:", err);
  const status = err.status || 500;
  const message = err.message || "Internal server error";
  res.status(status).json({ method: req.method, url: req.url, error: message });
};
// errorHandler es el unico middleware que recibe 3 parametros, el error, la request y la response
// se encarga de manejar los errores que se generan en la aplicacion
export default errorHandler;
