import prisma from "../config/database.js";

const terrenoRepository = {
  async liberarTerrenosDisponiveis() {
    return prisma.terreno.updateMany({
      where: {
        status: "EM_DESCANSO",
        disponivelEm: {
          lte: new Date(),
        },
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
      orderBy: { createdAt: "desc" },
    });
  },

  async buscarPorId(id) {
    await this.liberarTerrenosDisponiveis();

    return prisma.terreno.findUnique({
      where: { id },
    });
  },

  atualizar(id, dados) {
    return prisma.terreno.update({
      where: { id },
      data: dados,
    });
  },

  excluir(id) {
    return prisma.terreno.delete({
      where: { id },
    });
  },
};

export default terrenoRepository;
