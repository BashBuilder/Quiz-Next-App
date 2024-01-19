export default function SelectSubject() {
  let list = [];

  for (let i = 1; i <= 50; i++) {
    list.push(i);
  }

  return (
    <section className="flex min-h-screen items-center justify-center py-10 md:py-20 ">
      <div className="flex w-4/5 max-w-5xl flex-col gap-4 md:gap-10">
        {/* the top question section */}
        <div className=" flex flex-col gap-4 rounded-xl bg-background p-4 shadow-xl md:px-20 md:py-10 ">
          <h5 className="text-right ">Time remaining : 2 min</h5>
          <article className="flex flex-col gap-4 ">
            <h2>some questions goes here</h2>
            <div className="flex flex-col gap-2">
              <label className=" cursor-pointer">
                <input
                  type="radio"
                  className="mr-2 cursor-pointer "
                  name="Option"
                />
                Option 1
              </label>
              <label className=" cursor-pointer">
                <input
                  type="radio"
                  className="mr-2 cursor-pointer"
                  name="Option"
                />
                Option 1
              </label>
              <label className=" cursor-pointer">
                <input
                  type="radio"
                  className="mr-2  cursor-pointer"
                  name="Option"
                />
                Option 1
              </label>
              <label className=" cursor-pointer">
                <input
                  type="radio"
                  className="mr-2 cursor-pointer"
                  name="Option"
                />
                Option 1
              </label>
            </div>
          </article>

          {/* the next and previos button goes here */}
          <div className="my-6 flex justify-between">
            <button>previous</button>
            <button>next</button>
          </div>
        </div>

        {/* the lower question navigation pane  */}
        <div className="flex flex-wrap justify-between gap-3 rounded-xl bg-background p-4 shadow-xl md:p-10 ">
          {list.map((num) => (
            <button
              key={num}
              className="h-10 w-10 rounded-md bg-primary text-sm text-primary-foreground"
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
