"use client";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitAnswer } from "@/app/GlobalRedux/Features/answerSlice";
import { endExam } from "@/app/GlobalRedux/Features/timerSlice";
import { useRouter } from "next/navigation";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/config";
import { Rootstate } from "@/app/GlobalRedux/store";

interface SubmitModalProps {
  isSubmitModalOpen: boolean;
  setIsSubmitModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SubmitModal({
  isSubmitModalOpen,
  setIsSubmitModalOpen,
}: SubmitModalProps) {
  const userAnswerReducer = useSelector((state: Rootstate) => state.answer);
  const userAuthReducer = useSelector((state: Rootstate) => state.auth);
  const { subjectScore, score } = userAnswerReducer;
  const { userEmail } = userAuthReducer;

  const dispatch = useDispatch();
  const router = useRouter();

  const submitQuestions = async () => {
    try {
      router.replace("/cbt/result");
      dispatch(endExam());
      dispatch(submitAnswer());
      setIsSubmitModalOpen((prev) => !prev);
      const uploadData = { subjectScore, score, userEmail };
      const userScore = collection(db, "userScore");
      await addDoc(userScore, uploadData);
    } catch (error) {
      console.log("The submit error is : ", error);
    }
  };

  return (
    <article
      className={`fixed inset-0 z-50 flex  items-center justify-center overflow-hidden bg-slate-700 bg-opacity-50 transition-all duration-300 ${isSubmitModalOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <div className="relative mx-auto flex min-h-96 w-[90vw]  max-w-3xl flex-col items-center justify-center gap-10 rounded-xl bg-background p-10 text-center">
        <button
          className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-background shadow-sm hover:opacity-90 hover:shadow-2xl "
          onClick={() => setIsSubmitModalOpen(false)}
        >
          <X className="font-bold text-red-600 " size={30} />
        </button>
        <h2>Are you sure you want to submit?</h2>
        <Button onClick={submitQuestions}>Submit</Button>
      </div>
    </article>
  );
}
