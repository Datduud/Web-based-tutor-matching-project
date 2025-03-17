"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";

interface EditDescriptionProps {
  description: string | undefined | null;
  userId: string | undefined | null;
}

const EditDescriptionButton = ({
  description,
  userId,
}: EditDescriptionProps) => {
  const { onOpen } = useModal();
  return (
    <Button
      className="inline-block bg-green-600"
      onClick={() => onOpen("editDescription", { description, userId })}
    >
      Edit description
    </Button>
  );
};

export default EditDescriptionButton;
