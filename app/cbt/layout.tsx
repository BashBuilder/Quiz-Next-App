"use client";

import { Josefin_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../GlobalRedux/store";
import { useLayoutEffect } from "react";
import {
  setAuthLoading,
  setUserAuthentication,
} from "../GlobalRedux/Features/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/config";
import { usePathname, useRouter, redirect } from "next/navigation";

const josefin = Josefin_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const userAuthReducer = useSelector((state: Rootstate) => state.auth);
  // const { isAuthLoading, userAuth, isEmailVerified } = userAuthReducer;
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
        if (!user.emailVerified) {
          router.replace("/cbt/invalidemail");
        } else if (pathname.includes("auth")) {
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
    <html lang="en">
      <body className={josefin.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
