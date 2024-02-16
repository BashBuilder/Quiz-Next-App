"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface Timer {
  duration: number;
  isExamStarted: boolean;
  // hours: number;
  // minutes: number;
  // seconds: number;
}
const initialState: Timer = {
  duration: 7200,
  isExamStarted: false,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTimerTime: (state, action) => {
      return { ...state, duration: action.payload, isExamStarted: true };
    },
  },
});

export const { setTimerTime } = timerSlice.actions;

export default timerSlice.reducer;
