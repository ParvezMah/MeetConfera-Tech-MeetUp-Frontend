import { Hero } from "@/components/modules/Home/Hero";
import Steps from "@/components/modules/Home/Steps";
import Testimonials from "@/components/modules/Home/Testimonials";
import TopRatedSpeakers from "@/components/modules/Home/TopRatedSpeakers";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <TopRatedSpeakers />
        <Steps />
        <Testimonials />
      </main>
    </>
  );
}
