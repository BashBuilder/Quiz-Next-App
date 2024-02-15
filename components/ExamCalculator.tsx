"use client";

import { useState } from "react";
import { Button } from "./ui/button";

interface ExamCalculatorProps {
  isCalculatorShown: boolean;
}

export default function ExamCalculator({
  isCalculatorShown,
}: ExamCalculatorProps) {
  const [result, setResult] = useState<string>("");

  const handleCharacterLimit = (value: string) => {
    const maxLength = 16;
    return value.length > maxLength ? value.slice(0, maxLength) : value;
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const content = e.currentTarget.textContent;
    if (result === "Error") {
      content && setResult(handleCharacterLimit(content));
    } else {
      content && setResult(handleCharacterLimit(result.concat(content)));
    }
  };

  const clear = () => setResult("");
  const deleteEl = () => setResult(result.slice(0, -1));
  const calculateResult = () => {
    try {
      const rawResult = eval(result);
      const roundedResult = parseFloat(rawResult.toFixed(4)); // Adjust the decimal places as needed
      //  setResult(roundedResult.toString());

      const absValue = Math.abs(rawResult);
      const exponent = Math.floor(Math.log10(absValue));
      const mantissa = absValue / Math.pow(10, exponent);
      const formattedNumber =
        mantissa.toFixed(4) + "x10^" + exponent.toString();

      rawResult < 0
        ? setResult(`-${formattedNumber}`)
        : setResult(formattedNumber);
    } catch (error) {
      setResult("Error");
    }
  };

  return (
    <div
      className={` ${isCalculatorShown ? "absolute" : "hidden"} top-10 m-2 flex w-60 flex-col gap-2 overflow-hidden rounded-xl bg-slate-700 p-2`}
    >
      <input
        type="text"
        value={result}
        disabled
        className="w-full bg-transparent py-8 pr-2 text-right text-xl text-white"
      />
      <div className="grid grid-cols-4 gap-2">
        <Button onClick={clear} variant="secondary">
          AC
        </Button>
        <Button onClick={deleteEl} variant="secondary">
          DE
        </Button>
        <Button onClick={handleClick} variant="secondary">
          ^
        </Button>
        <Button onClick={handleClick} variant="secondary">
          /
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Button onClick={handleClick} variant="secondary">
          7
        </Button>
        <Button onClick={handleClick} variant="secondary">
          8
        </Button>
        <Button onClick={handleClick} variant="secondary">
          9
        </Button>
        <Button onClick={handleClick} variant="secondary">
          *
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Button onClick={handleClick} variant="secondary">
          4
        </Button>
        <Button onClick={handleClick} variant="secondary">
          5
        </Button>
        <Button onClick={handleClick} variant="secondary">
          6
        </Button>
        <Button onClick={handleClick} variant="secondary">
          -
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Button onClick={handleClick} variant="secondary">
          1
        </Button>
        <Button onClick={handleClick} variant="secondary">
          2
        </Button>
        <Button onClick={handleClick} variant="secondary">
          3
        </Button>
        <Button onClick={handleClick} variant="secondary">
          +
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Button onClick={handleClick} variant="secondary">
          0
        </Button>
        <Button onClick={handleClick} variant="secondary">
          .
        </Button>
        <Button
          onClick={calculateResult}
          className="col-span-2"
          variant="secondary"
        >
          =
        </Button>
      </div>
    </div>
  );
}
