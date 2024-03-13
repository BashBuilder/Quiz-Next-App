"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useEffect, useLayoutEffect, useState } from "react";
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

export function useAuth() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const userAuthReducer = useSelector((state: Rootstate) => state.auth);
  const { userAuth, userEmail, trials, databaseID } = userAuthReducer;

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  let useraaaa;

  useLayoutEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // eslint-disable-next-line
        useraaaa = user;
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

  useLayoutEffect(() => {
    suscribe();
    console.log(sessionStatus);
    console.log(isEmailVerified);
  }, []);

  return useraaaa;
}
