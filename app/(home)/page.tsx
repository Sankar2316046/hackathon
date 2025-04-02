import Hero from "./sections/Hero";
import TodayDeal from "./sections/TodayDeal";
import CarouselSection1 from "./sections/CarouselSection1";
import CarouselSection2 from "./sections/CarouselSection2";


export default function Home() {
  return (
    <div className="w-full h-full overflow-hidden">
    <Hero />
 
    <CarouselSection1/>
 
   
    <TodayDeal />
    </div>

  );
}
