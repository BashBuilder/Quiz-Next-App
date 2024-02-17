import { NextResponse } from "next/server";
import axios from "axios";
import cheerio from "cheerio";

export async function GET() {
  try {
    const url =
      "https://myschool.ng/classroom/english-language?exam_type=jamb&page=1";
    const response = await axios.get(url);
    // console.log(response.data);

    const $ = cheerio.load(response.data);

    // @ts-ignore
    const links = [];
    $(".question-item").each((index, element) => {
      links.push($(element).hasClass("question-desc"));
    });

    // @ts-ignore
    console.log(links);

    // const links : string[] = [];
    // $("a").each((index, element) => {
    //   links.push($(element).attr("href"));
    // });

    return NextResponse.json({ link: "access acquired" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "error occured" });
  }
}
