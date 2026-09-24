import { Router } from "express";

import {
  listarGrupos,
  buscarGrupoPorId,
  criarGrupo,
  atualizarGrupo,
  excluirGrupo,
} from "../controllers/grupo.controller.js";
import { autenticar } from "../middlewares/auth.middleware.js";
import { buscarOcupacaoAtualPorGrupo } from "../controllers/ocupacoes.controller.js";

const router = Router();

router.use(autenticar);

/**
 * @swagger
 * /grupos:
 *   get:
 *     summary: Lista todos os grupos de animais
 *     description: Retorna a lista de grupos de animais cadastrados.
 *     tags:
 *       - Grupos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de grupos retornada com sucesso
 *         content:
 *           application/json:
 *             example:
 *               - id: "550e8400-e29b-41d4-a716-446655440000"
 *                 nome: Gado
 *                 quantidade: 12
 *                 createdAt: "2026-09-23T22:00:00.000Z"
 *                 updatedAt: "2026-09-23T22:00:00.000Z"
 *       401:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/", listarGrupos);

/**
 * @swagger
 * /grupos/{id}:
 *   get:
 *     summary: Obtém um grupo de animais pelo id
 *     description: Retorna os dados de um grupo de animais específico.
 *     tags:
 *       - Grupos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id do grupo
 *     responses:
 *       200:
 *         description: Grupo encontrado
 *         content:
 *           application/json:
 *             example:
 *               id: "550e8400-e29b-41d4-a716-446655440000"
 *               nome: Gado
 *               quantidade: 12
 *               createdAt: "2026-09-23T22:00:00.000Z"
 *               updatedAt: "2026-09-23T22:00:00.000Z"
 *       401:
 *         description: Token inválido ou expirado
 *       404:
 *         description: Grupo não encontrado
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Grupo não encontrado.
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/:id", buscarGrupoPorId);

/**
 * @swagger
 * /grupos/{id}/ocupacao/atual:
 *   get:
 *     summary: Obtém a ocupação atual de um grupo de animais
 *     description: Retorna os dados da ocupação atual de um grupo de animais específico.
 *     tags:
 *       - Grupos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do grupo
 *         example: "70dbd223-6bf9-4d9e-8937-2b3c2d406b65"
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
 *                 terreno:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     nome:
 *                       type: string
 *                     periodoDescanso:
 *                       type: integer
 *                     status:
 *                       type: string
 *                       enum:
 *                         - DISPONIVEL
 *                         - OCUPADO
 *                         - EM_DESCANSO
 *                     disponivelEm:
 *                       type: string
 *                       format: date-time
 *                       nullable: true
 *               example:
 *                 id: "3bd5e2df-012b-4179-ac0b-cc88356ecb95"
 *                 grupoId: "70dbd223-6bf9-4d9e-8937-2b3c2d406b65"
 *                 terrenoId: "f3dbf5b6-e8e2-4102-a1ed-6814d1a6a492"
 *                 dataEntrada: "2026-09-24T22:55:51.308Z"
 *                 dataSaida: null
 *                 descansoAte: null
 *                 createdAt: "2026-09-24T22:55:51.316Z"
 *                 updatedAt: "2026-09-24T22:55:51.316Z"
 *                 terreno:
 *                   id: "f3dbf5b6-e8e2-4102-a1ed-6814d1a6a492"
 *                   nome: "Terreno Norte"
 *                   periodoDescanso: 30
 *                   status: "OCUPADO"
 *                   disponivelEm: null
 *       401:
 *         description: Token inválido ou expirado
 *       404:
 *         description: Grupo não encontrado ou sem ocupação atual
 *         content:
 *           application/json:
 *             example:
 *               error: "Grupo não possui ocupação ativa"
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/:id/ocupacao/atual", buscarOcupacaoAtualPorGrupo);

/**
 * @swagger
 * /grupos:
 *   post:
 *     summary: Cadastra um novo grupo de animais
 *     description: Cria um novo grupo de animais utilizando nome e quantidade.
 *     tags:
 *       - Grupos
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
 *               - quantidade
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Gado
 *               quantidade:
 *                 type: integer
 *                 example: 12
 *     responses:
 *       201:
 *         description: Grupo cadastrado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: "550e8400-e29b-41d4-a716-446655440000"
 *               nome: Gado
 *               quantidade: 12
 *               createdAt: "2026-09-23T22:00:00.000Z"
 *               updatedAt: "2026-09-23T22:00:00.000Z"
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             examples:
 *               camposObrigatorios:
 *                 summary: Campos obrigatórios não informados
 *                 value:
 *                   mensagem: Nome e quantidade são obrigatórios.
 *               quantidadeInvalida:
 *                 summary: Quantidade não é um número inteiro
 *                 value:
 *                   mensagem: Quantidade deve ser um número inteiro.
 *               quantidadeNegativa:
 *                 summary: Quantidade negativa
 *                 value:
 *                   mensagem: Quantidade não pode ser negativa.
 *       401:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/", criarGrupo);

/**
 * @swagger
 * /grupos/{id}:
 *   put:
 *     summary: Atualiza um grupo de animais
 *     description: Atualiza o nome e a quantidade de um grupo de animais existente.
 *     tags:
 *       - Grupos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id do grupo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - quantidade
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Gado
 *               quantidade:
 *                 type: integer
 *                 example: 15
 *     responses:
 *       200:
 *         description: Grupo atualizado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: "550e8400-e29b-41d4-a716-446655440000"
 *               nome: Gado
 *               quantidade: 15
 *               createdAt: "2026-09-23T22:00:00.000Z"
 *               updatedAt: "2026-09-23T22:05:00.000Z"
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido ou expirado
 *       404:
 *         description: Grupo não encontrado
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Grupo não encontrado.
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/:id", atualizarGrupo);

/**
 * @swagger
 * /grupos/{id}:
 *   delete:
 *     summary: Remove um grupo de animais
 *     description: Exclui um grupo de animais existente.
 *     tags:
 *       - Grupos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id do grupo
 *     responses:
 *       204:
 *         description: Grupo removido com sucesso
 *       401:
 *         description: Token inválido ou expirado
 *       404:
 *         description: Grupo não encontrado
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Grupo não encontrado.
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/:id", excluirGrupo);

export default router;
