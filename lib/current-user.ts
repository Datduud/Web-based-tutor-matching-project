import { options } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export const currentUser = async () => {
  const session = await getServerSession(options);

  if (!session) {
    return null;
  }
  const userId = session.user.id;

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
};
