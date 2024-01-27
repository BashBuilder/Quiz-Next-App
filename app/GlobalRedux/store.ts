"use client";

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Features/counterSlice";
import questionReducer from "./Features/questions";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    questions: questionReducer,
  },
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
