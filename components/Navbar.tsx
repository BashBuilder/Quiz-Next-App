"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";
import SubmitModal from "./SubmitModal";
import CounterDownTimer from "./CounterDownTimer";

export default function Navbar() {
  const pathname = usePathname();

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  return (
    <nav className="fixed top-0 flex w-screen justify-between bg-primary px-10 py-2 shadow-sm ">
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
          className="w-1/5 min-w-20 max-w-32  "
          priority
        />
      </div>
      {pathname === "/exam" ? (
        <div className="flex w-[90vw] items-center">
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="mx-auto rounded-md bg-white px-4 py-2 text-primary hover:opacity-80 "
          >
            Submit
          </button>
          <CounterDownTimer />
          {/* </div> */}
        </div>
      ) : (
        <Fragment>
          <ul className="max-w-s flex w-2/5 items-center justify-between font-semibold text-white">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/">Dashboard</Link>
            </li>
            <li>
              <Link href="/">Exam</Link>
            </li>
          </ul>
          <div className="my-auto">
            <p>Logout</p>
          </div>
        </Fragment>
      )}
    </nav>
  );
}
