import { auth } from "@/auth";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmationFromDashboard } from "./DeleteConfirmationFromDashboard";
import { Edit, Edit2, EditIcon } from "lucide-react";

type ProjectCardProps = {
  project: {
    id: string;
    name: string;
    deadlineAt: Date;
    createdAt: Date;
    thumbnail: string;
    description: string;
    creatorId: string;
  };
};

const ProjectCard = async ({ project }: ProjectCardProps) => {
  const session = await auth();

  const userId = session?.user?.id as string;
  const isEventCreator = userId === project.creatorId;

  return (
    <div className="group relative flex min-h-[300px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-all hover:shadow-[0_5px_12px_rgb(0,0,0,0.2)] md:min-h-[334px]">
      <Link
        href={`/project/${project.id}`}
        style={{ backgroundImage: `url(${project.thumbnail})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />

      {isEventCreator && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`project/${project.id}/update`}>
            <EditIcon width={20} height={20} className="text-yellow-400" />
          </Link>

          <DeleteConfirmationFromDashboard projectId={project.id} />
        </div>
      )}

      <Link href={`/project/${project.id}`}>
        <div className="flex flex-col px-5 py-4 gap-2">
          <h4 className="text-base font-medium">{project.name}</h4>
          <p className="text-sm text-secondary">
            Tanggal Dibuat: {formatDateTime(project.createdAt).dateOnly}
          </p>
          <p className="text-sm text-secondary">
            Tenggat Waktu: {formatDateTime(project.deadlineAt).dateOnly}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
