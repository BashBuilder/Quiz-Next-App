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


 // <label key={index} className=" cursor-pointer">
                      //   <input
                      //     type="radio"
                      //     className="mr-2 cursor-pointer "
                      //     name="option"
                      //     value={key} // Add a value attribute
                      //     onChange={(e) => handleSelection(e, qIndex + 1)} // Add an onChange handler
                      //     // @ts-ignore
                      //     checked={key === selectedOption[qIndex + 1]}
                      //   />
                        {/* @ts-ignore */}
                      //   {key}. {option[key]}
                      // </label>

                      
  const handleSelection = (e: any, questionIndex: number) => {
    const value = e.target.value;
    setSelectedOption((prev) => ({
      ...prev,
      [questionIndex]: value,
    }));
  };

  
  {/* Subject */}
        {/* <div className="flex flex-col gap-2 ">
          <label htmlFor="">Subject</label>
          <select
            name="Subject"
            id="subject"
            className="rounded-md bg-backgroundMain p-2 "
          >
            <option value="physics">Jamb</option>
            <option value="chemistry">Waec</option>
            <option value="biology">Biology</option>
          </select>
        </div> */}
        {/* Amount */}
        {/* <div className="flex flex-col gap-2 ">
          <label htmlFor=""> Number of questions</label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="rounded-md bg-backgroundMain p-2 "
            min={40}
            max={50}
          />
        </div> */}

        {/* Year of examination */}
        {/* <div className="flex flex-col gap-2 ">
          <label htmlFor="year">Year</label>
          <select
            name="year"
            id="year"
            className="rounded-md bg-backgroundMain p-2 "
          >
            <option value="2022 ">2022</option>
            <option value="2022">2021</option>
            <option value="2022">2020</option>
            <option value="2022">2019</option>
            <option value="2022">2018</option>
          </select>
        </div> */}