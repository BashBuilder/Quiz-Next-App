"use client";

import Navbar from "@/components/Navbar";
import SigninComponent from "@/components/SigninComponent";
import SignupComponent from "@/components/SignupComponent";
import { useState } from "react";

export default function AuthPage() {
  const [isSignupPage, setIsSignupPage] = useState(true);

  return (
    <div>
      <Navbar />
      {isSignupPage ? (
        <SignupComponent setIsSignupPage={setIsSignupPage} />
      ) : (
        <SigninComponent setIsSignupPage={setIsSignupPage} />
      )}
    </div>
  );
}
