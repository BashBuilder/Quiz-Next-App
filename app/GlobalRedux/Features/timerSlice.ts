"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface Timer {
  duration: number;
  isExamStarted: boolean;
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
      return { duration: action.payload, isExamStarted: true };
    },
    endExam: () => {
      const examTime = {
        duration: 0,
        isExamStarted: false,
      };
      localStorage.setItem("examTime", JSON.stringify(examTime));
      return {
        duration: examTime.duration,
        isExamStarted: examTime.isExamStarted,
      };
    },
  },
});

export const { setTimerTime, endExam } = timerSlice.actions;

export default timerSlice.reducer;
