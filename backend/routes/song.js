/**
 * @file Manages all operations related to songs
 * @author aTT
 */
import express from "express";
import jwtAuth from "../middleware/jwtAuth.js";
import rbac from "../middleware/rbac.js";
import {
  createSong,
  getSongs,
  getSong,
  updateSong,
  deleteSong,
} from "../controllers/song.js";
// import rateLimiter from "../middleware/rateLimiter.js";


const router = express.Router();

import {
  validatePostSong,
  validatePutSong,
} from "../middleware/validation/song.js";
import rateLimiter from "../middleware/rateLimiter.js";

router.post("/", validatePostSong, jwtAuth, rbac("ADMIN"), createSong,);
router.get("/", rateLimiter, getSongs);
router.get("/:id", rateLimiter, getSong);
router.put("/:id", validatePutSong ,updateSong);


router.delete("/:id", deleteSong);

export default router;