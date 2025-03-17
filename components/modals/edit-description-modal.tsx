"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const EditDescriptionModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const modalOpenState = isOpen && type === "editDescription";
  const [loading, setLoading] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const router = useRouter();
  const handleClose = () => {
    onClose();
  };

  const handleDescriptionChange = (event: any) => {
    setNewDescription(event.target.value);
  };

  useEffect(() => {

    if (data.description) {
      setNewDescription(data.description);
    }
  }, [data]);

  const handleUpdateDescription = async () => {
    try {
      
      setLoading(true);
      await axios.patch(
        `/api/tutors?description=${newDescription}&userId=${data.userId}`
      );
      setLoading(false);
      onClose();
      router.refresh();
    } catch (error) {
      console.error("Error updating description:", error);
      alert("There is a problem updating your description");
      setLoading(false);
    }
  };

  return (
    <Dialog open={modalOpenState} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Edit Description
          </DialogTitle>
        </DialogHeader>
        <Textarea
          value={newDescription}
          onChange={handleDescriptionChange}
          className="min-h-[200px]"
        />
        <DialogFooter>
          <Button
            variant={"default"}
            disabled={loading}
            onClick={handleUpdateDescription}
          >
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDescriptionModal;
