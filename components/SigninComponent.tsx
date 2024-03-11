"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

export default function SigninComponent() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const signupSchema = z.object({
    email: z.string().email("Enter a valid email address"),
    password: z.string(),
  });

  type signupType = z.infer<typeof signupSchema>;
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<signupType>({
    resolver: zodResolver(signupSchema),
  });

  const signupUser: SubmitHandler<signupType> = async (data) => {
    console.log(data);
  };

  return (
    <article className="flex h-screen items-center justify-center bg-green-200">
      <Navbar />
      <form
        onSubmit={handleSubmit(signupUser)}
        className="flex w-11/12 max-w-md flex-col gap-6 rounded-md bg-white p-10 md:px-16 md:py-10 "
      >
        <h2>Sign In</h2>
        <div>
          <Input type="email" placeholder="Email" {...register("email")} />
          {errors.email && (
            <p className="italic text-red-500"> {errors.email.message} </p>
          )}
        </div>
        <div>
          <div className="relative">
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 "
              onClick={() => setIsPasswordShown((prevState) => !prevState)}
            >
              {isPasswordShown ? <Eye /> : <EyeOff />}
            </button>
            <Input
              type={isPasswordShown ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
            />
          </div>

          {errors.password && (
            <p className="italic text-red-500"> {errors.password.message} </p>
          )}
        </div>
        <Button>
          {isSubmitting ? <Loader2 className="animate-spin" /> : "  Sign In"}
        </Button>
        <div className="flex items-center gap-5">
          <p>Are you New? </p>
          <Link
            href="/auth/signup"
            className="rounded-sm bg-green-800 px-4 py-2 text-white"
          >
            Sign up Here
          </Link>
        </div>
      </form>
    </article>
  );
}
