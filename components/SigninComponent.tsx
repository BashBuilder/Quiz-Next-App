"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { SignupComponentType } from "./SignupComponent";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/config";
import { useRouter } from "next/router";

export default function SigninComponent({
  setIsSignupPage,
}: SignupComponentType) {
  const router = useRouter();
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState("");

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

  const {
    register: register2,
    control: control2,
    handleSubmit: handlesubmit2,
    formState: { isSubmitting: isSubmitting2 },
  } = useForm();

  const handleResetPassword = async (data: any) => {
    try {
      await sendPasswordResetEmail(auth, data.email);
      setIsPasswordReset(false);
    } catch (error) {
      // @ts-ignore
      const message = error.message;
      if (message.includes("network")) {
        setResetPasswordError("Check your Network connection");
      } else {
        setResetPasswordError("Try Agan");
      }
    }
  };

  const signupUser: SubmitHandler<signupType> = async (data) => {
    console.log(data);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push("/cbt/examform");
    } catch (error) {
      console.log(error);
      // @ts-ignore
      const message = error.message;
      if (message.includes("network")) {
        setLoginError("Check your Network connection");
      } else if (message.includes("invalid-credential")) {
        setLoginError("Wrong Email or Password");
      } else {
        setLoginError(message);
      }
    }
  };

  return (
    <article className="flex h-screen items-center justify-center bg-green-200">
      {isPasswordReset ? (
        <form
          onSubmit={handlesubmit2(handleResetPassword)}
          className="flex w-11/12 max-w-md flex-col gap-6 rounded-md bg-white p-10 md:px-16 md:py-10"
        >
          <h2 className="text-slate-800">Reset Password</h2>
          <Input
            type="email"
            placeholder="Enter your email address"
            {...register2("email")}
          />
          {resetPasswordError && (
            <p className="text-red-500">{resetPasswordError} </p>
          )}
          <Button type="submit">
            {isSubmitting2 ? <Loader2 className="animate-spin" /> : "Send Link"}
          </Button>

          <Button
            variant="link"
            type="button"
            className="text-left"
            onClick={() => setIsPasswordReset(false)}
          >
            Log In here
          </Button>
        </form>
      ) : (
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
              <p className="text-center italic text-red-500 ">
                {errors.password.message}
              </p>
            )}
          </div>
          {loginError && <p className="italic text-red-500"> {loginError} </p>}
          <Button>
            {isSubmitting ? <Loader2 className="animate-spin" /> : "  Sign In"}
          </Button>
          <div className="flex items-center justify-between gap-5">
            <p>Forgotten Password ? </p>
            <Button
              variant="link"
              type="button"
              onClick={() => setIsPasswordReset((prev) => !prev)}
            >
              Click here
            </Button>
          </div>
          <div className="flex items-center justify-between gap-5">
            <p>Are you New? </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsSignupPage((prev) => !prev)}
            >
              Sign up Here
            </Button>
          </div>
        </form>
      )}
    </article>
  );
}
