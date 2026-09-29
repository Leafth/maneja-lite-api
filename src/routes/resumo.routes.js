import { Router } from "express";
import { autenticar } from "../middlewares/auth.middleware.js";
import { buscarResumo } from "../controllers/resumo.controller.js";

const router = Router();

router.use(autenticar);

router.get("/", buscarResumo);

export default router;