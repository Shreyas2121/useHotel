import { LocationState } from "./BookingForm";
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

const PriceDetails = ({ data, addonPrice, discount, finalPrice }: Props) => {
  const { totalPrice: priceBeforeAddons, roomPrice, no, numOfDays } = data;

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
        <td> ₹ {roomPrice}</td>
      </tr>
      <tr>
        <td>Room(s):</td>
        <td>{no}</td>
      </tr>
      <tr>
        <td>No. of Night(s):</td>
        <td>{numOfDays}</td>
      </tr>

      <td>
        <hr />
      </td>
      <td>
        <hr />
      </td>

      <tr>
        <td className="base-prices">
          {no} Room(s) x {numOfDays} Night(s):
        </td>

        <td>₹{priceBeforeAddons}</td>
      </tr>

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

export default PriceDetails;
