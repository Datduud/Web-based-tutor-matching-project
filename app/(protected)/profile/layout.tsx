import { currentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import Header from "../../../components/header";
import Footer from "@/components/footer";

const ProfileLayout = async ({ children }: { children: React.ReactNode }) => {
  const current = await currentUser();
  if (!current) {
    return redirect("/");
  }
  return (
    <>
      <Header user={current} />
      {children}
      <Footer />
    </>
  );
};

export default ProfileLayout;
