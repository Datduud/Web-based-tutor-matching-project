"use client";
import ReactCardFlip from "react-card-flip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface CardProps {
  card: any;
  index: number;
  message: string;
}

const HomePageCard = ({ card, index, message }: CardProps) => {
  const [flip, setFlip] = useState(false);
  const onFlip = () => {
    setFlip(!flip);
  };
  return (
    <ReactCardFlip isFlipped={flip}>
      <Card
        onClick={onFlip}
        className="h-72 flex flex-col justify-center bg-cover text-white hover:scale-105 transition"
        style={{ backgroundImage: `url(${card.image})` }}
      >
        <CardContent className="w-full h-full flex flex-col justify-center bg-black bg-opacity-50">
          <CardTitle className="text-center text-xl text-white uppercase">{`${
            index + 1
          }. ${card.title}`}</CardTitle>
        </CardContent>
      </Card>
      <Card
        onClick={onFlip}
        className="h-72 flex flex-col justify-center hover:scale-105 transition"
      >
        <CardContent className="w-full h-full flex flex-col justify-center bg-[#12544f]">
          <CardTitle className="text-center text-xl text-white uppercase">
            {message}
          </CardTitle>
        </CardContent>
      </Card>
    </ReactCardFlip>
  );
};

export default HomePageCard;
