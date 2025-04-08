/*
  Warnings:

  - A unique constraint covering the columns `[resultId]` on the table `Opros` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Opros_resultId_key" ON "Opros"("resultId");
