"use client"

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { Sparkle } from "lucide-react";

interface WriteReviewButtonProps {
  senderId: string;
  receiverId: string;
  sessionId: string;
}

const WriteReviewButton = ({ senderId, receiverId, sessionId }: WriteReviewButtonProps) => {
  const { onOpen } = useModal();
  return (
    <Button className="w-1/2 md:w-36" onClick={() => onOpen("review", {senderId, receiverId, sessionId})}>
      <Sparkle className="mr-2" /> Review
    </Button>
  );
};

export default WriteReviewButton;
