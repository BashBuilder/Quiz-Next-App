"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthType {
  userAuth: string;
  userEmail: string;
  databaseID: string;
  trials: number;
  isEmailVerified: boolean;
}
const initialState: AuthType = {
  userAuth: "",
  userEmail: "",
  trials: 0,
  databaseID: "",
  isEmailVerified: false,
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
    getUserTrials: (state, action) => {
      return {
        ...state,
        databaseID: action.payload.databaseID,
        trials: action.payload.trials,
      };
    },
    setTrials: (state, action) => {
      return { ...state, trials: action.payload.trials };
    },
    setAuthLoading: (state, action) => {
      return { ...state, isAuthLoading: action.payload };
    },
  },
});

export const {
  setUserAuthentication,
  getUserTrials,
  setAuthLoading,
  setTrials,
} = authSlice.actions;

export default authSlice.reducer;
