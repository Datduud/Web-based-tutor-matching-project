import { currentUser } from "@/lib/current-user";
import { Hero } from "@/components/tutorHomePageComponents/hero";
const TutorMainPage = async () => {
  const current = await currentUser();
  return(
    <Hero user={current}/>
  )
};

export default TutorMainPage;
