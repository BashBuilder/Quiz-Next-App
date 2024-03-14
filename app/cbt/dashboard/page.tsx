"use client";
import { Rootstate } from "@/app/GlobalRedux/store";
import { db } from "@/lib/config";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const [databaseResults, setDatabaseResults] = useState([]);
  const userAuthReducer = useSelector((state: Rootstate) => state.auth);
  const isSubmitted = useSelector(
    (state: Rootstate) => state.answer.isSubmitted,
  );
  const { trials, userEmail } = userAuthReducer;

  useEffect(() => {
    const suscribe = async () => {
      try {
        const userScore = collection(db, "userScore");
        let allUsersScores: any = [];
        const snapshot = await getDocs(userScore);
        snapshot.forEach((doc) => allUsersScores.push({ data: doc.data() }));
        const databaseScore = allUsersScores.filter(
          (dbUser: any) => dbUser.data.userEmail === userEmail,
        );
        console.log("email", userEmail);
        console.log(databaseScore);
        setDatabaseResults(databaseScore);
      } catch (error) {
        console.log(error);
      }
    };
    suscribe();
    // eslint-disable-next-line
  }, [userEmail]);
  // useLayoutEffect(() => {
  //   const suscribe = async () => {
  //     const userScore = collection(db, "userscore");
  //     let allUsersScores: any = [];
  //     const snapshot = await getDocs(userScore);
  //     snapshot.forEach((doc) =>
  //       allUsersScores.push({ id: doc.id, data: doc.data() }),
  //     );
  //     const databaseScore = allUsersScores.filter(
  //       (dbUser: any) => dbUser.data.userEmail === userEmail,
  //     );
  //     setDatabaseResults(databaseScore);
  //   };
  //   suscribe();
  //   // eslint-disable-next-line
  // }, [isSubmitted, userEmail]);
  return (
    <div>
      <section className="grid pt-4 md:grid-cols-12">
        <div className="col-span-6  ">
          <h2 className="mb-6 text-4xl text-green-950">
            Welcome to Your Dashboard
          </h2>
          <p className="my-4 flex justify-between rounded-sm bg-red-500 px-4 py-2 text-2xl capitalize text-white ">
            <span>Numbers of Trials Left </span> <span>{trials} </span>
          </p>
          <div>
            {databaseResults.length === 0 ? (
              <div>
                <p>
                  You have no previous performance, click below to take a test
                </p>
                <div className="mt-10">
                  <Link
                    href="/cbt/examform"
                    className="rounded-md bg-red-500 px-4 py-2 text-white hover:opacity-80"
                  >
                    Take exam
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <h5>Your Previous Performance</h5>

                {databaseResults.map((result: any, index) => (
                  <div key={index}>
                    <p className="my-4 flex justify-between rounded-sm bg-green-500 px-4 py-2 text-2xl capitalize text-white ">
                      <span>Exam {index + 1} </span>
                      <span>{result.data.score}/400</span>
                    </p>
                  </div>
                ))}
                <div className="mt-10">
                  <Link
                    href="/cbt/examform"
                    className="rounded-md bg-red-500 px-4 py-2 text-white hover:opacity-80"
                  >
                    Take another exam
                  </Link>
                </div>
              </div>
            )}
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
