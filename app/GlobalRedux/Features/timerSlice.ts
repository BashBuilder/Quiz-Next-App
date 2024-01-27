"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface Timer {
  duration: number;
}
const initialState: Timer = {
  duration: 7200,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {},
});

export const {} = timerSlice.actions;

export default timerSlice.reducer;
