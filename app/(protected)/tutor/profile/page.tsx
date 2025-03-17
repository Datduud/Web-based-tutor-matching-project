import { currentUser } from "@/lib/current-user";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import DisplayReview from "@/components/tutorProfileComponents/display-review";
import DisplaySubject from "@/components/tutorProfileComponents/display-subject";
import DisplayQualification from "@/components/tutorProfileComponents/display-qualification";
import DisplaySchedule from "@/components/tutorProfileComponents/display-schedule";
import ChangeAvatarButton from "./change-avatar-button";
import DisplayEarnings from "@/components/tutorProfileComponents/display-earnings";
import EditDescriptionButton from "./edit-description-button";
import { Separator } from "@/components/ui/separator";
import EditNameButton from "./edit-name-button";

const TutorProfilePage = async () => {
  const user = await currentUser();

  const subjects = await db.usersSubjects.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      subject: true,
    },
  });

  const allSubjects = await db.subject.findMany({
    where: {
      NOT: {
        id: {
          in: subjects.map((userSubject) => userSubject.subject.id),
        },
      },
    },
  });

  const sessions = await db.learningSession.findMany({
    where: {
      tutorId: user?.id,
    },
    include: {
      tutor: true,
    },
  });

  const qualifications = await db.qualification.findMany({
    where: {
      userId: user?.id,
    },
  });

  const availableTimes = await db.availableTime.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: [
      {
        weekDay: "asc",
      },
    ],
  });

  const review = await db.review.findMany({
    where: {
      receiverId: user?.id,
    },
    include: {
      sender: true,
      receiver: true,
    },
  });
  return (
    <div className="profile-container px-10 mb-10">
      <div className="top-section mt-5 flex flex-col md:flex-row">
        <div className="avatar-container basis-1/4 flex items-center flex-col gap-3">
          <div className="w-64 h-64 relative">
            <Image
              // @ts-ignore
              src={user?.imageUrl}
              fill
              alt="hello"
              className="rounded-full block object-cover"
            />
          </div>
          <h2 className="font-semibold text-4xl text-center">{user?.name}</h2>
          <div className="w-full">
            <Separator />
          </div>
          <EditNameButton name={user?.name} userId={user?.id} />
          <ChangeAvatarButton user={user} />
          
          <div className="flex gap-2 w-full items-center justify-start flex-wrap mb-5">
            <span>Subjects: </span>
            <DisplaySubject
              subjects={subjects}
              user={user}
              allSubjects={allSubjects}
            />
          </div>
          <div className="w-full">
            <Separator />
          </div>
          <div className="flex flex-col w-full mt-5">
            <h2 className="w-full font-semibold text-2xl">Reviews: </h2>
            <DisplayReview review={review} />
          </div>
        </div>

        <div className="description-container basis-3/4 min-h-[800px] max-w-[100%] md:max-w-[75%] mt-16 md:mt-0  ml-0 md:ml-16 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-2xl">Description</h2>
            <EditDescriptionButton
              description={user?.description}
              userId={user?.id}
            />
          </div>
          <h3 className="w-full mb-5">{user?.description}</h3>
          <Separator />
          <h2 className="w-full font-semibold text-2xl mt-5">Qualification</h2>
          <div className="qualification-containe w-full flex justify-center mb-5">
            <DisplayQualification user={user} qualifications={qualifications} />
          </div>
          <Separator />
          <div className="schedule-container my-5">
            <DisplaySchedule availableTimes={availableTimes} user={user} />
          </div>
          <Separator />
          <div className="flex flex-col w-full my-5">
            <h2 className="w-full font-semibold text-2xl mb-3">
              Your earnings:{" "}
            </h2>
            <DisplayEarnings
              availableTimes={availableTimes}
              user={user}
              sessions={sessions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfilePage;
