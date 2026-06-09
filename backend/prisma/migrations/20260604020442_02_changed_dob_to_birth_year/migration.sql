/*
  Warnings:

  - You are about to drop the column `dob` on the `Artist` table. All the data in the column will be lost.
  - Added the required column `birthYear` to the `Artist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "dob",
ADD COLUMN     "birthYear" INTEGER NOT NULL;
