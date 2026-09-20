import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import usuarioRepository from "../repositories/usuario.repository.js";

export async function cadastrar(req, res) {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        mensagem: "Nome, email e senha são obrigatórios.",
      });
    }

    if (senha.length < 6) {
      return res.status(400).json({
        mensagem: "A senha deve possuir pelo menos 6 caracteres.",
      });
    }

    const emailNormalizado = email.trim().toLowerCase();

    const usuarioExistente =
      await usuarioRepository.buscarPorEmail(emailNormalizado);

    if (usuarioExistente) {
      return res.status(409).json({
        mensagem: "Já existe um usuário cadastrado com este email.",
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await usuarioRepository.criar({
      nome: nome.trim(),
      email: emailNormalizado,
      senha: senhaHash,
    });

    return res.status(201).json(usuario);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensagem: "Erro interno do servidor.",
    });
  }
}

export async function login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        mensagem: "Email e senha são obrigatórios.",
      });
    }

    const emailNormalizado = email.trim().toLowerCase();

    const usuario = await usuarioRepository.buscarPorEmail(emailNormalizado);

    if (!usuario) {
      return res.status(401).json({
        mensagem: "Email ou senha inválidos.",
      });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({
        mensagem: "Email ou senha inválidos.",
      });
    }

    const token = jwt.sign({}, process.env.JWT_SECRET, {
      subject: usuario.id,
      expiresIn: "7d",
    });

    return res.status(200).json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensagem: "Erro interno do servidor.",
    });
  }
}

export async function obterPerfil(req, res) {
  try {
    const usuario = await usuarioRepository.buscarPorId(req.usuarioId);

    if (!usuario) {
      return res.status(404).json({
        mensagem: "Usuário não encontrado.",
      });
    }

    return res.status(200).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensagem: "Erro interno do servidor.",
    });
  }
}
