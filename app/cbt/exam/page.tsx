"use client";

import ExamCard from "@/components/ExamCard";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function Exam() {
  const router = useRouter();

  useLayoutEffect(() => {
    const examStatusJson = localStorage.getItem("examTime");
    const examStatus = examStatusJson ? JSON.parse(examStatusJson) : null;

    const examSubmittedJson = localStorage.getItem("examSubmitted");
    const examSubmitted = examSubmittedJson && JSON.parse(examSubmittedJson);

    const isExamStarted = examStatus.isExamStarted;
    const isSubmitted = examSubmitted.isSubmitted;
    if (!isExamStarted && !isSubmitted) {
      router.replace("/cbt/dashboard");
    }
    // eslint-disable-next-line
  }, []);

  return <ExamCard />;
}
