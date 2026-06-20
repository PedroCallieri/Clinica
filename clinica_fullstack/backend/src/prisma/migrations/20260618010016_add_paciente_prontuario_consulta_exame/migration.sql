/*
  Warnings:

  - You are about to drop the column `tipo_exame` on the `exame` table. All the data in the column will be lost.
  - Added the required column `pacienteId` to the `exame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoExame` to the `exame` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exame" DROP COLUMN "tipo_exame",
ADD COLUMN     "pacienteId" INTEGER NOT NULL,
ADD COLUMN     "tipoExame" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "prontuario" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "data" TIMESTAMP(3),
    "medicoResponsavelId" INTEGER NOT NULL,
    "pacienteId" INTEGER NOT NULL,

    CONSTRAINT "prontuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consulta" (
    "id" SERIAL NOT NULL,
    "motivo" TEXT NOT NULL,
    "dataConsulta" TIMESTAMP(3) NOT NULL,
    "observacoes" TEXT NOT NULL,
    "medicoResponsavelId" INTEGER NOT NULL,
    "pacienteId" INTEGER NOT NULL,

    CONSTRAINT "consulta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paciente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "sexo" TEXT NOT NULL,
    "responsavel" TEXT,

    CONSTRAINT "paciente_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "exame" ADD CONSTRAINT "exame_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prontuario" ADD CONSTRAINT "prontuario_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prontuario" ADD CONSTRAINT "prontuario_medicoResponsavelId_fkey" FOREIGN KEY ("medicoResponsavelId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consulta" ADD CONSTRAINT "consulta_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consulta" ADD CONSTRAINT "consulta_medicoResponsavelId_fkey" FOREIGN KEY ("medicoResponsavelId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
