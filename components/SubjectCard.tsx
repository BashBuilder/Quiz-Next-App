"use client";

import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";

// Define the interfaces for your data types
interface Data {
  answer: string;
  examtype: string;
  examyear: string;
  id: number;
  image: string;
  option: Option;
  question: string;
  section: string;
  solution: string;
}

interface Option {
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
}

interface Question {
  subject: string;
  data: Data[];
}

export default function SelectSubject() {
  const [questions, setQuestions] = useState<Question | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scores, setScores] = useState(0);

  // Definining the function that fetches the questions
  async function getQuestions() {
    try {
      setIsLoading(true);
      // const url = `https://questions.aloc.com.ng/api/v2/m/10?subject=chemistry`;
      const url = `https://questions.aloc.com.ng/api/v2/m/10?subject=physics`;
      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          AccessToken: "ALOC-caa562dfeb1a7de83a69",
        },
        method: "GET",
      });
      const data = await response.json();
      const currentQuestion = data.subject;
      setQuestions({ subject: currentQuestion, data: data.data });
      setIsLoading(false);
    } catch (error) {
      console.error("The error from fetching is ", error);
    }
  }

  //defining some navigation methods
  const handleNextQuestion = () =>
    setQuestionIndex((prevIndex) => prevIndex + 1);
  const handlePrevQuestion = () =>
    setQuestionIndex((prevIndex) => prevIndex - 1);
  const handleRandomQuestion = (index: number) => setQuestionIndex(index);

  const [selectedOption, setSelectedOption] = useState({});

  const handleAnswerQuestion = (option: string, num: number) => {
    setSelectedOption((prevOption) => ({ ...prevOption, [num]: option }));
  };

  const handleSubmitQuestions = () => {
    setIsSubmitted(true);
    setIsLoading(true);
    questions?.data.forEach((question, index) => {
      // @ts-ignore
      if (answers[index + 1] === selectedOption[index + 1]) {
        setScores((prevScore) => prevScore++);
      }
    });

    setIsLoading(false);
  };

  useEffect(() => {
    questions?.data.map((item, index) => {
      setAnswers((prevAns) => ({ ...prevAns, [index + 1]: item.answer }));
    });
  }, [questions]);

  if (questions) {
    const currentQuestion = questions.data[questionIndex];
    const { option, question } = currentQuestion;

    return (
      <section className="flex min-h-screen flex-col items-center gap-4 py-10 md:py-20 ">
        {isSubmitted ? (
          <div>
            <h2 className="text-center">{scores}</h2>
            {/* <button
              // onClick={handleSubmitQuestions}
              className="rounded-md bg-primary px-4 py-2 text-background "
            >
              {isLoading ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                "View answers"
              )}
            </button> */}
          </div>
        ) : (
          <button
            onClick={handleSubmitQuestions}
            className="rounded-md bg-primary px-4 py-2 text-background "
          >
            {isLoading ? <Loader2Icon className="animate-spin" /> : "Submit"}
          </button>
        )}
        {/* the subject panel */}
        <h3 className="capitalize"> {questions.subject} </h3>

        <div className="flex w-4/5 max-w-5xl flex-col gap-4 md:gap-10">
          {/* the top question section */}
          <div className=" flex flex-col gap-4 rounded-xl bg-background p-4 shadow-xl md:px-20 md:py-10 ">
            {questions.data.map((item, qIndex) => {
              return (
                <article
                  key={qIndex}
                  className={` ${qIndex === questionIndex ? "flex flex-col gap-4" : "hidden"} `}
                >
                  <div className="flex gap-1">
                    <p className="text-xl">{questionIndex + 1}.</p>
                    <p className="text-xl"> {question} </p>
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    {Object.keys(option).map((opt: string, index) => (
                      <button
                        key={index}
                        //@ts-ignore
                        className={`rounded-md px-4 py-2 text-left  ${selectedOption[questionIndex + 1] === opt ? "bg-primary text-white" : "hover:bg-slate-100"} `}
                        onClick={() => handleAnswerQuestion(opt, qIndex + 1)}
                      >
                        <span className="pr-4">{opt}.</span>
                        {/* @ts-ignore */}
                        {option[opt]}
                      </button>
                    ))}
                  </div>
                </article>
              );
            })}

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
                disabled={questionIndex + 1 === questions.data.length}
              >
                Next
              </button>
            </div>
          </div>

          {/* the lower question navigation pane  */}
          <div className="flex flex-wrap justify-between gap-3 rounded-xl bg-background p-4 shadow-xl md:p-10 ">
            {questions.data.map((num, index) => {
              return (
                <button
                  key={index}
                  // @ts-ignore
                  className={`h-10 w-10 rounded-md text-sm  ${selectedOption[index + 1] ? "bg-primary" : index === questionIndex ? "bg-slate-400" : "bg-slate-200"} `}
                  onClick={() => handleRandomQuestion(index)}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <div className="flex min-h-screen items-center justify-center py-10 md:py-20 ">
        <button
          onClick={getQuestions}
          className="rounded-md bg-primary px-4 py-2 text-background "
        >
          {isLoading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "Fetch Questions"
          )}
        </button>
      </div>
    );
  }
}
