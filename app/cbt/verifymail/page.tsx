"use client";

import { useSelector } from "react-redux";
import { Rootstate } from "../../GlobalRedux/store";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Result() {
  return (
    <section className="text-center">
      <div className="col-span-6 mb-8 ">
        <h1>Hi there</h1>
        <p>
          A verification link has been sent to your email address, kindly verify
          your Email to continue
        </p>
      </div>
      <div className="col-span-6 flex items-center justify-center ">
        <Image
          src="/slider.svg"
          alt="writing exam"
          width={200}
          height={200}
          className="hiddenw w-full max-w-[20rem] object-cover object-right md:inline"
          priority
        />
      </div>
    </section>
  );
}
