"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthType {
  userAuth: string;
}
const initialState: AuthType = {
  userAuth: "",
};

export const timerSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserAuthentication: (state, action) => {},
    getUserAuthentication: () => {},
  },
});

export const { setUserAuthentication, getUserAuthentication } =
  timerSlice.actions;

export default timerSlice.reducer;
