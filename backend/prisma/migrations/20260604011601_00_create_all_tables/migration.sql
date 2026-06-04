-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'NonBinary', 'GenderFluid', 'Other');

-- CreateEnum
CREATE TYPE "Record" AS ENUM ('EP', 'Single', 'Album');

-- CreateTable
CREATE TABLE "USER" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "bio" TEXT,
    "journalId" TEXT,

    CONSTRAINT "USER_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JOURNAL" (
    "id" TEXT NOT NULL,
    "journalName" TEXT NOT NULL,
    "FavGenre" TEXT NOT NULL,
    "FavArtist" TEXT NOT NULL,

    CONSTRAINT "JOURNAL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "REVIEW" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "paragraph" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "journalId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,

    CONSTRAINT "REVIEW_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ALBUM" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "albumType" "Record" NOT NULL,
    "artistId" TEXT NOT NULL,

    CONSTRAINT "ALBUM_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SONG" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "trackNumber" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,
    "genre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,

    CONSTRAINT "SONG_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ARTIST" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dob" DATE NOT NULL,
    "bio" TEXT NOT NULL,

    CONSTRAINT "ARTIST_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "USER_email_key" ON "USER"("email");

-- CreateIndex
CREATE UNIQUE INDEX "USER_journalId_key" ON "USER"("journalId");

-- AddForeignKey
ALTER TABLE "USER" ADD CONSTRAINT "USER_journalId_fkey" FOREIGN KEY ("journalId") REFERENCES "JOURNAL"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "REVIEW" ADD CONSTRAINT "REVIEW_journalId_fkey" FOREIGN KEY ("journalId") REFERENCES "JOURNAL"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "REVIEW" ADD CONSTRAINT "REVIEW_userId_fkey" FOREIGN KEY ("userId") REFERENCES "USER"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "REVIEW" ADD CONSTRAINT "REVIEW_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "ALBUM"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ALBUM" ADD CONSTRAINT "ALBUM_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "ARTIST"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SONG" ADD CONSTRAINT "SONG_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "ALBUM"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SONG" ADD CONSTRAINT "SONG_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "ARTIST"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
