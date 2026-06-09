/*
  Warnings:

  - You are about to drop the `ALBUM` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ARTIST` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JOURNAL` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `REVIEW` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SONG` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `USER` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ALBUM" DROP CONSTRAINT "ALBUM_artistId_fkey";

-- DropForeignKey
ALTER TABLE "REVIEW" DROP CONSTRAINT "REVIEW_albumId_fkey";

-- DropForeignKey
ALTER TABLE "REVIEW" DROP CONSTRAINT "REVIEW_journalId_fkey";

-- DropForeignKey
ALTER TABLE "REVIEW" DROP CONSTRAINT "REVIEW_userId_fkey";

-- DropForeignKey
ALTER TABLE "SONG" DROP CONSTRAINT "SONG_albumId_fkey";

-- DropForeignKey
ALTER TABLE "SONG" DROP CONSTRAINT "SONG_artistId_fkey";

-- DropForeignKey
ALTER TABLE "USER" DROP CONSTRAINT "USER_journalId_fkey";

-- DropTable
DROP TABLE "ALBUM";

-- DropTable
DROP TABLE "ARTIST";

-- DropTable
DROP TABLE "JOURNAL";

-- DropTable
DROP TABLE "REVIEW";

-- DropTable
DROP TABLE "SONG";

-- DropTable
DROP TABLE "USER";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "bio" TEXT,
    "journalId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Journal" (
    "id" TEXT NOT NULL,
    "journalName" TEXT NOT NULL,
    "FavGenre" TEXT NOT NULL,
    "FavArtist" TEXT NOT NULL,

    CONSTRAINT "Journal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "paragraph" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "journalId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "albumType" "Record" NOT NULL,
    "artistId" TEXT NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Song" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "trackNumber" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,
    "genre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dob" DATE NOT NULL,
    "bio" TEXT NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_journalId_key" ON "User"("journalId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_journalId_fkey" FOREIGN KEY ("journalId") REFERENCES "Journal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_journalId_fkey" FOREIGN KEY ("journalId") REFERENCES "Journal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
