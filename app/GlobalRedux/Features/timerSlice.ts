"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface Timer {
  duration: number;
  hours: number;
  minutes: number;
  seconds: number;
}
const initialState: Timer = {
  duration: 7200,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startTimer: (state, action) => {
      const duration = action.payload;
      const endTime = new Date().getTime() + duration * 1000;
      const calculateTimeRemaining = () => {
        const currentTime = new Date().getTime();
        const timeRemaining = endTime - currentTime;

        if (timeRemaining <= 0) {
          clearInterval(countdown);
          console.log("exam ended");
        } else {
          const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
          const seconds = Math.floor((timeRemaining / 1000) % 60);
          return { ...state, hours, minutes, seconds };
        }
      };
      calculateTimeRemaining(); // Initial calculation
      const countdown = setInterval(calculateTimeRemaining, 1000);
      return state;
      // return countdown;
    },
  },
});

export const { startTimer } = timerSlice.actions;

export default timerSlice.reducer;
