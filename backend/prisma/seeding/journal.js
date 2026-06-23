import prisma from "../db.js";
import { validatePostJournal } from "../../middleware/validation/journal.js";

// Simulate an Express-like request/response to reuse existing validation middleware
const validateJournal = (journal) => {
  const req = { body: journal };
  let validationError = null;

  const res = {
    status: (code) => ({
      json: (message) => {
        validationError = message;
      },
    }),
  };

  validatePostJournal(req, res, () => {});

  if (validationError) {
    const errorMessage =
      typeof validationError === "object"
        ? JSON.stringify(validationError)
        : validationError;
    throw new Error(errorMessage);
  }
};

const journalData = [
  {
    journalName: "Yup",
    FavGenre: "Hyperpop",
    FavArtist: "Brakence",
  },
  {
    journalName: "SirMay0",
    FavGenre: "Indie",
    FavArtist: "The Strokes",
  },
  {
    journalName: "S1r",
    FavGenre: "Pop",
    FavArtist: "The King of Pop",
  },
  {
    journalName: "hard songs, hard work",
    FavGenre: "Jazz",
    FavArtist: "Whoever made the pokemon opening",
  },
  {
    journalName: "Eating Banan on Tree",
    FavGenre: "Metal",
    FavArtist: "FlyLeaf",
  },
];

export const seedJournals = async () => {
  const startTime = Date.now();
  const errors = [];

  try {
    // Run this AFTER seedUsers and seedReviews have cleared/finished,
    // since User.journalId and Review.journalId reference Journal.
    await prisma.journal.deleteMany();

    const validatedData = [];
    for (const journal of journalData) {
      try {
        validateJournal(journal);
        validatedData.push(journal);
      } catch (err) {
        errors.push(err.message);
      }
    }

    if (validatedData.length > 0) {
      await prisma.journal.createMany({
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

  return { resource: "Journals", time, errors };
};

seedJournals().then((report) => {
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