import prisma from "../config/database.js";

const resumoRepository = {
  async contarTerrenos() {
    return prisma.terreno.count();
  },

  async contarGrupos() {
    return prisma.grupo.count();
  },

  async contarAnimais() {
    const grupos = await prisma.grupo.findMany({
      select: {
        quantidade: true,
      },
    });

    return grupos.reduce((total, grupo) => total + grupo.quantidade, 0);
  },
};

export default resumoRepository;