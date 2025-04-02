import Image from "next/image";
import Hero from "./sections/Hero";
import TodayDeal from "./sections/TodayDeal";

export default function Home() {
  return (
    <div className="w-full h-full overflow-hidden">
    <Hero />
    <TodayDeal />
    </div>

  );
}
