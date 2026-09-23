import { Router } from "express";

import authRoutes from "./auth.routes.js";
import terrenoRoutes from "./terreno.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/terrenos", terrenoRoutes);

export default router;