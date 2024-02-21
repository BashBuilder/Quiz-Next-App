import { NextResponse } from "next/server";
import axios from "axios";
import cheerio from "cheerio";
import { englishCategories } from "@/lib/categoriesData";

interface Question {
  id: number;
  question: string | null;
  option: Object;
  topic: string;
  section: string;
  image: string;
  answer: string;
  solution: string;
  examtype: string;
  examyear: string;
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
    const year = 2023;
    let newQuestions = await Promise.all(
      englishCategories.map(async (category: string) => {
        const url = `https://myschool.ng/classroom/english-language?exam_type=jamb&exam_year=${year}&topic=${category}&novel=`;
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const numberOfPages = $(".page-item").get().length;
        const questions: Question[] = [];
        if (numberOfPages) {
          // numberOfPages.map(async (index, element) => {
          for (let index = 0; index < numberOfPages; index++) {
            const uri = `https://myschool.ng/classroom/english-language?exam_type=jamb&exam_year=${year}&topic=${category}&page=${index}`;
            const pagesResponse = await axios.get(uri);
            const $page = cheerio.load(pagesResponse.data);
            const pageQuestionItemElements = $page(".question-item");
            const passage = $page(".card-body").find("p").html();
            pageQuestionItemElements.each((index, element) => {
              let currentQuestion: Question = {
                id: index,
                question: "",
                section: "",
                option: {},
                topic: category,
                image: "",
                answer: "",
                solution: "",
                examtype: "utme",
                examyear: "2023",
              };
              let option = {};

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
              questions.push({ ...currentQuestion, question, option, section });
            });
          }
        } else {
          const questionItemElements = $(".question-item");
          questionItemElements.each((index, element) => {
            let currentQuestion: Question = {
              id: index,
              question: "",
              section: "",
              option: {},
              topic: category,
              image: "",
              answer: "",
              solution: "",
              examtype: "utme",
              examyear: "2023",
            };
            let option = {};

            const questionDescElement = $(element).find(".question-desc");
            let question: string | null = "";
            let section: string | null = "";
            if (questionDescElement.find("p").length > 1) {
              questionDescElement.find("p").each((i, el) => {
                i === 0 ? (section = $(el).html()) : (question = $(el).html());
              });
            } else {
              question = questionDescElement.find("p").html();
            }

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
            // currentQuestion = { ...currentQuestion, question, option, section };
            questions.push({ ...currentQuestion, question, section, option });
          });
        }
        return { questions };
      }),
    );

    console.log(newQuestions);
    return NextResponse.json({ questions: newQuestions });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "error occured" });
  }
}
