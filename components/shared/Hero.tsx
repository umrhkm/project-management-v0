import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="overflow-hidden relative h-full flex">
      <div className="absolute bg-gradient-to-t from-gold/0 to-gold-500/15 w-[1000px] h-[1000px] rounded-full z-[-1] overflow-hidden top-[50%] left-[50%] translate-x-[-50%] translate-y-[-20%] blur-3xl"></div>
      <div className="wrapper flex flex-col-reverse sm:flex-row gap-6 justify-center items-center">
        <div className="flex flex-col items-center justify-start gap-10 w-full mb-10 sm:mb-0">
          <div className="flex flex-col gap-5 items-center justify-start">
            <h1 className="font-black text-5xl sm:text-5xl md:text-6xl tracking-tight mt-2 sm:mt-32 text-gold text-center sm:text-left">
              SISTEM PENGELOLA PROYEK
            </h1>
            <p className="font-light text-secondary text-center tracking-wide sm:text-left w-full">
              Kelola proyek anda dengan dasbor dan antarmuka pengguna yang mudah
              dipelajari dan digunakan
            </p>
          </div>

          <div className="w-full">
            <Button
              asChild
              className="bg-gold hover:bg-gold-500 px-14 py-6 rounded-lg font-bold w-full sm:w-fit"
            >
              <Link href={`/dashboard`}>COBA SEKARANG</Link>
            </Button>
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center relative">
          <div className="rounded-full absolute w-[300px] h-[300px] z-[-1] bg-gradient-to-tr from-gold to-transparent blur-3xl">

          </div>
          <Image
            src={`/assets/images/Hero.png`}
            alt="hero image"
            width={500}
            height={500}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
