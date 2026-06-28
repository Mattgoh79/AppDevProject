/**
 * @file Manages all operations related to albums
 * @author aTT
 */
import express from "express";
import jwtAuth from "../middleware/jwtAuth.js";
import rbac from "../middleware/rbac.js";
import {
  createAlbum,
  getAlbums,
  getAlbum,
  updateAlbum,
  deleteAlbum,
} from "../controllers/album.js";


const router = express.Router();

import {
  validatePostAlbum,
  validatePutAlbum,
} from "../middleware/validation/album.js";
import rateLimiter from "../middleware/rateLimiter.js";

router.post("/", validatePostAlbum, jwtAuth, rbac("ADMIN"), createAlbum,);
router.get("/", rateLimiter, getAlbums);
router.get("/:id", rateLimiter, getAlbum);
router.put("/:id", validatePutAlbum, updateAlbum);

router.delete("/:id", deleteAlbum);

export default router;