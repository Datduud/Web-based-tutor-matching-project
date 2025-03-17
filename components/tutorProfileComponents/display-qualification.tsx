"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Plus } from "lucide-react";
import { Qualification, User } from "@prisma/client";
import { useModal } from "@/hooks/use-modal";

interface DisplayQualificationProps {
  qualifications: Qualification[];
  user: User | null;
}

const DisplayQualification = ({
  qualifications,
  user,
}: DisplayQualificationProps) => {
  const { onOpen } = useModal();
  return (
    <>
      <ScrollArea className="w-full rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          {qualifications.map((qualification) => (
            <div
              className="overflow-hidden rounded-md flex flex-col cursor-pointer"
              key={qualification.id}
              onClick={() => onOpen("editQualification", { qualification })}
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

          <div
            onClick={() => onOpen("addQualification", { user })}
            className="overflow-hidden cursor-pointer flex justify-center items-center rounded-md shrink-0 border w-[300px] h-[300px]"
          >
            <Plus className="w-12 h-12" />
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
};

export default DisplayQualification;
