"use client";
import { createSlice } from "@reduxjs/toolkit";
import { Questions } from "./questionSlice";

export interface Solution {
  num: number;
  subject: string;
  answer: string;
}
export interface AnswerSlice {
  selectedOptions: Solution[];
  answers: Solution[];
}
const initialState: AnswerSlice = {
  selectedOptions: [],
  answers: [],
};

export const answerSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    getAnswers: (state, action) => {
      const questions: Questions[] = action.payload;
      let ans: Solution[] = [];
      let opt: Solution[] = [];
      questions?.forEach((questions: Questions) => {
        const sub = questions.subject;
        questions?.data.forEach((item, index) => {
          ans = [...ans, { num: index + 1, subject: sub, answer: item.answer }];
          opt = [...opt, { num: index + 1, subject: sub, answer: "" }];
        });
      });
      return { ...state, answers: ans, selectedOptions: opt };
    },
    updateAnswers: (state, action) => {
      const updatedOption = action.payload;
      const { num, subject, answer } = updatedOption;
      // Find the index of the option to update
      const optionIndex = state.selectedOptions.findIndex(
        (opt) => opt.num === num && opt.subject === subject,
      );
      // If the option is found, update it; otherwise, do nothing
      if (optionIndex !== -1) {
        const updatedOptions = [...state.selectedOptions];
        updatedOptions[optionIndex] = { num, subject, answer };

        // console.log(updatedOption);
        return { ...state, selectedOptions: updatedOptions };
      }

      return state;
    },
  },
});

export const { getAnswers, updateAnswers } = answerSlice.actions;

export default answerSlice.reducer;
