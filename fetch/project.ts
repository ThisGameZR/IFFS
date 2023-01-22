import { Project } from "models/Project";
import axiosClient from "utils/axiosClient";

export async function fetchGetProjects(userId: string) {
  return await axiosClient
    .get<Project[]>(`/projects`, {
      params: { userId },
    })
    .then((res) => res.data);
}

export async function fetchCreateProject(userId: string, project: Project) {
  return await axiosClient
    .post<Project>(`/project`, {
      userId,
      project,
    })
    .then((res) => res.data);
}

export async function fetchUpdateProjectName(userId: string, projectId: string, name: string) {
  return await axiosClient
    .put<Project>(`/project`, {
      userId,
      projectId,
      name,
    })
    .then((res) => res.data);
}

export async function fetchDeleteProject(userId: string, projectId: string) {
  return await axiosClient
    .delete<Project>(`/project`, {
      data: { userId, projectId },
    })
    .then((res) => res.data);
}
