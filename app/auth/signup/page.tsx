"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import z from "zod";
import { auth, db } from "@/lib/config";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
  const router = useRouter();

  const signupSchema = z
    .object({
      email: z.string().email("Enter a valid email address"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .refine(
          (value) => /[A-Z]/.test(value),
          "Password must contain at least one uppercase letter",
        )
        .refine(
          (value) => /\d/.test(value),
          "Password must contain at least one number",
        )
        .refine(
          (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
          "Password must contain at least one special character",
        ),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords must match",
      path: ["confirmPassword"],
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
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const userId = user.user.uid;
      await sendEmailVerification(user.user);
      if (user.user.emailVerified) {
        const usersDb = await collection(db, "users");
        await addDoc(usersDb, { userId: userId, userEmail: user.user.email });
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className="flex h-screen items-center justify-center bg-green-200">
      <form
        onSubmit={handleSubmit(signupUser)}
        className="flex w-11/12 max-w-md flex-col gap-6 rounded-md bg-white p-10 md:px-16 md:py-10 "
      >
        <h2>Sign Up</h2>
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
        <div>
          <div className="relative">
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-200 "
              onClick={() =>
                setIsConfirmPasswordShown((prevState) => !prevState)
              }
            >
              {isConfirmPasswordShown ? <Eye /> : <EyeOff />}
            </button>
            <Input
              type={isConfirmPasswordShown ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
          </div>
          {errors.confirmPassword && (
            <p className="italic text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <Button>
          {isSubmitting ? <Loader2 className="animate-spin" /> : "  Sign Up"}
        </Button>
        <div className="flex items-center gap-5">
          <p>Already have an Account? </p>
          <Link
            href="/auth/signin"
            className="rounded-sm bg-green-800 px-4 py-2 text-white"
          >
            Login Here
          </Link>
        </div>
      </form>
    </article>
  );
}
