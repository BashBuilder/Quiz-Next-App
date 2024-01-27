"use client";

import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Rootstate } from "@/app/GlobalRedux/store";
import {
  Questions,
  fetchQuestions,
} from "@/app/GlobalRedux/Features/questionSlice";
import {
  Solution,
  getAnswers,
  updateAnswers,
} from "@/app/GlobalRedux/Features/answerSlice";
import { Button } from "./ui/button";
import { current } from "@reduxjs/toolkit";

interface CbtTime {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function ExamCard() {
  const [questions, setQuestions] = useState<Questions | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scores, setScores] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string>("english");
  // const [answers, setAnswers] = useState({});
  // const [selectedOption, setSelectedOption] = useState({});
  const [cbtTime, setCbtTime] = useState<CbtTime | null>();

  const allQuestions = useSelector((state: Rootstate) => state.questions);
  const answers = useSelector((state: Rootstate) => state.answer.answers);
  const selectedOption = useSelector(
    (state: Rootstate) => state.answer.selectedOptions,
  );
  const dispatch = useDispatch();

  // fetch questions from local storage
  useEffect(() => {
    const q = localStorage.getItem("allQuestions");
    const t = q ? JSON.parse(q) : null;
    dispatch(fetchQuestions(t));
    setQuestions(t[0]);
    dispatch(getAnswers(t));
    const endTime = new Date().getTime() + 7200 * 1000; // Set end time 2 hours from now
    const onTimerEnd = () => {
      console.log("Timer has ended!");
    };
    const countdown = countdownTimer(endTime, onTimerEnd);
    // eslint-disable-next-line
  }, []);
  //defining some navigation methods
  const handleNextQuestion = (num: number) =>
    setQuestionIndex((prevIndex) => prevIndex + num);
  const handleRandomQuestion = (index: number) => setQuestionIndex(index);

  // -function that saves the selected options
  const handleAnswerQuestion = (
    answer: string,
    num: number,
    subject: string,
  ) => {
    dispatch(updateAnswers({ answer, num, subject }));
    // setSelectedOption((prevOption) => ({
    //   ...prevOption,
    //   [subject]: {
    //     // @ts-ignore
    //     ...(prevOption[subject] || {}), // Copy existing options for the subject
    //     [num]: option, // Update or add new option for the given num
    //   },
    // }));
  };
  // get all correct options
  // useEffect(() => {
  //   const newAnswers = {};
  //   const newOptions = {};
  //   allQuestions?.forEach((questions) => {
  //     const sub = questions.subject;
  //     let ans = {};
  //     let setOpt = {};
  //     questions?.data.forEach((item, index) => {
  //       ans = { ...ans, [index + 1]: item.answer };
  //       setOpt = { ...setOpt, [index + 1]: "" };
  //     });
  //     // @ts-ignore
  //     newAnswers[sub] = { ...ans };
  //     // @ts-ignore
  //     newOptions[sub] = { ...setOpt };
  //   });
  //   setAnswers(newAnswers);

  //   setSelectedOption(newOptions);
  //   // eslint-disable-next-line
  // }, [allQuestions]);

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
  function countdownTimer(endTime, onTimerEnd) {
    const calculateTimeRemaining = () => {
      const currentTime = new Date().getTime();
      const timeRemaining = endTime - currentTime;

      if (timeRemaining <= 0) {
        clearInterval(countdown);
        onTimerEnd();
      } else {
        const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
        const seconds = Math.floor((timeRemaining / 1000) % 60);

        setCbtTime({ hours, minutes, seconds });
      }
    };
    calculateTimeRemaining(); // Initial calculation
    const countdown = setInterval(calculateTimeRemaining, 1000);
    return countdown;
  }

  if (questions && allQuestions) {
    const selectedColor = "bg-primary text-white";
    const correctColor = "bg-green-500 text-white";
    const wrongColor = "bg-red-500 text-white";
    const normalColor = "hover:bg-slate-100";

    const currentQuestion = questions.data[questionIndex];
    const { option, question } = currentQuestion;
    const { subject } = questions;

    const currentNum: number = questionIndex + 1;
    const options: Solution[] = selectedOption.filter(
      (option) => option.subject === subject,
    );
    const subjectAnswers: Solution[] = answers.filter(
      (answer) => answer.subject === subject,
    );
    const currentOption = options.filter(
      (option) => option.num === currentNum,
    )[0].answer;
    const currentAnswer = subjectAnswers.filter(
      (answer) => answer.num === currentNum,
    )[0].answer;

    return (
      <section className="flex min-h-screen flex-col gap-4 py-6 md:py-20 ">
        <h4 className=" py-2 text-center"> JAMB CBT MOCK </h4>
        {isSubmitted ? (
          <div>
            <h2 className="text-center">{scores}</h2>
          </div>
        ) : (
          <div className="mx-auto flex w-[90vw] max-w-5xl flex-col">
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
            {/* <button
              onClick={handleSubmitQuestions}
              className="mx-auto rounded-md bg-primary px-4 py-2 text-background "
            >
              {isLoading ? <Loader2Icon className="animate-spin" /> : "Submit"}
            </button> */}
          </div>
        )}
        {/* the subject panel */}
        <div className="mx-auto flex w-[90vw] max-w-5xl flex-col ">
          <div className="mb-2 flex flex-wrap gap-2 ">
            {allQuestions.map((question, index) => (
              <Button
                key={index}
                className={` rounded-md font-semibold capitalize hover:shadow-lg ${question.subject === selectedSubject ? "bg-primary text-white" : "bg-background text-foreground"} `}
                onClick={() => setSelectedSubject(question.subject)}
              >
                {question.subject}
              </Button>
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
                      const isOptionCorrect = currentAnswer === currentOption;
                      const isOptionSelected = currentOption === opt;
                      const isNonChosenCorrectAnswer = currentAnswer === opt;
                      return (
                        <button
                          key={index}
                          className={`hover: rounded-md px-4 py-2 text-left ${isSubmitted ? (isOptionCorrect ? correctColor : !isNonChosenCorrectAnswer ? wrongColor : isOptionSelected && selectedColor) : isOptionSelected && selectedColor}`}
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
              <Button
                onClick={() => handleNextQuestion(-1)}
                disabled={questionIndex === 0}
              >
                Previous
              </Button>
              <Button
                onClick={() => handleNextQuestion(1)}
                disabled={questionIndex + 1 === questions.data.length}
              >
                Next
              </Button>
            </div>
          </div>
          {/* the lower question navigation pane  */}
          <div className="flex flex-wrap justify-between gap-3 rounded-xl bg-background p-4 shadow-xl md:p-10 ">
            {questions.data.map((num, index) => {
              const isOptionCorrect = currentOption === currentAnswer;
              const isOptionSelected = options.filter(
                (opt) => opt.num === index + 1,
              )[0].answer;

              return (
                <button
                  key={index}
                  // className={`h-10 w-10 rounded-md text-sm  ${isSubmitted ? test && sub && (correctSelectedOption ? "bg-green-500 text-white" : "bg-red-500 text-white") : test ? (test[index + 1] ? "bg-primary" : index === questionIndex ? "bg-slate-400" : "bg-slate-200") : index === questionIndex ? "bg-slate-400" : "bg-slate-200"} `}
                  className={`hover: rounded-md px-4 py-2 text-left ${isSubmitted ? (isOptionCorrect ? correctColor : wrongColor) : isOptionSelected && selectedColor}`}
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
        <button className="rounded-md bg-primary px-4 py-2 text-background ">
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
