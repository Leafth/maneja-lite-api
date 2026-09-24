import { Router } from "express";
import { autenticar } from "../middlewares/auth.middleware.js";
import { criarOcupacao } from "../controllers/ocupacoes.controller.js";

const router = Router();
router.use(autenticar);

router.post("/", criarOcupacao);

export default router;
