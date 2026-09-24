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

/**
 * @swagger
 * /terrenos/{id}/ocupacao/atual:
 *   get:
 *     summary: Obtém a ocupação atual de um terreno
 *     description: Retorna os dados da ocupação atual de um terreno específico.
 *     tags:
 *       - Terrenos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do terreno
 *         example: "f3dbf5b6-e8e2-4102-a1ed-6814d1a6a492"
 *     responses:
 *       200:
 *         description: Ocupação atual encontrada
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
 *                 terrenoId:
 *                   type: string
 *                   format: uuid
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
 *                 grupo:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     nome:
 *                       type: string
 *                     quantidade:
 *                       type: integer
 *               example:
 *                 id: "3bd5e2df-012b-4179-ac0b-cc88356ecb95"
 *                 grupoId: "70dbd223-6bf9-4d9e-8937-2b3c2d406b65"
 *                 terrenoId: "f3dbf5b6-e8e2-4102-a1ed-6814d1a6a492"
 *                 dataEntrada: "2026-09-24T22:55:51.308Z"
 *                 dataSaida: null
 *                 descansoAte: null
 *                 createdAt: "2026-09-24T22:55:51.316Z"
 *                 updatedAt: "2026-09-24T22:55:51.316Z"
 *                 grupo:
 *                   id: "70dbd223-6bf9-4d9e-8937-2b3c2d406b65"
 *                   nome: "Lote 12"
 *                   quantidade: 35
 *       401:
 *         description: Token inválido ou expirado
 *       404:
 *         description: Terreno não encontrado ou sem ocupação atual
 *         content:
 *           application/json:
 *             example:
 *               error: "Terreno não possui ocupação ativa"
 *       500:
 *         description: Erro interno do servidor
 */
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
