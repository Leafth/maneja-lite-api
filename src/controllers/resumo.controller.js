import resumoRepository from "../repositories/resumo.repository.js";

export async function buscarResumo(req, res) {
  try {
    const terrenos = await resumoRepository.contarTerrenos();
    const grupos = await resumoRepository.contarGrupos();
    const animais = await resumoRepository.contarAnimais();

    return res.status(200).json({
      terrenos,
      grupos,
      animais,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}