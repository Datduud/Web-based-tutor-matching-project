"use client";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animation from "@/animation/main2.json";
import Image from "next/image";
import learn from "@/public/learn.jpeg";
const SetApartDisplay = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="why-container md:w-full flex flex-col-reverse md:flex-row md:mx-0 px-0 w-5/6 mx-auto md:px-24 mt-24"
    >
      <div className="w-full flex flex-col-reverse md:flex-row shadow-2xl rounded-md overflow-hidden bg-[#12544f]">
        <div className="flex-1 min-h-[500px] relative items-center justify-center  hidden md:flex">
          <Image fill src={learn.src} className="object-cover" alt="alo" />
        </div>
        <div className="flex-1 flex flex-col my-auto py-10 text-white px-5">
          <h2 className="text-5xl font-semibold text-center">
            What set us apart?
          </h2>
          <p className="text-xl mt-5 text-center md:text-start">
            At{" "}
            <span className="text-green-600 uppercase font-semibold">
              Tutoria
            </span>
            , we are committed to revolutionizing online education. Here&apos;s
            what sets us apart: Our innovative approach combines cutting-edge
            technology with personalized learning experiences, ensuring that
            every student receives the tailored support they need to excel. With
            a team of dedicated educators and a dynamic curriculum, we strive to
            create an engaging and interactive environment that fosters a love
            for learning. Join us on this educational journey and experience the
            difference of learning with Tutoria.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SetApartDisplay;
