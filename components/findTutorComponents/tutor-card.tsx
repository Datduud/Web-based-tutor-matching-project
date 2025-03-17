import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";

interface TutorCardProps {
  tutorInfo: any;
}

const TutorCard = ({ tutorInfo }: TutorCardProps) => {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="card-header flex justify-between">
          <div className="flex">
            <Avatar className="h-16 w-16">
              <AvatarImage src={tutorInfo.imageUrl} className="object-cover" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-xl text-green-600 font-semibold">
                {tutorInfo.name}
              </p>
              <p className="mt-2">
                <span className="font-semibold">${tutorInfo.costPerHour}</span>
                /hr
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <Link href={`/profile/${tutorInfo.id}`}>
              <Badge className="text-lg cursor-pointer bg-green-600">
                Visit profile
              </Badge>
            </Link>
          </div>
        </div>
        <ScrollArea className="h-24 mt-5">{tutorInfo.description}</ScrollArea>
        <ScrollArea className="mt-3 whitespace-nowrap">
          <div className="flex w-max ">
            {tutorInfo.subjects &&
              tutorInfo.subjects.map((subject: any) => (
                <Badge
                  key={subject.subject.id}
                  className="text-sm overflow-hidden mr-3"
                >
                  {subject.subject.name}
                </Badge>
              ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <div className="md:hidden mt-7 flex justify-center">
          <Link href={`/profile/${tutorInfo.id}`}>
            <Badge className="text-lg cursor-pointer bg-green-600 h-[40px]">
              Visit profile
            </Badge>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default TutorCard;
