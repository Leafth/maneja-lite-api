import prisma from "../config/database.js";

const ocupacaoRepository = {
  buscarAtualPorGrupo(grupoId) {
    return prisma.ocupacao.findFirst({
      where: {
        grupoId,
        dataSaida: null,
      },
      include: {
        terreno: true,
      },
      orderBy: {
        dataEntrada: "desc",
      },
    });
  },

  buscarAtualPorTerreno(terrenoId) {
    return prisma.ocupacao.findFirst({
      where: {
        terrenoId,
        dataSaida: null,
      },
      include: {
        grupo: true,
      },
      orderBy: {
        dataEntrada: "desc",
      },
    });
  },

  buscarHistoricoPorGrupo(grupoId) {
    return prisma.ocupacao.findMany({
      where: {
        grupoId,
      },
      include: {
        terreno: true,
      },
      orderBy: {
        dataEntrada: "desc",
      },
    });
  },

  buscarHistoricoPorTerreno(terrenoId) {
    return prisma.ocupacao.findMany({
      where: {
        terrenoId,
      },
      include: {
        grupo: true,
      },
      orderBy: {
        dataEntrada: "desc",
      },
    });
  },

  buscarPorId(id) {
    return prisma.ocupacao.findUnique({
      where: {
        id,
      },
      include: {
        grupo: true,
        terreno: true,
      },
    });
  },

  registrarOcupacao({
    grupoId,
    terrenoId,
    ocupacaoAtual = null,
    descansoAte = null,
  }) {
    return prisma.$transaction(async (tx) => {
      const agora = new Date();

      if (ocupacaoAtual) {
        await tx.ocupacao.update({
          where: {
            id: ocupacaoAtual.id,
          },
          data: {
            dataSaida: agora,
            descansoAte,
          },
        });

        await tx.terreno.update({
          where: {
            id: ocupacaoAtual.terrenoId,
          },
          data: {
            status: "EM_DESCANSO",
            disponivelEm: descansoAte,
          },
        });
      }

      const novaOcupacao = await tx.ocupacao.create({
        data: {
          grupoId,
          terrenoId,
          dataEntrada: agora,
        },
      });

      await tx.terreno.update({
        where: {
          id: terrenoId,
        },
        data: {
          status: "OCUPADO",
          disponivelEm: null,
        },
      });

      return novaOcupacao;
    });
  },
};

export default ocupacaoRepository;
