/**
 * @file Manages all operations related to reviews
 * @author aTT
 */
import express from "express";
// import jwtAuth from "../middleware/jwtAuth.js";
// import rbac from "../middleware/rbac.js";
import {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
} from "../controllers/review.js";
// import rateLimiter from "../middleware/rateLimiter.js";


const router = express.Router();

// import {
//   validatePostReview,
//   validatePutReview,
// } from "../middleware/validation/review.js";
// router.post("/", validatePostReview, jwtAuth, rbac("ADMIN"), createReview,);
// router.get("/", rateLimiter, getReviews);
// router.get("/:id", rateLimiter, getReview);
// router.put("/:id", validatePutReview, updateReview);

//UNCOMMENT AFTER ADDING, ROLE BASED ACCESS, AUTH, VALIDATION,  AND RATE LIMIT

router.post("/", createReview,);
router.get("/", getReviews);
router.get("/:id", getReview);
router.put("/:id", updateReview);



// router.put("/", (req, res) => {
//   return res.status(400).json({
//     message: "id is required in the URL parameter",
//   });
// });

router.delete("/:id", deleteReview);
// router.delete("/", (req, res) => {
//   return res.status(400).json({
//     message: "id is required in the URL parameter",
//   });
// });
// You can also chain routes like this:
// router.route("/").post(createReview).get(getReviews);

export default router;