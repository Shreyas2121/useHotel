import { Router } from "express";

import {
  createBooking,
  getBookingByUser,
  deleteRoomBooking,
} from "../controllers/bookingroom.controller";

import {
  createBooking as createBookingHall,
  deleteHallBooking,
  getBookingByUser as getBookingByUserHall,
} from "../controllers/bookinghall.controller";
import { authenticate } from "../middleware/authenticate";

const router = Router();

router.post("/room", authenticate, createBooking);
router.get("/room/get", authenticate, getBookingByUser);
router.delete("/room/:id", authenticate, deleteRoomBooking);

router.post("/hall", authenticate, createBookingHall);
router.get("/hall/get", authenticate, getBookingByUserHall);
router.delete("/hall/:id", authenticate, deleteHallBooking);

export default router;
