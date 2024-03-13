"use client";
import { Josefin_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
const josefin = Josefin_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={josefin.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
