import { currentUser } from "@/lib/current-user";
import { Hero } from "@/components/studentHomePageComponents/hero";

const StudentMainPage = async () => {
  const current = await currentUser();
  return <Hero user={current} />;
};

export default StudentMainPage;
