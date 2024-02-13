"use client";

import { MouseEvent, useState } from "react";
import { Button } from "./ui/button";

export default function Calculator() {
  const [result, setResult] = useState<string>("");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const content = e.currentTarget.textContent;
    content && setResult(result.concat(content));
  };
  const clear = () => setResult("");
  const deleteEl = () => setResult(result.slice(0, -1));
  const caculate = () => {
    try {
      setResult(eval(result).tostring());
    } catch (error) {
      setResult("Error");
    }
  };

  return (
    <div className="flex max-w-80 flex-col gap-2 overflow-hidden rounded-md bg-slate-700 pb-2">
      <input
        type="text"
        value={result}
        disabled
        className="w-full bg-slate-100 px-4 py-2"
      />
      <div className="flex gap-2">
        <Button className="" onClick={clear} variant="secondary">
          AC
        </Button>
        <Button className="" onClick={deleteEl} variant="secondary">
          DE
        </Button>
        <Button
          className=""
          onClick={(e) => handleClick(e)}
          variant="secondary"
        >
          .
        </Button>
        <Button className="" onClick={handleClick} variant="secondary">
          /
        </Button>
      </div>
    </div>
  );
}
