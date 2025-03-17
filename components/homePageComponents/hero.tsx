"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import mainAnimation from "@/animation/main.json";
import { signIn, useSession } from "next-auth/react";
import { useModal } from "@/hooks/use-modal";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

interface HeroProps {
  user?: User | null;
}
const Hero = ({ user }: HeroProps) => {
  const { onOpen } = useModal();
  const router = useRouter();
  return (
    <div className="hero-container flex flex-col-reverse lg:flex-row py-12 px-0 md:px-24 gap-1">
      <motion.div
        className="flex-1 flex flex-col gap-1 justify-center pl-10"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <p className="text-6xl text-green-600 font-bold">Welcome to</p>
        <div className="relative w-fit block after:block after:content-[''] after:absolute after:h-[5px] after:bg-green-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-500 after:origin-center">
          <h2 className="text-6xl text-green-600 font-bold">TUTORIA</h2>
        </div>
        <p className="mt-5 text-2xl font-semibold">
          Discover the ultimate platform for online education search and
          exploration.
        </p>
        <Button
          className="rounded-full bg-green-600 w-28 mt-5 cursor-pointer"
          onClick={() => {
            if (user == null) {
              onOpen("signIn");
            } else if (user.role === "STUDENT") {
              return router.push("/student");
            } else if (user.role === "TUTOR") {
              return router.push("/tutor");
            }
          }}
        >
          Get started
        </Button>
      </motion.div>
      <motion.div
        className="flex-1 flex flex-col items-center justify-center"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <Lottie animationData={mainAnimation} />
      </motion.div>
    </div>
  );
};

export default Hero;
