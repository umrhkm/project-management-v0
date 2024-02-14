import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger className="align-middle">
        <Image
          src="/assets/icons/menu.svg"
          alt="menu"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-6 bg-white">
        <Image
          src="/assets/images/KelolaProyek.png"
          alt="logo"
          width={64}
          height={64}
        />
        <Separator className="border border-gray-50" />
        <NavItems />
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
