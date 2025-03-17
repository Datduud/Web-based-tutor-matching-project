"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { User } from "@prisma/client";

interface ChangeAvatarButtonProps {
  user: User | null;
}

const ChangeAvatarButton = ({ user }: ChangeAvatarButtonProps) => {
  const { onOpen } = useModal();
  return (
    <Button
      className="w-full bg-green-600 mt-1 mb-3"
      onClick={() => onOpen("changeAvatar", { user })}
    >
      Change profile picture
    </Button>
  );
};

export default ChangeAvatarButton;
