import React, { useState, useEffect, useCallback, useMemo } from "react";
import RoomDetailsCard from "../components/Cards/RoomDetailsCard";
import "../components/search.css";
import "./rooms.css";
import { Hall, HallStatus, Status } from "../types/types";

import "../components/parallaxImage.css";

import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import Loader from "../Loader";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  checkAvailability,
  checkHallAvailability,
  fetchHallCategory,
  getHalls,
  getRooms,
} from "../api";
import Hallcards from "../components/Cards/HallDetailsCard";

interface HallProps {
  categories: string[];
}

export const HallWrapper = () => {
  const res = useQuery({
    queryKey: ["categories"],
    queryFn: fetchHallCategory,
  });

  if (res.isLoading) {
    return <Loader />;
  }

  return <Halls categories={res.data} />;
};

const bookingHall =
  "https://content3.jdmagicbox.com/comp/jaipur/i6/0141px141.x141.211124181714.w3i6/catalogue/greet-banquet-hall-m-i-road-jaipur-banquet-halls-n91h0ooj1t.jpg?clr=664400";

const Halls = ({ categories }: HallProps) => {
  const checkAvailQuery = useMutation({
    mutationFn: (data: { date: string; category: string }) =>
      checkHallAvailability(data),
    onError: (error: any) => {
      toast.error(error);
    },
  });

  const [bookingDate, setBookingDate] = useState<Date | null>(null);
  const [category, setCategory] = useState<string>("");

  const [hall, setHall] = useState<Hall | null>(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!bookingDate) {
      toast.error("Please select booking date");
      return;
    }

    const res = await checkAvailQuery.mutateAsync({
      date: bookingDate.toISOString(),
      category,
    });

    setHall(res.data);

    window.scrollTo({
      top: 800,
    });
  };

  return (
    <header>
      <div
        className="p-5 text-center bg-image parallax"
        style={{ backgroundImage: `url(${bookingHall})`, height: "50rem" }}
      >
        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3">Halls</h1>
              <h4 className="mb-3">MAKE MERMORIES WITH YOUR LOVED ONES</h4>
              <br />
              <br />
              <br />
              <div
                className="search"
                style={{
                  display: "flex",
                  width: "60rem",
                  margin: "auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "60%",
                  }}
                >
                  Date
                  <input
                    id="check-in"
                    className="input-date"
                    type="date"
                    onChange={(e) => setBookingDate(new Date(e.target.value))}
                    min={new Date().toISOString().split("T")[0]}
                    // max={maxAllowedCheckin().toISOString().split("T")[0]}
                  />
                  <select
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <Button
                  id="check-availability"
                  variant="primary"
                  size="sm"
                  onClick={handleSearch}
                >
                  Check Availability
                </Button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>

      {hall && (
        <div style={{ margin: "2rem" }}>
          <h6 style={{ marginLeft: "5%" }}>Select Hall Type</h6>
          <hr />
          {checkAvailQuery.isPending ? (
            <Loader />
          ) : (
            <Hallcards hallData={hall} bookingDate={bookingDate} />
          )}
        </div>
      )}
    </header>
  );
};

export default HallWrapper;
