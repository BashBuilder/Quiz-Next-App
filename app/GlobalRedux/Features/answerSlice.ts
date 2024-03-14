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
  subjects: string[];
  examStatus: boolean;
}
const initialState: AnswerSlice = {
  selectedOptions: [],
  answers: [],
  score: 0,
  subjectScore: [],
  isSubmitted: false,
  subjects: [],
  examStatus: false,
};

export const answerSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    getAnswers: (state, action) => {
      const questions: Questions[] = action.payload.allQuestionReload;
      const subjects = action.payload.subjects;
      const isSubmitted = action.payload.isSubmitted;
      const selectedOptions = action.payload.selectedOptions;
      let ans: Solution[] = [];
      let opt: Solution[] = [];
      questions?.forEach((questions: Questions) => {
        const sub = questions.subject;
        questions?.data.forEach((item, index) => {
          ans = [...ans, { num: index + 1, subject: sub, answer: item.answer }];
          opt = [...opt, { num: index + 1, subject: sub, answer: "" }];
        });
      });
      if (isSubmitted) {
        return {
          ...state,
          answers: ans,
          selectedOptions,
          subjects,
          isSubmitted,
        };
      } else {
        return {
          ...state,
          answers: ans,
          selectedOptions: opt,
          subjects,
          isSubmitted,
        };
      }
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

    submitAnswer: (state) => {
      const submittedDetails = {
        isSubmitted: true,
        selectedOptions: state.selectedOptions,
      };
      localStorage.setItem("examSubmitted", JSON.stringify(submittedDetails));
      const answers = state.answers;
      const options = state.selectedOptions;
      let score = 0;
      let subjectScores: { [subject: string]: number } = {};
      state.subjects.forEach((subject) => {
        subjectScores[subject] = 0;
      });
      answers.forEach((answer, index) => {
        if (options[index].answer === answer.answer) {
          if (subjectScores.hasOwnProperty(answer.subject)) {
            if (answer.subject === "english") {
              subjectScores[answer.subject] += 1.7;
            } else {
              subjectScores[answer.subject] += 2.5;
            }
          }
        }
      });
      const formattedSubjectScores: SubjectScores[] = Object.entries(
        subjectScores,
      ).map(([subject, score]) => ({ subject, score: Math.round(score) }));

      score = formattedSubjectScores.reduce(
        (acc, subject) => acc + subject.score,
        0,
      );
      return {
        ...state,
        isSubmitted: true,
        score,
        subjectScore: formattedSubjectScores,
      };
    },
  },
});

export const { getAnswers, updateAnswers, submitAnswer } = answerSlice.actions;

export default answerSlice.reducer;
