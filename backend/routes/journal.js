/**
 * @file Manages all operations related to journals
 * @author aTT
 */
import express from "express";
import jwtAuth from "../middleware/jwtAuth.js";
import {
  createJournal,
  getJournals,
  getJournal,
  updateJournal,
  deleteJournal,
} from "../controllers/journal.js";


const router = express.Router();

import {
  validatePostJournal,
  validatePutJournal,
} from "../middleware/validation/journal.js";
import rateLimiter from "../middleware/rateLimiter.js";

router.post("/",validatePostJournal, jwtAuth, createJournal,);
router.get("/",rateLimiter, getJournals);
router.get("/:id",rateLimiter, getJournal);
router.put("/:id",validatePutJournal, updateJournal);

router.delete("/:id", deleteJournal);

export default router;