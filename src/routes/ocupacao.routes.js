import { Router } from "express";
import { autenticar } from "../middlewares/auth.middleware.js";
import { criarOcupacao } from "../controllers/ocupacoes.controller.js";

const router = Router();
router.use(autenticar);

/**
 * @swagger
 * /ocupacoes:
 *   post:
 *     summary: Registra uma ocupação
 *     description: >
 *       Registra um grupo em um terreno. Caso o grupo já possua uma ocupação
 *       ativa, a ocupação anterior é encerrada, o terreno anterior entra em
 *       descanso e uma nova ocupação é criada no terreno informado.
 *     tags:
 *       - Ocupações
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - grupoId
 *               - terrenoId
 *             properties:
 *               grupoId:
 *                 type: string
 *                 format: uuid
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *               terrenoId:
 *                 type: string
 *                 format: uuid
 *                 example: "550e8400-e29b-41d4-a716-446655440001"
 *     responses:
 *       201:
 *         description: Ocupação registrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 grupoId:
 *                   type: string
 *                   format: uuid
 *                   example: "550e8400-e29b-41d4-a716-446655440000"
 *                 terrenoId:
 *                   type: string
 *                   format: uuid
 *                   example: "550e8400-e29b-41d4-a716-446655440001"
 *                 dataEntrada:
 *                   type: string
 *                   format: date-time
 *                 dataSaida:
 *                   type: string
 *                   format: date-time
 *                   nullable: true
 *                 descansoAte:
 *                   type: string
 *                   format: date-time
 *                   nullable: true
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Dados inválidos, terreno indisponível ou grupo já ocupando o terreno
 *       401:
 *         description: Usuário não autenticado
 *       404:
 *         description: Grupo ou terreno não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/", criarOcupacao);

export default router;
