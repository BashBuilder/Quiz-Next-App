"use client";
import { createSlice } from "@reduxjs/toolkit";
import { Questions } from "./questionSlice";

export interface Solution {
  num: number;
  subject: string;
  answer: string;
}
interface SubjectScores {
  subject: string;
  score: number;
}
export interface AnswerSlice {
  selectedOptions: Solution[];
  answers: Solution[];
  score: number;
  subjectScore: SubjectScores[];
  isSubmitted: boolean;
}
const initialState: AnswerSlice = {
  selectedOptions: [],
  answers: [],
  score: 0,
  subjectScore: [],
  isSubmitted: false,
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
        return { ...state, selectedOptions: updatedOptions };
      }
      return state;
    },
    submitAnswer: (state, action) => {
      const answers = state.answers;
      const options = state.selectedOptions;
      let score = 0;
      let subjectScores: { [subject: string]: number } = {};
      answers.forEach((answer, index) => {
        if (options[index].answer === answer.answer) {
          score++;
          if (subjectScores.hasOwnProperty(answer.subject)) {
            subjectScores[answer.subject]++;
          } else {
            subjectScores[answer.subject] = 1;
          }
        }
      });
      const formattedSubjectScores: SubjectScores[] = Object.entries(
        subjectScores,
      ).map(([subject, score]) => ({ subject, score }));

      console.log(formattedSubjectScores);
      console.log(score);
      return { ...state, isSubmitted: true, score };
    },
  },
});

export const { getAnswers, updateAnswers, submitAnswer } = answerSlice.actions;

export default answerSlice.reducer;
