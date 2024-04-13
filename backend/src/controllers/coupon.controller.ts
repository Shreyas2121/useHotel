import couponService from "../services/coupon.service";
import { Request, Response } from "express";

export const createCoupon = async (req: Request, res: Response) => {
  try {
    const coupon = await couponService.creaeCoupon(req.body);
    res.send(coupon);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

export const validateCoupon = async (req: Request, res: Response) => {
  try {
    const { code } = req.query;

    const coupon = await couponService.validateCoupon(code as string);
    res.status(200).send({
      status: 1,
      coupon,
      message: "Coupon validated successfully",
    });
  } catch (error: any) {
    res.status(400).send({
      status: 0,
      message: error.message,
    });
  }
};
