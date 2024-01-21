"use client";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";

export default function SelectSubject() {
  const [questions, setquestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);

  async function getQuestions() {
    try {
      const response = await fetch(
        "https://questions.aloc.com.ng/api/v2/m/10?subject=chemistry",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            AccessToken: "ALOC-caa562dfeb1a7de83a69",
          },
          method: "GET",
        },
      );
      const data = await response.json();
      const currentQuestion = data.subject;
      // @ts-ignore
      setquestions({ subject: currentQuestion, data: data.data });
      // questions.push({ ...data.data[0], subject: data.subject });
    } catch (error) {
      console.log("The error from fetching is ", error);
    }
  }

  console.log(questions);

  const handleNextQuestion = () =>
    setQuestionIndex((prevIndex) => prevIndex + 1);
  const handlePrevQuestion = () =>
    setQuestionIndex((prevIndex) => prevIndex - 1);
  // @ts-ignore
  const handleRandomQuestion = (index) => setQuestionIndex(index);

  if (questions.length !== 0) {
    // @ts-ignore
    if (questionIndex + 1 > questions.data.length) {
      setQuestionIndex(questionIndex);
    } else if (questionIndex < 0) {
      setQuestionIndex(0);
    }

    // @ts-ignore
    const { option, question } = questions.data[questionIndex];

    return (
      <section className="flex min-h-screen flex-col items-center gap-4 py-10 md:py-20 ">
        <button
          onClick={getQuestions}
          className="rounded-md bg-primary px-4 py-2 text-background "
        >
          Fetch Questions
        </button>
        {/* the subject panel */}
        {/* <h5 className="text-right ">Time remaining : 2 min</h5> */}
        {/* @ts-ignore */}
        <h3 className="capitalize"> {questions.subject} </h3>
        <div className="flex w-4/5 max-w-5xl flex-col gap-4 md:gap-10">
          {/* the top question section */}
          <div className=" flex flex-col gap-4 rounded-xl bg-background p-4 shadow-xl md:px-20 md:py-10 ">
            <article className="flex flex-col gap-4 ">
              <div className="flex gap-1">
                <p className="text-xl">{questionIndex + 1}</p>
                {/* @ts-ignore */}
                <p className="text-xl"> {question} </p>
              </div>
              <div className="flex flex-col gap-2">
                {
                  // @ts-ignore
                  Object.keys(option).map((key, index) => (
                    <label key={index} className=" cursor-pointer">
                      <input
                        type="radio"
                        className="mr-2 cursor-pointer "
                        name="Option"
                      />
                      {option[key]}
                    </label>
                  ))
                }
              </div>
            </article>

            {/* the next and previos button goes here */}
            <div className="my-6 flex justify-between">
              <button
                onClick={handlePrevQuestion}
                className="rounded-md bg-slate-200 px-4 py-2 font-bold text-slate-700 hover:shadow-md disabled:bg-red-300 "
                disabled={questionIndex === 0}
              >
                Previous
              </button>
              <button
                onClick={handleNextQuestion}
                className="rounded-md bg-slate-200 px-4 py-2 font-bold text-slate-700 hover:shadow-md disabled:bg-red-300"
                // @ts-ignore
                disabled={questionIndex + 1 === questions.data.length}
              >
                Next
              </button>
            </div>
          </div>

          {/* the lower question navigation pane  */}
          <div className="flex flex-wrap justify-between gap-3 rounded-xl bg-background p-4 shadow-xl md:p-10 ">
            {/* @ts-ignore */}
            {questions.data.map((num, index) => (
              <button
                key={index}
                className={`h-10 w-10 rounded-md bg-slate-200 text-sm ${index === questionIndex ? "bg-slate-400" : "bg-slate-200"} `}
                onClick={() => handleRandomQuestion(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center py-10 md:py-20 ">
      <button
        onClick={getQuestions}
        className="rounded-md bg-primary px-4 py-2 text-background "
      >
        Fetch Questions
      </button>
      <p className="animate-spin">
        <Loader2Icon />
      </p>
    </div>
  );
}
