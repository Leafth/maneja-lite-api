import dotenv from "dotenv/config.js";
import sequelize from "./config/database.js";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

try {
  await sequelize.authenticate();

  await sequelize.sync();

  console.log("Conectado ao banco de dados.");

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
} catch (error) {
  console.error("Erro ao iniciar o servidor:", error);
}
