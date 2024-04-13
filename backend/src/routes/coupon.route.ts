import { createCoupon, validateCoupon } from "../controllers/coupon.controller";
import { Router } from "express";

const router = Router();

router.post("/", createCoupon);
router.get("/validate", validateCoupon);

export default router;
