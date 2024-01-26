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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const subjects = [
  "Physics",
  "Chemistry",
  "Biology",
  "Literature",
  "CRS",
  "Accounting",
  "Mathematics",
  "Economics",
];

export default function SetupForm() {
  const CbtSchema = z.object({
    examType: z.string(),
    subjects: z.array(z.string()).nonempty(),
  });
  type CbtShemaType = z.infer<typeof CbtSchema>;

  const [showStatusBar, setShowStatusBar] = useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = useState<Checked>(false);
  const [showPanel, setShowPanel] = useState<Checked>(false);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CbtShemaType>({ resolver: zodResolver(CbtSchema) });

  const selectedSubjects = watch("subjects");

  const startExam: SubmitHandler<CbtShemaType> = (data) => {
    console.log(data);
    console.log("submitted");
  };

  return (
    <section className="flex min-h-screen items-center justify-center py-10 md:py-20 ">
      <form
        onSubmit={handleSubmit(startExam)}
        className="flex w-4/5 max-w-md flex-col gap-4 rounded-xl bg-background p-6 md:px-10 md:py-6 "
      >
        <div>
          <Image
            src="/img/jamb.png"
            alt="jamb"
            width={200}
            height={200}
            className="mx-auto w-40"
            priority
          />
        </div>
        <h3 className="text-center"> JAMB CBT</h3>
        {/* Exam Type */}
        <div className="mt-2 flex flex-col gap-2 ">
          <label className="font-semibold">Exam Type</label>
          <Controller
            control={control}
            name="examType"
            render={({ field }) => {
              return (
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Select an Exam"
                      defaultValue="jamb"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="jamb">Jamb</SelectItem>
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
            <li>
              <p> ✅ Use of English</p>
            </li>
          </ul>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Select Subjects</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="h-40 w-80 overflow-y-scroll  ">
              <DropdownMenuSeparator />
              {subjects.map((subject) => (
                <>
                  <DropdownMenuCheckboxItem
                    key={subject}
                    checkedValue={subject}
                    {...register("subjects")}
                  >
                    {subject}
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                </>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {errors.examType && (
          <p className="text-red-500"> {errors.examType.message} </p>
        )}
        <Button type="submit" className="bg-primary text-background ">
          {isSubmitting ? (
            <LoaderIcon className="mx-auto animate-spin " />
          ) : (
            "Start"
          )}
        </Button>
      </form>
    </section>
  );
}
