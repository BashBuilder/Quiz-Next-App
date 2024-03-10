"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";
import SubmitModal from "./SubmitModal";
import CounterDownTimer from "./CounterDownTimer";
import { User2Icon } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  return (
    <nav className="fixed top-0 flex w-screen justify-between bg-primary px-10 pb-4 pt-2 shadow-sm ">
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
          <ul className="max-w-smd flex w-2/5 items-center justify-between font-semibold text-white">
            <li className="relative transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:rounded-md after:bg-white after:duration-300 hover:text-slate-200 hover:after:w-full ">
              <Link href="/">Home</Link>
            </li>
            <li className="relative transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:rounded-md after:bg-white after:duration-300 hover:text-slate-200 hover:after:w-full ">
              <Link href="/">Dashboard</Link>
            </li>
            <li className="relative transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:rounded-md after:bg-white after:duration-300 hover:text-slate-200 hover:after:w-full ">
              <Link href="/">Exam</Link>
            </li>
          </ul>
          <button className="my-auto flex items-center gap-2 border-2 border-white text-white duration-300  hover:border-green-400  hover:bg-green-400 ">
            <User2Icon /> <span>Timmy</span>
          </button>
        </Fragment>
      )}
    </nav>
  );
}
