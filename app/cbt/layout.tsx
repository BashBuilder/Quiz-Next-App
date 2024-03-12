"use client";

import { Josefin_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../GlobalRedux/store";
import { useEffect } from "react";
import {
  setAuthLoading,
  setUserAuthentication,
} from "../GlobalRedux/Features/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/config";
import { usePathname, useRouter } from "next/navigation";

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
  const { isAuthLoading, userAuth } = userAuthReducer;
  useEffect(() => {
    dispatch(setAuthLoading(true));
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("is email verified", user.emailVerified);
        dispatch(
          setUserAuthentication({
            token: user.refreshToken,
            email: user.email,
          }),
        );
      } else {
        dispatch(
          setUserAuthentication({
            token: "",
            email: "",
          }),
        );
      }
      if (!userAuth) {
        router.push("/cbt/auth");
      } else if (pathname.includes("auth") && userAuth) {
        router.push("/cbt/examform");
      }
      dispatch(setAuthLoading(false));
    });
    // Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   dispatch(setAuthLoading(true)); // Start loading
  //   console.log(pathname);
  //   if (!userAuth) {
  //     router.push("/cbt/auth");
  //     dispatch(setAuthLoading(false)); // Stop loading after redirect
  //   } else if (pathname.includes("auth") && userAuth) {
  //     router.push("/cbt/examform");
  //     dispatch(setAuthLoading(false)); // Stop loading after redirect
  //   }
  //   // If there's no redirect, stop loading as well
  //   dispatch(setAuthLoading(false));
  //   // eslint-disable-next-line
  // }, [pathname]);

  useEffect(() => {
    dispatch(setAuthLoading(true)); // Start loading

    // Perform the redirect only if the loading is complete
    if (!isAuthLoading) {
      if (!userAuth) {
        router.push("/cbt/auth");
      } else if (pathname.includes("auth") && userAuth) {
        router.push("/cbt/examform");
      }
    }

    // Stop loading after potential redirect
    dispatch(setAuthLoading(false));

    // eslint-disable-next-line
  }, [pathname, isAuthLoading]);

  return (
    <html lang="en">
      <body className={josefin.className}>
        {!isAuthLoading && (
          <div>
            <Navbar />
            {children}
          </div>
        )}
      </body>
    </html>
  );
}
