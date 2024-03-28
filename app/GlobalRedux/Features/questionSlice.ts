"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface QuestionData {
  answer: string;
  examtype: string;
  examyear: string;
  id: number;
  image: string;
  option: QuestionOption;
  question: string | null;
  section: string;
  solution: string;
  questionNub: number;
  topic?: string;
  category?: string;
}
export interface QuestionOption {
  a: string;
  b: string;
  c: string;
  d: string;
  e?: string;
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
        questionNub: 0,
        topic: "",
      },
    ],
  },
];

export const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    fetchQuestions: (state, action) => {
      return action.payload;
    },
  },
});

export const { fetchQuestions } = questionSlice.actions;

export default questionSlice.reducer;
