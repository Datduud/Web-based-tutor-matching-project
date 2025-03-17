"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

const DeleteSubjectModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const modalStateOpen = isOpen && type === "deleteSubject";
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <Dialog open={modalStateOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Are you sure you want to delete{" "}
            {data.subjectToDelete && data.subjectToDelete.name} ?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={loading}
            variant={"destructive"}
            onClick={() => {
              setLoading(true);
              axios
                .delete(
                  `/api/usersubject?subjectId=${data.subjectToDelete.id}&userId=${data.user?.id}`
                )
                .then((response) => {
                  console.log(response);
                  setLoading(false);
                  onClose();
                  router.refresh();
                });
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteSubjectModal;
