import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  // Your API logic here
  console.log("hello the the server");
  return NextResponse.json({
    message: "Hello, world! this is the exam server",
  });
}

// export async function POST(req: NextRequest, res: NextResponse) {
//   const { searchParams } = new URL(req.url);
//   const param = searchParams.get("");
//   console.log(param);
//   // console.log(req.json());
//   return NextResponse.json({ success: "request recieved" });

// const submitData = NextRequest.arguments;
// console.log(submitData);

// NextResponse.json(submitData);

//  const submit = { examType: data.examType, subjects };
//   try {
//     let newQuestions = await Promise.all(
//       subjects.map(async (subject: string) => {
//         const url = `https://questions.aloc.com.ng/api/v2/m/40?subject=${subject}`;
//         const response = await fetch(url, {
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             AccessToken: "ALOC-caa562dfeb1a7de83a69",
//           },
//           method: "GET",
//         });
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         return { subject: data.subject, data: data.data };
//       }),
//     );
//   } catch (error: any) {
//     console.error("The error from fetching is ", error);
//   }
// }
//

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const token = "ALOC-caa562dfeb1a7de83a69";
    const { subjects } = body;

    console.log(subjects);
    let newQuestions = await Promise.all(
      subjects.map(async (subject: string) => {
        // const url = `https://questions.aloc.com.ng/api/v2/m/40?subject=${subject}`;
        const url = `https://questions.aloc.com.ng/api/v2/m/${subject === "english" ? 60 : 40}?subject=${subject}&year=2020`;
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
    console.log(newQuestions);
    return NextResponse.json(newQuestions);
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

// const response = await fetch(url, {
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     AccessToken: token,
//   },
//   method: "GET",
// });
// const data = await response.json();
// if (!response.ok) {
//   console.log(data);
//   throw new Error(`HTTP error! Status: ${response.status}`);
// }
// const results = { subject: data.subject, data: data.data };
// console.log(results);

// return NextResponse.json(results);
