"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { AvailableTime } from "@prisma/client";

interface ScheduleButtonProps {
  tutorId: string;
  tutorName: string;
  availableTimes: AvailableTime[];
}
const ScheduleButton = ({
  tutorName,
  availableTimes,
  tutorId,
}: ScheduleButtonProps) => {
  const { onOpen } = useModal();
  const tutorInfo = { tutorName, availableTimes, tutorId };
  return (
    <Button
      className="w-full bg-green-600 text-lg mt-5"
      onClick={() => onOpen("schedule", { tutorInfo: tutorInfo })}
    >
      Schedule this tutor
    </Button>
  );
};

export default ScheduleButton;
