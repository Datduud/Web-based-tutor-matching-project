"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useModal } from "@/hooks/use-modal";
import { AvailableTime, User } from "@prisma/client";
interface DisplayScheduleProps {
  user: User | null;
  availableTimes: AvailableTime[];
}

const DisplaySchedule = ({ user, availableTimes }: DisplayScheduleProps) => {
  const { onOpen } = useModal();
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
      <div className="flex justify-between">
        <h2 className="font-semibold text-2xl ">Your available time: </h2>
        <Button
          className="bg-green-600"
          onClick={() => onOpen("addAvailableTime", { user })}
        >
          Add an available time
        </Button>
      </div>
      <Table>
        {availableTimes.length === 0 && (
          <TableCaption>
            There is no available times for you, try adding some
          </TableCaption>
        )}

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
                  <TableCell className="font-medium">AT0{index}</TableCell>
                  <TableCell>{availableTime.startTime}</TableCell>
                  <TableCell>{availableTime.endTime}</TableCell>
                  {/* @ts-ignore */}
                  <TableCell>{daysOfWeekMap[availableTime.weekDay]}</TableCell>
                  <TableCell
                    className="text-right cursor-pointer"
                    onClick={() =>
                      onOpen("deleteAvailableTime", {
                        availableTime: availableTime,
                      })
                    }
                  >
                    <Trash />
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default DisplaySchedule;
