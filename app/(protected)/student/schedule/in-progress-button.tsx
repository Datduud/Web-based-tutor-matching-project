"use client";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface StudentInProgressButtonProps {
  sessionId: string;
}

const StudentInProgressButton = ({
  sessionId,
}: StudentInProgressButtonProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <div className="w-[147.06px] md:w-full">
      <HoverCard>
        <HoverCardTrigger>
          <Button
            disabled={loading}
            className="w-full"
            onClick={() => {
              setLoading(true);
              axios
                .patch("/api/learningsession", {
                  sessionId,
                  newStatus: "COMPLETED",
                })
                .then((response) => {
                  console.log(response);
                  setLoading(false);
                  router.refresh();
                });
            }}
          >
            Complete
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="" side="right">
          After completing the session, click this
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default StudentInProgressButton;
