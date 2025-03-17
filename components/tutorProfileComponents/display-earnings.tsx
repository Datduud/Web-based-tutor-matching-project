"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import { AvailableTime, User, LearningSession } from "@prisma/client";

interface DisplayEarningsProps {
  user: User | null;
  availableTimes: AvailableTime[];
  sessions: LearningSession[];
}

const DisplayEarnings = ({
  user,
  availableTimes,
  sessions,
}: DisplayEarningsProps) => {
  function getStartTime(inputString: string): string | null {
    // Extract the start time using regular expression
    const regexResult = /\((\d{2}:\d{2}) - \d{2}:\d{2}\)/.exec(inputString);

    // Check if the regex matched and get the start time
    const startTime = regexResult ? regexResult[1] : null;

    return startTime;
  }
  function getEndTime(inputString: string): string | null {
    // Extract the end time using regular expression
    const regexResult = /\(\d{2}:\d{2} - (\d{2}:\d{2})\)/.exec(inputString);

    // Check if the regex matched and get the end time
    const endTime = regexResult ? regexResult[1] : null;

    return endTime;
  }

  function parseIntervalTime(
    startTime: string,
    endTime: string
  ): string | null {
    const timeInterval = startTime + " - " + endTime;
    return timeInterval;
  }

  function calculateMoney(moneyPerHour: number, timeInterval: string): number {
    const [startTime, endTime] = timeInterval.split(" - ");

    // Assuming startTime and endTime are in HH:mm format
    const startParts = startTime.split(":").map(Number);
    const endParts = endTime.split(":").map(Number);

    // Check if parsing resulted in valid numbers
    if (
      isNaN(startParts[0]) ||
      isNaN(startParts[1]) ||
      isNaN(endParts[0]) ||
      isNaN(endParts[1])
    ) {
      console.error("Invalid time format:", startTime, endTime);
      return 0; // or handle this case as appropriate for your application
    }

    const [startHour, startMinute] = startParts;
    const [endHour, endMinute] = endParts;

    // Calculate the duration in hours
    const durationHours =
      (endHour - startHour + (endMinute - startMinute) / 60 + 24) % 24;

    // Check if the duration is a valid number
    if (isNaN(durationHours)) {
      console.error("Invalid duration:", durationHours);
      return 0; // or handle this case as appropriate for your application
    }

    // Calculate the total money
    const totalMoney = moneyPerHour * durationHours;

    return totalMoney;
  }
  const calculatedMoneyArray: number[] = [];
  return (
    <Table>
      {sessions.length === 0 && (
        <TableCaption>
          There is no session that is completed to calculate
        </TableCaption>
      )}

      <TableHeader>
        <TableRow>
          <TableHead>Session ID</TableHead>
          <TableHead>Start time</TableHead>
          <TableHead>End time</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sessions.length === 0 ? (
          <></>
        ) : (
          <>
            {sessions
              .filter((session) => session.status === "COMPLETED")
              .map((session) => {
                const money = calculateMoney(
                  user?.costPerHour ?? 0,
                  `${parseIntervalTime(
                    getStartTime(session.date) || "",
                    getEndTime(session.date) || ""
                  )}`
                );

                // Append the calculated money to the array
                calculatedMoneyArray.push(money);

                return (
                  <TableRow key={session.id}>
                    <TableCell>{session.id}</TableCell>
                    <TableCell>{getStartTime(session.date)}</TableCell>
                    <TableCell>{getEndTime(session.date)}</TableCell>
                    {/* @ts-ignore */}
                    <TableCell>
                      $
                      {calculateMoney(
                        user?.costPerHour ?? 0,
                        `${parseIntervalTime(
                          getStartTime(session.date) || "",
                          getEndTime(session.date) || ""
                        )}`
                      ).toFixed(2)}
                    </TableCell>
                  </TableRow>
                );
              })}
          </>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} className="font-bold">
            Total:
          </TableCell>
          <TableCell className="font-bold">
            ${calculatedMoneyArray.reduce((a, b) => a + b, 0).toFixed(2)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default DisplayEarnings;
