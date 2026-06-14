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

// router.post("/", validatePostAlbum, jwtAuth, rbac("ADMIN"), createAlbum,);
// router.get("/", rateLimiter, getAlbums);
// router.get("/:id", rateLimiter, getAlbum);

//UNCOMMENT AFTER ADDING, ROLE BASED ACCESS, AUTH, VALIDATION,  AND RATE LIMIT

router.post("/", validatePostAlbum, jwtAuth, rbac("ADMIN"), createAlbum,);
router.get("/", rateLimiter, getAlbums);
router.get("/:id", rateLimiter, getAlbum);
router.put("/:id", validatePutAlbum, updateAlbum);
// router.put("/:id", updateAlbum);



// router.put("/", (req, res) => {
//   return res.status(400).json({
//     message: "id is required in the URL parameter",
//   });
// });

router.delete("/:id", deleteAlbum);
// router.delete("/", (req, res) => {
//   return res.status(400).json({
//     message: "id is required in the URL parameter",
//   });
// });
// You can also chain routes like this:
// router.route("/").post(createAlbum).get(getAlbums);

export default router;