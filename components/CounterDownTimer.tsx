"use client";

import { Rootstate } from "@/app/GlobalRedux/store";
import { Calculator } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import ExamCalculator from "./ExamCalculator";
import { useEffect, useState } from "react";
import { setTimerTime } from "@/app/GlobalRedux/Features/timerSlice";

interface ExamTimer {
  seconds: number;
  minutes: number;
  hours: number;
}

export default function CounterDownTimer() {
  const [examTime, setExamTime] = useState<ExamTimer>({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });
  const timer = useSelector((state: Rootstate) => state.timer);
  const [isCalculatorShown, setIsCalculatorShown] = useState(false);
  const dispatch = useDispatch();
  const { duration, isExamStarted } = timer;

  const startTimer = (duration: number) => {
    let examTime: { time: number; isExamStarted: boolean } = {
      time: 0,
      isExamStarted: true,
    };
    const endTime = new Date().getTime() + duration * 1000;
    const calculateTimeRemaining = () => {
      const currentTime = new Date().getTime();
      const timeRemaining = endTime - currentTime;
      if (timeRemaining <= 0) {
        examTime = {
          time: 0,
          isExamStarted: false,
        };
        clearInterval(countdown);
        localStorage.setItem("examTime", JSON.stringify(examTime));
      } else {
        const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
        const seconds = Math.floor((timeRemaining / 1000) % 60);
        setExamTime((prevTime) => ({ ...prevTime, minutes, seconds, hours }));
        examTime = {
          time: timeRemaining / 1000,
          isExamStarted: true,
        };
        localStorage.setItem("examTime", JSON.stringify(examTime));
      }
    };
    const countdown = setInterval(() => {
      calculateTimeRemaining();
    }, 1000);
  };

  useEffect(() => {
    if (isExamStarted) {
      startTimer(duration);
    }
    // eslint-disable-next-line
  }, [isExamStarted]);

  useEffect(() => {
    const timerJson = localStorage.getItem("examTime");
    if (timerJson) {
      const reloadTimer: { time: number; isExamStarted: boolean } =
        JSON.parse(timerJson);
      startTimer(reloadTimer.time);
      dispatch(setTimerTime(reloadTimer.time));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <article className=" absolute right-4 top-20 mb-4  flex items-center justify-end gap-1 md:right-[12%]">
      <ExamCalculator isCalculatorShown={isCalculatorShown} />

      <Button
        className="mr-5"
        variant="outline"
        onClick={() => setIsCalculatorShown((shownState) => !shownState)}
      >
        <Calculator />
      </Button>
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
        <h6>{examTime.hours}</h6>
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
        <h6>{examTime.minutes}</h6>
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
        <h6>{examTime.seconds}</h6>
      </div>
    </article>
  );
}
