"use client";

import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
} from "@/app/GlobalRedux/Features/counter/counterSlice";
import { Rootstate } from "@/app/GlobalRedux/store";

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
interface CbtTime {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function SelectSubject() {
  const [questions, setQuestions] = useState<Question | null>(null);
  const [allQuestions, setAllQuestions] = useState<Question[] | null>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scores, setScores] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string>("chemistry");
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState({});
  const [cbtTime, setCbtTime] = useState<CbtTime | null>();

  const count = useSelector((state: Rootstate) => state.counter.value);
  const dispatch = useDispatch();

  // Definining the function that fetches the questions
  async function getQuestions() {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      console.error("The error from fetching is ", error);
    }
  }
  // fetch questions from local storage
  useEffect(() => {
    const q = localStorage.getItem("allQuestions");
    // @ts-ignore
    const t = JSON.parse(q);
    // @ts-ignore
    setAllQuestions(t);
    setQuestions(t[0]);

    // const duration = 3600; // 3600 seconds = 1 hour
    const timer = countdownTimer();
    // eslint-disable-next-line
  }, []);

  // ----------------------------------------------------------------
  //defining some navigation methods
  const handleNextQuestion = (num: number) =>
    setQuestionIndex((prevIndex) => prevIndex + num);
  const handleRandomQuestion = (index: number) => setQuestionIndex(index);

  // -function that saves the selected options
  const handleAnswerQuestion = (
    option: string,
    num: number,
    subject: string,
  ) => {
    setSelectedOption((prevOption) => ({
      ...prevOption,
      [subject]: {
        // @ts-ignore
        ...(prevOption[subject] || {}), // Copy existing options for the subject
        [num]: option, // Update or add new option for the given num
      },
    }));
  };
  // get all correct options
  useEffect(() => {
    const newAnswers = {};
    const newOptions = {};
    allQuestions?.forEach((questions) => {
      const sub = questions.subject;
      let ans = {};
      let setOpt = {};
      questions?.data.forEach((item, index) => {
        ans = { ...ans, [index + 1]: item.answer };
        setOpt = { ...setOpt, [index + 1]: "" };
      });
      // @ts-ignore
      newAnswers[sub] = { ...ans };
      // @ts-ignore
      newOptions[sub] = { ...setOpt };
    });
    setAnswers(newAnswers);
    setSelectedOption(newOptions);
  }, [allQuestions]);

  // submit question and get the correct answers
  const handleSubmitQuestions = () => {
    setIsSubmitted(true);
    setIsLoading(true);
    let counter = 0;
    const subjectScores = {};
    // Iterate over subjects
    Object.keys(answers).forEach((subject) => {
      let subjectScore = 0;
      // Iterate over questions within each subject
      // @ts-ignore
      Object.keys(answers[subject]).forEach((question) => {
        // @ts-ignore
        const answer = answers[subject][question];
        // @ts-ignore
        const selectedOpt = selectedOption[subject][question];
        // Compare selected option with correct answer
        if (selectedOpt === answer) {
          counter++;
          subjectScore++;
        }
      });
      // Store subject score
      // @ts-ignore
      subjectScores[subject] = subjectScore;
    });
    setScores(counter);
    setIsLoading(false);

    console.log(counter, subjectScores);
  };

  // switch between questions
  useEffect(() => {
    const newQuestions = allQuestions?.filter(
      (questions) => questions.subject === selectedSubject,
    )[0];
    newQuestions && setQuestions(newQuestions);
    // eslint-disable-next-line
  }, [selectedSubject]);

  // the timer function
  // @ts-ignore
  function countdownTimer(durationInSeconds = 7200) {
    let timer = durationInSeconds;

    const countdown = setInterval(() => {
      if (timer <= 0) {
        clearInterval(countdown);
        handleSubmitQuestions();
      } else {
        const hours = Math.floor(timer / 3600);
        const minutes = Math.floor((timer % 3600) / 60);
        const seconds = timer % 60;
        setCbtTime({ hours, minutes, seconds });
        timer--;
      }
    }, 1000); // Update every 1000 milliseconds (1 second)
    return countdown;
  }

  const duration = 3600; // 3600 seconds = 1 hour
  // const timer = countdownTimer(duration);

  if (questions && allQuestions) {
    const currentQuestion = questions.data[questionIndex];
    const { option, question, id } = currentQuestion;
    const { subject } = questions;

    return (
      <section className="flex min-h-screen flex-col gap-4 py-6 md:py-20 ">
        {isSubmitted ? (
          <div>
            <h2 className="text-center">{scores}</h2>
          </div>
        ) : (
          <div className="mx-auto flex w-4/5 max-w-5xl flex-col">
            <div className="mb-4 flex items-center justify-end gap-1">
              <h6>Time Remaining </h6>
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
                <h6>{cbtTime?.hours}</h6>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
                <h6>{cbtTime?.minutes}</h6>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
                <h6>{cbtTime?.seconds}</h6>
              </div>
            </div>
            <button
              onClick={handleSubmitQuestions}
              className="mx-auto rounded-md bg-primary px-4 py-2 text-background "
            >
              {isLoading ? <Loader2Icon className="animate-spin" /> : "Submit"}
            </button>
          </div>
        )}
        {/* the subject panel */}

        <div className="mx-auto flex w-4/5 max-w-5xl flex-col ">
          <button onClick={() => dispatch(increment())}>Increment</button>
          <span> {count} </span>
          <button onClick={() => dispatch(decrement())}>Decrement</button>
          <button onClick={() => dispatch(incrementByAmount(2))}>
            Increment by 2
          </button>

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
                      // @ts-ignore
                      const test = selectedOption[subject];
                      // @ts-ignore
                      const sub = answers[subject];

                      // @ts-ignore
                      const correctSelectedOption =
                        test &&
                        sub &&
                        // @ts-ignore
                        test[questionIndex + 1] ===
                          // @ts-ignore
                          sub[questionIndex + 1] &&
                        // @ts-ignore
                        sub[questionIndex + 1] === opt;

                      const correctionOption =
                        test &&
                        sub &&
                        // @ts-ignore
                        (test[questionIndex + 1] !==
                          // @ts-ignore
                          sub[questionIndex + 1] ||
                          // @ts-ignore
                          !test[questionIndex + 1]) &&
                        // @ts-ignore
                        sub[questionIndex + 1] === opt;

                      return (
                        <button
                          key={index}
                          //@ts-ignore
                          className={`rounded-md px-4 py-2 text-left ${isSubmitted ? test && sub && (correctSelectedOption ? correctColor : correctionOption ? wrongColor : selectedOption[questionIndex + 1] === opt && selectedColor) : test && test[questionIndex + 1] === opt ? selectedColor : normalColor}`}
                          onClick={() =>
                            handleAnswerQuestion(opt, qIndex + 1, subject)
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
              // @ts-ignore
              const test = selectedOption[subject];
              // @ts-ignore
              const sub = answers[subject];

              const correctSelectedOption =
                test &&
                sub &&
                // @ts-ignore
                test[index + 1] ===
                  // @ts-ignore
                  sub[index + 1];
              return (
                <button
                  key={index}
                  // @ts-ignore
                  className={`h-10 w-10 rounded-md text-sm  ${isSubmitted ? test && sub && (correctSelectedOption ? "bg-green-500 text-white" : "bg-red-500 text-white") : test ? (test[index + 1] ? "bg-primary" : index === questionIndex ? "bg-slate-400" : "bg-slate-200") : index === questionIndex ? "bg-slate-400" : "bg-slate-200"} `}
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
