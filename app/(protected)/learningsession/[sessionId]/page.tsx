import LiveCall from "@/components/live-call";
import { currentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import BackButton from "./back-button";
import { db } from "@/lib/db";

interface LearningSessionProps {
  params: {
    sessionId: string;
  };
}
const LearningSession = async ({ params }: LearningSessionProps) => {
  const user = await currentUser();
  if (!user) {
    return redirect("/");
  }

  const learningSession = await db.learningSession.findUnique({
    where: {
      id: params.sessionId,
      ...(user.role === "TUTOR" && { tutorId: user.id }),
      ...(user.role === "STUDENT" && { studentId: user.id }),
    },
  });
  if (!learningSession) {
    return redirect("/");
  }

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="bg-black">
          <BackButton />
        </div>
        <LiveCall sessionId={params.sessionId} username={user?.name}/>
      </div>
    </>
  );
};

export default LearningSession;
