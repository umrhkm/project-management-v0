import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="wrapper flex justify-between items-center flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href={`/`}>
          <Image src={`/assets/images/KelolaProyek.png`} alt="logo" width={32} height={32}/>
        </Link>

        <p className="text-[12px] text-secondary font-light">2024 Umar Hakim. Semua Hak Cipta Dilindungi Undang-Undang</p>
      </div>
    </footer>
  );
};

export default Footer;
