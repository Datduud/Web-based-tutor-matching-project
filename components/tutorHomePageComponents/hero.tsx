"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import mainAnimation from "@/animation/tutor-main.json";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface HeroProps {
  user?: User | null;
}

export const Hero = ({ user }: HeroProps) => {
  return (
    <div className="hero-container flex min-h-[600px] flex-col-reverse lg:flex-row  px-10 gap-1 w-full">
      <motion.div
        className="flex-1 flex flex-col gap-1 justify-center"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div>
          <p className="text-4xl font-bold lg:text-6xl text-center lg:text-left">
            Welcome, {user?.name}! Let&apos;s start with your first class of the
            day!
          </p>

          <p className="mt-5 text-md text-center lg:text-left">
            Make teaching an engaging and rewarding experience!
          </p>
        </div>
        <div className="flex flex-row gap-5 justify-center w-full md:justify-start md:gap-3">
          <Link href={"/tutor/profile"}>
            <Button className="rounded-full bg-black w-28 mt-5 cursor-pointer text-white font-semibold">
              My Profile
            </Button>
          </Link>

          <Link href={"/tutor/schedule"}>
            <Button className="rounded-full bg-green-600 w-28 mt-5 cursor-pointer font-semibold hover:bg-green-500">
              My Schedule
            </Button>
          </Link>
        </div>
      </motion.div>
      <motion.div
        className="flex-1 flex flex-col items-center justify-center"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <Lottie
          animationData={mainAnimation}
          className="md:w-11/12 w-[310px]"
        />
      </motion.div>
    </div>
  );
};
