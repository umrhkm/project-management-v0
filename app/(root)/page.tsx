import { auth } from "@/auth";
import Hero from "@/components/shared/Hero";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomePage = async () => {
  const session = await auth();

  return (
    <section className="h-full">
      <Hero />
    </section>
  );
};

export default HomePage;
