"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const EditNameModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const modalOpenState = isOpen && type === "editName";
  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState("");
  const router = useRouter();
  const handleClose = () => {
    onClose();
  };
  const handleNameChange = (event: any) => {
    setNewName(event.target.value);
  };

  useEffect(() => {
    if (data.name) {
      setNewName(data.name);
    }
  }, [data]);

  const handleUpdateName = async () => {
    try {
      
      setLoading(true);
      await axios.patch(`/api/usersname?name=${newName}&userId=${data.userId}`);
      setLoading(false);
      onClose();
      router.refresh();
    } catch (error) {
      console.error("Error updating name:", error);
      alert("There is a problem updating your name");
      setLoading(false);
    }
  };
  return (
    <Dialog open={modalOpenState} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Edit Name</DialogTitle>
        </DialogHeader>
        <Input value={newName} onChange={handleNameChange} />
        <DialogFooter>
          <Button
            variant={"default"}
            disabled={loading}
            onClick={handleUpdateName}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditNameModal;
