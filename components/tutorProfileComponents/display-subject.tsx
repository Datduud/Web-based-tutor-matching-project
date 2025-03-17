"use client";
import { UserSubjectsWithSubjects } from "@/type";
import { Badge } from "@/components/ui/badge";
import { useModal } from "@/hooks/use-modal";
import { Subject, User } from "@prisma/client";
import { Plus, TrashIcon } from "lucide-react";
import { useState } from "react";

interface DisplaySubjectProps {
  subjects: any[];
  allSubjects: Subject[];
  user: User | null;
}
const DisplaySubject = ({
  subjects,
  allSubjects,
  user,
}: DisplaySubjectProps) => {
  const { onOpen } = useModal();
  const [hoveredSubjectId, setHoveredSubjectId] = useState<number | null>(null);

  const handleHover = (subjectId: number | null) => {
    setHoveredSubjectId(subjectId);
  };

  const isSubjectHovered = (subjectId: number) => {
    return subjectId === hoveredSubjectId;
  };

  return (
    <>
      {subjects.map((subject) => (
        <Badge
          key={subject.subject.id}
          className="w-fit h-6 relative cursor-pointer hover:bg-red-500 ease-in-out duration-100 transition"
          onMouseEnter={() => handleHover(subject.subject.id)}
          onMouseLeave={() => handleHover(null)}
        >
          <p
            className={`${
              isSubjectHovered(subject.subject.id) ? "invisible" : ""
            }`}
          >
            {subject.subject.name}
          </p>
          {isSubjectHovered(subject.subject.id) && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              onClick={() =>
                onOpen("deleteSubject", {
                  subjectToDelete: subject.subject,
                  user,
                })
              }
            >
              <TrashIcon className="w-5 h-5" />
            </div>
          )}
        </Badge>
      ))}
      <Badge
        className="w-16 h-6 flex justify-center cursor-pointer"
        onClick={() => onOpen("addSubject", { user, allSubjects })}
      >
        <Plus />
      </Badge>
    </>
  );
};

export default DisplaySubject;
