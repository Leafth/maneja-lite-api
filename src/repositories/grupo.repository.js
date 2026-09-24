import prisma from "../config/database.js";

const grupoRepository = {
  listar() {
    return prisma.grupo.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  buscarPorId(id) {
    return prisma.grupo.findUnique({
      where: { id },
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
    return prisma.grupo.delete({
      where: { id },
    });
  },
};

export default grupoRepository;
