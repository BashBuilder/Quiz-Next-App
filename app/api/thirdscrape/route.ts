import { NextResponse } from "next/server";
import axios from "axios";
import cheerio from "cheerio";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/config";
import { QuestionData } from "@/app/GlobalRedux/Features/questionSlice";

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
    console.log(data);
    console.log(data.length);
    const firestoreQuestion = collection(db, "englishCheck");
    await addDoc(firestoreQuestion, { ...data });
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "error occured" });
  }
}
