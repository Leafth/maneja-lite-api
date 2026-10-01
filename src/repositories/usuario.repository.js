import prisma from "../config/database.js";

const usuarioRepository = {
  buscarPorEmail(email) {
    return prisma.usuario.findUnique({
      where: { email },
    });
  },

  criar(dados) {
    return prisma.usuario.create({
      data: dados,
      select: {
        id: true,
        nome: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  buscarPorId(id) {
    return prisma.usuario.findUnique({
      where: { id },
    });
  },
};

export default usuarioRepository;
