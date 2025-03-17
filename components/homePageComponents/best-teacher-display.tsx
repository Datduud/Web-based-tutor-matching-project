"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

const cardData = [
  {
    tutor: "Mary Miller",
    icon: (
      <Avatar className="w-20 h-20">
        <AvatarImage src="/tutor2.jpg" alt="tutor image" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    subject: "CS Tutor",
    description:
      "With a passion for programming and technology, I bring a wealth of knowledge and practical experience to my computer science tutoring sessions. From algorithmic design to software development, I guide students through the intricacies of coding languages and problem-solving techniques. My goal is to foster a deep understanding of computer science concepts, preparing students for success in both academic coursework and real-world applications.",
  },
  {
    tutor: "John Wilson",
    icon: (
      <Avatar className="w-20 h-20">
        <AvatarImage src="/tutor.jpg" alt="tutor image" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    subject: "Physics Tutor",
    description:
      "As a physics tutor, I create an engaging learning environment where complex physical principles become accessible and exciting. I focus on demystifying challenging topics, employing hands-on experiments and visual aids to reinforce theoretical concepts. Whether it's classical mechanics, electromagnetism, or quantum physics, I am dedicated to helping students build a solid foundation and develop critical thinking skills to tackle physics with confidence.",
  },
  {
    tutor: "James Brown",
    icon: (
      <Avatar className="w-20 h-20">
        <AvatarImage src="/tutor3.jpg" alt="tutor image" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    subject: "Economics Tutor",
    description:
      "Bringing economics to life, I specialize in making economic theories relatable and applicable. With a comprehensive understanding of macro and microeconomics, I guide students through economic models, market structures, and policy analysis. My approach emphasizes real-world examples, encouraging students to connect economic concepts to current events and global issues. Together, we explore the intricate workings of economies, preparing students for academic success and a nuanced understanding of economic phenomena.",
  },
];

const BestTeacherDisplay = () => {
  return (
    <>
      <h2 className="text-center text-black text-4xl font-bold mb-20 mt-10">
        Our best tutors
      </h2>
      <div className="w-full flex flex-col md:flex-row items-center gap-10 justify-center mb-24">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            className="w-3/4 md:w-1/4"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: index * 0.25 }}
            viewport={{ once: true }}
          >
            <Card className="w-full max-w-[424px] h-[300px] flex flex-col shadow-lg pt-24 pb-10 justify-center items-center relative">
              <div className="bg-green-600 h-2 w-full absolute top-0"></div>
              <CardHeader className="text-primary absolute -top-[60px]">
                {card.icon}
              </CardHeader>
              <CardContent>
                <CardTitle className="text-3xl text-center mb-1 text-green-600">
                  {card.tutor}
                </CardTitle>
                <p className="text-center mb-5 text-sm">{card.subject}</p>
                <ScrollArea className="h-32 w-full rounded-md">
                  <CardDescription className="text-center text-md">
                    {card.description}
                  </CardDescription>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default BestTeacherDisplay;
