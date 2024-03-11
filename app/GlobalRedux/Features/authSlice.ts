"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthType {
  userAuth: string;
  userEmail: string;
  isAuthLoading: boolean;
}
const initialState: AuthType = {
  userAuth: "",
  userEmail: "",
  isAuthLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserAuthentication: (state, action) => {
      return {
        ...state,
        userAuth: action.payload.token,
        userEmail: action.payload.email,
      };
    },
    getUserAuthentication: () => {},
    setAuthLoading: (state, action) => {
      return { ...state, isAuthLoading: action.payload };
    },
  },
});

export const { setUserAuthentication, getUserAuthentication, setAuthLoading } =
  authSlice.actions;

export default authSlice.reducer;
