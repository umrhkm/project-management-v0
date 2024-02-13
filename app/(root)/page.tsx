import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomePage = async () => {
  const session = await auth();

  return (
    <>
      <div className="wrapper text-center flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col gap-5 items-center justify-center">
          <h1 className="font-bold text-4xl tracking-wider mt-32 text-gold">
            PROJECT MANAGEMENT SYSTEM
          </h1>
          <p className="font-light text-secondary max-w-[600px] text-center tracking-wide">
            Kelola proyek anda dengan dasbor dan antarmuka pengguna yang mudah
            dipelajari dan digunakan
          </p>
        </div>

        <Button
          asChild
          className="bg-gold hover:bg-gold-500 px-14 py-6 rounded-lg font-bold"
        >
          <Link href={`/dashboard`}>COBA SEKARANG</Link>
        </Button>
      </div>
    </>
  );
};

export default HomePage;
