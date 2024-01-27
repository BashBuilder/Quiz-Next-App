"use client";

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Features/answerSlice";
import questionReducer from "./Features/questionSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    questions: questionReducer,
  },
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
