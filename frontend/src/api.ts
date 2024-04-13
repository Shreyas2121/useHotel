import axios from "axios";
import {
  Addon,
  BookingHall,
  BookingRoom,
  Hall,
  HallStatus,
  Review,
  Room,
  Status,
} from "./types/types";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_USEHOTEL_BACKEND}`,
});

export const getReviews = async (path: string) => {
  const response = await api.get(path);
  return response.data as {
    data: Review[];
    status: number;
  };
};

export const postReview = async ({ data, token }) => {
  const response = await api.post("review", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data as {
    status: number;
    message: string;
  };
};

export const getRooms = async () => {
  const response = await api.get("room");
  return response.data as Room[];
};

export const getHalls = async () => {
  const response = await api.get("hall");
  return response.data as Hall[];
};

// export const getHallByCat = async (category: string) => {
//   const response = await api.get(`halls/${category}`);
//   return response.data as Hall[];
// };

export const bookRoom = async ({ data, token }) => {
  const response = await api.post("booking/room", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data as {
    message: string;
  };
};

export const bookHall = async ({ data, token }) => {
  const response = await api.post("booking/hall", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data as {
    message: string;
  };
};

export const getBookingByUser = async (token: string) => {
  const response = await api.get(`booking/room/get`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data as BookingRoom[];
};

export const getHallBookingByUser = async (token: string) => {
  const response = await api.get(`booking/hall/get`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data as BookingHall[];
};

export const checkAvailability = async (data) => {
  const response = await api.post("room/availability", data);
  return response.data as {
    Basic: number;
    Suite: number;
    Deluxe: number;
  };
};

export const fetchHallCategory = async () => {
  const response = await api.get("hall/categories");
  return response.data as string[];
};

export const checkHallAvailability = async ({ date, category }) => {
  const response = await api.get("hall/availability", {
    params: {
      bookingDate: date,
      category,
    },
  });
  return response.data as {
    status: number;
    message?: string;
    data?: Hall;
  };
};

export const getAddons = async () => {
  const response = await api.get("addon");
  return response.data as Addon[];
};

export const validateCoupon = async (data) => {
  const response = await api.get("coupon/validate", {
    params: {
      code: data,
    },
  });
  return response.data as {
    status: number;
    coupon: {
      _id: string;
      discount_percentage: number;
      code: string;
    };
    message: string;
  };
};

export const deleteRoomBooking = async ({ id, token }) => {
  const response = await api.delete(`booking/room/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data as {
    message: string;
  };
};

export const deleteHallBooking = async ({ id, token }) => {
  const response = await api.delete(`booking/hall/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data as {
    message: string;
  };
};
