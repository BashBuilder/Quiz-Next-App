import { NextResponse } from "next/server";
import axios from "axios";
import cheerio from "cheerio";
import { englishCategories } from "@/lib/categoriesData";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/config";
import { QuestionData } from "@/app/GlobalRedux/Features/questionSlice";

export async function GET() {
  try {
    const opt = {
      [0]: "a",
      [1]: "b",
      [2]: "c",
      [3]: "d",
      [4]: "e",
    };
    const year = 2023;
    const url = `https://myschool.ng/classroom/literature-in-english/67686?exam_type=jamb&exam_year=${year}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const questions: QuestionData[] = [];
    for (let index = 0; index <= 7; index++) {
      const uri = `https://myschool.ng/classroom/literature-in-english/${67687 + index}?exam_type=jamb`;
      const pagesResponse = await axios.get(uri);
      const $page = cheerio.load(pagesResponse.data);

      const content = $page("#page-content-section");

      let passage: string = "";
      const passageContent = $page(".card-body").find("p");
      const passageCount = passageContent.get().length;
      if (passageCount === 1) {
        passage = passageContent.html() || "";
      } else {
        passageContent.each((i, el) => {
          const htmlContent = $page(el).html();
          passage += htmlContent || "";
        });
      }

      // new page question
      let currentQuestion: QuestionData = {
        id: 0,
        questionNub: 0,
        question: "",
        section: "",
        option: { a: "", b: "", c: "", d: "" },
        category: "",
        image: "",
        answer: "",
        solution: "",
        examtype: "utme",
        examyear: year.toString(),
      };
      let option = { a: "", b: "", c: "", d: "" };
      let questionDescElement = $page(content).find(".question-desc");
      let question: string = questionDescElement.find("p").first().text();

      // .trim();
      let section: string = questionDescElement.find("p").eq(1).text().trim();

      // Extracting Correct Answer and Explanation
      let correctAnswerElement = $page(content).find(".text-success");
      let correctAnswerText = correctAnswerElement.text(); //.trim();
      let correctAnswer = correctAnswerText.split(":")[1]; //.trim(); // Extracting correct answer
      let explanation = $page(content)
        .find("h5:contains('Explanation')")
        .next("p")
        .text();
      // .trim();
      // Assigning correct answer and explanation to currentQuestion object
      currentQuestion.answer = correctAnswer;
      currentQuestion.solution = explanation;

      // Extracting options
      $page(content)
        .find("ul.list-unstyled li")
        .each((optionIndex, optionElement) => {
          const optionText = $page(optionElement).text(); //.trim();
          const modifiedOption = optionText.substring(3);
          option = {
            ...option,
            // @ts-ignore
            [opt[optionIndex]]: modifiedOption,
          };
        });

      currentQuestion.question = question;
      currentQuestion.section = section;
      currentQuestion.option = option;

      questions.push({ ...currentQuestion });
    }

    const firestoreQuestion = collection(db, "englishlit");
    const tt: QuestionData[] = [...questions];
    const sortedQuestion = tt.sort((a, b) => a.questionNub - b.questionNub);

    // await addDoc(firestoreQuestion, { data: [...sortedQuestion] });
    return NextResponse.json({ data: [...sortedQuestion] });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "error occured" });
  }
}
