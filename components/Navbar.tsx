"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import SubmitModal from "./SubmitModal";
import CounterDownTimer from "./CounterDownTimer";
import { LogIn, User2Icon } from "lucide-react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "@/lib/config";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "@/app/GlobalRedux/store";

import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "@/util/auth";

export default function Navbar() {
  const pathname = usePathname();
  const userAuthReducer = useSelector((state: Rootstate) => state.auth);
  const userAnswerReducer = useSelector((state: Rootstate) => state.answer);
  const { userAuth, userEmail } = userAuthReducer;
  const { isSubmitted } = userAnswerReducer;

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  useAuth();

  return (
    <nav className="fixed top-0 z-10 flex w-screen justify-between bg-primary px-10 pb-4 pt-2 shadow-sm ">
      <SubmitModal
        isSubmitModalOpen={isSubmitModalOpen}
        setIsSubmitModalOpen={setIsSubmitModalOpen}
      />
      <div>
        <Image
          src="/img/jamblogo.png"
          alt="jamb"
          width={200}
          height={200}
          className="w-1/5 min-w-16 max-w-16"
          priority
        />
      </div>
      {pathname === "/cbt/exam" && !isSubmitted ? (
        <div className="flex w-[90vw] items-center">
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="mx-auto rounded-md bg-white px-4 py-2 text-primary hover:opacity-80 "
          >
            Submit
          </button>
          <CounterDownTimer />
        </div>
      ) : (
        <Fragment>
          <ul className="max-w-smd flex w-2/5 items-center justify-between font-semibold text-white">
            <li className="relative transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:rounded-md after:bg-white after:duration-300 hover:text-slate-200 hover:after:w-full ">
              <Link href="/">Home</Link>
            </li>
            <li className="relative transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:rounded-md after:bg-white after:duration-300 hover:text-slate-200 hover:after:w-full ">
              <Link href="/cbt/dashboard">Dashboard</Link>
            </li>
            <li className="relative transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:rounded-md after:bg-white after:duration-300 hover:text-slate-200 hover:after:w-full ">
              <Link href="/cbt/examform">Exam</Link>
            </li>
          </ul>
          {userAuth ? (
            <button
              onClick={() => signOut(auth)}
              className="my-auto flex items-center gap-2 border-2 border-white text-white duration-300  hover:border-green-400  hover:bg-green-400 "
            >
              <User2Icon /> <span> {userEmail}</span>
            </button>
          ) : (
            <button className="my-auto flex items-center gap-2 border-2 border-white text-white duration-300  hover:border-green-400  hover:bg-green-400 ">
              <span>Sign Up</span> <LogIn />
            </button>
          )}
        </Fragment>
      )}
    </nav>
  );
}
