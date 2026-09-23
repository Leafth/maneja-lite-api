import prisma from "../config/database.js";

const terrenoRepository = {
  criar(dados) {
    return prisma.terreno.create({ data: dados });
  },

  buscarTodos() {
    return prisma.terreno.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  buscarPorId(id) {
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