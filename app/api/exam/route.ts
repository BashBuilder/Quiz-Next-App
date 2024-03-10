import { db } from "@/lib/config";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const token = "ALOC-caa562dfeb1a7de83a69";
    const { subjects } = body;
    const newSubjects = subjects.splice(1, 3);

    const firestoreQuestion = collection(db, "englishCheck");
    const englishSnapshot = await getDocs(firestoreQuestion);
    // @ts-ignore
    const englishQeustion = [];
    const q = englishSnapshot.forEach((doc) =>
      englishQeustion.push(doc.data()),
    );
    // @ts-ignore
    const englishData = { subject: "english", data: englishQeustion[0].data };

    let newQuestions = await Promise.all(
      newSubjects.map(async (subject: string) => {
        const url = `https://questions.aloc.com.ng/api/v2/m/40?subject=${subject}&year=2020`;
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
    const sentQ = [englishData, ...newQuestions];
    return NextResponse.json(sentQ);
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.error();
  }
}

// Get any 40 questions by subject and year
// const url = `https://questions.aloc.com.ng/api/v2/m/60?subject=english&year=2005`;

// another request type
// const url = `https://questions.aloc.com.ng/api/v2/m/40?subject=${subject}`;
