/*
  Warnings:

  - Added the required column `universityId` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Courses" ADD COLUMN     "universityId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
