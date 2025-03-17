import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";

const formSchema = z.object({
  description: z.string(),
});

const ReviewModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const openModalState = isOpen && type === "review";
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await axios.post(`/api/review`, {
        senderId: data.senderId,
        receiverId: data.receiverId,
        sessionId: data.sessionId,
        description: values.description,
        rating: rating
    });
    // console.log({
    //   senderId: data.senderId,
    //   receiverId: data.receiverId,
    //   description: values.description,
    //   rating: rating,
    // });
    onClose();
    form.reset();
    router.refresh();
  };
  const handleClose = () => {
    onClose();
    setRating(0);
    form.reset();
  };
  const [rating, setRating] = useState(0);

  return (
    <Dialog open={openModalState} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Review</DialogTitle>
        </DialogHeader>
        <div className="star-rating flex justify-center gap-3">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={`h-12 w-12 cursor-pointer ${
                index + 1 <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => {
                setRating(index + 1);
              }}
            />
          ))}
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">
                    What&apos; your feedback?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your message here."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex items-end">
              <Button
                disabled={isLoading}
                type="submit"
                className="w-24 bg-green-600"
              >
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
