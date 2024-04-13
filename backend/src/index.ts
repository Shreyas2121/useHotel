import express from "express";
import "dotenv/config";
import cosrs from "cors";
import userRoute from "./routes/user.route";
import reviewRoute from "./routes/review.route";
import roomRoute from "./routes/room.route";
import addonRoute from "./routes/addon.route";
import couponRoute from "./routes/coupon.route";
import bookingRoute from "./routes/booking.route";
import hallRoute from "./routes/hall.route";
import connectDb from "./connecDB";

const app = express();

app.use(cosrs());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoute);
app.use("/api/review", reviewRoute);
app.use("/api/room", roomRoute);
app.use("/api/addon", addonRoute);
app.use("/api/coupon", couponRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/hall", hallRoute);

connectDb();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
