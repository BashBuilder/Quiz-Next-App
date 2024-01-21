// fetch("https://questions.aloc.com.ng/api/v2/m/1?subject=chemistry", {
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     AccessToken: "ALOC-caa562dfeb1a7de83a69",
//   },
//   method: "GET",
// })
//   .then((response) => response.json())
//   .then((data) => {
//     // console.log("data", data);
//     if (data) {
//       // @ts-ignore
//       questions.push({ ...data.data[0], subject: data.subject });
//     }
//   })
//   .catch((error) => {
//     console.log("error", error);
//   });

const questions = {
  subject: "chemistry",
  data: {
    answer: "a",
    examtype: "utme",
    examyear: "2010",
    id: 304,
    image: "",
    option: { a: "CHCI3", b: "CH2C2", c: "CH3CI", d: "CCI4", e: "CCI4" },
    question: "The compound that is used as an anaesthetic is",
    section: "",
    solution: "",
  },
};
