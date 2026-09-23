-- CreateTable
CREATE TABLE "terrenos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "periodoDescanso" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DISPONIVEL',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
