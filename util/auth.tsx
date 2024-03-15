"use client";
import { usePathname, useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/config";
import { useDispatch } from "react-redux";
import {
  getUserTrials,
  setUserAuthentication,
} from "@/app/GlobalRedux/Features/authSlice";
import { collection, getDocs } from "firebase/firestore";

export function useAuth() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

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
        console.log("route Protected");
        router.replace("/cbt/auth");
      }
    });
    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  return {};
}
