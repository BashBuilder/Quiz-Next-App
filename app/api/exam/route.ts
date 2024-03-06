import { db } from "@/lib/config";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const token = "ALOC-caa562dfeb1a7de83a69";
    const { subjects } = body;

    const newSubjects = subjects.splice(1, 3);
    console.log(newSubjects);
    const firestoreQuestion = collection(db, "english");
    const englishSnapshot = await getDocs(firestoreQuestion);

    // @ts-ignore
    const englishQeustion = [];
    const q = englishSnapshot.forEach((doc) =>
      englishQeustion.push(doc.data()),
    );

    // @ts-ignore
    const englishData = { subject: "english", data: englishQeustion[0] };

    let newQuestions = await Promise.all(
      subjects.map(async (subject: string) => {
        // const url = `https://questions.aloc.com.ng/api/v2/m/${subject === "english" ? 60 : 40}?subject=${subject}&year=2020`;
        const url = `https://questions.aloc.com.ng/api/v2/m/40?subject=${subject}&year=2020`;
        // const url = `https://questions.aloc.com.ng/api/v2/m/${60}?subject=${subject}&year=2010`;
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
        return { subject: data.subject, data: data.data };
      }),
    );

    const sentQ = { ...newQuestions, ...englishData };
    // console.log(newQuestions);
    console.log(sentQ);
    // return NextResponse.json(newQuestions);
    return NextResponse.json(sentQ);
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.error();
  }
}

// Get any 40 random questions
// const url = `https://questions.aloc.com.ng/api/v2/m/40?subject=${subjects[1]}`;

// Get any 40 questions by subject and year
// const url = `https://questions.aloc.com.ng/api/v2/m/60?subject=english&year=2005`;

// const url = `https://questions.aloc.com.ng/api/v2/m/60?subject=english&year=2005`;

// another request type
// const url = `https://questions.aloc.com.ng/api/v2/m/40?subject=${subject}`;
