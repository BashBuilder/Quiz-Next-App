import { NextResponse } from "next/server";
import axios from "axios";
import cheerio from "cheerio";
import { englishCategories } from "@/lib/categoriesData";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/config";

interface Question {
  id: string | null;
  question: string | null;
  option: Object;
  topic: string;
  section: string;
  image: string;
  answer: string;
  solution: string;
  examtype: string;
  examyear: number;
}

export async function GET() {
  try {
    const opt = {
      [0]: "a",
      [1]: "b",
      [2]: "c",
      [3]: "d",
      [4]: "e",
    };
    const year = 2020;
    // let newQuestions = await Promise.all(
    //   englishCategories.map(async (category: string) => {
    const url = `https://myschool.ng/classroom/english-language?exam_type=jamb&exam_year=${year}&topic=&novel=`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const numberOfPages = $(".page-item").get().length;
    const questions: Question[] = [];
    for (let index = 0; index < numberOfPages; index++) {
      const uri = `https://myschool.ng/classroom/english-language?exam_type=jamb&exam_year=${year}&topic=&novel=`;
      const pagesResponse = await axios.get(uri);
      const $page = cheerio.load(pagesResponse.data);
      const pageQuestionItemElements = $page(".question-item");
      let questionNum: string | null = "";
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
        let currentQuestion: Question = {
          id: "",
          question: "",
          section: "",
          option: {},
          topic: "",
          image: "",
          answer: "",
          solution: "",
          examtype: "utme",
          examyear: year,
        };
        let option = {};
        questionNum = $page(element).find(".question_sn").text().trim();

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
          id: questionNum,
        });
      });
    }
    console.log(questions);
    console.log(questions.length);
    const firestoreQuestion = collection(db, "english");
    await addDoc(firestoreQuestion, { questions });
    return NextResponse.json({ questions });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "error occured" });
  }
}
