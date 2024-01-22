export default function SetupForm() {
  return (
    <section className="flex min-h-screen items-center justify-center py-10 md:py-20 ">
      <form className="flex w-4/5 max-w-sm flex-col gap-4 rounded-xl bg-background px-4 md:p-10 ">
        <h2>CBT</h2>
        {/* Subject */}
        <div className="flex flex-col gap-2 ">
          <label htmlFor="">Subject</label>
          <select
            name="Subject"
            id="subject"
            className="rounded-md bg-backgroundMain p-2 "
          >
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="biology">Biology</option>
          </select>
        </div>
        {/* Amount */}
        <div className="flex flex-col gap-2 ">
          <label htmlFor=""> Number of questions</label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="rounded-md bg-backgroundMain p-2 "
            min={40}
            max={50}
          />
        </div>

        {/* Year of examination */}
        <div className="flex flex-col gap-2 ">
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
        </div>
        {/* {
          <p>Can't generate questions, please try again later</p>
        } */}
        <button
          type="submit"
          className="rounded-lg bg-primary px-4 py-2 text-background "
        >
          Start
        </button>
      </form>
    </section>
  );
}
