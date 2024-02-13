import { auth } from "@/auth";
import ProjectCollection from "@/components/shared/ProjectCollection";
import { Button } from "@/components/ui/button";
import { getAllProjects } from "@/lib/actions/project.actions";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const DashboardPage = async ({ searchParams }: SearchParamProps) => {
  const session = await auth();
  const page = Number(searchParams?.page) || 1;

  const response = await getAllProjects({ page: page, limit: 9 });
  const projects = response.projects;
  const totalPages = response.totalPages;

  return (
    <section className="wrapper flex flex-col gap-5">
      <div className="mt-11 border-b border-secondary/10 pb-5">
        <div className="flex w-full justify-between items-center ">
          <h1 className="text-3xl font-bold">Daftar Proyek</h1>
          <Button asChild className="px-[28px] py-3 bg-gold hover:bg-gold-500">
            <Link href={`/project/create`}>
              <PlusIcon width={16} height={16} />
              <span className="ml-2">Tambahkan Proyek Baru</span>
            </Link>
          </Button>
        </div>
      </div>

      <div>
        <ProjectCollection
          data={projects}
          emptyTitle="Tidak ada proyek yang telah dibuat"
          emptyStateSubtext="Tambahkan proyek baru atau kembali lagi nanti"
          limit={6}
          page={page}
          totalPages={totalPages}
        />
      </div>
    </section>
  );
};

export default DashboardPage;
