"use client";

import { usePathname } from "next/navigation";
import { useTransition } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deleteProject } from "@/lib/actions/project.actions";
import { Button } from "../ui/button";

export const DeleteConfirmationFromDetail = ({
  projectId,
}: {
  projectId: string;
}) => {
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50 py-3 px-[28px] bg-red hover:bg-red-500 text-white">
        Hapus Proyek
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white gap-8 py-12 px-10">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-bold text-2xl">
            Hapus Proyek
          </AlertDialogTitle>
          <AlertDialogDescription className="text-secondary">
            Apakah anda yakin untuk menghapus proyek ini?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="w-full flex">
          <AlertDialogCancel className="w-full border-0">
            Batal
          </AlertDialogCancel>

          <AlertDialogAction
            className="bg-gold w-full hover:bg-gold-500"
            onClick={() =>
              startTransition(async () => {
                await deleteProject({ projectId, path: pathname });
              })
            }
          >
            {isPending ? "Deleting..." : "Hapus"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
