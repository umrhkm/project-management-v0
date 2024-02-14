"use client";

import { Button } from "../ui/button";
import { logout } from "@/lib/actions/auth.actions";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = () => {
  const pathname = usePathname();

  return (
    <ul className="flex justify-end items-center md:text-sm text-base font-medium gap-4 flex-col md:flex-row">
      <li className="w-full md:w-fit text-center">
        <Button
          asChild
          variant={`ghost`}
          size={`lg`}
          className="hover:text-gold w-full"
        >
          <Link
            href={`/dashboard`}
            className={`${
              pathname === "/dashboard" ? "text-gold" : "text-black"
            } hover:text-gold `}
          >
            Dasbor
          </Link>
        </Button>
      </li>
      <li className="w-full md:w-fit text-center">
        <Button
          onClick={() => logout()}
          variant={`ghost`}
          size={`lg`}
          className="w-full"
        >
          Keluar
        </Button>
      </li>
    </ul>
  );
};

export default NavItems;
