import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { getAddons } from "../../api";
import { Navigate, useLocation } from "react-router-dom";
import BookingForm from "./BookingForm";
import BookingFormHall from "./BookingFormHall";

const BookingFornWrapper = () => {
  const { user, token } = useAuth();

  const addonsQuery = useQuery({
    queryKey: ["addons"],
    queryFn: getAddons,
    retry: 0,
  });

  if (addonsQuery.isPending) {
    return <h1>Loading...</h1>;
  }

  const addonsData = addonsQuery.data;

  const location = useLocation();

  return !user ? (
    <Navigate to="/login" />
  ) : (
    <>
      {location.state.type === "room" ? (
        <BookingForm
          addons={addonsData}
          data={location.state}
          user={user}
          token={token}
        />
      ) : (
        <BookingFormHall
          addons={addonsData}
          data={location.state}
          user={user}
          token={token}
        />
      )}
    </>
  );
};

export default BookingFornWrapper;
