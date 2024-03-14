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
import Image from "next/image";
import { endExam, setTimerTime } from "@/app/GlobalRedux/Features/timerSlice";

export default function ExamCard() {
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState<Questions | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState<string>("english");

  const allQuestions = useSelector((state: Rootstate) => state.questions);
  const reducerAnswer = useSelector((state: Rootstate) => state.answer);

  const { answers, selectedOptions, isSubmitted } = reducerAnswer;

  // fetch questions from local storage
  useEffect(() => {
    const allQuestionJson = localStorage.getItem("allQuestions");
    const allQuestionReload = allQuestionJson && JSON.parse(allQuestionJson);

    console.log(allQuestionReload);

    const examSubmittedJson = localStorage.getItem("examSubmitted");
    const examSubmitted = examSubmittedJson && JSON.parse(examSubmittedJson);

    dispatch(fetchQuestions(allQuestionReload));
    setQuestions(allQuestionReload[0]);

    let subjects: string[] = [];
    allQuestionReload.forEach((question: any) =>
      subjects.push(question.subject),
    );
    dispatch(
      getAnswers({
        allQuestionReload,
        subjects,
        isSubmitted: examSubmitted.isSubmitted,
        selectedOptions: examSubmitted.selectedOptions,
      }),
    );

    // timer use effect
    if (!examSubmitted.isSubmitted) {
      const timerJson = localStorage.getItem("examTime");
      if (timerJson) {
        const reloadTimer: { duration: number; isExamStarted: boolean } =
          JSON.parse(timerJson);
        dispatch(setTimerTime(reloadTimer.duration));
      }
    } else {
      dispatch(endExam());
    }
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

    let q;
    let currentQuestion;
    for (let i = 0; i < questions.data.length; i++) {
      if (questions.data[i].questionNub == questionIndex) q = questions.data[i];
    }

    if (q) {
      currentQuestion = q;
    } else {
      currentQuestion = questions.data[questionIndex];
    }

    const { option, question, image: questionImage } = currentQuestion;
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
      <section className="mt-28 flex flex-col gap-4 ">
        {/* the subject panel */}
        <div className="mx-auto flex w-[90vw] max-w-5xl flex-col ">
          <div className="mb-4 flex flex-wrap gap-2 ">
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
                  {currentQuestion.section && (
                    <p
                      className=" text-xl font-bold first-letter:capitalize "
                      dangerouslySetInnerHTML={{
                        __html: currentQuestion.section,
                      }}
                    />
                  )}
                  <div className="flex  gap-1 ">
                    <p className="text-xl">{currentNum}.</p>
                    {question && (
                      <p
                        className="text-xl"
                        dangerouslySetInnerHTML={{ __html: question }}
                      />
                    )}
                    {questionImage && (
                      <Image src={`${questionImage}`} alt="question image" />
                    )}
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
                          className={`hover: rounded-md px-4 py-2 text-left ${isSubmitted ? (isOptionCorrect ? correctColor : isNonChosenCorrectAnswer ? wrongColor : isOptionSelected && selectedColor) : isOptionSelected ? selectedColor : "bg-slate-50 hover:bg-slate-200"}`}
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
                variant="secondary"
              >
                Previous
              </Button>
              <Button
                onClick={() => handleNextQuestion(1)}
                disabled={questionIndex + 1 === questions.data.length}
                variant="secondary"
              >
                Next
              </Button>
            </div>
          </div>
          {/* the lower question navigation pane  */}
          <div className=" flex flex-wrap justify-center gap-4 rounded-xl bg-background px-4 py-4 shadow-xl md:p-10 md:px-8 ">
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
                  className={`w-10 rounded-md px-0 py-2 text-center ${isSubmitted ? (isOptionCorrect ? correctColor : wrongColor) : isOptionSelected ? selectedColor : isCurrentQuestion ? "bg-slate-400 text-white" : "bg-slate-100"}`}
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
      <div className="flex min-h-96 items-center justify-center py-10 md:py-20 ">
        <button className="rounded-md bg-primary px-4 py-2 text-background ">
          <Loader2Icon className="animate-spin" />
        </button>
      </div>
    );
  }
}
