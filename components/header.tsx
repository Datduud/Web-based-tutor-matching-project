"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { signIn, useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@prisma/client";
import Link from "next/link";
interface HeaderProps {
  user?: User | null;
}

const Header = ({ user }: HeaderProps) => {
  const { onOpen } = useModal();
  return (
    <header className="h-20 flex justify-between p-5 md:px-24 px-5">
      <div>
        {!!user && user.role === "STUDENT" && (
          <Link href={"/student"}>
            <h1 className="font-bold text-3xl text-green-600 ">Tutoria</h1>
          </Link>
        )}
        {!!user && user.role === "TUTOR" && (
          <Link href={"/tutor"}>
            <h1 className="font-bold text-3xl text-green-600 ">Tutoria</h1>
          </Link>
        )}
        {!user && (
          <Link href={"/"}>
            <h1 className="font-bold text-3xl text-green-600 ">Tutoria</h1>
          </Link>
        )}
      </div>
      <div>
        {!!user && (
          <Avatar
            className="cursor-pointer w-12 h-12"
            onClick={() => onOpen("profile", { user })}
          >
            {/* @ts-ignore */}
            <AvatarImage src={user?.imageUrl} className="object-cover" />
            <AvatarFallback>TT</AvatarFallback>
          </Avatar>
        )}
        {!user && (
          <Button
            className="rounded-full bg-green-600 w-28 cursor-pointer"
            onClick={() => onOpen("signIn")}
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
