import React, { useRef, useState } from "react";

import { Button, Form } from "react-bootstrap";
import { api, validateCoupon } from "../api";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

interface Props {
  setCoupon: React.Dispatch<React.SetStateAction<string>>;
  coupon: string;
  priceAfterAddon: number;
  setDiscount: React.Dispatch<
    React.SetStateAction<{
      id?: string;
      discountPer: number;
      discountAmt: number;
    }>
  >;
}

const Coupon = ({ coupon, setCoupon, priceAfterAddon, setDiscount }: Props) => {
  const couponMutation = useMutation({
    mutationFn: validateCoupon,
  });

  const [isDisplayedA, setIsDisplayedA] = useState(true);
  const [isDisplayedR, setIsDisplayedR] = useState(false);

  const handleApply = () => {
    couponMutation.mutate(coupon, {
      onError: (error: any) => {
        toast.error(error.response.data.message);
        setCoupon("");
      },

      onSuccess: (data) => {
        toast.success(data.message);
        setIsDisplayedA(false);
        setIsDisplayedR(true);

        setDiscount({
          id: data.coupon._id,
          discountPer: data.coupon.discount_percentage,
          discountAmt:
            (data.coupon.discount_percentage / 100) * priceAfterAddon,
        });
      },
    });
  };

  const handleRemove = () => {
    setCoupon("");
    setIsDisplayedA(true);
    setIsDisplayedR(false);
    toast.success("Coupon removed");
    setDiscount({
      discountPer: 0,
      discountAmt: 0,
    });
  };

  return (
    <Form.Group>
      <Form.Label htmlFor="coupon" id="coupon">
        Coupon Code:{" "}
      </Form.Label>
      <div id="coupon-section">
        {" "}
        <Form.Control
          id="coupon-box"
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          disabled={!isDisplayedA}
        />
        <Button
          id="coupon-btn"
          disabled={coupon === ""}
          onClick={handleApply}
          style={{
            display: isDisplayedA ? "block" : "none",
          }}
        >
          Apply
        </Button>
        <Button
          id="coupon-btn"
          // ref={removeButton}
          style={{
            display: isDisplayedR ? "block" : "none",
          }}
          // disabled={!apply}
          onClick={handleRemove}
        >
          Remove
        </Button>
      </div>
    </Form.Group>
  );
};

export default Coupon;
