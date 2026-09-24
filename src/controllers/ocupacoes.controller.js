import grupoRepository from "../repositories/grupo.repository.js";
import terrenoRepository from "../repositories/terreno.repository.js";
import ocupacaoRepository from "../repositories/ocupacao.repository.js";

export async function criarOcupacao(req, res) {
  try {
    const { grupoId, terrenoId } = req.body ?? {};

    if (!grupoId || !terrenoId) {
      return res
        .status(400)
        .json({ error: "Grupo e Terreno são obrigatórios" });
    }

    const grupo = await grupoRepository.buscarPorId(grupoId);

    if (!grupo) {
      return res.status(404).json({ error: "Grupo não encontrado" });
    }

    const terrenoDestino = await terrenoRepository.buscarPorId(terrenoId);

    if (!terrenoDestino) {
      return res.status(404).json({ error: "Terreno não encontrado" });
    }

    const ocupacaoAtual = await ocupacaoRepository.buscarAtualPorGrupo(grupoId);

    if (ocupacaoAtual?.terrenoId === terrenoId) {
      return res
        .status(400)
        .json({ error: "Grupo já está ocupando este terreno" });
    }

    if (terrenoDestino.status !== "DISPONIVEL") {
      return res.status(400).json({ error: "Terreno não está disponível" });
    }

    let descansoAte = null;

    if (ocupacaoAtual) {
      descansoAte = new Date();

      descansoAte.setDate(
        descansoAte.getDate() + ocupacaoAtual.terreno.periodoDescanso,
      );
    }

    const novaOcupacao = await ocupacaoRepository.registrarOcupacao({
      grupoId,
      terrenoId,
      ocupacaoAtual,
      descansoAte,
    });

    return res.status(201).json(novaOcupacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
