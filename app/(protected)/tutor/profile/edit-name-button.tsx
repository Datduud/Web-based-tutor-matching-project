"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";


interface EditNameProps {
  name: string | undefined | null;
  userId: string | undefined | null;
}
const EditNameButton = ({ name, userId }: EditNameProps) => {
  const { onOpen } = useModal();
  return (
    <Button
      className="w-full bg-green-600 mt-3"
      onClick={() => onOpen("editName", { name, userId })}
    >
      Edit name
    </Button>
  );
};

export default EditNameButton;
