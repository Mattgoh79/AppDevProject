import prisma from "../db.js";
import { validatePostUser } from "../../middleware/validation/user.js";

// Simulate an Express-like request/response to reuse existing validation middleware
const validateUser = (user) => {
  const req = { body: user };
  let validationError = null;

  const res = {
    status: (code) => ({
      json: (message) => {
        validationError = message;
      },
    }),
  };

  validatePostUser(req, res, () => {});

  if (validationError) {
    const errorMessage =
      typeof validationError === "object"
        ? JSON.stringify(validationError)
        : validationError;
    throw new Error(errorMessage);
  }
};

// journalId is filled in at runtime from existing Journals (see below),
// since journalId is a unique FK and can't be hardcoded.
const baseUserData = [
  {
    username: "admin",
    email: "admin@admin",
    password: "admin",
    gender: "Male",
    role: "ADMIN",
    bio: "ADMIN.",
    journalId: "",
  },
  {
    username: "PathoGen",
    email: "mattgoh79@gmail.com",
    password: "PathoGen",
    gender: "Male",
    role: "USER",
    bio: "admin's alter ego.",
    journalId: "",
  },
  {
    username: "DeadBeat",
    email: "dead@beat",
    password: "listenNow",
    gender: "GenderFluid",
    role: "USER",
    bio: "",
    journalId: "",
  },
  {
    username: "Gremlin",
    email: "Grem@lin",
    password: "autofister",
    gender: "NonBinary",
    role: "USER",
    bio: "",
    journalId: "",
  },
  {
    username: "Brat",
    email: "B@rat",
    password: "Chaos",
    gender: "Other",
    role: "USER",
    bio: "lives in the upside down",
    journalId: "",
  },
];

export const seedUsers = async () => {
  const startTime = Date.now();
  const errors = [];

  try {
    // Run this AFTER seedReviews has cleared/finished, since
    // Review.userId references User.
    await prisma.user.deleteMany();

    // Pull existing Journals to attach via the unique journalId FK.
    // Run seedJournals BEFORE this seed, or every user will get journalId: null.
    const journals = await prisma.journal.findMany({ select: { id: true } });

    const userData = baseUserData.map((user, index) => {
      const journal = journals[index % journals.length];
      return {
        ...user,
        journalId: journal ? journal.id : null,
      };
    });

    const validatedData = [];
    for (const user of userData) {
      try {
        validateUser(user);
        validatedData.push(user);
      } catch (err) {
        errors.push(err.message);
      }
    }

    if (validatedData.length > 0) {
      await prisma.user.createMany({
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

  return { resource: "Users", time, errors };
};

seedUsers().then((report) => {
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