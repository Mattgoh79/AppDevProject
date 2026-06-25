import prisma from "../db.js";
import { validatePostSong } from "../../middleware/validation/song.js";

// Simulate an Express-like request/response to reuse existing validation middleware
const validateSong = (song) => {
  const req = { body: song };
  let validationError = null;

  const res = {
    status: (code) => ({
      json: (message) => {
        validationError = message;
      },
    }),
  };

  validatePostSong(req, res, () => {});

  if (validationError) {
    const errorMessage =
      typeof validationError === "object"
        ? JSON.stringify(validationError)
        : validationError;
    throw new Error(errorMessage);
  }
};

// albumId / artistId are filled in at runtime from existing Albums (see below).
const baseSongData = [
  {
    name: "Rokeby Protein Smoothie",
    trackNumber: 1,
    length: 2,
    genre: "Indie Rock",
    description: "A drink thats cheaper in this country so im gonna miss it when i go back.",
  },
  {
    name: "Piano Man",
    trackNumber: 1,
    length: 3,
    genre: "Jazz",
    description: "Its about a guy, on a piano. Best known for having billy joel completely rip this piece off.",
  },
  {
    name: "Duality",
    trackNumber: 1,
    length: 1,
    genre: "NU Metal",
    description: "An iconic metal anthem about, smth idk i didnt read the genius for this yet.",
  },
  {
    name: "Introvert",
    trackNumber: 3,
    length: 4,
    genre: "Glitch-Pop",
    description: "With a flurry of beats and sound effects, this song brings an undeniable energy into the room.",
  },
  {
    name: "Hard to Love",
    trackNumber: 5,
    length: 5,
    genre: "Soft-Rock",
    description: "This song, written about the artist's father, encapsulates his idolisation and love for them in a bittersweet melody.",
  },
];

export const seedSongs = async () => {
  const startTime = Date.now();
  const errors = [];

  try {

    await prisma.song.deleteMany();

    // Run seedAlbums (and seedArtists, transitively) BEFORE this seed.
    const albums = await prisma.album.findMany({ select: { id: true, artistId: true } });

    const songData = baseSongData.map((song, index) => {
      const album = albums[index % albums.length];
      return {
        ...song,
        albumId: album ? album.id : undefined,
        artistId: album ? album.artistId : undefined,
      };
    });

    const validatedData = [];
    for (const song of songData) {
      try {
        validateSong(song);
        validatedData.push(song);
      } catch (err) {
        errors.push(err.message);
      }
    }

    if (validatedData.length > 0) {
      await prisma.song.createMany({
        data: validatedData,
        skipDuplicates: true,
      });
    }
  } catch (err) {
    errors.push(err.message);
  } finally {
    await prisma.$disconnect();
  }

  const time = ((Date.now() - startTime) / 1000).toFixed(1);

  return { resource: "Songs", time, errors };
};

seedSongs().then((report) => {
  console.log("==========================================");
  console.log("Seeding report");
  console.log("==========================================");
  console.log(`Resource: ${report.resource}`);
  console.log(`  Time taken: ${report.time}s`);
  if (report.errors.length > 0) {
    console.log(`  Errors: ${report.errors.length}`);
    report.errors.forEach((e) => console.log(`    - ${e}`));
  } else {
    console.log("  No errors");
  }
  console.log("==========================================");
});