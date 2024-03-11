import Navbar from "@/components/Navbar";
import SigninComponent from "@/components/SigninComponent";
import SignupComponent from "@/components/SignupComponent";

export default function AuthPage() {
  return (
    <div>
      <Navbar />
      <SignupComponent />
      <SigninComponent />
    </div>
  );
}
