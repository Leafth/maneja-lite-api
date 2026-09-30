import prisma from "../config/database.js";

const grupoRepository = {
  listar() {
    return prisma.grupo.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  buscarPorId(id) {
    return prisma.grupo.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  },

  criar(dados) {
    return prisma.grupo.create({
      data: dados,
    });
  },

  atualizar(id, dados) {
    return prisma.grupo.update({
      where: { id },
      data: dados,
    });
  },

  excluir(id) {
    return prisma.grupo.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  },

  temOcupacaoAtual(id) {
    return prisma.ocupacao.findFirst({
      where: {
        grupoId: id,
        dataSaida: null,
      },
    });
  },
};

export default grupoRepository;
