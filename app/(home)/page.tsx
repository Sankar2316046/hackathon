import Image from "next/image";
import Hero from "./sections/Hero";
import TodayDeal from "./sections/TodayDeal";
import Add_to_cart from "./sections/add_to_cart";

export default function Home() {
  return (
  <>
    <Hero />
    {/* <TodayDeal /> */}
    <Add_to_cart/>
  </>
  );
}
