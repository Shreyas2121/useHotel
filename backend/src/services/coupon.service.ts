import { Coupon } from "../models/coupon.model";

class CouponService {
  async creaeCoupon(coupon: any) {
    await Coupon.create({
      code: coupon.code,
      discount_percentage: coupon.discount,
    });
  }

  async validateCoupon(code: string) {
    console.log(code);
    const coupon = await Coupon.findOne({
      code,
    });
    if (!coupon) {
      throw new Error("Coupon not found");
    }
    return coupon;
  }
}

export default new CouponService();
