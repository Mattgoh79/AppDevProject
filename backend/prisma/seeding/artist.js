import prisma from "../db.js";
import { validatePostArtist } from "../../middleware/validation/artist.js";

// Simulate an Express-like request/response to reuse existing validation middleware
const validateArtist = (artist) => {
  const req = { body: artist };
  let validationError = null;

  const res = {
    status: (code) => ({
      json: (message) => {
        validationError = message;
      },
    }),
  };

  validatePostArtist(req, res, () => {});

  if (validationError) {
    const errorMessage =
      typeof validationError === "object"
        ? JSON.stringify(validationError)
        : validationError;
    throw new Error(errorMessage);
  }
};

export const seedArtists = async () => {
  const startTime = Date.now();
  const errors = [];

  try {
    await prisma.artist.deleteMany(); // Clear existing data

    const artistData = [
      {
        // name: "New Zealand", // Intentionally invalid - missing name and region
      },
      {
        name: "Western Institute of Technology",
        birthYear: 1905,
        bio: "i am a",
      },
      {
        name: "Northen Institute of Technology",
        birthYear: 1953,
        bio: "i am al",
      },
      {
        name: "Southern Institute of Technology",
        birthYear: 1980,
        bio: "i am ali",
      },
      {
        name: "Eastern Institute of Technology",
        birthYear: 2000,
        bio: "i am aliv",
      },
      {
        name: "Central Institute of Technology",
        birthYear: 1903,
        bio: "i am alive",
      },
    ];

    const validatedData = [];
    for (const artist of artistData) {
      try {
        validateArtist(artist);
        validatedData.push(artist);
      } catch (err) {
        errors.push(err.message);
      }
    }

    if (validatedData.length > 0) {
      await prisma.artist.createMany({
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

  return { resource: "Artists", time, errors };
};

seedArtists().then((report) => {
  console.log("==========================================");
  console.log("Seeding report");
  console.log("==========================================");
  console.log(`Resource: ${report.resource}`);
  console.log(`  Time taken: ${report.time}s`);
  if (report.errors.length > 0) {
    // Display error message
  } else {
    // Display no error message
  }
  console.log("==========================================");
});