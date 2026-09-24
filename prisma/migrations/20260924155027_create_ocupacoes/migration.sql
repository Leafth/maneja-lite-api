-- AlterTable
ALTER TABLE "terrenos" ADD COLUMN "disponivelEm" DATETIME;

-- CreateTable
CREATE TABLE "ocupacoes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "grupoId" TEXT NOT NULL,
    "terrenoId" TEXT NOT NULL,
    "dataEntrada" DATETIME NOT NULL,
    "dataSaida" DATETIME,
    "descansoAte" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ocupacoes_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ocupacoes_terrenoId_fkey" FOREIGN KEY ("terrenoId") REFERENCES "terrenos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "ocupacoes_grupoId_idx" ON "ocupacoes"("grupoId");

-- CreateIndex
CREATE INDEX "ocupacoes_terrenoId_idx" ON "ocupacoes"("terrenoId");

-- CreateIndex
CREATE INDEX "ocupacoes_grupoId_dataEntrada_idx" ON "ocupacoes"("grupoId", "dataEntrada");

-- CreateIndex
CREATE INDEX "ocupacoes_terrenoId_dataEntrada_idx" ON "ocupacoes"("terrenoId", "dataEntrada");
