import { Router } from "express";
import { autenticar } from "../middlewares/auth.middleware.js";
import { buscarResumo } from "../controllers/resumo.controller.js";

const router = Router();

router.use(autenticar);

/**
 * @swagger
 * /resumo:
 *   get:
 *     summary: Consulta o resumo do sistema
 *     tags:
 *       - Resumo
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Resumo do sistema
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 terrenos:
 *                   type: integer
 *                   example: 5
 *                 grupos:
 *                   type: integer
 *                   example: 3
 *                 animais:
 *                   type: integer
 *                   example: 42
 *       401:
 *         description: Usuário não autenticado
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/", buscarResumo);

export default router;