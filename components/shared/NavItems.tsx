"use client";

import { Button } from "../ui/button";
import { logout } from "@/lib/actions/auth.actions";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = () => {
  const pathname = usePathname();

  return (
    <ul className="flex justify-end items-center text-sm font-medium gap-4">
      <li>
        <Button asChild variant={`ghost`} size={`lg`} className="hover:text-gold">
          <Link
            href={`/dashboard`}
            className={`${
              pathname === "/dashboard" ? "text-gold" : "text-black"
            } hover:text-gold`}
          >
            Dasbor
          </Link>
        </Button>
      </li>
      <li>
        <Button onClick={() => logout()} variant={`ghost`} size={`lg`}>
          Keluar
        </Button>
      </li>
    </ul>
  );
};

export default NavItems;
