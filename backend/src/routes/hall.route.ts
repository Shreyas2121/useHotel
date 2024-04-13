import {
  getHalls,
  getHallsAvailability,
  getHallCategories,
} from "../controllers/hall.controller";
import { Router } from "express";

const router = Router();

router.get("/", getHalls);
router.get("/availability", getHallsAvailability);
router.get("/categories", getHallCategories);

export default router;
