const express = require("express");
const { userRoutes } = require("./routes/book.routes.js");

// La intencion del main es que sea una funcion async para poder hacer await en connect
// para el despliegue en Vercel
const main = async () => {
  // Conexion a la BBDD
  const { connect } = require("./db.js");
  try {
    await connect();
  } catch (error) {
    console.log(`Ha ocurrido un error al conectar: ${error}`);
  }

  // Configuracion del servidor
  const PORT = 3000;
  const server = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));

  // Rutas
  const router = express.Router();
  router.get("/", (req, res) => {
    res.send("Library API");
  });
  router.get("*", (req, res) => {
    res.status(404).send("La pagina solicitada no existe");
  });

  // Uso del router
  server.use("/book", userRoutes);
  server.use("/", router);

  // Ejecución del servidor
  server.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`);
  });
};

main();
