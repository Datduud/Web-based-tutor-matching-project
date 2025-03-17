"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookA, GraduationCap, CalendarCheck, Users } from "lucide-react";
import subject from "@/public/subject.jpeg";
import tutor from "@/public/tutor-card.jpeg";
import schedule from "@/public/schedule.jpeg";
import learn from "@/public/start_learn.jpeg";
import HomePageCard from "./card";
const cardData = [
  {
    title: "Choose a subject",
    icon: <BookA className="w-32 h-32" />,
    image: subject.src,
    message:
      "Select the topic you want to learn and explore available courses.",
  },
  {
    title: "Choose a tutor",
    icon: <GraduationCap className="w-32 h-32" />,
    image: tutor.src,
    message:
      "Pick a knowledgeable tutor to guide you through the learning process.",
  },
  {
    title: "Scheduling",
    icon: <CalendarCheck className="w-32 h-32" />,
    image: schedule.src,
    message:
      "Set up a convenient schedule for your lessons and study sessions.",
  },
  {
    title: "Start learning",
    icon: <Users className="w-32 h-32" />,
    image: learn.src,
    message:
      "Begin your learning journey and gain valuable knowledge and skills.",
  },
];

const CardsDisplay = () => {
  return (
    <>
      <h2 className="text-center text-black text-4xl font-bold mb-10 mt-10">
        The best way for online education
      </h2>
      <div className="card-container w-full flex justify-around items-center flex-col md:flex-row gap-10  px-0 md:px-24 mb-10">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            className="w-4/5 md:w-1/4 shadow-lg rounded-lg"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: index * 0.25 }}
            viewport={{ once: true }}
          >
            <HomePageCard card={card} index={index} message={card.message} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default CardsDisplay;
