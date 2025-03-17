"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
import { Button } from "../ui/button";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const EditQualificationModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const modalOpenState = isOpen && type === "editQualification";
  const [loading, setLoading] = useState(false);
  const qualification = data.qualification;
  const router = useRouter();
  return (
    <Dialog open={modalOpenState} onOpenChange={onClose}>
      <DialogContent>
        <div className="flex justify-center items-center">
          <DialogHeader className="uppercase font-bold text-xl">
            Qualification Detail
          </DialogHeader>
        </div>
        <div className="relative w-full h-96">
          {qualification && qualification.imageUrl && (
            <Image
              fill
              alt="qualification image"
              src={qualification.imageUrl}
              className="object-fill"
            />
          )}
        </div>

        <div className="flex flex-col gap-8">
          <p>
            <span className="font-semibold">Qualification name: </span>
            {qualification && qualification.qualification_name}
          </p>
          <p>
            <span className="font-semibold">Description: </span>
            {qualification && qualification.description}
          </p>
        </div>

        <DialogFooter>
          <Button
            variant={"destructive"}
            onClick={() => {
              setLoading(true);
              axios
                .delete(
                  `/api/qualifications?qualificationId=${data.qualification?.id}&userId=${data.qualification?.userId}`
                )
                .then((response) => {
                  console.log(response);
                  setLoading(false);
                  onClose();
                  router.refresh();
                });
            }}
          >
            {" "}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditQualificationModal;
