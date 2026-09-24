import { Router } from "express";

import authRoutes from "./auth.routes.js";
import grupoRoutes from "./grupo.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/grupos", grupoRoutes);

export default router;
