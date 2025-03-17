import Image from "next/image";
import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { currentUser } from "@/lib/current-user";
import { FaStar } from "react-icons/fa";
import ScheduleButton from "./schedule-button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

interface ProfilePageProps {
  params: {
    profileId: string;
  };
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const current = await currentUser();
  const user = await db.user.findUnique({
    where: {
      id: params.profileId,
      role: "TUTOR",
    },
  });

  if (!user) {
    return <>404 not found a tutor with this id</>;
  }

  const userSubjects = await db.usersSubjects.findMany({
    where: {
      userId: params.profileId,
    },
    include: {
      subject: true,
    },
  });

  const qualifications = await db.qualification.findMany({
    where: {
      userId: params.profileId,
    },
  });

  const availableTimes = await db.availableTime.findMany({
    where: {
      userId: params.profileId,
    },
    orderBy: [{ weekDay: "asc" }],
  });
  const review = await db.review.findMany({
    where: {
      receiverId: params.profileId,
    },
    include: {
      sender: true,
      receiver: true,
    },
  });
  const StarRating = ({ rating }: { rating: number }) => (
    <div className="star-rating flex gap-3 mt-1">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={`h-4 w-4 ${
            index + 1 <= rating ? "text-yellow-500" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  const daysOfWeekMap = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday",
  };

  return (
    <>
      <div className="profile-container px-10">
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
            <h2 className="font-semibold text-4xl text-center ">
              {user?.name}
            </h2>
            <Separator />
            <ScheduleButton
              tutorName={user.name}
              tutorId={user.id}
              availableTimes={availableTimes}
            />
            <div className="flex gap-2 w-full items-center justify-start flex-wrap mb-5">
              <span>Subjects: </span>
              {userSubjects.map((subject) => (
                <Badge key={subject.subject.id} className="w-fit h-6">
                  {subject.subject.name}
                </Badge>
              ))}
            </div>
            <Separator />
            <div className="flex flex-col w-full mt-5">
              <h2 className="w-full font-semibold text-2xl">Reviews: </h2>
              {review
                .filter((reviewItem) => reviewItem.rating > 3)
                .map((reviewItem) => (
                  <div
                    className="flex flex-col mt-5 border-2 shadow-md rounded-md"
                    key={reviewItem.id}
                  >
                    <div className="ml-3 my-3">
                      <div className="flex flex-row">
                        <div className="mr-2">
                          <Image
                            src={reviewItem.sender.imageUrl}
                            alt="user image"
                            className="rounded-full object-cover"
                            width={50}
                            height={50}
                          />
                        </div>
                        <div className="flex flex-col">
                          <p className="font-semibold text-lg">
                            {reviewItem.sender.name}
                          </p>
                          <StarRating rating={reviewItem.rating} />
                        </div>
                      </div>
                      <p className="mt-3">{reviewItem.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="description-container basis-3/4 min-h-[800px] w-full mt-16 md:mt-0  ml-0 md:ml-16 flex flex-col gap-3">
            <h2 className="w-full font-semibold text-2xl">Description</h2>
            <h3 className="w-full mb-5">{user?.description}</h3>
            <Separator />
            <h2 className="w-full font-semibold text-2xl mt-5">
              Qualification
            </h2>
            <div className="qualification-container flex justify-center mb-5">
              <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                <div className="flex w-max space-x-4 p-4">
                  {qualifications.map((qualification) => (
                    <div
                      className="overflow-hidden rounded-md shrink-0"
                      key={qualification.id}
                    >
                      <Image
                        src={qualification.imageUrl}
                        alt="haha"
                        className="aspect-[4/4] rounded-md  object-cover self-center"
                        width={300}
                        height={200}
                      />
                      <div className="w-full">
                        <p className="text-center mt-2">
                          {qualification.qualification_name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
            <Separator />
            <div className="schedule-container mt-5">
              <div className="flex justify-between">
                <h2 className="font-semibold text-2xl ">Available time</h2>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Index</TableHead>
                    <TableHead>Start time</TableHead>
                    <TableHead>End time</TableHead>
                    <TableHead>Weekday</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {availableTimes.length === 0 ? (
                    <></>
                  ) : (
                    <>
                      {availableTimes.map((availableTime, index) => (
                        <TableRow key={availableTime.id}>
                          <TableCell className="font-medium">
                            AT0{index}
                          </TableCell>
                          <TableCell>{availableTime.startTime}</TableCell>
                          <TableCell>{availableTime.endTime}</TableCell>
                          <TableCell>
                            {/* @ts-ignore */}
                            {daysOfWeekMap[availableTime.weekDay]}
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
