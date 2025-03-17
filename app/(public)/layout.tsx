import { currentUser } from "@/lib/current-user";
import Header from "../../components/header";
import Footer from "@/components/footer";
const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const current = await currentUser();
  return (
    <>
      <Header user={current} />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
