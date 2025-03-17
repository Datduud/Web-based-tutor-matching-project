"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IncomingRequestButtonProps {
  sessionId: string;
}
const IncomingRequestButton = ({ sessionId }: IncomingRequestButtonProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <>
      <Button
        disabled={loading}
        className="bg-green-700 w-1/2 md:w-full"
        onClick={() => {
          setLoading(true);
          axios
            .patch("/api/learningsession", {
              sessionId,
              newStatus: "INPROGRESS",
            })
            .then((response) => {})
            .finally(() => {
              setLoading(false);
              router.refresh();
            });
        }}
      >
        Accept
      </Button>
      <Button
        disabled={loading}
        variant="destructive"
        className="w-1/2 md:w-full"
        onClick={() => {
          setLoading(true);
          axios
            .patch("/api/learningsession", {
              sessionId,
              newStatus: "REJECTED",
            })
            .then((response) => {})
            .finally(() => {
              setLoading(false);
              router.refresh();
            });
        }}
      >
        Decline
      </Button>
    </>
  );
};

export default IncomingRequestButton;
