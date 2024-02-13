"use server";

import { revalidatePath } from "next/cache";
import { db } from "../database/db";

type CreateProjectParams = {
  userId: string;
  project: {
    name: string;
    deadlineAt: Date;
    createdAt: Date;
    thumbnail: string;
    description: string;
  };
  path: string;
};

type UpdateProjectParams = {
  userId: string;
  project: {
    id: string;
    name: string;
    deadlineAt: Date;
    createdAt: Date;
    thumbnail: string;
    description: string;
  };
  path: string;
};

type DeleteProjectParams = {
  projectId: string;
  path: string;
};

type GetAllProjectsParams = {
  limit: number;
  page: number;
};

export const createProject = async ({
  userId,
  project,
  path,
}: CreateProjectParams) => {
  try {
    const creator = await db.user.findUnique({ where: { id: userId } });

    if (!creator) {
      throw new Error("Pembuat proyek tidak ditemukan");
    }

    const newProject = await db.project.create({
      data: {
        ...project,
        creator: { connect: { id: userId } },
      },
    });

    revalidatePath(path);

    return newProject;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getProjectById = async (projectId: string) => {
  try {
    const project = await db.project.findUnique({ where: { id: projectId } });

    if (!project) throw new Error("Proyek tidak ditemukan!");

    return project;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateProject = async ({
  userId,
  project,
  path,
}: UpdateProjectParams) => {
  try {
    const projectToUpdate = await db.project.findUnique({
      where: { id: project.id },
    });

    if (!projectToUpdate) throw new Error("Proyek tidak ditemukan");

    if (projectToUpdate.creatorId !== userId)
      throw new Error("Anda tidak memiliki hak untuk memperbarui proyek");

    const updatedProject = await db.project.update({
      where: { id: project.id },
      data: {
        ...project,
      },
    });

    revalidatePath(path);

    return updatedProject;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteProject = async ({
  projectId,
  path,
}: DeleteProjectParams) => {
  try {
    const projectToDelete = await db.project.findUnique({
      where: { id: projectId },
    });

    if (!projectToDelete) throw new Error("Proyek tidak ditemukan");

    const deletedProject = await db.project.delete({
      where: { id: projectId },
    });

    if (deletedProject) revalidatePath(path);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAllProjects = async ({
  limit = 9,
  page,
}: GetAllProjectsParams) => {
  try {
    const skipAmount = (Number(page) - 1) * limit;

    const projects = await db.project.findMany({
      skip: skipAmount,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const totalProjectsCount = await db.project.count();

    const totalPages = Math.ceil(totalProjectsCount / limit);

    return {
      projects,
      totalPages,
    };
  } catch (error: any) {
    throw new Error(`Error retrieving projects: ${error.message}`);
  }
};
