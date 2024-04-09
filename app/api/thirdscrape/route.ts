import { NextResponse } from "next/server";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/config";
import { QuestionData } from "@/app/GlobalRedux/Features/questionSlice";
import { addEng } from "@/util/addEng";

export async function GET() {
  try {
    const token = "ALOC-caa562dfeb1a7de83a69";
    const subject = "english";
    const year = 2017;

    const url = `https://questions.aloc.com.ng/api/v2/m/60?subject=${subject}&year=${year}`;
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        AccessToken: token,
      },
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const questions: QuestionData[] = data.data;
    const sortedQuetion = questions.sort(
      (a, b) => a.questionNub - b.questionNub,
    );
    console.log(sortedQuetion);
    console.log(sortedQuetion.length);
    const firestoreQuestion = collection(db, "englishQuestions");
    // await addDoc(firestoreQuestion, { data: sortedQuetion, year });
    return NextResponse.json(sortedQuetion);
  } catch (error) {
    return NextResponse.json({ error: "error occured" });
  }

  // try {
  //   const englishQuestion = collection(db, "englishQuestions");
  //   const snapShot = await getDocs(englishQuestion);
  //   const emptyList: QuestionData[] = [];
  //   emptyList.push(...addEng);
  //   snapShot.forEach((doc) => emptyList.push(...doc.data().data));
  //   const sortedList = emptyList.sort((a, b) => a.questionNub - b.questionNub);
  //   await addDoc(englishQuestion, { data: sortedList });
  //   console.log(sortedList);
  //   return NextResponse.json({ data: sortedList });
  // } catch (error) {
  //   console.log(error);
  //   return NextResponse.json({ error: "error occured" });
  // }
}

// i'll add some actions later
