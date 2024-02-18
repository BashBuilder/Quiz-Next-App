import { NextResponse } from "next/server";
import axios from "axios";
import cheerio from "cheerio";

export async function GET() {
  try {
    console.log("request Started");
    const url =
      "https://myschool.ng/classroom/english-language?exam_type=jamb&page=1";
    const response = await axios.get(url);

    const $ = cheerio.load(response.data);
    const questionItemElements = $(".question-item");

    let questionsData: {
      index: number;
      question: string[];
      options: string[];
    }[] = [];

    questionItemElements.each((index, element) => {
      const questionDescElement = $(element).find(".question-desc");
      const question = questionDescElement
        .find("p")
        .map((i, el) => $(el).html())
        .get();

      const options: string[] = [];
      $(element)
        .find("ul.list-unstyled li")
        .each((optionIndex, optionElement) => {
          const optionText = $(optionElement).text().trim();
          const modifiedOption = optionText.substring(3);
          options.push(modifiedOption);
        });

      questionsData.push({ index, question, options });
    });
    console.log(questionsData);

    return NextResponse.json({ questions: questionsData });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "error occured" });
  }
}
