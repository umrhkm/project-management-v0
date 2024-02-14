"use client";

import { UseCurrentUser } from "@/hooks/UseCurrentUser";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

const Header = () => {
  const user = UseCurrentUser();

  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href={`/`}>
          <Image src={"/assets/images/KelolaProyek.png"} alt="logo" width={48} height={48} />
        </Link>

        <div className="flex items-center justify-center">
          {user ? (
            <>
              <nav className="hidden md:flex w-full">
                <NavItems />
              </nav>
              <nav className="md:hidden">
                <MobileNav />
              </nav>
            </>
          ) : (
            <Button asChild className="bg-gold hover:bg-gold-500" size={`lg`}>
              <Link href={`/login`}>Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
