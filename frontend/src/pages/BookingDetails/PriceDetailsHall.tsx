import { LocationState } from "./BookingFormHall";
import React, { useMemo } from "react";

interface Props {
  data: LocationState;
  addonPrice: number;
  discount: {
    discountPer: number;
    discountAmt: number;
  };
  finalPrice: number;
}

const PriceDetailsHall = ({
  data,
  addonPrice,
  discount,
  finalPrice,
}: Props) => {
  const { hallPrice: priceBeforeAddons, bookingDate, hallType } = data;

  return (
    <table id="booking-details-tables">
      <tr>
        <th>Details</th>
      </tr>
      <tr>
        <td>
          <br />
        </td>
      </tr>
      <tr>
        <td> Base Price: </td>
        <td> ₹ {}</td>
      </tr>

      <td>
        <hr />
      </td>
      <td>
        <hr />
      </td>

      <td>
        <hr />
      </td>
      <td>
        <hr />
      </td>

      <tr>
        <td>Addons:</td>
        <td>₹{addonPrice}</td>
      </tr>

      <tr>
        <td>Sub Total:</td>
        <td>₹{priceBeforeAddons + addonPrice}</td>
      </tr>

      <tr>
        <td>
          <hr />
        </td>
        <td>
          <hr />
        </td>
      </tr>
      <tr>
        <td>Coupon Discount:</td>
        <td>{discount.discountPer}%</td>
      </tr>
      <tr>
        <td>Discount Amount:</td>
        <td>₹{discount.discountAmt}</td>
      </tr>
      <tr>
        <td>
          <hr />
        </td>
        <td>
          <hr />
        </td>
      </tr>
      <tr style={{ fontSize: "1.3rem" }}>
        <td>Total : </td>
        <td>₹{finalPrice}</td>
      </tr>
      <tr>
        <td>
          <br />
        </td>
      </tr>
    </table>
  );
};

export default PriceDetailsHall;
