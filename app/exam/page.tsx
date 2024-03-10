"use client";

import CounterDownTimer from "@/components/CounterDownTimer";
import ExamCard from "@/components/ExamCard";
import SubmitModal from "@/components/SubmitModal";
import Image from "next/image";
import { useState } from "react";

export default function Exam() {
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  return (
    <section className="relative flex min-h-screen flex-col gap-4 bg-slate-900 py-3 md:py-6 ">
      <SubmitModal
        isSubmitModalOpen={isSubmitModalOpen}
        setIsSubmitModalOpen={setIsSubmitModalOpen}
      />
      <Image
        src="/img/jamb.png"
        alt="jamb"
        width={200}
        height={200}
        className="mx-auto w-2/5 min-w-20 max-w-32 rounded-xl bg-background "
        priority
      />
      <div className="mx-auto flex w-[90vw] max-w-5xl flex-col">
        <CounterDownTimer />
        <button
          // onClick={() => dispatch(submitAnswer(""))}
          onClick={() => setIsSubmitModalOpen(true)}
          className="mx-auto rounded-md bg-primary px-4 py-2 text-background hover:opacity-80 "
        >
          Submit
        </button>
      </div>
      {/* )} */}

      {/* exam section */}
      <ExamCard />
    </section>
  );
}
