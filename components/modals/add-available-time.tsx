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
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  weekDay: z.string(),
  startTime: z
    .string()
    .refine((value) => /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value), {
      message: "Invalid start time format. Please use HH:mm (00:00 - 23:59)",
    }),
  endTime: z.string().refine((value) => /^\d{2}:\d{2}$/.test(value), {
    message: "Invalid end time format. Please use HH:mm (00:00 - 23:59)",
  }),
});

const AddAvailableTimeModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const { user } = data;
  const openModalState = isOpen && type === "addAvailableTime";
  const router = useRouter();
  const daysOfWeekMap = [
    { number: 1, day: "Monday" },
    { number: 2, day: "Tuesday" },
    { number: 3, day: "Wednesday" },
    { number: 4, day: "Thursday" },
    { number: 5, day: "Friday" },
    { number: 6, day: "Saturday" },
    { number: 7, day: "Sunday" },
  ];
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weekDay: "1",
      startTime: "",
      endTime: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    const { startTime, endTime } = values;

    const convertToMinutes = (time: string) => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    };

    const startMinutes = convertToMinutes(startTime);
    const endMinutes = convertToMinutes(endTime);
    if (startMinutes >= endMinutes) {
      alert("Start time must be smaller than end time");
      return;
    }
    try {
      const response = await axios.post(`/api/availabletimes`, {
        ...values,
        userId: user?.id,
      });
      onClose();
      form.reset();
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(`${error.response?.data}`);
      }
    }
    onClose();
    form.reset();
    router.refresh();
  };

  const handleClose = () => {
    onClose();
    form.reset();
  };

  return (
    <Dialog open={openModalState} onOpenChange={handleClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Add available times
          </DialogTitle>
        </DialogHeader>
        <div className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start time</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter start time, make sure they are HH:MM (00:00 - 23:59)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End time</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter end time, make sure they are HH:MM (00:00 - 23:59)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weekDay"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a weekday" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full">
                        {daysOfWeekMap.map((day) => (
                          <SelectItem
                            key={day.number}
                            value={day.number.toString()}
                          >
                            {day.day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAvailableTimeModal;
