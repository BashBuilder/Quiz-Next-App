"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthType {
  userAuth: string;
  userEmail: string;
  isAuthLoading: boolean;
  isEmailVerified: boolean;
  trials: number;
}
const initialState: AuthType = {
  userAuth: "",
  userEmail: "",
  isAuthLoading: false,
  isEmailVerified: false,
  trials: 0,
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
        isEmailVerified: action.payload.isEmailVerified,
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
