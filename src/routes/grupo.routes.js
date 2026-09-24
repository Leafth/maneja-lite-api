import { Router } from "express";

import {
  listarGrupos,
  buscarGrupoPorId,
  criarGrupo,
  atualizarGrupo,
  excluirGrupo,
} from "../controllers/grupo.controller.js";
import { autenticar } from "../middlewares/auth.middleware.js";

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