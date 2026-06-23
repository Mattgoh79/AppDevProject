import prisma from "../db.js";
import { validatePostReview } from "../../middleware/validation/review.js";

// Simulate an Express-like request/response to reuse existing validation middleware
const validateReview = (review) => {
  const req = { body: review };
  let validationError = null;

  const res = {
    status: (code) => ({
      json: (message) => {
        validationError = message;
      },
    }),
  };

  validatePostReview(req, res, () => {});

  if (validationError) {
    const errorMessage =
      typeof validationError === "object"
        ? JSON.stringify(validationError)
        : validationError;
    throw new Error(errorMessage);
  }
};

// journalId / userId / albumId are filled in at runtime from existing rows (see below).
const baseReviewData = [
  {
    rating: 8,
    paragraph: "A confident product of the era.",
  },
  {
    rating: 6,
    paragraph: "billy joel did it better..",
  },
  {
    rating: 9,
    paragraph: "elton john did it better.",
  },
  {
    rating: 4,
    paragraph: "LIVE CHANGING (in a bad way).",
  },
  {
    rating: 10,
    paragraph: "i cried.",
  },
];

export const seedReviews = async () => {
  const startTime = Date.now();
  const errors = [];

  try {
    // Run this FIRST, before any other delete, since Review has no
    // children but does reference Journal, User, and Album.
    await prisma.review.deleteMany();

    // Run seedJournals, seedUsers, and seedAlbums BEFORE this seed,
    // or reviews will have no valid journalId/userId/albumId to attach to.
    const [journals, users, albums] = await Promise.all([
      prisma.journal.findMany({ select: { id: true } }),
      prisma.user.findMany({ select: { id: true } }),
      prisma.album.findMany({ select: { id: true } }),
    ]);

    const reviewData = baseReviewData.map((review, index) => {
      const journal = journals[index % journals.length];
      const user = users[index % users.length];
      const album = albums[index % albums.length];
      return {
        ...review,
        journalId: journal ? journal.id : undefined,
        userId: user ? user.id : undefined,
        albumId: album ? album.id : undefined,
      };
    });

    const validatedData = [];
    for (const review of reviewData) {
      try {
        validateReview(review);
        validatedData.push(review);
      } catch (err) {
        errors.push(err.message);
      }
    }

    if (validatedData.length > 0) {
      await prisma.review.createMany({
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

  return { resource: "Reviews", time, errors };
};

seedReviews().then((report) => {
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