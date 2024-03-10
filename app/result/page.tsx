"use client";

import { useSelector } from "react-redux";
import { Rootstate } from "../GlobalRedux/store";
import Image from "next/image";

export default function Result() {
  const answerSliceData = useSelector((state: Rootstate) => state.answer);

  const { subjectScore, score } = answerSliceData;

  return (
    <section className="grid grid-cols-12 p-20 ">
      <div className="col-span-6  ">
        <h2>Here is your performance</h2>
        {subjectScore.map((suj, index) => (
          <p key={index}>
            {suj.subject} : {suj.score}
          </p>
        ))}
        <h3>Total : {score} </h3>
      </div>
      <div className="col-span-6">
        <Image
          src="/img/closeup.png"
          alt="writing exam"
          width={200}
          height={200}
          className="hidden h-full min-h-[38rem]  min-w-96 object-cover object-right md:inline"
          priority
        />
      </div>
    </section>
  );
}
