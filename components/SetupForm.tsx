"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { LoaderIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "@/app/GlobalRedux/Features/questionSlice";
import { useRouter } from "next/navigation";
import { setTimerTime } from "@/app/GlobalRedux/Features/timerSlice";

export default function SetupForm() {
  const [subjects, setSubjects] = useState<string[]>(["english"]);
  const dispatch = useDispatch();
  const router = useRouter();

  // Zod schema for the jamb question fetcching
  const CbtSchema = z.object({
    examType: z.string(),
    subjects: z.array(z.string()).nonempty(),
  });
  type CbtShemaType = z.infer<typeof CbtSchema>;

  // adjust the selected subjects
  const adjustSubject = (subject: string) => {
    setSubjects((sub) => {
      if (sub && sub.includes(subject)) {
        return sub.filter((other) => other !== subject);
      } else {
        return sub ? [...sub, subject] : [subject];
      }
    });
  };

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<CbtShemaType>({
    resolver: zodResolver(CbtSchema),
    defaultValues: {
      examType: "utme",
      subjects: [
        "english",
        "physics",
        "chemistry",
        "biology",
        "literature",
        "crs",
        "accounting",
        "mathematics",
        "economics",
      ],
    },
  });
  const selectedSubjects = watch("subjects");

  const startExam: SubmitHandler<CbtShemaType> = async (data) => {
    const submit = { examType: data.examType, subjects };
    try {
      let newQuestions = await Promise.all(
        subjects.map(async (subject: string) => {
          const url = `https://questions.aloc.com.ng/api/v2/m/40?subject=${subject}`;
          const response = await fetch(url, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              AccessToken: "ALOC-caa562dfeb1a7de83a69",
            },
            method: "GET",
          });
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          return { subject: data.subject, data: data.data };
        }),
      );

      const EXAM_TIME: { duration: number; isExamStarted: boolean } = {
        duration: 7200,
        isExamStarted: true,
      };

      localStorage.setItem("allQuestions", JSON.stringify(newQuestions));
      localStorage.setItem("examTime", JSON.stringify(EXAM_TIME));
      dispatch(fetchQuestions(newQuestions));
      dispatch(setTimerTime(EXAM_TIME.duration));
      router.push("/exam");
    } catch (error: any) {
      console.error("The error from fetching is ", error);
    }
  };

  return (
    <section className="relative flex h-screen min-h-[42rem] items-center justify-center py-10 ">
      <Image
        src="/img/jBa.jpg"
        alt="jamb"
        width={200}
        height={200}
        className="pointer-events-none absolute left-0 top-0 -z-10 mx-auto h-full w-screen object-cover"
        priority
      />
      <div className="absolute left-0 top-0 -z-[5] h-full w-screen bg-slate-700 opacity-80" />
      <div className="flex w-fit overflow-hidden rounded-3xl bg-background shadow-2xl ">
        <Image
          src="/img/closeup.png"
          alt="writing exam"
          width={200}
          height={200}
          className="hidden h-full min-h-[38rem]  min-w-96 object-cover object-right md:inline"
          priority
        />
        <form
          onSubmit={handleSubmit(startExam)}
          className="flex w-[90vw] max-w-sm flex-col gap-4 p-6 md:px-10 md:py-4 "
        >
          <div>
            <Image
              src="/img/jamb.png"
              alt="jamb"
              width={200}
              height={200}
              className="mx-auto w-32"
              priority
            />
          </div>
          <h4 className="text-center"> JAMB CBT</h4>
          {/* Exam Type */}
          <div className="mt-2 flex flex-col gap-2 ">
            <label className="font-semibold">Exam Type</label>
            <Controller
              control={control}
              name="examType"
              render={({ field }) => {
                return (
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger disabled>
                      <SelectValue
                        placeholder="Select an Exam"
                        defaultValue="utme"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="utme">Jamb</SelectItem>
                        <SelectItem value="waec">Waec</SelectItem>
                        <SelectItem value="neco">Neco</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                );
              }}
            />
          </div>
          {/* Subjects */}
          <div className="mt-2 flex flex-col gap-2 ">
            <label className="font-semibold">Subjects</label>
            <ul>
              {subjects.map((subject, index) => (
                <li key={index}>
                  <button
                    className="px-2 py-1 capitalize "
                    type="button"
                    disabled={subject === "english"}
                    onClick={() =>
                      setSubjects((sub) =>
                        sub.filter((other) => other !== subject),
                      )
                    }
                  >
                    ✅{subject === "english" && " Use of"} {subject}
                  </button>
                </li>
              ))}
            </ul>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Select Subjects</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="h-40 w-[80vw] max-w-80 overflow-y-scroll  ">
                <DropdownMenuSeparator />
                {selectedSubjects.map((subject, index) => (
                  <div key={index}>
                    <DropdownMenuCheckboxItem
                      key={index}
                      className="capitalize"
                      checked={subjects.includes(subject)}
                      onCheckedChange={() => adjustSubject(subject)}
                      {...register("subjects")}
                      disabled={
                        subject === "english" ||
                        (!subjects.includes(subject) && subjects.length > 3)
                      }
                    >
                      {subject}
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator key={`separator${index}`} />
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button type="submit" disabled={subjects.length !== 4}>
            {isSubmitting ? (
              <LoaderIcon className="mx-auto animate-spin " />
            ) : (
              "Start"
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
