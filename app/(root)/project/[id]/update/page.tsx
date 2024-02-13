import { auth } from "@/auth";
import ProjectForm from "@/components/shared/ProjectForm";
import { Button } from "@/components/ui/button";
import { getProjectById } from "@/lib/actions/project.actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type UpdateProjectProps = {
  params: {
    id: string;
  };
};

const UpdateProjectPage = async ({ params: { id } }: UpdateProjectProps) => {
  const session = await auth();
  const userId = session?.user?.id as string;

  const project = await getProjectById(id);

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
            <h1 className="text-3xl font-bold">Perbarui Data Proyek</h1>
          </div>
        </div>
      </section>

      <div className="wrapper my-8">
        <ProjectForm
          userId={userId}
          type="Update"
          project={project}
          projectId={id}
        />
      </div>
    </>
  );
};

export default UpdateProjectPage;
