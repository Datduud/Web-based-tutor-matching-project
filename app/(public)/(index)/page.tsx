import Hero from "@/components/homePageComponents/hero";
import CardsDisplay from "@/components/homePageComponents/cards-display";
import SetApartDisplay from "@/components/homePageComponents/set-apart-display";
import { currentUser } from "@/lib/current-user";
import BestTeacherDisplay from "@/components/homePageComponents/best-teacher-display";
import InfiniteScroll from "../../../components/homePageComponents/infinite-scoll";

const HomePage = async () => {
  const current = await currentUser();
  return (
    <div>
      <Hero user={current} />
      <CardsDisplay />
      <InfiniteScroll />
      <BestTeacherDisplay />
      <SetApartDisplay />
    </div>
  );
};

export default HomePage;
