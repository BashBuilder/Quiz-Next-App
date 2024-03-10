// useEffect(() => {
//   let sortedQuestions;
//   const newQuestions = allQuestions?.filter(
//     (questions) => questions.subject === selectedSubject,
//   )[0];

//   if (selectedSubject === "english") {
//     let arrayedQuestions;
//     if (newQuestions) {
//       arrayedQuestions = Object.values(newQuestions.data);
//       sortedQuestions = { subject: "english", data: arrayedQuestions };
//     }
//   } else {
//     sortedQuestions = newQuestions;
//   }
//   sortedQuestions && setQuestions(sortedQuestions);
//   setQuestionIndex(0);
//   // eslint-disable-next-line
// }, [selectedSubject]);
