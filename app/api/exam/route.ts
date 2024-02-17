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
    const body = await req.json(); // Await the resolved value of the promise
    const token = "ALOC-caa562dfeb1a7de83a69";

    const { subjects, examType } = body;
    console.log(body);
    const url = `https://questions.aloc.com.ng/api/v2/m/40?subject=${subjects[1]}`;
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
    // return { subject: data.subject, data: data.data };

    return NextResponse.json({ success: "request received" });
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.error();
  }
}
