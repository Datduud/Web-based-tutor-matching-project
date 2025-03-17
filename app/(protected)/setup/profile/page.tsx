"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import { BookA, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as z from "zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  description: z.string().optional(),
  costPerHour: z
    .string()
    .refine(
      (value) => {
        const parsedValue = parseInt(value);
        return !isNaN(parsedValue);
      },
      {
        message: "Cost per hour must be a valid integer.",
      }
    )
    .optional(),
  subject: z.string(),
});

const SetupProfile = () => {
  const [mounted, setMounted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [subjects, setSubjects] = useState<any[]>([]);
  const user = useSession().data?.user;
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      costPerHour: "0",
      subject: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/profiles`,
      {
        id: user?.id,
        name: user?.name,
        image: user?.image,
        email: user?.email,
        role: "tutor",
        description: values.description,
        costPerHour: values.costPerHour,
        subjectId: values.subject,
      }
    );
    router.push("/");
  }
  const handleConfirm = () => {
    if (selectedOption === "tutor") {
      setIsConfirmed(true);
    } else if (selectedOption === "student") {
      axios
        .post(`${process.env.NEXT_PUBLIC_URL}/api/profiles`, {
          id: user?.id,
          name: user?.name,
          image: user?.image,
          email: user?.email,
          role: "student",
        })
        .then((response) => {
          console.log(response.data);
          router.push("/");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/api/subjects`
      );
      setSubjects(data);
      setMounted(true);
    }
    fetchData();
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="h-screen w-full flex items-center justify-center">
        <Card className={`${isConfirmed ? "hidden" : ""} w-1/2`}>
          <CardContent>
            <CardHeader>
              <CardTitle className="text-center text-3xl">
                Join as a student or tutor
              </CardTitle>
            </CardHeader>
            <div className="flex flex-col gap-3 md:flex-row w-full">
              <div
                className={`flex-1 flex flex-col gap-2 rounded-lg cursor-pointer p-5 ${
                  selectedOption === "student"
                    ? "border-2 border-black"
                    : "border-2 border-gray-300 hover:border-black"
                }`}
                onClick={() => setSelectedOption("student")}
              >
                <div className="w-full flex justify-center">
                  <BookA className="w-16 h-16 block" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-center">
                    I am a student 
                  </p>
                </div>
              </div>

              <div
                className={`flex-1 flex flex-col rounded-lg gap-2 cursor-pointer p-5 ${
                  selectedOption === "tutor"
                    ? "border-2 border-black"
                    : "border-2 border-gray-300 hover:border-black"
                }`}
                onClick={() => setSelectedOption("tutor")}
              >
                <div className="w-full flex justify-center">
                  <GraduationCap className="w-16 h-16 block" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-center">
                    I am a tutor 
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center mt-8">
              <Button className="w-1/2 bg-green-600" onClick={handleConfirm}>
                Confirm
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className={`${isConfirmed ? "" : "hidden"} w-1/2`}>
          <CardHeader>
            <CardTitle className="text-center text-3xl mb-5">
              Tell us a little bit about yourself
            </CardTitle>
          </CardHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 px-10"
            >
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">
                      Introduce yourself to the students
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
              <FormField
                control={form.control}
                name="costPerHour"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">
                      How much you would like to charge per hour ? (in $)
                    </FormLabel>
                    <Input type="number" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">
                      Choose one of your specialality (You can modify it later)
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem value={subject.id} key={subject.id}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardFooter className="flex justify-end">
                <Button disabled={isLoading} type="submit" className="w-24">
                  Submit
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default SetupProfile;
