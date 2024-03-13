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
import {
  getUserTrials,
  setUserAuthentication,
} from "@/app/GlobalRedux/Features/authSlice";
import { collection, getDocs } from "firebase/firestore";
import { isEmailVerified, sessionStatus, suscribe } from "@/util/session";

export default function Navbar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const userAuthReducer = useSelector((state: Rootstate) => state.auth);
  const { userAuth, userEmail, trials, databaseID } = userAuthReducer;

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  useLayoutEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("is email verified", user.emailVerified);
        dispatch(
          setUserAuthentication({
            token: user.refreshToken,
            email: user.email,
            isEmailVerified: user.emailVerified,
          }),
        );
        const getTrials = async () => {
          const usersDb = collection(db, "users");
          let allUsersEmail: any = [];
          const snapshot = await getDocs(usersDb);
          snapshot.forEach((doc) =>
            allUsersEmail.push({ id: doc.id, data: doc.data() }),
          );
          const userId = allUsersEmail.filter(
            (dbUser: any) => dbUser.data.userEmail === user.email,
          )[0];
          dispatch(
            getUserTrials({
              databaseID: userId.id,
              trials: userId.data.trials,
            }),
          );
        };
        getTrials();
        if (user.emailVerified) {
          router.replace("/cbt/verifymail");
        }
        if (pathname.includes("auth")) {
          router.replace("/cbt/examform");
        }
      } else {
        dispatch(
          setUserAuthentication({
            token: "",
            email: "",
          }),
        );
        router.replace("/cbt/auth");
      }
    });
    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

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
      {pathname === "/cbt/exam" ? (
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
