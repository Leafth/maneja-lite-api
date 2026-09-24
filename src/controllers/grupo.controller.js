import grupoRepository from "../repositories/grupo.repository.js";

function validarDados({ nome, quantidade }) {
  if (!nome || quantidade === undefined || quantidade === null) {
    return "Nome e quantidade são obrigatórios.";
  }

  if (typeof quantidade !== "number" || !Number.isInteger(quantidade)) {
    return "Quantidade deve ser um número inteiro.";
  }

  if (quantidade < 0) {
    return "Quantidade não pode ser negativa.";
  }

  return null;
}

function validarAtualizacao({ nome, quantidade }) {
  if (nome !== undefined && (!nome || nome.trim() === "")) {
    return "Nome não pode ser vazio.";
  }

  if (
    quantidade !== undefined &&
    (typeof quantidade !== "number" || !Number.isInteger(quantidade))
  ) {
    return "Quantidade deve ser um número inteiro.";
  }

  if (quantidade !== undefined && quantidade < 0) {
    return "Quantidade não pode ser negativa.";
  }

  return null;
}

export async function listarGrupos(req, res) {
  try {
    const grupos = await grupoRepository.listar();

    return res.status(200).json(grupos);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensagem: "Erro interno do servidor.",
    });
  }
}

export async function buscarGrupoPorId(req, res) {
  try {
    const { id } = req.params;

    const grupo = await grupoRepository.buscarPorId(id);

    if (!grupo) {
      return res.status(404).json({
        mensagem: "Grupo não encontrado.",
      });
    }

    return res.status(200).json(grupo);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensagem: "Erro interno do servidor.",
    });
  }
}

export async function criarGrupo(req, res) {
  try {
    const { nome, quantidade } = req.body;

    const erro = validarDados({ nome, quantidade });

    if (erro) {
      return res.status(400).json({
        mensagem: erro,
      });
    }

    const grupo = await grupoRepository.criar({
      nome: nome.trim(),
      quantidade,
    });

    return res.status(201).json(grupo);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensagem: "Erro interno do servidor.",
    });
  }
}

export async function atualizarGrupo(req, res) {
  try {
    const { id } = req.params;
    const { nome, quantidade } = req.body;

    const error = validarAtualizacao({ nome, quantidade });

    if (error) {
      return res.status(400).json({
        mensagem: error,
      });
    }

    const grupoExistente = await grupoRepository.buscarPorId(id);

    if (!grupoExistente) {
      return res.status(404).json({
        mensagem: "Grupo não encontrado.",
      });
    }

    const dados = {};

    if (nome !== undefined) {
      dados.nome = nome.trim();
    }

    if (quantidade !== undefined) {
      dados.quantidade = quantidade;
    }

    const grupo = await grupoRepository.atualizar(id, dados);

    return res.status(200).json(grupo);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensagem: "Erro interno do servidor.",
    });
  }
}

export async function excluirGrupo(req, res) {
  try {
    const { id } = req.params;

    const grupoExistente = await grupoRepository.buscarPorId(id);

    if (!grupoExistente) {
      return res.status(404).json({
        mensagem: "Grupo não encontrado.",
      });
    }

    await grupoRepository.excluir(id);

    return res.status(204).send();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensagem: "Erro interno do servidor.",
    });
  }
}
