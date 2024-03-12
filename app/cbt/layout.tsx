"use client";

import { Josefin_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import { useSelector } from "react-redux";
import { Rootstate } from "../GlobalRedux/store";

const josefin = Josefin_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userAuthReducer = useSelector((state: Rootstate) => state.auth);
  const { isAuthLoading } = userAuthReducer;
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
