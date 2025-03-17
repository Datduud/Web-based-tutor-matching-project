"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SingleImageDropzone } from "@/components/imageUpload";
import { useModal } from "@/hooks/use-modal";
import { useState } from "react";
import * as z from "zod";
import { useEdgeStore } from "@/lib/edgestore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  qualificationName: z.string().min(5, {
    message: "Please enter qualification name",
  }),
  qualificationDescription: z.string().min(10, {
    message: "Please enter the description",
  }),
  qualificationImageUrl: z.string().min(5, {
    message: "Upload an image",
  }),
});

const AddQualificationModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const { edgestore } = useEdgeStore();
  const modalOpenState = isOpen && type === "addQualification";
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      qualificationName: "",
      qualificationDescription: "",
      qualificationImageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await axios.post(`/api/qualifications`, {
      userId: data.user?.id,
      qualificationName: values.qualificationName,
      qualificationImageUrl: values.qualificationImageUrl,
      qualificationDescription: values.qualificationDescription,
    });
    onClose();
    setProgress(0);
    setFile(undefined);
    form.reset();
    if (response.status === 200) {
      router.refresh();
    }
  };
  const handleClose = () => {
    onClose();
    setProgress(0);
    setFile(undefined);
    form.reset();
  };
  return (
    <Dialog open={modalOpenState} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Add qualification
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="qualificationImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="w-full flex flex-col items-center">
                      <SingleImageDropzone
                        width={300}
                        height={200}
                        value={file}
                        onChange={(file) => {
                          setFile(file);
                        }}
                      />
                      <Progress
                        value={progress}
                        className="w-[300px]"
                        indicatorColor="bg-green-600"
                      />
                      <Button
                        type="button"
                        className="w-[300px] mt-2"
                        onClick={async () => {
                          if (file) {
                            const res = await edgestore.myPublicImages.upload({
                              file,
                              input: { type: "qualification" },
                              onProgressChange: (progress) => {
                                setProgress(progress);
                              },
                            });
                            form.setValue("qualificationImageUrl", res.url);
                            alert("Upload completed");
                          }
                        }}
                      >
                        Upload
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="qualificationName"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Qualification Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the name of qualifications"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="qualificationDescription"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Qualification Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder="Enter the description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-5">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-green-600"
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

export default AddQualificationModal;
