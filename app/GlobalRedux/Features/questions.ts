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
  name: "questionnaire",
  initialState,
  reducers: {
    fetchQuestion: (state, action) => {
      const subjects = action.payload.subjects;
      async function getQuestions() {
        try {
          interface Url {}
          let url: Url | null = {};
          subjects.map((subject: string, index: number) => {});

          const url1 = `https://questions.aloc.com.ng/api/v2/m/10?subject=chemistry`;
          const url2 = `https://questions.aloc.com.ng/api/v2/m/10?subject=physics`;
          // const url3 = `https://questions.aloc.com.ng/api/v2/m/10?subject=biology`;
          // const url4 = `https://questions.aloc.com.ng/api/v2/m/10?subject=physics`;
          const [
            response,
            response2,
            // response3, response4
          ] = await Promise.all([
            fetch(url1, {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                AccessToken: "ALOC-caa562dfeb1a7de83a69",
              },
              method: "GET",
            }),
            fetch(url2, {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                AccessToken: "ALOC-caa562dfeb1a7de83a69",
              },
              method: "GET",
            }),
            // fetch(url3, {
            //   headers: {
            //     Accept: "application/json",
            //     "Content-Type": "application/json",
            //     AccessToken: "ALOC-caa562dfeb1a7de83a69",
            //   },
            //   method: "GET",
            // }),
            // fetch(url4, {
            //   headers: {
            //     Accept: "application/json",
            //     "Content-Type": "application/json",
            //     AccessToken: "ALOC-caa562dfeb1a7de83a69",
            //   },
            //   method: "GET",
            // }),
          ]);
          const [
            data,
            data2,
            // data3, data4
          ] = await Promise.all([
            response.json(),
            response2.json(),
            // response3.json(),
            // response4.json(),
          ]);
          setQuestions({ subject: data.subject, data: data.data });
          const q = [
            { subject: data.subject, data: data.data },
            { subject: data2.subject, data: data2.data },
            // { subject: data3.subject, data: data3.data },
            // { subject: data4.subject, data: data4.data },
          ];
          setAllQuestions(q);
          localStorage.setItem("allQuestions", JSON.stringify(q));
        } catch (error) {
          console.error("The error from fetching is ", error);
        }
      }
    },
  },
});
