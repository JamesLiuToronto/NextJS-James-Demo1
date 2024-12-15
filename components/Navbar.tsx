"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../img/logo2.webp"; // Adjust the path to your logo image
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggler from "./ThemeToggler";

const Navbar = () => {
  return (
    <div className="bg-primary dark:bg-slate-700 py-2 px-5 flex justify-between">
      <Link href="/">
        <Image src={logo} alt="OceanPeak" width={40} />
      </Link>

      <div className="flex items-center">
        <ThemeToggler />
        <DropdownMenu>
          <DropdownMenuTrigger>
            {" "}
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>BT</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {" "}
              <Link href="/auth">Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
