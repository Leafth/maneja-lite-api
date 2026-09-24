import { Router } from "express";

import authRoutes from "./auth.routes.js";
import grupoRoutes from "./grupo.routes.js";
import terrenoRoutes from "./terreno.routes.js";
import ocupacaoRoutes from "./ocupacao.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/grupos", grupoRoutes);
router.use("/terrenos", terrenoRoutes);
router.use("/ocupacoes", ocupacaoRoutes);

export default router;
