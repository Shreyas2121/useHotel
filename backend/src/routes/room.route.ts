import { getRooms, getRoomsAvailability } from "../controllers/room.controller";
import { Router } from "express";

const router = Router();

router.get("/", getRooms);
router.post("/availability", getRoomsAvailability);

export default router;
