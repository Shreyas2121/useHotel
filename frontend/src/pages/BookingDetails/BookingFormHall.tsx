import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Button, Container, Form, FormLabel } from "react-bootstrap";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Addon, BookingRoom, User } from "../../types/types";
import "./bookingform.css";

import Coupon from "../../components/Coupon";
import AddonSelection from "../../components/Addon";
import PersonalDetails from "./PersonalDetails";
import BookingDetails from "./BookingDetails";
import PriceDetails from "./PriceDetails";
import { useMutation } from "@tanstack/react-query";
import { bookHall, bookRoom } from "../../api";
import PriceDetailsHall from "./PriceDetailsHall";

export interface LocationState {
  bookingDate: Date;
  hallType: string;
  hallPrice: number;
  type: "hall";
}

interface BookingFormProps {
  data: LocationState;
  user: User;
  addons: Addon[];
  token: string;
}

export interface SelectedAddons {
  _id: string;
  price: number;
}

export const BookingForm = ({
  addons,
  data,
  user,
  token,
}: BookingFormProps) => {
  const bookingMutation = useMutation({
    mutationFn: bookHall,
  });

  const navigate = useNavigate();
  const { bookingDate, hallPrice, hallType } = data;

  const [selectedAddons, setSelectedAddons] = useState<SelectedAddons[]>([]);

  const [coupon, setCoupon] = useState("");

  const [discount, setDiscount] = useState({
    id: null,
    discountPer: 0,
    discountAmt: 0,
  });

  const [specialReq, setSpecialReq] = useState("");

  const addonPrice = useMemo(() => {
    return selectedAddons.reduce((acc, addon) => acc + addon.price, 0);
  }, [selectedAddons]);

  const priceAfterAddon = useMemo(() => {
    return hallPrice + addonPrice;
  }, [addonPrice, discount]);

  const finalPrice = useMemo(() => {
    return priceAfterAddon - discount.discountAmt;
  }, [discount, priceAfterAddon]);

  useEffect(() => {
    if (coupon) {
      const newDiscountAmt = (discount.discountPer / 100) * priceAfterAddon;
      setDiscount((prev) => ({
        ...prev,
        discountAmt: newDiscountAmt,
      }));
    }
  }, [priceAfterAddon, coupon, discount.discountPer]);

  const submitBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const bookingData = {
      user: user._id,
      bookingDate: new Date(),
      bookedDate: bookingDate,
      basePrice: hallPrice,
      selectedAddons: selectedAddons
        ? selectedAddons.map((addon) => addon._id)
        : null,
      total: finalPrice,
      category: hallType,
      coupon: discount.id,
      specialRequest: specialReq,
    };
    bookingMutation.mutate(
      { data: bookingData, token },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          navigate("/success", {
            state: {
              key: "Hall",
              data: {
                name: user.name,
                email: user.email,
                category: hallPrice,
                date: bookingDate,
                total: finalPrice,
              },
            },
          });
        },
        onError: (error: any) => {
          toast.error(error.response.data.message);
        },
      }
    );
  };

  return (
    <>
      <Form id="c" onSubmit={submitBooking}>
        <div>
          <Container className="booking-details">
            <div id="container">
              <h2 id="title-of-form">BOOK A ROOM WITH US</h2>
              <br />
              <PersonalDetails name={user.name} email={user.email} />
              <hr />
              <BookingDetails type={hallType} date={bookingDate} />
              <hr />
              <Form.Group>
                <br />
                <Form.Label id="addons"> Select Addons: </Form.Label>
                <AddonSelection
                  addOns={addons}
                  selectedAddons={selectedAddons}
                  setSelectedAddons={setSelectedAddons}
                />
              </Form.Group>
              <hr />
              <Form.Group>
                <Form.Label htmlFor="message" id="special-req">
                  Special Request?
                </Form.Label>
                <textarea
                  id="message"
                  name="visitor_message"
                  placeholder="Tell us anything else that might be important."
                  defaultValue={""}
                  onChange={(e) => setSpecialReq(e.target.value)}
                />
                <hr />
              </Form.Group>
              <Coupon
                priceAfterAddon={priceAfterAddon}
                coupon={coupon}
                setCoupon={setCoupon}
                setDiscount={setDiscount}
              />
            </div>
          </Container>
        </div>

        <div>
          <Container className="booking-details">
            <div className="price-details">
              <PriceDetailsHall
                finalPrice={finalPrice}
                discount={discount}
                data={data}
                addonPrice={addonPrice}
              />
              <Button variant="primary" type="submit" id="submit-booking-btn">
                Book Now
              </Button>
            </div>
          </Container>
        </div>
      </Form>
    </>
  );
};

export default BookingForm;
