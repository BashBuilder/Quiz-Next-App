"use client";

import { useSelector } from "react-redux";
import { Rootstate } from "../../GlobalRedux/store";
import Navbar from "@/components/Navbar";
import { Fragment } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Result() {
  const answerSliceData = useSelector((state: Rootstate) => state.answer);

  const { subjectScore, score } = answerSliceData;

  return (
    <section className="grid  md:grid-cols-12">
      <div className="col-span-6  ">
        <h2 className="mb-6 text-4xl text-green-950">
          Here is your performance
        </h2>
        {subjectScore.map((suj, index) => (
          <p
            key={index}
            className="my-4 flex justify-between rounded-sm bg-green-500 px-4 py-2 text-2xl capitalize "
          >
            <span>{suj.subject} </span> <span>{suj.score}</span>
          </p>
        ))}
        <p className="my-4 flex justify-between  rounded-sm bg-green-800 px-4 py-2 text-2xl text-white ">
          <span>Total </span> <span> {score}</span>
        </p>
        <div className="my-10 flex gap-10">
          <Link
            href="/cbt/exam"
            className="rounded-md bg-red-500 px-4 py-2 text-white"
          >
            Check Solution
          </Link>
          <Button>Try Again</Button>
        </div>
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
  );
}
