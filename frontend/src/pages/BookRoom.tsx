import React, { useState, useEffect, useCallback, useMemo } from "react";
import RoomDetailsCard from "../components/Cards/RoomDetailsCard";
import "../components/search.css";
import "./rooms.css";
import { Room, Status } from "../types/types";

import "../components/parallaxImage.css";

import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import Loader from "../Loader";

import { useMutation, useQuery } from "@tanstack/react-query";
import { checkAvailability, getRooms } from "../api";

interface RoomsProps {
  allRooms: Room[];
  isLoading: boolean;
}

export const RoomsWrapper = () => {
  const res = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  if (res.isLoading) {
    return <Loader />;
  }

  const allRooms = res.data;

  return <Rooms allRooms={allRooms} isLoading={res.isPending} />;
};

export const bookingRoomImage =
  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80";

const Rooms = ({ allRooms, isLoading }: RoomsProps) => {
  const checkAvailQuery = useMutation({
    mutationFn: (data: { checkIn: string; checkOut: string }) =>
      checkAvailability(data),
  });

  const [checkIn, setCheckIn] = useState<Date | null>(null);

  const [checkOut, setCheckOut] = useState<Date | null>(null);

  const [status, setStatus] = useState<Status>();

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!checkIn || !checkOut) {
      toast.error("Please select checkin and checkout dates");
      return;
    }

    if (checkIn.getTime() > checkOut.getTime()) {
      toast.error("Checkin date cannot be greater than checkout date");
      return;
    }

    if (checkIn.getTime() === checkOut.getTime()) {
      toast.error("Checkin date cannot be equal to checkout date");
      return;
    }

    let statusData = await checkAvailQuery.mutateAsync({
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
    });

    setStatus(statusData);

    window.scrollTo({
      top: 800,
    });
  };

  const maxAllowedCheckout = () => {
    let date = new Date(checkIn);
    date.setDate(date.getDate() + 30);
    return date;
  };

  const maxAllowedCheckin = () => {
    if (checkOut) {
      // If "Check-out" is selected, set the maximum "Check-in" date to the day before "Check-out"
      return new Date(checkOut.getTime() - 24 * 60 * 60 * 1000);
    } else {
      // If "Check-out" is not selected, set the maximum "Check-in" date to 30 days from today
      const today = new Date();
      return new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 30
      );
    }
  };

  return (
    <header>
      <div
        className="p-5 text-center bg-image parallax"
        style={{ backgroundImage: `url(${bookingRoomImage})`, height: "50rem" }}
      >
        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3">ROOMS</h1>
              <h4 className="mb-3">AWAY FROM MONOTONOUS LIFE</h4>
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
                  Check-in:{" "}
                  <input
                    id="check-in"
                    className="input-date"
                    type="date"
                    onChange={(e) => setCheckIn(new Date(e.target.value))}
                    min={new Date().toISOString().split("T")[0]}
                    max={maxAllowedCheckin().toISOString().split("T")[0]}
                  />
                  Check-out:{" "}
                  <input
                    id="check-out"
                    className="input-date"
                    type="date"
                    onChange={(e) => setCheckOut(new Date(e.target.value))}
                    disabled={!checkIn}
                    min={checkIn?.toISOString().split("T")[0]}
                    max={
                      checkIn
                        ? maxAllowedCheckout().toISOString().split("T")[0]
                        : ""
                    }
                  />
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

      {status && (
        <div style={{ margin: "2rem" }}>
          <h6 style={{ marginLeft: "5%" }}>Select Room Type</h6>
          <hr />
          {isLoading ? (
            <Loader />
          ) : (
            allRooms?.map((room) => (
              <RoomDetailsCard
                key={room._id}
                roomData={room}
                checkin={checkIn}
                checkout={checkOut}
                status={status}
              />
            ))
          )}
        </div>
      )}
    </header>
  );
};

export default RoomsWrapper;
