import { UseMutationResult, useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { toast } from "react-toastify";
import { api } from "../api";

type User = {
  _id?: string;
  name?: string;
  email: string;
  phone?: number;
  password: string;
};

type LoginResponse = {
  status: number;
  data: {
    user: User;
    token: string;
  };
};

type ErrorResponse = {
  status: number;
  message: string;
};

type AuthContext = {
  user?: User;
  token?: string;
  register: UseMutationResult<
    { message: string; status: number },
    ErrorResponse,
    unknown
  >;
  login: UseMutationResult<LoginResponse, ErrorResponse, User>;
  logout: () => void;
};

const Context = createContext<AuthContext | null>(null);

export function useAuth() {
  return useContext(Context) as AuthContext;
}

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage<User>("user");
  const [token, setToken] = useLocalStorage<string>("token");

  const register = useMutation({
    mutationFn: async (user: User) => {
      const { data } = await api.post("/user/register", user);
      return data as {
        message: string;
        status: number;
      };
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login");
    },

    onError: (error: any) => {
      toast.error(String(error.response.data.message));
    },
  });

  const login = useMutation({
    mutationFn: async (user: User) => {
      const { data } = await api.post("/user/login", user);
      return data as LoginResponse;
    },

    onSuccess: (data) => {
      toast.success("Logged in successfully");
      setUser(data.data.user);
      setToken(data.data.token);
      navigate("/");
    },

    onError: (error: any) => {
      toast.error(String(error.response.data.message));
    },
  });

  const logout = () => {
    setUser(null);
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <Context.Provider value={{ register, login, logout, user, token }}>
      {children}
    </Context.Provider>
  );
}
