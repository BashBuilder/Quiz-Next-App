"use client";

import { useSelector } from "react-redux";
import { Rootstate } from "../GlobalRedux/store";
import Navbar from "@/components/Navbar";
import { Fragment } from "react";
import Image from "next/image";

export default function Result() {
  const answerSliceData = useSelector((state: Rootstate) => state.answer);

  const { subjectScore, score } = answerSliceData;

  return (
    <Fragment>
      <Navbar />
      <section className="grid grid-cols-12">
        <div className="col-span-6  ">
          <h2>Here is your performance</h2>
          {subjectScore.map((suj, index) => (
            <p key={index}>
              {suj.subject} : {suj.score}
            </p>
          ))}
          <h3>Total : {score} </h3>
        </div>
        <div className="col-span-6 flex items-center justify-center ">
          <Image
            src="/slider.svg"
            alt="writing exam"
            width={200}
            height={200}
            className="hiddenw w-full max-w-[28rem] object-cover object-right md:inline"
            priority
          />
        </div>
      </section>
    </Fragment>
  );
}
