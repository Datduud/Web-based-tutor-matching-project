import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "../../api/auth/[...nextauth]/options";
import { db } from "@/lib/db";

const SetUpPage = async () => {
  const session = await getServerSession(options);
  if (!session) {
    return redirect("/");
  }
  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return redirect("/setup/profile");
  }

  if (user.role === "STUDENT") {
    return redirect("/student");
  }

  if (user.role === "TUTOR") {
    return redirect("/tutor");
  }
  return <></>;
};

export default SetUpPage;
