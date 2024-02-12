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
  submitAnswer,
  updateAnswers,
} from "@/app/GlobalRedux/Features/answerSlice";
import { Button } from "./ui/button";
import { startTimer } from "@/app/GlobalRedux/Features/timerSlice";
import Image from "next/image";

export default function ExamCard() {
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState<Questions | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState<string>("english");

  const allQuestions = useSelector((state: Rootstate) => state.questions);
  const reducerAnswer = useSelector((state: Rootstate) => state.answer);
  const timer = useSelector((state: Rootstate) => state.timer);

  const { answers, selectedOptions, isSubmitted, score } = reducerAnswer;
  const { hours, minutes, seconds } = timer;

  // fetch questions from local storage
  useEffect(() => {
    const q = localStorage.getItem("allQuestions");
    const t = q ? JSON.parse(q) : null;
    dispatch(fetchQuestions(t));
    setQuestions(t[0]);
    dispatch(getAnswers(t));
    // eslint-disable-next-line
  }, []);

  //defining some navigation methods
  const handleNextQuestion = (num: number) =>
    setQuestionIndex((prevIndex) => prevIndex + num);
  const handleRandomQuestion = (index: number) => setQuestionIndex(index);

  // switch between questions
  useEffect(() => {
    const newQuestions = allQuestions?.filter(
      (questions) => questions.subject === selectedSubject,
    )[0];
    newQuestions && setQuestions(newQuestions);
    setQuestionIndex(0);
    // eslint-disable-next-line
  }, [selectedSubject]);

  if (questions && allQuestions) {
    const selectedColor = "bg-slate-700 text-white";
    const correctColor = "bg-green-500 text-white";
    const wrongColor = "bg-red-500 text-white";

    const currentQuestion = questions.data[questionIndex];
    const { option, question } = currentQuestion;
    const { subject } = questions;

    const currentNum: number = questionIndex + 1;
    const options: Solution[] = selectedOptions.filter(
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
        <Image
          src="/img/jamb.png"
          alt="jamb"
          width={200}
          height={200}
          className="mx-auto w-32"
          priority
        />
        <h4 className=" py-2 text-center"> JAMB CBT MOCK </h4>
        {isSubmitted ? (
          <div>
            <h2 className="text-center">{score}</h2>
          </div>
        ) : (
          <div className="mx-auto flex w-[90vw] max-w-5xl flex-col">
            <div className="mb-4 flex items-center justify-end gap-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
                <h6>{hours}</h6>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
                <h6>{minutes}</h6>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
                <h6>{seconds}</h6>
              </div>
            </div>
            <button
              onClick={() => dispatch(submitAnswer(""))}
              className="mx-auto rounded-md bg-primary px-4 py-2 text-background "
            >
              Submit
            </button>
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
                    <p className="text-xl">{currentNum}.</p>
                    <p
                      className="text-xl"
                      dangerouslySetInnerHTML={{ __html: question }}
                    />
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    {Object.keys(option).map((opt: string, index) => {
                      const isOptionSelected = currentOption === opt;
                      const isOptionCorrect =
                        currentAnswer === currentOption && isOptionSelected;
                      const isNonChosenCorrectAnswer = currentAnswer === opt;
                      return (
                        <button
                          key={index}
                          className={`hover: rounded-md px-4 py-2 text-left ${isSubmitted ? (isOptionCorrect ? correctColor : isNonChosenCorrectAnswer ? wrongColor : isOptionSelected && selectedColor) : isOptionSelected && selectedColor}`}
                          onClick={() =>
                            dispatch(
                              updateAnswers({
                                answer: opt,
                                num: qIndex + 1,
                                subject,
                              }),
                            )
                          }
                          disabled={isSubmitted}
                        >
                          <span dangerouslySetInnerHTML={{ __html: opt }} />
                          <span className="pr-4">.</span>
                          <span
                            // @ts-ignore
                            dangerouslySetInnerHTML={{ __html: option[opt] }}
                          />
                          {/* <span className="pr-4">{opt}.</span> */}
                          {/* @ts-ignore */}
                          {/* {option[opt]} */}
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
                variant="ghost"
              >
                Previous
              </Button>
              <Button
                onClick={() => handleNextQuestion(1)}
                disabled={questionIndex + 1 === questions.data.length}
                variant="ghost"
              >
                Next
              </Button>
            </div>
          </div>
          {/* the lower question navigation pane  */}
          <div className="flex flex-wrap justify-between gap-3 rounded-xl bg-background p-4 shadow-xl md:p-10 ">
            {questions.data.map((num, index) => {
              const isCurrentQuestion = index + 1 === currentNum;
              const currentOpt = options.filter(
                (option) => option.num === index + 1,
              )[0].answer;
              const currentAns = subjectAnswers.filter(
                (answer) => answer.num === index + 1,
              )[0].answer;
              const isOptionSelected = options.filter(
                (opt) => opt.num === index + 1,
              )[0].answer;
              const isOptionCorrect = currentOpt === currentAns;
              return (
                <button
                  key={index}
                  className={`hover: rounded-md px-4 py-2 text-left ${isSubmitted ? (isOptionCorrect ? correctColor : wrongColor) : isOptionSelected ? selectedColor : isCurrentQuestion ? "bg-slate-700 text-white" : "bg-slate-200"}`}
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
          <Loader2Icon className="animate-spin" />
        </button>
      </div>
    );
  }
}
