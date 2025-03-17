import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const SignInModal = () => {
  const { isOpen, onClose, type } = useModal();
  const openModalState = isOpen && type === "signIn";
  return (
    <Dialog open={openModalState} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex justify-center items-center">
          <DialogTitle className="text-2xl">Sign In</DialogTitle>
        </DialogHeader>
        <div>
          <Button className="w-full" onClick={() => signIn("google")}>
            <span className="mr-3 flex items-center justify-center">
              <FontAwesomeIcon icon={faGoogle} className="w-5 h-5" />
            </span>
            Sign in with Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;
