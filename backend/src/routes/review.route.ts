import {
  getReviews,
  getTopReviews,
  postReview,
} from "../controllers/review.controller";

import { Router } from "express";
import { authenticate } from "../middleware/authenticate";

const router = Router();

router.get("/top", getTopReviews);
router.get("/", getReviews);
router.post("/", authenticate, postReview);

export default router;
