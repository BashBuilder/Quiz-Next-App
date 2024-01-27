"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface QuestionData {
  answer: string;
  examtype: string;
  examyear: string;
  id: number;
  image: string;
  option: QuestionOption;
  question: string;
  section: string;
  solution: string;
}
export interface QuestionOption {
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
}
export interface Questions {
  subject: string;
  data: QuestionData[];
}

const initialState: Questions[] | null = [
  {
    subject: "",
    data: [
      {
        answer: "",
        examtype: "",
        examyear: "",
        id: 0,
        image: "",
        option: { a: "", b: "", c: "", d: "", e: "" },
        question: "",
        section: "",
        solution: "",
      },
    ],
  },
];

export const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    fetchQuestions: (state, action) => {
      state = action.payload;
    },
  },
});

export const { fetchQuestions } = questionSlice.actions;

export default questionSlice.reducer;
