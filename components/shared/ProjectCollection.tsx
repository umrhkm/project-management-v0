import { Suspense } from "react";
import Pagination from "./Pagination";
import ProjectCard from "./ProjectCard";
import { Loading } from "@/app/loading";

type CollectionProps = {
  data: {
    id: string;
    name: string;
    deadlineAt: Date;
    createdAt: Date;
    thumbnail: string;
    description: string;
    creatorId: string;
  }[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
};

const ProjectCollection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  urlParamName,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((project) => {
              return (
                <li key={project.id} className="flex justify-center">
                  <ProjectCard project={project} />
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && (
            <Suspense fallback={<Loading />}>
              <Pagination
                urlParamName={urlParamName!}
                page={page}
                totalPages={totalPages}
              />
            </Suspense>
          )}
        </div>
      ) : (
        <div className="bg-secondary/25 w-full rounded-2xl flex items-center justify-center gap-3 min-h-[500px] py-28 text-center flex-col">
          <h3 className="font-semibold text-xl">{emptyTitle}</h3>
          <p className="text-secondary font-light">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default ProjectCollection;
