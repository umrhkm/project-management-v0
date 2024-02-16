import { auth } from "@/auth";
import ProjectForm from "@/components/shared/ProjectForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const CreateProjectPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <>
      <section>
        <div className="wrapper my-2">
          <div className="flex flex-col">
            <Button variant={`link`} asChild className="w-fit px-0">
              <Link href={`/dashboard`} className="group">
                <ArrowLeft
                  width={16}
                  hanging={16}
                  className="text-secondary group-hover:text-black"
                />
                <span className="ml-2 text-secondary group-hover:text-black">
                  Dasbor
                </span>
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Tambahkan Proyek Baru</h1>
          </div>
        </div>
      </section>

      <div className="max-w-7xl lg:mx-auto mb-12 md:px-10 xl:px-0 w-full">
        <ProjectForm userId={userId!} type="Create" />
      </div>
    </>
  );
};

export default CreateProjectPage;
