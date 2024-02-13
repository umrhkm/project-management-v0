"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormError from "../shared/FormError";
import FormSuccess from "../shared/FormSuccess";
import { ProjectSchema } from "@/lib/validators";
import { createProject, updateProject } from "@/lib/actions/project.actions";
import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "../ui/textarea";
import { FileUploader } from "./FileUploader";
import { useUploadThing } from "@/lib/uploadthing";

type ProjectFormProps = {
  userId: string;
  type: "Create" | "Update";
  project?: {
    id: string;
    name: string;
    deadlineAt: Date;
    createdAt: Date;
    thumbnail: string;
    description: string;
  };
  projectId?: string;
};

const ProjectForm = ({
  userId,
  type,
  project,
  projectId,
}: ProjectFormProps) => {
  const router = useRouter();
  const [files, setFiles] = React.useState<File[]>([]);
  const { startUpload } = useUploadThing("imageUploader");

  const initialValues =
    project && type === "Update"
      ? {
          ...project,
          createdAt: new Date(project.createdAt),
          deadlineAt: new Date(project.deadlineAt),
        }
      : {
          name: "",
          description: "",
          createdAt: new Date(),
          deadlineAt: new Date(),
          thumbnail: "",
        };

  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof ProjectSchema>) {
    const projectData = values;

    let uploadedThumbnailUrl = projectData.thumbnail;

    if (files.length > 0) {
      const uploadedThumbnails = await startUpload(files);

      if (!uploadedThumbnails) {
        return;
      }

      uploadedThumbnailUrl = uploadedThumbnails[0].url;
    }

    if (type === "Create") {
      try {
        const newProject = await createProject({
          project: { ...projectData, thumbnail: uploadedThumbnailUrl },
          userId,
          path: "/dasboard",
        });

        if (newProject) {
          form.reset();
          router.push(`/project/${newProject.id}`);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (type === "Update") {
      if (!projectId) {
        router.back();
        return;
      }

      try {
        const updatedProject = await updateProject({
          project: {
            ...projectData,
            thumbnail: uploadedThumbnailUrl,
            id: projectId,
          },
          userId,
          path: `/project/${projectId}`,
        });

        if (updatedProject) {
          form.reset();
          router.push(`/project/${updatedProject.id}`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex w-full gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1 w-full">
                <FormLabel className="leading-6">Nama Proyek</FormLabel>
                <FormControl>
                  <Input {...field} disabled={form.formState.isSubmitting} />
                </FormControl>
                <FormMessage className="text-red" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="createdAt"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1 w-full">
                <FormLabel className="leading-6">Tenggat Waktu</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger
                      asChild
                      disabled={form.formState.isSubmitting}
                    >
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage className="text-red" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 w-full">
              <FormLabel className="leading-6">Deskripsi Proyek</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="h-56"
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Image Cover</FormLabel>
              <FormControl>
                <FileUploader
                  onFieldChange={field.onChange}
                  imageUrl={field.value}
                  setFiles={setFiles}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-gold w-full hover:bg-gold-500 text-center text-sm"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? "MENAMBAHKAN..."
            : `${type === "Create" ? "TAMBAHKAN" : "PERBARUI"}`}
        </Button>
      </form>
    </Form>
  );
};

export default ProjectForm;
