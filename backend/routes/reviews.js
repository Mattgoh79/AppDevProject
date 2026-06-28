/**
 * @file Manages all operations related to reviews
 * @author aTT
 */
import express from "express";
import jwtAuth from "../middleware/jwtAuth.js";
// import rbac from "../middleware/rbac.js";
import {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
} from "../controllers/review.js";


const router = express.Router();

import {
  validatePostReview,
  validatePutReview,
} from "../middleware/validation/review.js";
import rateLimiter from "../middleware/rateLimiter.js";

router.post("/",validatePostReview, jwtAuth, createReview,);
router.get("/",rateLimiter, rateLimiter, getReviews);
router.get("/:id",rateLimiter, getReview);
router.put("/:id",validatePutReview, updateReview);



router.delete("/:id", deleteReview);

export default router;