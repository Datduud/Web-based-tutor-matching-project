import { currentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";

const StudentLayout = async ({ children }: { children: React.ReactNode }) => {
  const current = await currentUser();
  if (current?.role !== "STUDENT") {
    return redirect("/");
  }
  return (
    <div>
      <Header user={current} />
      {children}
      <Footer />
    </div>
  );
};

export default StudentLayout;
