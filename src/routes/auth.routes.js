import { Router } from "express";

import {
  cadastrar,
  login,
  obterPerfil,
} from "../controllers/auth.controller.js";
import { autenticar } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Cadastra um novo usuário
 *     description: Cria um novo usuário utilizando nome, email e senha.
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Carlos
 *               email:
 *                 type: string
 *                 format: email
 *                 example: carlos@email.com
 *               senha:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             examples:
 *               camposObrigatorios:
 *                 summary: Campos obrigatórios não informados
 *                 value:
 *                   mensagem: Nome, email e senha são obrigatórios.
 *               senhaCurta:
 *                 summary: Senha com menos de 6 caracteres
 *                 value:
 *                   mensagem: A senha deve possuir pelo menos 6 caracteres.
 *       409:
 *         description: Email já cadastrado
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Já existe um usuário cadastrado com este email.
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/register", cadastrar);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login do usuário
 *     description: Autentica o usuário através do email e senha e retorna um token JWT.
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: carlos@email.com
 *               senha:
 *                 type: string
 *                 format: password
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               usuario:
 *                 id: "550e8400-e29b-41d4-a716-446655440000"
 *                 nome: Carlos
 *                 email: carlos@email.com
 *       400:
 *         description: Email e senha são obrigatórios
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Email e senha são obrigatórios.
 *       401:
 *         description: Email ou senha inválidos
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Email ou senha inválidos.
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/login", login);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Obtém o perfil do usuário autenticado
 *     description: Retorna os dados do usuário autenticado com base no token JWT fornecido.
 *     tags:
 *       - Autenticação
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil do usuário autenticado
 *         content:
 *           application/json:
 *             example:
 *               id: "550e8400-e29b-41d4-a716-446655440000"
 *               nome: Carlos
 *               email: carlos@email.com
 *       401:
 *         description: Token inválido ou expirado
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
router.get("/me", autenticar, obterPerfil);

export default router;
