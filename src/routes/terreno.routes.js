import { Router } from "express";

import {
  atualizarTerreno,
  criarTerreno,
  excluirTerreno,
  listarTerrenos,
  obterTerreno,
} from "../controllers/terreno.controller.js";
import { autenticar } from "../middlewares/auth.middleware.js";
import { buscarOcupacaoAtualPorTerreno } from "../controllers/ocupacoes.controller.js";

const router = Router();

router.use(autenticar);

/**
 * @swagger
 * /terrenos:
 *   post:
 *     summary: Cadastra um novo terreno
 *     description: Cria um terreno utilizando nome e período de descanso. O status inicial é sempre DISPONIVEL.
 *     tags:
 *       - Terrenos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - periodoDescanso
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Pasto Norte
 *               periodoDescanso:
 *                 type: integer
 *                 minimum: 0
 *                 example: 30
 *     responses:
 *       201:
 *         description: Terreno cadastrado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: "550e8400-e29b-41d4-a716-446655440000"
 *               nome: Pasto Norte
 *               periodoDescanso: 30
 *               status: DISPONIVEL
 *               createdAt: "2026-09-23T12:00:00.000Z"
 *               updatedAt: "2026-09-23T12:00:00.000Z"
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             examples:
 *               nomeInvalido:
 *                 summary: Nome não informado
 *                 value:
 *                   mensagem: Nome é obrigatório.
 *               periodoDescansoInvalido:
 *                 summary: Período de descanso inválido
 *                 value:
 *                   mensagem: O período de descanso deve ser um número inteiro maior ou igual a 0.
 *       401:
 *         description: Token não informado, inválido ou expirado
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Token inválido ou expirado.
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Erro interno do servidor.
 */
router.post("/", criarTerreno);

/**
 * @swagger
 * /terrenos:
 *   get:
 *     summary: Lista todos os terrenos
 *     description: Retorna todos os terrenos cadastrados, do mais recente para o mais antigo.
 *     tags:
 *       - Terrenos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de terrenos
 *         content:
 *           application/json:
 *             example:
 *               - id: "550e8400-e29b-41d4-a716-446655440000"
 *                 nome: Pasto Norte
 *                 periodoDescanso: 30
 *                 status: DISPONIVEL
 *                 createdAt: "2026-09-23T12:00:00.000Z"
 *                 updatedAt: "2026-09-23T12:00:00.000Z"
 *       401:
 *         description: Token não informado, inválido ou expirado
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Token inválido ou expirado.
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Erro interno do servidor.
 */
router.get("/", listarTerrenos);

/**
 * @swagger
 * /terrenos/{id}:
 *   get:
 *     summary: Busca um terreno pelo id
 *     description: Retorna os dados de um terreno específico.
 *     tags:
 *       - Terrenos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id do terreno
 *         schema:
 *           type: string
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Terreno encontrado
 *         content:
 *           application/json:
 *             example:
 *               id: "550e8400-e29b-41d4-a716-446655440000"
 *               nome: Pasto Norte
 *               periodoDescanso: 30
 *               status: DISPONIVEL
 *               createdAt: "2026-09-23T12:00:00.000Z"
 *               updatedAt: "2026-09-23T12:00:00.000Z"
 *       401:
 *         description: Token não informado, inválido ou expirado
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Token inválido ou expirado.
 *       404:
 *         description: Terreno não encontrado
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Terreno não encontrado.
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Erro interno do servidor.
 */
router.get("/:id", obterTerreno);

router.get("/:id/ocupacao/atual", buscarOcupacaoAtualPorTerreno);

/**
 * @swagger
 * /terrenos/{id}:
 *   put:
 *     summary: Atualiza um terreno
 *     description: Atualiza o nome e o período de descanso de um terreno. O status não pode ser alterado por esta rota.
 *     tags:
 *       - Terrenos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id do terreno
 *         schema:
 *           type: string
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - periodoDescanso
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Pasto Norte Ampliado
 *               periodoDescanso:
 *                 type: integer
 *                 minimum: 0
 *                 example: 45
 *     responses:
 *       200:
 *         description: Terreno atualizado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: "550e8400-e29b-41d4-a716-446655440000"
 *               nome: Pasto Norte Ampliado
 *               periodoDescanso: 45
 *               status: DISPONIVEL
 *               createdAt: "2026-09-23T12:00:00.000Z"
 *               updatedAt: "2026-09-23T13:00:00.000Z"
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             examples:
 *               nomeInvalido:
 *                 summary: Nome não informado
 *                 value:
 *                   mensagem: Nome é obrigatório.
 *               periodoDescansoInvalido:
 *                 summary: Período de descanso inválido
 *                 value:
 *                   mensagem: O período de descanso deve ser um número inteiro maior ou igual a 0.
 *       401:
 *         description: Token não informado, inválido ou expirado
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Token inválido ou expirado.
 *       404:
 *         description: Terreno não encontrado
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Terreno não encontrado.
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Erro interno do servidor.
 */
router.put("/:id", atualizarTerreno);

/**
 * @swagger
 * /terrenos/{id}:
 *   delete:
 *     summary: Exclui um terreno
 *     description: Remove um terreno pelo id.
 *     tags:
 *       - Terrenos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id do terreno
 *         schema:
 *           type: string
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       204:
 *         description: Terreno excluído com sucesso
 *       401:
 *         description: Token não informado, inválido ou expirado
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Token inválido ou expirado.
 *       404:
 *         description: Terreno não encontrado
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Terreno não encontrado.
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Erro interno do servidor.
 */
router.delete("/:id", excluirTerreno);

export default router;
