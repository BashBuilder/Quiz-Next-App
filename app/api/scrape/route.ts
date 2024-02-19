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
    const categories = [
      "english-grammar",
      "word-classes",
      "phrasal-verb",
      "sentence-classification",
      "tense-and-aspect",
      "concord",
      "question-tag",
      "language-registers",
      "reported-speech",
      "punctuation",
      "idiomatic-expression",
      "oral-english",
      "the-sound-system",
      "vowels",
      "consonants",
      "syllable",
      "stress",
      "intonation",
      "comprehension",
      "concept-of-comprehension",
      "topic-sentence",
      "sentence-interpretation",
      "summary-writing",
      "grammatical-applications",
      "writing",
    ];
    const url =
      // "https://myschool.ng/classroom/english-language?exam_type=jamb&page=3";
      "https://myschool.ng/classroom/english-language?exam_type=jamb&exam_year=2023&topic=word-classes&novel=";
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
        topic: "word-classes",
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
