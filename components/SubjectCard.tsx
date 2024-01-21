"use client";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";

export default function SelectSubject() {
  const [questions, setquestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(1);

  async function getQuestions() {
    try {
      const response = await fetch(
        "https://questions.aloc.com.ng/api/v2/m/1?subject=chemistry",
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
      // @ts-ignore
      questions.push({ ...data.data[0], subject: data.subject });
    } catch (error) {
      console.log("The error from fetching is ", error);
    }
  }
  useEffect(() => {
    getQuestions();
    // eslint-disable-next-line
  }, []);

  console.log(questions);

  if (questions.length !== 0) {
    // @ts-ignore
    const { subject, option, question } = questions[0];
    console.log(option);
    return (
      <section className="flex min-h-screen flex-col items-center gap-4 py-10 md:py-20 ">
        {/* the subject panel */}
        {/* <h5 className="text-right ">Time remaining : 2 min</h5> */}
        <h3 className="capitalize"> {subject} </h3>
        <div className="flex w-4/5 max-w-5xl flex-col gap-4 md:gap-10">
          {/* the top question section */}
          <div className=" flex flex-col gap-4 rounded-xl bg-background p-4 shadow-xl md:px-20 md:py-10 ">
            <article className="flex flex-col gap-4 ">
              <div className="flex gap-1">
                <p className="text-xl">1.</p>
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
              <button className="rounded-md bg-slate-200 px-4 py-2 font-bold text-slate-700 hover:shadow-md">
                Previous
              </button>
              <button className="rounded-md bg-slate-200 px-4 py-2 font-bold text-slate-700 hover:shadow-md">
                Next
              </button>
            </div>
          </div>

          {/* the lower question navigation pane  */}
          <div className="flex flex-wrap justify-between gap-3 rounded-xl bg-background p-4 shadow-xl md:p-10 ">
            {questions.map((num, index) => (
              <button
                key={index}
                className="h-10 w-10 rounded-md bg-primary text-sm text-primary-foreground"
              >
                {index}
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center py-10 md:py-20 ">
      <p className="animate-spin">
        <Loader2Icon />
      </p>
    </div>
  );
}
