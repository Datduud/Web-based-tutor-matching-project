import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const ProfileModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const openModalState = isOpen && type === "profile";
  const { user } = data;
  return (
    <Dialog open={openModalState} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex justify-center items-center">
          <DialogTitle className="mb-2">Your information</DialogTitle>
          <div className="flex flex-col gap-2 justify-center items-center text-black">
            <Avatar className="w-20 h-20">
              <AvatarImage
                className="object-cover"
                src={user?.imageUrl ?? "https://github.com/shadcn.png"}
              />
              <AvatarFallback>PRF</AvatarFallback>
            </Avatar>
            <div>Name: {user?.name}</div>
            <div>Email: {user?.email}</div>
            <Button onClick={() => signOut()}>Sign out</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
