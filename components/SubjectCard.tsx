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
  const [allQuestions, setAllQuestions] = useState<Question[] | null>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scores, setScores] = useState(0);
  const [selectedOption, setSelectedOption] = useState({});
  const [selectedSubject, setSelectedSubject] = useState<string>("english");

  // Definining the function that fetches the questions
  async function getQuestions() {
    try {
      setIsLoading(true);
      const url1 = `https://questions.aloc.com.ng/api/v2/m/10?subject=chemistry`;
      const url2 = `https://questions.aloc.com.ng/api/v2/m/10?subject=physics`;
      const url3 = `https://questions.aloc.com.ng/api/v2/m/10?subject=biology`;
      const url4 = `https://questions.aloc.com.ng/api/v2/m/10?subject=physics`;
      const [response, response2, response3, response4] = await Promise.all([
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
        fetch(url3, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            AccessToken: "ALOC-caa562dfeb1a7de83a69",
          },
          method: "GET",
        }),
        fetch(url4, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            AccessToken: "ALOC-caa562dfeb1a7de83a69",
          },
          method: "GET",
        }),
      ]);
      const [data, data2, data3, data4] = await Promise.all([
        response.json(),
        response2.json(),
        response3.json(),
        response4.json(),
      ]);
      setQuestions({ subject: data.subject, data: data.data });
      setAllQuestions([
        { subject: data.subject, data: data.data },
        { subject: data2.subject, data: data2.data },
        { subject: data3.subject, data: data3.data },
        { subject: data4.subject, data: data4.data },
      ]);
      setIsLoading(false);
    } catch (error) {
      console.error("The error from fetching is ", error);
    }
  }
  // ----------------------------------------------------------------
  //defining some navigation methods
  const handleNextQuestion = (num: number) =>
    setQuestionIndex((prevIndex) => prevIndex + num);
  const handleRandomQuestion = (index: number) => setQuestionIndex(index);

  // ----------------------------------------------------------------
  const handleAnswerQuestion = (
    option: string,
    num: number,
    id: number,
    subject: string,
  ) => {
    setSelectedOption((prevOption) => ({
      ...prevOption,
      [num]: option,
      id,
      subject,
    }));
  };

  console.log(selectedOption);

  const handleSubmitQuestions = () => {
    setIsSubmitted(true);
    setIsLoading(true);
    let counter = 0;
    questions?.data.map((question, index) => {
      // @ts-ignore
      const isCorrect = answers[index + 1] === selectedOption[index + 1];
      // @ts-ignore
      if (answers[index + 1] === selectedOption[index + 1]) {
        counter++;
        setScores(counter);
      }
    });
    setIsLoading(false);
  };

  useEffect(() => {
    questions?.data.map((item, index) => {
      setAnswers((prevAns) => ({ ...prevAns, [index + 1]: item.answer }));
    });
  }, [questions]);

  useEffect(() => {
    const newQuestions = allQuestions?.filter(
      (questions) => questions.subject === selectedSubject,
    )[0];
    newQuestions && setQuestions(newQuestions);
    // eslint-disable-next-line
  }, [selectedSubject]);

  if (questions && allQuestions) {
    const currentQuestion = questions.data[questionIndex];
    const { option, question, id } = currentQuestion;
    const { subject } = questions;

    return (
      <section className="flex min-h-screen flex-col items-center gap-4 py-6 md:py-20 ">
        {isSubmitted ? (
          <div>
            <h2 className="text-center">{scores}</h2>
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

        <div className="flex w-4/5 max-w-5xl flex-col">
          <div className="mb-2 flex flex-wrap gap-2 ">
            {allQuestions.map((question, index) => (
              <button
                key={index}
                className={`" rounded-sm  px-4 py-2 capitalize hover:shadow-lg ${question.subject === selectedSubject ? "bg-primary" : "bg-background"} `}
                onClick={() => setSelectedSubject(question.subject)}
              >
                {question.subject}
              </button>
            ))}
          </div>
          {/* the top question section */}
          <div className=" mb-4 flex flex-col gap-4 rounded-xl bg-background p-4 shadow-xl md:mb-10 md:px-20 md:py-10  ">
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
                    {Object.keys(option).map((opt: string, index) => {
                      const selectedColor = "bg-primary text-white";
                      const correctColor = "bg-green-500 text-white";
                      const wrongColor = "bg-red-500 text-white";
                      const normalColor = "hover:bg-slate-100";
                      const correctSelectedOption =
                        // @ts-ignore
                        selectedOption[questionIndex + 1] ===
                          // @ts-ignore
                          answers[questionIndex + 1] &&
                        // @ts-ignore
                        answers[questionIndex + 1] === opt;

                      const correctionColor = // @ts-ignore
                        (selectedOption[questionIndex + 1] !==
                          // @ts-ignore
                          answers[questionIndex + 1] ||
                          // @ts-ignore
                          !selectedOption[questionIndex + 1]) &&
                        // @ts-ignore
                        answers[questionIndex + 1] === opt;

                      return (
                        <button
                          key={index}
                          //@ts-ignore
                          className={`rounded-md px-4 py-2 text-left ${isSubmitted ? (correctSelectedOption ? correctColor : correctionColor ? wrongColor : selectedOption[questionIndex + 1] === opt ? selectedColor : "") : selectedOption[questionIndex + 1] === opt ? selectedColor : normalColor}}`}
                          onClick={() =>
                            handleAnswerQuestion(opt, qIndex + 1, id, subject)
                          }
                          disabled={isSubmitted}
                        >
                          <span className="pr-4">{opt}.</span>
                          {/* @ts-ignore */}
                          {option[opt]}
                        </button>
                      );
                    })}
                  </div>
                </article>
              );
            })}

            {/* the next and previous button goes here */}
            <div className="my-6 flex justify-between">
              <button
                onClick={() => handleNextQuestion(-1)}
                className="rounded-md bg-slate-200 px-4 py-2 font-bold text-slate-700 hover:shadow-md disabled:bg-red-300 "
                disabled={questionIndex === 0}
              >
                Previous
              </button>
              <button
                onClick={() => handleNextQuestion(1)}
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
              const correctSelectedOption =
                // @ts-ignore
                selectedOption[index + 1] ===
                // @ts-ignore
                answers[index + 1];
              return (
                <button
                  key={index}
                  // @ts-ignore
                  className={`h-10 w-10 rounded-md text-sm  ${isSubmitted ? (correctSelectedOption ? "bg-green-500 text-white" : "bg-red-500 text-white") : selectedOption[index + 1] ? "bg-primary" : index === questionIndex ? "bg-slate-400" : "bg-slate-200"} `}
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
