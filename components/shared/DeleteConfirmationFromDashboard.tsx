"use client";

import { useTransition } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

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
import { TrashIcon } from "lucide-react";

export const DeleteConfirmationFromDashboard = ({ projectId }: { projectId: string }) => {
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <TrashIcon width={20} height={20} className="text-red" />
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
          <AlertDialogCancel className="w-full border-0">Batal</AlertDialogCancel>

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
