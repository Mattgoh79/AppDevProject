/**
 * @file Manages all operations related to artists
 * @author aTT
 */
import express from "express";
import jwtAuth from "../middleware/jwtAuth.js";
import rbac from "../middleware/rbac.js";
import {
  createArtist,
  getArtists,
  getArtist,
  updateArtist,
  deleteArtist,
} from "../controllers/artist.js";


const router = express.Router();

import {
  validatePostArtist,
  validatePutArtist,
} from "../middleware/validation/artist.js";
import rateLimiter from "../middleware/rateLimiter.js";

router.post("/", validatePostArtist, jwtAuth, rbac("ADMIN"), createArtist,);
router.get("/",rateLimiter, getArtists);
router.get("/:id",rateLimiter, getArtist);
router.put("/:id", validatePutArtist,updateArtist);




router.delete("/:id", deleteArtist);

export default router;