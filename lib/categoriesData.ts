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

export const englishCategories = [
  // "all",
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
  "the-writing-process",
  "infinitives-gerunds-and-participles",
  "sentence-building-444827",
  "clauses",
  "phrases",
  "morphemes-and-words",
  "the-concept-of-a-sentence",
  "elements-of-sentence-structure",
  "the-spelling-rules",
  "antonyms-synonyms-homonyms",
  "essay-writing-descriptive-essay",
  "essay-writing-narrative-essay",
  "essay-writing-argumentative-essay",
  "essay-writing-expository-essay",
  "informal-letter-writing",
  "formal-letter-writing",
  "the-vowel-sound-monophthongs-pure-vowels",
  "the-vowel-sound-diphthongs",
  "the-short-vowel-sounds",
  "the-long-vowel-sounds",
  "consonant-sounds-plosives",
  "consonant-sounds-liquid-and-semi-vowel",
  "consonant-sounds-fricatives",
  "consonant-sounds-affricates-and-nasals",
];

// export const collectQuestions = (category: string, element: any) => {
//   let currentQuestion: Question = {
//     id: 1,
//     question: "",
//     section: "",
//     option: {},
//     topic: category,
//     image: "",
//     answer: "",
//     solution: "",
//     examtype: "utme",
//     examyear: "2023",
//   };
//   let option = {};

//   const questionDescElement = $(element).find(".question-desc");
//   let question: string | null = "";
//   let section: string | null = "";
//   if (questionDescElement.find("p").length > 1) {
//     questionDescElement.find("p").each((i, el) => {
//       i === 0 ? (section = $(el).html()) : (question = $(el).html());
//     });
//   } else {
//     question = questionDescElement.find("p").html();
//   }

//   $(element)
//     .find("ul.list-unstyled li")
//     .each((optionIndex, optionElement) => {
//       const optionText = $(optionElement).text().trim();
//       const modifiedOption = optionText.substring(3);
//       option = {
//         ...option,
//         // @ts-ignore
//         [opt[optionIndex]]: modifiedOption,
//       };
//     });
//   currentQuestion = { ...currentQuestion, question, option };

//   questions.push(currentQuestion);
// };
