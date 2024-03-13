"use client";
import { Rootstate } from "@/app/GlobalRedux/store";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const userAuthReducer = useSelector((state: Rootstate) => state.auth);

  const { trials } = userAuthReducer;

  return (
    <div>
      <section className="grid pt-16 md:grid-cols-12">
        <div className="col-span-6  ">
          <h2 className="mb-6 text-4xl text-green-950">
            Welcome to Your Dashboard
          </h2>
          <p className="my-4 flex justify-between rounded-sm bg-red-500 px-4 py-2 text-2xl capitalize text-white ">
            <span>Numbers of Trials Left </span> <span>{trials} </span>
          </p>
          <div>
            <h5>Your Previous Performance</h5>
            <p className="my-4 flex justify-between rounded-sm bg-green-500 px-4 py-2 text-2xl capitalize text-white ">
              <span>Numbers of Trials Left </span> <span>O</span>
            </p>
          </div>
        </div>
        <div className="col-span-6">
          <Image
            src="/img/wave.png"
            alt="wave"
            width={2200}
            height={2200}
            className="w-full"
          />
        </div>
      </section>
    </div>
  );
}
