/*
  Warnings:

  - You are about to drop the column `establishedAt` on the `University` table. All the data in the column will be lost.
  - Added the required column `establishmentYear` to the `University` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "University" DROP COLUMN "establishedAt",
ADD COLUMN     "establishmentYear" TEXT NOT NULL;
