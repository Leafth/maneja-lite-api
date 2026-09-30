import prisma from "../config/database.js";

const terrenoRepository = {
  async liberarTerrenosDisponiveis() {
    return prisma.terreno.updateMany({
      where: {
        status: "EM_DESCANSO",
        disponivelEm: {
          lte: new Date(),
        },
        deletedAt: null,
      },
      data: {
        status: "DISPONIVEL",
        disponivelEm: null,
      },
    });
  },

  criar(dados) {
    return prisma.terreno.create({ data: dados });
  },

  async buscarTodos() {
    await this.liberarTerrenosDisponiveis();

    return prisma.terreno.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async buscarPorId(id) {
    await this.liberarTerrenosDisponiveis();

    return prisma.terreno.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  },

  atualizar(id, dados) {
    return prisma.terreno.update({
      where: { id },
      data: dados,
    });
  },

  excluir(id) {
    return prisma.terreno.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  },

  temOcupacaoAtual(id) {
    return prisma.ocupacao.findFirst({
      where: {
        terrenoId: id,
        dataSaida: null,
      },
    });
  },
};

export default terrenoRepository;
