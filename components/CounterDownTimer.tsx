"use client";

import { Rootstate } from "@/app/GlobalRedux/store";
import { useSelector } from "react-redux";

export default function CounterDownTimer() {
  const timer = useSelector((state: Rootstate) => state.timer);
  const { hours, minutes, seconds } = timer;

  return (
    <article className=" absolute right-4 top-20 mb-4  flex items-center justify-end gap-1 md:right-[12%]">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
        <h6>{hours}</h6>
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
        <h6>{minutes}</h6>
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
        <h6>{seconds}</h6>
      </div>
    </article>
  );
}
