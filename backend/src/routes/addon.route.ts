import { createAddon, getAllAddons } from "../controllers/addon.controller";
import { Router } from "express";

const router = Router();

router.post("/", createAddon);
router.get("/", getAllAddons);

export default router;
