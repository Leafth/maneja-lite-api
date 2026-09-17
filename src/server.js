import dotenv from "dotenv/config.js";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

console.log("Conectado ao banco de dados.");

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
