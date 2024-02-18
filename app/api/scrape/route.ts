import { NextResponse } from "next/server";
import axios from "axios";
import cheerio from "cheerio";

interface Question {
  id: number;
  question: string | string[];
  option: Object;
  topic: string;
  image: string;
  answer: string;
  solution: string;
  examtype: string;
  examyear: string;
}

export async function GET() {
  try {
    const url =
      "https://myschool.ng/classroom/english-language?exam_type=jamb&page=3";
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const questionItemElements = $(".question-item");

    const questions: Question[] = [];

    const opt = {
      [0]: "a",
      [1]: "b",
      [2]: "c",
      [3]: "d",
      [4]: "e",
    };

    questionItemElements.each((index, element) => {
      let currentQuestion: Question = {
        id: 1,
        question: "",
        option: {},
        topic: "",
        image: "",
        answer: "",
        solution: "",
        examtype: "utme",
        examyear: "2023",
      };
      let option = {};

      const questionDescElement = $(element).find(".question-desc");
      const question = questionDescElement
        .find("p")
        .map((i, el) => $(el).html())
        .get();

      $(element)
        .find("ul.list-unstyled li")
        .each((optionIndex, optionElement) => {
          const optionText = $(optionElement).text().trim();
          const modifiedOption = optionText.substring(3);
          option = {
            ...option,
            // @ts-ignore
            [opt[optionIndex]]: modifiedOption,
          };
        });
      currentQuestion = { ...currentQuestion, question, option };

      questions.push(currentQuestion);
    });

    console.log(questions);
    return NextResponse.json({ questions: questions });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "error occured" });
  }
}
