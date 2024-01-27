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
      async function getQuestions() {
        try {
          const { examType, subjects } = action.payload;
          let newQuestions = await Promise.all(
            subjects.map(async (subject: string) => {
              const url = `https://questions.aloc.com.ng/api/v2/m/10?subject=${subject}`;
              const response = await fetch(url, {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  AccessToken: "ALOC-caa562dfeb1a7de83a69",
                },
                method: "GET",
              });
              const data = await response.json();
              return { subject: data.subject, data: data.data };
            }),
          );
          localStorage.setItem("allQuestions", JSON.stringify(newQuestions));
          console.log(newQuestions);
        } catch (error) {
          console.error("The error from fetching is ", error);
        }
      }
      getQuestions();
    },
  },
});

export const { fetchQuestions } = questionSlice.actions;

export default questionSlice.reducer;
