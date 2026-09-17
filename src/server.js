import "dotenv/config";
import app from "./app.js";
import prisma from "./config/database.js";

const PORT = process.env.PORT || 3000;

try {
  await prisma.$connect();

  console.log("Banco conectado com sucesso.");

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
} catch (error) {
  console.error("Erro ao iniciar o servidor:", error);
  process.exit(1);
}
