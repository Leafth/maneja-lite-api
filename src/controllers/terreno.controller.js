import terrenoRepository from "../repositories/terreno.repository.js";

function validarDadosTerreno(nome, periodoDescanso) {
  if (typeof nome !== "string" || nome.trim() === "") {
    return "Nome é obrigatório.";
  }

  if (!Number.isInteger(periodoDescanso) || periodoDescanso < 0) {
    return "O período de descanso deve ser um número inteiro maior ou igual a 0.";
  }

  return null;
}

function validarDadosTerrenoAtualizacao(nome, periodoDescanso) {
  if (nome !== undefined && (typeof nome !== "string" || nome.trim() === "")) {
    return "Nome não pode ser vazio.";
  }

  if (
    periodoDescanso !== undefined &&
    (!Number.isInteger(periodoDescanso) || periodoDescanso < 0)
  ) {
    return "O período de descanso deve ser um número inteiro maior ou igual a 0.";
  }

  return null;
}

export async function criarTerreno(req, res) {
  try {
    const { nome, periodoDescanso } = req.body;

    const erroValidacao = validarDadosTerreno(nome, periodoDescanso);

    if (erroValidacao) {
      return res.status(400).json({ mensagem: erroValidacao });
    }

    const terreno = await terrenoRepository.criar({
      nome: nome.trim(),
      periodoDescanso,
    });

    return res.status(201).json(terreno);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensagem: "Erro interno do servidor.",
    });
  }
}

export async function listarTerrenos(req, res) {
  try {
    const terrenos = await terrenoRepository.buscarTodos();

    return res.status(200).json(terrenos);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensagem: "Erro interno do servidor.",
    });
  }
}

export async function obterTerreno(req, res) {
  try {
    const terreno = await terrenoRepository.buscarPorId(req.params.id);

    if (!terreno) {
      return res.status(404).json({ mensagem: "Terreno não encontrado." });
    }

    return res.status(200).json(terreno);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensagem: "Erro interno do servidor.",
    });
  }
}

export async function atualizarTerreno(req, res) {
  try {
    const { id } = req.params;
    const { nome, periodoDescanso } = req.body;

    const erroValidacao = validarDadosTerrenoAtualizacao(nome, periodoDescanso);

    if (erroValidacao) {
      return res.status(400).json({ mensagem: erroValidacao });
    }

    const terrenoExistente = await terrenoRepository.buscarPorId(id);

    if (!terrenoExistente) {
      return res.status(404).json({ mensagem: "Terreno não encontrado." });
    }

    const dados = {};

    if (nome !== undefined) {
      dados.nome = nome.trim();
    }

    if (periodoDescanso !== undefined) {
      dados.periodoDescanso = periodoDescanso;
    }

    const terreno = await terrenoRepository.atualizar(id, dados);

    return res.status(200).json(terreno);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensagem: "Erro interno do servidor.",
    });
  }
}

export async function excluirTerreno(req, res) {
  try {
    const { id } = req.params;

    const terrenoExistente = await terrenoRepository.buscarPorId(id);

    if (!terrenoExistente) {
      return res.status(404).json({ mensagem: "Terreno não encontrado." });
    }

    await terrenoRepository.excluir(id);

    return res.status(204).send();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensagem: "Erro interno do servidor.",
    });
  }
}
