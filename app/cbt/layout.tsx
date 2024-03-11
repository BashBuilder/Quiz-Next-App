import type { Metadata } from "next";
import { Inter, Josefin_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });
const josefin = Josefin_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jamb Mock Cbt",
  description: "Exam To get you ready for JAMB",
};

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
