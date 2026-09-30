import prisma from "../config/database.js";

const resumoRepository = {
  async contarTerrenos() {
    return prisma.terreno.count({
      where: {
        deletedAt: null,
      },
    });
  },

  async contarGrupos() {
    return prisma.grupo.count({
      where: {
        deletedAt: null,
      },
    });
  },

  async contarAnimais() {
    const grupos = await prisma.grupo.findMany({
      where: {
        deletedAt: null,
      },
      select: {
        quantidade: true,
      },
    });

    return grupos.reduce((total, grupo) => total + grupo.quantidade, 0);
  },
};

export default resumoRepository;
