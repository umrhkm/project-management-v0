import { DeleteConfirmationFromDetail } from "@/components/shared/DeleteConfrimationFromDetail";
import { Button } from "@/components/ui/button";
import { getProjectById } from "@/lib/actions/project.actions";
import { formatDateTime } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export type ParamProps = {
  params: { id: string };
};

const ProjectPage = async ({ params: { id } }: ParamProps) => {
  const project = await getProjectById(id);

  return (
    <div className="wrapper flex flex-col gap-8">
      <div className="flex flex-col gap-2">
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
        <div className="max-w-[1280px] max-h-[350px] overflow-hidden flex items-center justify-center">
          <Image
            src={project!.thumbnail}
            alt="project thumbnail"
            width={1280}
            height={100}
            className="h-full min-h-[100px] w-[1280px] object-cover object-center"
          />
        </div>
      </div>

      <div className="flex gap-5 items-center">
        <Button asChild className="py-3 px-[28px] bg-gold hover:bg-gold-500">
          <Link href={`/project/${project.id}/update`}>Perbarui Proyek</Link>
        </Button>

        <DeleteConfirmationFromDetail projectId={project.id} />
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <div className="flex gap-3 items-center">
          <p className="text-secondary text-sm">
            Tanggal Dibuat: {formatDateTime(project.createdAt).dateOnly}
          </p>
          <p className="text-[10px] text-secondary">|</p>
          <p className="text-red text-sm">
            Tenggat Waktu: {formatDateTime(project.deadlineAt).dateOnly}
          </p>
        </div>
      </div>

      <div className="w-ful">
        <p>{project.description}</p>
      </div>
    </div>
  );
};

export default ProjectPage;
