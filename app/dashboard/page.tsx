import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <section className="grid grid-cols-12 pt-16">
        <div className="col-span-6  ">
          <h2 className="mb-6 text-5xl text-green-950">
            Your Previous Performance
          </h2>
        </div>
        <div className="col-span-6">
          <Image
            src="/img/wave.png"
            alt="wave"
            width={2200}
            height={2200}
            className="w-full"
          />
        </div>
      </section>
    </div>
  );
}
