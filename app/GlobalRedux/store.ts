"use client";

import { configureStore } from "@reduxjs/toolkit";
import answerReducer from "./Features/answerSlice";
import questionReducer from "./Features/questionSlice";
import timerReducer from "./Features/timerSlice";
import authReducer from "./Features/authSlice";

export const store = configureStore({
  reducer: {
    answer: answerReducer,
    questions: questionReducer,
    timer: timerReducer,
    auth: authReducer,
  },
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
