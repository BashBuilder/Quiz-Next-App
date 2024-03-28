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
    const year = 2021;
    const url = `https://myschool.ng/classroom/literature-in-english?exam_type=jamb&exam_year=${year}&page=1`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    // const numberOfPages = $(".page-item").get().length;
    const questions: QuestionData[] = [];
    for (let index = 1; index <= 8; index++) {
      const uri = `https://myschool.ng/classroom/literature-in-english?exam_type=jamb&exam_year=${year}&page=${index}`;
      const pagesResponse = await axios.get(uri);
      const $page = cheerio.load(pagesResponse.data);
      const pageQuestionItemElements = $page(".question-item");
      let questionNub: number | null = 0;
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

      pageQuestionItemElements.each((index, element) => {
        let currentQuestion: QuestionData = {
          id: 0,
          questionNub: 0,
          question: "",
          section: "",
          option: { a: "", b: "", c: "", d: "", e: "" },
          category: "",
          image: "",
          answer: "",
          solution: "",
          examtype: "utme",
          examyear: year.toString(),
        };
        let option = { a: "", b: "", c: "", d: "", e: "" };
        questionNub = parseInt(
          $page(element).find(".question_sn").text().trim(),
        );
        const questionDescElement = $page(element).find(".question-desc");
        let question: string | null = "";
        let section: string | null = "";
        if (questionDescElement.find("p").length > 1) {
          questionDescElement.find("p").each((i, el) => {
            i === 0
              ? (section = $page(el).html())
              : (question = $page(el).html());
          });
        } else {
          question = questionDescElement.find("p").html();
          passage && (section = passage);
        }
        $page(element)
          .find("ul.list-unstyled li")
          .each((optionIndex, optionElement) => {
            const optionText = $page(optionElement).text().trim();
            const modifiedOption = optionText.substring(3);
            option = {
              ...option,
              // @ts-ignore
              [opt[optionIndex]]: modifiedOption,
            };
          });
        questions.push({
          ...currentQuestion,
          question,
          option,
          section,
          questionNub: questionNub,
          id: questionNub,
        });
      });
    }
    const firestoreQuestion = collection(db, "englishlit");
    const tt: QuestionData[] = [...questions];
    const sortedQuestion = tt.sort((a, b) => a.questionNub - b.questionNub);

    await addDoc(firestoreQuestion, { data: [...sortedQuestion] });
    return NextResponse.json({ data: [...sortedQuestion] });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "error occured" });
  }
}
